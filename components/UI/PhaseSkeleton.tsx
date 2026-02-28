import React from 'react';

/**
 * PhaseSkeleton — shown as the Suspense fallback while a phase JS chunk loads.
 * Replaces the hard LoadingScreen with a lightweight, non-intrusive shimmer effect
 * that keeps the game feeling alive during lazy chunk fetching.
 */
const PhaseSkeleton: React.FC = () => {
    return (
        <div
            className="w-full h-screen bg-obsidian flex flex-col items-center justify-center gap-6 overflow-hidden"
            role="status"
            aria-label="Loading phase..."
        >
            {/* Scanline overlay */}
            <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.1)_2px,rgba(0,240,255,0.1)_4px)] pointer-events-none" />

            {/* Simulated character silhouette shimmer */}
            <div className="relative flex gap-12 items-end mb-4">
                <div className="w-24 h-64 rounded-t-full bg-white/5 animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="w-28 h-80 rounded-t-full bg-white/5 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>

            {/* Simulated dialogue box shimmer */}
            <div className="w-full max-w-2xl px-6 space-y-3">
                <div className="h-20 w-full bg-white/5 border border-neonCyan/10 rounded-sm animate-pulse" style={{ animationDelay: '0.15s' }} />
                <div className="flex gap-3">
                    <div className="h-10 flex-1 bg-white/5 border border-neonPink/10 rounded-sm animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="h-10 flex-1 bg-white/5 border border-neonPink/10 rounded-sm animate-pulse" style={{ animationDelay: '0.25s' }} />
                </div>
            </div>

            {/* Status text */}
            <p className="text-neonCyan/40 text-[10px] font-mono tracking-[0.3em] uppercase animate-pulse">
                NEURAL_LINK connecting...
            </p>
        </div>
    );
};

export default React.memo(PhaseSkeleton);
