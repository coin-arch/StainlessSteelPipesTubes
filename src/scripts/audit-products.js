
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../../.env.local');
const envConfig = require('dotenv').parse(fs.readFileSync(envPath));

const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function auditProducts() {
    const company_id = envConfig.NEXT_PUBLIC_COMPANY_ID;
    console.log(`Auditing Products for Company: ${company_id}`);

    const { data: products, error } = await supabase
        .from('post')
        .select('title, slug, type')
        .eq('company_id', company_id);
    //        .eq('type', 'product'); // Let's check ALL types just in case

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log(`Found ${products.length} items.`);

    // Sort by title for easier spotting of junk
    products.sort((a, b) => a.title.localeCompare(b.title));

    const dumpPath = path.join(__dirname, 'product_audit_list.txt');
    const content = products.map(p => `[${p.type}] ${p.title} (${p.slug})`).join('\n');

    fs.writeFileSync(dumpPath, content);
    console.log(`Dumped list to ${dumpPath}`);
}

auditProducts();
