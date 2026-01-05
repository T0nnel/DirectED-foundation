import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Card3D } from "@/components/Card3D";
import { GridPattern } from "@/components/GridPattern";


interface StatItem {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface StatsSectionProps {
  stats: StatItem[];
  variant?: "dark" | "light";
}

export const StatsSection = ({ stats, variant = "dark" }: StatsSectionProps) => {
  const isDark = variant === "dark";

  return (
    <section className={`relative py-20 ${isDark ? "bg-primary" : "bg-secondary"} overflow-hidden`}>
      {isDark && <GridPattern className="opacity-30" gridColor="hsl(var(--primary-foreground) / 0.1)" />}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card3D key={index} intensity={10}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/20"
              >
                {stat.icon && (
                  <motion.div
                    className={`mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full ${isDark ? "bg-[hsl(175_70%_50%/0.15)] text-[hsl(175_70%_50%)]" : "bg-primary/10"}`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                )}
                <motion.p
                  className={`font-serif text-4xl md:text-5xl font-bold mb-2 ${isDark ? "text-primary-foreground" : "text-primary"}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.p>
                <p className={`text-sm md:text-base ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {stat.label}
                </p>
              </motion.div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};
