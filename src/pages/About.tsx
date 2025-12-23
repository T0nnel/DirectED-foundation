import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatsSection } from "@/components/StatsSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Users, GraduationCap, Globe, Briefcase } from "lucide-react";
import content1 from "@/assets/image4.jpg";
import content2 from "@/assets/image8.jpg";

const About = () => {
  const stats = [
    { value: "500+", label: "Students Trained", icon: <GraduationCap className="w-8 h-8 text-accent" /> },
    { value: "15", label: "Partner Schools", icon: <Globe className="w-8 h-8 text-accent" /> },
    { value: "200+", label: "Job Placements", icon: <Briefcase className="w-8 h-8 text-accent" /> },
    { value: "50+", label: "Corporate Partners", icon: <Users className="w-8 h-8 text-accent" /> },
  ];

  const values = [
    { icon: <Target className="w-8 h-8" />, title: "Excellence", desc: "We strive for the highest standards in everything we do" },
    { icon: <Heart className="w-8 h-8" />, title: "Compassion", desc: "We care deeply about the communities we serve" },
    { icon: <Eye className="w-8 h-8" />, title: "Transparency", desc: "We operate with openness and accountability" },
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
                Who We Are
              </h1>
              <p className="text-xl text-primary-foreground/80">
                A mission-driven organization dedicated to empowering Africa's next generation of tech leaders.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img src={content1} alt="Our team" className="rounded-2xl shadow-elevated" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                  Our Vision
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  A World Where Potential Knows No Boundaries
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe that every person deserves the opportunity to realize their full potential,
                  regardless of where they were born. Our vision is a world where talent, not geography,
                  determines success.
                </p>
                <p className="text-lg text-muted-foreground">
                  Through world-class education and direct connections to global opportunities,
                  we're breaking down barriers and building bridges to brighter futures.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsSection stats={stats} />

        {/* Values */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <div className="section-divider" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
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

export default About;
