
import React from 'react';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SANITY_CRITICAL_THRESHOLD, ASSETS } from '../../constants';

const SanityMeter: React.FC = () => {
  const { state } = useGame();
  const { sanity } = state;

  // Calculate fill height percentage
  const fillHeight = `${sanity}%`;

  const isCritical = sanity <= SANITY_CRITICAL_THRESHOLD;
  const [isDamaged, setIsDamaged] = React.useState(false);

  React.useEffect(() => {
    setIsDamaged(true);
    const timer = setTimeout(() => setIsDamaged(false), 300);
    return () => clearTimeout(timer);
  }, [sanity]);

  return (
    <div className={`relative w-16 h-20 flex flex-col items-center justify-end group ${isCritical ? 'animate-pulse' : ''} ${isDamaged ? 'animate-damage' : ''}`}>

      {/* Background Image Asset */}
      <img
        src={ASSETS.UNLIMITED_BOBA}
        alt="Sanity"
        className="w-full h-full object-contain absolute z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
      />

      {/* Liquid Fill Effect (Behind the image) */}
      <div className="absolute bottom-2 w-8 h-12 bg-gray-900 rounded-b-lg overflow-hidden z-0 border border-gray-700">
        <motion.div
          initial={{ height: 0 }}
          animate={{
            height: `${sanity}%`,
            backgroundColor: isCritical ? '#FF00A0' : '#F59E0B'
          }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="absolute bottom-0 w-full"
        >
          {/* Bubbles / Wave Effect */}
          <motion.div
            animate={{
              y: [0, -5, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-2 bg-white/20 blur-[2px]"
          />
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-black/20 rounded-full" />
          <div className="absolute bottom-3 right-2 w-1 h-1 bg-black/20 rounded-full" />
        </motion.div>
      </div>

      {/* Label/Tooltip on Hover */}
      <div className="absolute top-full mt-1 px-2 py-1 bg-black/80 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-neonCyan z-20">
        Sanity: {sanity}%
      </div>
    </div>
  );
};

export default SanityMeter;
