
import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  intensity?: 'LOW' | 'HIGH';
  border?: 'CYAN' | 'GREEN' | 'PINK' | 'NONE';
}

const GlassPanel: React.FC<GlassPanelProps> = ({ 
    children, 
    className = '', 
    contentClassName = '',
    intensity = 'LOW',
    border = 'CYAN'
}) => {
  
  let bgClass = intensity === 'LOW' ? 'bg-black/60 backdrop-blur-md' : 'bg-black/90 backdrop-blur-xl';
  
  let borderClass = '';
  if (border === 'CYAN') borderClass = 'border border-neonCyan/50 shadow-[0_0_10px_rgba(0,240,255,0.1)]';
  if (border === 'GREEN') borderClass = 'border border-neonGreen/50 shadow-[0_0_10px_rgba(57,255,20,0.1)]';
  if (border === 'PINK') borderClass = 'border border-neonPink/50 shadow-[0_0_10px_rgba(255,0,85,0.1)]';
  if (border === 'NONE') borderClass = 'border-none';

  return (
    <div className={`
        ${bgClass} ${borderClass} rounded-xl p-6 relative overflow-hidden
        ${className}
    `}>
        {/* Subtle Scanline Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
        
        {/* Content */}
        <div className={`relative z-10 h-full w-full ${contentClassName}`}>
            {children}
        </div>
    </div>
  );
};

export default GlassPanel;
