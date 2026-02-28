import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export const ComboCounter: React.FC = () => {
    const { state } = useGame();

    if (state.streak < 2) return <AnimatePresence />;

    return (
        <AnimatePresence>
            <motion.div
                key={state.streak}
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: -5 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="fixed top-24 left-10 z-[110] pointer-events-none"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-neonPink blur-xl opacity-50 animate-pulse" />
                    <div className="relative bg-black/80 border-4 border-neonPink px-6 py-2 skew-x-[-12deg] shadow-[0_0_20px_#FF0055]">
                        <div className="text-[10px] text-neonPink font-mono uppercase tracking-widest mb-1">Combo Streak</div>
                        <div className="text-4xl md:text-6xl font-black text-white italic italic-glow">
                            x{state.streak}
                        </div>
                    </div>
                </div>

                {state.streak >= 5 && (
                    <motion.div
                        animate={{ y: [0, -20], opacity: [1, 0] }}
                        className="absolute -top-10 left-0 text-neonCyan font-mono text-sm font-bold"
                    >
                        FIRE!!! 🔥
                    </motion.div>
                )}
            </motion.div>

            <style>{`
                .italic-glow {
                    text-shadow: 2px 2px 0px #FF0055, 4px 4px 0px rgba(0,0,0,0.5);
                }
            `}</style>
        </AnimatePresence>
    );
};
