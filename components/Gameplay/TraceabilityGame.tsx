import React, { useState } from 'react';
import { TraceabilityItem, TraceabilityType } from '../../data/phase4';
import { useGame } from '../../context/GameContext';
import { UI_STRINGS } from '../../constants';

interface TraceabilityGameProps {
  items: TraceabilityItem[];
  onComplete: (score: number) => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const TraceabilityGame: React.FC<TraceabilityGameProps> = ({ items, onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const ui = UI_STRINGS[state.language];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [lastChoice, setLastChoice] = useState<TraceabilityType | null>(null);

  const currentItem = items[currentIndex];

  const handleSelect = (type: TraceabilityType) => {
    if (animating) return;
    setAnimating(true);
    setLastChoice(type);

    const isCorrect = type === currentItem.type;

    if (isCorrect) {
      setFeedback(`CORRECT: ${currentItem.reason}`);
      setScore(s => s + 1);
      onCorrect();
    } else {
      setFeedback(`ERROR: ${currentItem.reason}`);
      onIncorrect();
    }

    setTimeout(() => {
      setFeedback(null);
      setAnimating(false);
      setLastChoice(null);
      
      if (currentIndex < items.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete(score + (isCorrect ? 1 : 0));
      }
    }, 2000);
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
      
      {/* Header */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-start">
        <div>
            <h2 className="text-neonCyan font-heading text-2xl uppercase tracking-[0.2em]">
            {ui.TRACE_TITLE}
            </h2>
            <div className="text-gray-500 font-mono text-xs mt-1">
            TARGET: {currentIndex + 1} / {items.length}
            </div>
        </div>
        <div className="text-right">
            <div className="text-xs text-gray-500 font-mono">{ui.SCORE}</div>
            <div className="text-xl font-bold text-white">{score}</div>
        </div>
      </div>

      {/* Main Item Display */}
      <div className={`
          relative w-full max-w-md bg-obsidian border-2 border-gray-700 p-8 rounded-xl mb-12 flex flex-col items-center text-center transition-all duration-300
          ${animating && lastChoice === 'DIRECT' ? '-translate-x-20 opacity-0 rotate-[-10deg]' : ''}
          ${animating && lastChoice === 'INDIRECT' ? 'translate-x-20 opacity-0 rotate-[10deg]' : ''}
          ${!animating ? 'opacity-100 translate-x-0' : ''}
      `}>
          {/* Element Tag */}
          <div className={`
              absolute -top-3 px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full border bg-black
              ${currentItem.element === 'MATERIAL' ? 'text-cyan-400 border-cyan-400' : ''}
              ${currentItem.element === 'LABOR' ? 'text-purple-400 border-purple-400' : ''}
              ${currentItem.element === 'EXPENSE' ? 'text-orange-400 border-orange-400' : ''}
          `}>
              {currentItem.element}
          </div>

          <h3 className="text-2xl font-heading text-white mt-4 mb-2">{currentItem.name}</h3>
          <div className="w-16 h-1 bg-gray-700 rounded-full mb-4" />
          <p className="text-gray-400 text-sm font-mono">
              {ui.TRACE_Q}
          </p>
      </div>

      {/* Feedback Overlay (Appears in middle) */}
      {feedback && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
              <div className={`
                  p-6 rounded-lg border-2 text-center shadow-2xl animate-[popup_0.3s_ease-out_forwards]
                  ${feedback.startsWith('CORRECT') ? 'bg-black/90 border-neonGreen text-neonGreen' : 'bg-black/90 border-neonPink text-neonPink'}
              `}>
                  <div className="text-2xl font-black uppercase mb-2">
                      {feedback.startsWith('CORRECT') ? '>> VERIFIED' : '>> REJECTED'}
                  </div>
                  <div className="text-white font-mono text-sm">{feedback}</div>
              </div>
          </div>
      )}

      {/* Controls */}
      <div className="flex gap-8 w-full max-w-3xl justify-center px-4">
          
          {/* DIRECT BUTTON */}
          <button
             onClick={() => handleSelect('DIRECT')}
             disabled={animating}
             className="group flex-1 h-48 border-2 border-neonGreen bg-neonGreen/5 rounded-xl flex flex-col items-center justify-center hover:bg-neonGreen/20 transition-all hover:-translate-y-1 relative overflow-hidden"
          >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏷️</div>
              <div className="font-heading font-bold text-neonGreen text-xl uppercase tracking-widest">{ui.DIRECT}</div>
              <div className="text-xs text-gray-400 mt-2 font-mono">{ui.TRACE_DIRECT_DESC}</div>
          </button>

          {/* INDIRECT BUTTON */}
          <button
             onClick={() => handleSelect('INDIRECT')}
             disabled={animating}
             className="group flex-1 h-48 border-2 border-neonCyan bg-neonCyan/5 rounded-xl flex flex-col items-center justify-center hover:bg-neonCyan/20 transition-all hover:-translate-y-1 relative overflow-hidden"
          >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">☁️</div>
              <div className="font-heading font-bold text-neonCyan text-xl uppercase tracking-widest">{ui.INDIRECT}</div>
              <div className="text-xs text-gray-400 mt-2 font-mono">{ui.TRACE_INDIRECT_DESC}</div>
          </button>

      </div>
      
      <style>{`
        @keyframes popup {
            0% { transform: scale(0.5); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default TraceabilityGame;
