-- DirectEd CMS Database Schema

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for storing dynamic page content
CREATE TABLE page_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_name TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'richtext', 'image', 'html')),
    content_value TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    UNIQUE(page_name, content_key)
);

-- Table for content version history
CREATE TABLE content_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID REFERENCES page_content(id) ON DELETE CASCADE,
    content_value TEXT NOT NULL,
    version INTEGER NOT NULL,
    changed_by UUID REFERENCES auth.users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for user roles (extends auth.users)
CREATE TABLE user_roles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_page_content_page_name ON page_content(page_name);
CREATE INDEX idx_page_content_key ON page_content(content_key);
CREATE INDEX idx_content_history_content_id ON content_history(content_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- page_content policies
-- Everyone can read content
CREATE POLICY "Anyone can read page content"
    ON page_content FOR SELECT
    USING (true);

-- Only admins can insert/update/delete content
CREATE POLICY "Admins can insert content"
    ON page_content FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update content"
    ON page_content FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete content"
    ON page_content FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- content_history policies
-- Everyone can read history (for version viewing)
CREATE POLICY "Anyone can read content history"
    ON content_history FOR SELECT
    USING (true);

-- Only admins can insert history
CREATE POLICY "Admins can insert history"
    ON content_history FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- user_roles policies
-- Users can read their own role
CREATE POLICY "Users can read own role"
    ON user_roles FOR SELECT
    USING (id = auth.uid());

-- Only admins can update roles
CREATE POLICY "Admins can manage roles"
    ON user_roles FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for page_content updated_at
CREATE TRIGGER update_page_content_updated_at
    BEFORE UPDATE ON page_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_roles updated_at
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to save content history when content is updated
CREATE OR REPLACE FUNCTION save_content_history()
RETURNS TRIGGER AS $$
BEGIN
    -- Only save history if content_value actually changed
    IF OLD.content_value IS DISTINCT FROM NEW.content_value THEN
        INSERT INTO content_history (content_id, content_value, version, changed_by)
        VALUES (OLD.id, OLD.content_value, OLD.version, auth.uid());
        
        -- Increment version
        NEW.version = OLD.version + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to save history on update
CREATE TRIGGER save_content_history_trigger
    BEFORE UPDATE ON page_content
    FOR EACH ROW
    EXECUTE FUNCTION save_content_history();

-- Storage bucket for images (run this in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('page-images', 'page-images', true);

-- Storage policies for page-images bucket
-- CREATE POLICY "Public read access"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'page-images');

-- CREATE POLICY "Admins can upload images"
--     ON storage.objects FOR INSERT
--     WITH CHECK (
--         bucket_id = 'page-images' AND
--         EXISTS (
--             SELECT 1 FROM user_roles
--             WHERE id = auth.uid() AND role = 'admin'
--         )
--     );

-- CREATE POLICY "Admins can delete images"
--     ON storage.objects FOR DELETE
--     USING (
--         bucket_id = 'page-images' AND
--         EXISTS (
--             SELECT 1 FROM user_roles
--             WHERE id = auth.uid() AND role = 'admin'
--         )
--     );
