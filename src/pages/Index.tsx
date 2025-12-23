import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { NewsSection } from "@/components/NewsSection";
import { StatsSection } from "@/components/StatsSection";
import { ContentSection } from "@/components/ContentSection";
import { CTASection } from "@/components/CTASection";
import { PartnersSection } from "@/components/PartnersSection";
import { Users, GraduationCap, Globe, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
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
  const heroSlides = [
    {
      id: 1,
      image: hero1,
      title: "Empowering Africa's Next Generation of Tech Leaders",
      subtitle: "World-class training and remote paid internships with US and European companies. Web development, UIX and Artificial Intelligence.",
      cta: "Discover Our Programs",
      link: "/programs",
    },
    {
      id: 2,
      image: hero2,
      title: "Connecting Talent with Global Opportunities",
      subtitle: "We bridge the gap between high-potential talents and the world's best education to fill skill gaps in the global jobs market.",
      cta: "Learn More",
      link: "/about",
    },
    {
      id: 3,
      image: hero3,
      title: "Transforming Lives Through Education",
      subtitle: "A world in which any person can realise their full potential, regardless of their draw in the lottery of life.",
      cta: "Join Our Mission",
      link: "/take-action",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Students Trained",
      icon: <GraduationCap className="w-8 h-8 text-accent" />,
    },
    {
      value: "15",
      label: "Partner Schools",
      icon: <Globe className="w-8 h-8 text-accent" />,
    },
    {
      value: "200+",
      label: "Job Placements",
      icon: <Briefcase className="w-8 h-8 text-accent" />,
    },
    {
      value: "50+",
      label: "Corporate Partners",
      icon: <Users className="w-8 h-8 text-accent" />,
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
    { name: "Partner 1", logo: "https://via.placeholder.com/150x50?text=Partner+1" },
    { name: "Partner 2", logo: "https://via.placeholder.com/150x50?text=Partner+2" },
    { name: "Partner 3", logo: "https://via.placeholder.com/150x50?text=Partner+3" },
    { name: "Partner 4", logo: "https://via.placeholder.com/150x50?text=Partner+4" },
    { name: "Partner 5", logo: "https://via.placeholder.com/150x50?text=Partner+5" },
    { name: "Partner 6", logo: "https://via.placeholder.com/150x50?text=Partner+6" },
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
          badge="Our Vision"
          title="A World Where Potential Knows No Boundaries"
          description="We believe that every person deserves the opportunity to realize their full potential, regardless of where they were born. Through world-class education and direct connections to global opportunities, we're breaking down barriers and building bridges to brighter futures."
          image={content1}
          imagePosition="right"
          cta={{ label: "Learn About Our Mission", href: "/mission" }}
        />

        {/* News Section */}
        <NewsSection
          title="DirectEd, for Every Learner"
          subtitle="Stay updated with our latest stories, research, and impact"
          cards={newsCards}
        />

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
                <span className="text-sm font-medium text-accent">Spotlight</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Focus Areas
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the key areas where DirectED is making an impact
              </p>
              <div className="section-divider mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Education & Skills Development",
                  description: "World-class technology education unlocking potential",
                  link: "/focus/education",
                  icon: <GraduationCap className="w-8 h-8" />
                },
                {
                  title: "Youth Employment",
                  description: "Connecting talent with global opportunities",
                  link: "/focus/youth-employment",
                  icon: <Briefcase className="w-8 h-8" />
                },
                {
                  title: "Gender Equality in Tech",
                  description: "Promoting equal opportunities for women in tech",
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
                    Explore <span>→</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <ContentSection
          badge="Our Approach"
          title="From Training to Career: A Complete Journey"
          description="Starting with a 1-week introductory course, followed by a 4-month intensive bootcamp, and then placement into 8-month paid internships. Our program is designed using insights from frontier scientific research and state-of-the-art technology trends."
          image={content2}
          imagePosition="left"
          cta={{ label: "Explore Our Programs", href: "/programs" }}
        >
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-foreground">Web Development & Software Engineering</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-foreground">UI/UX Design & Product Management</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-foreground">Artificial Intelligence & Data Science</span>
            </li>
          </ul>
        </ContentSection>

        {/* Partners Section */}
        <PartnersSection
          title="Our Partners"
          subtitle="Working together to create lasting impact"
          partners={partners}
        />

        {/* CTA Section */}
        <CTASection
          title="Join Us in Transforming Lives"
          description="Whether you want to donate, volunteer, or partner with us, there are many ways to support our mission and help create opportunities for Africa's next generation."
          primaryCta={{ label: "Get Involved", href: "/take-action" }}
          secondaryCta={{ label: "Learn More", href: "/about" }}
          backgroundImage={hero3}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
