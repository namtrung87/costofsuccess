import React, { useRef } from 'react';
import { useParticleSystem } from '../../hooks/useParticleSystem';

interface VfxOverlayProps {
    type: 'data' | 'rain' | 'dust';
    intensity?: 'low' | 'medium' | 'high';
}

const VfxOverlay: React.FC<VfxOverlayProps> = ({ type, intensity = 'medium' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useParticleSystem(canvasRef, type);

    const opacity = intensity === 'low' ? 0.2 : intensity === 'medium' ? 0.4 : 0.6;

    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ opacity }}
            />

            {/* Global Grain/Noise */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
        </div>
    );
};

export default VfxOverlay;
