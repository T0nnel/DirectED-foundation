import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useCMS } from "@/contexts/CMSContext";
import { EditableText } from "@/components/cms/EditableText";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Research = () => {
  const { loadPageContent } = useCMS();
  const { t } = useTranslation();

  useEffect(() => {
    loadPageContent('research');
  }, []);

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
                pageName="research"
                contentKey="hero_title"
                defaultValue={t('research.hero_title', "Research & Reports")}
                as="h1"
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
              />
              <EditableText
                pageName="research"
                contentKey="hero_subtitle"
                defaultValue={t('research.hero_subtitle', "Evidence-based insights driving our mission to transform tech education in Africa.")}
                as="p"
                className="text-xl text-primary-foreground/80"
              />
            </motion.div>
          </div>
        </section>

        {/* Research Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <EditableText
              pageName="research"
              contentKey="content_title"
              defaultValue={t('research.coming_soon', "Research publications coming soon...")}
              as="h2"
              className="font-serif text-3xl font-bold text-foreground text-center"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Research;
