import { useEffect, useCallback, useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { createPortal } from 'react-dom';
import { Check, X, Pencil, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { upsertContent, fetchPageContent, PageContent } from '@/lib/supabase/content';

// Generate a stable content key from element's position in the DOM (NO text-based hash)
function generateContentKey(element: HTMLElement): string {
    const tag = element.tagName.toLowerCase();
    
    // Create a stable path from element to body
    const pathParts: string[] = [];
    let current: HTMLElement | null = element;
    let depth = 0;
    
    while (current && current !== document.body && depth < 8) {
        const parent = current.parentElement;
        if (parent) {
            // Get index among siblings of the same tag type
            const siblings = Array.from(parent.children).filter(
                child => child.tagName === current!.tagName
            );
            const index = siblings.indexOf(current);
            pathParts.unshift(`${current.tagName.toLowerCase()}${index}`);
        } else {
            pathParts.unshift(current.tagName.toLowerCase());
        }
        current = parent;
        depth++;
    }
    
    // Create a stable key based purely on DOM position
    const path = pathParts.join('_');
    return `global_${tag}_${path}`.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 100);
}

// Get the page name from current URL
function getPageName(): string {
    const path = window.location.pathname;
    if (path === '/') return 'home';
    return path.replace(/^\//, '').replace(/\//g, '_') || 'home';
}

// Check if element should be excluded from editing
function isExcludedElement(element: HTMLElement): boolean {
    // Skip if it's inside the edit toolbar or editor itself
    if (element.closest('[data-cms-toolbar]') || element.closest('[data-cms-editor]')) {
        return true;
    }
    
    // Skip if it's inside the admin toolbar / edit controls
    if (element.closest('[data-cms-admin-toolbar]')) {
        return true;
    }
    
    // Skip if it's inside the user menu / profile dropdown
    if (element.closest('[data-user-menu]')) {
        return true;
    }
    
    // Skip if it's inside the language dropdown
    if (element.closest('[data-language-dropdown]')) {
        return true;
    }
    
    // Skip if it's inside any dropdown or popover
    if (element.closest('[role="menu"]') || element.closest('[role="listbox"]') || element.closest('[role="dialog"]')) {
        return true;
    }
    
    // Skip header top bar (contains user menu and language switcher)
    if (element.closest('.bg-primary.text-primary-foreground.text-sm.py-2')) {
        return true;
    }
    
    // Skip navigation dropdowns
    if (element.closest('nav') && element.closest('[class*="absolute"]')) {
        return true;
    }
    
    // Skip the hero carousel - it's not editable
    if (element.closest('[data-hero-carousel]')) {
        return true;
    }
    
    return false;
}

// Check if element is a text element that should be editable
function isEditableTextElement(element: HTMLElement): boolean {
    const editableTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI', 'LABEL'];
    
    // Check exclusions first
    if (isExcludedElement(element)) {
        return false;
    }
    
    // Skip if it's an input or textarea
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        return false;
    }
    
    // Skip buttons and links - they should navigate, not be edited
    if (element.tagName === 'A' || element.tagName === 'BUTTON') {
        return false;
    }
    
    // Skip if inside a button or link
    if (element.closest('a') || element.closest('button')) {
        return false;
    }
    
    // Check if it's a text element
    if (!editableTags.includes(element.tagName)) {
        return false;
    }
    
    // Must have some text content
    const text = element.textContent?.trim();
    if (!text || text.length < 2) {
        return false;
    }
    
    // Skip if element has too many child elements (likely a container)
    const childElements = element.querySelectorAll('*');
    if (childElements.length > 5) {
        return false;
    }
    
    return true;
}

interface EditorState {
    element: HTMLElement;
    originalText: string;
    contentKey: string;
    rect: DOMRect;
}

// Store content that has been loaded from database
// Each entry has: { newText: string, originalText: string }
interface SavedContentEntry {
    newText: string;
    originalText: string;
}
interface SavedContent {
    [key: string]: SavedContentEntry;
}

export function GlobalEditMode() {
    const { canEdit, isEditMode, isPreviewMode, currentLanguage } = useCMS();
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
    const [editorState, setEditorState] = useState<EditorState | null>(null);
    const [editText, setEditText] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [savedContent, setSavedContent] = useState<SavedContent>({});
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    
    // Auto-hide toast after 3 seconds
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    // Load saved content from database (visible to ALL visitors)
    useEffect(() => {
        const loadSavedContent = async () => {
            const pageName = getPageName();
            const storageKey = `cms_content_${pageName}_${currentLanguage}`;
            
            // Loading saved content silently
            
            let contentMap: SavedContent = {};
            
            // First, try to load from database (visible to ALL visitors)
            try {
                const content = await fetchPageContent(pageName, currentLanguage);
                // Loaded from database
                
                content.forEach((item: PageContent) => {
                    if (item.content_key.startsWith('global_')) {
                        // Database stores: content_key contains original text hash
                        // content_value is the new text
                        // We need to also store original text - check if it's JSON
                        try {
                            const parsed = JSON.parse(item.content_value);
                            if (parsed.newText && parsed.originalText) {
                                contentMap[item.content_key] = parsed;
                            } else {
                                contentMap[item.content_key] = { 
                                    newText: item.content_value, 
                                    originalText: '' 
                                };
                            }
                        } catch {
                            contentMap[item.content_key] = { 
                                newText: item.content_value, 
                                originalText: '' 
                            };
                        }
                    }
                });
            } catch (error) {
                // Database not available, will use localStorage
            }
            
            // Fallback: load from localStorage if database didn't have content
            if (Object.keys(contentMap).length === 0) {
                const localContent = localStorage.getItem(storageKey);
                if (localContent) {
                    try {
                        const parsed = JSON.parse(localContent);
                        Object.entries(parsed).forEach(([key, value]) => {
                            if (typeof value === 'string') {
                                contentMap[key] = { newText: value, originalText: '' };
                            } else if (value && typeof value === 'object') {
                                contentMap[key] = value as SavedContentEntry;
                            }
                        });
                        // Loaded from localStorage fallback
                    } catch (e) {
                        console.error('[CMS] Failed to parse localStorage content');
                    }
                }
            }
            
            setSavedContent(contentMap);
        };

        loadSavedContent();
    }, [currentLanguage]);

    // Apply saved content to DOM elements
    useEffect(() => {
        if (Object.keys(savedContent).length === 0) return;
        
        // Create a map of original text → saved entry for quick matching
        const originalTextMap = new Map<string, { key: string; entry: SavedContentEntry }>();
        Object.entries(savedContent).forEach(([key, entry]) => {
            if (entry.originalText) {
                originalTextMap.set(entry.originalText.trim(), { key, entry });
            }
        });
        
        // Track which actual DOM elements have been processed (using WeakSet for memory efficiency)
        const processedElements = new WeakSet<HTMLElement>();

        const applyContentToElement = (element: HTMLElement, animate: boolean = true) => {
            // Skip if this exact DOM element was already processed
            if (processedElements.has(element)) return;
            
            // Skip hero carousel - it's handled by Index.tsx via React state
            if (element.closest('[data-hero-carousel]')) return;
            
            if (!isEditableTextElement(element)) return;
            
            const currentText = element.textContent?.trim() || '';
            
            // Try to match by original text
            const match = originalTextMap.get(currentText);
            if (match) {
                processedElements.add(element);
                
                if (animate) {
                    // Smooth transition for initial load
                    element.style.transition = 'opacity 0.15s ease-in-out';
                    element.style.opacity = '0';
                    
                    requestAnimationFrame(() => {
                        element.textContent = match.entry.newText;
                        requestAnimationFrame(() => {
                            element.style.opacity = '1';
                            setTimeout(() => {
                                element.style.transition = '';
                                element.style.opacity = '';
                            }, 150);
                        });
                    });
                } else {
                    // Instant update for dynamically added elements (carousels, etc.)
                    element.textContent = match.entry.newText;
                }
                return;
            }
            
            // Also try matching by key (for backward compatibility)
            const contentKey = generateContentKey(element);
            if (savedContent[contentKey]?.newText) {
                processedElements.add(element);
                
                if (animate) {
                    element.style.transition = 'opacity 0.15s ease-in-out';
                    element.style.opacity = '0';
                    
                    requestAnimationFrame(() => {
                        element.textContent = savedContent[contentKey].newText;
                        requestAnimationFrame(() => {
                            element.style.opacity = '1';
                            setTimeout(() => {
                                element.style.transition = '';
                                element.style.opacity = '';
                            }, 150);
                        });
                    });
                } else {
                    element.textContent = savedContent[contentKey].newText;
                }
            }
        };
        
        // Apply content quickly after page loads
        const timeoutId = setTimeout(() => {
            const editableTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'li', 'label'];
            editableTags.forEach(tag => {
                document.querySelectorAll(tag).forEach(el => {
                    applyContentToElement(el as HTMLElement, true);
                });
            });
        }, 50);

        // Observe DOM changes to apply content to newly added elements (like carousel slides)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as HTMLElement;
                        // For dynamically added elements, apply without animation
                        applyContentToElement(element, false);
                        
                        // Also check all children
                        const editableTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'li', 'label'];
                        editableTags.forEach(tag => {
                            element.querySelectorAll(tag).forEach(el => {
                                applyContentToElement(el as HTMLElement, false);
                            });
                        });
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [savedContent]);

    // Clear hover styles from an element
    const clearHoverStyles = useCallback((element: HTMLElement | null) => {
        if (element) {
            element.style.outline = '';
            element.style.outlineOffset = '';
            element.style.cursor = '';
            element.style.borderRadius = '';
            element.style.backgroundColor = '';
        }
    }, []);

    // Handle mouse over to show edit indicator
    const handleMouseOver = useCallback((e: MouseEvent) => {
        if (!isEditMode || isPreviewMode || editorState) return;
        
        const target = e.target as HTMLElement;
        
        // Check if it's an editable text element
        if (isEditableTextElement(target)) {
            setHoveredElement(target);
            target.style.outline = '2px dashed hsl(175, 70%, 50%)';
            target.style.outlineOffset = '2px';
            target.style.cursor = 'pointer';
            target.style.borderRadius = '4px';
        }
    }, [isEditMode, isPreviewMode, editorState]);

    // Handle mouse out to remove edit indicator
    const handleMouseOut = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target === hoveredElement) {
            clearHoverStyles(target);
            setHoveredElement(null);
        }
    }, [hoveredElement, clearHoverStyles]);

    // Handle click to open editor
    const handleClick = useCallback((e: MouseEvent) => {
        if (!isEditMode || isPreviewMode) return;
        
        const target = e.target as HTMLElement;
        
        // Check if it's an editable text element
        if (isEditableTextElement(target)) {
            e.preventDefault();
            e.stopPropagation();
            
            clearHoverStyles(target);
            setHoveredElement(null);
            
            const rect = target.getBoundingClientRect();
            const contentKey = generateContentKey(target);
            setEditorState({
                element: target,
                originalText: target.textContent || '',
                contentKey,
                rect
            });
            setEditText(target.textContent || '');
        }
    }, [isEditMode, isPreviewMode, clearHoverStyles]);

    // Save the edit to localStorage AND database
    const handleSave = useCallback(async () => {
        if (!editorState) return;
        
        setIsSaving(true);
        
        const pageName = getPageName();
        const storageKey = `cms_content_${pageName}_${currentLanguage}`;
        
        // Read existing content from localStorage to ensure we don't lose previous edits
        let existingContent: SavedContent = {};
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                Object.entries(parsed).forEach(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        existingContent[key] = value as SavedContentEntry;
                    }
                });
            }
        } catch (e) {
            // Ignore parse errors
        }
        
        // Merge with new content (always preserves previous edits)
        const newSavedContent: SavedContent = {
            ...existingContent,
            [editorState.contentKey]: {
                newText: editText,
                originalText: editorState.originalText
            }
        };
        localStorage.setItem(storageKey, JSON.stringify(newSavedContent));
        
        // Dispatch custom event so other components can reload content (e.g., Index.tsx for hero carousel)
        window.dispatchEvent(new CustomEvent('cms-content-saved'));
        
        // Update the element visually
        editorState.element.textContent = editText;
        
        // Update local saved content cache
        setSavedContent(newSavedContent);
        
        // Save to database (so ALL visitors can see changes)
        try {
            // Store both newText and originalText as JSON so we can match on reload
            const contentValue = JSON.stringify({
                newText: editText,
                originalText: editorState.originalText
            });
            
            const result = await upsertContent(
                pageName,
                editorState.contentKey,
                'text',
                contentValue,
                currentLanguage
            );
            setToast({ message: 'Content saved!', type: 'success' });
        } catch (error) {
            setToast({ message: 'Saved locally', type: 'success' });
        }
        
        setEditorState(null);
        setEditText('');
        setIsSaving(false);
    }, [editorState, editText, currentLanguage, savedContent]);

    // Cancel the edit
    const handleCancel = useCallback(() => {
        setEditorState(null);
        setEditText('');
    }, []);

    // Handle keyboard shortcuts
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!editorState) return;
        
        if (e.key === 'Escape') {
            handleCancel();
        } else if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSave();
        }
    }, [editorState, handleCancel, handleSave]);

    // Set up event listeners for editing (only when in edit mode)
    useEffect(() => {
        if (!canEdit || !isEditMode || isPreviewMode) return;

        document.addEventListener('mouseover', handleMouseOver, true);
        document.addEventListener('mouseout', handleMouseOut, true);
        document.addEventListener('click', handleClick, true);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver, true);
            document.removeEventListener('mouseout', handleMouseOut, true);
            document.removeEventListener('click', handleClick, true);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [canEdit, isEditMode, isPreviewMode, handleMouseOver, handleMouseOut, handleClick, handleKeyDown]);

    // Always render (for content loading), but only show edit UI when in edit mode
    const showEditUI = canEdit && isEditMode && !isPreviewMode;
    
    if (!showEditUI) {
        // Still render nothing visible, but useEffects still run for content loading
        return null;
    }

    return createPortal(
        <>
            {/* Toast notification */}
            {toast && (
                <div
                    data-cms-toolbar
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        zIndex: 10002,
                    }}
                >
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
                        toast.type === 'success' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                    }`}>
                        {toast.type === 'success' 
                            ? <CheckCircle className="w-5 h-5" />
                            : <XCircle className="w-5 h-5" />
                        }
                        <span className="font-medium">{toast.message}</span>
                    </div>
                </div>
            )}
            
            {/* Edit indicator on hover */}
            {hoveredElement && !editorState && (
                <div
                    data-cms-toolbar
                    style={{
                        position: 'fixed',
                        top: hoveredElement.getBoundingClientRect().top - 30,
                        left: hoveredElement.getBoundingClientRect().left,
                        zIndex: 10000,
                        pointerEvents: 'none'
                    }}
                >
                    <div className="bg-accent text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 shadow-lg">
                        <Pencil className="w-3 h-3" />
                        Click to edit
                    </div>
                </div>
            )}

            {/* Inline editor */}
            {editorState && (
                <div
                    data-cms-editor
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10001,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleCancel();
                    }}
                >
                    <div className="bg-card rounded-xl shadow-2xl p-6 max-w-2xl w-full border border-border">
                        <div className="flex items-center gap-2 mb-4">
                            <Pencil className="w-5 h-5 text-accent" />
                            <h3 className="font-semibold text-lg">Edit Text</h3>
                        </div>
                        
                        <div className="mb-4">
                            <label className="text-sm text-muted-foreground mb-2 block">
                                Original: "{editorState.originalText.slice(0, 100)}..."
                            </label>
                            <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                                rows={4}
                                autoFocus
                            />
                        </div>
                        
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={handleCancel}
                                disabled={isSaving}
                                className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Save
                                    </>
                                )}
                            </button>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-4">
                            Press Enter to save, Escape to cancel. Changes are saved permanently.
                        </p>
                    </div>
                </div>
            )}
        </>,
        document.body
    );
}

