-- Content Submission System Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- User Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'contributor' CHECK (role IN ('admin', 'editor', 'contributor')),
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Content
  type TEXT NOT NULL CHECK (type IN ('story', 'news', 'update', 'report')),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  
  -- Media
  image_url TEXT,
  image_caption TEXT,
  additional_images TEXT[] DEFAULT '{}',
  
  -- Metadata
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT,
  location TEXT,
  program TEXT,
  
  -- Workflow
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  
  -- Publishing
  published_at TIMESTAMP WITH TIME ZONE,
  featured BOOLEAN DEFAULT FALSE
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_submissions_author ON public.submissions(author_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_type ON public.submissions(type);
CREATE INDEX IF NOT EXISTS idx_submissions_published ON public.submissions(published_at);
CREATE INDEX IF NOT EXISTS idx_submissions_featured ON public.submissions(featured) WHERE featured = TRUE;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view all profiles"
  ON public.user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Submissions Policies

-- Public can view approved submissions
CREATE POLICY "Public can view approved submissions"
  ON public.submissions FOR SELECT
  USING (status = 'approved' AND published_at IS NOT NULL);

-- Users can view their own submissions
CREATE POLICY "Users can view own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = author_id);

-- Users can insert their own submissions
CREATE POLICY "Users can create submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Users can update their own draft/rejected submissions
CREATE POLICY "Users can update own draft submissions"
  ON public.submissions FOR UPDATE
  USING (
    auth.uid() = author_id 
    AND status IN ('draft', 'rejected')
  );

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
  ON public.submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all submissions
CREATE POLICY "Admins can update all submissions"
  ON public.submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can delete submissions
CREATE POLICY "Admins can delete submissions"
  ON public.submissions FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for submissions
CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Create storage bucket for submission images
INSERT INTO storage.buckets (id, name, public)
VALUES ('submission-images', 'submission-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for submission images
CREATE POLICY "Anyone can view submission images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'submission-images');

CREATE POLICY "Authenticated users can upload submission images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'submission-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own submission images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'submission-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own submission images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'submission-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert a sample admin user profile (replace with your actual user ID)
-- Get your user ID from: SELECT id FROM auth.users WHERE email = 'your-email@example.com';
-- INSERT INTO public.user_profiles (user_id, role, full_name)
-- VALUES ('your-user-uuid-here', 'admin', 'Admin User');

COMMENT ON TABLE public.user_profiles IS 'Extended user profile information';
COMMENT ON TABLE public.submissions IS 'User-submitted content (stories, news, updates, reports)';
COMMENT ON COLUMN public.submissions.status IS 'Submission workflow status: draft, pending, approved, rejected';
COMMENT ON COLUMN public.submissions.type IS 'Content type: story, news, update, report';
