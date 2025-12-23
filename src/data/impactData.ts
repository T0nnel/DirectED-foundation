// Impact Data and Statistics - PLACEHOLDER FOR YOUR CUSTOM CONTENT
// Add your own impact metrics and success stories

export interface ImpactStat {
    id: string;
    category: 'education' | 'health' | 'protection' | 'reach' | 'partners' | 'financial';
    label: string;
    value: string;
    description: string;
    trend?: {
        direction: 'up' | 'down' | 'stable';
        percentage: number;
        period: string;
    };
}

export interface ImpactStory {
    id: string;
    title: string;
    personName: string;
    location: string;
    program: string;
    year: number;
    summary: string;
    quote: string;
    outcome: string;
    image?: string; // ADD YOUR STORY IMAGE PATH HERE
    tags: string[];
}

export const impactStats: ImpactStat[] = [
    {
        id: 'stat-1',
        category: 'education',
        label: 'Add Your Metric Label',
        value: '000+',
        description: 'Describe what this statistic represents',
        trend: {
            direction: 'up',
            percentage: 0, // ADD YOUR PERCENTAGE
            period: 'vs. previous year'
        }
    },
    {
        id: 'stat-2',
        category: 'health',
        label: 'Add Another Metric Label',
        value: '00%',
        description: 'Describe this health metric',
        trend: {
            direction: 'up',
            percentage: 0,
            period: 'vs. previous year'
        }
    },
    {
        id: 'stat-3',
        category: 'reach',
        label: 'Add Reach Metric',
        value: '00',
        description: 'Describe your reach or coverage',
        trend: {
            direction: 'up',
            percentage: 0,
            period: 'vs. previous year'
        }
    }
    // ADD MORE STATISTICS AS NEEDED
];

export const impactStories: ImpactStory[] = [
    {
        id: 'story-1',
        title: 'Add Your Impact Story Title',
        personName: 'Add Person Name',
        location: 'Add Location',
        program: 'Add Program Name',
        year: 2024,
        summary: 'Write a summary of this impact story. Describe the person background, the challenge they faced, and how your organization helped.',
        quote: 'Add a powerful quote from the person or about the impact.',
        outcome: 'Describe the positive outcome and current status.',
        image: '/path/to/story-image.jpg', // REPLACE WITH YOUR IMAGE
        tags: ['add', 'relevant', 'tags']
    },
    {
        id: 'story-2',
        title: 'Add Second Impact Story Title',
        personName: 'Add Another Person Name',
        location: 'Add Location',
        program: 'Add Program Name',
        year: 2024,
        summary: 'Write another impact story summary here.',
        quote: 'Add another inspiring quote.',
        outcome: 'Describe the outcome for this story.',
        image: '/path/to/story-image-2.jpg',
        tags: ['add', 'tags', 'here']
    }
    // ADD MORE IMPACT STORIES AS NEEDED
];

export const getStatsByCategory = (category: ImpactStat['category']): ImpactStat[] => {
    return impactStats.filter(stat => stat.category === category);
};

export const getStoriesByLocation = (location: string): ImpactStory[] => {
    return impactStories.filter(story => story.location === location);
};
