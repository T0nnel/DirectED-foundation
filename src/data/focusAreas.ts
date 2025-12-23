// Focus Areas Data Structure for DirectEd Development Foundation

export interface FocusArea {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    image?: string;
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
        id: 'youth-employment',
        title: 'Youth Employment',
        slug: 'youth-employment',
        description: 'Bridging the gap between education and employment for African youth through world-class training and paid internships.',
        icon: 'Briefcase',
        stats: [
            { label: 'Youth Trained', value: '500+' },
            { label: 'Employment Rate', value: '85%' },
            { label: 'Partner Companies', value: '50+' }
        ],
        content: {
            overview: 'DirectEd Development Foundation empowers African youth through comprehensive employment programs that combine cutting-edge technical training with real-world work experience. Our approach bridges the critical gap between education and meaningful employment in the tech sector.',
            challenges: [
                'High youth unemployment rates across Africa, particularly in the tech sector',
                'Skills mismatch between traditional education and industry requirements',
                'Limited access to quality training and mentorship opportunities',
                'Lack of professional networks and job placement support'
            ],
            solutions: [
                'World-class training programs in web development, UI/UX design, and AI',
                'Paid remote internships with leading global tech companies',
                'Comprehensive career development and job placement services',
                'Mentorship programs connecting youth with industry professionals',
                'Ongoing skill development and professional certifications'
            ],
            impact: 'Our youth employment initiatives have transformed lives across Africa, with over 500 young people trained and 85% successfully placed in meaningful tech careers. Graduates earn competitive salaries and contribute to their local economies while building sustainable careers in technology.'
        }
    },
    {
        id: 'technology-innovation',
        title: 'Technology & Innovation',
        slug: 'technology-innovation',
        description: 'Driving technological advancement and innovation capacity across Africa through education, infrastructure, and ecosystem development.',
        icon: 'Cpu',
        stats: [
            { label: 'Learning Centers', value: '15+' },
            { label: 'Tech Students', value: '1,200+' },
            { label: 'Innovation Projects', value: '100+' }
        ],
        content: {
            overview: 'We believe technology is the key to unlocking Africa\'s potential. Our technology and innovation programs focus on building digital infrastructure, developing local tech talent, and fostering an ecosystem where African innovators can thrive and compete globally.',
            challenges: [
                'Limited access to modern technology infrastructure in rural and underserved areas',
                'Shortage of qualified tech educators and industry mentors',
                'Brain drain as talented developers seek opportunities abroad',
                'Lack of funding and support for local tech innovation',
                'Digital divide limiting participation in the global tech economy'
            ],
            solutions: [
                'Establishment of technology learning centers equipped with modern infrastructure',
                'Curriculum development aligned with global industry standards',
                'Partnerships with tech companies for knowledge transfer and resources',
                'Innovation incubators supporting local tech startups and projects',
                'Train-the-trainer programs building local teaching capacity',
                'Provision of laptops, internet connectivity, and learning resources'
            ],
            impact: 'Through our technology programs, we\'ve established 15+ learning centers across Africa, trained over 1,200 students in cutting-edge technologies, and supported 100+ innovation projects. Our initiatives are creating a new generation of African tech leaders who are building solutions for local challenges while competing in the global marketplace.'
        }
    },
    {
        id: 'gender-equality',
        title: 'Gender Equality',
        slug: 'gender-equality',
        description: 'Promoting equal access to technology education and careers for women and girls across Africa.',
        icon: 'Users',
        stats: [
            { label: 'Women in Tech', value: '45%' },
            { label: 'Girls Trained', value: '600+' },
            { label: 'Female Leaders', value: '30+' }
        ],
        content: {
            overview: 'DirectEd Development Foundation is committed to closing the gender gap in technology. We actively recruit, train, and mentor women and girls, ensuring they have equal access to opportunities in the rapidly growing tech sector. Our programs are specifically designed to address the unique barriers women face in STEM fields.',
            challenges: [
                'Significant gender imbalance in tech education and employment in Africa',
                'Cultural barriers and stereotypes limiting women\'s participation in STEM',
                'Lack of female role models and mentors in the technology sector',
                'Safety and accessibility concerns for women in tech spaces',
                'Lower enrollment and completion rates for girls in technical programs'
            ],
            solutions: [
                'Targeted recruitment campaigns to attract more women and girls to tech programs',
                'Women-focused scholarships and financial support for tech education',
                'Female mentorship networks connecting students with successful women in tech',
                'Safe, inclusive learning environments designed for women\'s success',
                'Leadership development programs for women in technology',
                'Partnership with women-led tech companies and organizations',
                'Advocacy and awareness campaigns challenging gender stereotypes'
            ],
            impact: 'Our gender equality initiatives have achieved remarkable results: 45% of our program participants are women (significantly above the industry average), we\'ve trained over 600 girls in technology skills, and developed 30+ female tech leaders who are now mentors themselves. Women graduates from our programs are breaking barriers and becoming role models in their communities.'
        }
    },
    {
        id: 'ai-education',
        title: 'AI & Emerging Technologies',
        slug: 'ai-education',
        description: 'Preparing African youth for the future through cutting-edge AI and emerging technology education.',
        icon: 'BrainCircuit',
        stats: [
            { label: 'AI Students', value: '300+' },
            { label: 'AI Projects', value: '50+' },
            { label: 'Certifications', value: '200+' }
        ],
        content: {
            overview: 'As artificial intelligence reshapes the global economy, DirectEd ensures African youth are not left behind. Our AI and emerging technologies programs provide hands-on education in machine learning, data science, and cutting-edge technologies, positioning African talent to lead in the AI revolution.',
            challenges: [
                'Limited exposure to AI and emerging technologies in traditional African education',
                'Scarcity of qualified AI instructors and learning resources',
                'High cost of AI-specific hardware and cloud computing resources',
                'Perception that AI careers are inaccessible to African youth',
                'Lack of locally relevant AI applications and use cases'
            ],
            solutions: [
                'Comprehensive AI curriculum covering machine learning, deep learning, and NLP',
                'Access to cloud computing platforms and AI development tools',
                'Project-based learning focused on solving African challenges with AI',
                'Partnerships with leading AI companies for mentorship and resources',
                'Industry-recognized certifications in AI and data science',
                'AI ethics education ensuring responsible technology development'
            ],
            impact: 'Our AI programs have trained over 300 students in artificial intelligence and emerging technologies, resulting in 200+ industry certifications and 50+ AI projects addressing local challenges. Graduates are working in AI roles at leading tech companies and building innovative AI solutions for African markets.'
        }
    },
    {
        id: 'digital-literacy',
        title: 'Digital Literacy',
        slug: 'digital-literacy',
        description: 'Building foundational digital skills to ensure all Africans can participate in the digital economy.',
        icon: 'BookOpen',
        stats: [
            { label: 'People Trained', value: '2,000+' },
            { label: 'Communities', value: '25+' },
            { label: 'Digital Access', value: '90%' }
        ],
        content: {
            overview: 'Digital literacy is the foundation for participation in the modern economy. We provide essential digital skills training to individuals and communities across Africa, ensuring that everyone can access online services, communicate digitally, and pursue opportunities in the digital economy.',
            challenges: [
                'Low digital literacy rates, particularly in rural and underserved communities',
                'Limited access to devices and internet connectivity',
                'Language barriers in technology education (most content in English)',
                'Age gaps in digital adoption and comfort with technology',
                'Lack of locally relevant digital skills training'
            ],
            solutions: [
                'Community-based digital literacy programs in local languages',
                'Mobile device training and basic computer skills workshops',
                'Internet safety and digital citizenship education',
                'E-commerce and online business skills for entrepreneurs',
                'Partnership with telecom providers for affordable connectivity',
                'Train-the-trainer programs building local digital literacy capacity'
            ],
            impact: 'Through our digital literacy initiatives, we\'ve reached over 2,000 people across 25+ communities, with 90% reporting improved digital access and skills. Participants are now able to access online services, communicate with family abroad, run online businesses, and pursue digital opportunities that were previously out of reach.'
        }
    },
    {
        id: 'education-access',
        title: 'Education Access',
        slug: 'education-access',
        description: 'Ensuring all African youth have access to quality education regardless of geography or economic status.',
        icon: 'GraduationCap',
        stats: [
            { label: 'Scholarships Awarded', value: '800+' },
            { label: 'Remote Learners', value: '1,500+' },
            { label: 'Partner Schools', value: '40+' }
        ],
        content: {
            overview: 'Quality education should not be limited by geography or economic circumstances. DirectEd Development Foundation works to remove barriers to education through scholarships, remote learning programs, and partnerships that bring world-class education to underserved communities across Africa.',
            challenges: [
                'Economic barriers preventing talented youth from accessing quality education',
                'Geographic isolation limiting educational opportunities in rural areas',
                'Inadequate infrastructure in existing educational institutions',
                'Shortage of qualified teachers, particularly in STEM subjects',
                'High dropout rates due to financial and social pressures'
            ],
            solutions: [
                'Merit-based and need-based scholarship programs for deserving students',
                'Remote learning platforms providing access to quality content anywhere',
                'Partnerships with schools to improve infrastructure and resources',
                'Teacher training and professional development programs',
                'Student support systems including tutoring and mentorship',
                'Provision of learning materials, devices, and internet connectivity'
            ],
            impact: 'Our education access initiatives have awarded 800+ scholarships to talented youth from underserved backgrounds, enabled 1,500+ students to learn remotely, and improved education quality through partnerships with 40+ schools. Students in our programs show dramatic improvements in academic performance and career prospects.'
        }
    }
];

export const getFocusAreaBySlug = (slug: string): FocusArea | undefined => {
    return focusAreas.find(area => area.slug === slug);
};
