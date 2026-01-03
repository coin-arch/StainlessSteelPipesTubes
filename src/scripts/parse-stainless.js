const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_HTML_DIR = path.resolve(__dirname, '../../public_html');
const OUTPUT_FILE = path.resolve(__dirname, '../../stainless_migration.json');

// Selectors for StainlessSteelPipesTubes Template
const SELECTORS = {
    title: '.dlab-bnr-inr-entry h1',
    content: '.col-xl-9',
    exclude: ['.widget', '.section-head', '.dlab-separator', 'script', 'style', '.download-file', '.social-icon']
};

function parseFile(filename) {
    const filePath = path.join(PUBLIC_HTML_DIR, filename);
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    // 1. Extract Title
    let title = $(SELECTORS.title).text().trim();
    if (!title) {
        // Fallback: Try H2 inside content if banner title is missing
        title = $(SELECTORS.content).find('h2').first().text().trim();
    }

    // 2. Extract Metadata
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const metaKeywords = $('meta[name="keywords"]').attr('content') || '';

    // 3. Extract Content & Build Structured Blocks
    const $content = $(SELECTORS.content).clone();

    // Remove unwanted elements
    SELECTORS.exclude.forEach(selector => $content.find(selector).remove());
    // Remove title if repeated
    $content.find('h1, h2').filter((i, el) => $(el).text().trim() === title).remove();

    const blocks = [];

    $content.children().each((i, el) => {
        const $el = $(el);
        const tag = el.tagName.toLowerCase();

        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
            blocks.push({
                type: 'heading',
                level: parseInt(tag.replace('h', '')),
                text: $el.text().trim()
            });
        } else if (tag === 'p') {
            const text = $el.text().trim();
            if (text) {
                blocks.push({
                    type: 'paragraph',
                    text: text
                });
            }
        } else if (tag === 'ul' || tag === 'ol') {
            const items = [];
            $el.find('li').each((j, li) => {
                items.push($(li).text().trim());
            });
            if (items.length > 0) {
                blocks.push({
                    type: 'list',
                    format: tag === 'ul' ? 'unordered' : 'ordered',
                    items: items
                });
            }
        } else if (tag === 'table') {
            const rows = [];
            $el.find('tr').each((r, tr) => {
                const cells = [];
                $(tr).find('td, th').each((c, td) => {
                    cells.push({
                        text: $(td).text().trim(),
                        tag: $(td).is('th') ? 'th' : 'td',
                        colSpan: parseInt($(td).attr('colspan')) || 1,
                        rowSpan: parseInt($(td).attr('rowspan')) || 1
                    });
                });
                if (cells.length > 0) rows.push(cells);
            });
            if (rows.length > 0) {
                blocks.push({
                    type: 'table',
                    rows: rows
                });
            }
        } else if (tag === 'div' && $el.hasClass('table-responsive')) {
            // Handle nested table inside responsive div
            const $table = $el.find('table');
            if ($table.length) {
                const rows = [];
                $table.find('tr').each((r, tr) => {
                    const cells = [];
                    $(tr).find('td, th').each((c, td) => {
                        cells.push({
                            text: $(td).text().trim(),
                            tag: $(td).is('th') ? 'th' : 'td',
                            colSpan: parseInt($(td).attr('colspan')) || 1,
                            rowSpan: parseInt($(td).attr('rowspan')) || 1
                        });
                    });
                    if (cells.length > 0) rows.push(cells);
                });
                if (rows.length > 0) {
                    blocks.push({
                        type: 'table',
                        rows: rows
                    });
                }
            }
        }
    });

    // 4. Identify Type
    let type = 'product';
    if (filename.includes('blog')) type = 'blog';

    // 5. Slug
    const slug = filename.replace('.html', '');

    // 6. Image
    let image = $content.find('img').first().attr('src');
    if (image && !image.startsWith('http')) {
        image = '/images/products/' + path.basename(image);
    }

    return {
        title,
        slug,
        type,
        meta_description: metaDescription,
        keywords: metaKeywords.split(',').map(k => k.trim()).filter(k => k),
        structured_content: blocks,
        image
    };
}

async function run() {
    const files = fs.readdirSync(PUBLIC_HTML_DIR).filter(f => f.endsWith('.html') && !f.startsWith('index') && !f.startsWith('contact') && !f.startsWith('about') && !f.startsWith('header') && !f.startsWith('footer'));

    console.log(`Found ${files.length} HTML files to parse.`);

    const results = [];

    for (const file of files) {
        try {
            const data = parseFile(file);
            if (data.title) {
                results.push(data);
            }
        } catch (err) {
            console.error(`Error parsing ${file}:`, err.message);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`Saved ${results.length} items to ${OUTPUT_FILE}`);
}

run();
