import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { publications, Publication } from "@/data/publications";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Download, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCMS } from "@/contexts/CMSContext";
import { EditableText } from "@/components/cms/EditableText";

const Publications = () => {
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedYear, setSelectedYear] = useState<number | "all">("all");
    const { loadPageContent } = useCMS();

    useEffect(() => {
        loadPageContent('publications');
    }, []);

    const types: { value: string; label: string }[] = [
        { value: "all", label: "All Publications" },
        { value: "annual-report", label: "Annual Reports" },
        { value: "impact-report", label: "Impact Reports" },
        { value: "research", label: "Research Papers" },
        { value: "case-study", label: "Case Studies" },
        { value: "whitepaper", label: "Whitepapers" },
    ];

    const years = ["all", ...Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a)];

    const filteredPublications = publications.filter((pub) => {
        const typeMatch = selectedType === "all" || pub.type === selectedType;
        const yearMatch = selectedYear === "all" || pub.year === selectedYear;
        return typeMatch && yearMatch;
    });

    const getTypeColor = (type: Publication["type"]) => {
        const colors = {
            "annual-report": "bg-accent/10 text-accent",
            "impact-report": "bg-blue-500/10 text-blue-600",
            research: "bg-purple-500/10 text-purple-600",
            "case-study": "bg-green-500/10 text-green-600",
            whitepaper: "bg-orange-500/10 text-orange-600",
        };
        return colors[type] || "bg-muted text-muted-foreground";
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
                                pageName="publications"
                                contentKey="hero_title"
                                defaultValue="Publications & Reports"
                                as="h1"
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
                            />
                            <EditableText
                                pageName="publications"
                                contentKey="hero_subtitle"
                                defaultValue="Explore our research, annual reports, case studies, and impact analyses documenting DirectEd Development Foundation's work and the transformative power of education."
                                as="p"
                                className="text-xl text-primary-foreground/90 leading-relaxed"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Filters */}
                <section className="bg-background border-b border-border py-8">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                    Publication Type
                                </label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                >
                                    {types.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full md:w-48">
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                    Year
                                </label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value === "all" ? "all" : parseInt(e.target.value))}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year === "all" ? "All Years" : year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Publications Grid */}
                <section className="py-20 bg-secondary">
                    <div className="container mx-auto px-6">
                        <div className="mb-8">
                            <p className="text-muted-foreground">
                                Showing {filteredPublications.length} {filteredPublications.length === 1 ? 'publication' : 'publications'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {filteredPublications.map((publication, index) => (
                                <motion.div
                                    key={publication.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all p-8"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-6 h-6 text-accent" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="font-serif text-xl font-bold text-foreground">
                                                    {publication.title}
                                                </h3>
                                                {publication.featured && (
                                                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full flex-shrink-0">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(publication.type)}`}>
                                                    {publication.category}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(publication.date).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {publication.summary}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {publication.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <Button variant="outline" className="gap-2 flex-1">
                                            <Download className="w-4 h-4" />
                                            Download PDF
                                        </Button>
                                        <Link to={`/publications/${publication.slug}`} className="flex-1">
                                            <Button variant="accent" className="w-full gap-2">
                                                Read More <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {filteredPublications.length === 0 && (
                            <div className="text-center py-16">
                                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                                    No Publications Found
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Try adjusting your filters to see more results.
                                </p>
                                <Button onClick={() => {
                                    setSelectedType("all");
                                    setSelectedYear("all");
                                }}>
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Publications;
