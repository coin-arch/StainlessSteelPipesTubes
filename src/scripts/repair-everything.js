
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio'); // Use Cheerio if available? No, environment might not have it. stick to Regex/String manip.

const envPath = path.resolve(__dirname, '../../.env.local');
const envConfig = require('dotenv').parse(fs.readFileSync(envPath));

const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const PUBLIC_HTML_DIR = path.join(__dirname, '../../public_html');

// Helper to sanitize HTML
function sanitizeContent(html) {
    if (!html) return '';
    return html
        .replace(/href="([^"]+)\.html"/g, 'href="/products/$1"') // Fix links
        .replace(/src="images\//g, 'src="/images/') // Fix images
        .replace(/src="\/\/images/g, 'src="/images') // Fix double slash
        .trim();
}

async function repairEverything() {
    const company_id = envConfig.NEXT_PUBLIC_COMPANY_ID;
    console.log(`Starting UNIVERSAL Repair for Company: ${company_id}`);

    // Get all HTML files
    const files = fs.readdirSync(PUBLIC_HTML_DIR).filter(f => f.endsWith('.html'));
    console.log(`Found ${files.length} HTML files to process.`);

    let fixedCount = 0;
    let skippedCount = 0;
    let noDbMatch = 0;

    for (const file of files) {
        const slug = file.replace('.html', '');

        // 1. Check if Slug exists in DB
        // We do this individually or we could fetch all slugs first. Individual is safer for now.
        const { data: post, error } = await supabase
            .from('post')
            .select('id, type')
            .eq('slug', slug)
            .eq('company_id', company_id)
            .maybeSingle();

        if (!post) {
            // console.log(`[SKIP] No DB record for slug: ${slug}`);
            noDbMatch++;
            continue;
        }

        const rawHtml = fs.readFileSync(path.join(PUBLIC_HTML_DIR, file), 'utf-8');
        let extractedContent = '';
        let type = 'UNKNOWN';

        // 2. Strategy A: Check for Product Grid (Category Page)
        const colMatches = rawHtml.match(/<div class="col-(lg|md)-[0-9]+[\s\S]*?service-box-3[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi);

        if (colMatches && colMatches.length >= 2) {
            // If we have multiple service boxes, it's likely a grid page
            type = 'GRID';
            extractedContent = `<div class="row">\n${colMatches.join('\n')}\n</div>`;
        } else {
            // 3. Strategy B: Detail Page Content
            // Look for the main content column. Usually col-xl-9 or col-lg-8 or col-md-7/8/9
            // We use a Heuristic: Find the div that contains "col-md-*" AND the first <h2> header?
            // Or extract the block after the Sidebar?

            // Regex to capture the content div wrapper
            // <div class="col-xl-9 col-lg-8 col-md-7 m-b30"> ... content ... </div> (followed by closing row/container)

            // Let's try to find the start of the main column
            const mainColRegex = /<div class="col-(xl|lg|md)-[7-9].*?">/i;
            const match = rawHtml.match(mainColRegex);

            if (match) {
                const startIdx = match.index + match[0].length;
                // Now we need to find the matching closing div... difficult without a parser.
                // Hack: Read until the "<!-- contact area END -->" or "<!-- About Us End -->" or closely following script tag/footer.

                // Look for known footer markers
                const endMarker1 = '<!-- contact area END -->';
                const endMarker2 = '<footer';
                const endMarker3 = '<!-- Footer';

                let endIdx = rawHtml.indexOf(endMarker1, startIdx);
                if (endIdx === -1) endIdx = rawHtml.indexOf(endMarker3, startIdx);
                if (endIdx === -1) endIdx = rawHtml.indexOf(endMarker2, startIdx);

                if (endIdx !== -1) {
                    // We grabbed too much (includes closing divs of container).
                    // We can try to backtrack from endIdx to remove the last few </div>s?
                    // Or just sanitize loosely. Extra </div> tags might be ignored by browser or auto-closed.

                    let content = rawHtml.substring(startIdx, endIdx);

                    // Cleanup: Remove the sidebar widget if it acted up? No, sidebar is usually in a previous col.
                    // Cleanup: Remove <div class="widget ...">...</div> if it's inside?

                    // Remove distinct sidebar if we accidentally grabbed it?
                    // In the sample, sidebar was col-md-5 (before). Main was col-md-7 (after).
                    // So extracting from col-md-7 start should be fine.

                    // Trimming trailing closing divs from the container logic
                    // Count open/close divs? No.
                    // Let's just strip the last 3-4 </div> tags if they exist at the very end of the string.
                    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*$/, '');

                    type = 'DETAIL';
                    extractedContent = content;
                }
            }
        }

        if (extractedContent) {
            const sanitized = sanitizeContent(extractedContent);
            console.log(`[UPDATE] ${slug} (${type}) - ${sanitized.length} chars`);

            const { error: updateError } = await supabase
                .from('post')
                .update({ content: sanitized })
                .eq('id', post.id); // Update by ID is safer

            if (updateError) console.error(`Failed to update ${slug}:`, updateError);
            else fixedCount++;
        } else {
            console.warn(`[WARN] Could not extract content for ${slug}`);
            skippedCount++;
        }
    }

    console.log(`\n--- FINAL SUMMARY ---`);
    console.log(`Processed Files: ${files.length}`);
    console.log(`Matched & Updated: ${fixedCount}`);
    console.log(`No Content Extracted: ${skippedCount}`);
    console.log(`No DB Record (Skipped): ${noDbMatch}`);
}

repairEverything();
