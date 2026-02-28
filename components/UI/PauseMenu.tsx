
import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { GamePhase } from '../../types';
import { UI_STRINGS, PHASE_TITLES, DISCORD_LINK } from '../../constants';
import GlassPanel from './GlassPanel';
import CyberButton from './CyberButton';

const SAVE_SLOT_KEY = 'GAME_SAVE_SLOTS_V1';

interface SaveSlot {
    id: number;
    label: string;
    timestamp: string;
    phase: string;
    budget: number;
    sanity: number;
}

const PauseMenu: React.FC = () => {
    const { state, dispatch } = useGame();
    const { setVolume, getVolume } = useAudio();
    const ui = UI_STRINGS[state.language];
    const [volume, setLocalVolume] = useState(() => getVolume());
    const [saveSlots, setSaveSlots] = useState<(SaveSlot | null)[]>([null, null, null]);
    const [saveMsg, setSaveMsg] = useState<string | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(SAVE_SLOT_KEY);
            if (raw) setSaveSlots(JSON.parse(raw));
        } catch { }
    }, []);

    if (state.activeModal !== 'PAUSE') return null;

    const handleClose = () => dispatch({ type: 'TOGGLE_MENU' });

    const handleRestart = () => {
        dispatch({ type: 'RESTART_PHASE' });
        window.location.reload();
    };

    const handlePractice = () => dispatch({ type: 'ENTER_PRACTICE' });
    const handleFeedback = () => dispatch({ type: 'TOGGLE_FEEDBACK' });

    const handlePhaseSelect = (phase: GamePhase) => {
        dispatch({ type: 'SET_PHASE', payload: phase });
        dispatch({ type: 'TOGGLE_MENU' });
    };

    const handleSpeedChange = (speed: number) => dispatch({ type: 'SET_TEXT_SPEED', payload: speed });

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setLocalVolume(val);
        setVolume(val);
    };

    const handleSave = (slotIdx: number) => {
        const newSlots = [...saveSlots];
        const phaseMatch = state.currentPhase.match(/(PHASE_\d+|PRACTICE_MODE)/);
        const phaseKey = phaseMatch ? phaseMatch[0] : state.currentPhase;
        const phaseLabel = (PHASE_TITLES[phaseKey]?.[state.language]) || state.currentPhase.replace(/_/g, ' ');
        newSlots[slotIdx] = {
            id: slotIdx,
            label: phaseLabel.slice(0, 28),
            timestamp: new Date().toLocaleString(),
            phase: state.currentPhase,
            budget: state.budget,
            sanity: state.sanity,
        };
        setSaveSlots(newSlots);
        localStorage.setItem(SAVE_SLOT_KEY, JSON.stringify(newSlots));
        const progress = {
            currentPhase: state.currentPhase, unlockedPhases: state.unlockedPhases,
            budget: state.budget, sanity: state.sanity,
            budgetHistory: state.budgetHistory, sanityHistory: state.sanityHistory,
            unlockedAchievements: state.unlockedAchievements,
            streak: state.streak, maxStreak: state.maxStreak,
            equippedAvatar: state.equippedAvatar, unlockedCosmetics: state.unlockedCosmetics,
            activeTheme: state.activeTheme, flags: state.flags,
        };
        localStorage.setItem(`GAME_SAVE_SLOT_${slotIdx}`, JSON.stringify(progress));
        setSaveMsg(`SLOT ${slotIdx + 1} SAVED`);
        setTimeout(() => setSaveMsg(null), 2000);
    };

    const handleLoad = (slotIdx: number) => {
        try {
            const raw = localStorage.getItem(`GAME_SAVE_SLOT_${slotIdx}`);
            if (!raw) return;
            localStorage.setItem('GAME_PROGRESS_V1', raw);
            window.location.reload();
        } catch { }
    };

    const getPhaseLabel = (phase: string) => {
        const match = phase.match(/(PHASE_\d+|PRACTICE_MODE)/);
        if (match) {
            let key = match[0];
            if (key === 'PRACTICE_MODE') key = 'PRACTICE';
            if (PHASE_TITLES[key]) return PHASE_TITLES[key][state.language];
        }
        return phase.replace('PHASE_', '').replace(/_/g, ' ');
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Pause Menu"
            className="absolute inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
        >
            <GlassPanel intensity="HIGH" className="w-full max-w-md flex flex-col gap-5 overflow-y-auto max-h-[90vh]">

                <div className="text-center border-b border-gray-700 pb-4">
                    <h2 className="text-2xl font-heading text-white tracking-widest">{ui.PAUSE}</h2>
                </div>

                {/* Primary Controls */}
                <div className="flex flex-col gap-3">
                    <CyberButton label={ui.RESUME} variant="PRIMARY" onClick={handleClose} />

                    {/* Text Speed */}
                    <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-gray-700">
                        <span className="text-xs text-gray-400 font-mono pl-2">TEXT SPEED:</span>
                        <div className="flex gap-2">
                            <button onClick={() => handleSpeedChange(60)} className={`px-3 py-1 text-xs border rounded ${state.textSpeed === 60 ? 'bg-white text-black' : 'border-gray-600 text-gray-500'}`}>SLOW</button>
                            <button onClick={() => handleSpeedChange(30)} className={`px-3 py-1 text-xs border rounded ${state.textSpeed === 30 ? 'bg-white text-black' : 'border-gray-600 text-gray-500'}`}>NORM</button>
                            <button onClick={() => handleSpeedChange(0)} className={`px-3 py-1 text-xs border rounded ${state.textSpeed === 0 ? 'bg-neonCyan text-black border-neonCyan' : 'border-gray-600 text-gray-500'}`}>INSTANT</button>
                        </div>
                    </div>

                    {/* Volume Slider */}
                    <div className="flex items-center gap-3 bg-black/40 p-3 rounded border border-gray-700">
                        <label htmlFor="volume-slider" className="text-xs text-gray-400 font-mono w-16 shrink-0">🔊 VOL:</label>
                        <input
                            id="volume-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={volume}
                            onChange={handleVolumeChange}
                            aria-label="Master volume"
                            className="w-full h-1 accent-neonCyan cursor-pointer"
                        />
                        <span className="text-xs text-neonCyan font-mono w-8 text-right">{Math.round(volume * 100)}%</span>
                    </div>

                    <CyberButton label={ui.PRACTICE_MODE} variant="SECONDARY" onClick={handlePractice} />
                    <CyberButton label={state.language === 'EN' ? 'SHARE PERFORMANCE' : 'CHIA SẺ THÀNH TÍCH'} variant="SECONDARY" onClick={() => dispatch({ type: 'TOGGLE_SHARE_MODAL' })} />
                    <CyberButton label={ui.FEEDBACK} variant="SECONDARY" onClick={handleFeedback} />
                    <CyberButton label={ui.RESTART} variant="DANGER" onClick={handleRestart} />
                </div>

                {/* Save Slots */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-neonPink font-mono text-xs uppercase" id="save-slots-heading">SAVE SLOTS</h3>
                        {saveMsg && <span className="text-neonGreen text-[10px] font-mono animate-pulse" aria-live="polite">{saveMsg}</span>}
                    </div>
                    <div className="flex flex-col gap-2" aria-labelledby="save-slots-heading">
                        {saveSlots.map((slot, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-black/30 border border-gray-700 rounded p-2">
                                <div className="flex-1 min-w-0">
                                    {slot ? (
                                        <>
                                            <div className="text-xs text-white font-mono truncate">{slot.label}</div>
                                            <div className="text-[9px] text-gray-500">{slot.timestamp} · 💰{slot.budget} · 🧠{slot.sanity}%</div>
                                        </>
                                    ) : (
                                        <div className="text-xs text-gray-600 font-mono">SLOT {idx + 1} — EMPTY</div>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleSave(idx)}
                                    aria-label={`Save to slot ${idx + 1}`}
                                    className="px-2 py-1 text-[10px] border border-neonCyan/50 text-neonCyan rounded hover:bg-neonCyan/10 font-mono transition-colors"
                                >SAVE</button>
                                {slot && (
                                    <button
                                        onClick={() => handleLoad(idx)}
                                        aria-label={`Load slot ${idx + 1}`}
                                        className="px-2 py-1 text-[10px] border border-neonGreen/50 text-neonGreen rounded hover:bg-neonGreen/10 font-mono transition-colors"
                                    >LOAD</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phase Select */}
                <div>
                    <h3 className="text-neonCyan font-mono text-xs uppercase mb-2">{ui.LEVEL_SELECT}</h3>
                    <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
                        {state.unlockedPhases.map((phase) => (
                            <button
                                key={phase}
                                onClick={() => handlePhaseSelect(phase)}
                                disabled={state.currentPhase === phase}
                                aria-current={state.currentPhase === phase ? 'page' : undefined}
                                className={`px-4 py-2 text-left border rounded transition-all font-mono text-sm ${state.currentPhase === phase ? 'bg-neonGreen/20 border-neonGreen text-white cursor-default' : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/10 hover:border-white hover:text-white'}`}
                            >
                                {getPhaseLabel(phase)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-3">
                    <CyberButton label={ui.HANDBOOK_TITLE} variant="SECONDARY" onClick={() => dispatch({ type: 'TOGGLE_HANDBOOK' })} />
                    <a
                        href={DISCORD_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Join Survivor Guild on Discord"
                        className="px-4 py-2 border border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2]/10 transition-colors rounded font-mono text-sm flex items-center justify-center gap-2"
                    >
                        <span className="text-lg">👾</span> {state.language === 'EN' ? 'SURVIVOR GUILD (DISCORD)' : 'HỘI QUÁN SINH TỒN (DISCORD)'}
                    </a>
                </div>
            </GlassPanel>
        </div>
    );
};

export default PauseMenu;
