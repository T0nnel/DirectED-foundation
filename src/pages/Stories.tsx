// Stories page - Adding CMS placeholder
// This file needs full content - adding basic editable structure

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useCMS } from "@/contexts/CMSContext";
import { EditableText } from "@/components/cms/EditableText";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Stories = () => {
  const { loadPageContent } = useCMS();
  const { t } = useTranslation();

  useEffect(() => {
    loadPageContent('stories');
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
                pageName="stories"
                contentKey="hero_title"
                defaultValue={t('stories.hero_title', "Success Stories")}
                as="h1"
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
              />
              <EditableText
                pageName="stories"
                contentKey="hero_subtitle"
                defaultValue={t('stories.hero_subtitle', "Discover the transformative journeys of DirectED students who are building brighter futures through technology education and career opportunities.")}
                as="p"
                className="text-xl text-primary-foreground/80"
              />
            </motion.div>
          </div>
        </section>

        {/* Stories Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <EditableText
              pageName="stories"
              contentKey="content_title"
              defaultValue={t('stories.coming_soon', "Stories coming soon...")}
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

export default Stories;
