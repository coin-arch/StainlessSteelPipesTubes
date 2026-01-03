-- Add missing columns for the new CMS structure
ALTER TABLE post ADD COLUMN IF NOT EXISTS structured_content JSONB DEFAULT '[]'::jsonb;
ALTER TABLE post ADD COLUMN IF NOT EXISTS keywords TEXT[] DEFAULT '{}';
ALTER TABLE post ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE post ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'product';
ALTER TABLE post ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE post ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE post ADD COLUMN IF NOT EXISTS company_id UUID;

-- Ensure Unique Constraint for Upsert
ALTER TABLE post DROP CONSTRAINT IF EXISTS post_company_id_slug_key;
ALTER TABLE post ADD CONSTRAINT post_company_id_slug_key UNIQUE (company_id, slug);

-- Enable RLS
ALTER TABLE post ENABLE ROW LEVEL SECURITY;

-- Allow Service Role full access (Implicit in Supabase but good to be sure if using custom policies)
-- CREATE POLICY "Service Role Full Access" ON post FOR ALL TO service_role USING (true) WITH CHECK (true);
