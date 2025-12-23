import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  imagePosition?: "left" | "right";
  cta?: {
    label: string;
    href: string;
  };
  badge?: string;
  children?: ReactNode;
}

export const ContentSection = ({
  title,
  subtitle,
  description,
  image,
  imagePosition = "right",
  cta,
  badge,
  children,
}: ContentSectionProps) => {
  const isImageRight = imagePosition === "right";

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isImageRight ? "lg:flex-row-reverse" : ""}`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={isImageRight ? "" : "lg:order-2"}
          >
            {badge && (
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                {badge}
              </span>
            )}
            {subtitle && (
              <p className="text-accent font-medium mb-2">{subtitle}</p>
            )}
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {description}
            </p>
            {children}
            {cta && (
              <Button variant="accent" size="lg">
                {cta.label}
              </Button>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative ${isImageRight ? "" : "lg:order-1"}`}
          >
            <div className="relative">
              <img
                src={image}
                alt={title}
                className="w-full h-auto rounded-2xl shadow-elevated"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
