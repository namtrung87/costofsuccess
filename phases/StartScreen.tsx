
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { GamePhase } from '../types';
import { UI_STRINGS, ASSETS, DISCORD_LINK } from '../constants';
import CyberButton from '../components/UI/CyberButton';
import GlassPanel from '../components/UI/GlassPanel';
import AvatarCreator from '../components/UI/AvatarCreator';

const StartScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { initAudio, toggleMute, playSFX } = useAudio();
    const ui = UI_STRINGS[state.language];

    const [showBriefing, setShowBriefing] = useState(false);
    const [showDifficulty, setShowDifficulty] = useState(false);
    const [showAvatarCreator, setShowAvatarCreator] = useState(false);

    const handleStartClick = async () => {
        await initAudio(); // User Gesture required for AudioContext
        playSFX('CLICK');
        setShowBriefing(true);
    };

    const handleBriefingComplete = () => {
        setShowBriefing(false);
        setShowDifficulty(true);
    };

    const handleDifficultySelect = (difficulty: any) => {
        dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
        setShowDifficulty(false);
        setShowAvatarCreator(true);
    };

    const handleAvatarComplete = () => {
        dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_1_LOBBY });
    };

    const handlePractice = async () => {
        await initAudio();
        playSFX('CLICK');
        dispatch({ type: 'SET_PHASE', payload: GamePhase.PRACTICE_MODE });
    };

    const handleSoundToggle = () => {
        toggleMute();
        dispatch({ type: 'TOGGLE_MUSIC' });
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center relative bg-obsidian overflow-hidden">
            {/* Background Decor */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-[20s] ease-in-out transform hover:scale-105"
                style={{ backgroundImage: `url(${ASSETS.BG_ROOFTOP})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

            {/* Grid Overlay - Moving */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none animate-[scan_10s_linear_infinite]" />

            {/* AVATAR CREATOR OVERLAY */}
            {showAvatarCreator && (
                <AvatarCreator onComplete={handleAvatarComplete} />
            )}

            {/* DIFFICULTY SELECT OVERLAY */}
            {showDifficulty && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in zoom-in duration-300">
                    <GlassPanel intensity="HIGH" border="CYAN" className="max-w-xl w-full flex flex-col gap-6">
                        <div className="border-b border-neonCyan/50 pb-4 text-center">
                            <h2 className="text-2xl font-heading text-neonCyan tracking-widest uppercase">Select Intensity</h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {[
                                { id: 'ZEN', label: 'ZEN MODE', desc: 'Chill vibes. High budget, low stress.', color: 'text-neonCyan', border: 'border-neonCyan/30' },
                                { id: 'NORMAL', label: 'INTERN SCALE', desc: 'Standard market volatility.', color: 'text-white', border: 'border-white/20' },
                                { id: 'HARDCORE', label: 'CFO NIGHTMARE', desc: 'Low cash, high decay. One mistake = Bankruptcy.', color: 'text-neonPink', border: 'border-neonPink/50' }
                            ].map((d) => (
                                <button
                                    key={d.id}
                                    onClick={() => handleDifficultySelect(d.id)}
                                    className={`p-4 border ${d.border} bg-black/40 hover:bg-white/5 transition-all group text-left relative overflow-hidden`}
                                >
                                    <h3 className={`font-heading font-black text-xl ${d.color} group-hover:scale-105 transition-transform`}>{d.label}</h3>
                                    <p className="text-xs text-gray-400 font-mono italic">{d.desc}</p>
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-neonCyan animate-pulse">SELECT_PRIORITY_</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </GlassPanel>
                </div>
            )}

            {/* MISSION BRIEFING OVERLAY - Snackable Version */}
            {showBriefing && !showDifficulty && !showAvatarCreator && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in zoom-in duration-300">
                    <GlassPanel intensity="HIGH" border="CYAN" className="max-w-3xl w-full flex flex-col gap-6 relative overflow-hidden">

                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neonCyan to-transparent animate-scan" />

                        {/* Briefing Header */}
                        <div className="border-b border-neonCyan/50 pb-4 flex justify-between items-center">
                            <h2 className="text-3xl font-heading text-neonCyan tracking-widest uppercase">TL;DR</h2>
                            <div className="text-xs font-mono animate-pulse text-neonGreen border border-neonGreen px-2 py-1 rounded">CONFIDENTIAL</div>
                        </div>

                        {/* Body - Snackable */}
                        <div className="space-y-6">
                            <div className="text-white text-xl font-bold font-heading">
                                WELCOME TO NEON DROP STUDIOS.
                            </div>

                            <p className="text-gray-200 font-mono text-sm leading-relaxed">
                                Your Mission: Survive the internship. Calculate costs. Don't bankrupt us.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-black/50 border border-gray-700 p-4 rounded hover:border-neonPink transition-all hover:bg-white/5 group">
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧠</div>
                                    <h3 className="font-heading font-bold text-white mb-2 text-sm uppercase tracking-wider">{state.language === 'EN' ? 'SANITY' : 'TINH THẦN'}</h3>
                                    <p className="text-xs text-gray-400 font-mono leading-tight">
                                        {state.language === 'EN' ? "Your health. Wrong answers = Brain damage." : "Máu của bạn. Trả lời sai = Mất máu."}
                                    </p>
                                </div>

                                <div className="bg-black/50 border border-gray-700 p-4 rounded hover:border-neonGreen transition-all hover:bg-white/5 group">
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💰</div>
                                    <h3 className="font-heading font-bold text-white mb-2 text-sm uppercase tracking-wider">{state.language === 'EN' ? 'CREDITS' : 'NGÂN LƯỢNG'}</h3>
                                    <p className="text-xs text-gray-400 font-mono leading-tight">
                                        {state.language === 'EN' ? "Get paid. Buy Boba to heal Sanity." : "Kiếm tiền. Mua Trà sữa để hồi máu."}
                                    </p>
                                </div>

                                <div className="bg-black/50 border border-gray-700 p-4 rounded hover:border-neonCyan transition-all hover:bg-white/5 group">
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📘</div>
                                    <h3 className="font-heading font-bold text-white mb-2 text-sm uppercase tracking-wider">{state.language === 'EN' ? 'THE WIKI' : 'WIKI'}</h3>
                                    <p className="text-xs text-gray-400 font-mono leading-tight">
                                        {state.language === 'EN' ? "Use '?' button. Knowledge is power." : "Dùng nút '?'. Kiến thức là sức mạnh."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="pt-6 border-t border-gray-700 flex justify-end">
                            <CyberButton
                                label="LET'S GO 🚀"
                                variant="PRIMARY"
                                onClick={handleBriefingComplete}
                                className="w-full md:w-auto shadow-neon-cyan"
                            />
                        </div>
                    </GlassPanel>
                </div>
            )}

            {/* START SCREEN CONTENT */}
            {!showBriefing && !showAvatarCreator && (
                <>
                    {/* Top HUD */}
                    <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-30">
                        <div className="flex flex-col pointer-events-none">
                            <div className="text-neonCyan font-mono text-xs tracking-[0.3em] opacity-80 mb-1">NEON DROP OS // V2.0</div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-neonGreen rounded-full animate-pulse" />
                                <div className="text-[10px] text-gray-500 font-mono">SYSTEM ONLINE</div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleSoundToggle}
                                className={`flex items-center gap-3 px-4 py-2 border rounded-none transition-all duration-300 group hover:scale-105 active:scale-95
                            ${state.musicEnabled
                                        ? 'border-neonGreen text-neonGreen bg-neonGreen/10 shadow-[0_0_10px_rgba(57,255,20,0.2)]'
                                        : 'border-gray-600 text-gray-500 hover:border-gray-400'
                                    }`}
                            >
                                <span className="text-xs font-bold font-mono tracking-wider">{state.musicEnabled ? 'AUDIO: ON' : 'AUDIO: MUTED'}</span>
                            </button>

                            <button
                                onClick={() => dispatch({ type: 'SET_LANGUAGE', payload: state.language === 'EN' ? 'VI' : 'EN' })}
                                className="flex items-center gap-3 px-4 py-2 border border-neonCyan text-neonCyan hover:bg-neonCyan hover:text-black transition-all duration-300 rounded-none shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:scale-105 active:scale-95"
                            >
                                <span className="text-xs font-bold font-mono tracking-wider">{state.language === 'EN' ? 'ENG' : 'VIE'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Center Layout */}
                    <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">

                        {/* Decor Icon */}
                        <div className="mb-6 relative group cursor-pointer hover:scale-110 transition-transform">
                            <div className="w-20 h-20 border-2 border-neonCyan rotate-45 flex items-center justify-center shadow-[0_0_20px_#00F0FF] group-hover:shadow-[0_0_40px_#00F0FF] transition-shadow">
                                <div className="w-14 h-14 border border-white rotate-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                    <span className="text-3xl animate-pulse">💎</span>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-8 relative">
                            <h1 className="font-heading text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-tighter leading-none drop-shadow-2xl">
                                COST OF
                            </h1>
                            <h1 className="font-heading text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-white to-neonGreen tracking-tighter leading-none mt-[-10px] md:mt-[-20px] drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                                SUCCESS
                            </h1>
                        </div>

                        {/* Subtitle Box */}
                        <div className="relative bg-black/60 backdrop-blur-md border-x-2 border-neonPink px-8 py-4 max-w-xl text-center mb-10 group hover:bg-black/80 transition-colors">
                            <div className="absolute -top-1 left-0 w-2 h-2 bg-neonPink" />
                            <div className="absolute -bottom-1 right-0 w-2 h-2 bg-neonPink" />

                            <p className="font-body text-gray-300 text-sm md:text-lg">
                                {state.language === 'EN'
                                    ? "Master the Margins. Survive the Drip."
                                    : "Làm chủ lợi nhuận. Sống sót trong phong cách."}
                            </p>
                            <div className="mt-2 text-neonPink font-mono text-xs uppercase tracking-[0.2em] animate-pulse">
                                {state.language === 'EN' ? ">> Warning: High Stakes <<" : ">> Cảnh báo: Rủi ro cao <<"}
                            </div>
                        </div>

                        {/* Main Actions */}
                        <div className="flex flex-col gap-4 w-full max-w-sm justify-center items-center">
                            <button
                                onClick={handleStartClick}
                                onMouseEnter={() => playSFX('HOVER')}
                                className="group relative w-full h-16 bg-neonCyan text-black font-heading font-black text-xl tracking-widest uppercase hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.4)] skew-x-[-10deg]"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                                <span className="relative z-10 flex items-center justify-center gap-2 skew-x-[10deg]">
                                    {ui.START_SIM} <span className="text-sm">►</span>
                                </span>
                            </button>

                            <button
                                onClick={handlePractice}
                                onMouseEnter={() => playSFX('HOVER')}
                                className="group relative w-full h-16 border-2 border-white text-white font-heading font-bold text-xl tracking-widest uppercase hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 skew-x-[-10deg]"
                            >
                                <span className="relative z-10 skew-x-[10deg]">
                                    {ui.PRACTICE_MODE}
                                </span>
                            </button>

                            <button
                                onClick={() => window.open(DISCORD_LINK, '_blank')}
                                onMouseEnter={() => playSFX('HOVER')}
                                className="group relative w-full h-12 bg-[#5865F2]/20 border border-[#5865F2] text-[#5865F2] font-heading font-bold text-lg tracking-widest uppercase hover:bg-[#5865F2] hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 mt-4 shadow-[0_0_15px_rgba(88,101,242,0.3)] skew-x-[-10deg]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 skew-x-[10deg]">
                                    {state.language === 'EN' ? '👾 SURVIVOR GUILD (DISCORD)' : '👾 HỘI QUÁN SINH TỒN (DISCORD)'}
                                </span>
                            </button>
                        </div>

                        {/* Developer Mode Teaser (Tech Insight CTA) */}
                        <div
                            className="mt-6 text-xs font-mono text-neonPink/80 tracking-widest cursor-pointer hover:text-neonPink hover:animate-pulse transition-all bg-black/50 border border-transparent hover:border-neonPink/50 px-6 py-3"
                            onClick={() => window.open(DISCORD_LINK, '_blank')}
                        >
                            {state.language === 'EN'
                                ? "[ ROOT ] -> GET AI AUTOMATION CODES IN DISCORD"
                                : "[ SYSTEM ] -> MỞ KHÓA CODE AI TẠI DISCORD GUILD"}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-xs font-mono text-gray-600 tracking-widest">
                            ASSETS LOADED // SYSTEM READY TO LAUNCH
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default StartScreen;
