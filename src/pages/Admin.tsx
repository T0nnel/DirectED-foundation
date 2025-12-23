import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  Leaf,
  Home,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

interface ProgramListing {
  id: string;
  title: string;
  description: string;
  content: string | null;
  image_url: string | null;
  category: string | null;
  location: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [listings, setListings] = useState<ProgramListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchListings();
    }
  }, [isAdmin]);

  const fetchListings = async () => {
    setLoadingListings(true);
    const { data, error } = await supabase
      .from('program_listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error fetching listings',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setListings(data || []);
    }
    setLoadingListings(false);
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('program_listings')
      .update({
        is_published: !currentStatus,
        published_at: !currentStatus ? new Date().toISOString() : null
      })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error updating listing',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: currentStatus ? 'Listing unpublished' : 'Listing published',
        description: currentStatus ? 'The listing is now hidden from the public.' : 'The listing is now visible to the public.',
      });
      fetchListings();
    }
  };

  const deleteListing = async (id: string) => {
    const { error } = await supabase
      .from('program_listings')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error deleting listing',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Listing deleted',
        description: 'The listing has been permanently removed.',
      });
      fetchListings();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You don't have admin privileges. Please contact an administrator to request access.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground text-center">
              Logged in as: {user?.email}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
              <Button variant="destructive" onClick={handleSignOut} className="flex-1">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 mr-2" />
              <span className="font-serif text-xl font-bold">DirectED Development Foundation Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80">{user?.email}</span>
            <Button variant="secondary" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Program Listings</h1>
              <p className="text-muted-foreground mt-1">
                Manage and publish program content to the website
              </p>
            </div>
            <Button onClick={() => navigate('/admin/create')} variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Create Listing
            </Button>
          </div>

          {/* Listings Grid */}
          {loadingListings ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2">No listings yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first program listing to get started.
              </p>
              <Button onClick={() => navigate('/admin/create')}>
                <Plus className="mr-2 h-4 w-4" />
                Create Listing
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden card-hover h-full flex flex-col">
                    <div className="relative h-48 bg-muted">
                      {listing.image_url ? (
                        <img
                          src={listing.image_url}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge variant={listing.is_published ? 'default' : 'secondary'}>
                          {listing.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-serif font-semibold text-lg line-clamp-1">
                        {listing.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2 flex-1">
                        {listing.description}
                      </p>
                      {listing.category && (
                        <Badge variant="outline" className="mt-2 w-fit">
                          {listing.category}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePublish(listing.id, listing.is_published)}
                        >
                          {listing.is_published ? (
                            <>
                              <EyeOff className="mr-1 h-3 w-3" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="mr-1 h-3 w-3" />
                              Publish
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/edit/${listing.id}`)}
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{listing.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteListing(listing.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
