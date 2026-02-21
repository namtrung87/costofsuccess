
import React from 'react';
import { useGame } from '../../context/GameContext';
import { SANITY_CRITICAL_THRESHOLD, ASSETS } from '../../constants';

const SanityMeter: React.FC = () => {
  const { state } = useGame();
  const { sanity } = state;
  
  // Calculate fill height percentage
  const fillHeight = `${sanity}%`;
  
  const isCritical = sanity <= SANITY_CRITICAL_THRESHOLD;

  return (
    <div className={`relative w-16 h-20 flex flex-col items-center justify-end group ${isCritical ? 'animate-pulse' : ''}`}>
      
      {/* Background Image Asset */}
      <img 
        src={ASSETS.UNLIMITED_BOBA} 
        alt="Sanity" 
        className="w-full h-full object-contain absolute z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" 
      />

      {/* Liquid Fill Effect (Behind the image) */}
      <div className="absolute bottom-2 w-8 h-12 bg-gray-900 rounded-b-lg overflow-hidden z-0 border border-gray-700">
          <div 
            className={`absolute bottom-0 w-full transition-all duration-1000 ease-in-out ${isCritical ? 'bg-neonPink' : 'bg-amber-500'}`}
            style={{ height: fillHeight }}
          >
              {/* Bubbles */}
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-black/50 rounded-full" />
              <div className="absolute bottom-3 right-2 w-1 h-1 bg-black/50 rounded-full" />
          </div>
      </div>

      {/* Label/Tooltip on Hover */}
      <div className="absolute top-full mt-1 px-2 py-1 bg-black/80 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-neonCyan z-20">
        Sanity: {sanity}%
      </div>
    </div>
  );
};

export default SanityMeter;
