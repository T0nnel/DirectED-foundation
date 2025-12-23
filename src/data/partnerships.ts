// Partnerships - PLACEHOLDER FOR YOUR CUSTOM CONTENT
// Add your partner organizations here

export interface Partner {
    id: string;
    name: string;
    type: 'corporate' | 'educational' | 'nonprofit' | 'government';
    logo?: string; // ADD YOUR PARTNER LOGO PATH HERE
    website?: string;
    description: string;
    partnership: {
        since: number;
        focus: string[];
        achievements: string[];
    };
    featured?: boolean;
}

export const partners: Partner[] = [
    {
        id: 'partner-1',
        name: 'Add Partner Organization Name',
        type: 'corporate',
        logo: '/path/to/partner-logo.png', // REPLACE WITH YOUR LOGO
        website: 'https://partner-website.com',
        description: 'Describe your partnership with this organization. Explain how you work together.',
        partnership: {
            since: 2020, // CHANGE TO YOUR PARTNERSHIP START YEAR
            focus: ['add', 'focus', 'areas'],
            achievements: [
                'Add partnership achievement 1',
                'Add partnership achievement 2',
                'Add partnership achievement 3'
            ]
        },
        featured: true
    },
    {
        id: 'partner-2',
        name: 'Add Another Partner Name',
        type: 'nonprofit',
        logo: '/path/to/partner-logo-2.png',
        website: 'https://partner2-website.com',
        description: 'Describe this partnership and its impact.',
        partnership: {
            since: 2021,
            focus: ['add', 'focus', 'areas'],
            achievements: [
                'Add achievement 1',
                'Add achievement 2',
                'Add achievement 3'
            ]
        },
        featured: true
    },
    {
        id: 'partner-3',
        name: 'Add Educational Partner',
        type: 'educational',
        logo: '/path/to/edu-partner-logo.png',
        website: 'https://edu-partner.com',
        description: 'Describe your collaboration with this educational institution.',
        partnership: {
            since: 2022,
            focus: ['education', 'capacity-building'],
            achievements: [
                'Add educational achievement 1',
                'Add educational achievement 2'
            ]
        },
        featured: false
    }
    // ADD MORE PARTNERS AS NEEDED
];

export const getPartnersByType = (type: Partner['type']): Partner[] => {
    return partners.filter(partner => partner.type === type);
};

export const getFeaturedPartners = (): Partner[] => {
    return partners.filter(partner => partner.featured);
};
