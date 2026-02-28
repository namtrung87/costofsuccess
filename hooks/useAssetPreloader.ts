
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';

/**
 * useAssetPreloader
 * 
 * Logic to ensure all assets for a specific phase are loaded before the phase is revealed.
 * This prevents the "white flash" or popping artifacts during transitions.
 */
export const useAssetPreloader = (assetKeys: string[]) => {
    const { state, dispatch } = useGame();
    const [isInternalLoading, setIsInternalLoading] = useState(true);

    useEffect(() => {
        if (assetKeys.length === 0) {
            setIsInternalLoading(false);
            return;
        }

        dispatch({ type: 'SET_ASSETS_LOADING', payload: { isLoading: true, percentage: 0 } });
        setIsInternalLoading(true);

        const total = assetKeys.length;
        let loaded = 0;

        const handleLoad = () => {
            loaded++;
            const percentage = Math.round((loaded / total) * 100);
            dispatch({ type: 'SET_ASSETS_LOADING', payload: { isLoading: true, percentage } });

            if (loaded === total) {
                dispatch({ type: 'SET_ASSETS_LOADING', payload: { isLoading: false, percentage: 100 } });
                setIsInternalLoading(false);
            }
        };

        const handleError = (key: string) => {
            console.error(`Asset failed to load: ${key}`);
            handleLoad(); // Continue anyway to not block the game indefinitely
        };

        assetKeys.forEach(key => {
            const url = state.assets[key];
            if (!url) {
                handleLoad();
                return;
            }

            const img = new Image();
            img.src = url;

            if (img.complete) {
                handleLoad();
            } else {
                img.onload = handleLoad;
                img.onerror = () => handleError(key);
            }
        });

    }, [assetKeys, state.assets, dispatch]);

    return isInternalLoading;
};
