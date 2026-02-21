
import React, { useState } from 'react';
import { RealityChallenge } from '../../data/phase10';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { UI_STRINGS } from '../../constants';

interface RealityCheckGameProps {
  challenges: RealityChallenge[];
  onComplete: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const RealityCheckGame: React.FC<RealityCheckGameProps> = ({ challenges, onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const { playSFX } = useAudio();
  const ui = UI_STRINGS[state.language];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [step, setStep] = useState<'CALC' | 'DECIDE'>('CALC');
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [calcResult, setCalcResult] = useState<number | null>(null);

  const currentChallenge = challenges[currentIdx];

  if (!currentChallenge) return null;

  const handleCalcSubmit = () => {
      const val = parseFloat(input);
      // Validate calculation
      if (Math.abs(val - currentChallenge.correctAbsorbed) < 0.1) {
          playSFX('SUCCESS');
          setCalcResult(val);
          setStep('DECIDE');
          setFeedback(null);
          setInput('');
      } else {
          playSFX('ERROR');
          onIncorrect();
          setFeedback("MATH ERROR. Formula: Actual Hours × OAR");
          setInput('');
          setTimeout(() => setFeedback(null), 1500);
      }
  };

  const handleDecision = (type: 'UNDER' | 'OVER') => {
      playSFX('CLICK');
      if (type === currentChallenge.varianceType) {
          playSFX('SUCCESS');
          setFeedback(currentChallenge.explanation);
          onCorrect();
          
          setTimeout(() => {
              setFeedback(null);
              setCalcResult(null);
              setStep('CALC');
              if (currentIdx < challenges.length - 1) {
                  setCurrentIdx(prev => prev + 1);
              } else {
                  onComplete();
              }
          }, 4000); 
      } else {
          playSFX('ERROR');
          onIncorrect();
          setFeedback(type === 'UNDER' ? "Incorrect. We put MORE tokens in the bucket than cash paid out." : "Incorrect. We paid more cash than we put tokens in.");
          setTimeout(() => setFeedback(null), 2500);
      }
  };

  const handleNumpad = (val: string) => {
      playSFX('CLICK');
      if (val === 'C') setInput('');
      else if (val === 'OK') handleCalcSubmit();
      else setInput(prev => prev + val);
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4">
        
        {/* Header */}
        <div className="absolute top-0 w-full p-4 flex justify-center z-10">
            <div className="bg-black border border-neonPink px-8 py-2 rounded text-neonPink font-heading text-xl uppercase tracking-widest animate-pulse">
                RECONCILIATION: {currentChallenge.departmentName}
            </div>
        </div>

        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center justify-center mt-12">
            
            {/* LEFT: DATA CARD */}
            <div className="bg-gray-900 border-2 border-gray-700 p-6 rounded-xl w-full max-w-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neonCyan" />
                
                <h3 className="text-white font-heading text-lg mb-4 border-b border-gray-700 pb-2">THE DATA</h3>
                
                <div className="text-xs text-gray-400 mb-4 italic">
                    {currentChallenge.context}
                </div>

                <div className="space-y-4 font-mono text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Predetermined OAR</span>
                        <span className="text-neonCyan bg-black px-2 py-1 rounded">${currentChallenge.oar.toFixed(2)} / hr</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Actual Hours Worked</span>
                        <span className="text-white bg-black px-2 py-1 rounded">{currentChallenge.actualHours.toLocaleString()} hrs</span>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4 mt-4">
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">THE REALITY (BILL)</div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">Actual Overhead Incurred</span>
                            <span className="text-neonPink font-bold text-lg">${currentChallenge.actualOverhead.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    {calcResult !== null && (
                        <div className="border-t border-gray-700 pt-4 mt-4 animate-in fade-in slide-in-from-top-2">
                            <div className="text-xs text-neonGreen uppercase tracking-widest mb-1">THE APPLIED COST</div>
                            <div className="flex justify-between items-center">
                                <span className="text-neonGreen">Absorbed Overhead</span>
                                <span className="text-neonGreen font-bold text-lg">${calcResult.toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: INTERACTION AREA */}
            <div className="w-full max-w-md flex flex-col items-center gap-6">
                
                {step === 'CALC' ? (
                    <>
                        <div className="text-white text-center">
                            <div className="font-heading text-lg uppercase text-neonCyan mb-1">STEP 1: CALCULATE</div>
                            <div className="text-sm font-mono text-gray-300 italic">"{currentChallenge.promptStep1}"</div>
                            <div className="text-xs font-mono text-gray-500 mt-1">(Formula: Actual Hours × OAR)</div>
                        </div>
                        
                        <div className="bg-black border border-neonCyan h-16 w-full flex items-center justify-end px-4 text-3xl font-mono text-white mb-2 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                            {input}
                        </div>

                        <div className="grid grid-cols-3 gap-2 w-full">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'C', 'OK'].map(key => (
                                <button
                                    key={key}
                                    onClick={() => handleNumpad(key.toString())}
                                    className={`
                                        h-14 font-bold rounded transition-all text-xl font-mono
                                        ${key === 'OK' ? 'bg-neonCyan text-black col-span-1 shadow-neon-cyan hover:scale-105' : ''}
                                        ${key === 'C' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'}
                                    `}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="animate-in zoom-in duration-300 w-full flex flex-col gap-4">
                        <div className="text-white text-center mb-2">
                            <div className="font-heading text-lg uppercase text-neonPink mb-1">STEP 2: COMPARE</div>
                            <div className="text-sm font-mono text-gray-300 italic">"{currentChallenge.promptStep2}"</div>
                        </div>
                        
                        <div className="flex justify-between text-sm font-mono bg-black p-4 rounded border border-gray-600">
                            <div className="text-center">
                                <div className="text-gray-500">ABSORBED</div>
                                <div className="text-neonGreen">${calcResult?.toLocaleString()}</div>
                            </div>
                            <div className="text-white font-bold self-center">VS</div>
                            <div className="text-center">
                                <div className="text-gray-500">ACTUAL</div>
                                <div className="text-neonPink">${currentChallenge.actualOverhead.toLocaleString()}</div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleDecision('UNDER')}
                            className="w-full py-6 bg-black border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-all font-black text-xl uppercase rounded-lg group relative overflow-hidden"
                        >
                            <span className="relative z-10">UNDER-ABSORBED</span>
                            <div className="text-xs font-mono group-hover:text-black text-gray-500 mt-1 relative z-10">Absorbed &lt; Actual (LOSS)</div>
                        </button>

                        <button
                            onClick={() => handleDecision('OVER')}
                            className="w-full py-6 bg-black border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all font-black text-xl uppercase rounded-lg group relative overflow-hidden"
                        >
                            <span className="relative z-10">OVER-ABSORBED</span>
                            <div className="text-xs font-mono group-hover:text-black text-gray-500 mt-1 relative z-10">Absorbed &gt; Actual (GAIN)</div>
                        </button>
                    </div>
                )}

                {feedback && (
                    <div className={`text-center font-bold px-4 py-4 rounded animate-bounce w-full border text-sm leading-relaxed ${feedback.includes('Correct') || feedback.includes('Exactly') ? 'bg-neonGreen text-black border-neonGreen' : 'bg-black text-neonPink border-neonPink'}`}>
                        {feedback}
                    </div>
                )}
            </div>

        </div>
    </div>
  );
};

export default RealityCheckGame;
