import React, { useState } from 'react';
import GlassPanel from './GlassPanel';
import CyberButton from './CyberButton';
import { useGame } from '../../context/GameContext';
import { UI_STRINGS } from '../../constants';

interface TutorialOverlayProps {
  title: string;
  steps: string[];
  onComplete: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ title, steps, onComplete }) => {
  const { state } = useGame();
  const ui = UI_STRINGS[state.language];
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="absolute inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4">
      <GlassPanel intensity="HIGH" border="GREEN" className="w-full max-w-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-neonGreen/30 pb-2">
            <h2 className="text-xl font-heading text-neonGreen tracking-widest uppercase">{title}</h2>
            <div className="text-xs font-mono text-gray-400">
                STEP {currentStep + 1}/{steps.length}
            </div>
        </div>

        {/* Content */}
        <div className="min-h-[150px] flex items-center justify-center text-center">
            <p className="text-white font-body text-lg leading-relaxed animate-in fade-in slide-in-from-right duration-300 key={currentStep}">
                {steps[currentStep]}
            </p>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-end">
            <CyberButton 
                label={currentStep < steps.length - 1 ? ui.NEXT : ui.START_SIM} 
                onClick={handleNext} 
            />
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-neonGreen transition-all duration-300" 
             style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} 
        />

      </GlassPanel>
    </div>
  );
};

export default TutorialOverlay;