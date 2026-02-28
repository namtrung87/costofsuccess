import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    life: number;
    maxLife: number;
}

export type ParticlePreset = 'data' | 'rain' | 'dust' | 'sparks' | 'embers' | 'none';

export const useParticleSystem = (canvasRef: React.RefObject<HTMLCanvasElement | null>, preset: ParticlePreset) => {
    const particles = useRef<Particle[]>([]);
    const requestRef = useRef<number>(null);

    const createParticle = (width: number, height: number): Particle => {
        const isRain = preset === 'rain';
        const isData = preset === 'data';
        const isSparks = preset === 'sparks';
        const isEmbers = preset === 'embers';

        return {
            x: isSparks || isEmbers ? width / 2 : Math.random() * width,
            y: isRain ? -20 : isEmbers ? height + 20 : Math.random() * height,
            vx: isRain ? (Math.random() - 0.5) * 2 : isSparks ? (Math.random() - 0.5) * 10 : (Math.random() - 0.5) * 1,
            vy: isRain ? 15 + Math.random() * 10 : isEmbers ? -2 - Math.random() * 3 : isSparks ? -5 - Math.random() * 10 : (Math.random() - 0.5) * 1,
            size: isRain ? 1 : isData ? 12 : Math.random() * 3 + 1,
            color: isData ? '#00f0ff' : isSparks ? '#ffaa00' : isEmbers ? '#ff4400' : '#ffffff',
            alpha: Math.random() * 0.5 + 0.2,
            life: 0,
            maxLife: isSparks ? 30 + Math.random() * 20 : 100 + Math.random() * 100,
        };
    };

    const update = () => {
        const canvas = canvasRef.current;
        if (!canvas || preset === 'none') return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Maintain particle count
        const targetCount = preset === 'rain' ? 100 : preset === 'data' ? 40 : 60;
        while (particles.current.length < targetCount) {
            particles.current.push(createParticle(canvas.width, canvas.height));
        }

        particles.current.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life++;

            if (preset === 'sparks') p.vy += 0.5; // Gravity for sparks

            // Draw
            ctx.globalAlpha = p.alpha * (1 - p.life / p.maxLife);
            ctx.fillStyle = p.color;

            if (preset === 'data') {
                ctx.font = `${p.size}px monospace`;
                ctx.fillText(Math.random() > 0.5 ? '1' : '0', p.x, p.y);
            } else if (preset === 'rain') {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.vx, p.y + p.vy);
                ctx.strokeStyle = p.color;
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Cleanup
            if (p.life >= p.maxLife || p.y > canvas.height + 20 || p.y < -20 || p.x > canvas.width + 20 || p.x < -20) {
                particles.current[index] = createParticle(canvas.width, canvas.height);
            }
        });

        requestRef.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [preset]);
};
