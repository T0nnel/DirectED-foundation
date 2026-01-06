import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from "react-i18next";

interface ProgramListing {
  id: string;
  title: string;
  description: string;
  content: string | null;
  image_url: string | null;
  category: string | null;
  location: string | null;
  published_at: string | null;
}

const ProgramDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<ProgramListing | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id]);

  const fetchListing = async () => {
    const { data, error } = await supabase
      .from('program_listings')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .maybeSingle();

    if (error || !data) {
      navigate('/programs');
      return;
    }
    setListing(data);
    setLoading(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8" />
            <div className="h-96 bg-muted rounded-xl mb-8" />
            <div className="h-10 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link
            to="/programs"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('program.back_to_programs', "Back to Programs")}
          </Link>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 bg-muted rounded-xl overflow-hidden mb-8">
            {listing.image_url ? (
              <img
                src={listing.image_url}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {listing.category && (
              <Badge variant="secondary" className="text-sm">
                {listing.category}
              </Badge>
            )}
            {listing.location && (
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {listing.location}
              </div>
            )}
            {listing.published_at && (
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(listing.published_at)}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {listing.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {listing.description}
          </p>

          {/* Full Content */}
          {listing.content && (
            <div className="prose prose-lg max-w-none">
              {listing.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-secondary rounded-xl">
            <h3 className="font-serif text-2xl font-bold mb-4">
              {t('program.support_title', "Want to support this initiative?")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('program.support_desc', "Your contribution can help make a lasting difference in the lives of those we serve.")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/take-action">{t('nav.take_action', "Take Action")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/what-we-do">{t('common.learn_more', "Learn More")}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramDetail;
