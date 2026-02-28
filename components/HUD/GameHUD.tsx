import React from 'react';
import { motion } from 'framer-motion';
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

    // Only show OAR Tracker from Phase 4 onwards
    const phaseMatch = state.currentPhase.match(/PHASE_(\d+)/);
    const phaseNum = phaseMatch ? parseInt(phaseMatch[1], 10) : 0;
    const showOAR = phaseNum >= 4;

    return (
        <div className="fixed inset-0 p-4 md:p-6 z-[100] pointer-events-none h-screen flex flex-col justify-between overflow-hidden">
            <XPToast />
            <ComboCounter />
            <MarketTicker />

            <div className="w-full flex justify-between items-start pointer-events-none">
                {/* Left: Health - Positioned for top-left glance */}
                <div className="pointer-events-auto scale-90 md:scale-100 origin-top-left">
                    <SanityMeter />
                </div>

                {showOAR && (
                    <div className="pointer-events-auto hidden md:block mx-4">
                        <OARTracker />
                    </div>
                )}

                {/* Right: Money */}
                <div className="pointer-events-auto scale-90 md:scale-100 origin-top-right">
                    <BudgetTicker />
                </div>
            </div>

            {/* DESKTOP DRAGGABLE HUD DOCK (Restore) */}
            <motion.div
                drag
                dragMomentum={false}
                dragConstraints={{ top: 0, left: -400, right: 400, bottom: 500 }}
                className="hidden md:flex gap-4 absolute top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto cursor-grab active:cursor-grabbing"
                initial={{ y: -20, opacity: 0, x: "-50%" }}
                animate={{ y: 0, opacity: 1, x: "-50%" }}
            >
                {/* Drag Handle Accent */}
                <div className="flex flex-col gap-1 justify-center px-2 border-r border-white/10 opacity-40">
                    <div className="w-1 h-1 bg-neonCyan rounded-full" />
                    <div className="w-1 h-1 bg-neonCyan rounded-full" />
                    <div className="w-1 h-1 bg-neonCyan rounded-full" />
                </div>

                {/* Settings / System */}
                <div className="flex gap-3 p-2 bg-black/80 backdrop-blur-xl border border-neonCyan/50 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:border-neonCyan transition-colors duration-300">
                    <button
                        onClick={handleMuteToggle}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${state.musicEnabled ? 'border-neonGreen text-neonGreen bg-neonGreen/10 shadow-[0_0_10px_#39FF14]' : 'border-gray-600 text-gray-600'}`}
                        title="Toggle Sound"
                    >
                        <span className="text-xl">{state.musicEnabled ? '🔊' : '🔇'}</span>
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className="w-10 h-10 rounded-full border-2 border-white text-white flex items-center justify-center font-black text-xs hover:bg-white hover:text-black transition-all"
                        title="Switch Language"
                    >
                        {state.language}
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
                        className="w-10 h-10 rounded-full border-2 border-neonPink text-neonPink bg-neonPink/10 flex items-center justify-center hover:bg-neonPink hover:text-black hover:shadow-[0_0_15px_#FF0055] transition-all"
                        title="Pause Menu"
                    >
                        <span className="text-sm font-black">||</span>
                    </button>
                </div>

                {/* Social / Help */}
                <div className="flex gap-3 p-2 bg-black/80 backdrop-blur-xl border border-neonCyan/50 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:border-neonCyan transition-colors duration-300">
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_HANDBOOK' })}
                        className="w-10 h-10 rounded-full border-2 border-neonCyan text-neonCyan bg-neonCyan/10 flex items-center justify-center hover:bg-neonCyan hover:text-black hover:shadow-[0_0_15px_#00F0FF] transition-all"
                        title="Open Handbook"
                    >
                        <span className="text-xl font-bold">?</span>
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_DYK' })}
                        className={`w-10 h-10 rounded-full border-2 border-neonGreen text-neonGreen bg-neonGreen/10 flex items-center justify-center hover:bg-neonGreen hover:text-black hover:shadow-[0_0_15px_#39FF14] transition-all ${state.activeModal === 'DYK' ? 'bg-neonGreen text-black' : ''}`}
                        title="Did You Know?"
                    >
                        <span className="text-xl">💡</span>
                    </button>

                    <button
                        onClick={() => window.open(DISCORD_LINK, '_blank')}
                        className="w-10 h-10 rounded-full border-2 border-[#5865F2] text-[#5865F2] bg-[#5865F2]/10 flex items-center justify-center hover:bg-[#5865F2] hover:text-white hover:shadow-[0_0_15px_rgba(88,101,242,0.8)] transition-all"
                        title={state.language === 'EN' ? "CFO's Hotline (Discord)" : "Gọi Vốn Cứu Trợ (Discord)"}
                    >
                        <span className="text-xl">🆘</span>
                    </button>
                </div>

                {/* Game Actions */}
                <div className="flex gap-3 p-2 bg-black/80 backdrop-blur-xl border border-neonCyan/50 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:border-neonCyan transition-colors duration-300">
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_WARDROBE' })}
                        className="w-10 h-10 rounded-full border-2 border-neonCyan text-neonCyan bg-neonCyan/10 flex items-center justify-center hover:bg-neonCyan hover:text-black hover:shadow-[0_0_15px_#00F0FF] transition-all"
                        title="Wardrobe"
                    >
                        <span className="text-xl">👕</span>
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_SHARE_MODAL' })}
                        className="w-10 h-10 rounded-full border-2 border-neonGreen text-neonGreen bg-neonGreen/10 flex items-center justify-center hover:bg-neonGreen hover:text-black hover:shadow-[0_0_15px_#39FF14] transition-all"
                        title="Share Score Card"
                    >
                        <span className="text-xl">📊</span>
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_DASHBOARD' })}
                        className="w-10 h-10 rounded-full border-2 border-neonCyan text-neonCyan bg-neonCyan/10 flex items-center justify-center hover:bg-neonCyan hover:text-black hover:shadow-[0_0_15px_#00F0FF] transition-all"
                        title="Strategic Dashboard"
                    >
                        <span className="text-xl">📈</span>
                    </button>

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_BOBA_SHOP' })}
                        className="w-10 h-10 rounded-full border-2 border-neonPink text-neonPink bg-neonPink/10 flex items-center justify-center hover:bg-neonPink hover:text-black hover:shadow-[0_0_15px_#FF0055] transition-all"
                        title="Boba Shop"
                    >
                        <span className="text-xl">🧋</span>
                    </button>
                </div>
            </motion.div>

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