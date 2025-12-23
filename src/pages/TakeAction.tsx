import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Users, Megaphone, Building, ArrowRight } from "lucide-react";
import hero3 from "@/assets/hero-3.jpg";

const TakeAction = () => {
  const actions = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Donate",
      description: "Your contribution directly funds scholarships, training resources, and program expansion.",
      cta: "Donate Now",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Volunteer",
      description: "Share your expertise as a mentor, instructor, or career advisor for our students.",
      cta: "Join as Volunteer",
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Advocate",
      description: "Help spread the word about our mission and the importance of tech education.",
      cta: "Become an Advocate",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Partner",
      description: "Organizations can partner with us for internship placements and corporate sponsorship.",
      cta: "Explore Partnership",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Take Action
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Join us in creating opportunities for Africa's next generation of tech leaders. 
                There are many ways to make a difference.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Action Cards */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {actions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all"
                >
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                    {action.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {action.description}
                  </p>
                  <Button variant="accent">
                    {action.cta} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          title="Ready to Make a Difference?"
          description="Every contribution, big or small, helps us expand our reach and transform more lives."
          primaryCta={{ label: "Donate Now", href: "/donate" }}
          secondaryCta={{ label: "Contact Us", href: "/contact" }}
          backgroundImage={hero3}
        />
      </main>

      <Footer />
    </div>
  );
};

export default TakeAction;
