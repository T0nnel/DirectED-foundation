import { useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { Button } from '@/components/ui/button';
import { Save, X, Eye, EyeOff, Edit3, Pencil, Globe, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function AdminToolbar() {
    const {
        canEdit,
        isEditMode,
        isPreviewMode,
        currentLanguage,
        toggleEditMode,
        togglePreviewMode,
        hasPendingChanges,
        saveAllChanges,
        discardChanges,
        pendingChanges,
    } = useCMS();
    const { toast } = useToast();
    const { t } = useTranslation();
    const [isMinimized, setIsMinimized] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Only show toolbar for logged-in users
    if (!canEdit) return null;

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveAllChanges();
            toast({
                title: t('admin.changes_saved', 'Changes saved'),
                description: 'All content changes have been saved successfully.',
            });
        } catch (error) {
            toast({
                title: 'Save failed',
                description: 'Failed to save changes. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDiscard = () => {
        discardChanges();
        toast({
            title: t('admin.changes_discarded', 'Changes discarded'),
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
                data-cms-admin-toolbar
            >
                <div className="bg-card border-2 border-border rounded-2xl shadow-elevated overflow-hidden">
                    {/* Header - Always visible */}
                    <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setIsMinimized(!isMinimized)}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Pencil className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                                <span className="font-semibold text-sm">Edit Controls</span>
                                {isEditMode && (
                                    <p className="text-xs text-accent font-medium">{t('admin.edit_mode', 'Edit Mode')}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditMode && hasPendingChanges && (
                                <div className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium">
                                    {pendingChanges.size}
                                </div>
                            )}
                            {isMinimized ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                        </div>
                    </div>

                    {/* Expandable content */}
                    <AnimatePresence>
                        {!isMinimized && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="px-4 pb-4 space-y-3 min-w-[320px]">
                                    {/* Current language indicator */}
                                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                                        <Globe className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">
                                            Editing content for:
                                        </span>
                                        <span className="text-xs font-medium uppercase">
                                            {currentLanguage}
                                        </span>
                                    </div>

                                    {/* Edit Mode Toggle */}
                                    <Button
                                        onClick={toggleEditMode}
                                        variant={isEditMode ? 'default' : 'outline'}
                                        className="w-full justify-start"
                                        size="sm"
                                    >
                                        <Edit3 className="w-4 h-4 mr-2" />
                                        {isEditMode ? t('admin.edit_mode_on', 'Edit Mode: ON') : t('admin.edit_mode_off', 'Edit Mode: OFF')}
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

                                    {/* Language Switcher */}
                                    {isEditMode && (
                                        <>
                                            <div className="h-px bg-border" />
                                            <div className="space-y-2">
                                                <p className="text-xs text-muted-foreground font-medium">
                                                    Edit content in language:
                                                </p>
                                                <LanguageSwitcher variant="compact" showFlags={true} />
                                            </div>
                                        </>
                                    )}

                                    {/* Save/Discard (only show when there are changes) */}
                                    {isEditMode && hasPendingChanges && (
                                        <>
                                            <div className="h-px bg-border" />
                                            <div className="space-y-2">
                                                <p className="text-xs text-muted-foreground">
                                                    {pendingChanges.size} {t('admin.pending_changes', 'pending changes')}
                                                </p>
                                                <Button
                                                    onClick={handleSave}
                                                    variant="default"
                                                    className="w-full justify-center bg-accent hover:bg-accent/90"
                                                    size="sm"
                                                    disabled={isSaving}
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="w-4 h-4 mr-2" />
                                                            {t('admin.save_changes', 'Save All Changes')}
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    onClick={handleDiscard}
                                                    variant="outline"
                                                    className="w-full justify-center"
                                                    size="sm"
                                                    disabled={isSaving}
                                                >
                                                    <X className="w-4 h-4 mr-2" />
                                                    {t('admin.discard_changes', 'Discard Changes')}
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
