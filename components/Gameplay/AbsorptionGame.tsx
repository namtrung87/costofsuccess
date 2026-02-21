
import React, { useState } from 'react';
import { OARChallenge, HOODIE_JOB_CARD } from '../../data/phase9';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { UI_STRINGS } from '../../constants';

interface AbsorptionGameProps {
  challenges: Record<string, OARChallenge[]>;
  onComplete: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const AbsorptionGame: React.FC<AbsorptionGameProps> = ({ challenges, onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const { playSFX } = useAudio();
  const ui = UI_STRINGS[state.language];

  const [stage, setStage] = useState<'BASIS' | 'CALC' | 'PRODUCT'>('BASIS');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [calcInput, setCalcInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // Granular Loading State

  const currentChallenges = challenges[state.language];
  const currentChallenge = currentChallenges[currentChallengeIndex];

  // Stage 1: Select Basis
  const handleBasisSelect = (option: { id: string; isCorrect: boolean; feedback: string }) => {
    playSFX('CLICK');
    // Check if ID matches correct basis
    const isCorrect = option.id === currentChallenge.correctBasisId;
    
    if (isCorrect) {
        setFeedback(`${ui.CORRECT}: ${option.feedback}`);
        playSFX('SUCCESS');
        onCorrect();
        setTimeout(() => {
            setFeedback(null);
            setStage('CALC');
        }, 1500);
    } else {
        setFeedback(`${ui.ERROR}: ${option.feedback}`);
        playSFX('ERROR');
        onIncorrect();
        setTimeout(() => setFeedback(null), 1500);
    }
  };

  // Stage 2: Calculate OAR
  const handleCalcSubmit = () => {
      playSFX('CLICK');
      // 2. Input Validation
      if (!calcInput || isNaN(parseFloat(calcInput))) {
          setFeedback(ui.INVALID_NUMBER);
          playSFX('ERROR');
          setTimeout(() => setFeedback(null), 1000);
          return;
      }

      setIsProcessing(true); // 3. Loading Indicator
      
      setTimeout(() => {
          const val = parseFloat(calcInput);
          setIsProcessing(false);

          if (Math.abs(val - currentChallenge.correctOAR) < 0.01) {
              setFeedback(ui.CALC_SUCCESS);
              playSFX('SUCCESS');
              onCorrect();
              setTimeout(() => {
                  setFeedback(null);
                  setCalcInput('');
                  if (currentChallengeIndex < currentChallenges.length - 1) {
                      setCurrentChallengeIndex(prev => prev + 1);
                      setStage('BASIS');
                  } else {
                      setStage('PRODUCT');
                  }
              }, 1500);
          } else {
              setFeedback(ui.CALC_FAIL);
              playSFX('ERROR');
              onIncorrect();
              setCalcInput('');
              setTimeout(() => setFeedback(null), 1500);
          }
      }, 500); // Simulate processing delay
  };

  // Stage 3: Product Application
  const handleProductSubmit = () => {
      playSFX('CLICK');
      // 2. Input Validation
      if (!calcInput || isNaN(parseFloat(calcInput))) {
          setFeedback(ui.INVALID_NUMBER);
          playSFX('ERROR');
          setTimeout(() => setFeedback(null), 1000);
          return;
      }

      setIsProcessing(true);

      setTimeout(() => {
          const val = parseFloat(calcInput);
          setIsProcessing(false);

          if (Math.abs(val - HOODIE_JOB_CARD.correctTotal) < 0.01) {
              setFeedback(ui.VAL_COMPLETE);
              playSFX('SUCCESS');
              onCorrect();
              setTimeout(() => {
                  onComplete();
              }, 1500);
          } else {
              setFeedback(ui.VAL_FAIL);
              playSFX('ERROR');
              onIncorrect();
              setCalcInput('');
              setTimeout(() => setFeedback(null), 1500);
          }
      }, 500);
  };

  const handleNumpad = (val: string) => {
      playSFX('CLICK');
      if (val === 'CLR') {
          setCalcInput('');
      } else if (val === 'ENTER') {
          if (stage === 'CALC') handleCalcSubmit();
          if (stage === 'PRODUCT') handleProductSubmit();
      } else {
          setCalcInput(prev => prev + val);
      }
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/95 text-black font-mono">
      
      {/* HUD Header */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center border-b-2 border-black bg-gray-100">
        <div className="font-heading font-black text-xl tracking-tighter">{ui.VALUATION}</div>
        <div className="bg-black text-white px-3 py-1 text-xs rounded">
            MODE: {stage === 'PRODUCT' ? 'PRODUCT COSTING' : 'RATE CALCULATION'}
        </div>
      </div>

      <div className="w-full max-w-4xl p-6 flex flex-col md:flex-row gap-8 items-center justify-center h-full">

        {/* LEFT: CONTEXT / INFO */}
        <div className="flex-1 w-full max-w-md">
            {stage !== 'PRODUCT' ? (
                <div className="border-4 border-black p-6 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-2xl font-black mb-4 bg-black text-white inline-block px-2">
                        {currentChallenge.departmentName}
                    </h2>
                    <p className="mb-4 text-sm font-bold text-gray-600 uppercase">{currentChallenge.description}</p>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span>{ui.BUDGET_OH}:</span>
                            <span className="font-bold text-xl">${currentChallenge.budgetedOverhead.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span>{ui.BUDGET_ACT}:</span>
                            <span className="font-bold text-xl">{currentChallenge.budgetedActivity.toLocaleString()} {stage === 'CALC' ? currentChallenge.activityLabel : ''}</span>
                        </div>
                    </div>

                    {stage === 'CALC' && (
                        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 text-center">
                            <div className="text-xs text-gray-500 mb-1">FORMULA</div>
                            <div className="text-lg font-bold">{ui.FORMULA_HINT}</div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="border-4 border-black p-6 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-4xl opacity-10">🧥</div>
                    <h2 className="text-2xl font-black mb-4 bg-neonCyan text-black border border-black inline-block px-2">
                        JOB CARD #001
                    </h2>
                    <div className="space-y-4 text-sm">
                        <div className="p-2 border border-black bg-gray-50">
                            <div className="font-bold">CUTTING DEPT ABSORPTION</div>
                            <div className="flex justify-between mt-1">
                                <span>{HOODIE_JOB_CARD.cuttingUsage} Machine Hrs @ $35.00</span>
                                <span className="font-bold text-lg">= ${(HOODIE_JOB_CARD.cuttingUsage * 35).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="p-2 border border-black bg-gray-50">
                            <div className="font-bold">SEWING DEPT ABSORPTION</div>
                            <div className="flex justify-between mt-1">
                                <span>{HOODIE_JOB_CARD.sewingUsage} Labor Hrs @ $32.50</span>
                                <span className="font-bold text-lg">= ${(HOODIE_JOB_CARD.sewingUsage * 32.50).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t-2 border-black flex justify-between items-center">
                            <span className="font-black text-xl">TOTAL OVERHEAD:</span>
                            <span className="font-black text-2xl text-neonPink">?</span>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* RIGHT: INTERACTION */}
        <div className="flex-1 w-full max-w-md flex flex-col items-center">
            
            {stage === 'BASIS' && (
                <div className="w-full space-y-4">
                    <h3 className="text-center font-bold mb-4 bg-black text-white py-2">{ui.SELECT_BASIS}</h3>
                    {currentChallenge.basisOptions.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => handleBasisSelect(opt)}
                            onMouseEnter={() => playSFX('HOVER')}
                            className="w-full py-4 border-2 border-black font-bold hover:bg-neonGreen hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                        >
                            {opt.text}
                        </button>
                    ))}
                </div>
            )}

            {(stage === 'CALC' || stage === 'PRODUCT') && (
                <div className="bg-gray-200 p-4 rounded-xl border-4 border-gray-400 shadow-inner w-64 relative">
                    {/* Screen */}
                    <div className="bg-[#9ea792] h-16 mb-4 border-2 border-gray-500 shadow-inner flex items-center justify-end px-4 font-mono text-3xl tracking-widest text-black/80">
                        {isProcessing ? <span className="animate-pulse">...</span> : (calcInput || '0')}
                    </div>

                    {/* Keypad */}
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'CLR'].map((key) => (
                            <button
                                key={key}
                                onClick={() => handleNumpad(key.toString())}
                                disabled={isProcessing}
                                onMouseEnter={() => playSFX('HOVER')}
                                className={`
                                    h-12 font-bold rounded shadow-[0_2px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] active:shadow-none transition-all
                                    ${key === 'CLR' ? 'bg-red-400 text-white' : 'bg-gray-100 text-black'}
                                `}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => handleNumpad('ENTER')}
                        disabled={isProcessing}
                        onMouseEnter={() => playSFX('HOVER')}
                        className="w-full mt-2 h-12 bg-neonGreen font-bold rounded shadow-[0_2px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] active:shadow-none transition-all border border-black flex items-center justify-center"
                    >
                        {isProcessing ? 'wait...' : 'ENTER'}
                    </button>
                </div>
            )}

            {feedback && (
                <div className={`mt-6 px-4 py-2 font-bold text-white uppercase animate-bounce ${feedback.includes(ui.CORRECT) || feedback.includes(ui.CALC_SUCCESS) || feedback.includes(ui.VAL_COMPLETE) ? 'bg-neonGreen text-black' : 'bg-neonPink'}`}>
                    {feedback}
                </div>
            )}

        </div>

      </div>
    </div>
  );
};

export default AbsorptionGame;
