
import React, { useState } from 'react';
import { ApportionmentMathProblem } from '../../data/phase6';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { UI_STRINGS } from '../../constants';

interface ApportionmentMathGameProps {
  problems: Record<string, ApportionmentMathProblem[]>;
  onComplete: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const ApportionmentMathGame: React.FC<ApportionmentMathGameProps> = ({ problems, onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const { playSFX } = useAudio();
  const ui = UI_STRINGS[state.language];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentProblems = problems[state.language];
  const problem = currentProblems[currentIdx];

  const handleSubmit = () => {
      const val = parseInt(input);
      if (val === problem.correctAmount) {
          setFeedback(ui.CORRECT);
          playSFX('SUCCESS');
          onCorrect();
          setTimeout(() => {
              setFeedback(null);
              setInput('');
              if (currentIdx < currentProblems.length - 1) {
                  setCurrentIdx(prev => prev + 1);
              } else {
                  onComplete();
              }
          }, 1000);
      } else {
          setFeedback(ui.ERROR);
          playSFX('ERROR');
          onIncorrect();
          setInput('');
          setTimeout(() => setFeedback(null), 1000);
      }
  };

  const handleNumpad = (val: string) => {
      playSFX('CLICK');
      if (val === 'C') setInput('');
      else if (val === 'OK') handleSubmit();
      else setInput(prev => prev + val);
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/90 p-4">
        <div className="bg-gray-900 border-2 border-neonCyan p-8 rounded-xl w-full max-w-2xl flex flex-col gap-6">
            <h2 className="text-2xl font-heading text-neonCyan text-center">{ui.CALCULATE_APPORTIONMENT}</h2>
            
            <div className="bg-black p-4 rounded border border-gray-700 font-mono text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">{ui.TOTAL_COST} ({problem.costName}):</span>
                    <span className="text-white text-xl">${problem.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">{ui.BASIS_TOTAL} ({problem.basisName}):</span>
                    <span className="text-white text-xl">{problem.basisTotal.toLocaleString()}</span>
                </div>
                <div className="w-full h-px bg-gray-700 my-2" />
                <div className="flex justify-between items-center">
                    <span className="text-neonGreen">{ui.DEPT_BASIS} ({problem.targetDept}):</span>
                    <span className="text-neonGreen text-2xl font-bold">{problem.targetBasisValue.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex-1 bg-black border border-neonCyan h-16 flex items-center justify-end px-4 text-3xl font-mono text-white">
                    {input}
                </div>
                <div className="w-24 flex items-center justify-center text-gray-500 text-xs text-center">
                    {problem.hint}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'C', 'OK'].map(key => (
                    <button
                        key={key}
                        onClick={() => handleNumpad(key.toString())}
                        onMouseEnter={() => playSFX('HOVER')}
                        className={`
                            h-12 font-bold rounded transition-all
                            ${key === 'OK' ? 'bg-neonGreen text-black col-span-1' : ''}
                            ${key === 'C' ? 'bg-neonPink text-black' : ''}
                            ${typeof key === 'number' ? 'bg-gray-800 hover:bg-gray-700' : ''}
                        `}
                    >
                        {key}
                    </button>
                ))}
            </div>

            {feedback && (
                <div className={`text-center font-bold text-xl ${feedback === ui.CORRECT ? 'text-neonGreen' : 'text-neonPink'}`}>
                    {feedback}
                </div>
            )}
        </div>
    </div>
  );
};

export default ApportionmentMathGame;
