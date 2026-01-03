
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Load env vars from .env.local
const envPath = path.resolve(__dirname, '../../.env.local');
const envConfig = require('dotenv').parse(fs.readFileSync(envPath));

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Key");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectPost() {
    const slug = 'stainless-steel-pipe-manufacturer';
    const company_id = envConfig.NEXT_PUBLIC_COMPANY_ID;

    console.log(`Inspecting Slug: ${slug} for Company: ${company_id}`);

    const { data, error } = await supabase
        .from('post')
        .select('*')
        .eq('slug', slug)
        .eq('company_id', company_id)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
        return;
    }

    if (!data) {
        console.error("Post not found!");
        return;
    }

    console.log("--- Post Metadata ---");
    console.log("Title:", data.title);
    console.log("ID:", data.id);
    console.log("Has Content?", !!data.content, "Length:", data.content ? data.content.length : 0);
    if (data.content) {
        fs.writeFileSync('content_dump.txt', data.content);
        console.log("Written content to content_dump.txt");
    }
    console.log("Has Structured Content?", !!data.structured_content, "Is Array?", Array.isArray(data.structured_content));

    if (data.structured_content) {
        console.log("Structured Content Blocks:", data.structured_content.length);
        console.log("First Block:", JSON.stringify(data.structured_content[0], null, 2));
    } else {
        console.log("Structured content is null/empty.");
    }
}

inspectPost();
