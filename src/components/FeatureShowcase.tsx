import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCard {
    icon: ReactNode;
    title: string;
    description: string;
}

interface FeatureShowcaseProps {
    features: FeatureCard[];
    className?: string;
}

export const FeatureShowcase = ({ features, className }: FeatureShowcaseProps) => {
    return (
        <section className={cn("py-20 bg-background", className)}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative"
                        >
                            <div className="relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 card-hover overflow-hidden">
                                {/* Accent gradient on dark green variant */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <motion.div
                                        className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        {feature.icon}
                                    </motion.div>

                                    <h3 className="font-serif text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                                        {feature.title}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Animated border on hover */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/20 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
