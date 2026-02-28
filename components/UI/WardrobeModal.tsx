import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { COSMETICS, CosmeticItem } from '../../data/cosmetics';

const WardrobeModal: React.FC = () => {
    const { state, dispatch } = useGame();

    if (!state.isWardrobeOpen) return null;

    const handleEquip = (item: CosmeticItem) => {
        dispatch({ type: 'EQUIP_COSMETIC', payload: { type: item.type, id: item.id } });
        dispatch({ type: 'SHOW_TOAST', payload: { message: `${item.name} Equipped`, type: 'success' } });
    };

    const categories = ['AVATAR', 'THEME'] as const;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => dispatch({ type: 'TOGGLE_WARDROBE' })}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative w-full max-w-5xl h-[80vh] bg-obsidian border-2 border-neonCyan/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,240,255,0.1)] flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div>
                        <h2 className="text-3xl font-heading text-white uppercase tracking-tighter italic">Wardrobe // <span className="text-neonCyan">Customization</span></h2>
                        <p className="text-xs text-gray-500 font-mono mt-1">Sytem.Identity.Module_v3.4</p>
                    </div>
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_WARDROBE' })}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    {categories.map(category => (
                        <div key={category} className="mb-12">
                            <h3 className="text-neonCyan font-mono text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                                <span>{category}s</span>
                                <div className="h-px flex-1 bg-neonCyan/20" />
                            </h3>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {COSMETICS.filter(c => c.type === category).map(item => {
                                    const isUnlocked = state.unlockedCosmetics.includes(item.id);
                                    const isEquipped = state.equippedAvatar === item.id || state.activeTheme === item.id;

                                    return (
                                        <motion.div
                                            key={item.id}
                                            whileHover={isUnlocked ? { y: -5 } : {}}
                                            className={`relative group rounded-2xl border-2 transition-all p-4 flex flex-col items-center text-center ${isEquipped
                                                    ? 'border-neonGreen bg-neonGreen/5 shadow-[0_0_20px_rgba(57,255,20,0.1)]'
                                                    : isUnlocked
                                                        ? 'border-white/10 bg-white/5 hover:border-neonCyan/50 cursor-pointer'
                                                        : 'border-white/5 bg-transparent opacity-50 grayscale'
                                                }`}
                                            onClick={() => isUnlocked && !isEquipped && handleEquip(item)}
                                        >
                                            {/* Rarity Tag */}
                                            <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${item.rarity === 'LEGENDARY' ? 'bg-orange-500 text-white shadow-[0_0_10px_orange]' :
                                                    item.rarity === 'RARE' ? 'bg-neonCyan text-black' : 'bg-gray-500 text-white'
                                                }`}>
                                                {item.rarity}
                                            </div>

                                            {/* Preview Circle */}
                                            <div className={`w-20 h-20 rounded-full mb-4 border-2 flex items-center justify-center overflow-hidden bg-black/50 ${isEquipped ? 'border-neonGreen animate-pulse' : 'border-white/10'
                                                }`}>
                                                {item.type === 'AVATAR' ? (
                                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${state.assets[item.value!] || item.value})` }} />
                                                ) : (
                                                    <div className={`w-full h-full ${item.value}`} />
                                                )}
                                            </div>

                                            <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                                            <p className="text-[10px] text-gray-500 font-body px-2">{item.description}</p>

                                            {!isUnlocked && (
                                                <div className="mt-4 text-[9px] text-neonPink font-mono flex items-center gap-1 uppercase">
                                                    <span>🔒</span> Locked
                                                </div>
                                            )}

                                            {isEquipped && (
                                                <div className="mt-4 text-[9px] text-neonGreen font-mono font-bold flex items-center gap-1 uppercase">
                                                    <span>✓</span> Equipped
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="p-4 bg-black/50 border-t border-white/5 text-center">
                    <p className="text-[10px] text-gray-600 font-mono">Unlocking cosmetics requires high evaluation scores and specific milestones.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default WardrobeModal;
