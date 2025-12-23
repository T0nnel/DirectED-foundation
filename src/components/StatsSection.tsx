import { motion } from "framer-motion";
import { ReactNode } from "react";

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
    <section className={`py-20 ${isDark ? "bg-primary" : "bg-secondary"}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              {stat.icon && (
                <div className={`mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full ${isDark ? "bg-primary-foreground/10" : "bg-primary/10"}`}>
                  {stat.icon}
                </div>
              )}
              <p className={`font-serif text-4xl md:text-5xl font-bold mb-2 ${isDark ? "text-primary-foreground" : "text-primary"}`}>
                {stat.value}
              </p>
              <p className={`text-sm md:text-base ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
