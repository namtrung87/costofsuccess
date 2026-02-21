
import React, { useState, useEffect } from 'react';
import { LabChallenge, LAB_INGREDIENTS } from '../../data/phase3';
import { useGame } from '../../context/GameContext';
import { ASSETS } from '../../constants';

interface LabInterfaceProps {
  challenges: LabChallenge[];
  onComplete: (score: number) => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const LabInterface: React.FC<LabInterfaceProps> = ({ challenges, onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'FAILURE'>('IDLE');
  const [score, setScore] = useState(0);

  const currentChallenge = challenges[currentChallengeIndex];
  // Get localized ingredients
  const ingredients = LAB_INGREDIENTS[state.language];

  const toggleIngredient = (id: string) => {
    if (status !== 'IDLE') return;
    
    setSelectedIngredients(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const handleSynthesize = () => {
    setStatus('PROCESSING');
    
    // Check logic
    // Sort both arrays to ensure order doesn't matter
    const req = [...currentChallenge.requiredIngredients].sort();
    const sel = [...selectedIngredients].sort();
    
    const isCorrect = JSON.stringify(req) === JSON.stringify(sel);

    setTimeout(() => {
        if (isCorrect) {
            setStatus('SUCCESS');
            onCorrect();
            setScore(s => s + 1);
        } else {
            setStatus('FAILURE');
            onIncorrect();
        }

        setTimeout(() => {
            if (currentChallengeIndex < challenges.length - 1) {
                setCurrentChallengeIndex(prev => prev + 1);
                setSelectedIngredients([]);
                setStatus('IDLE');
            } else {
                onComplete(score + (isCorrect ? 1 : 0));
            }
        }, 1500);
    }, 1500); // Processing Time
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
      
      {/* HUD Header */}
      <div className="absolute top-0 w-full p-4 flex justify-center">
        <div className="bg-white/5 border border-white/10 px-8 py-2 rounded-full backdrop-blur text-xs font-mono text-gray-400">
            SEQUENCE: {currentChallengeIndex + 1} / {challenges.length}
        </div>
      </div>

      <div className="w-full max-w-4xl p-6 flex flex-col items-center">
        
        {/* Main Reactor Display */}
        <div className="relative mb-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-4 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {currentChallenge.name}
            </h2>
            <p className="text-neonCyan font-mono text-sm md:text-base max-w-xl text-center mb-2">
                {currentChallenge.description}
            </p>
            <p className="text-gray-500 text-xs italic">
                Hint: {currentChallenge.hint}
            </p>

            {/* Reactor Core Animation */}
            <div className={`
                mt-8 w-48 h-48 rounded-full border-4 flex items-center justify-center relative transition-all duration-500 overflow-hidden bg-black
                ${status === 'IDLE' ? 'border-gray-700' : ''}
                ${status === 'PROCESSING' ? 'border-neonCyan animate-pulse' : ''}
                ${status === 'SUCCESS' ? 'border-neonGreen shadow-neon-green' : ''}
                ${status === 'FAILURE' ? 'border-neonPink shadow-neon-pink' : ''}
            `}>
                {/* Rusty Gear Asset as Reactor Core */}
                <img 
                    src={ASSETS.ICON_GEAR} 
                    alt="Gear" 
                    className={`
                        w-40 h-40 opacity-80 object-contain
                        ${status === 'PROCESSING' ? 'animate-[spin_1s_linear_infinite]' : 'animate-[spin_10s_linear_infinite]'}
                    `}
                />
                
                {/* Overlay Status Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                    <div className="text-4xl">
                        {status === 'SUCCESS' && '✅'}
                        {status === 'FAILURE' && '❌'}
                    </div>
                </div>
            </div>
        </div>

        {/* Ingredient Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 w-full">
            {ingredients.map((ing) => {
                const isSelected = selectedIngredients.includes(ing.id);
                // Tailwind dynamic classes based on color prop
                let colorClass = "border-gray-600 text-gray-400";
                if (isSelected) {
                    if (ing.color === 'cyan') colorClass = "border-cyan-400 text-cyan-400 bg-cyan-900/30 shadow-[0_0_10px_rgba(34,211,238,0.3)]";
                    if (ing.color === 'purple') colorClass = "border-purple-400 text-purple-400 bg-purple-900/30 shadow-[0_0_10px_rgba(192,132,252,0.3)]";
                    if (ing.color === 'orange') colorClass = "border-orange-400 text-orange-400 bg-orange-900/30 shadow-[0_0_10px_rgba(251,146,60,0.3)]";
                    if (ing.color === 'gray') colorClass = "border-gray-200 text-gray-200 bg-gray-700/30";
                    if (ing.color === 'pink') colorClass = "border-pink-400 text-pink-400 bg-pink-900/30";
                }

                return (
                    <button
                        key={ing.id}
                        onClick={() => toggleIngredient(ing.id)}
                        disabled={status !== 'IDLE'}
                        className={`
                            h-32 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 active:scale-95
                            ${colorClass}
                            hover:bg-white/5
                        `}
                    >
                        <div className="text-3xl filter grayscale-[0.5]">{ing.icon}</div>
                        <div className="font-heading font-bold">{ing.id}</div>
                        <div className="text-[10px] uppercase tracking-widest">{ing.label}</div>
                    </button>
                )
            })}
        </div>

        {/* Action Button */}
        <button
            onClick={handleSynthesize}
            disabled={status !== 'IDLE' || selectedIngredients.length === 0}
            className={`
                px-12 py-4 text-xl font-heading font-black uppercase tracking-widest rounded transition-all
                ${status === 'IDLE' && selectedIngredients.length > 0 
                    ? 'bg-neonCyan text-black hover:shadow-neon-cyan hover:scale-105' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
            `}
        >
            {status === 'PROCESSING' ? 'Synthesizing...' : 'Initiate Fusion'}
        </button>

      </div>
    </div>
  );
};

export default LabInterface;
