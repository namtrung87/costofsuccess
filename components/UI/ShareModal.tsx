import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import ShareCardGenerator from './ShareCardGenerator';
import CyberButton from './CyberButton';

const ShareModal: React.FC = () => {
    const { state, dispatch } = useGame();
    const [cardDataUrl, setCardDataUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(true);

    // This modal will be controlled by a global state 'isShareModalOpen' which we need to add to types/reducer
    // For now, let's assume it's integrated into the GameState.

    if (state.activeModal !== 'SHARE') return null;

    const handleDownload = () => {
        if (!cardDataUrl) return;
        const link = document.createElement('a');
        link.download = `Performance_Review_${state.playerName || 'Intern'}.png`;
        link.href = cardDataUrl;
        link.click();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => dispatch({ type: 'TOGGLE_SHARE_MODAL' })}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-obsidian border border-neonCyan/30 p-6 md:p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-neonCyan/20"
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-heading font-black text-neonCyan tracking-tighter">SHARE SUCCESS</h2>
                        <p className="text-gray-400 font-mono text-xs uppercase">NEURAL LINK | PERFORMANCE EXPORT</p>
                    </div>
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_SHARE_MODAL' })}
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        [ESC]
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Preview Area */}
                    <div className="relative aspect-[9/16] bg-black/40 border border-white/10 rounded-lg overflow-hidden flex items-center justify-center">
                        {isGenerating && (
                            <div className="text-center animate-pulse">
                                <div className="w-12 h-12 border-4 border-neonCyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <span className="text-neonCyan font-mono text-[10px] uppercase">Generating Card...</span>
                            </div>
                        )}

                        {cardDataUrl && (
                            <img
                                src={cardDataUrl}
                                alt="Performance Card"
                                className="w-full h-full object-contain"
                                onLoad={() => setIsGenerating(false)}
                            />
                        )}

                        <ShareCardGenerator onReady={(url) => {
                            setCardDataUrl(url);
                            setIsGenerating(false);
                        }} />
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col justify-center gap-6">
                        <div className="space-y-2">
                            <h3 className="text-white font-heading font-bold uppercase tracking-widest text-sm">Download Performance Review</h3>
                            <p className="text-gray-400 text-xs leading-relaxed">
                                Export your journey as a high-resolution neural-link summary.
                                Perfect for showing off your cost accounting dominance to the collective.
                            </p>
                        </div>

                        <CyberButton
                            onClick={handleDownload}
                            disabled={isGenerating || !cardDataUrl}
                            variant="success"
                            className="w-full"
                        >
                            DOWNLOAD_CARD.PNG
                        </CyberButton>

                        <div className="border-t border-white/10 pt-6 mt-2 space-y-4">
                            <p className="text-[10px] text-gray-500 font-mono uppercase text-center">Export Configuration</p>
                            <div className="flex justify-between items-center text-[10px] font-mono border border-white/5 p-2 rounded">
                                <span className="text-gray-400">RESOLUTION</span>
                                <span className="text-neonCyan">1080x1920 (HD)</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono border border-white/5 p-2 rounded">
                                <span className="text-gray-400">FORMAT</span>
                                <span className="text-neonCyan">PNG / COLOR_8BIT</span>
                            </div>
                        </div>

                        <button
                            onClick={() => dispatch({ type: 'TOGGLE_SHARE_MODAL' })}
                            className="text-[10px] text-gray-500 hover:text-white transition-colors font-mono uppercase text-center mt-4"
                        >
                            Return to Game
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ShareModal;
