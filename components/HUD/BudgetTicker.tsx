import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';

const BudgetTicker: React.FC = () => {
  const { state, dispatch } = useGame();
  const { budget, sanity } = state;
  const [displayBudget, setDisplayBudget] = useState(budget);
  const [trend, setTrend] = useState<'neutral' | 'up' | 'down'>('neutral');

  useEffect(() => {
    if (budget > displayBudget) {
      setTrend('up');
    } else if (budget < displayBudget) {
      setTrend('down');
    }
    
    // Simple animation for numbers rolling
    const interval = setInterval(() => {
      setDisplayBudget(prev => {
        const diff = budget - prev;
        if (Math.abs(diff) < 1) {
            setTrend('neutral');
            return budget;
        }
        return prev + diff * 0.2; // Ease towards target
      });
    }, 50);

    return () => clearInterval(interval);
  }, [budget, displayBudget]);

  const handleBuyBoba = () => {
      if (budget >= 50 && sanity < 100) {
          dispatch({ type: 'BUY_BOBA' });
      }
  };

  const canAfford = budget >= 50;

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex flex-col items-end">
        <div className="text-[10px] text-neonCyan font-heading tracking-widest uppercase mb-1">
            Personal Cash
        </div>
        <div className={`
            font-mono text-xl md:text-2xl font-bold bg-black/40 px-4 py-1 rounded border border-white/20 backdrop-blur-md
            ${trend === 'up' ? 'text-neonGreen border-neonGreen shadow-neon-green' : ''}
            ${trend === 'down' ? 'text-neonPink border-neonPink shadow-neon-pink' : ''}
            ${trend === 'neutral' ? 'text-white' : ''}
            transition-all duration-300
        `}>
            ${Math.round(displayBudget).toLocaleString()}
        </div>
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