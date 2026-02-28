import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Target, Activity } from 'lucide-react';

const OARTracker: React.FC = () => {
    const { state } = useGame();

    // Calculate a mock "Target OAR" vs "Actual OAR"
    const actualOAR = 12.5;
    const targetOAR = 15.0;
    const variance = actualOAR - targetOAR;
    const isHealthy = Math.abs(variance) < 2;

    return (
        <motion.div
            drag
            dragMomentum={false}
            className="hidden lg:flex items-center gap-3 px-4 py-2 bg-black/70 backdrop-blur-md border border-neonCyan/30 rounded-xl pointer-events-auto cursor-grab active:cursor-grabbing shadow-[0_0_15px_rgba(0,240,255,0.1)]"
        >
            {/* Minimal Drag Handle */}
            <div className="flex flex-col gap-0.5 opacity-30 px-1 border-r border-white/10">
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
            </div>
            <div className={`p-1.5 rounded-lg ${isHealthy ? 'bg-neonGreen/20 text-neonGreen' : 'bg-neonPink/20 text-neonPink'}`}>
                <Target className="w-4 h-4" />
            </div>

            <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-400 uppercase leading-none mb-1">OAR Accuracy</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-heading font-bold text-white tracking-tighter">
                        {actualOAR.toFixed(1)}%
                    </span>
                    <div className={`h-1.5 w-12 bg-gray-800 rounded-full overflow-hidden`}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(actualOAR / 30) * 100}%` }}
                            className={`h-full ${isHealthy ? 'bg-neonGreen shadow-[0_0_8px_#39FF14]' : 'bg-neonPink shadow-[0_0_8px_#FF0055]'}`}
                        />
                    </div>
                </div>
            </div>

            <div className="h-8 w-px bg-white/10 mx-2" />

            <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono text-gray-500 uppercase leading-none">Variance</span>
                <span className={`text-[11px] font-mono font-bold ${variance >= 0 ? 'text-neonGreen' : 'text-neonPink'}`}>
                    {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
                </span>
            </div>
        </motion.div>
    );
};

export default OARTracker;
