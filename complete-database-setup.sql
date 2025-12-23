-- ============================================
-- COMPLETE DATABASE SETUP FOR DIRECTED
-- Run this entire file in your Supabase SQL Editor
-- ============================================

-- Step 1: Create app_role enum (with proper error handling)
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Step 2: Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Step 4: Create program_listings table  
CREATE TABLE IF NOT EXISTS public.program_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  category TEXT,
  location TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 5: Create user_profiles table (for submissions system)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'contributor' CHECK (role IN ('admin', 'editor', 'contributor')),
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 6: Create submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- User roles policies
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Program listings policies
DROP POLICY IF EXISTS "Anyone can view published listings" ON public.program_listings;
CREATE POLICY "Anyone can view published listings"
ON public.program_listings FOR SELECT
TO anon, authenticated
USING (is_published = TRUE);

DROP POLICY IF EXISTS "Admins can view all listings" ON public.program_listings;
CREATE POLICY "Admins can view all listings"
ON public.program_listings FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can create listings" ON public.program_listings;
CREATE POLICY "Admins can create listings"
ON public.program_listings FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update listings" ON public.program_listings;
CREATE POLICY "Admins can update listings"
ON public.program_listings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete listings" ON public.program_listings;
CREATE POLICY "Admins can delete listings"
ON public.program_listings FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
 
-- User profiles policies (for submissions)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.user_profiles;
CREATE POLICY "Public profiles are viewable by everyone"
ON public.user_profiles FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Users can create own profile" ON public.user_profiles;
CREATE POLICY "Users can create own profile"
ON public.user_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile"
ON public.user_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Submissions policies
DROP POLICY IF EXISTS "Public can view approved submissions" ON public.submissions;
CREATE POLICY "Public can view approved submissions"
ON public.submissions FOR SELECT
USING (status = 'approved' AND published_at IS NOT NULL);

DROP POLICY IF EXISTS "Users can view own submissions" ON public.submissions;
CREATE POLICY "Users can view own submissions"
ON public.submissions FOR SELECT
USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Admins can view all submissions" ON public.submissions;
CREATE POLICY "Admins can view all submissions"
ON public.submissions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

DROP POLICY IF EXISTS "Authenticated users can create submissions" ON public.submissions;
CREATE POLICY "Authenticated users can create submissions"
ON public.submissions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update own submissions" ON public.submissions;
CREATE POLICY "Users can update own submissions"
ON public.submissions FOR UPDATE
USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Admins can update all submissions" ON public.submissions;
CREATE POLICY "Admins can update all submissions"
ON public.submissions FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

DROP POLICY IF EXISTS "Users can delete own submissions" ON public.submissions;
CREATE POLICY "Users can delete own submissions"
ON public.submissions FOR DELETE
USING (auth.uid() = author_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  
  INSERT INTO public.user_profiles (user_id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', 'contributor');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_program_listings_updated_at ON public.program_listings;
CREATE TRIGGER update_program_listings_updated_at
  BEFORE UPDATE ON public.program_listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_submissions_updated_at ON public.submissions;
CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for program images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('program-images', 'program-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for submission images
INSERT INTO storage.buckets (id, name, public)
VALUES ('submission-images', 'submission-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for program images
DROP POLICY IF EXISTS "Anyone can view program images" ON storage.objects;
CREATE POLICY "Anyone can view program images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'program-images');

DROP POLICY IF EXISTS "Admins can upload program images" ON storage.objects;
CREATE POLICY "Admins can upload program images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'program-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update program images" ON storage.objects;
CREATE POLICY "Admins can update program images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'program-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete program images" ON storage.objects;
CREATE POLICY "Admins can delete program images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'program-images' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for submission images
DROP POLICY IF EXISTS "Public access to submission images" ON storage.objects;
CREATE POLICY "Public access to submission images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'submission-images');

DROP POLICY IF EXISTS "Authenticated users can upload submission images" ON storage.objects;
CREATE POLICY "Authenticated users can upload submission images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'submission-images');

DROP POLICY IF EXISTS "Users can update own submission images" ON storage.objects;
CREATE POLICY "Users can update own submission images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'submission-images' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can delete own submission images" ON storage.objects;
CREATE POLICY "Users can delete own submission images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'submission-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ============================================
-- NOW SET YOURSELF AS ADMIN
-- Replace the UUID with your actual user ID
-- ============================================

-- First, add your admin role to user_roles table
INSERT INTO public.user_roles (user_id, role)
VALUES ('8443f444-ac57-427f-a0e4-044a8df2da19', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Also update user_profiles for the submissions system
INSERT INTO public.user_profiles (user_id, role, full_name)
VALUES ('8443f444-ac57-427f-a0e4-044a8df2da19', 'admin', 'Your Name')
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin';

-- ============================================
-- VERIFY EVERYTHING IS SET UP
-- ============================================

-- Check your admin status
SELECT 'user_roles check' as check_type, ur.* 
FROM public.user_roles ur
WHERE user_id = '8443f444-ac57-427f-a0e4-044a8df2da19';

SELECT 'user_profiles check' as check_type, up.* 
FROM public.user_profiles up
WHERE user_id = '8443f444-ac57-427f-a0e4-044a8df2da19';
