# Quick Setup Guide

## ✅ Step 1: Run Database Scripts

Run these 3 SQL scripts in order in Supabase SQL Editor:

**1. Run: `FINAL_SETUP.sql`**
- Creates CMS tables (page_content, content_history, user_roles)
- Sets up RLS policies
- Seeds initial content

**2. Run: `ADD_MULTILANGUAGE.sql`**  
- Adds language support (6 languages)
- Updates schema for multi-language content

**3. Run: `ASSIGN_ADMINS.sql`**
- Assigns admin role to tonnel@directed.dev
- Assigns admin role to elleni.t.eshete@gmail.com

## ✅ Step 2: Create Storage Bucket

1. Go to Supabase → Storage
2. Click **New bucket**
3. Name: `page-images`
4. Enable **Public bucket** ✓
5. Click **Create**

## ✅ Step 3: Test It!

1. **Sign Up** (if not done): Go to `/auth` → Create account with `tonnel@directed.dev`
2. **Login**: Sign in with your password
3. **Check Header**: You should see your username in top-right
4. **Go to Home**: Navigate to `/` 
5. **Edit Mode**: As admin, you'll have access to edit content (toolbar coming next!)

---

## 🎯 What's Been Implemented

### ✅ Phase 1 & 2: Authentication & Admin
- User login indicator in header (shows username/avatar)
- Admin role system working
- User dropdown menu (Profile, Sign Out)

### ✅ Phase 3: CMS Foundation  
- CMSContext updated with new auth
- Language tracking added
- CMS components ready (EditableText, EditableImage, AdminToolbar)

### ✅ Phase 4: Multi-Language Support
- Database supports 6 languages:
  - English (en)
  - Kiswahili (sw)
  - Amharic (am)
  - French (fr)
  - Spanish (es)
  - Chinese (zh)
- Language selector in header
- Content can be edited per language

---

## 🔄 Next Steps

**Remaining Work:**
1. Show AdminToolbar for logged-in admins
2. Integrate EditableText/EditableImage on all pages
3. Test editing workflow end-to-end

**Once done, you'll be able to:**
- Click any text/image on any page
- Edit it inline
- Save changes
- Switch languages and edit content for each language
