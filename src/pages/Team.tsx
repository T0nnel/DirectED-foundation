import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { teamMembers, getLeadershipTeam, TeamMember } from "@/data/teamMembers";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
    const leadershipTeam = getLeadershipTeam();
    const otherTeam = teamMembers.filter(member => member.department !== 'leadership');

    const departments = [
        { id: 'programs', name: 'Programs', description: 'Delivering world-class training and student success' },
        { id: 'partnerships', name: 'Partnerships', description: 'Building bridges to global opportunities' },
        { id: 'operations', name: 'Operations', description: 'Ensuring organizational excellence' },
        { id: 'technology', name: 'Technology', description: 'Powering our learning platforms' }
    ];

    const TeamMemberCard = ({ member }: { member: TeamMember }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl shadow-soft overflow-hidden hover:shadow-elevated transition-all"
        >
            <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-serif text-4xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                    {member.name}
                </h3>
                <p className="text-accent font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {member.bio}
                </p>

                {member.achievements && member.achievements.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Key Achievements:</p>
                        <ul className="space-y-1">
                            {member.achievements.slice(0, 3).map((achievement, idx) => (
                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex gap-2">
                    {member.linkedin && (
                        <Button variant="outline" size="sm" className="gap-2">
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                        </Button>
                    )}
                    {member.email && (
                        <Button variant="outline" size="sm" className="gap-2">
                            <Mail className="w-4 h-4" />
                            Contact
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-primary py-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                                Our Team
                            </h1>
                            <p className="text-xl text-primary-foreground/90 leading-relaxed">
                                Meet the dedicated professionals working tirelessly to transform lives through education
                                and create opportunities for Africa's next generation of tech leaders.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Leadership Team */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full mb-6">
                                <span className="text-sm font-medium text-accent">Leadership</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Executive Leadership
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Visionary leaders guiding DirectEd Development Foundation's mission and strategic direction
                            </p>
                            <div className="section-divider mt-6" />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {leadershipTeam.map((member) => (
                                <TeamMemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Department Teams */}
                {departments.map((dept, deptIndex) => {
                    const deptMembers = otherTeam.filter(m => m.department === dept.id);
                    if (deptMembers.length === 0) return null;

                    return (
                        <section
                            key={dept.id}
                            className={`py-20 ${deptIndex % 2 === 0 ? 'bg-secondary' : 'bg-background'}`}
                        >
                            <div className="container mx-auto px-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center mb-16"
                                >
                                    <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full mb-6">
                                        <span className="text-sm font-medium text-accent">{dept.name}</span>
                                    </div>
                                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                                        {dept.name} Team
                                    </h2>
                                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                        {dept.description}
                                    </p>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {deptMembers.map((member) => (
                                        <TeamMemberCard key={member.id} member={member} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                })}

                {/* Join Our Team CTA */}
                <section className="py-20 bg-primary">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                                Join Our Team
                            </h2>
                            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                                We're always looking for talented, passionate individuals who want to make a difference.
                                Join us in transforming lives through education.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="accent" size="lg">
                                    View Open Positions
                                </Button>
                                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                                    Learn About Working Here
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Team;
