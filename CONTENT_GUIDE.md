# How to Add Your Custom Content and Images

This guide explains where and how to add your own writing and pictures to customize the website.

## Quick Start

All your content is stored in **data files** located in `src/data/`. Simply edit these files to add your own text and images.

---

## Where to Add Your Content

### 1. Focus Areas (`src/data/focusAreas.ts`)

**What it's for:** Main program areas (Education, Health, Protection, etc.)

**What to customize:**
- `title`: Your focus area name
- `description`: Short overview (1-2 sentences)
- `image`: Path to your hero image
- `stats`: Your key metrics (e.g., "500+ Children Served")
- `content.overview`: Detailed description paragraph
- `content.challenges`: List of challenges you address
- `content.solutions`: List of your solutions/interventions
- `content.impact`: Impact statement with results

**Example:**
```typescript
{
  title: 'Education & Learning',  // Change this
  description: 'Your description here',  // Add your text
  image: '/assets/education-hero.jpg',  // Add your image path
  stats: [
    { label: 'Students Reached', value: '1,000+' }  // Your numbers
  ],
  // ... more fields
}
```

### 2. Publications (`src/data/publications.ts`)

**What it's for:** Reports, research papers, case studies

**What to customize:**
- `title`: Your publication title
- `description`: What the publication covers
- `summary`: Key findings/highlights
- `coverImage`: Path to cover image
- `pdfUrl`: Path to your PDF file
- `author`: Author name
- `tags`: Keywords for filtering

**Example:**
```typescript
{
  title: 'Annual Report 2024',  // Your title
  summary: 'Highlights from our year...',  // Your summary
  coverImage: '/reports/annual-2024-cover.jpg',  // Your cover
  pdfUrl: '/reports/annual-2024.pdf',  // Your PDF
}
```

### 3. Team Members (`src/data/teamMembers.ts`)

**What it's for:** Your staff and leadership

**What to customize:**
- `name`: Team member name
- `role`: Their job title
- `bio`: Their background and experience
- `image`: Path to their photo
- `achievements`: List of accomplishments

**Example:**
```typescript
{
  name: 'Jane Doe',  // Change name
  role: 'Executive Director',  // Change role
  bio: 'Jane has 15 years of experience...',  // Add bio
  image: '/team/jane-doe.jpg',  // Add photo path
  achievements: [
    'Led 50+ programs',  // List achievements
    'Raised $5M in funding'
  ]
}
```

### 4. Impact Data (`src/data/impactData.ts`)

**What it's for:** Statistics and success stories

**What to customize:**

**Impact Stats:**
- `label`: Name of metric
- `value`: The number (e.g., "1,000+", "95%")
- `description`: What it measures
- `trend`: Growth percentage

**Impact Stories:**
- `title`: Story headline
- `personName`: Person's name
- `summary`: Their story
- `quote`: Direct quote
- `outcome`: What happened after
- `image`: Path to story photo

### 5. Partners (`src/data/partnerships.ts`)

**What it's for:** Organization partners

**What to customize:**
- `name`: Partner organization name
- `logo`: Path to partner logo
- `description`: What the partnership does
- `partnership.since`: Year started
- `partnership.achievements`: Results together

---

## How to Add Images

### Step 1: Add Your Images to the Project

1. Place your images in the `public/` folder or `src/assets/` folder
2. Organize them in subfolders (optional but recommended):
   - `public/team/` - team photos
   - `public/reports/` - report covers
   - `public/stories/` - story images
   - `public/partners/` - partner logos

### Step 2: Reference Images in Data Files

Use the path relative to the `public/` folder:

```typescript
// If image is at: public/team/director.jpg
image: '/team/director.jpg'

// If image is at: public/reports/annual-2024.jpg
coverImage: '/reports/annual-2024.jpg'
```

Or import from `src/assets/`:
```typescript
import heroImage from '@/assets/hero-image.jpg';
// Then use: image: heroImage
```

---

## Editing Tips

### 1. Keep Existing Structure
- Don't change the field names (like `title`, `description`, etc.)
- Only change the values (the text in quotes)

### 2. Add More Items
To add more focus areas, team members, etc., copy an existing item and modify it:

```typescript
export const teamMembers: TeamMember[] = [
  { /* existing member */ },
  { /* another member */ },
  { /* ADD YOUR NEW MEMBER HERE - copy format above */ }
];
```

### 3. Remove Items
To remove an item, delete the entire block:

```typescript
// DELETE THIS ENTIRE BLOCK to remove
{
  id: 'item-to-remove',
  title: 'Remove This',
  // ... rest of fields
},
```

---

## Where Content Appears on the Website

| Data File | Appears On Pages |
|-----------|------------------|
| `focusAreas.ts` | - Homepage spotlight section<br>- Focus area detail pages (`/focus/education`, etc.)<br>- Navigation menu |
| `publications.ts` | - Publications page (`/publications`)<br>- Can be filtered by type and year |
| `teamMembers.ts` | - Team page (`/team`)<br>- Organized by department |
| `impactData.ts` | - Data Hub page (`/data`)<br>- Homepage statistics |
| `partnerships.ts` | - Partnerships page (`/partnerships`)<br>- Can be filtered by type |

---

## Need Help?

- **Text looks weird?** Make sure your text is in quotes: `"Your text here"`
- **Image not showing?** Check the file path is correct and file exists
- **Page broken?** You might have accidentally deleted a comma or bracket - check for syntax errors

---

## Example: Complete Focus Area

Here's a fully filled out focus area as an example:

```typescript
{
  id: 'education',
  title: 'Quality Education for All',
  slug: 'education',
  description: 'Ensuring every child has access to quality education and learning opportunities.',
  icon: 'GraduationCap',
  image: '/focus-areas/education-hero.jpg',
  stats: [
    { label: 'Children in School', value: '5,000+' },
    { label: 'Schools Supported', value: '50' },
    { label: 'Graduation Rate', value: '95%' }
  ],
  content: {
    overview: 'Our education programs provide children with quality learning environments, trained teachers, and essential school supplies. We work in underserved communities to ensure no child is left behind.',
    challenges: [
      'Limited access to schools in rural areas',
      'Shortage of qualified teachers',
      'Lack of learning materials and infrastructure',
      'High dropout rates due to poverty'
    ],
    solutions: [
      'Building and renovating schools in remote areas',
      'Training and supporting teachers with ongoing professional development',
      'Providing textbooks, supplies, and digital learning tools',
      'Scholarship programs for vulnerable children',
      'Community engagement to keep children in school'
    ],
    impact: 'Since 2020, we have helped 5,000+ children access quality education, with a 95% graduation rate. Our scholarship program has kept 1,200 vulnerable children in school who otherwise would have dropped out.'
  }
}
```

---

**Ready to customize?** Start with `src/data/focusAreas.ts` and work your way through each file!
