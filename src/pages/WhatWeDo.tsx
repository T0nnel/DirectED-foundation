import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Lightbulb, Users, Code } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { EditableText } from "@/components/cms/EditableText";
import { useEffect } from "react";

const WhatWeDo = () => {
  const { loadPageContent } = useCMS();

  useEffect(() => {
    loadPageContent('whatwedo');
  }, []);

  const programs = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Full-stack development training covering modern frameworks, best practices, and real-world project experience.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "User-centered design principles, prototyping tools, and creating compelling digital experiences.",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Artificial Intelligence",
      description: "Machine learning fundamentals, data science, and practical AI application development.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Leadership & Soft Skills",
      description: "Communication, teamwork, and professional development for the global workplace.",
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
              <EditableText
                pageName="whatwedo"
                contentKey="hero_title"
                defaultValue="What We Do"
                as="h1"
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
              />
              <EditableText
                pageName="whatwedo"
                contentKey="hero_subtitle"
                defaultValue="We provide world-class education and career opportunities to talented individuals across Africa, connecting them with global companies and transforming lives through technology."
                as="p"
                className="text-xl text-primary-foreground/80"
              />
            </motion.div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <EditableText
                pageName="whatwedo"
                contentKey="programs_title"
                defaultValue="Our Programs"
                as="h2"
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
              />
              <EditableText
                pageName="whatwedo"
                contentKey="programs_subtitle"
                defaultValue="Comprehensive training programs designed to prepare you for success in the global tech industry."
                as="p"
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              />
              <div className="section-divider mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-shadow"
                >
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                    {program.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {program.description}
                  </p>
                  <Button variant="ghost" className="text-accent hover:text-accent/80 p-0">
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <EditableText
                pageName="whatwedo"
                contentKey="journey_title"
                defaultValue="The Journey"
                as="h2"
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
              />
              <EditableText
                pageName="whatwedo"
                contentKey="journey_subtitle"
                defaultValue="A structured path from learning to earning"
                as="p"
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Introductory Course", duration: "1 Week", desc: "Foundation skills assessment and orientation" },
                { step: "02", title: "Intensive Bootcamp", duration: "4 Months", desc: "Deep technical training with hands-on projects" },
                { step: "03", title: "Paid Internship", duration: "8 Months", desc: "Real work experience with global companies" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-background rounded-2xl p-8 text-center">
                    <span className="text-6xl font-serif font-bold text-accent/20">{item.step}</span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-4 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-accent font-medium mb-3">{item.duration}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
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

export default WhatWeDo;
