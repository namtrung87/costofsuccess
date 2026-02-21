
import React, { useState } from 'react';
import GlassPanel from '../UI/GlassPanel';
import CyberButton from '../UI/CyberButton';
import { useGame } from '../../context/GameContext';
import { UI_STRINGS } from '../../constants';

interface PhaseResultProps {
  score: number;
  maxScore: number;
  title: string;
  feedbackText: string;
  tipText: string;
  onContinue: () => void;
  onRetry: () => void;
  onPractice?: () => void; 
}

const PhaseResult: React.FC<PhaseResultProps> = ({ 
    score, maxScore, title, feedbackText, tipText, onContinue, onRetry, onPractice
}) => {
  const { state } = useGame();
  const ui = UI_STRINGS[state.language];
  const percentage = Math.round((score / maxScore) * 100);
  const isSuccess = percentage >= 60;
  
  // "Flex Receipt" Mode
  const [showReceipt, setShowReceipt] = useState(false);

  if (showReceipt) {
      return (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 p-4" onClick={() => setShowReceipt(false)}>
              <div className="bg-white text-black font-mono w-full max-w-sm p-6 shadow-[0_0_50px_rgba(255,255,255,0.2)] rotate-1 transform hover:rotate-0 transition-transform cursor-pointer relative overflow-hidden">
                  <div className="text-center border-b-2 border-dashed border-black pb-4 mb-4">
                      <h2 className="text-2xl font-black tracking-tighter">NEON DROP STUDIOS</h2>
                      <div className="text-xs">OFFICIAL PERFORMANCE LOG</div>
                      <div className="text-xs mt-1">{new Date().toLocaleDateString()} // {new Date().toLocaleTimeString()}</div>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-6">
                      <div className="flex justify-between">
                          <span>INTERN:</span>
                          <span className="font-bold uppercase">{state.playerName}</span>
                      </div>
                      <div className="flex justify-between">
                          <span>PHASE:</span>
                          <span className="font-bold">{state.currentPhase.replace('PHASE_', '')}</span>
                      </div>
                      <div className="flex justify-between">
                          <span>STATUS:</span>
                          <span className="font-bold">{isSuccess ? 'PASSED' : 'RETRY NEEDED'}</span>
                      </div>
                  </div>

                  <div className="border-y-2 border-black py-4 mb-4">
                      <div className="flex justify-between text-xl font-black">
                          <span>SCORE</span>
                          <span>{percentage}%</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>RAW DATA:</span>
                          <span>{score}/{maxScore}</span>
                      </div>
                  </div>

                  <div className="text-center text-xs mb-6 italic">
                      "{feedbackText}"
                  </div>

                  <div className="text-center border-2 border-black p-2 font-black text-lg rotate-[-2deg]">
                      {isSuccess ? 'CERTIFIED FRESH' : 'SKILL ISSUE'}
                  </div>

                  <div className="text-center text-[10px] mt-4 text-gray-400">
                      Tap anywhere to close
                  </div>
                  
                  {/* Avatar Stamp */}
                  <div className="absolute top-2 right-2 w-16 h-16 opacity-20 grayscale">
                      <img src={state.playerAvatar} alt="Stamp" />
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <GlassPanel intensity="HIGH" className="w-full max-w-lg text-center flex flex-col items-center gap-6 animate-in zoom-in duration-300">
        
        {/* Header */}
        <div>
            <div className="text-neonCyan font-mono text-xs uppercase tracking-widest mb-2">{ui.PHASE_COMPLETE}</div>
            <h2 className="text-3xl font-heading font-black text-white uppercase">{title}</h2>
        </div>

        {/* Score Circle */}
        <div className={`
            w-32 h-32 rounded-full border-8 flex items-center justify-center relative group cursor-pointer
            ${isSuccess ? 'border-neonGreen shadow-[0_0_20px_#39FF14]' : 'border-neonPink shadow-[0_0_20px_#FF0055]'}
        `} onClick={() => isSuccess && setShowReceipt(true)}>
             <div className="text-4xl font-black text-white">{percentage}%</div>
             <div className="absolute -bottom-8 text-xs font-mono text-gray-400 group-hover:text-neonCyan transition-colors">
                 {isSuccess ? '[ VIEW RECEIPT ]' : `${score}/${maxScore}`}
             </div>
        </div>

        {/* Feedback Section */}
        <div className="w-full bg-black/40 p-4 rounded border border-gray-700">
            <h3 className={`font-bold mb-2 uppercase ${isSuccess ? 'text-neonGreen' : 'text-neonPink'}`}>
                {isSuccess ? ui.EXCELLENT : ui.IMPROVE}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {feedbackText}
            </p>
            
            {/* Pro Tip */}
            <div className="border-t border-gray-700 pt-3 mt-2">
                 <div className="flex items-center justify-center gap-2 text-neonCyan font-bold text-xs uppercase mb-1">
                     <span>💡</span> {ui.PRO_TIP}
                 </div>
                 <p className="text-gray-400 text-xs italic">"{tipText}"</p>
            </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col w-full gap-2">
            <div className="flex gap-4 w-full">
                <CyberButton 
                    label={ui.RETRY} 
                    variant="SECONDARY" 
                    onClick={onRetry} 
                    className="flex-1"
                />
                <CyberButton 
                    label={isSuccess ? ui.CONTINUE : ui.PROCEED} 
                    variant="PRIMARY" 
                    onClick={onContinue} 
                    className="flex-1"
                />
            </div>
            
            {/* Integrated Practice Button */}
            {isSuccess && onPractice && (
                 <button 
                    onClick={onPractice}
                    className="w-full py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-white text-xs font-mono uppercase tracking-widest transition-colors mt-2"
                 >
                     [ ENTER PRACTICE LOOP ]
                 </button>
            )}
        </div>

      </GlassPanel>
    </div>
  );
};

export default PhaseResult;
