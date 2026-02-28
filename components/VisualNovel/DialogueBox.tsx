import React, { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { HANDBOOK_DATA } from '../../constants';
import { Consequence } from '../../types';

interface DialogueBoxProps {
    speaker: string;
    speakerTitle?: string;
    text: string;
    characterId?: string;
    mood?: string;
    onComplete?: () => void;
    choices?: {
        text: string;
        onClick: () => void;
        consequences?: Consequence[];
        requiredBudget?: number;
    }[];
}

const DialogueBox: React.FC<DialogueBoxProps> = React.memo(({ speaker, speakerTitle, text, choices, onComplete }) => {
    const { state, dispatch } = useGame();
    const { playSFX } = useAudio();
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [renderedContent, setRenderedContent] = useState<ReactNode | string>('');

    const typeIntervalRef = useRef<any>(null);
    const lastClickTimeRef = useRef<number>(0);

    // Typewriter effect
    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);
        let index = 0;

        // Clear any existing interval to be safe
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);

        // If speed is 0, instant render
        if (state.textSpeed === 0) {
            setDisplayedText(text);
            setIsTyping(false);
            return;
        }

        typeIntervalRef.current = setInterval(() => {
            if (index < text.length) {
                const nextChar = text.charAt(index);
                setDisplayedText((prev) => prev + nextChar);

                // Play typing sound sparingly to avoid fatigue
                // Logic: Play sound every 3 chars if normal, every 5 if fast
                const mod = state.textSpeed < 30 ? 5 : 3;
                if (index % mod === 0) {
                    playSFX('TYPE');
                }

                index++;
            } else {
                clearInterval(typeIntervalRef.current);
                setIsTyping(false);
            }
        }, state.textSpeed);

        return () => {
            if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
        };
    }, [text, state.textSpeed]);

    // Effect to play sound when choices appear
    useEffect(() => {
        if (!isTyping && choices && choices.length > 0) {
            playSFX('HOVER'); // Subtle cue that options are ready
        }
    }, [isTyping, choices]);

    // Process Tooltips only after typing is done (or if skipped)
    useEffect(() => {
        if (!isTyping) {
            setRenderedContent(parseTextWithTooltips(text, state.language));
        } else {
            setRenderedContent(displayedText);
        }
    }, [isTyping, displayedText, text, state.language]);

    const handleClick = useCallback(() => {
        const now = Date.now();
        if (now - lastClickTimeRef.current < 300) return; // 300ms cooldown
        lastClickTimeRef.current = now;

        if (isTyping) {
            // Instant Finish
            if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
            setDisplayedText(text);
            setIsTyping(false);
        } else {
            playSFX('CLICK');
            // Advance if no choices are present
            if ((!choices || choices.length === 0) && onComplete) {
                onComplete();
            }
        }
    }, [isTyping, choices, onComplete, text, playSFX]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (state.activeModal !== null) return;
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                handleClick();
            }
            if (['1', '2', '3', '4'].includes(e.key) && choices && !isTyping) {
                const idx = parseInt(e.key, 10) - 1;
                const choice = choices[idx];
                if (choice) {
                    const isLocked = choice.requiredBudget !== undefined && state.budget < choice.requiredBudget;
                    if (!isLocked) {
                        e.preventDefault();
                        playSFX('CLICK');
                        if (choice.consequences) {
                            dispatch({ type: 'RESOLVE_CONSEQUENCES', payload: choice.consequences });
                        }
                        choice.onClick();
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleClick, state.activeModal, choices, isTyping, state.budget, playSFX, dispatch]);

    const cycleSpeed = (e: React.MouseEvent) => {
        e.stopPropagation();
        let nextSpeed = 30;
        if (state.textSpeed === 30) nextSpeed = 15; // Normal -> Fast
        else if (state.textSpeed === 15) nextSpeed = 0; // Fast -> Instant
        else if (state.textSpeed === 0) nextSpeed = 60; // Instant -> Slow
        else nextSpeed = 30; // Slow -> Normal

        dispatch({ type: 'SET_TEXT_SPEED', payload: nextSpeed });
    };

    let speedLabel = '▶▶'; // Normal
    if (state.textSpeed === 0) speedLabel = '🚀 MAX'; // Instant
    if (state.textSpeed === 15) speedLabel = '▶▶▶'; // Fast
    if (state.textSpeed === 60) speedLabel = '▶'; // Slow

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute bottom-4 left-4 right-4 md:left-20 md:right-20 lg:left-40 lg:right-40 z-50"
        >

            {/* Name Tag & Speed Control */}
            <div className="flex justify-between items-end transform -translate-y-2 animate-in slide-in-from-bottom-2 duration-300">
                <div className="bg-obsidian border border-neonCyan px-4 py-1 shadow-neon-cyan clip-path-slant-right group relative overflow-hidden">
                    <div className="absolute inset-0 bg-neonCyan/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="font-heading font-bold text-neonCyan uppercase text-sm relative z-10 animate-pulse">
                        {speaker} {speakerTitle && <span className="text-white/60 text-xs">| {speakerTitle}</span>}
                    </span>
                    {/* Subtle Glitch Decal */}
                    <div className="absolute top-0 right-0 w-2 h-full bg-neonCyan/30 animate-glitch" />
                </div>
                <button
                    onClick={cycleSpeed}
                    className="bg-black/50 border border-gray-600 px-3 py-1 text-[10px] text-gray-400 font-mono hover:text-white hover:border-white transition-all rounded-sm backdrop-blur-sm"
                >
                    {speedLabel}
                </button>
            </div>

            {/* Main Glass Panel */}
            <div
                className="bg-black/85 backdrop-blur-2xl border border-white/10 p-7 md:p-9 rounded-tr-2xl rounded-bl-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative cursor-pointer hover:border-neonCyan/30 transition-all duration-500 group flex flex-col"
                onClick={handleClick}
            >
                {/* Visual Accent: Side Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neonCyan/40 group-hover:bg-neonCyan transition-colors" />
                {/* Text Content */}
                <div className="font-body text-lg leading-relaxed text-white min-h-[4rem]">
                    {renderedContent}
                    {isTyping && <span className="animate-pulse inline-block w-2 h-4 bg-neonCyan ml-1 align-middle" />}
                </div>

                {/* Choices Overlay (Moved Inside) */}
                <AnimatePresence>
                    {!isTyping && choices && choices.length > 0 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                visible: { transition: { staggerChildren: 0.08 } }
                            }}
                            className="mt-6 w-full flex flex-col gap-3 items-center relative z-10"
                        >
                            {choices.map((choice, idx) => {
                                const isLocked = choice.requiredBudget !== undefined && state.budget < choice.requiredBudget;

                                return (
                                    <motion.button
                                        key={idx}
                                        disabled={isLocked}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.9, y: 15, filter: 'blur(4px)' },
                                            visible: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                                        }}
                                        whileHover={!isLocked ? {
                                            scale: 1.05,
                                            boxShadow: "0px 0px 25px rgba(0, 240, 255, 0.6)",
                                            borderColor: "rgba(0, 240, 255, 1)",
                                            backgroundColor: "rgba(0, 240, 255, 0.1)"
                                        } : {}}
                                        whileTap={!isLocked ? { scale: 0.98 } : {}}
                                        onClick={(e) => {
                                            if (isLocked) return;
                                            e.stopPropagation();
                                            playSFX('CLICK');
                                            if (choice.consequences) {
                                                dispatch({ type: 'RESOLVE_CONSEQUENCES', payload: choice.consequences });
                                            }
                                            choice.onClick();
                                        }}
                                        className={`
                                            font-heading font-bold py-4 px-10 rounded-sm transition-all duration-300
                                            w-full md:w-auto md:min-w-[420px] text-center relative overflow-hidden
                                            border-2 group
                                            ${isLocked
                                                ? 'bg-gray-900/90 border-gray-800 text-gray-600 cursor-not-allowed grayscale'
                                                : 'bg-black/95 border-neonCyan/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center justify-center gap-3 relative z-10">
                                            {isLocked && <span className="text-sm opacity-50">🔒</span>}
                                            <span className="tracking-widest uppercase text-sm">{choice.text}</span>
                                            {choice.requiredBudget !== undefined && (
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono bg-black/50 border ${isLocked ? 'text-red-500 border-red-900' : 'text-neonGreen border-neonGreen/30'}`}>
                                                    ${choice.requiredBudget}
                                                </span>
                                            )}
                                        </div>

                                        {/* Interactive Hover Glow Overlay */}
                                        {!isLocked && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                        )}

                                        {/* Locked Scanline Overlay */}
                                        {isLocked && <div className="absolute inset-0 bg-black/60 pointer-events-none" />}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Continue Indicator */}
                {!isTyping && (!choices || choices.length === 0) && (
                    <div className="mt-4 text-right animate-bounce text-neonCyan text-xs uppercase tracking-widest font-heading relative z-10 w-full">
                        {state.language === 'EN' ? 'Click to Continue ▼' : 'Nhấn để tiếp tục ▼'}
                    </div>
                )}
            </div>
        </motion.div>
    );
});

// Helper function to replace keywords with tooltip elements
// Improved regex to avoid partial matches inside HTML tags if complex
const parseTextWithTooltips = (text: string, lang: 'EN' | 'VI'): ReactNode => {
    const definitions = HANDBOOK_DATA[lang];
    let parts: (string | ReactNode)[] = [text];

    // Filter to finding only the most relevant terms first (Longer terms first to avoid partial replacements)
    // e.g. "Direct Material" before "Material"
    const sortedDefs = [...definitions].sort((a, b) => b.title.length - a.title.length);

    // Limit to 3 replacements per text block to avoid visual clutter
    let replacements = 0;

    sortedDefs.forEach(def => {
        if (replacements > 3) return;

        // Clean keyword for regex
        const keyword = def.title.split('(')[0].trim();
        if (keyword.length < 4) return; // Skip very short words to avoid false positives

        const regex = new RegExp(`(${keyword})`, 'i'); // Case insensitive, first match only to avoid spam

        let foundInThisPass = false;
        const newParts: (string | ReactNode)[] = [];

        parts.forEach(part => {
            if (typeof part === 'string' && !foundInThisPass) {
                const match = part.match(regex);
                if (match) {
                    const split = part.split(regex);
                    // Reconstruct with tooltip
                    if (split.length >= 2) {
                        newParts.push(split[0]);
                        newParts.push(
                            <span key={`${def.id}`} tabIndex={0} className="tooltip-trigger group relative inline-block text-neonCyan font-bold cursor-help border-b border-dashed border-neonCyan/50 focus:outline-none">
                                {match[0]}
                                {/* Gen Z style popup */}
                                <span className="
                                    pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 
                                    bg-black border-2 border-neonCyan p-3 rounded z-[300] opacity-0 
                                    group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200
                                    shadow-[4px_4px_0px_#00F0FF]
                                ">
                                    <strong className="block text-neonCyan mb-1 text-xs uppercase tracking-widest">{def.title}</strong>
                                    <span className="block text-white text-xs font-mono leading-tight">{def.definition}</span>
                                </span>
                            </span>
                        );
                        newParts.push(split.slice(2).join(match[0])); // Join rest
                        foundInThisPass = true;
                        replacements++;
                    } else {
                        newParts.push(part);
                    }
                } else {
                    newParts.push(part);
                }
            } else {
                newParts.push(part);
            }
        });
        parts = newParts;
    });

    return <>{parts}</>;
};

export default DialogueBox;
