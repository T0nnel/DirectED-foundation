# Supabase Setup Instructions

## Prerequisites
- Supabase project created (you already have this)
- Supabase project URL and anon key configured in your app

## Step 1: Run Database Schema

1. Open your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor** (in the left sidebar)
4. Click **+ New Query**
5. Copy the contents of `supabase-schema.sql` and paste it into the editor
6. Click **Run** to execute the schema

This will create:
- `user_profiles` table
- `submissions` table
- Row Level Security policies
- Storage bucket for images
- Triggers and functions

## Step 2: Create Your First Admin User

After running the schema, you need to make yourself an admin:

1. Sign up through your app's `/auth` page (if you haven't already)
2. In Supabase dashboard, go to **Authentication** → **Users**
3. Find your user and copy your **UUID**
4. Go back to **SQL Editor** and run:

```sql
INSERT INTO public.user_profiles (user_id, role, full_name)
VALUES ('YOUR-UUID-HERE', 'admin', 'Your Name')
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin';
```

Replace `YOUR-UUID-HERE` with your actual user ID.

## Step 3: Verify Setup

Run these queries to verify everything is set up correctly:

```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check your admin role
SELECT * FROM public.user_profiles WHERE role = 'admin';

-- Check storage bucket
SELECT * FROM storage.buckets WHERE id = 'submission-images';
```

## Step 4: Test Permissions

Try these queries to test RLS is working:

```sql
-- This should work (public can view approved submissions)
SELECT * FROM public.submissions WHERE status = 'approved';

-- This should only show your submissions
SELECT * FROM public.submissions WHERE author_id = auth.uid();
```

## Step 5: Environment Variables

Make sure your `.env.local` file has:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Troubleshooting

### RLS Policies Not Working
- Make sure you're authenticated when testing
- Check that RLS is enabled: `ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;`
- Verify your user_profile role is set correctly

### Storage Upload Fails
- Check bucket exists: Go to **Storage** in Supabase dashboard
- Verify bucket is public
- Check storage policies are created

### Can't Insert Submissions
- Verify you're logged in
- Check that `author_id` matches your `auth.uid()`
- Look at browser console for detailed errors

## Next Steps

Once database is set up:
1. Test authentication through your app
2. Try creating a submission
3. Implement the submission form UI
4. Build the admin review interface

##File Reference

- Database Schema: `supabase-schema.sql`
- This Guide: `SUPABASE_SETUP.md`
