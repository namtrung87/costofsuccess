import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { AlertTriangle, TrendingUp, TrendingDown, Info } from 'lucide-react';

const MarketTicker: React.FC = () => {
    const { state } = useGame();

    const getEventIcon = () => {
        if (!state.marketEvent) return <Info className="w-4 h-4 text-gray-400" />;
        switch (state.marketEvent.type) {
            case 'positive': return <TrendingUp className="w-4 h-4 text-neonGreen" />;
            case 'negative': return <AlertTriangle className="w-4 h-4 text-neonPink" />;
            default: return <Info className="w-4 h-4 text-neonCyan" />;
        }
    };

    const getEventColor = () => {
        if (!state.marketEvent) return 'text-gray-400 border-gray-800';
        switch (state.marketEvent.type) {
            case 'positive': return 'text-neonGreen border-neonGreen/30 bg-neonGreen/5';
            case 'negative': return 'text-neonPink border-neonPink/30 bg-neonPink/5';
            default: return 'text-neonCyan border-neonCyan/30 bg-neonCyan/5';
        }
    };

    return (
        <div className="w-full h-8 overflow-hidden bg-black/40 border-y border-white/5 flex items-center relative z-20 pointer-events-auto">
            {/* Ticker Container */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={state.marketEvent?.name || 'idle'}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className={`flex items-center gap-4 px-6 w-full ${getEventColor()} transition-colors duration-500`}
                >
                    <div className="shrink-0 flex items-center gap-2">
                        <span className="text-[10px] font-mono font-black uppercase tracking-tighter opacity-50">Global Market:</span>
                        {getEventIcon()}
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <motion.div
                            animate={{ x: [400, -1000] }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            className="whitespace-nowrap text-[11px] font-mono tracking-wider uppercase font-bold"
                        >
                            {state.marketEvent
                                ? `${state.marketEvent.name} // ${state.marketEvent.description} // IMPACT: COST ${state.multipliers.cost}x, REWARD ${state.multipliers.reward}x, SANITY DRAIN ${state.multipliers.sanity}x`
                                : "MARKET STABLE // NO ACTIVE VOLATILITY // PRODUCTION QUANTUM SYNERGY AT 100% // ALL SYSTEMS GREETINGS INTERN"
                            }
                        </motion.div>
                    </div>

                    <div className="shrink-0 flex gap-4 text-[10px] font-mono">
                        <div className="flex items-center gap-1">
                            <span className="opacity-50">OAR:</span>
                            <span className="text-neonCyan">{(state.currentOAR || 0).toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="opacity-50">HYPE:</span>
                            <span className="text-neonPink">{state.marketEvent ? state.marketEvent.type.toUpperCase() : 'STABLE'}</span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Decorative scanline */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent h-[1px] top-1/2 animate-scanline" />
        </div>
    );
};

export default MarketTicker;
