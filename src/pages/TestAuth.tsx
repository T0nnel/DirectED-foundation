import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, User, Mail } from 'lucide-react';

const TestAuth = () => {
    const { user, session, isLoading, signOut } = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse text-lg">Loading...</div>
            </div>
        );
    }

    const handleSignOut = async () => {
        await signOut();
        navigate('/auth');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-serif">Authentication Test Page</CardTitle>
                    <CardDescription>Check if authentication is working correctly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Authentication Status */}
                    <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-muted">
                        {user ? (
                            <>
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <span className="text-lg font-medium">Authenticated ✓</span>
                            </>
                        ) : (
                            <>
                                <XCircle className="h-6 w-6 text-red-600" />
                                <span className="text-lg font-medium">Not Authenticated</span>
                            </>
                        )}
                    </div>

                    {/* User Details */}
                    {user ? (
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg border bg-card">
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Email</span>
                                </div>
                                <p className="text-lg">{user.email}</p>
                            </div>

                            <div className="p-4 rounded-lg border bg-card">
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">User ID</span>
                                </div>
                                <p className="text-sm font-mono text-muted-foreground">{user.id}</p>
                            </div>

                            <div className="p-4 rounded-lg border bg-card">
                                <span className="text-sm font-medium">Session Active</span>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {session ? 'Yes' : 'No'}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button onClick={handleSignOut} variant="destructive" className="flex-1">
                                    Sign Out
                                </Button>
                                <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                                    Go Home
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <p className="text-muted-foreground">You are not logged in</p>
                            <Button onClick={() => navigate('/auth')}>
                                Go to Login Page
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default TestAuth;
