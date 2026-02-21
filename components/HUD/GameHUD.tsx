import React from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { GamePhase } from '../../types';
import { UI_STRINGS } from '../../constants';
import SanityMeter from './SanityMeter';
import BudgetTicker from './BudgetTicker';

const GameHUD: React.FC = () => {
  const { state, dispatch } = useGame();
  const { toggleMute } = useAudio();
  const ui = UI_STRINGS[state.language];

  if (state.currentPhase === GamePhase.START_SCREEN) return null;

  const toggleLanguage = () => {
      const newLang = state.language === 'EN' ? 'VI' : 'EN';
      dispatch({ type: 'SET_LANGUAGE', payload: newLang });
  };

  const handleMuteToggle = () => {
      toggleMute();
      dispatch({ type: 'TOGGLE_MUSIC' });
  };

  return (
    <>
        {/* TOP STATUS BAR (Pointer events pass through, but children catch them) */}
        <div className="absolute top-0 left-0 w-full p-4 z-[100] pointer-events-none flex justify-between items-start">
            
            {/* Left: Health */}
            <div className="pointer-events-auto">
                <SanityMeter />
            </div>

            {/* Center: Control Dock (Moved to Top) */}
            <div className="flex gap-4 p-2 bg-black/80 backdrop-blur-xl border border-neonCyan/50 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] pointer-events-auto hover:scale-105 transition-transform duration-300 mx-4">
                {/* Mute Toggle */}
                <button 
                    onClick={handleMuteToggle}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${state.musicEnabled ? 'border-neonGreen text-neonGreen bg-neonGreen/10 shadow-[0_0_10px_#39FF14]' : 'border-gray-600 text-gray-600'}`}
                    title="Toggle Sound"
                >
                    <span className="text-xl">{state.musicEnabled ? '🔊' : '🔇'}</span>
                </button>

                {/* Language Toggle */}
                <button 
                    onClick={toggleLanguage}
                    className="w-10 h-10 rounded-full border-2 border-white text-white flex items-center justify-center font-black text-xs hover:bg-white hover:text-black transition-all"
                    title="Switch Language"
                >
                    {state.language}
                </button>

                {/* Handbook */}
                <button 
                    onClick={() => dispatch({ type: 'TOGGLE_HANDBOOK' })}
                    className="w-10 h-10 rounded-full border-2 border-neonCyan text-neonCyan bg-neonCyan/10 flex items-center justify-center hover:bg-neonCyan hover:text-black hover:shadow-[0_0_15px_#00F0FF] transition-all"
                    title="Open Handbook"
                >
                    <span className="text-xl font-bold">?</span>
                </button>

                {/* Menu */}
                <button 
                    onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
                    className="w-10 h-10 rounded-full border-2 border-neonPink text-neonPink bg-neonPink/10 flex items-center justify-center hover:bg-neonPink hover:text-black hover:shadow-[0_0_15px_#FF0055] transition-all"
                    title="Pause Menu"
                >
                    <span className="text-sm font-black">||</span>
                </button>
            </div>

            {/* Right: Money */}
            <div className="pointer-events-auto">
                <BudgetTicker />
            </div>
        </div>

        {/* BOTTOM CENTER: PROGRESS BAR (Moved from Top) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[90] pointer-events-none hidden md:flex flex-col items-center w-full max-w-md px-4">
            <div className="text-[10px] text-neonCyan font-mono mb-1 uppercase tracking-widest bg-black/80 px-4 py-1 rounded-full border border-neonCyan/20 backdrop-blur-sm">
                {ui.PHASE}: {state.currentPhase.replace('PHASE_', '').split('_')[0]}
            </div>
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
                <div className="h-full bg-neonGreen shadow-[0_0_10px_#39FF14] transition-all duration-500"
                    style={{ width: `${(state.unlockedPhases.length / 11) * 100}%` }} 
                />
            </div>
        </div>
    </>
  );
};

export default GameHUD;