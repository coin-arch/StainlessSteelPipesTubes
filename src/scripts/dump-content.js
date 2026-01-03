
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../../.env.local');
const envConfig = require('dotenv').parse(fs.readFileSync(envPath));

const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function dumpContent() {
    const slug = 'stainless-steel-pipe-manufacturer';
    const company_id = envConfig.NEXT_PUBLIC_COMPANY_ID;

    console.log(`Fetching content for: ${slug}`);

    const { data, error } = await supabase
        .from('post')
        .select('content')
        .eq('slug', slug)
        .eq('company_id', company_id)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    if (data && data.content) {
        fs.writeFileSync('debug_content.html', data.content);
        console.log(`Content dumped to debug_content.html (${data.content.length} chars)`);
    } else {
        console.log("No content found or content is empty.");
        fs.writeFileSync('debug_content.html', "EMPTY");
    }
}

dumpContent();
