import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const BudgetTicker: React.FC = () => {
  const { state, dispatch } = useGame();
  const { budget, sanity } = state;
  const [trend, setTrend] = useState<'neutral' | 'up' | 'down'>('neutral');

  const count = useMotionValue(budget);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const prev = count.get();
    if (budget > prev) setTrend('up');
    else if (budget < prev) setTrend('down');

    const controls = animate(count, budget, {
      duration: 1,
      ease: "easeOut",
      onComplete: () => setTrend('neutral')
    });

    return controls.stop;
  }, [budget]);

  const handleBuyBoba = () => {
    if (budget >= 50 && sanity < 100) {
      dispatch({ type: 'BUY_BOBA' });
    }
  };

  const canAfford = budget >= 50;

  return (
    <div className="flex flex-col items-end gap-2">
      <div className={`flex flex-col items-end transition-transform ${trend === 'up' ? 'animate-jump' : ''}`}>
        <div className="text-[10px] text-neonCyan font-heading tracking-widest uppercase mb-1">
          Personal Cash
        </div>
        <motion.div className={`
            font-mono text-xl md:text-2xl font-bold bg-black/40 px-4 py-1 rounded border border-white/20 backdrop-blur-md
            ${trend === 'up' ? 'text-neonGreen border-neonGreen shadow-neon-green' : ''}
            ${trend === 'down' ? 'text-neonPink border-neonPink shadow-neon-pink' : ''}
            ${trend === 'neutral' ? 'text-white' : ''}
            transition-all duration-300
        `}>
          $<motion.span>{rounded}</motion.span>
        </motion.div>
      </div>

      {/* Buy Boba Button */}
      <button
        onClick={handleBuyBoba}
        disabled={!canAfford || sanity >= 100}
        className={`
            flex items-center gap-2 px-3 py-1 rounded border text-[10px] font-mono transition-all
            ${canAfford && sanity < 100
            ? 'border-neonCyan text-neonCyan hover:bg-neonCyan hover:text-black cursor-pointer'
            : 'border-gray-700 text-gray-600 cursor-not-allowed'}
        `}
      >
        <span>🥤</span>
        <span>BUY BOBA (-$50)</span>
      </button>
    </div>
  );
};

export default BudgetTicker;