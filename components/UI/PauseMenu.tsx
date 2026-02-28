
import React from 'react';
import { useGame } from '../../context/GameContext';
import { GamePhase } from '../../types';
import { UI_STRINGS, PHASE_TITLES, DISCORD_LINK } from '../../constants';
import GlassPanel from './GlassPanel';
import CyberButton from './CyberButton';

const PauseMenu: React.FC = () => {
    const { state, dispatch } = useGame();
    const ui = UI_STRINGS[state.language];

    if (state.activeModal !== 'PAUSE') return null;

    const handleClose = () => dispatch({ type: 'TOGGLE_MENU' });

    const handleRestart = () => {
        dispatch({ type: 'RESTART_PHASE' });
        window.location.reload();
    };

    const handlePractice = () => {
        dispatch({ type: 'ENTER_PRACTICE' });
    };

    const handleFeedback = () => {
        dispatch({ type: 'TOGGLE_FEEDBACK' });
    };

    const handlePhaseSelect = (phase: GamePhase) => {
        dispatch({ type: 'SET_PHASE', payload: phase });
        dispatch({ type: 'TOGGLE_MENU' });
    };

    const handleSpeedChange = (speed: number) => {
        dispatch({ type: 'SET_TEXT_SPEED', payload: speed });
    };

    const getPhaseLabel = (phase: string) => {
        const rawPhaseKey = phase.replace('PHASE_', 'PHASE_'); // No-op but clarity
        // Check if we have a cool Gen Z title for this phase
        // Extract the key part e.g. "PHASE_1" from "PHASE_1_LOBBY"
        const match = phase.match(/(PHASE_\d+|PRACTICE_MODE)/);
        if (match) {
            let key = match[0];
            if (key === 'PRACTICE_MODE') key = 'PRACTICE';
            if (PHASE_TITLES[key]) {
                return PHASE_TITLES[key][state.language];
            }
        }
        return phase.replace('PHASE_', '').replace(/_/g, ' ');
    };

    return (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4">
            <GlassPanel intensity="HIGH" className="w-full max-w-md flex flex-col gap-6">

                <div className="text-center border-b border-gray-700 pb-4">
                    <h2 className="text-2xl font-heading text-white tracking-widest">{ui.PAUSE}</h2>
                </div>

                <div className="flex flex-col gap-3">
                    <CyberButton label={ui.RESUME} variant="PRIMARY" onClick={handleClose} />

                    {/* Speed Control Row */}
                    <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-gray-700">
                        <span className="text-xs text-gray-400 font-mono pl-2">TEXT SPEED:</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleSpeedChange(60)}
                                className={`px-3 py-1 text-xs border rounded ${state.textSpeed === 60 ? 'bg-white text-black' : 'border-gray-600 text-gray-500'}`}
                            >
                                SLOW
                            </button>
                            <button
                                onClick={() => handleSpeedChange(30)}
                                className={`px-3 py-1 text-xs border rounded ${state.textSpeed === 30 ? 'bg-white text-black' : 'border-gray-600 text-gray-500'}`}
                            >
                                NORM
                            </button>
                            <button
                                onClick={() => handleSpeedChange(0)}
                                className={`px-3 py-1 text-xs border rounded ${state.textSpeed === 0 ? 'bg-neonCyan text-black border-neonCyan' : 'border-gray-600 text-gray-500'}`}
                            >
                                INSTANT
                            </button>
                        </div>
                    </div>

                    <CyberButton label={ui.PRACTICE_MODE} variant="SECONDARY" onClick={handlePractice} />
                    <CyberButton label={state.language === 'EN' ? 'SHARE PERFORMANCE' : 'CHIA SẺ THÀNH TÍCH'} variant="SECONDARY" onClick={() => dispatch({ type: 'TOGGLE_SHARE_MODAL' })} />
                    <CyberButton label={ui.FEEDBACK} variant="SECONDARY" onClick={handleFeedback} />
                    <CyberButton label={ui.RESTART} variant="DANGER" onClick={handleRestart} />
                </div>

                <div className="mt-4">
                    <h3 className="text-neonCyan font-mono text-xs uppercase mb-3">{ui.LEVEL_SELECT}</h3>
                    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                        {state.unlockedPhases.map((phase) => (
                            <button
                                key={phase}
                                onClick={() => handlePhaseSelect(phase)}
                                disabled={state.currentPhase === phase}
                                className={`
                            px-4 py-3 text-left border rounded transition-all font-mono text-sm
                            ${state.currentPhase === phase
                                        ? 'bg-neonGreen/20 border-neonGreen text-white cursor-default'
                                        : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/10 hover:border-white hover:text-white'}
                        `}
                            >
                                {getPhaseLabel(phase)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-4 flex flex-col gap-3">
                    <CyberButton label={ui.HANDBOOK_TITLE} variant="SECONDARY" onClick={() => dispatch({ type: 'TOGGLE_HANDBOOK' })} />

                    <a
                        href={DISCORD_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
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
