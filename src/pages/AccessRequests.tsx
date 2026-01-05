import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
    Check,
    X,
    Clock,
    Mail,
    User,
    MessageSquare,
    Home,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { Textarea } from '@/components/ui/textarea';

interface AccessRequest {
    id: string;
    user_id: string;
    user_email: string;
    user_name: string | null;
    reason: string | null;
    status: 'pending' | 'approved' | 'rejected';
    requested_at: string;
    reviewed_at: string | null;
    reviewed_by: string | null;
    admin_notes: string | null;
}

const AccessRequests = () => {
    const { user, isAdmin, isLoading } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [requests, setRequests] = useState<AccessRequest[]>([]);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/auth');
        } else if (!isLoading && !isAdmin) {
            navigate('/admin');
        }
    }, [user, isAdmin, isLoading, navigate]);

    useEffect(() => {
        if (isAdmin) {
            fetchRequests();
        }
    }, [isAdmin]);

    const fetchRequests = async () => {
        setLoadingRequests(true);
        const { data, error } = await supabase
            .from('access_requests')
            .select('*')
            .order('requested_at', { ascending: false });

        if (error) {
            toast({
                title: 'Error fetching requests',
                description: error.message,
                variant: 'destructive',
            });
        } else {
            setRequests(data || []);
        }
        setLoadingRequests(false);
    };

    const handleApprove = async (requestId: string, userId: string) => {
        // Update user role to admin
        const { error: roleError } = await supabase
            .from('user_roles')
            .update({ role: 'admin' })
            .eq('id', userId);

        if (roleError) {
            toast({
                title: 'Error updating role',
                description: roleError.message,
                variant: 'destructive',
            });
            return;
        }

        // Update request status
        const { error: requestError } = await supabase
            .from('access_requests')
            .update({
                status: 'approved',
                reviewed_at: new Date().toISOString(),
                reviewed_by: user?.id,
                admin_notes: adminNotes[requestId] || null,
            })
            .eq('id', requestId);

        if (requestError) {
            toast({
                title: 'Error updating request',
                description: requestError.message,
                variant: 'destructive',
            });
        } else {
            toast({
                title: 'Access approved',
                description: 'User has been granted admin access.',
            });
            fetchRequests();
        }
    };

    const handleReject = async (requestId: string) => {
        const { error } = await supabase
            .from('access_requests')
            .update({
                status: 'rejected',
                reviewed_at: new Date().toISOString(),
                reviewed_by: user?.id,
                admin_notes: adminNotes[requestId] || null,
            })
            .eq('id', requestId);

        if (error) {
            toast({
                title: 'Error rejecting request',
                description: error.message,
                variant: 'destructive',
            });
        } else {
            toast({
                title: 'Request rejected',
                description: 'Access request has been denied.',
            });
            fetchRequests();
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    const pendingRequests = requests.filter(r => r.status === 'pending');
    const reviewedRequests = requests.filter(r => r.status !== 'pending');

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="font-serif text-xl font-bold">Access Requests Management</h1>
                    <Button variant="secondary" size="sm" onClick={() => navigate('/admin')}>
                        <Home className="mr-2 h-4 w-4" />
                        Back to Admin
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Pending Requests */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-foreground">
                                    Pending Requests
                                </h2>
                                <p className="text-muted-foreground mt-1">
                                    {pendingRequests.length} request{pendingRequests.length !== 1 ? 's' : ''} awaiting review
                                </p>
                            </div>
                            <Badge variant="secondary" className="text-lg">
                                <Clock className="w-4 h-4 mr-2" />
                                {pendingRequests.length}
                            </Badge>
                        </div>

                        {loadingRequests ? (
                            <div className="grid gap-4">
                                {[1, 2, 3].map((i) => (
                                    <Card key={i} className="animate-pulse">
                                        <CardContent className="p-6">
                                            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                                            <div className="h-3 bg-muted rounded w-1/2" />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : pendingRequests.length === 0 ? (
                            <Card className="p-12 text-center">
                                <Check className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="font-serif text-xl font-semibold mb-2">All caught up!</h3>
                                <p className="text-muted-foreground">No pending access requests at the moment.</p>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                {pendingRequests.map((request) => (
                                    <Card key={request.id} className="overflow-hidden">
                                        <CardHeader className="bg-muted/50">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <CardTitle className="flex items-center gap-2">
                                                        <User className="w-5 h-5" />
                                                        {request.user_name || 'Unknown User'}
                                                    </CardTitle>
                                                    <CardDescription className="flex items-center gap-2 mt-2">
                                                        <Mail className="w-4 h-4" />
                                                        {request.user_email}
                                                    </CardDescription>
                                                </div>
                                                <Badge variant="outline">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {new Date(request.requested_at).toLocaleDateString()}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            {request.reason && (
                                                <div className="mb-4">
                                                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                                                        <MessageSquare className="w-4 h-4" />
                                                        Reason
                                                    </div>
                                                    <p className="text-muted-foreground text-sm">{request.reason}</p>
                                                </div>
                                            )}

                                            <div className="mb-4">
                                                <label className="text-sm font-medium mb-2 block">Admin Notes (Optional)</label>
                                                <Textarea
                                                    placeholder="Add notes about this request..."
                                                    value={adminNotes[request.id] || ''}
                                                    onChange={(e) => setAdminNotes({ ...adminNotes, [request.id]: e.target.value })}
                                                    rows={2}
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button className="flex-1" variant="default">
                                                            <Check className="mr-2 h-4 w-4" />
                                                            Approve
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Approve Access Request</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to grant admin access to {request.user_email}?
                                                                They will have full administrative privileges.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleApprove(request.id, request.user_id)}>
                                                                Approve
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button className="flex-1" variant="destructive">
                                                            <X className="mr-2 h-4 w-4" />
                                                            Reject
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Reject Access Request</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to reject the access request from {request.user_email}?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleReject(request.id)}>
                                                                Reject
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Reviewed Requests */}
                    {reviewedRequests.length > 0 && (
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                                Previously Reviewed
                            </h2>
                            <div className="grid gap-4">
                                {reviewedRequests.map((request) => (
                                    <Card key={request.id} className="opacity-60">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{request.user_email}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Reviewed on {new Date(request.reviewed_at!).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Badge variant={request.status === 'approved' ? 'default' : 'destructive'}>
                                                    {request.status === 'approved' ? (
                                                        <><Check className="w-3 h-3 mr-1" /> Approved</>
                                                    ) : (
                                                        <><X className="w-3 h-3 mr-1" /> Rejected</>
                                                    )}
                                                </Badge>
                                            </div>
                                            {request.admin_notes && (
                                                <p className="text-sm text-muted-foreground mt-2 italic">
                                                    Note: {request.admin_notes}
                                                </p>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
};

export default AccessRequests;
