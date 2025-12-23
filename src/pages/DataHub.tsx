import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { impactStats, impactStories, getStatsByCategory } from "@/data/impactData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState } from "react";

const DataHub = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories = [
        { value: "all", label: "All Statistics" },
        { value: "education", label: "Education" },
        { value: "employment", label: "Employment" },
        { value: "reach", label: "Reach" },
        { value: "partners", label: "Partnerships" },
        { value: "financial", label: "Financial" },
    ];

    const filteredStats = selectedCategory === "all"
        ? impactStats
        : getStatsByCategory(selectedCategory as any);

    const getTrendIcon = (direction: string) => {
        switch (direction) {
            case "up":
                return <TrendingUp className="w-4 h-4 text-green-600" />;
            case "down":
                return <TrendingDown className="w-4 h-4 text-red-600" />;
            default:
                return <Minus className="w-4 h-4 text-gray-600" />;
        }
    };

    const getTrendColor = (direction: string) => {
        switch (direction) {
            case "up":
                return "text-green-600 bg-green-50";
            case "down":
                return "text-red-600 bg-red-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
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
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                                Data & Impact Statistics
                            </h1>
                            <p className="text-xl text-primary-foreground/90 leading-relaxed">
                                Transparent, data-driven insights into DirectEd Development Foundation's impact. Explore our key metrics,
                                trends, and the tangible difference we're making in education and employment.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="bg-background border-b border-border py-8">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.value}
                                    onClick={() => setSelectedCategory(category.value)}
                                    className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === category.value
                                        ? "bg-accent text-white"
                                        : "bg-card text-foreground hover:bg-muted"
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="py-20 bg-secondary">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredStats.map((stat, index) => (
                                <motion.div
                                    key={stat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-card rounded-2xl shadow-soft p-8"
                                >
                                    <div className="mb-4">
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                            {stat.category.replace('-', ' ')}
                                        </span>
                                    </div>

                                    <h3 className="text-4xl font-serif font-bold text-accent mb-2">
                                        {stat.value}
                                    </h3>

                                    <p className="font-medium text-foreground mb-3">
                                        {stat.label}
                                    </p>

                                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                        {stat.description}
                                    </p>

                                    {stat.trend && (
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getTrendColor(stat.trend.direction)}`}>
                                            {getTrendIcon(stat.trend.direction)}
                                            <span>{stat.trend.percentage}% {stat.trend.period}</span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Impact Stories */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full mb-6">
                                <span className="text-sm font-medium text-accent">Impact Stories</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Behind the Numbers
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Real stories of transformation from our graduates
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {impactStories.map((story, index) => (
                                <motion.div
                                    key={story.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card rounded-2xl shadow-soft overflow-hidden hover:shadow-elevated transition-all"
                                >
                                    <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-4xl font-serif font-bold text-primary mb-2">
                                                {story.studentName.split(' ').map(n => n[0]).join('')}
                                            </p>
                                            <p className="text-sm text-muted-foreground">{story.country}</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                                            {story.title}
                                        </h3>
                                        <div className="mb-4">
                                            <p className="text-sm text-muted-foreground mb-1">
                                                {story.program} • {story.year}
                                            </p>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                            {story.summary}
                                        </p>
                                        <blockquote className="border-l-4 border-accent pl-4 py-2 mb-4 italic text-sm text-muted-foreground">
                                            "{story.quote}"
                                        </blockquote>
                                        <p className="text-sm font-medium text-accent">
                                            {story.outcome}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Data Transparency CTA */}
                <section className="py-20 bg-primary">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                                Committed to Transparency
                            </h2>
                            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                                We believe in full transparency and accountability. All our data, impact metrics,
                                and financial information are publicly available.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors">
                                    Download Full Report
                                </button>
                                <button className="px-8 py-3 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors">
                                    View Annual Reports
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

export default DataHub;
