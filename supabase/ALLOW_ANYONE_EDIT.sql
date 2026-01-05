-- Quick SQL to allow ANYONE to edit and save content
-- Run this to remove RLS restrictions temporarily

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can insert page content" ON page_content;
DROP POLICY IF EXISTS "Admins can update page content" ON page_content;
DROP POLICY IF EXISTS "Admins can delete page content" ON page_content;

-- Create new policies - ANYONE can edit
CREATE POLICY "Anyone can insert page content" ON page_content
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Anyone can update page content" ON page_content
    FOR UPDATE
    USING (true);

CREATE POLICY "Anyone can delete page content" ON page_content
    FOR DELETE
    USING (true);

-- Verify
SELECT 
    schemaname, 
    tablename, 
    policyname,
    permissive,
    cmd
FROM pg_policies 
WHERE tablename = 'page_content';
