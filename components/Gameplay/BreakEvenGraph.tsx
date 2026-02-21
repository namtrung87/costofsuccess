import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { BreakEvenScenario } from '../../data/phase15';

interface BreakEvenGraphProps {
    scenario: BreakEvenScenario;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const BreakEvenGraph: React.FC<BreakEvenGraphProps> = ({
    scenario, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [currentUnits, setCurrentUnits] = useState(0);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const { sellingPrice, variableCost, fixedCost, maxUnits } = scenario;

    // Real-time calculations
    const totalRevenue = sellingPrice * currentUnits;
    const totalVariableCost = variableCost * currentUnits;
    const totalCost = fixedCost + totalVariableCost;
    const currentProfit = totalRevenue - totalCost;

    // Pre-calculated target
    const contributionPerUnit = sellingPrice - variableCost;
    const breakEvenUnits = fixedCost / contributionPerUnit;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUnits(Number(e.target.value));
        if (Math.abs(Number(e.target.value) - breakEvenUnits) < maxUnits * 0.05) {
            // Optional: play a faint click or hover when near BEP
        }
    };

    const handleVerify = () => {
        setIsSubmit(true);
        if (currentUnits === breakEvenUnits) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? `PERFECT INTERSECTION: ${breakEvenUnits} Units.` : `GIAO CẮT HOÀN HẢO: ${breakEvenUnits} SP.`
            });
            onCorrect();
            setTimeout(() => onComplete(10), 3000);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? "INCORRECT. Profit is not ZERO. Adjust the slider." : "SAI. Lợi nhuận chưa bằng KHÔNG. Kéo lại thanh trượt."
            });
            onIncorrect();
            setTimeout(() => {
                setFeedback(null);
                setIsSubmit(false);
            }, 2000);
        }
    };

    const t = {
        title: language === 'EN' ? 'THE BREAK-EVEN CANVAS' : 'BẢNG VẼ HÒA VỐN',
        units: language === 'EN' ? 'UNITS SOLD' : 'SẢN LƯỢNG TIÊU THỤ',
        rev: language === 'EN' ? 'REVENUE' : 'DOANH THU',
        fixed: language === 'EN' ? 'FIXED COST' : 'ĐỊNH PHÍ',
        var_cost: language === 'EN' ? 'VARIABLE COST' : 'BIẾN PHÍ',
        total_cost: language === 'EN' ? 'TOTAL COST' : 'TỔNG CHI PHÍ',
        profit: language === 'EN' ? 'NET PROFIT/LOSS' : 'LÃI/LỖ RÒNG',
        verify: language === 'EN' ? 'LOCK IN TARGET' : 'CHỐT MỤC TIÊU',
        inst: language === 'EN' ? 'Find the volume where Profit is precisely $0.' : 'Tìm mức sản lượng mà Lợi nhuận bằng $0 tròn trĩnh.'
    };

    // Simple Graph Scaling logic (0 to MaxUnits)
    const percentRevenue = (totalRevenue / (sellingPrice * maxUnits)) * 100;
    const percentTotalCost = (totalCost / (sellingPrice * maxUnits)) * 100;
    const percentFixedCost = (fixedCost / (sellingPrice * maxUnits)) * 100;

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 overflow-hidden font-mono p-4 md:p-10">

            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-4xl text-neonCyan tracking-widest uppercase mb-2">{t.title}</h2>
                <p className="text-gray-400">{t.inst}</p>
            </div>

            {/* Dashboard Grid */}
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 bg-gray-900 border border-gray-700 p-6 rounded-lg mb-8 shadow-[0_0_30px_rgba(0,0,0,1)]">

                {/* Left: Financial Readout */}
                <div className="space-y-4">
                    <div className="bg-black border-2 border-neonCyan p-4">
                        <p className="text-xs text-neonCyan">{t.units}</p>
                        <p className="text-3xl font-bold font-heading text-white">{currentUnits.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-300 pl-2">
                        <div className="flex justify-between">
                            <span>{t.rev} (${sellingPrice}/u):</span>
                            <span className="text-green-400">${totalRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t.var_cost} (${variableCost}/u):</span>
                            <span className="text-red-400">-${totalVariableCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span>{t.fixed}:</span>
                            <span className="text-red-400">-${fixedCost.toLocaleString()}</span>
                        </div>
                        <div className={`flex justify-between items-end pt-2 text-lg font-bold ${currentProfit >= 0 ? 'text-neonCyan' : 'text-red-500'}`}>
                            <span>{t.profit}:</span>
                            <span className="text-2xl">${currentProfit.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Right: The Data Bars (Pseudo-Graph) */}
                <div className="flex flex-col justify-center gap-6 relative p-4 border-l border-gray-700 w-full h-full min-h-[200px]">

                    {/* Break Even Marker (Visual Hint for the player if they look closely at the math, but hidden visually unless matched) */}

                    <div className="w-full">
                        <p className="text-xs text-green-400 mb-1">{t.rev}</p>
                        <div className="w-full h-6 bg-gray-800 rounded relative overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 ease-out shadow-[0_0_10px_#22c55e]"
                                style={{ width: `${percentRevenue}%` }}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <p className="text-xs text-yellow-400 mb-1">{t.total_cost}</p>
                        <div className="w-full h-6 bg-gray-800 rounded relative overflow-hidden">
                            {/* Total Cost Bar */}
                            <div
                                className="absolute top-0 left-0 h-full bg-yellow-500 transition-all duration-300 ease-out shadow-[0_0_10px_#eab308]"
                                style={{ width: `${percentTotalCost}%` }}
                            />
                            {/* Fixed Cost Baseline Marker inside the Total Cost bar */}
                            <div
                                className="absolute top-0 left-0 h-full bg-red-600/50 border-r border-red-500"
                                style={{ width: `${(percentFixedCost / percentTotalCost) * 100}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">Red tint = Fixed Cost floor</p>
                    </div>

                    {/* Visual indicator of intersection */}
                    {currentProfit === 0 && currentUnits > 0 && (
                        <div className="absolute inset-0 border-4 border-neonCyan rounded pointer-events-none animate-pulse opacity-50" />
                    )}

                </div>
            </div>

            {/* The CVP Slider */}
            <div className="w-full max-w-4xl px-4 mb-8">
                <input
                    type="range"
                    min="0"
                    max={maxUnits}
                    step="100"
                    value={currentUnits}
                    onChange={handleSliderChange}
                    disabled={isSubmit}
                    className="w-full h-4 bg-gray-800 rounded-lg appearance-none cursor-pointer border border-gray-600 focus:border-neonCyan"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0</span>
                    <span>{maxUnits / 2}</span>
                    <span>{maxUnits}</span>
                </div>
            </div>

            {/* Action Area */}
            <div className="text-center h-20">
                {feedback ? (
                    <div className={`text-xl md:text-2xl font-bold animate-pulse px-8 py-4 bg-black border-2 shadow-[0_0_20px_currentColor] ${feedback.type === 'success' ? 'text-neonCyan border-neonCyan' : 'text-red-500 border-red-500'}`}>
                        {feedback.msg}
                    </div>
                ) : (
                    <button
                        onClick={handleVerify}
                        disabled={currentUnits === 0}
                        className="bg-neonCyan text-black font-bold uppercase tracking-widest text-xl px-16 py-4 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,240,255,0.8)]"
                    >
                        {t.verify}
                    </button>
                )}
            </div>

            <style>{`
           input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 32px;
                height: 32px;
                background: #00F0FF;
                border: 2px solid #000;
                border-radius: 4px;
                cursor: pointer;
           }
        `}</style>
        </div>
    );
};

export default BreakEvenGraph;
