import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import GlassPanel from '../UI/GlassPanel';
import { X, Coffee, ShoppingBag, Zap, Heart, Sparkles } from 'lucide-react';

const BOBA_ITEMS = [
    { id: 'classic_boba', name: 'Classic Pearl Tea', cost: 150, heal: 20, desc: 'The OG. Standard stress relief.', icon: '🧋' },
    { id: 'matcha_latte', name: 'Matcha Zen', cost: 300, heal: 45, desc: 'Maximum focus for high-stakes calculations.', icon: '🍵' },
    { id: 'neon_burst', name: 'Neon Burst Energy', cost: 500, heal: 80, desc: 'CFO-grade synergy in a cup. Overcharges your vibe.', icon: '⚡' },
];

const BobaShop: React.FC = () => {
    const { state, dispatch } = useGame();

    if (state.activeModal !== 'BOBA_SHOP') return null;

    const handlePurchase = (item: typeof BOBA_ITEMS[0]) => {
        if (state.budget >= item.cost) {
            dispatch({ type: 'BUY_BOBA', payload: { cost: item.cost, sanityHeal: item.heal } });
            dispatch({ type: 'SHOW_TOAST', payload: { message: `PURCHASED: ${item.name} (+${item.heal} Sanity)`, type: 'success' } });

            // Potential achievement trigger
            if (state.budget - item.cost < 100) {
                dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'BIG_SPENDER' });
            }
        } else {
            dispatch({ type: 'SHOW_TOAST', payload: { message: 'INSUFFICIENT CREDITS', type: 'error' } });
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    className="w-full max-w-2xl relative"
                >
                    <GlassPanel intensity="HIGH" border="PINK" className="flex flex-col overflow-hidden">
                        {/* Shop Header */}
                        <div className="p-6 border-b border-neonPink/30 bg-gradient-to-r from-neonPink/10 to-transparent flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-neonPink/20 rounded-2xl animate-pulse ring-2 ring-neonPink/50">
                                    <Coffee className="w-6 h-6 text-neonPink" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-heading text-neonPink tracking-tighter uppercase italic">Neon Drop Boba</h2>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-neonGreen rounded-full animate-ping" />
                                        <span className="text-[10px] font-mono text-gray-400">STATUS: OPEN // BUDGET: ${state.budget}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch({ type: 'TOGGLE_BOBA_SHOP' })}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                            >
                                <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
                            </button>
                        </div>

                        {/* Shop Content */}
                        <div className="p-6 space-y-4">
                            {BOBA_ITEMS.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`
                    flex items-center justify-between p-4 rounded-xl border transition-all duration-300
                    ${state.budget >= item.cost ? 'bg-white/5 border-white/10 hover:border-neonPink/50 hover:bg-white/10' : 'bg-black/20 border-red-900/20 grayscale opacity-60'}
                  `}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,0,85,0.4)]">{item.icon}</span>
                                        <div>
                                            <h3 className="font-heading text-white text-lg">{item.name}</h3>
                                            <p className="text-xs text-gray-400 font-mono italic">{item.desc}</p>
                                            <div className="flex gap-2 mt-1">
                                                <span className="flex items-center gap-1 text-[10px] text-neonPink font-bold uppercase">
                                                    <Heart className="w-3 h-3 fill-neonPink" /> +{item.heal} Sanity
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handlePurchase(item)}
                                        disabled={state.budget < item.cost}
                                        className={`
                      px-6 py-2 rounded-lg font-heading font-black text-sm transition-all
                      ${state.budget >= item.cost
                                                ? 'bg-neonPink text-white shadow-[0_0_15px_#FF0055] hover:scale-105 active:scale-95'
                                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
                    `}
                                    >
                                        ${item.cost}
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer Prompt */}
                        <div className="p-4 bg-black/40 text-center border-t border-white/5">
                            <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                                "One boba a day keeps the auditors away." - Intern proverb
                            </p>
                        </div>
                    </GlassPanel>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default BobaShop;
