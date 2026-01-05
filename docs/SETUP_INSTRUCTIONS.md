# CMS Database Setup Instructions

## 🚀 Quick Start (3 Steps)

### Step 1: Run the SQL Script
1. Go to your **Supabase Dashboard**
2. Click **SQL Editor** in the sidebar
3. Create a new query
4. Copy and paste **ALL** of `supabase/COMPLETE_SETUP.sql`
5. Click **Run** (or press Ctrl+Enter)

### Step 2: Create Storage Bucket
1. Go to **Storage** in Supabase Dashboard
2. Click **New bucket**
3. Name: `page-images`
4. Set to **Public bucket** ✓
5. Click **Create bucket**

### Step 3: Test Admin Access
1. Go to your app at `http://localhost:8080/auth`
2. **Sign up** with one of these emails:
   - `elleni.t.eshete@gmail.com`
   - `tonnel@directed.dev`
3. After signup, **login**
4. You should be redirected to `/?editMode=true`
5. **Admin toolbar** appears in bottom-right corner

---

## ✅ What This Setup Does

1. **Creates all tables**: `page_content`, `content_history`, `user_roles`
2. **Sets up security**: Row Level Security (RLS) policies
3. **Auto-assigns admin**: These emails automatically get admin role:
   - elleni.t.eshete@gmail.com
   - tonnel@directed.dev
4. **Creates triggers**: Auto-save history, auto-update timestamps
5. **Seeds content**: Initial content for all pages

---

## 🧪 Testing Your Setup

### Test 1: Check Admin Assignment
In Supabase SQL Editor, run:
```sql
SELECT u.email, ur.role 
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.id
WHERE u.email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev');
```

Should show `admin` role for these emails.

### Test 2: Edit Content
1. Login as admin
2. Go to `/contactus`
3. Click the "Get in Touch" title
4. Edit the text
5. Click **Save All Changes** in admin toolbar
6. Refresh page - changes should persist

### Test 3: Check Content in Database
```sql
SELECT page_name, content_key, content_value 
FROM page_content 
WHERE page_name = 'contact';
```

Should show the updated content.

---

## 📝 What Gets Created

### Tables
- **page_content** - All editable text/images
- **content_history** - Version history for rollback
- **user_roles** - Admin/user permissions

### Automatic Features
- ✅ Admin emails get admin role automatically
- ✅ Content changes save version history
- ✅ Timestamps auto-update
- ✅ Security policies enforce admin-only editing

---

## 🔧 Troubleshooting

**"No admin toolbar appears"**
- Make sure you signed up with exact email (elleni.t.eshete@gmail.com or tonnel@directed.dev)
- Log out and log back in
- Check browser console for errors

**"Can't save changes"**
- Verify storage bucket `page-images` exists and is public
- Check you're logged in as admin
- Open browser console and check for errors

**"Content not loading"**
- Make sure COMPLETE_SETUP.sql ran without errors
- Check seed data exists: `SELECT * FROM page_content;`

**"Error running SQL"**
- Make sure you're running in Supabase SQL Editor (not local)
- Run the entire script at once
- Check for any error messages

---

## 🎯 Next Steps After Setup

1. **Test all pages**:
   - `/contactus` - Edit hero titles
   - `/about` - Edit vision section
   - `/team` - Edit team hero
   - `/programs` - Edit programs hero

2. **Add more admins** (if needed):
   Edit `COMPLETE_SETUP.sql` line 207:
   ```sql
   IF NEW.email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev', 'new-admin@example.com') THEN
   ```
   Then re-run the script.

3. **Customize content**:
   Use the admin interface to edit all text and upload images!

---

## 📚 Files Reference

- `COMPLETE_SETUP.sql` - Run this first (main setup)
- `CMS_INTEGRATION_GUIDE.md` - How to add editable components to more pages
- `walkthrough.md` - Complete CMS feature documentation

---

## ✨ You're Done!

Your CMS is now fully operational. Those two email addresses will always be admins, and they can edit content across all integrated pages!
