const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local specifically
const envPath = path.resolve(__dirname, '../../.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

console.log('--- Environment Check ---');
console.log('Company ID:', process.env.NEXT_PUBLIC_COMPANY_ID);
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing');
console.log('-------------------------');
