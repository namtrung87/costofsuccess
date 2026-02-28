import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ParallaxLayer {
    image: string;
    depth: number; // 0 (bg) to 1 (fg)
}

interface BackgroundParallaxProps {
    image?: string; // Legacy single image support
    layers?: ParallaxLayer[]; // New multi-layer support
    intensity?: number;
    className?: string;
    children?: React.ReactNode;
}

const BackgroundParallax: React.FC<BackgroundParallaxProps> = ({
    image,
    layers,
    intensity = 0.05,
    className = '',
    children
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 100, damping: 30 };
    const sx = useSpring(mouseX, springConfig);
    const sy = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX - window.innerWidth / 2) * intensity;
            const y = (clientY - window.innerHeight / 2) * intensity;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [intensity, mouseX, mouseY]);

    // Normalize layers: if single image provided, convert to one layer
    const actualLayers: ParallaxLayer[] = layers || (image ? [{ image, depth: 1 }] : []);

    return (
        <div className={`absolute inset-0 overflow-hidden bg-obsidian ${className}`}>
            {actualLayers.map((layer, index) => {
                // Use useTransform for precise depth mapping
                const x = useTransform(sx, (v) => v * layer.depth);
                const y = useTransform(sy, (v) => v * layer.depth);

                return (
                    <motion.div
                        key={index}
                        className="absolute inset-[-10%] bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${layer.image})`,
                            x,
                            y,
                            filter: index === 0 ? 'brightness(0.7)' : 'none',
                        }}
                    />
                );
            })}

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default BackgroundParallax;
