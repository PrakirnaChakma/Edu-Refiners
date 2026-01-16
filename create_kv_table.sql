-- Create the key-value store table for your app
CREATE TABLE IF NOT EXISTS kv_store_ccb86954 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_ccb86954(key);

-- Enable Row Level Security (RLS)
ALTER TABLE kv_store_ccb86954 ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
CREATE POLICY "Service role can do everything" ON kv_store_ccb86954
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- Create policy to allow anon read access
CREATE POLICY "Allow anon read access" ON kv_store_ccb86954
  FOR SELECT
  USING (true);

-- Insert default admin password
INSERT INTO kv_store_ccb86954 (key, value) 
VALUES ('admin_password', '"admin123"'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Insert initialized flag
INSERT INTO kv_store_ccb86954 (key, value) 
VALUES ('initialized', 'false'::jsonb)
ON CONFLICT (key) DO NOTHING;