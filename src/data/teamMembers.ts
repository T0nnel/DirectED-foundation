// Team Members - PLACEHOLDER FOR YOUR CUSTOM CONTENT
// Replace with your actual team members and their information

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    department: 'leadership' | 'programs' | 'operations' | 'partnerships' | 'technology';
    bio: string;
    image?: string; // ADD YOUR TEAM MEMBER PHOTO PATH HERE
    linkedin?: string;
    email?: string;
    achievements?: string[];
}

export const teamMembers: TeamMember[] = [
    {
        id: 'executive-director',
        name: 'Add Executive Director Name',
        role: 'Executive Director',
        department: 'leadership',
        bio: 'Write the executive director bio here. Include their background, experience, and vision for the organization.',
        image: '/path/to/director-photo.jpg', // REPLACE WITH YOUR IMAGE
        achievements: [
            'Add achievement 1',
            'Add achievement 2',
            'Add achievement 3',
            'Add more achievements'
        ]
    },
    {
        id: 'program-director',
        name: 'Add Program Director Name',
        role: 'Director of Programs',
        department: 'programs',
        bio: 'Write the program director bio here. Describe their role and expertise.',
        image: '/path/to/program-director-photo.jpg',
        achievements: [
            'Add program achievement 1',
            'Add program achievement 2',
            'Add program achievement 3'
        ]
    },
    {
        id: 'operations-director',
        name: 'Add Operations Director Name',
        role: 'Director of Operations',
        department: 'operations',
        bio: 'Write the operations director bio here.',
        image: '/path/to/ops-director-photo.jpg',
        achievements: [
            'Add operations achievement 1',
            'Add operations achievement 2',
            'Add operations achievement 3'
        ]
    }
    // ADD MORE TEAM MEMBERS AS NEEDED
];

export const getLeadershipTeam = (): TeamMember[] => {
    return teamMembers.filter(member => member.department === 'leadership');
};

export const getTeamByDepartment = (department: TeamMember['department']): TeamMember[] => {
    return teamMembers.filter(member => member.department === department);
};
