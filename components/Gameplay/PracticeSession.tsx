import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { UI_STRINGS } from '../../constants';
import QuizInterface from './QuizInterface';
import SortingGame from './SortingGame';
import ElementSorter from './ElementSorter';
import TraceabilityGame from './TraceabilityGame';
import AllocationGame from './AllocationGame';
// Import Data
import { PHASE1_QUIZ } from '../../data/phase1';
import { SORTING_ITEMS } from '../../data/phase2';
import { ELEMENT_ITEMS } from '../../data/phase3';
import { TRACEABILITY_ITEMS } from '../../data/phase4';
import { ALLOCATION_ITEMS } from '../../data/phase5';

const PracticeSession: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { state, dispatch } = useGame();
  const ui = UI_STRINGS[state.language];
  const lang = state.language;

  // Simple State Machine for Random Drills
  const [mode, setMode] = useState<'MENU' | 'QUIZ' | 'SORT' | 'ELEMENTS' | 'TRACE' | 'ALLOC'>('MENU');
  
  const handleRandom = () => {
      const modes = ['QUIZ', 'SORT', 'ELEMENTS', 'TRACE', 'ALLOC'] as const;
      const r = modes[Math.floor(Math.random() * modes.length)];
      setMode(r);
  };

  const handleComplete = () => {
      setMode('MENU');
  };

  const handleExit = () => {
      // Dispatch action to return to previous phase
      dispatch({ type: 'EXIT_PRACTICE' });
  };

  return (
    <div className="absolute inset-0 z-50 bg-black text-white flex flex-col items-center justify-center">
        {mode === 'MENU' && (
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-heading text-neonCyan">{ui.PRACTICE_MODE}</h1>
                <p className="text-gray-400 font-mono">{ui.PRACTICE_DESC}</p>
                <button onClick={handleRandom} className="block w-64 py-4 bg-neonGreen text-black font-bold rounded hover:scale-105 transition-transform">
                    RANDOM DRILL
                </button>
                <button onClick={handleExit} className="block w-64 py-4 border border-red-500 text-red-500 font-bold rounded hover:bg-red-500/10">
                    {ui.EXIT_PRACTICE}
                </button>
            </div>
        )}

        {mode === 'QUIZ' && (
            <QuizInterface 
                question={PHASE1_QUIZ[lang][Math.floor(Math.random() * PHASE1_QUIZ[lang].length)]}
                onComplete={handleComplete}
            />
        )}
        
        {mode === 'SORT' && (
            <SortingGame 
                items={SORTING_ITEMS[lang]}
                onComplete={handleComplete}
                onCorrect={() => {}} 
                onIncorrect={() => {}}
            />
        )}

        {mode === 'ELEMENTS' && (
            <ElementSorter 
                items={ELEMENT_ITEMS[lang]}
                onComplete={handleComplete}
                onCorrect={() => {}}
                onIncorrect={() => {}}
            />
        )}

        {mode === 'TRACE' && (
            <TraceabilityGame 
                items={TRACEABILITY_ITEMS[lang]}
                onComplete={handleComplete}
                onCorrect={() => {}}
                onIncorrect={() => {}}
            />
        )}

        {mode === 'ALLOC' && (
            <AllocationGame 
                items={ALLOCATION_ITEMS[lang]}
                onComplete={handleComplete}
                onCorrect={() => {}}
                onIncorrect={() => {}}
            />
        )}
    </div>
  );
};

export default PracticeSession;