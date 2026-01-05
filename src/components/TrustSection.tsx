import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TrustIndicator {
    logo?: string;
    name: string;
}

interface TrustSectionProps {
    title?: string;
    indicators: TrustIndicator[];
    className?: string;
    children?: ReactNode;
}

export const TrustSection = ({
    title = "Trusted by industry leaders",
    indicators,
    className,
    children
}: TrustSectionProps) => {
    return (
        <section className={cn("py-12 bg-background", className)}>
            <div className="container mx-auto px-6">
                {title && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center text-sm font-medium text-muted-foreground mb-8"
                    >
                        {title}
                    </motion.p>
                )}

                {children}

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    {indicators.map((indicator, index) => (
                        <motion.div
                            key={indicator.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            className="grayscale hover:grayscale-0 transition-all duration-300"
                        >
                            {indicator.logo ? (
                                <img
                                    src={indicator.logo}
                                    alt={indicator.name}
                                    className="h-8 md:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                                />
                            ) : (
                                <div className="px-6 py-3 bg-card rounded-lg border border-border">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {indicator.name}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
