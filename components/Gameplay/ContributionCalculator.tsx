import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';

interface ContributionCalculatorProps {
    sellingPrice: number;
    totalCost: number;
    variableCost: number;
    fixedCost: number;
    targetContribution: number;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const ContributionCalculator: React.FC<ContributionCalculatorProps> = ({
    sellingPrice,
    totalCost,
    variableCost,
    fixedCost,
    targetContribution,
    onCorrect,
    onIncorrect,
    onComplete,
    language
}) => {
    const { playSFX } = useAudio();
    const [sliderValue, setSliderValue] = useState(0); // 0 to fixedCost
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    // current calculated view
    const remainingCost = totalCost - sliderValue;
    const currentContribution = sellingPrice - remainingCost;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(Number(e.target.value));
        playSFX('HOVER');
    };

    const handleSubmit = () => {
        setIsSubmit(true);
        // Did they peel off exactly the fixed cost? Meaning remainingCost == variableCost
        if (remainingCost === variableCost) {
            playSFX('SUCCESS');
            setFeedback(language === 'EN' ? "CORRECT: Fixed Cost Isolated. Contribution Revealed." : "CHÍNH XÁC: Đã tách Định phí. Lộ diện Đảm phí.");
            onCorrect();
            setTimeout(() => onComplete(10), 2000);
        } else {
            playSFX('ERROR');
            setFeedback(language === 'EN' ? "ERROR: Incorrect Cost Separation. Try again." : "LỖI: Tách chi phí sai. Thử lại.");
            onIncorrect();
            setTimeout(() => {
                setIsSubmit(false);
                setFeedback(null);
            }, 2000);
        }
    };

    const t = {
        title: language === 'EN' ? 'MARGINAL ANALYSIS ENGINE' : 'BỘ TÁCH ĐẢM PHÍ',
        total_cost: language === 'EN' ? 'ABSORPTION COST (TOTAL)' : 'TOÀN BỘ CHI PHÍ (TỔNG)',
        peel_fixed: language === 'EN' ? 'PEEL OFF FIXED COST' : 'BÓC TÁCH ĐỊNH PHÍ',
        var_cost: language === 'EN' ? 'VARIABLE COST' : 'BIẾN PHÍ',
        selling: language === 'EN' ? 'SELLING PRICE' : 'GIÁ BÁN',
        contribution: language === 'EN' ? 'CONTRIBUTION MARGIN' : 'SỐ DƯ ĐẢM PHÍ',
        analyze: language === 'EN' ? 'ANALYZE' : 'PHÂN TÍCH',
        warning: language === 'EN' ? 'WARNING: SELLING BELOW FULL COST' : 'CẢNH BÁO: BÁN DƯỚI GIÁ VỐN TOÀN BỘ',
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl">
            <div className="w-full max-w-2xl bg-black border-2 border-neonCyan p-8 shadow-[0_0_20px_rgba(0,240,255,0.2)] rounded font-mono">
                {/* Header */}
                <div className="text-center mb-8 border-b-2 border-neonCyan pb-4">
                    <h2 className="text-2xl text-neonCyan tracking-widest uppercase animate-pulse">{t.title}</h2>
                    <p className="text-red-500 mt-2 font-bold bg-red-900/20 py-1">{t.warning}</p>
                </div>

                {/* Calculations Display */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    {/* Left Side: Cost Structure */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end border-b border-gray-700 pb-1">
                            <span className="text-gray-400">{t.total_cost}</span>
                            <span className="text-xl text-white">${totalCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-700 pb-1 text-neonPink">
                            <span>- {t.peel_fixed}</span>
                            <span className="text-xl">-${sliderValue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-end border-b-2 border-white pb-1 font-bold">
                            <span className="text-cyan-400">= {t.var_cost}</span>
                            <span className="text-2xl text-cyan-400">${remainingCost.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Right Side: Contribution */}
                    <div className="space-y-4 bg-gray-900/50 p-4 rounded border border-gray-700">
                        <div className="flex justify-between items-end pb-1 border-b border-gray-700">
                            <span className="text-gray-400">{t.selling}</span>
                            <span className="text-xl text-green-400">${sellingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-end pb-1 border-b border-gray-700">
                            <span className="text-gray-400">- {t.var_cost}</span>
                            <span className="text-xl text-cyan-400">-${remainingCost.toFixed(2)}</span>
                        </div>
                        <div className={`flex justify-between items-end pt-2 font-bold ${currentContribution >= 0 ? 'text-neonCyan' : 'text-red-500'}`}>
                            <span className="text-lg">= {t.contribution}</span>
                            <span className="text-3xl">${currentContribution.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Interactive Slider */}
                <div className="mb-10 px-4">
                    <label className="block text-neonPink text-sm mb-4 font-bold tracking-wider text-center uppercase">
                        ◄ {t.peel_fixed} ({fixedCost} Max) ►
                    </label>
                    <input
                        type="range"
                        min="0"
                        max={totalCost} // Let them slide all the way to total cost to make it a puzzle
                        step="1"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-neonPink"
                        disabled={isSubmit}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>$0</span>
                        <span>${totalCost - 1}</span>
                        <span>${totalCost}</span>
                    </div>
                </div>

                {/* Action Area */}
                <div className="text-center">
                    {feedback ? (
                        <div className={`text-xl font-bold animate-pulse ${feedback.includes('RRECT') || feedback.includes('CHÍNH') ? 'text-neonCyan' : 'text-red-500'}`}>
                            {feedback}
                        </div>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="bg-black border-2 border-neonCyan text-neonCyan hover:bg-neonCyan hover:text-black py-3 px-12 font-bold text-xl uppercase tracking-widest transition-all hover:scale-105"
                        >
                            {t.analyze}
                        </button>
                    )}
                </div>
            </div>

            <style>{`
           input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 24px;
                height: 24px;
                background: #FF00FF;
                border: 2px solid #FFF;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 10px #FF00FF;
           }
        `}</style>
        </div>
    );
};

export default ContributionCalculator;
