import React, { useState } from 'react';
import { BehaviorSortingItem, BehaviorCategory } from '../../data/phase12';
import { ASSETS } from '../../constants';

interface BehaviorSortingGameProps {
    items: BehaviorSortingItem[];
    onComplete: (score: number) => void;
    onCorrect: () => void;
    onIncorrect: () => void;
}

const BehaviorSortingGame: React.FC<BehaviorSortingGameProps> = ({ items, onComplete, onCorrect, onIncorrect }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedbackText, setFeedbackText] = useState<string | null>(null);
    const [swipeDirection, setSwipeDirection] = useState<'LEFT' | 'RIGHT' | null>(null);
    const [animating, setAnimating] = useState(false);
    const [score, setScore] = useState(0);

    const currentItem = items[currentIndex];

    const handleSwipe = (direction: 'LEFT' | 'RIGHT') => {
        if (animating) return;

        setAnimating(true);
        setSwipeDirection(direction);

        // Logic: LEFT = VARIABLE, RIGHT = FIXED
        const selectedCategory: BehaviorCategory = direction === 'LEFT' ? 'VARIABLE' : 'FIXED';
        const isCorrect = selectedCategory === currentItem.category;

        if (isCorrect) {
            setFeedbackText(currentItem.feedback);
            setScore(s => s + 1);
            onCorrect();
        } else {
            setFeedbackText("Incorrect Classification.");
            onIncorrect();
        }

        setTimeout(() => {
            setFeedbackText(null);
            setSwipeDirection(null);
            setAnimating(false);

            if (currentIndex < items.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                onComplete(score + (isCorrect ? 1 : 0));
            }
        }, 1200); // Allow time to read feedback
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md overflow-hidden">

            {/* Header */}
            <div className="absolute top-16 md:top-20 text-center w-full">
                <h2 className="text-xl md:text-2xl font-heading text-white tracking-widest uppercase mb-1">Cost Behavior Sorter</h2>
                <div className="text-xs font-mono text-gray-400">
                    Pending: {items.length - currentIndex} | Score: {score}
                </div>
            </div>

            {/* Main Card Container */}
            <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">

                {/* The Card */}
                <div className={`
            relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] flex flex-col items-center justify-center transition-all duration-500 ease-out transform
            ${swipeDirection === 'LEFT' ? '-translate-x-full rotate-[-20deg] opacity-0' : ''}
            ${swipeDirection === 'RIGHT' ? 'translate-x-full rotate-[20deg] opacity-0' : ''}
        `}>
                    {/* Background Image Asset */}
                    <div className="absolute inset-0 z-0">
                        <img src={ASSETS.UI_INVOICE_FRAME} alt="Frame" className="w-full h-full object-contain opacity-90" />
                    </div>

                    {/* Stamp Overlay */}
                    {swipeDirection && (
                        <div className={`
                    absolute top-1/4 transform -rotate-12 border-4 font-black text-4xl uppercase p-2 z-50 animate-[stamp_0.2s_ease-out_forwards]
                    ${swipeDirection === 'LEFT' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}
                `}>
                            {swipeDirection === 'LEFT' ? 'VARIABLE' : 'FIXED'}
                        </div>
                    )}

                    {/* Card Content */}
                    <div className="relative z-10 w-[70%] h-[60%] flex flex-col items-center justify-center text-center p-2">
                        <div className="text-4xl mb-2 text-neonCyan drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">📈</div>
                        <h3 className="font-heading font-bold text-lg md:text-xl text-white leading-tight mb-2 drop-shadow-md">{currentItem.title}</h3>
                        <p className="font-mono text-xs md:text-sm text-cyan-200 bg-black/40 p-2 rounded border border-cyan-500/30 w-full">{currentItem.details}</p>
                    </div>
                </div>

                {/* Feedback Text */}
                {feedbackText && (
                    <div className="absolute bottom-[-40px] text-center w-full px-4 animate-bounce z-50">
                        <p className="text-white font-bold bg-black/80 px-4 py-2 rounded border border-white/20 inline-block shadow-[0_0_10px_white]">
                            {feedbackText}
                        </p>
                    </div>
                )}

            </div>

            {/* Controls */}
            <div className="absolute bottom-10 md:bottom-16 flex gap-8 items-center">

                <button
                    onClick={() => handleSwipe('LEFT')}
                    disabled={animating}
                    className="flex flex-col items-center group"
                >
                    <div className="w-16 h-16 rounded-full border-2 border-neonCyan flex items-center justify-center bg-black/50 text-neonCyan text-2xl transition-all group-hover:bg-neonCyan group-hover:text-black group-hover:scale-110">
                        ⬅
                    </div>
                    <span className="mt-2 font-heading font-bold text-neonCyan text-sm tracking-widest">VARIABLE</span>
                    <span className="text-[10px] text-gray-500">Fluctuates with Volume</span>
                </button>

                <div className="text-gray-600 font-mono text-xs">VS</div>

                <button
                    onClick={() => handleSwipe('RIGHT')}
                    disabled={animating}
                    className="flex flex-col items-center group"
                >
                    <div className="w-16 h-16 rounded-full border-2 border-neonPink flex items-center justify-center bg-black/50 text-neonPink text-2xl transition-all group-hover:bg-neonPink group-hover:text-black group-hover:scale-110">
                        ➡
                    </div>
                    <span className="mt-2 font-heading font-bold text-neonPink text-sm tracking-widest">FIXED</span>
                    <span className="text-[10px] text-gray-500">Constant Cost</span>
                </button>

            </div>

            <style>{`
        @keyframes stamp {
            0% { opacity: 0; transform: scale(2) rotate(-12deg); }
            100% { opacity: 1; transform: scale(1) rotate(-12deg); }
        }
      `}</style>
        </div>
    );
};

export default BehaviorSortingGame;
