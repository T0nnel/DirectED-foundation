import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
}

export const CTASection = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: CTASectionProps) => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-primary/85" />
        </>
      ) : (
        <div className="absolute inset-0 bg-primary" />
      )}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="accent"
              size="lg"
              className="text-lg px-8"
            >
              {primaryCta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {secondaryCta && (
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 border-primary-foreground/30 text-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
