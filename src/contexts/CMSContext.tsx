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

interface CMSContextType {
    isAdmin: boolean;
    isEditMode: boolean;
    isPreviewMode: boolean;
    currentLanguage: string;
    toggleEditMode: () => void;
    togglePreviewMode: () => void;
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
    // Allow EVERYONE to edit (not just admin)
    const isAdmin = true;
    const { i18n } = useTranslation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [contentCache, setContentCache] = useState<Map<string, PageContent>>(new Map());
    const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(
        new Map()
    );

    // Get current language from i18n
    const currentLanguage = i18n.language.split('-')[0]; // Get 'en' from 'en-US'

    // Check for edit mode in URL params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('editMode') === 'true') {
            setIsEditMode(true);
        }
    }, []);

    // Reload content when language changes
    useEffect(() => {
        // Clear cache when language changes so content reloads
        setContentCache(new Map());
        setPendingChanges(new Map());
    }, [currentLanguage]);

    const toggleEditMode = () => {
        if (!isAdmin) return;
        setIsEditMode((prev) => !prev);
        setIsPreviewMode(false);
    };

    const togglePreviewMode = () => {
        if (!isAdmin || !isEditMode) return;
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
                isAdmin,
                isEditMode,
                isPreviewMode,
                currentLanguage,
                toggleEditMode,
                togglePreviewMode,
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
