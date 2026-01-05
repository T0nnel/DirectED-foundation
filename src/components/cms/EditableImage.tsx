import { useState, useRef } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { cn } from '@/lib/utils';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditableImageProps {
    pageName: string;
    contentKey: string;
    defaultSrc: string;
    alt?: string;
    className?: string;
    containerClassName?: string;
}

export function EditableImage({
    pageName,
    contentKey,
    defaultSrc,
    alt = '',
    className,
    containerClassName,
}: EditableImageProps) {
    const { isEditMode, isPreviewMode, getContent, updateContent, uploadImage } = useCMS();
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [showUploadArea, setShowUploadArea] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imageSrc = getContent(pageName, contentKey, defaultSrc);

    const handleFileSelect = async (file: File) => {
        // Validate file
        if (!file.type.startsWith('image/')) {
            toast({
                title: 'Invalid file type',
                description: 'Please upload an image file',
                variant: 'destructive',
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: 'File too large',
                description: 'Image must be less than 5MB',
                variant: 'destructive',
            });
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        setIsUploading(true);
        try {
            const url = await uploadImage(file);
            await updateContent(pageName, contentKey, 'image', url);
            setShowUploadArea(false);
            setPreviewUrl(null);
            toast({
                title: 'Image uploaded',
                description: 'Image has been updated successfully',
            });
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                title: 'Upload failed',
                description: 'Failed to upload image. Please try again.',
                variant: 'destructive',
            });
            setPreviewUrl(null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // If not in edit mode or in preview mode, just render the image
    if (!isEditMode || isPreviewMode) {
        return (
            <img
                src={imageSrc}
                alt={alt}
                className={className}
            />
        );
    }

    // Edit mode with upload area
    if (showUploadArea) {
        return (
            <div className={cn('relative', containerClassName)}>
                {previewUrl ? (
                    // Preview uploaded image
                    <div className="relative">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className={cn('opacity-50', className)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {isUploading ? (
                                <div className="bg-black/70 text-white px-4 py-2 rounded flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Uploading...
                                </div>
                            ) : (
                                <div className="bg-accent text-white px-4 py-2 rounded flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    Ready to save
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Upload dropzone
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            'border-2 border-dashed border-accent rounded-lg cursor-pointer hover:border-accent/80 transition-colors',
                            'flex flex-col items-center justify-center gap-4 min-h-[200px] bg-accent/5',
                            className
                        )}
                    >
                        <Upload className="w-12 h-12 text-accent" />
                        <div className="text-center">
                            <p className="font-medium">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileSelect(file);
                            }}
                        />
                    </div>
                )}
                <button
                    onClick={() => {
                        setShowUploadArea(false);
                        setPreviewUrl(null);
                    }}
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    disabled={isUploading}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        );
    }

    // Editable preview state
    return (
        <div
            className={cn('relative group cursor-pointer', containerClassName)}
            onClick={() => setShowUploadArea(true)}
        >
            <img
                src={imageSrc}
                alt={alt}
                className={cn(
                    'border-2 border-transparent group-hover:border-accent/50 rounded transition-all',
                    className
                )}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 flex items-center justify-center rounded">
                <div className="bg-accent text-white px-4 py-2 rounded flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Change Image
                </div>
            </div>
        </div>
    );
}
