import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';
import { EditableText } from '@/components/cms/EditableText';

interface ProgramListing {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string | null;
  location: string | null;
  published_at: string | null;
}

const Programs = () => {
  const [listings, setListings] = useState<ProgramListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { loadPageContent } = useCMS();

  useEffect(() => {
    loadPageContent('programs');
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('program_listings')
      .select('id, title, description, image_url, category, location, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (!error && data) {
      setListings(data);
    }
    setLoading(false);
  };

  const categories = [...new Set(listings.map(l => l.category).filter(Boolean))];
  const filteredListings = selectedCategory
    ? listings.filter(l => l.category === selectedCategory)
    : listings;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <EditableText
              pageName="programs"
              contentKey="hero_title"
              defaultValue="Our Programs"
              as="h1"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            />
            <EditableText
              pageName="programs"
              contentKey="hero_subtitle"
              defaultValue="Discover our initiatives making a difference in communities around the world. Each program is designed to create lasting, sustainable impact."
              as="p"
              className="text-lg md:text-xl opacity-90 leading-relaxed"
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All Programs
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category as string)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-56 bg-muted" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-1/4 mb-4" />
                    <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="font-serif text-2xl font-semibold mb-2">No programs available</h3>
              <p className="text-muted-foreground">
                Check back soon for new programs and initiatives.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/programs/${listing.id}`}>
                    <Card className="overflow-hidden card-hover h-full group">
                      <div className="relative h-56 bg-muted overflow-hidden">
                        {listing.image_url ? (
                          <img
                            src={listing.image_url}
                            alt={listing.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {listing.category && (
                          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                            {listing.category}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                          {listing.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 mb-4">
                          {listing.description}
                        </p>
                        {listing.location && (
                          <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            {listing.location}
                          </div>
                        )}
                        <div className="flex items-center text-primary font-medium">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
