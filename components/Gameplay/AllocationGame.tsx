
import React, { useState } from 'react';
import { AllocationItem, Department } from '../../data/phase5';
import { useGame } from '../../context/GameContext';
import { UI_STRINGS, ASSETS } from '../../constants';

interface AllocationGameProps {
  items: AllocationItem[];
  onComplete: (score: number) => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const AllocationGame: React.FC<AllocationGameProps> = ({ items, onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const ui = UI_STRINGS[state.language];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [animating, setAnimating] = useState(false);

  const currentItem = items[currentIndex];

  const handleApportion = () => {
    if (animating) return;
    submitAnswer('SHARED');
  };

  const handleAllocate = (dept: Department) => {
    if (animating) return;
    submitAnswer(dept);
  };

  const submitAnswer = (dept: Department) => {
    setAnimating(true);
    
    const isApportionAction = dept === 'SHARED';
    const isCorrectType = isApportionAction 
        ? currentItem.correctType === 'APPORTION'
        : currentItem.correctType === 'ALLOCATE';

    const isCorrectDept = dept === currentItem.correctDept;

    const isSuccess = isCorrectType && isCorrectDept;

    if (isSuccess) {
      setFeedback(currentItem.feedback);
      setScore(s => s + 1);
      onCorrect();
    } else {
        if (!isCorrectType) {
            setFeedback(isApportionAction 
                ? "Wrong. This belongs to a specific room (Allocate)." 
                : "Wrong. This is a shared cost (Apportion).");
        } else {
            setFeedback("Wrong Department.");
        }
        onIncorrect();
    }

    setTimeout(() => {
      setFeedback(null);
      setAnimating(false);
      
      if (currentIndex < items.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete(score + (isSuccess ? 1 : 0));
      }
    }, 2000);
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
      
      {/* Header */}
      <div className="absolute top-0 w-full p-4 flex justify-center">
        <div className="bg-black/60 border border-neonCyan px-6 py-2 rounded text-neonCyan font-mono">
            {ui.INCOMING_BILL} {currentIndex + 1} / {items.length}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 p-4 items-center h-full">

        {/* LEFT: APPORTION ZONE */}
        <div className="flex flex-col items-center justify-center h-full order-2 md:order-1">
            <button
                onClick={handleApportion}
                disabled={animating}
                className="w-full h-48 md:h-64 border-2 border-dashed border-gray-500 rounded-xl bg-gray-900/50 flex flex-col items-center justify-center hover:bg-neonCyan/10 hover:border-neonCyan transition-all group overflow-hidden relative"
            >
                <img src={ASSETS.VFX_CLOUD} alt="Cloud" className="w-32 h-32 object-contain opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all absolute" />
                <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-heading text-white uppercase mb-2 drop-shadow-md">{ui.APPORTION}</h3>
                    <p className="text-gray-300 font-mono text-sm px-4 shadow-black drop-shadow-sm">
                        {ui.SHARED_COST}
                    </p>
                </div>
            </button>
        </div>

        {/* CENTER: INVOICE */}
        <div className="flex flex-col items-center justify-center relative z-10 order-1 md:order-2">
            <div className={`
                bg-white text-black p-6 rounded shadow-2xl w-full max-w-sm min-h-[300px] flex flex-col justify-between transform transition-all duration-500 relative overflow-hidden
                ${animating ? 'scale-90 opacity-50' : 'scale-100'}
            `}>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src={ASSETS.UI_INVOICE_FRAME} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="border-b-2 border-black pb-4 mb-4 relative z-10">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">{ui.INCOMING_BILL}</div>
                    <h2 className="text-2xl font-black uppercase leading-tight mt-2">{currentItem.title}</h2>
                </div>
                
                <div className="font-mono text-sm bg-gray-100 p-4 rounded mb-4 relative z-10">
                    {currentItem.details}
                </div>

                <div className="text-[10px] text-gray-400 text-center relative z-10">
                    NEON DROP STUDIOS // ACCOUNTS PAYABLE
                </div>

                {/* Feedback Overlay on Card */}
                {feedback && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/90 p-4 rounded text-center animate-pulse z-20">
                        <span className={`font-bold font-mono ${feedback.includes('Wrong') ? 'text-neonPink' : 'text-neonGreen'}`}>
                            {feedback}
                        </span>
                    </div>
                )}
            </div>
            
            <div className="mt-8 text-white font-mono text-xs animate-pulse">
                &lt;&lt; {ui.SELECT_DEST} &gt;&gt;
            </div>
        </div>

        {/* RIGHT: ALLOCATE ZONES (HOLOGRAPHIC MAP) */}
        <div className="h-full flex flex-col justify-center order-3">
            {/* Visual Container - Use the UI_DEPT_MAP as the main visual */}
            <div className="relative w-full h-64 md:h-96 border-2 border-neonCyan/50 rounded-xl overflow-hidden bg-black shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                {/* Background Map Image - Fully Visible */}
                <div className="absolute inset-0 opacity-100">
                    <img src={ASSETS.UI_DEPT_MAP} alt="Map" className="w-full h-full object-cover" />
                </div>

                {/* Interactive Grid Overlay (Transparent) */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    {/* DEPT 1: CUTTING (Top Left) */}
                    <button 
                        onClick={() => handleAllocate('CUTTING')}
                        className="flex flex-col items-center justify-center hover:bg-neonCyan/20 transition-all group border-r border-b border-neonCyan/10 relative"
                    >
                        <span className="absolute bottom-2 left-2 text-[10px] font-heading text-neonCyan uppercase bg-black/70 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Cutting</span>
                    </button>

                    {/* DEPT 2: SEWING (Top Right) */}
                    <button 
                        onClick={() => handleAllocate('SEWING')}
                        className="flex flex-col items-center justify-center hover:bg-neonGreen/20 transition-all group border-b border-neonCyan/10 relative"
                    >
                        <span className="absolute bottom-2 right-2 text-[10px] font-heading text-neonGreen uppercase bg-black/70 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Sewing</span>
                    </button>

                    {/* DEPT 3: MAINTENANCE (Bottom Left) */}
                    <button 
                        onClick={() => handleAllocate('MAINTENANCE')}
                        className="flex flex-col items-center justify-center hover:bg-orange-500/20 transition-all group border-r border-neonCyan/10 relative"
                    >
                        <span className="absolute bottom-2 left-2 text-[10px] font-heading text-orange-500 uppercase bg-black/70 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Maint.</span>
                    </button>

                    {/* DEPT 4: CANTEEN (Bottom Right) */}
                    <button 
                        onClick={() => handleAllocate('CANTEEN')}
                        className="flex flex-col items-center justify-center hover:bg-purple-500/20 transition-all group relative"
                    >
                        <span className="absolute bottom-2 right-2 text-[10px] font-heading text-purple-500 uppercase bg-black/70 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Canteen</span>
                    </button>
                </div>
            </div>
            
            <div className="text-center mt-2 text-xs font-mono text-gray-500">
                {ui.ALLOCATE} (Tap Department on Map)
            </div>
        </div>

      </div>
    </div>
  );
};

export default AllocationGame;
