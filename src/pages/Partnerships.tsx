import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { partners, getPartnersByType, Partner } from "@/data/partnerships";
import { Building2, GraduationCap, Heart, Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import { useCMS } from "@/contexts/CMSContext";
import { EditableText } from "@/components/cms/EditableText";

const Partnerships = () => {
    const [selectedType, setSelectedType] = useState<string>("all");
    const { loadPageContent } = useCMS();

    useEffect(() => {
        loadPageContent('partnerships');
    }, []);

    const types = [
        { value: "all", label: "All Partners", icon: Building2 },
        { value: "corporate", label: "Corporate", icon: Building2 },
        { value: "educational", label: "Educational", icon: GraduationCap },
        { value: "nonprofit", label: "Non-Profit", icon: Heart },
        { value: "government", label: "Government", icon: Landmark },
    ];

    const filteredPartners = selectedType === "all"
        ? partners
        : getPartnersByType(selectedType as Partner["type"]);

    const getIcon = (type: Partner["type"]) => {
        const icons = {
            corporate: Building2,
            educational: GraduationCap,
            nonprofit: Heart,
            government: Landmark,
        };
        const Icon = icons[type];
        return <Icon className="w-6 h-6" />;
    };

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
                            <EditableText
                                pageName="partnerships"
                                contentKey="hero_title"
                                defaultValue="Our Partners"
                                as="h1"
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
                            />
                            <EditableText
                                pageName="partnerships"
                                contentKey="hero_subtitle"
                                defaultValue="DirectEd Development Foundation's impact is amplified through strategic partnerships with leading corporations, educational institutions, nonprofits, and government agencies committed to transforming lives through education."
                                as="p"
                                className="text-xl text-primary-foreground/90 leading-relaxed"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="bg-background border-b border-border py-8">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap gap-3">
                            {types.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.value}
                                        onClick={() => setSelectedType(type.value)}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${selectedType === type.value
                                            ? "bg-accent text-white"
                                            : "bg-card text-foreground hover:bg-muted"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {type.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Partners Grid */}
                <section className="py-20 bg-secondary">
                    <div className="container mx-auto px-6">
                        <div className="mb-8">
                            <p className="text-muted-foreground">
                                Showing {filteredPartners.length} {filteredPartners.length === 1 ? 'partner' : 'partners'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {filteredPartners.map((partner, index) => (
                                <motion.div
                                    key={partner.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all p-8"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            {getIcon(partner.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <h3 className="font-serif text-2xl font-bold text-foreground">
                                                    {partner.name}
                                                </h3>
                                                {partner.featured && (
                                                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full flex-shrink-0">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-accent text-sm font-medium mt-1 capitalize">
                                                {partner.type.replace('-', ' ')} Partner
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {partner.description}
                                    </p>

                                    <div className="border-t border-border pt-6 space-y-4">
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground mb-2">
                                                Partnership Since
                                            </p>
                                            <p className="text-foreground font-semibold">{partner.partnership.since}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground mb-2">
                                                Focus Areas
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {partner.partnership.focus.map((focus) => (
                                                    <span
                                                        key={focus}
                                                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full capitalize"
                                                    >
                                                        {focus.replace('-', ' ')}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground mb-2">
                                                Key Achievements
                                            </p>
                                            <ul className="space-y-1">
                                                {partner.partnership.achievements.map((achievement, idx) => (
                                                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Become a Partner CTA */}
                <section className="py-20 bg-primary">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                                Become a Partner
                            </h2>
                            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                                Join us in creating opportunities and transforming lives. Whether you're a corporation
                                looking to hire talent, an educational institution seeking collaboration, or an organization
                                aligned with our mission, we'd love to partner with you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors">
                                    Partner With Us
                                </button>
                                <button className="px-8 py-3 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Partnerships;
