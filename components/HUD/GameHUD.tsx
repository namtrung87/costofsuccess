import React from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { GamePhase } from '../../types';
import { UI_STRINGS, DISCORD_LINK } from '../../constants';
import SanityMeter from './SanityMeter';
import BudgetTicker from './BudgetTicker';
import { XPToast } from '../UI/XPToast';
import { ComboCounter } from '../UI/ComboCounter';
import MarketTicker from './MarketTicker';
import OARTracker from './OARTracker';

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
        <div className="fixed top-0 left-0 right-0 p-4 md:p-6 z-[100] pointer-events-none h-screen flex flex-col justify-between">
            <XPToast />
            <ComboCounter />
            <MarketTicker />

            <div className="w-full flex justify-between items-start pointer-events-none">
                {/* Left: Health - Positioned for top-left glance */}
                <div className="pointer-events-auto scale-90 md:scale-100 origin-top-left">
                    <SanityMeter />
                </div>

                <div className="pointer-events-auto hidden md:block">
                    <OARTracker />
                </div>

                {/* Right: Money */}
                <div className="pointer-events-auto scale-90 md:scale-100 origin-top-right">
                    <BudgetTicker />
                </div>
            </div>

            {/* MOBILE NAVIGATION DOCK (Moved to Top) */}
            <div className="md:hidden flex justify-center w-full mt-2 pointer-events-none">
                <div className="flex flex-wrap justify-center gap-2 p-2 max-w-[300px] bg-black/90 backdrop-blur-2xl border-2 border-neonCyan/30 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-auto">
                    <button
                        onClick={handleMuteToggle}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all border-2 ${state.musicEnabled ? 'border-neonGreen text-neonGreen bg-neonGreen/10 shadow-[0_0_10px_#39FF14]' : 'border-gray-600 text-gray-600'}`}
                    >
                        <span className="text-xl">{state.musicEnabled ? '🔊' : '🔇'}</span>
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_HANDBOOK' })}
                        className="w-12 h-12 rounded-xl border-2 border-neonCyan text-neonCyan bg-neonCyan/10 flex items-center justify-center"
                    >
                        <span className="text-xl font-bold font-mono">?</span>
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
                        className="w-12 h-12 rounded-xl border-2 border-neonPink text-neonPink bg-neonPink/10 flex items-center justify-center"
                    >
                        <span className="text-xl">≡</span>
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_SHARE_MODAL' })}
                        className="w-12 h-12 rounded-xl border-2 border-neonGreen text-neonGreen bg-neonGreen/10 flex items-center justify-center shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                    >
                        <span className="text-xl">📊</span>
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_DASHBOARD' })}
                        className="w-12 h-12 rounded-xl border-2 border-neonCyan text-neonCyan bg-neonCyan/10 flex items-center justify-center"
                    >
                        <span className="text-xl">📈</span>
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_BOBA_SHOP' })}
                        className="w-12 h-12 rounded-xl border-2 border-neonPink text-neonPink bg-neonPink/10 flex items-center justify-center"
                    >
                        <span className="text-xl">🧋</span>
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className="w-12 h-12 rounded-xl border-2 border-white text-white flex items-center justify-center font-black text-xs"
                    >
                        {state.language}
                    </button>
                </div>
            </div>

            {/* BOTTOM CENTER: PROGRESS BAR */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[90] pointer-events-none hidden md:flex flex-col items-center w-full max-w-md px-4">
                <div className="text-[10px] text-neonCyan font-mono mb-1 uppercase tracking-widest bg-black/80 px-4 py-1 rounded-full border border-neonCyan/20 backdrop-blur-sm">
                    {ui.PHASE}: {state.currentPhase.replace('PHASE_', '').split('_')[0]}
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
                    <div className="h-full bg-neonGreen shadow-[0_0_10px_#39FF14] transition-all duration-500"
                        style={{ width: `${(state.unlockedPhases.length / 35) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(GameHUD);