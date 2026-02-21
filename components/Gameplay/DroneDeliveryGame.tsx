
import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { UI_STRINGS } from '../../constants';

interface DroneDeliveryGameProps {
  onComplete: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const DroneDeliveryGame: React.FC<DroneDeliveryGameProps> = ({ onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const { playSFX } = useAudio();
  const ui = UI_STRINGS[state.language];
  const [position, setPosition] = useState(10);
  const [direction, setDirection] = useState(1);
  const [packages, setPackages] = useState(5);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const speed = 2; // Speed of drone

  useEffect(() => {
    const interval = setInterval(() => {
        setPosition(prev => {
            let next = prev + (direction * speed);
            if (next > 90 || next < 10) {
                setDirection(d => d * -1);
                return prev;
            }
            return next;
        });
    }, 20);
    return () => clearInterval(interval);
  }, [direction]);

  const handleDrop = () => {
      playSFX('DROP');
      // Target Zone is center (40% to 60%)
      const hit = position >= 40 && position <= 60;
      
      if (hit) {
          playSFX('SUCCESS');
          onCorrect();
          setScore(s => s + 1);
          setFeedback("DELIVERED!");
      } else {
          playSFX('ERROR');
          onIncorrect();
          setFeedback("MISSED!");
      }

      setPackages(p => p - 1);
      
      setTimeout(() => {
          setFeedback(null);
          if (packages <= 1) {
              onComplete();
          }
      }, 500);
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
        <div className="absolute top-4 text-neonCyan font-mono text-xl">
            PACKAGES LEFT: {packages} | SCORE: {score}
        </div>

        <div className="relative w-full max-w-3xl h-64 border-b-4 border-gray-600 bg-gray-900/50 overflow-hidden">
            
            {/* Target Zone */}
            <div className="absolute bottom-0 left-[40%] w-[20%] h-4 bg-neonGreen/50 animate-pulse flex justify-center">
                <span className="text-xs text-black font-bold -mt-4 bg-neonGreen px-1">DROP ZONE</span>
            </div>

            {/* Drone */}
            <div 
                className="absolute top-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_white] transition-transform"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            >
                🚁
            </div>

            {/* Feedback */}
            {feedback && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-black text-4xl text-white drop-shadow-lg">
                    {feedback}
                </div>
            )}
        </div>

        <button 
            onClick={handleDrop}
            disabled={packages <= 0}
            className="mt-8 px-12 py-6 bg-red-600 rounded-full border-4 border-red-800 text-white font-black text-2xl active:scale-95 transition-transform hover:scale-105"
            onMouseEnter={() => playSFX('HOVER')}
        >
            DROP
        </button>
    </div>
  );
};

export default DroneDeliveryGame;
