import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatsSection } from "@/components/StatsSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Users, GraduationCap, Globe, Briefcase } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { EditableText } from "@/components/cms/EditableText";
import { EditableImage } from "@/components/cms/EditableImage";
import { useTranslation } from "react-i18next";
import content1 from "@/assets/image4.jpg";
import content2 from "@/assets/image8.jpg";

const About = () => {
  const { loadPageContent } = useCMS();
  const { t } = useTranslation();

  useEffect(() => {
    loadPageContent('about');
  }, []);

  const stats = [
    { value: "500+", label: t('stats.students_trained', "Students Trained"), icon: <GraduationCap className="w-8 h-8 text-accent" /> },
    { value: "15", label: t('stats.partner_schools', "Partner Schools"), icon: <Globe className="w-8 h-8 text-accent" /> },
    { value: "200+", label: t('stats.job_placements', "Job Placements"), icon: <Briefcase className="w-8 h-8 text-accent" /> },
    { value: "50+", label: t('stats.corporate_partners', "Corporate Partners"), icon: <Users className="w-8 h-8 text-accent" /> },
  ];

  const values = [
    { icon: <Target className="w-8 h-8" />, title: t('values.excellence', "Excellence"), desc: t('values.excellence_desc', "We strive for the highest standards in everything we do") },
    { icon: <Heart className="w-8 h-8" />, title: t('values.compassion', "Compassion"), desc: t('values.compassion_desc', "We care deeply about the communities we serve") },
    { icon: <Eye className="w-8 h-8" />, title: t('values.transparency', "Transparency"), desc: t('values.transparency_desc', "We operate with openness and accountability") },
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
                pageName="about"
                contentKey="hero_title"
                defaultValue={t('about.hero_title', "Who We Are")}
                as="h1"
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
              />
              <EditableText
                pageName="about"
                contentKey="hero_subtitle"
                defaultValue={t('about.hero_subtitle', "A mission-driven organization dedicated to empowering Africa's next generation of tech leaders.")}
                as="p"
                className="text-xl text-primary-foreground/80"
              />
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
                  {t('about.our_vision', 'Our Vision')}
                </span>
                <EditableText
                  pageName="about"
                  contentKey="vision_title"
                  defaultValue={t('about.vision_title', "A World Where Potential Knows No Boundaries")}
                  as="h2"
                  className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6"
                />
                <EditableText
                  pageName="about"
                  contentKey="vision_description_1"
                  defaultValue={t('about.vision_desc_1', "We believe that every person deserves the opportunity to realize their full potential, regardless of where they were born. Our vision is a world where talent, not geography, determines success.")}
                  as="p"
                  className="text-lg text-muted-foreground mb-6"
                />
                <EditableText
                  pageName="about"
                  contentKey="vision_description_2"
                  defaultValue={t('about.vision_desc_2', "Through world-class education and direct connections to global opportunities, we're breaking down barriers and building bridges to brighter futures.")}
                  as="p"
                  className="text-lg text-muted-foreground"
                />
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
                {t('about.our_values', 'Our Values')}
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
