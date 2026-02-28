import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { PHASE_TITLES } from '../../constants';

const PhaseTransition: React.FC = () => {
    const { state } = useGame();
    const { playSFX } = useAudio();
    const [isActive, setIsActive] = useState(false);
    const [displayPhase, setDisplayPhase] = useState('');
    const [canSkip, setCanSkip] = useState(false);
    const [subDescription, setSubDescription] = useState('...');

    useEffect(() => {
        setIsActive(true);
        playSFX('SWIPE');

        // Determine the display name
        const current = state.currentPhase;
        const match = current.match(/(PHASE_\d+|PRACTICE_MODE)/);
        let title = current.replace('PHASE_', '');
        let desc = 'System loading...';
        let phaseNumber = '';

        if (match) {
            let key = match[0];
            if (key === 'PRACTICE_MODE') key = 'PRACTICE';
            if (PHASE_TITLES[key]) {
                title = PHASE_TITLES[key][state.language];
            }
            if (key.startsWith('PHASE_')) {
                phaseNumber = key.replace('PHASE_', '');
                desc = state.language === 'EN' ? `"Concept: Focus and Strategy"` : `"Khái niệm: Tập trung & Chiến lược"`; // Need actual sub-descriptions here, using fallback
            }
        }

        setDisplayPhase(phaseNumber ? `PHASE ${phaseNumber}: ${title}` : title);
        setSubDescription(desc);

        // Allow skipping after 800ms
        const skipTimer = setTimeout(() => {
            setCanSkip(true);
        }, 800);

        const timer = setTimeout(() => {
            setIsActive(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
            clearTimeout(skipTimer);
        }
    }, [state.currentPhase, state.language]);

    if (!isActive) return <AnimatePresence />;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] bg-obsidian flex items-center justify-center overflow-hidden p-4 cursor-pointer"
                onClick={() => {
                    if (canSkip) setIsActive(false);
                }}
            >
                {/* Background Grid Animation */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px]"
                />

                {/* Cinematic Speed Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-[1px] bg-neonCyan"
                    />
                    <motion.div
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 right-0 w-full h-[1px] bg-neonCyan"
                    />
                </div>

                {/* Glitch Overlay */}
                <motion.div
                    animate={{
                        clipPath: [
                            'inset(80% 0 1% 0)',
                            'inset(10% 0 80% 0)',
                            'inset(50% 0 30% 0)',
                            'inset(0% 0 0% 0)'
                        ],
                        x: [-2, 2, -1, 0]
                    }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                    className="absolute inset-0 bg-neonCyan/10 mix-blend-overlay pointer-events-none"
                />

                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl">
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="text-neonCyan font-mono text-sm md:text-base tracking-[0.5em] mb-8"
                    >
                        SYSTEM LOADING
                    </motion.div>

                    <div className="relative text-center mx-auto px-4 w-full">
                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-tight break-words mb-4"
                            style={{ textShadow: '2px 0 #FF0055, -2px 0 #00F0FF' }}
                        >
                            {displayPhase}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-neonCyan font-mono tracking-widest text-sm"
                        >
                            {subDescription}
                        </motion.p>
                        {canSkip && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute -bottom-16 w-full text-center text-[10px] text-white/50 animate-pulse font-mono tracking-[0.2em] uppercase"
                            >
                                [ Click / Tap to Skip ]
                            </motion.p>
                        )}
                    </div>

                    <div className="mt-12 flex justify-center gap-4">
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                className="w-3 h-3 bg-neonGreen rounded-full shadow-[0_0_10px_#39FF14]"
                            />
                        ))}
                    </div>

                    <div className="mt-4 font-mono text-xs text-gray-500 uppercase tracking-widest animate-pulse">
                        {state.isAssetsLoading ? `INITIALIZING ASSETS... ${state.percentageLoaded}%` : 'SYSTEM READY'}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PhaseTransition;
