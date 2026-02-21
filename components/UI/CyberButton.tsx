import React from 'react';
import { useAudio } from '../../context/AudioContext';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'GLITCH';
  label: string;
  icon?: string;
}

const CyberButton: React.FC<CyberButtonProps> = ({ 
    variant = 'PRIMARY', 
    label, 
    icon, 
    className = '', 
    onClick,
    disabled,
    ...props 
}) => {
  const { playSFX } = useAudio();

  const handleMouseEnter = () => {
    if (!disabled) playSFX('HOVER');
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
        playSFX('CLICK');
        if (onClick) onClick(e);
    }
  };

  // Base Styles
  let styles = `
    relative overflow-hidden font-heading font-bold uppercase tracking-widest px-8 py-3 
    transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Variants
  if (variant === 'PRIMARY') {
      styles += `
        bg-neonCyan text-black 
        hover:bg-white hover:shadow-[0_0_15px_#00F0FF] hover:-translate-y-1
        border border-transparent
      `;
  } else if (variant === 'SECONDARY') {
      styles += `
        bg-transparent text-neonCyan border border-neonCyan
        hover:bg-neonCyan/10 hover:shadow-[0_0_10px_#00F0FF]
      `;
  } else if (variant === 'DANGER') {
      styles += `
        bg-transparent text-neonPink border border-neonPink
        hover:bg-neonPink hover:text-black hover:shadow-[0_0_15px_#FF0055]
      `;
  }

  return (
    <button 
        className={`${styles} ${className} group`}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        disabled={disabled}
        {...props}
    >
      {/* Glitch Overlay Effect on Hover */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
      
      <div className="flex items-center justify-center gap-2 relative z-10">
          {icon && <span>{icon}</span>}
          <span>{label}</span>
      </div>
    </button>
  );
};

export default CyberButton;
