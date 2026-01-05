# CMS Integration Guide

## How to Make Content Editable

This guide shows how to use the CMS components to make text and images editable by admins.

### Basic Usage

#### EditableText Component

Replace hardcoded text with `<EditableText>`:

**Before:**
```tsx
<h1 className="text-4xl font-bold">Empowering Tech Leaders</h1>
```

**After:**
```tsx
<EditableText
  pageName="home"
  contentKey="hero_title"
  defaultValue="Empowering Tech Leaders"
  as="h1"
  className="text-4xl font-bold"
/>
```

#### EditableImage Component

Replace hardcoded images with `<EditableImage>`:

**Before:**
```tsx
<img src={heroImage} alt="Hero" className="w-full h-auto" />
```

**After:**
```tsx
<EditableImage
  pageName="home"
  contentKey="hero_image"
  defaultSrc={heroImage}
  alt="Hero"
  className="w-full h-auto"
/>
```

### Component Props

#### EditableText Props
- `pageName` (required): The page identifier (e.g., 'home', 'about', 'team')
- `contentKey` (required): Unique key for this content (e.g., 'hero_title', 'mission_desc')
- `defaultValue` (required): The default text to show
- `as` (optional): HTML element type ('h1', 'h2', 'p', etc.) - default: 'p'
- `className` (optional): CSS classes to apply
- `richText` (optional): Enable rich text editing - default: false

#### EditableImage Props
- `pageName` (required): The page identifier
- `contentKey` (required): Unique key for this image
- `defaultSrc` (required): The default image URL/path
- `alt` (optional): Alt text for the image
- `className` (optional): CSS classes for the image
- `containerClassName` (optional): CSS classes for the container div

### Page Setup

Each page needs to:

1. Import CMS components and hook:
```tsx
import { useEffect } from "react";
import { useCMS } from "@/contexts/CMSContext";
import { EditableText } from "@/components/cms/EditableText";
import { EditableImage } from "@/components/cms/EditableImage";
```

2. Call `loadPageContent` in useEffect:
```tsx
const { loadPageContent } = useCMS();

useEffect(() => {
  loadPageContent('yourPageName');
}, []);
```

3. Replace content with editable components

### Naming Conventions

**Page Names:**
- Use lowercase, descriptive names
- Examples: 'home', 'about', 'team', 'programs', 'contact'

**Content Keys:**
- Use descriptive, snake_case keys
- Include section and type
- Examples:
  - `hero_title` - Main hero title
  - `hero_subtitle` - Hero subtitle
  - `mission_description` - Mission section description
  - `team_member_1_name` - First team member's name
  - `hero_bg_image` - Hero background image
  - `about_section_image` - About section image

### Examples

#### Hero Section
```tsx
<section className="hero">
  <EditableImage
    pageName="home"
    contentKey="hero_background"
    defaultSrc={heroBg}
    className="absolute inset-0 object-cover"
  />
  <EditableText
    pageName="home"
    contentKey="hero_title"
    defaultValue="Transform Your Future"
    as="h1"
    className="text-5xl font-bold"
  />
  <EditableText
    pageName="home"
    contentKey="hero_subtitle"
    defaultValue="Join our mission to empower the next generation"
    as="p"
    className="text-xl mt-4"
  />
</section>
```

#### Rich Text Example
For content that needs formatting (bold, italic, etc):

```tsx
<EditableText
  pageName="about"
  contentKey="mission_statement"
  defaultValue="We <strong>empower</strong> communities through <em>education</em>"
  richText={true}
  as="div"
  className="prose max-w-none"
/>
```

#### Team Member Cards
```tsx
{teamMembers.map((member, index) => (
  <div key={index}>
    <EditableImage
      pageName="team"
      contentKey={`team_member_${index}_photo`}
      defaultSrc={member.photo}
      alt={member.name}
      className="w-32 h-32 rounded-full"
    />
    <EditableText
      pageName="team"
      contentKey={`team_member_${index}_name`}
      defaultValue={member.name}
      as="h3"
      className="text-xl font-bold mt-4"
    />
    <EditableText
      pageName="team"
      contentKey={`team_member_${index}_role`}
      defaultValue={member.role}
      as="p"
      className="text-muted-foreground"
    />
  </div>
))}
```

### Best Practices

1. **Unique Content Keys**: Ensure each content key is unique within a page
2. **Default Values**: Always provide meaningful default values
3. **Batch Updates**: Changes are saved when admin clicks "Save All Changes"
4. **Preview Mode**: Admins can toggle preview to see changes before saving
5. **Load Content**: Always call `loadPageContent` for each page

### Admin Workflow

1. **Login**: Admin logs in at `/auth`
2. **Redirect**: Automatically redirected to home with edit mode enabled
3. **Edit Mode**: Admin toolbar appears in bottom-right
4. **Edit**: Click any text/image to edit
5. **Preview**: Toggle preview to see changes without edit UI
6. **Save**: Click "Save All Changes" to persist to database
7. **Discard**: Click "Discard Changes" to revert unsaved edits

### Troubleshooting

**Content not loading:**
- Check that `loadPageContent('pageName')` is called in useEffect
- Verify pageName matches what's in the database
- Check browser console for errors

**Changes not saving:**
- Ensure user has admin role in `user_roles` table
- Check Supabase RLS policies
- Verify `page-images` storage bucket exists

**Images not uploading:**
- Create `page-images` bucket in Supabase Storage
- Set bucket to public read access
- Configure storage policies for admin write access
