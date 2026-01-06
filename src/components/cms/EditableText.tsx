import { useState, useRef, useEffect } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { cn } from '@/lib/utils';
import { Pencil, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EditableTextProps {
    pageName: string;
    contentKey: string;
    defaultValue: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    className?: string;
    richText?: boolean;
}

export function EditableText({
    pageName,
    contentKey,
    defaultValue,
    as: Component = 'p',
    className,
    richText = false,
}: EditableTextProps) {
    const { isAdmin, isEditMode, isPreviewMode, getContent, updateContent } = useCMS();
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const textRef = useRef<HTMLDivElement>(null);

    const content = getContent(pageName, contentKey, defaultValue);

    useEffect(() => {
        setLocalValue(content);
    }, [content]);

    const handleSave = () => {
        updateContent(
            pageName,
            contentKey,
            richText ? 'richtext' : 'text',
            localValue
        );
        setIsEditing(false);
    };

    const handleCancel = () => {
        setLocalValue(content);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleCancel();
        } else if (e.key === 'Enter' && !richText && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSave();
        }
    };

    // If not admin or not in edit mode, just render the content normally
    if (!isAdmin || !isEditMode || isPreviewMode) {
        if (richText) {
            return (
                <Component
                    className={className}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        }
        return <Component className={className}>{content}</Component>;
    }

    // Admin is in edit mode and actively editing this element
    if (isEditing) {
        return (
            <div className="relative group">
                <div
                    ref={textRef}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setLocalValue(e.currentTarget.textContent || '')}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        'border-2 border-accent rounded-lg p-3 outline-none focus:ring-2 focus:ring-accent/50 bg-accent/5',
                        className
                    )}
                    dangerouslySetInnerHTML={{ __html: localValue }}
                />
                <div className="absolute -bottom-10 left-0 flex gap-2 z-10">
                    <button
                        onClick={handleSave}
                        className="px-3 py-1.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors flex items-center gap-1.5 shadow-lg"
                    >
                        <Check className="w-3.5 h-3.5" />
                        {t('common.save', 'Save')}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-3 py-1.5 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-1.5 shadow-lg"
                    >
                        <X className="w-3.5 h-3.5" />
                        {t('common.cancel', 'Cancel')}
                    </button>
                </div>
            </div>
        );
    }

    // Admin is in edit mode - show editable preview with hover effects
    return (
        <div
            onClick={() => setIsEditing(true)}
            className="relative group cursor-pointer"
        >
            <Component
                className={cn(
                    'border-2 border-dashed border-transparent group-hover:border-accent/40 rounded-lg transition-all duration-200',
                    'group-hover:bg-accent/5',
                    className
                )}
                dangerouslySetInnerHTML={richText ? { __html: content } : undefined}
            >
                {!richText && content}
            </Component>
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
                <div className="bg-accent text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-lg">
                    <Pencil className="w-3 h-3" />
                    {t('common.edit', 'Edit')}
                </div>
            </div>
        </div>
    );
}
