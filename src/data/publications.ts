// Publications and Reports - PLACEHOLDER FOR YOUR CUSTOM CONTENT
// Add your own reports, publications, and documents here

export interface Publication {
    id: string;
    title: string;
    slug: string;
    type: 'annual-report' | 'impact-report' | 'research' | 'case-study' | 'whitepaper';
    category: string;
    date: string;
    year: number;
    author?: string;
    description: string;
    summary: string;
    coverImage?: string; // ADD YOUR COVER IMAGE PATH HERE
    pdfUrl?: string; // ADD YOUR PDF URL HERE
    externalUrl?: string;
    tags: string[];
    featured?: boolean;
}

export const publications: Publication[] = [
    {
        id: 'annual-report-2024',
        title: 'Annual Report 2024 - ADD YOUR TITLE',
        slug: 'annual-report-2024',
        type: 'annual-report',
        category: 'Annual Reports',
        date: '2024-12-01',
        year: 2024,
        description: 'Add your annual report description here. Explain what this report covers.',
        summary: 'Write a summary of your annual report. Highlight key achievements and milestones.',
        coverImage: '/path/to/your/report-cover.jpg', // REPLACE WITH YOUR IMAGE
        pdfUrl: '/path/to/your/report.pdf', // ADD YOUR PDF PATH
        tags: ['annual-report', 'impact', 'transparency'],
        featured: true
    },
    {
        id: 'impact-report-2024',
        title: 'Impact Report 2024 - ADD YOUR TITLE',
        slug: 'impact-report-2024',
        type: 'impact-report',
        category: 'Impact Reports',
        date: '2024-10-15',
        year: 2024,
        description: 'Add your impact report description here.',
        summary: 'Write a summary highlighting your impact metrics and outcomes.',
        coverImage: '/path/to/your/impact-cover.jpg', // REPLACE WITH YOUR IMAGE
        pdfUrl: '/path/to/your/impact-report.pdf',
        tags: ['impact', 'outcomes', 'results'],
        featured: true
    },
    {
        id: 'research-paper-1',
        title: 'Research Paper - ADD YOUR TITLE',
        slug: 'research-paper-1',
        type: 'research',
        category: 'Research Papers',
        date: '2024-08-20',
        year: 2024,
        author: 'Add Author Name',
        description: 'Add your research paper description.',
        summary: 'Write a summary of your research findings and conclusions.',
        coverImage: '/path/to/your/research-cover.jpg',
        pdfUrl: '/path/to/your/research.pdf',
        tags: ['research', 'study', 'analysis'],
        featured: false
    },
    {
        id: 'case-study-1',
        title: 'Case Study - ADD YOUR TITLE',
        slug: 'case-study-1',
        type: 'case-study',
        category: 'Case Studies',
        date: '2024-09-05',
        year: 2024,
        description: 'Add your case study description here.',
        summary: 'Write a summary of this case study and its key learnings.',
        coverImage: '/path/to/your/case-study-cover.jpg',
        pdfUrl: '/path/to/your/case-study.pdf',
        tags: ['case-study', 'success-story', 'impact'],
        featured: true
    }
];

export const getPublicationBySlug = (slug: string): Publication | undefined => {
    return publications.find(pub => pub.slug === slug);
};

export const getPublicationsByType = (type: Publication['type']): Publication[] => {
    return publications.filter(pub => pub.type === type);
};

export const getPublicationsByYear = (year: number): Publication[] => {
    return publications.filter(pub => pub.year === year);
};

export const getFeaturedPublications = (): Publication[] => {
    return publications.filter(pub => pub.featured);
};
