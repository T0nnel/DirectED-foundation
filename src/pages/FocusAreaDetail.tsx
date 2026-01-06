import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { focusAreas, getFocusAreaBySlug } from "@/data/focusAreas";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const FocusAreaDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const focusArea = getFocusAreaBySlug(slug || "");
    const { t } = useTranslation();

    if (!focusArea) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-serif font-bold mb-4">{t('focus.not_found', "Focus Area Not Found")}</h1>
                    <Link to="/what-we-do">
                        <Button>{t('focus.return', "Return to What We Do")}</Button>
                    </Link>
                </div>
            </div>
        );
    }

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
                            className="max-w-4xl"
                        >
                            <div className="inline-block px-4 py-1.5 bg-accent/20 rounded-full mb-6">
                                <span className="text-sm font-medium text-primary-foreground">{t('focus.badge', "Focus Area")}</span>
                            </div>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                                {focusArea.title}
                            </h1>
                            <p className="text-xl text-primary-foreground/90 leading-relaxed">
                                {focusArea.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                {focusArea.stats && focusArea.stats.length > 0 && (
                    <section className="py-16 bg-background">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {focusArea.stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-card rounded-xl p-8 text-center shadow-soft"
                                    >
                                        <div className="flex items-center justify-center mb-4">
                                            <TrendingUp className="w-8 h-8 text-accent" />
                                        </div>
                                        <h3 className="text-4xl font-serif font-bold text-accent mb-2">
                                            {stat.value}
                                        </h3>
                                        <p className="text-muted-foreground font-medium">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Overview Section */}
                <section className="py-20 bg-secondary">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full mb-6">
                                    <span className="text-sm font-medium text-accent">{t('focus.overview', "Overview")}</span>
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                                    {t('focus.our_approach', "Our Approach")}
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {focusArea.content.overview}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Challenges & Solutions */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Challenges */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-block px-4 py-1.5 bg-destructive/10 rounded-full mb-6">
                                    <span className="text-sm font-medium text-destructive">{t('focus.challenges', "Challenges")}</span>
                                </div>
                                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
                                    {t('focus.what_addressing', "What We're Addressing")}
                                </h3>
                                <ul className="space-y-4">
                                    {focusArea.content.challenges.map((challenge, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="w-2 h-2 rounded-full bg-destructive" />
                                            </span>
                                            <span className="text-muted-foreground">{challenge}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Solutions */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full mb-6">
                                    <span className="text-sm font-medium text-accent">{t('focus.solutions', "Solutions")}</span>
                                </div>
                                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
                                    {t('focus.how_helping', "How We're Helping")}
                                </h3>
                                <ul className="space-y-4">
                                    {focusArea.content.solutions.map((solution, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">{solution}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="py-20 bg-primary">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="inline-block px-4 py-1.5 bg-accent/20 rounded-full mb-6">
                                    <span className="text-sm font-medium text-primary-foreground">{t('focus.impact', "Impact")}</span>
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                                    {t('focus.making_difference', "Making a Difference")}
                                </h2>
                                <p className="text-lg text-primary-foreground/90 leading-relaxed mb-8">
                                    {focusArea.content.impact}
                                </p>
                                <Link to="/take-action">
                                    <Button variant="accent" size="lg" className="gap-2">
                                        {t('focus.support_cause', "Support This Cause")} <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Related Focus Areas */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-6">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
                            {t('focus.explore_more', "Explore More Focus Areas")}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {focusAreas
                                .filter((area) => area.slug !== slug)
                                .slice(0, 3)
                                .map((area, index) => (
                                    <motion.div
                                        key={area.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={`/focus/${area.slug}`}
                                            className="block bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 h-full"
                                        >
                                            <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                                                {area.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                {area.description}
                                            </p>
                                            <span className="text-accent font-medium text-sm flex items-center gap-2">
                                                Learn more <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FocusAreaDetail;
