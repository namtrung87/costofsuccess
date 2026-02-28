
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion } from '../../types';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';

interface QuizInterfaceProps {
    question: QuizQuestion;
    onComplete: (success: boolean) => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ question, onComplete }) => {
    const { state } = useGame();
    const { playSFX } = useAudio();
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleOptionClick = (id: string) => {
        if (hasSubmitted) return;
        playSFX('CLICK');
        setSelectedOptionId(id);
    };

    const handleSubmit = () => {
        if (!selectedOptionId) return;
        playSFX('CLICK');

        // Check answer immediately for sound feedback
        const selected = question.options.find(o => o.id === selectedOptionId);
        if (selected?.isCorrect) {
            playSFX('SUCCESS');
        } else {
            playSFX('ERROR');
        }

        setHasSubmitted(true);
    };

    const handleNext = () => {
        playSFX('CLICK');
        const selected = question.options.find(o => o.id === selectedOptionId);
        onComplete(selected?.isCorrect || false);
        // Reset state is handled by parent unmounting/remounting with new question usually, 
        // but just in case:
        setSelectedOptionId(null);
        setHasSubmitted(false);
    };

    const selectedOption = question.options.find(o => o.id === selectedOptionId);

    return (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-3xl bg-obsidian border-2 border-neonCyan/50 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)]"
            >
                {/* Header */}
                <div className="bg-neonCyan/10 p-6 border-b border-neonCyan/30 flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-heading text-neonCyan tracking-widest uppercase">
                        Assessment Protocol
                    </h2>
                    {state.streak > 1 && (
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-neonPink text-black font-black px-3 py-1 skew-x-[-12deg] text-xs shadow-[0_0_10px_#FF0055]"
                        >
                            STREAK: x{state.streak}
                        </motion.div>
                    )}
                </div>

                {/* Question Body */}
                <div className="p-8">
                    <p className="font-mono text-lg md:text-xl text-white mb-8 leading-relaxed">
                        {question.question}
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        {question.options.map((option, index) => {
                            let containerClass = "relative border-2 p-4 rounded cursor-pointer transition-all duration-200 group overflow-hidden ";

                            if (hasSubmitted) {
                                if (option.id === selectedOptionId) {
                                    containerClass += option.isCorrect
                                        ? "border-neonGreen bg-neonGreen/10"
                                        : "border-neonPink bg-neonPink/10";
                                } else if (option.isCorrect) {
                                    containerClass += "border-neonGreen/50 border-dashed opacity-70";
                                } else {
                                    containerClass += "border-gray-700 opacity-50";
                                }
                            } else {
                                containerClass += selectedOptionId === option.id
                                    ? "border-neonCyan bg-neonCyan/10 shadow-neon-cyan"
                                    : "border-gray-600 hover:border-neonCyan/50 hover:bg-white/5";
                            }

                            return (
                                <motion.div
                                    key={option.id}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(_, info) => {
                                        if (info.offset.x > 100 && !hasSubmitted) {
                                            handleOptionClick(option.id);
                                            handleSubmit();
                                        }
                                    }}
                                    whileHover={{ scale: hasSubmitted ? 1 : 1.02, x: hasSubmitted ? 0 : 5 }}
                                    onClick={() => handleOptionClick(option.id)}
                                    className={containerClass}
                                >
                                    <div className="flex items-center gap-4 pointer-events-none">
                                        <div className={`
                                            w-8 h-8 flex items-center justify-center border font-mono font-bold rounded
                                            ${hasSubmitted && option.isCorrect ? 'border-neonGreen text-neonGreen' : ''}
                                            ${hasSubmitted && !option.isCorrect && selectedOptionId === option.id ? 'border-neonPink text-neonPink' : ''}
                                            ${!hasSubmitted && selectedOptionId === option.id ? 'border-neonCyan text-neonCyan' : 'border-gray-500 text-gray-500'}
                                        `}>
                                            {option.id.toUpperCase()}
                                        </div>
                                        <span className="font-body text-white">{option.text}</span>
                                    </div>

                                    {/* Hint for mobile */}
                                    {!hasSubmitted && (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity flex items-center gap-1">
                                            <span className="text-[10px] text-neonCyan font-mono">SWIPE RIGHT TO SELECT</span>
                                            <span className="text-neonCyan">→</span>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer / Feedback Area */}
                <div className="bg-black p-6 border-t border-gray-800 min-h-[100px] flex items-center justify-end">
                    {!hasSubmitted ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedOptionId}
                            className="px-8 py-3 bg-neonCyan text-black font-heading font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-neon-cyan transition-all"
                        >
                            Confirm Answer
                        </button>
                    ) : (
                        <div className="flex w-full justify-between items-center">
                            <div className="flex-1 mr-4">
                                <span className={`font-mono font-bold text-sm uppercase block mb-1 ${selectedOption?.isCorrect ? 'text-neonGreen' : 'text-neonPink'}`}>
                                    {selectedOption?.isCorrect ? '>> Correct Analysis' : '>> Error Detected'}
                                </span>
                                <p className="text-gray-300 text-sm">{selectedOption?.feedback}</p>
                            </div>
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 border border-white text-white font-heading font-bold uppercase hover:bg-white hover:text-black transition-all"
                            >
                                Proceed
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default QuizInterface;
