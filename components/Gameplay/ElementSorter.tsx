
import React, { useState } from 'react';
import { ElementItem, ElementCategory } from '../../data/phase3';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { UI_STRINGS, ASSETS } from '../../constants';

interface ElementSorterProps {
  items: ElementItem[];
  onComplete: (score: number) => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const ElementSorter: React.FC<ElementSorterProps> = ({ items, onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const { playSFX } = useAudio();
  const ui = UI_STRINGS[state.language];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const currentItem = items[currentIndex];

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent) => {
    if (animating) {
        e.preventDefault();
        return;
    }
    setIsDragging(true);
    playSFX('PICKUP');
    // Set a dummy data type to allow dropping
    e.dataTransfer.setData('text/plain', 'item');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, category: ElementCategory) => {
    e.preventDefault();
    setIsDragging(false);
    handleSelect(category);
  };

  const handleSelect = (category: ElementCategory) => {
    if (animating) return;
    setAnimating(true);
    playSFX('DROP');

    const isCorrect = category === currentItem.category;

    if (isCorrect) {
      setFeedback(currentItem.feedback);
      setScore(s => s + 1);
      playSFX('SUCCESS');
      onCorrect();
    } else {
      setFeedback(`Incorrect. That belongs in ${currentItem.category}.`);
      playSFX('ERROR');
      onIncorrect();
    }

    setTimeout(() => {
      setFeedback(null);
      setAnimating(false);
      
      if (currentIndex < items.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete(score + (isCorrect ? 1 : 0));
      }
    }, 1500);
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
      
      {/* Header */}
      <div className="absolute top-0 w-full p-6 text-center">
        <h2 className="text-neonCyan font-heading text-2xl uppercase tracking-[0.2em] drop-shadow-lg">
           {ui.ELEMENTS_TITLE}
        </h2>
        <div className="text-gray-500 font-mono text-xs mt-1">
           ITEM {currentIndex + 1} / {items.length}
        </div>
      </div>

      {/* Main Item Display - Holographic Card (Draggable) */}
      <div className="relative mb-16">
        <div 
            draggable={!animating}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`
                w-80 h-48 border-2 border-neonCyan/50 bg-black/40 backdrop-blur-xl rounded-lg
                flex items-center justify-center p-6 text-center relative overflow-hidden transition-all duration-300
                ${animating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
                ${!animating ? 'cursor-grab active:cursor-grabbing hover:border-neonCyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]' : ''}
                ${isDragging ? 'opacity-50 border-dashed' : ''}
            `}
        >
            {/* Hologram Scanline */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,240,255,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_2s_linear_infinite] pointer-events-none" />
            
            <div className="flex flex-col items-center pointer-events-none">
                <img src={ASSETS.ICON_BOX} alt="Item" className="w-16 h-16 mb-4 object-contain animate-bounce" />
                <h3 className="text-white font-heading font-bold text-lg leading-tight select-none">
                    {currentItem.name}
                </h3>
                <p className="text-[10px] text-neonCyan font-mono mt-2 animate-pulse">
                    {isDragging ? '>> DRAG TO CLASSIFY >>' : 'DRAG ME'}
                </p>
            </div>
        </div>

        {/* Feedback Overlay */}
        {feedback && (
            <div className="absolute top-full mt-4 w-full text-center animate-pulse">
                <span className={`bg-black border px-4 py-2 text-white text-sm font-mono rounded ${feedback.includes('Incorrect') ? 'border-neonPink text-neonPink' : 'border-neonGreen text-neonGreen'}`}>
                    {feedback}
                </span>
            </div>
        )}
      </div>

      {/* Targets (Droppable) */}
      <div className="flex gap-4 md:gap-8 w-full max-w-4xl justify-center px-4">
          
          {/* Material Button */}
          <button
             onClick={() => handleSelect('MATERIAL')}
             onDragOver={handleDragOver}
             onDrop={(e) => handleDrop(e, 'MATERIAL')}
             disabled={animating}
             className={`
                flex-1 h-32 md:h-40 border-2 rounded-xl flex flex-col items-center justify-center transition-all group
                ${isDragging ? 'border-dashed border-neonCyan bg-neonCyan/20 scale-105' : 'border-neonCyan bg-neonCyan/10 hover:bg-neonCyan/30 hover:-translate-y-2'}
             `}
          >
              <img src={ASSETS.ICON_FABRIC} alt="Material" className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform object-contain pointer-events-none" />
              <div className="font-heading font-bold text-neonCyan text-sm md:text-xl uppercase tracking-widest pointer-events-none">{ui.MATERIAL}</div>
              <div className="text-[10px] text-gray-400 pointer-events-none">{ui.PHYSICAL_INPUT}</div>
          </button>

          {/* Labor Button */}
          <button
             onClick={() => handleSelect('LABOR')}
             onDragOver={handleDragOver}
             onDrop={(e) => handleDrop(e, 'LABOR')}
             disabled={animating}
             className={`
                flex-1 h-32 md:h-40 border-2 rounded-xl flex flex-col items-center justify-center transition-all group
                ${isDragging ? 'border-dashed border-purple-500 bg-purple-500/20 scale-105' : 'border-purple-500 bg-purple-500/10 hover:bg-purple-500/30 hover:-translate-y-2'}
             `}
          >
              <img src={ASSETS.ICON_NEEDLE} alt="Labor" className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform object-contain pointer-events-none" />
              <div className="font-heading font-bold text-purple-500 text-sm md:text-xl uppercase tracking-widest pointer-events-none">{ui.LABOR}</div>
              <div className="text-[10px] text-gray-400 pointer-events-none">{ui.HUMAN_EFFORT}</div>
          </button>

          {/* Expense Button */}
          <button
             onClick={() => handleSelect('EXPENSE')}
             onDragOver={handleDragOver}
             onDrop={(e) => handleDrop(e, 'EXPENSE')}
             disabled={animating}
             className={`
                flex-1 h-32 md:h-40 border-2 rounded-xl flex flex-col items-center justify-center transition-all group
                ${isDragging ? 'border-dashed border-orange-500 bg-orange-500/20 scale-105' : 'border-orange-500 bg-orange-500/10 hover:bg-orange-500/30 hover:-translate-y-2'}
             `}
          >
              <img src={ASSETS.ICON_DATA} alt="Expense" className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform object-contain pointer-events-none" />
              <div className="font-heading font-bold text-orange-500 text-sm md:text-xl uppercase tracking-widest pointer-events-none">{ui.EXPENSE}</div>
              <div className="text-[10px] text-gray-400 pointer-events-none">{ui.DIRECT_CHARGES}</div>
          </button>

      </div>
    </div>
  );
};

export default ElementSorter;
