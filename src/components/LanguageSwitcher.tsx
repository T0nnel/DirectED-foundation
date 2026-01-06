import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCMS } from '@/contexts/CMSContext';
import { cn } from '@/lib/utils';

interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag?: string;
}

const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

interface LanguageSwitcherProps {
    variant?: 'compact' | 'full' | 'dropdown';
    className?: string;
    showFlags?: boolean;
    showNativeNames?: boolean;
}

export function LanguageSwitcher({
    variant = 'dropdown',
    className,
    showFlags = true,
    showNativeNames = true,
}: LanguageSwitcherProps) {
    const { i18n } = useTranslation();
    const { setLanguage, currentLanguage } = useCMS();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = languages.find(
        (l) => l.code === currentLanguage || i18n.language.startsWith(l.code)
    ) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageSelect = (langCode: string) => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-1', className)}>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={cn(
                            'px-2 py-1 text-xs font-medium rounded transition-colors',
                            currentLang.code === lang.code
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                        title={lang.name}
                    >
                        {showFlags ? lang.flag : lang.code.toUpperCase()}
                    </button>
                ))}
            </div>
        );
    }

    if (variant === 'full') {
        return (
            <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2', className)}>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-lg border transition-all',
                            currentLang.code === lang.code
                                ? 'border-accent bg-accent/10 text-foreground'
                                : 'border-border bg-card hover:border-accent/50 hover:bg-muted'
                        )}
                    >
                        {showFlags && <span className="text-xl">{lang.flag}</span>}
                        <div className="text-left">
                            <p className="font-medium text-sm">{lang.name}</p>
                            {showNativeNames && (
                                <p className="text-xs text-muted-foreground">{lang.nativeName}</p>
                            )}
                        </div>
                        {currentLang.code === lang.code && (
                            <Check className="w-4 h-4 ml-auto text-accent" />
                        )}
                    </button>
                ))}
            </div>
        );
    }

    // Default dropdown variant
    return (
        <div ref={dropdownRef} className={cn('relative', className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
            >
                <Globe className="w-4 h-4 text-muted-foreground" />
                {showFlags && <span className="text-sm">{currentLang.flag}</span>}
                <span className="text-sm font-medium">
                    {showNativeNames ? currentLang.nativeName : currentLang.name}
                </span>
                <ChevronDown
                    className={cn(
                        'w-4 h-4 text-muted-foreground transition-transform',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-elevated overflow-hidden z-50"
                    >
                        <div className="p-2">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageSelect(lang.code)}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                                        currentLang.code === lang.code
                                            ? 'bg-accent/10 text-foreground'
                                            : 'hover:bg-muted text-foreground'
                                    )}
                                >
                                    {showFlags && <span className="text-lg">{lang.flag}</span>}
                                    <div className="text-left flex-1">
                                        <p className="text-sm font-medium">{lang.name}</p>
                                        {showNativeNames && (
                                            <p className="text-xs text-muted-foreground">
                                                {lang.nativeName}
                                            </p>
                                        )}
                                    </div>
                                    {currentLang.code === lang.code && (
                                        <Check className="w-4 h-4 text-accent" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LanguageSwitcher;

