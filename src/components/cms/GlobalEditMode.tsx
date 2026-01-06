import { useEffect, useCallback, useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { createPortal } from 'react-dom';
import { Check, X, Pencil } from 'lucide-react';

// Generate a unique content key from element's text and position
function generateContentKey(element: HTMLElement): string {
    const text = element.textContent?.slice(0, 50) || '';
    const tag = element.tagName.toLowerCase();
    const className = element.className?.split(' ')[0] || '';
    // Create a hash-like key
    const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `${tag}_${className}_${hash}`.replace(/[^a-zA-Z0-9_]/g, '_');
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
    rect: DOMRect;
}

export function GlobalEditMode() {
    const { canEdit, isEditMode, isPreviewMode, updateContent } = useCMS();
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
    const [editorState, setEditorState] = useState<EditorState | null>(null);
    const [editText, setEditText] = useState('');

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
            setEditorState({
                element: target,
                originalText: target.textContent || '',
                rect
            });
            setEditText(target.textContent || '');
        }
    }, [isEditMode, isPreviewMode, clearHoverStyles]);

    // Save the edit
    const handleSave = useCallback(async () => {
        if (!editorState) return;
        
        const pageName = getPageName();
        const contentKey = generateContentKey(editorState.element);
        
        // Update the element visually
        editorState.element.textContent = editText;
        
        // Save to CMS
        await updateContent(pageName, contentKey, 'text', editText);
        
        setEditorState(null);
        setEditText('');
    }, [editorState, editText, updateContent]);

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

    // Set up event listeners
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

    // Don't render anything if not in edit mode
    if (!canEdit || !isEditMode || isPreviewMode) return null;

    return createPortal(
        <>
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
                                className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                Save
                            </button>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-4">
                            Press Enter to save, Escape to cancel
                        </p>
                    </div>
                </div>
            )}
        </>,
        document.body
    );
}

