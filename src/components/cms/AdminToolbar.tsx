import { useCMS } from '@/contexts/CMSContext';
import { Button } from '@/components/ui/button';
import { Save, X, Eye, EyeOff, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminToolbar() {
    const {
        isAdmin,
        isEditMode,
        isPreviewMode,
        toggleEditMode,
        togglePreviewMode,
        hasPendingChanges,
        saveAllChanges,
        discardChanges,
        pendingChanges,
    } = useCMS();
    const { toast } = useToast();

    if (!isAdmin) return null;

    const handleSave = async () => {
        try {
            await saveAllChanges();
            toast({
                title: 'Changes saved',
                description: 'All content changes have been saved successfully.',
            });
        } catch (error) {
            toast({
                title: 'Save failed',
                description: 'Failed to save changes. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const handleDiscard = () => {
        discardChanges();
        toast({
            title: 'Changes discarded',
            description: 'All unsaved changes have been discarded.',
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-6 right-6 z-[100]"
            >
                <div className="bg-card border-2 border-border rounded-2xl shadow-elevated p-4 min-w-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-accent" />
                            <span className="font-semibold">Admin Controls</span>
                        </div>
                        {isEditMode && hasPendingChanges && (
                            <div className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-medium">
                                {pendingChanges.size} changes
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        {/* Edit Mode Toggle */}
                        <Button
                            onClick={toggleEditMode}
                            variant={isEditMode ? 'default' : 'outline'}
                            className="w-full justify-start"
                            size="sm"
                        >
                            {isEditMode ? (
                                <>
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit Mode: ON
                                </>
                            ) : (
                                <>
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit Mode: OFF
                                </>
                            )}
                        </Button>

                        {/* Preview Toggle (only show in edit mode) */}
                        {isEditMode && (
                            <Button
                                onClick={togglePreviewMode}
                                variant={isPreviewMode ? 'default' : 'outline'}
                                className="w-full justify-start"
                                size="sm"
                            >
                                {isPreviewMode ? (
                                    <>
                                        <Eye className="w-4 h-4 mr-2" />
                                        Preview Mode
                                    </>
                                ) : (
                                    <>
                                        <EyeOff className="w-4 h-4 mr-2" />
                                        Show Edits
                                    </>
                                )}
                            </Button>
                        )}

                        {/* Save/Discard (only show when there are changes) */}
                        {isEditMode && hasPendingChanges && (
                            <>
                                <div className="h-px bg-border my-2" />
                                <Button
                                    onClick={handleSave}
                                    variant="accent"
                                    className="w-full justify-start"
                                    size="sm"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save All Changes
                                </Button>
                                <Button
                                    onClick={handleDiscard}
                                    variant="outline"
                                    className="w-full justify-start"
                                    size="sm"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Discard Changes
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
