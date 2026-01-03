const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_HTML_DIR = path.resolve(__dirname, '../../public_html');
const MIGRATION_FILE = path.resolve(__dirname, '../../stainless_migration.json');

// Replicate parser logic to see what gets skipped
const EXCLUDE_STARTS = ['index', 'contact', 'about', 'header', 'footer', 'sitemap', '404'];

function run() {
    const allFiles = fs.readdirSync(PUBLIC_HTML_DIR).filter(f => f.endsWith('.html'));
    const migratedData = JSON.parse(fs.readFileSync(MIGRATION_FILE, 'utf8'));
    const migratedSlugs = new Set(migratedData.map(d => d.slug));

    console.log(`Total HTML files in source: ${allFiles.length}`);
    console.log(`Total Migrated items: ${migratedData.length}`);

    const skipped = [];
    const noTitle = [];
    const intentionallySkipped = [];

    for (const file of allFiles) {
        const slug = file.replace('.html', '');

        // Check intentional skips
        const isExcluded = EXCLUDE_STARTS.some(prefix => file.startsWith(prefix));

        if (migratedSlugs.has(slug)) {
            continue;
        }

        if (isExcluded) {
            intentionallySkipped.push(file);
            continue;
        }

        // Only parse if not intentionally skipped and not in migrated list
        const filePath = path.join(PUBLIC_HTML_DIR, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(html);

        // Selectors matched parser
        let title = $('.dlab-bnr-inr-entry h1').text().trim();
        if (!title) {
            title = $('.col-xl-9').find('h2').first().text().trim();
        }

        if (!title) {
            noTitle.push(file);
        } else {
            skipped.push(file);
        }
    }

    console.log('\n--- Intentionally Skipped (System Pages) ---');
    console.log(intentionallySkipped.join('\n'));

    console.log('\n--- Parse Failed (No Title Found) ---');
    console.log(noTitle.join('\n'));

    console.log('\n--- Unexplained Skips (Should have been migrated) ---');
    if (skipped.length === 0) console.log('None.');
    else console.log(skipped.join('\n'));
}

run();
