import React from 'react';

interface NeonEffectProps {
    children: React.ReactNode;
    color?: 'cyan' | 'pink' | 'green' | 'blue';
    intensity?: 'low' | 'medium' | 'high';
    glitch?: boolean;
    pulse?: boolean;
    className?: string;
}

const NeonEffect: React.FC<NeonEffectProps> = ({
    children,
    color = 'cyan',
    intensity = 'medium',
    glitch = false,
    pulse = false,
    className = ''
}) => {
    const colorMap = {
        cyan: 'var(--neon-cyan)',
        pink: 'var(--neon-pink)',
        green: 'var(--neon-green)',
        blue: 'var(--neon-blue)'
    };

    const shadowIntensity = {
        low: '0 0 5px',
        medium: '0 0 15px',
        high: '0 0-30px'
    };

    const selectedColor = colorMap[color];
    const shadow = shadowIntensity[intensity];

    return (
        <div
            className={`relative transition-all duration-300 ${className} ${glitch ? 'animate-glitch' : ''} ${pulse ? 'animate-pulse' : ''}`}
            style={{
                filter: `drop-shadow(${shadow} ${selectedColor})`,
            }}
        >
            {children}
        </div>
    );
};

export default NeonEffect;
