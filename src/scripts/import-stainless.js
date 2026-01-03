const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load .env.local
const envPath = path.resolve(__dirname, '../../.env.local');
if (fs.existsSync(envPath)) {
    console.log(`Loading env from: ${envPath}`);
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
    console.log('Keys loaded:', Object.keys(envConfig).join(', '));
} else {
    console.error('ERROR: .env.local not found at', envPath);
}

// Prioritize Service Role Key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
let SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Sanitize Key (remove quotes if user added them)
if (SUPABASE_KEY) {
    SUPABASE_KEY = SUPABASE_KEY.trim().replace(/^["']|["']$/g, '');
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("⚠️  WARNING: SUPABASE_SERVICE_ROLE_KEY not found. Using Anon Key.");
} else {
    console.log(`Using Service Role Key: ${SUPABASE_KEY.substring(0, 10)}...`);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

const MIGRATION_FILE = path.resolve(__dirname, '../../stainless_migration.json');

async function run() {
    console.log('--- Starting Import ---');
    console.log(`Company ID: ${COMPANY_ID}`);

    if (!fs.existsSync(MIGRATION_FILE)) {
        console.error('Migration file not found:', MIGRATION_FILE);
        return;
    }

    const items = JSON.parse(fs.readFileSync(MIGRATION_FILE, 'utf8'));
    console.log(`Loaded ${items.length} items.`);

    const BATCH_SIZE = 20;
    let success = 0;
    let fail = 0;

    for (let i = 0; i < items.length; i += BATCH_SIZE) {
        const batch = items.slice(i, i + BATCH_SIZE);

        const rows = batch.map(item => ({
            company_id: COMPANY_ID,
            title: item.title,
            slug: item.slug,
            type: item.type || 'product',
            meta_title: item.title, // Default meta title
            meta_description: item.meta_description,
            keywords: item.keywords,
            structured_content: item.structured_content, // JSONB
            created_at: new Date(),
            updated_at: new Date(),
            // published_at: new Date(), // Removed: Column likely doesn't exist
            // image_url: item.image
        }));

        // Upsert based on slug + company_id
        // Note: Assuming 'post_slug_company_id_key' constraint exists or using ID if available. 
        // Since we don't have IDs, we rely on ON CONFLICT.
        // If no constraint, this might duplicate. ideally we typically use a unique constraint on (company_id, slug).

        const { error } = await supabase
            .from('post')
            .upsert(rows, { onConflict: 'company_id, slug', ignoreDuplicates: false });

        if (error) {
            console.error(`Batch ${i} Error:`, error.message);
            fail += batch.length;
        } else {
            success += batch.length;
            process.stdout.write('.');
        }
    }

    console.log(`\nImport Complete.`);
    console.log(`Success: ${success}`);
    console.log(`Failed: ${fail}`);
}

run();
