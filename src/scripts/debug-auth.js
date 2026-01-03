const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.resolve(__dirname, '../../.env.local');

if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) process.env[k] = envConfig[k];
}

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
let KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (KEY) {
    KEY = KEY.trim().replace(/^["']|["']$/g, '');
}

const supabase = createClient(URL, KEY);

async function run() {
    console.log('--- Checking Schema ---');
    const { data: schemaData, error: schemaError } = await supabase.from('post').select('*').limit(1);

    if (schemaError) {
        console.error('Schema Check Failed:', schemaError.message);
    } else if (schemaData.length > 0) {
        console.log('Available Columns:');
        Object.keys(schemaData[0]).forEach(k => console.log(' - ' + k));
    } else {
        console.log('Table seems empty, cannot determine exact columns via Select.');
        // Try to insert a minimal row to see if it works, which confirms existence
    }

    console.log('\n--- Testing Granular Inserts ---');

    const base = {
        company_id: process.env.NEXT_PUBLIC_COMPANY_ID,
        title: 'Debug Field Test',
        slug: 'debug-' + Date.now(),
        type: 'test'
    };

    // 1. Minimal
    console.log('1. Testing MINIMAL (id, title, slug)...');
    const { data: d1, error: e1 } = await supabase.from('post').insert(base).select();
    if (e1) console.error('FAIL:', e1.message);
    else {
        console.log('PASS');
        await cleanup(d1[0].id);
    }

    // 2. Structured Content
    console.log('2. Testing structured_content...');
    const p2 = { ...base, slug: base.slug + '-2', structured_content: [] };
    const { data: d2, error: e2 } = await supabase.from('post').insert(p2).select();
    if (e2) console.error('FAIL:', e2.message);
    else {
        console.log('PASS');
        await cleanup(d2[0].id);
    }

    // 3. Image URL
    console.log('3. Testing image_url...');
    const p3 = { ...base, slug: base.slug + '-3', image_url: '/test.jpg' };
    const { data: d3, error: e3 } = await supabase.from('post').insert(p3).select();
    if (e3) console.error('FAIL:', e3.message);
    else {
        console.log('PASS');
        await cleanup(d3[0].id);
    }

    // 4. Keywords
    console.log('4. Testing keywords...');
    const p4 = { ...base, slug: base.slug + '-4', keywords: ['a', 'b'] };
    const { data: d4, error: e4 } = await supabase.from('post').insert(p4).select();
    if (e4) console.error('FAIL:', e4.message);
    else {
        console.log('PASS');
        await cleanup(d4[0].id);
    }
}

async function cleanup(id) {
    await supabase.from('post').delete().eq('id', id);
}

run();
