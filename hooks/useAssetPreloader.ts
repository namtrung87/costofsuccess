import { useState, useEffect } from 'react';
import { ASSETS } from '../constants';

export const useAssetPreloader = () => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const assetUrls = Object.values(ASSETS).filter(url =>
            typeof url === 'string' && (url.startsWith('http') || url.startsWith('file') || url.startsWith('/assets'))
        );

        if (assetUrls.length === 0) {
            setIsLoaded(true);
            setProgress(100);
            return;
        }

        let loadedCount = 0;
        const total = assetUrls.length;

        const handleLoad = () => {
            loadedCount++;
            setProgress(Math.floor((loadedCount / total) * 100));
            if (loadedCount === total) {
                setIsLoaded(true);
            }
        };

        const handleError = (url: string) => {
            console.error(`Failed to load asset: ${url}`);
            // We still proceed even if one fails
            handleLoad();
        };

        assetUrls.forEach(url => {
            const img = new Image();
            let loadCalled = false;
            const wrappedHandleLoad = () => {
                if (!loadCalled) {
                    loadCalled = true;
                    handleLoad();
                }
            };

            img.onload = wrappedHandleLoad;
            img.onerror = () => {
                console.error(`Failed to load asset: ${url}`);
                wrappedHandleLoad();
            };
            img.src = url;

            if (img.complete) {
                wrappedHandleLoad();
            }
        });

    }, []);

    return { progress, isLoaded, error };
};
