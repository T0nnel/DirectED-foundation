import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { NewsSection } from "@/components/NewsSection";
import { StatsSection } from "@/components/StatsSection";
import { ContentSection } from "@/components/ContentSection";
import { CTASection } from "@/components/CTASection";
import { Partners3DGlobe } from "@/components/Partners3DGlobe";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { TrustSection } from "@/components/TrustSection";
import { Users, GraduationCap, Globe, Briefcase, Shield, Rocket, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// Import images
import hero1 from "@/assets/image1.jpg";
import hero2 from "@/assets/image2.jpg";
import hero3 from "@/assets/image3.jpg";
import content1 from "@/assets/image4.jpg";
import content2 from "@/assets/image8.jpg";
import news1 from "@/assets/image6.jpg";
import news2 from "@/assets/image7.jpg";
import news3 from "@/assets/image5.jpg";

const Index = () => {
  const { t } = useTranslation();

  const heroSlides = [
    {
      id: 1,
      image: hero1,
      title: t('hero.slide1.title', "Empowering Africa's Next Generation of Tech Leaders"),
      subtitle: t('hero.slide1.subtitle', "World-class training and remote paid internships with US and European companies. Web development, UIX and Artificial Intelligence."),
      cta: t('hero.slide1.cta', "Discover Our Programs"),
      link: "/programs",
    },
    {
      id: 2,
      image: hero2,
      title: t('hero.slide2.title', "Connecting Talent with Global Opportunities"),
      subtitle: t('hero.slide2.subtitle', "We bridge the gap between high-potential talents and the world's best education to fill skill gaps in the global jobs market."),
      cta: t('hero.slide2.cta', "Learn More"),
      link: "/about",
    },
    {
      id: 3,
      image: hero3,
      title: t('hero.slide3.title', "Transforming Lives Through Education"),
      subtitle: t('hero.slide3.subtitle', "A world in which any person can realise their full potential, regardless of their draw in the lottery of life."),
      cta: t('hero.slide3.cta', "Join Our Mission"),
      link: "/take-action",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: t('stats.students_trained', "Students Trained"),
      icon: <GraduationCap className="w-8 h-8" />,
    },
    {
      value: "15",
      label: t('stats.partner_schools', "Partner Schools"),
      icon: <Globe className="w-8 h-8" />,
    },
    {
      value: "200+",
      label: t('stats.job_placements', "Job Placements"),
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      value: "50+",
      label: t('stats.corporate_partners', "Corporate Partners"),
      icon: <Users className="w-8 h-8" />,
    },
  ];

  const newsCards = [
    {
      id: 1,
      image: news1,
      category: "Education",
      date: "December 20, 2025",
      title: "New Technology Learning Center Opens in Rural Kenya",
      excerpt: "Bringing digital education to underserved communities with state-of-the-art facilities.",
      link: "/stories/1",
    },
    {
      id: 2,
      image: news2,
      category: "Success Story",
      date: "December 18, 2025",
      title: "Graduate Lands Software Engineering Role at Major Tech Company",
      excerpt: "From coding bootcamp to international career: Sarah's inspiring journey.",
      link: "/stories/2",
    },
    {
      id: 3,
      image: news3,
      category: "Events",
      date: "December 15, 2025",
      title: "Youth Tech Summit Showcases Innovative Solutions",
      excerpt: "Young entrepreneurs present groundbreaking projects at annual pitch competition.",
      link: "/stories/3",
    },
  ];

  const partners = [
    {
      name: "Microsoft",
      logo: "https://ui-avatars.com/api/?name=Microsoft&size=256&background=00A4EF&color=fff&bold=true&font-size=0.4&rounded=true"
    },
    {
      name: "Google",
      logo: "https://ui-avatars.com/api/?name=Google&size=256&background=4285F4&color=fff&bold=true&font-size=0.4&rounded=true"
    },
    {
      name: "Amazon",
      logo: "https://ui-avatars.com/api/?name=Amazon&size=256&background=FF9900&color=fff&bold=true&font-size=0.4&rounded=true"
    },
    {
      name: "IBM",
      logo: "https://ui-avatars.com/api/?name=IBM&size=256&background=054ADA&color=fff&bold=true&font-size=0.5&rounded=true"
    },
    {
      name: "Stripe",
      logo: "https://ui-avatars.com/api/?name=Stripe&size=256&background=635BFF&color=fff&bold=true&font-size=0.4&rounded=true"
    },
    {
      name: "GitHub",
      logo: "https://ui-avatars.com/api/?name=GitHub&size=256&background=181717&color=fff&bold=true&font-size=0.4&rounded=true"
    },
    {
      name: "Salesforce",
      logo: "https://ui-avatars.com/api/?name=Salesforce&size=256&background=00A1E0&color=fff&bold=true&font-size=0.35&rounded=true"
    },
    {
      name: "Adobe",
      logo: "https://ui-avatars.com/api/?name=Adobe&size=256&background=FF0000&color=fff&bold=true&font-size=0.4&rounded=true"
    },
    {
      name: "Oracle",
      logo: "https://ui-avatars.com/api/?name=Oracle&size=256&background=F80000&color=fff&bold=true&font-size=0.4&rounded=true"
    },
    {
      name: "SAP",
      logo: "https://ui-avatars.com/api/?name=SAP&size=256&background=0FAAFF&color=fff&bold=true&font-size=0.5&rounded=true"
    },
    {
      name: "Cisco",
      logo: "https://ui-avatars.com/api/?name=Cisco&size=256&background=1BA0D7&color=fff&bold=true&font-size=0.4&rounded=true"
    },
    {
      name: "Intel",
      logo: "https://ui-avatars.com/api/?name=Intel&size=256&background=0071C5&color=fff&bold=true&font-size=0.4&rounded=true"
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Carousel */}
        <HeroCarousel slides={heroSlides} />

        {/* Stats Section */}
        <StatsSection stats={stats} />

        {/* Mission Section */}
        <ContentSection
          badge={t('mission.badge', "Our Vision")}
          title={t('mission.title', "A World Where Potential Knows No Boundaries")}
          description={t('mission.description', "We believe that every person deserves the opportunity to realize their full potential, regardless of where they were born. Through world-class education and direct connections to global opportunities, we're breaking down barriers and building bridges to brighter futures.")}
          image={content1}
          imagePosition="right"
          cta={{ label: t('mission.cta', "Learn About Our Mission"), href: "/mission" }}
        />

        {/* News Section */}
        <NewsSection
          title={t('news.title', "DirectEd Development Foundation, for Every Learner")}
          subtitle={t('news.subtitle', "Stay updated with our latest stories, research, and impact")}
          cards={newsCards}
        />

        {/* Cohere-inspired Feature Showcase with Dark Green Background and Teal Accents */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block px-4 py-1.5 bg-[hsl(175_70%_50%/0.2)] rounded-full mb-6">
                <span className="text-sm font-medium text-[hsl(175_70%_50%)]">{t('features.badge', "Why Choose DirectEd")}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {t('features.title', "Built for Impact. Designed for Success.")}
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                {t('features.subtitle', "Our comprehensive approach ensures sustainable growth and real-world outcomes")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: t('features.proven_track_record.title', "Proven Track Record"),
                  description: t('features.proven_track_record.description', "Over 500 students trained with 200+ successful job placements in leading tech companies globally.")
                },
                {
                  icon: <Rocket className="w-8 h-8" />,
                  title: t('features.comprehensive_training.title', "Comprehensive Training"),
                  description: t('features.comprehensive_training.description', "From 1-week intro courses to 4-month intensive bootcamps and 8-month paid internships.")
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: t('features.career_growth.title', "Career Growth"),
                  description: t('features.career_growth.description', "Direct pathways to employment with US and European companies, bridging the global talent gap.")
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="relative bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 hover:border-[hsl(175_70%_50%/0.5)] transition-all duration-500 overflow-hidden">
                    {/* Teal accent gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(175_70%_50%/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-[hsl(175_70%_50%/0.15)] flex items-center justify-center text-[hsl(175_70%_50%)] mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {feature.icon}
                      </motion.div>

                      <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-4 group-hover:text-[hsl(175_70%_50%)] transition-colors duration-300">
                        {feature.title}
                      </h3>

                      <p className="text-primary-foreground/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Spotlight Section - Focus Areas */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full mb-6">
                <span className="text-sm font-medium text-accent">{t('spotlight.badge', "Spotlight")}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('spotlight.title', "Our Focus Areas")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('spotlight.subtitle', "Discover the key areas where DirectEd Development Foundation is making an impact")}
              </p>
              <div className="section-divider mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: t('spotlight.education.title', "Education & Skills Development"),
                  description: t('spotlight.education.description', "World-class technology education unlocking potential"),
                  link: "/focus/education-access",
                  icon: <GraduationCap className="w-8 h-8" />
                },
                {
                  title: t('spotlight.employment.title', "Youth Employment"),
                  description: t('spotlight.employment.description', "Connecting talent with global opportunities"),
                  link: "/focus/youth-employment",
                  icon: <Briefcase className="w-8 h-8" />
                },
                {
                  title: t('spotlight.gender.title', "Gender Equality in Tech"),
                  description: t('spotlight.gender.description', "Promoting equal opportunities for women in tech"),
                  link: "/focus/gender-equality",
                  icon: <Users className="w-8 h-8" />
                }
              ].map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all card-hover"
                >
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                    {area.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {area.description}
                  </p>
                  <a href={area.link} className="text-accent font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                    {t('spotlight.explore', "Explore")} <span>→</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <ContentSection
          badge={t('programs.badge', "Our Approach")}
          title={t('programs.title', "From Training to Career: A Complete Journey")}
          description={t('programs.description', "Starting with a 1-week introductory course, followed by a 4-month intensive bootcamp, and then placement into 8-month paid internships. Our program is designed using insights from frontier scientific research and state-of-the-art technology trends.")}
          image={content2}
          imagePosition="left"
          cta={{ label: t('programs.cta', "Explore Our Programs"), href: "/programs" }}
        >
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-foreground">{t('programs.web_dev', "Web Development & Software Engineering")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-foreground">{t('programs.uiux', "UI/UX Design & Product Management")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-foreground">{t('programs.ai', "Artificial Intelligence & Data Science")}</span>
            </li>
          </ul>
        </ContentSection>

        {/* Partners Section - 3D Globe */}
        <Partners3DGlobe
          title={t('partners.title', "Our Partners")}
          subtitle={t('partners.subtitle', "Working together to create lasting impact")}
          partners={partners}
        />

        {/* CTA Section */}
        <CTASection
          title={t('cta.title', "Join Us in Transforming Lives")}
          description={t('cta.description', "Whether you want to donate, volunteer, or partner with us, there are many ways to support our mission and help create opportunities for Africa's next generation.")}
          primaryCta={{ label: t('cta.get_involved', "Get Involved"), href: "/take-action" }}
          secondaryCta={{ label: t('cta.learn_more', "Learn More"), href: "/about" }}
          backgroundImage={hero3}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
