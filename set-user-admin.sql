-- Set user 0b18c8ef-a466-4a16-b365-9059796e799a as admin
-- Run this in Supabase SQL Editor

UPDATE auth.users
SET raw_user_meta_data = 
  CASE 
    WHEN raw_user_meta_data IS NULL THEN '{"role": "admin"}'::jsonb
    ELSE raw_user_meta_data || '{"role": "admin"}'::jsonb
  END
WHERE id = '0b18c8ef-a466-4a16-b365-9059796e799a';

-- Verify the update
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'role' as role,
  created_at
FROM auth.users
WHERE id = '0b18c8ef-a466-4a16-b365-9059796e799a';
