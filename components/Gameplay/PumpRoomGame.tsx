
import React, { useState, useEffect } from 'react';
import { PumpChallenge } from '../../data/phase8';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { UI_STRINGS, ASSETS } from '../../constants';

interface PumpRoomGameProps {
  challenges: Record<string, PumpChallenge[]>;
  onComplete: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const PumpRoomGame: React.FC<PumpRoomGameProps> = ({ challenges, onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const { playSFX } = useAudio();
  const ui = UI_STRINGS[state.language];

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [step, setStep] = useState<'BASIS' | 'DISTRIBUTE'>('BASIS');
  const [feedback, setFeedback] = useState<string | null>(null);
  
  // Animation States
  const [transferredAmount1, setTransferredAmount1] = useState(0); // For Target 1
  const [transferredAmount2, setTransferredAmount2] = useState(0); // For Target 2
  const [secondaryReceived, setSecondaryReceived] = useState(0); // For Step Down (S2 receives from S1)
  const [isDraining, setIsDraining] = useState(false);

  // Safety Checks
  const currentChallenges = challenges?.[state.language];
  const currentChallenge = currentChallenges?.[currentChallengeIndex];

  if (!currentChallenges || !currentChallenge) {
      return (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50">
              <div className="text-neonCyan animate-pulse font-mono text-xl">INITIALIZING HYDRAULICS...</div>
          </div>
      );
  }

  const isDirect = currentChallenge.method === 'DIRECT';
  const isStepDown = currentChallenge.method === 'STEP_DOWN';
  const isReciprocal = currentChallenge.method === 'RECIPROCAL';

  const handleBasisSelect = (option: { isCorrect: boolean; feedback: string }) => {
    playSFX('CLICK');
    if (option.isCorrect) {
        setFeedback(`${ui.ACCESS_GRANTED}: ${option.feedback}`);
        playSFX('SUCCESS');
        onCorrect();
        setTimeout(() => {
            setFeedback(null);
            setStep('DISTRIBUTE');
        }, 1500);
    } else {
        setFeedback(`${ui.ACCESS_DENIED}: ${option.feedback}`);
        playSFX('ERROR');
        onIncorrect();
        setTimeout(() => setFeedback(null), 1500);
    }
  };

  const handleValveTurn = () => {
    setIsDraining(true);
    playSFX('VALVE');
    
    const duration = 2500;
    
    // Determine Target Amounts based on targets array
    let target1Final = 0;
    let target2Final = 0;
    let s2ReceivedFinal = 0;

    if (isDirect) {
        target1Final = currentChallenge.targets[0]?.correctAmount || 0;
        target2Final = currentChallenge.targets[1]?.correctAmount || 0;
    } else if (isStepDown) {
        // Source 1 drains to -> S2 (Target 0) + Prod A (Target 1) + Prod B (Target 2)
        s2ReceivedFinal = currentChallenge.targets[0]?.correctAmount || 0;
        target1Final = currentChallenge.targets[1]?.correctAmount || 0;
        target2Final = currentChallenge.targets[2]?.correctAmount || 0;
    } else if (isReciprocal) {
        // Visual dummy for Reciprocal
        target1Final = 50000; 
        target2Final = 50000;
    }
    
    let start = Date.now();
    const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        
        setTransferredAmount1(Math.floor(target1Final * progress));
        setTransferredAmount2(Math.floor(target2Final * progress));
        setSecondaryReceived(Math.floor(s2ReceivedFinal * progress));

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            setIsDraining(false);
            playSFX('SUCCESS');
            setTimeout(nextChallenge, 1500);
        }
    };
    requestAnimationFrame(animate);
  };

  const nextChallenge = () => {
      setTransferredAmount1(0);
      setTransferredAmount2(0);
      setSecondaryReceived(0);
      if (currentChallengeIndex < currentChallenges.length - 1) {
          setCurrentChallengeIndex(prev => prev + 1);
          setStep('BASIS');
      } else {
          onComplete();
      }
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
      
      {/* Header */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10">
        <div className="bg-black/80 border border-neonCyan px-4 py-1 rounded text-neonCyan font-mono text-xs">
            MODE: <span className="text-white font-bold">{currentChallenge.method.replace('_', ' ')}</span>
        </div>
        <div className="bg-black/80 border border-gray-600 px-4 py-1 rounded text-gray-400 font-mono text-xs">
            {currentChallengeIndex + 1} / {currentChallenges.length}
        </div>
      </div>

      <div className="w-full max-w-6xl h-full flex flex-col p-4 relative justify-center">
        
        {/* Background Pipe VFX */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <img src={ASSETS.VFX_PIPES} alt="Pipes" className="w-full h-full object-cover" />
        </div>

        {/* --- VISUAL LAYER --- */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 gap-8">
            
            {/* TOP ROW: SERVICE DEPARTMENTS */}
            <div className="flex gap-16 items-end">
                {/* Source Tank 1 */}
                <div className="relative">
                    <div className="w-48 h-32 border-4 border-neonPink rounded-lg bg-gray-900 relative overflow-hidden flex flex-col items-center justify-center z-20">
                        <div 
                            className="absolute bottom-0 left-0 w-full bg-neonPink/50 transition-all duration-[2000ms]"
                            style={{ height: step === 'DISTRIBUTE' && !isDraining && !isReciprocal ? '0%' : '100%' }}
                        />
                        <div className="relative z-30 text-center p-2">
                            <div className="font-heading font-bold text-white text-sm">{currentChallenge.sourceName}</div>
                            <div className="font-mono text-neonPink text-lg">${currentChallenge.totalAmount.toLocaleString()}</div>
                        </div>
                    </div>
                    {/* Pipe Down */}
                    <div className="absolute top-full left-1/2 w-4 h-24 bg-gray-700 -ml-2 border-x border-gray-500">
                        {isDraining && <div className="w-full h-full bg-neonPink/50 animate-pulse" />}
                    </div>
                </div>

                {/* Secondary Source Tank (Step Down / Reciprocal) */}
                {(isStepDown || isReciprocal) && (
                    <div className="relative">
                        <div className="w-48 h-32 border-4 border-purple-500 rounded-lg bg-gray-900 relative overflow-hidden flex flex-col items-center justify-center z-20">
                            {/* Fill from S1 (Step Down) */}
                            {isStepDown && (
                                <div 
                                    className="absolute bottom-0 left-0 w-full bg-neonPink/30 transition-all duration-[2000ms]"
                                    style={{ height: `${(secondaryReceived / 5000) * 100}%` }} // Visual approx
                                />
                            )}
                            <div className="relative z-30 text-center p-2">
                                <div className="font-heading font-bold text-white text-sm">{currentChallenge.secondarySourceName}</div>
                                <div className="font-mono text-purple-400 text-lg">
                                    ${(currentChallenge.secondaryTotalAmount! + secondaryReceived).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        {/* Pipe: S1 -> S2 (Step Down) */}
                        {isStepDown && (
                            <div className="absolute top-1/2 -left-16 w-16 h-4 bg-gray-700 -mt-2 border-y border-gray-500">
                                {isDraining && <div className="w-full h-full bg-neonPink/50 animate-[pulse_0.5s_infinite]" />}
                            </div>
                        )}
                        {/* Pipe: Reciprocal Loop */}
                        {isReciprocal && (
                            <div className="absolute top-1/2 -left-16 w-16 h-8 flex flex-col justify-between">
                                <div className="h-2 w-full bg-gray-700 animate-pulse border border-neonCyan/30"></div>
                                <div className="h-2 w-full bg-gray-700 animate-pulse border border-purple-500/30"></div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* CONTROL PANEL */}
            <div className="z-30 w-full max-w-2xl">
                {step === 'BASIS' ? (
                    <div className="bg-black/80 p-6 rounded-xl border border-white/20 text-center backdrop-blur-sm">
                        <h3 className="text-white font-heading text-lg mb-4">
                            {isDirect ? ui.SELECT_BASIS : (isStepDown ? "SELECT DRAIN ORDER" : "SOLVE EQUATION")}
                        </h3>
                        {isReciprocal && (
                            <div className="mb-4 text-neonCyan font-mono text-sm border p-2 border-neonCyan/30 rounded">
                                {currentChallenge.equationHint}
                            </div>
                        )}
                        <div className="grid grid-cols-1 gap-4">
                            {currentChallenge.basisOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleBasisSelect(opt)}
                                    onMouseEnter={() => playSFX('HOVER')}
                                    className="border border-neonGreen text-neonGreen p-4 rounded hover:bg-neonGreen hover:text-black transition-all font-mono text-sm font-bold"
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                         <button
                            onClick={handleValveTurn}
                            disabled={isDraining}
                            onMouseEnter={() => playSFX('HOVER')}
                            className="px-12 py-6 bg-neonGreen text-black font-heading font-black text-2xl rounded-full hover:bg-white hover:shadow-[0_0_30px_#39FF14] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4 border-4 border-black"
                         >
                            <img src={ASSETS.ICON_GEAR} alt="Valve" className={`w-10 h-10 ${isDraining ? 'animate-spin' : ''}`} />
                            {isDraining ? ui.DRAINING : ui.OPEN_VALVES}
                         </button>
                    </div>
                )}
            </div>

            {/* BOTTOM ROW: PRODUCTION DEPARTMENTS */}
            {(!isReciprocal) && (
                <div className="flex gap-8 w-full justify-center">
                    {/* Target 1 */}
                    <div className="w-40 h-32 border-4 border-neonCyan rounded-lg bg-gray-900 relative overflow-hidden flex flex-col items-center justify-center">
                        <div 
                            className="absolute bottom-0 left-0 w-full bg-neonCyan/40 transition-all duration-[50ms]"
                            style={{ height: isDraining || transferredAmount1 > 0 ? '60%' : '10%' }}
                        />
                        <div className="relative z-20 text-center">
                            <div className="font-heading font-bold text-white text-xs">{isStepDown ? 'CUTTING' : currentChallenge.targets[0]?.name}</div>
                            <div className="font-mono text-neonCyan text-lg">
                                +${transferredAmount1.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Target 2 */}
                    <div className="w-40 h-32 border-4 border-neonCyan rounded-lg bg-gray-900 relative overflow-hidden flex flex-col items-center justify-center">
                        <div 
                            className="absolute bottom-0 left-0 w-full bg-neonCyan/40 transition-all duration-[50ms]"
                            style={{ height: isDraining || transferredAmount2 > 0 ? '80%' : '10%' }}
                        />
                        <div className="relative z-20 text-center">
                            <div className="font-heading font-bold text-white text-xs">{isStepDown ? 'SEWING' : currentChallenge.targets[1]?.name}</div>
                            <div className="font-mono text-neonCyan text-lg">
                                +${transferredAmount2.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

        {/* Feedback Overlay */}
        {feedback && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                 <div className={`
                    px-8 py-4 rounded text-xl font-bold font-mono text-center shadow-2xl animate-bounce border-2 bg-black
                    ${feedback.includes(ui.ACCESS_GRANTED) ? 'text-neonGreen border-neonGreen' : 'text-neonPink border-neonPink'}
                 `}>
                     {feedback}
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default PumpRoomGame;
