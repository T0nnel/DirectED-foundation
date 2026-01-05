-- ============================================
-- ACCESS REQUEST SYSTEM
-- Add this to your database after FINAL_SETUP.sql
-- ============================================

-- Create access requests table
CREATE TABLE IF NOT EXISTS access_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT NOT NULL,
    user_name TEXT,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES auth.users(id),
    admin_notes TEXT,
    UNIQUE(user_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_access_requests_status ON access_requests(status);
CREATE INDEX IF NOT EXISTS idx_access_requests_user_email ON access_requests(user_email);

-- Enable RLS
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own requests
CREATE POLICY "Users can read own access requests"
    ON access_requests FOR SELECT
    USING (user_id = auth.uid() OR auth.uid() IN (
        SELECT id FROM user_roles WHERE role = 'admin'
    ));

-- Users can create their own access request
CREATE POLICY "Users can create access requests"
    ON access_requests FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Admins can update access requests
CREATE POLICY "Admins can update access requests"
    ON access_requests FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can delete access requests
CREATE POLICY "Admins can delete access requests"
    ON access_requests FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Function to get pending request count
CREATE OR REPLACE FUNCTION get_pending_requests_count()
RETURNS INTEGER AS $$
    SELECT COUNT(*)::INTEGER
    FROM access_requests
    WHERE status = 'pending';
$$ LANGUAGE SQL SECURITY DEFINER;
