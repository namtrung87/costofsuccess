
import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { PHASE_TITLES } from '../../constants';

const PhaseTransition: React.FC = () => {
  const { state } = useGame();
  const { playSFX } = useAudio();
  const [isActive, setIsActive] = useState(false);
  const [displayPhase, setDisplayPhase] = useState('');

  useEffect(() => {
    setIsActive(true);
    playSFX('SWIPE');
    
    // Determine the display name
    const current = state.currentPhase;
    const match = current.match(/(PHASE_\d+|PRACTICE_MODE)/);
    let title = current.replace('PHASE_', '');
    
    if (match) {
        let key = match[0];
        if (key === 'PRACTICE_MODE') key = 'PRACTICE';
        if (PHASE_TITLES[key]) {
            title = PHASE_TITLES[key][state.language];
        }
    }

    setDisplayPhase(title);
    
    const timer = setTimeout(() => {
        setIsActive(false);
    }, 2500); 

    return () => clearTimeout(timer);
  }, [state.currentPhase, state.language]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-[999] bg-obsidian flex items-center justify-center overflow-hidden p-4">
        {/* Background Grid Animation */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] animate-[pulse_1s_infinite]" />

        {/* Glitch Bar */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-neonCyan/50 animate-[ping_0.2s_infinite]" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl">
            <div className="text-neonCyan font-mono text-sm md:text-base tracking-[0.5em] mb-8 animate-pulse">
                SYSTEM LOADING
            </div>
            
            {/* Main Title Container */}
            <div className="relative text-center mx-auto px-4 w-full">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-tight glitch-text break-words">
                    {displayPhase}
                </h1>
            </div>

            {/* Loaders */}
            <div className="mt-12 flex justify-center gap-4">
                <div className="w-3 h-3 bg-neonGreen animate-bounce delay-0 rounded-full shadow-[0_0_10px_#39FF14]" />
                <div className="w-3 h-3 bg-neonGreen animate-bounce delay-100 rounded-full shadow-[0_0_10px_#39FF14]" />
                <div className="w-3 h-3 bg-neonGreen animate-bounce delay-200 rounded-full shadow-[0_0_10px_#39FF14]" />
            </div>
            
            <div className="mt-4 font-mono text-xs text-gray-500 uppercase tracking-widest animate-pulse">
                INITIALIZING ASSETS...
            </div>
        </div>

        <style>{`
            .glitch-text {
                position: relative;
                text-shadow: 3px 0 #FF0055, -3px 0 #00F0FF;
                animation: glitch-anim 2s infinite linear alternate-reverse;
            }
            @keyframes glitch-anim {
                0% { text-shadow: 3px 0 #FF0055, -3px 0 #00F0FF; transform: translate(0); opacity: 1; }
                2% { text-shadow: 3px 0 #FF0055, -3px 0 #00F0FF; transform: translate(0); opacity: 1; }
                4% { text-shadow: 3px 0 #FF0055, -3px 0 #00F0FF; transform: translate(0); opacity: 1; }
                6% { text-shadow: -3px 0 #FF0055, 3px 0 #00F0FF; transform: translate(-2px, 2px); opacity: 0.8; }
                8% { text-shadow: 2px 0 #FF0055, -2px 0 #00F0FF; transform: translate(2px, -2px); opacity: 1; }
                100% { text-shadow: 2px 0 #FF0055, -2px 0 #00F0FF; transform: translate(0); opacity: 1; }
            }
        `}</style>
    </div>
  );
};

export default PhaseTransition;
