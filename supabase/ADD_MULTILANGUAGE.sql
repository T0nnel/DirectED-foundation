-- ============================================
-- MULTI-LANGUAGE CMS DATABASE
-- Adds language support to the CMS system
-- ============================================

-- Step 1: Add language_code column to page_content
ALTER TABLE page_content 
ADD COLUMN IF NOT EXISTS language_code TEXT DEFAULT 'en';

-- Step 2: Drop old unique constraint and add new one with language
ALTER TABLE page_content 
DROP CONSTRAINT IF EXISTS page_content_page_name_content_key_key;

ALTER TABLE page_content
ADD CONSTRAINT page_content_unique_per_language 
UNIQUE (page_name, content_key, language_code);

-- Step 3: Create index for faster language queries
CREATE INDEX IF NOT EXISTS idx_page_content_language 
ON page_content(language_code);

-- Step 4: Migrate existing content to 'en' (English) if not already set
UPDATE page_content 
SET language_code = 'en' 
WHERE language_code IS NULL OR language_code = '';

-- Step 5: Verify the changes
SELECT 
    language_code,
    COUNT(*) as content_count
FROM page_content
GROUP BY language_code
ORDER BY language_code;

-- ============================================
-- READY! 
-- Now admins can create content for each language:
-- - English (en)
-- - Kiswahili (sw)
-- - Amharic (am)
-- - French (fr)
-- - Spanish (es)
-- - Chinese (zh)
-- ============================================
