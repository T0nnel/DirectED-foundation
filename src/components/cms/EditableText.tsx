import { useState, useRef, useEffect } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';

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
    const { isEditMode, isPreviewMode, getContent, updateContent } = useCMS();
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


    // If in preview mode, just render the content
    if (isPreviewMode) {
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

    // Edit mode
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
                        'border-2 border-accent rounded p-2 outline-none focus:ring-2 focus:ring-accent',
                        className
                    )}
                    dangerouslySetInnerHTML={{ __html: localValue }}
                />
                <div className="mt-2 flex gap-2">
                    <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-accent text-white rounded text-sm hover:bg-accent/90"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-3 py-1 bg-muted text-foreground rounded text-sm hover:bg-muted/80"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    // Editable preview state
    return (
        <div
            onClick={() => setIsEditing(true)}
            className="relative group cursor-pointer"
        >
            <Component
                className={cn(
                    'border-2 border-transparent hover:border-accent/50 rounded transition-all',
                    className
                )}
                dangerouslySetInnerHTML={richText ? { __html: content } : undefined}
            >
                {!richText && content}
            </Component>
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-accent text-white p-1 rounded-bl text-xs flex items-center gap-1">
                    <Pencil className="w-3 h-3" />
                    Edit
                </div>
            </div>
        </div>
    );
}
