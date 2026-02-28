import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS } from '../../achievements';

interface AchievementPopupProps {
    achievementId: string;
    onClose: () => void;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievementId, onClose }) => {
    const achievement = ACHIEVEMENTS[achievementId];

    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!achievement) return null;

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed bottom-10 right-10 z-[200] w-72 bg-black/90 border-2 border-neonCyan rounded-xl p-4 shadow-[0_0_30px_#00F0FF88] backdrop-blur-xl flex items-center gap-4 cursor-pointer overflow-hidden"
            onClick={onClose}
        >
            {/* Glitch Overlay */}
            <div className="absolute inset-0 bg-neonCyan/5 opacity-10 animate-pulse pointer-events-none" />

            <div className="text-4xl">{achievement.icon}</div>
            <div className="flex flex-col">
                <div className="text-[10px] text-neonCyan font-mono uppercase tracking-tighter">Achievement Unlocked</div>
                <div className="text-white font-black text-lg leading-tight uppercase tracking-widest">{achievement.title}</div>
                <div className="text-gray-400 text-xs mt-1">{achievement.description}</div>
            </div>

            {/* Border Glow Animation */}
            <motion.div
                className="absolute inset-0 border-2 border-neonCyan rounded-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    );
};
