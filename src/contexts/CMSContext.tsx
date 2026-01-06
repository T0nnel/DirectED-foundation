import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import {
    fetchPageContent,
    getContentByKey,
    upsertContent,
    uploadImage as uploadImageToStorage,
    PageContent,
} from '@/lib/supabase/content';

// Language preference storage key
const LANGUAGE_PREFERENCE_KEY = 'directed_language_preference';

interface CMSContextType {
    isAdmin: boolean; // Now means "can edit" - any logged-in user
    canEdit: boolean; // Alias for isAdmin - any logged-in user can edit
    isEditMode: boolean;
    isPreviewMode: boolean;
    currentLanguage: string;
    toggleEditMode: () => void;
    togglePreviewMode: () => void;
    setLanguage: (langCode: string) => void;
    getContent: (pageName: string, contentKey: string, defaultValue: string) => string;
    updateContent: (
        pageName: string,
        contentKey: string,
        contentType: PageContent['content_type'],
        value: string
    ) => Promise<void>;
    uploadImage: (file: File) => Promise<string>;
    pendingChanges: Map<string, PendingChange>;
    saveAllChanges: () => Promise<void>;
    discardChanges: () => void;
    hasPendingChanges: boolean;
    loadPageContent: (pageName: string) => Promise<void>;
    enableEditMode: () => void;
}

interface PendingChange {
    pageName: string;
    contentKey: string;
    contentType: PageContent['content_type'];
    value: string;
    originalValue: string;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
    // Allow any logged-in user to edit (not just admins)
    const { user } = useAuth();
    const { i18n } = useTranslation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [contentCache, setContentCache] = useState<Map<string, PageContent>>(new Map());
    const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(
        new Map()
    );

    // Any logged-in user can edit
    const canEdit = !!user;

    // Get current language from i18n
    const currentLanguage = i18n.language.split('-')[0]; // Get 'en' from 'en-US'

    // Load saved language preference on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage);
        }
    }, []);

    // Auto-enable edit mode when user logs in
    useEffect(() => {
        if (canEdit) {
            // Automatically enable edit mode for logged-in users
            // Check localStorage preference, default to enabled
            const savedEditMode = localStorage.getItem('directed_edit_mode');
            if (savedEditMode !== 'false') {
                setIsEditMode(true);
            }
        } else {
            // If user logs out, disable edit mode
            setIsEditMode(false);
            setIsPreviewMode(false);
        }
    }, [canEdit]);

    // Function to change language and persist preference
    const setLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        localStorage.setItem(LANGUAGE_PREFERENCE_KEY, langCode);
    };

    // Check for edit mode in URL params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('editMode') === 'true' && canEdit) {
            setIsEditMode(true);
        }
    }, [canEdit]);

    // Reload content when language changes
    useEffect(() => {
        // Clear cache when language changes so content reloads
        setContentCache(new Map());
        setPendingChanges(new Map());
    }, [currentLanguage]);

    const toggleEditMode = () => {
        if (!canEdit) return;
        const newMode = !isEditMode;
        setIsEditMode(newMode);
        setIsPreviewMode(false);
        // Save preference
        localStorage.setItem('directed_edit_mode', String(newMode));
    };

    const enableEditMode = () => {
        // Always set localStorage so it persists, and set state if possible
        localStorage.setItem('directed_edit_mode', 'true');
        if (canEdit) {
            setIsEditMode(true);
            setIsPreviewMode(false);
        }
    };

    const togglePreviewMode = () => {
        if (!canEdit || !isEditMode) return;
        setIsPreviewMode((prev) => !prev);
    };

    const loadPageContent = async (pageName: string) => {
        try {
            const content = await fetchPageContent(pageName, currentLanguage);
            const newCache = new Map(contentCache);
            content.forEach((item) => {
                const cacheKey = `${item.page_name}:${item.content_key}:${item.language_code}`;
                newCache.set(cacheKey, item);
            });
            setContentCache(newCache);
        } catch (error) {
            console.error('Error loading page content:', error);
        }
    };

    const getContent = (
        pageName: string,
        contentKey: string,
        defaultValue: string
    ): string => {
        // Check pending changes first
        const changeKey = `${pageName}:${contentKey}:${currentLanguage}`;
        const pending = pendingChanges.get(changeKey);
        if (pending && !isPreviewMode) {
            return pending.value;
        }

        // Check cache
        const cached = contentCache.get(changeKey);
        if (cached) {
            return cached.content_value;
        }

        // Return default
        return defaultValue;
    };

    const updateContent = async (
        pageName: string,
        contentKey: string,
        contentType: PageContent['content_type'],
        value: string
    ) => {
        const changeKey = `${pageName}:${contentKey}:${currentLanguage}`;
        const originalValue = contentCache.get(changeKey)?.content_value || '';

        setPendingChanges((prev) => {
            const newChanges = new Map(prev);
            newChanges.set(changeKey, {
                pageName,
                contentKey,
                contentType,
                value,
                originalValue,
            });
            return newChanges;
        });
    };

    const uploadImage = async (file: File): Promise<string> => {
        return await uploadImageToStorage(file);
    };

    const saveAllChanges = async () => {
        const promises = Array.from(pendingChanges.values()).map((change) =>
            upsertContent(
                change.pageName,
                change.contentKey,
                change.contentType,
                change.value,
                currentLanguage
            )
        );

        try {
            const results = await Promise.all(promises);

            // Update cache with saved content
            const newCache = new Map(contentCache);
            results.forEach((item) => {
                const cacheKey = `${item.page_name}:${item.content_key}:${item.language_code}`;
                newCache.set(cacheKey, item);
            });
            setContentCache(newCache);

            // Clear pending changes
            setPendingChanges(new Map());
        } catch (error) {
            console.error('Error saving changes:', error);
            throw error;
        }
    };

    const discardChanges = () => {
        setPendingChanges(new Map());
    };

    const hasPendingChanges = pendingChanges.size > 0;

    return (
        <CMSContext.Provider
            value={{
                isAdmin: canEdit, // Any logged-in user can edit
                canEdit,
                isEditMode,
                isPreviewMode,
                currentLanguage,
                toggleEditMode,
                togglePreviewMode,
                setLanguage,
                enableEditMode,
                getContent,
                updateContent,
                uploadImage,
                pendingChanges,
                saveAllChanges,
                discardChanges,
                hasPendingChanges,
                loadPageContent,
            }}
        >
            {children}
        </CMSContext.Provider>
    );
}

export function useCMS() {
    const context = useContext(CMSContext);
    if (context === undefined) {
        throw new Error('useCMS must be used within a CMSProvider');
    }
    return context;
}
