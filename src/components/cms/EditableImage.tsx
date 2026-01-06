import { useState, useRef } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { cn } from '@/lib/utils';
import { Upload, X, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

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
    const { isAdmin, isEditMode, isPreviewMode, getContent, updateContent, uploadImage } = useCMS();
    const { toast } = useToast();
    const { t } = useTranslation();
    const [isUploading, setIsUploading] = useState(false);
    const [showUploadArea, setShowUploadArea] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imageSrc = getContent(pageName, contentKey, defaultSrc);

    const handleFileSelect = async (file: File) => {
        // Validate file
        if (!file.type.startsWith('image/')) {
            toast({
                title: t('common.error', 'Error'),
                description: 'Please upload an image file',
                variant: 'destructive',
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: t('common.error', 'Error'),
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
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    // If not admin or not in edit mode or in preview mode, just render the image
    if (!isAdmin || !isEditMode || isPreviewMode) {
        return (
            <img
                src={imageSrc}
                alt={alt}
                className={className}
            />
        );
    }

    // Edit mode with upload area shown
    if (showUploadArea) {
        return (
            <div className={cn('relative', containerClassName)}>
                {previewUrl ? (
                    // Preview uploaded image
                    <div className="relative rounded-xl overflow-hidden">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className={cn('opacity-60', className)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                            {isUploading ? (
                                <div className="bg-card/90 backdrop-blur px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
                                    <Loader2 className="w-5 h-5 text-accent animate-spin" />
                                    <span className="font-medium">Uploading...</span>
                                </div>
                            ) : (
                                <div className="bg-accent text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
                                    <Check className="w-5 h-5" />
                                    <span className="font-medium">Ready to save</span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Upload dropzone
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            'border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200',
                            'flex flex-col items-center justify-center gap-4 min-h-[200px]',
                            isDragOver 
                                ? 'border-accent bg-accent/10 scale-[1.02]' 
                                : 'border-accent/50 bg-accent/5 hover:border-accent hover:bg-accent/10',
                            className
                        )}
                    >
                        <div className={cn(
                            'w-16 h-16 rounded-full flex items-center justify-center transition-colors',
                            isDragOver ? 'bg-accent/20' : 'bg-accent/10'
                        )}>
                            <Upload className={cn(
                                'w-8 h-8 transition-colors',
                                isDragOver ? 'text-accent' : 'text-accent/70'
                            )} />
                        </div>
                        <div className="text-center">
                            <p className="font-medium text-foreground">
                                {isDragOver ? 'Drop image here' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">PNG, JPG, GIF, WebP up to 5MB</p>
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
                    className="absolute top-3 right-3 bg-card/90 backdrop-blur text-foreground p-2 rounded-full hover:bg-card shadow-lg transition-colors"
                    disabled={isUploading}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        );
    }

    // Admin is in edit mode - show image with edit overlay on hover
    return (
        <div
            className={cn('relative group cursor-pointer', containerClassName)}
            onClick={() => setShowUploadArea(true)}
        >
            <img
                src={imageSrc}
                alt={alt}
                className={cn(
                    'border-2 border-dashed border-transparent group-hover:border-accent/40 rounded-xl transition-all duration-200',
                    className
                )}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/40 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
                <div className="bg-accent text-white px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 font-medium transform scale-90 group-hover:scale-100 transition-transform">
                    <ImageIcon className="w-4 h-4" />
                    Change Image
                </div>
            </div>
            {/* Edit indicator badge */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
                <div className="bg-accent text-white p-2 rounded-lg shadow-lg">
                    <ImageIcon className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
