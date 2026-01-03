
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../../.env.local');
const envConfig = require('dotenv').parse(fs.readFileSync(envPath));

const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const TARGET_SLUGS = [
    'stainless-steel-tubes-manufacturer',
    'carbon-steel-pipes-tubes-manufacturer',
    'alloy-steel-pipes-tubes-manufacturer',
    'nickel-alloy-pipes-tubes-manufacturer',
    'duplex-steel-pipes-tubes-manufacturer',
    'super-duplex-steel-pipes-tubes-manufacturer',
    'inconel-pipes-tubes-manufacturer',
    'monel-pipes-tubes-manufacturer',
    'hastelloy-pipes-tubes-manufacturer',
    'titanium-pipes-tubes-manufacturer',
    'aluminium-pipes-tubes-manufacturer',
    'cupro-nickel-pipes-tubes-manufacturer'
];

async function repairAll() {
    const company_id = envConfig.NEXT_PUBLIC_COMPANY_ID;
    console.log(`Starting Batch Repair for Company: ${company_id}`);

    let fixedCount = 0;
    let skippedCount = 0;

    for (const slug of TARGET_SLUGS) {
        const filePath = path.join(__dirname, '../../public_html', `${slug}.html`);

        if (!fs.existsSync(filePath)) {
            console.warn(`[WARN] File not found: ${slug}.html`);
            skippedCount++;
            continue;
        }

        const rawHtml = fs.readFileSync(filePath, 'utf-8');
        let extractedContent = '';

        // ROBUST MATCHING: Find all <div> blocks that are col-lg-3 or col-md-6 AND contain "service-box-3"
        // This targets the product grid items specifically regardless of wrapper structure.

        // Match <div class="col-..." > ... service-box-3 ... </div></div></div> (approximate nesting)
        // Since regex and nesting is hard, we look for the specific strings that define a product card.
        // In the legacy template, product cards are consistently:
        // <div class="col-lg-3 ..."> ... <div class="dlab-box service-box-3"> ... </div></div>

        const colMatches = rawHtml.match(/<div class="col-(lg|md)-[0-9]+[\s\S]*?service-box-3[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi);

        if (colMatches && colMatches.length > 0) {
            console.log(`[INFO] Found ${colMatches.length} product items for ${slug}`);
            // Rebuild the row
            extractedContent = `<div class="row">\n${colMatches.join('\n')}\n</div>`;
        } else {
            console.warn(`[WARN] Could not find any product grid items for ${slug}`);
            // Try a broader search just in case?
            skippedCount++;
            continue;
        }

        // Sanitize: Fix Links and Images
        let sanitized = extractedContent
            .replace(/href="([^"]+)\.html"/g, 'href="/products/$1"') // dynamic links
            .replace(/src="images\//g, 'src="/images/'); // absolute image paths

        // Fix: Ensure we don't have double slashes if any
        sanitized = sanitized.replace(/src="\/\/images/g, 'src="/images');

        console.log(`Updating ${slug}... (${sanitized.length} chars)`);

        const { error } = await supabase
            .from('post')
            .update({ content: sanitized })
            .eq('slug', slug)
            .eq('company_id', company_id);

        if (error) {
            console.error(`[ERROR] Failed to update ${slug}:`, error);
            skippedCount++;
        } else {
            console.log(`[SUCCESS] Updated ${slug}`);
            fixedCount++;
        }
    }

    console.log(`\n--- REPAIR COMPLETE ---`);
    console.log(`Fixed: ${fixedCount}`);
    console.log(`Skipped/Failed: ${skippedCount}`);
}

repairAll();
