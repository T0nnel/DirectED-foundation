// Focus Areas Data Structure - PLACEHOLDER FOR YOUR CUSTOM CONTENT
// Replace the descriptions, stats, and content below with your own writing

export interface FocusArea {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    image?: string; // ADD YOUR IMAGE PATH HERE
    stats?: {
        label: string;
        value: string;
    }[];
    content: {
        overview: string;
        challenges: string[];
        solutions: string[];
        impact: string;
    };
}

export const focusAreas: FocusArea[] = [
    {
        id: 'education',
        title: 'Education & Learning',
        slug: 'education',
        description: 'Add your description about education initiatives here. Explain your focus on education and learning programs.',
        icon: 'GraduationCap',
        image: '/path/to/your/education-image.jpg', // REPLACE WITH YOUR IMAGE
        stats: [
            { label: 'Your Metric 1', value: '000+' }, // ADD YOUR STATISTICS
            { label: 'Your Metric 2', value: '00%' },
            { label: 'Your Metric 3', value: '00' }
        ],
        content: {
            overview: 'Write your overview paragraph here. Explain your approach to education and why it matters to your organization.',
            challenges: [
                'Add your first challenge statement here',
                'Add your second challenge here',
                'Add your third challenge',
                'Add more challenges as needed'
            ],
            solutions: [
                'Describe your first solution or intervention',
                'Describe your second solution',
                'Add your third solution',
                'Add more solutions as needed'
            ],
            impact: 'Write about the impact of your work here. Include specific outcomes and success stories if available.'
        }
    },
    {
        id: 'health',
        title: 'Health & Nutrition',
        slug: 'health',
        description: 'Add your description about health and nutrition programs here.',
        icon: 'Heart',
        image: '/path/to/your/health-image.jpg', // REPLACE WITH YOUR IMAGE
        stats: [
            { label: 'Your Health Metric 1', value: '000+' },
            { label: 'Your Health Metric 2', value: '00%' },
            { label: 'Your Health Metric 3', value: '00' }
        ],
        content: {
            overview: 'Write your health program overview here. Explain the health challenges you address.',
            challenges: [
                'Add your first health challenge',
                'Add your second health challenge',
                'Add your third health challenge',
                'Add more as needed'
            ],
            solutions: [
                'Describe your first health solution',
                'Describe your second health solution',
                'Add your third solution',
                'Add more solutions'
            ],
            impact: 'Describe the health impact of your programs. Include statistics and success metrics.'
        }
    },
    {
        id: 'protection',
        title: 'Child Protection',
        slug: 'protection',
        description: 'Add your description about child protection initiatives here.',
        icon: 'Shield',
        image: '/path/to/your/protection-image.jpg', // REPLACE WITH YOUR IMAGE
        stats: [
            { label: 'Protection Metric 1', value: '000+' },
            { label: 'Protection Metric 2', value: '00%' },
            { label: 'Protection Metric 3', value: '00' }
        ],
        content: {
            overview: 'Write about your child protection work here.',
            challenges: [
                'Add protection challenge 1',
                'Add protection challenge 2',
                'Add protection challenge 3',
                'Add more challenges'
            ],
            solutions: [
                'Describe protection solution 1',
                'Describe protection solution 2',
                'Describe protection solution 3',
                'Add more solutions'
            ],
            impact: 'Describe the impact of your protection programs.'
        }
    },
    {
        id: 'water',
        title: 'Water & Sanitation',
        slug: 'water',
        description: 'Add your description about water, sanitation, and hygiene programs.',
        icon: 'Droplet',
        image: '/path/to/your/water-image.jpg', // REPLACE WITH YOUR IMAGE
        stats: [
            { label: 'WASH Metric 1', value: '000+' },
            { label: 'WASH Metric 2', value: '00%' },
            { label: 'WASH Metric 3', value: '00' }
        ],
        content: {
            overview: 'Write about your WASH (Water, Sanitation, Hygiene) programs here.',
            challenges: [
                'Add WASH challenge 1',
                'Add WASH challenge 2',
                'Add WASH challenge 3',
                'Add more challenges'
            ],
            solutions: [
                'Describe WASH solution 1',
                'Describe WASH solution 2',
                'Describe WASH solution 3',
                'Add more solutions'
            ],
            impact: 'Describe the impact of your WASH programs.'
        }
    },
    {
        id: 'emergencies',
        title: 'Emergency Response',
        slug: 'emergencies',
        description: 'Add your description about emergency response and humanitarian work.',
        icon: 'AlertCircle',
        image: '/path/to/your/emergency-image.jpg', // REPLACE WITH YOUR IMAGE
        stats: [
            { label: 'Emergency Metric 1', value: '000+' },
            { label: 'Emergency Metric 2', value: '00%' },
            { label: 'Emergency Metric 3', value: '00' }
        ],
        content: {
            overview: 'Write about your emergency response capabilities here.',
            challenges: [
                'Add emergency challenge 1',
                'Add emergency challenge 2',
                'Add emergency challenge 3',
                'Add more challenges'
            ],
            solutions: [
                'Describe emergency solution 1',
                'Describe emergency solution 2',
                'Describe emergency solution 3',
                'Add more solutions'
            ],
            impact: 'Describe the impact of your emergency response work.'
        }
    },
    {
        id: 'climate',
        title: 'Climate & Environment',
        slug: 'climate',
        description: 'Add your description about climate action and environmental programs.',
        icon: 'Leaf',
        image: '/path/to/your/climate-image.jpg', // REPLACE WITH YOUR IMAGE
        stats: [
            { label: 'Climate Metric 1', value: '000+' },
            { label: 'Climate Metric 2', value: '00%' },
            { label: 'Climate Metric 3', value: '00' }
        ],
        content: {
            overview: 'Write about your climate and environmental work here.',
            challenges: [
                'Add climate challenge 1',
                'Add climate challenge 2',
                'Add climate challenge 3',
                'Add more challenges'
            ],
            solutions: [
                'Describe climate solution 1',
                'Describe climate solution 2',
                'Describe climate solution 3',
                'Add more solutions'
            ],
            impact: 'Describe the impact of your climate programs.'
        }
    }
];

export const getFocusAreaBySlug = (slug: string): FocusArea | undefined => {
    return focusAreas.find(area => area.slug === slug);
};
