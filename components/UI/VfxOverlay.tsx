import React from 'react';

interface VfxOverlayProps {
    type: 'data' | 'rain' | 'dust';
    intensity?: 'low' | 'medium' | 'high';
}

const VfxOverlay: React.FC<VfxOverlayProps> = ({ type, intensity = 'medium' }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {/* Dynamic VFX Implementation */}
            {type === 'data' && (
                <div className="absolute inset-0 opacity-20">
                    <div className="animate-float-data absolute top-1/4 left-1/4 text-[8px] text-neonCyan font-mono">010110</div>
                    <div className="animate-float-data-slow absolute top-1/2 right-1/3 text-[8px] text-neonCyan font-mono opacity-50">0xFE23</div>
                    <div className="animate-float-data-fast absolute bottom-1/4 right-1/4 text-[8px] text-neonCyan font-mono">110001</div>
                </div>
            )}

            {type === 'rain' && (
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />
                    <div className="animate-rain-fall absolute top-[-100%] left-1/2 w-px h-20 bg-white" />
                    <div className="animate-rain-fall-delayed absolute top-[-100%] left-1/4 w-px h-15 bg-white opacity-40" />
                    <div className="animate-rain-fall-fast absolute top-[-100%] right-1/4 w-px h-25 bg-white opacity-60" />
                </div>
            )}

            {type === 'dust' && (
                <div className="absolute inset-0 opacity-10">
                    <div className="animate-drift absolute top-1/3 left-1/2 w-1 h-1 bg-white rounded-full blur-[1px]" />
                    <div className="animate-drift-slow absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full blur-[2px] opacity-50" />
                    <div className="animate-drift-fast absolute bottom-1/3 left-1/4 w-0.5 h-0.5 bg-white rounded-full" />
                </div>
            )}

            {/* Global Grain/Noise */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
        </div>
    );
};

export default VfxOverlay;
