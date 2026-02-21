import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { ReconciliationScenario } from '../../data/phase14';

interface ReconciliationSuiteProps {
    scenarios: ReconciliationScenario[];
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const ReconciliationSuite: React.FC<ReconciliationSuiteProps> = ({
    scenarios, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);

    // User Inputs for the Reconciling Bridge
    const [inputInvChange, setInputInvChange] = useState<number | ''>('');
    const [inputOar, setInputOar] = useState<number | ''>('');
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const scenario = scenarios[currentIndex];

    const handleVerify = () => {
        // Correct answers
        const correctInvChange = Math.abs(scenario.closingInventory - scenario.openingInventory);
        const correctOar = scenario.fixedOAR;
        const profitDiff = Math.abs(scenario.expectedAbsorptionProfit - scenario.expectedMarginalProfit);

        if (Number(inputInvChange) === correctInvChange && Number(inputOar) === correctOar) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? `BALANCED! Difference of $${profitDiff} explained.` : `CÂN BẰNG! Đã giải trình chênh lệch $${profitDiff}.`
            });
            setScore(s => s + 1);
            onCorrect();

            setTimeout(() => {
                setFeedback(null);
                setInputInvChange('');
                setInputOar('');
                if (currentIndex < scenarios.length - 1) {
                    setCurrentIndex(idx => idx + 1);
                } else {
                    onComplete(score + 1);
                }
            }, 3000);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? "ERROR: Bridge collapsed. Check your math." : "LỖI: Sập cầu. Kiểm tra lại toán."
            });
            onIncorrect();
            setTimeout(() => setFeedback(null), 2000);
        }
    };

    const t = {
        title: language === 'EN' ? 'THE RECONCILIATION BRIDGE' : 'CÂY CẦU ĐỐI CHIẾU',
        abs: language === 'EN' ? 'ABSORPTION COSTING' : 'TÍNH THEO TOÀN BỘ',
        mar: language === 'EN' ? 'MARGINAL COSTING' : 'TÍNH THEO ĐẢM PHÍ',
        opening: language === 'EN' ? 'Opening Inv (Units)' : 'Tồn Đầu Kỳ (SP)',
        prod: language === 'EN' ? 'Production (Units)' : 'Sản Xuất (SP)',
        sales: language === 'EN' ? 'Sales (Units)' : 'Tiêu Thụ (SP)',
        closing: language === 'EN' ? 'Closing Inv (Units)' : 'Tồn Cuối Kỳ (SP)',
        profit: language === 'EN' ? 'REPORTED PROFIT' : 'LỢI NHUẬN BÁO CÁO',
        bridge_q: language === 'EN' ? 'Reconcile the $ Gap' : 'Giải trình Khoảng trống $',
        inv_diff: language === 'EN' ? 'Change in Inventory (Units)' : 'Chênh lệch Tồn kho (SP)',
        oar_rate: language === 'EN' ? 'Fixed OAR ($/Unit)' : 'Hệ số OAR Cố định ($/SP)',
        verify: language === 'EN' ? 'TEST BRIDGE' : 'KIỂM TRA CẦU'
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 overflow-y-auto pt-20 pb-10 px-4">
            <div className="w-full max-w-5xl flex flex-col gap-6">

                {/* Header / Info */}
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-heading text-neonCyan tracking-widest uppercase mb-2">
                        {t.title} - Level {currentIndex + 1}
                    </h2>
                    <p className="text-white font-bold">{scenario.title[language]}</p>
                    <p className="text-gray-400 font-mono text-sm">{scenario.description[language]}</p>
                </div>

                {/* Top Row: The Dual Books split screen */}
                <div className="flex flex-col md:flex-row gap-4 border border-gray-700 rounded-lg p-1 bg-gray-900/50">
                    {/* Book 1: Absorption */}
                    <div className="flex-1 bg-black border border-neonPink p-6 rounded relative">
                        <div className="absolute top-0 right-0 bg-neonPink text-black font-bold px-3 py-1 text-xs">OPS REPORT</div>
                        <h3 className="text-xl text-neonPink font-heading mb-4">{t.abs}</h3>

                        <div className="space-y-2 font-mono text-sm text-gray-300">
                            <div className="flex justify-between"><span>{t.opening}:</span> <span>{scenario.openingInventory}</span></div>
                            <div className="flex justify-between"><span>{t.prod}:</span> <span>{scenario.productionUnits}</span></div>
                            <div className="flex justify-between border-b border-gray-700 pb-2"><span>{t.sales}:</span> <span>{scenario.salesUnits}</span></div>
                            <div className="flex justify-between items-end pt-2 text-neonPink text-lg mt-4 font-bold border-t border-neonPink border-dashed pt-4">
                                <span>{t.profit}:</span>
                                <span>${scenario.expectedAbsorptionProfit.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Conflict Center */}
                    <div className="hidden md:flex flex-col items-center justify-center px-4">
                        <div className="text-4xl text-yellow-500 font-bold animate-pulse">VS</div>
                        <div className="text-xs text-gray-500 mt-2">Find the Gap</div>
                    </div>

                    {/* Book 2: Marginal */}
                    <div className="flex-1 bg-black border border-neonCyan p-6 rounded relative">
                        <div className="absolute top-0 right-0 bg-neonCyan text-black font-bold px-3 py-1 text-xs">CFO REPORT</div>
                        <h3 className="text-xl text-neonCyan font-heading mb-4">{t.mar}</h3>

                        <div className="space-y-2 font-mono text-sm text-gray-300">
                            <div className="flex justify-between"><span>{t.opening}:</span> <span>{scenario.openingInventory}</span></div>
                            <div className="flex justify-between"><span>{t.prod}:</span> <span>{scenario.productionUnits}</span></div>
                            <div className="flex justify-between border-b border-gray-700 pb-2"><span>{t.sales}:</span> <span>{scenario.salesUnits}</span></div>
                            <div className="flex justify-between items-end pt-2 text-neonCyan text-lg mt-4 font-bold border-t border-neonCyan border-dashed pt-4">
                                <span>{t.profit}:</span>
                                <span>${scenario.expectedMarginalProfit.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: The Builder (Reconciliation) */}
                <div className="bg-obsidian border-2 border-white/20 p-6 md:p-8 flex flex-col items-center justify-center text-center">
                    <h4 className="text-lg text-yellow-400 font-bold mb-6">{t.bridge_q}: ${Math.abs(scenario.expectedAbsorptionProfit - scenario.expectedMarginalProfit).toLocaleString()}</h4>

                    <div className="flex flex-col md:flex-row gap-6 items-center w-full max-w-2xl">
                        <div className="flex-1 w-full text-left">
                            <label className="block text-xs font-mono text-gray-400 mb-1">{t.inv_diff}</label>
                            <input
                                type="number"
                                className="w-full bg-black border border-gray-600 text-white p-3 font-mono text-center focus:border-yellow-400 outline-none"
                                value={inputInvChange}
                                onChange={(e) => setInputInvChange(e.target.value ? Number(e.target.value) : '')}
                                placeholder="e.g. 1000"
                            />
                        </div>

                        <div className="text-2xl font-bold text-gray-600">X</div>

                        <div className="flex-1 w-full text-left">
                            <label className="block text-xs font-mono text-gray-400 mb-1">{t.oar_rate}</label>
                            <input
                                type="number"
                                className="w-full bg-black border border-gray-600 text-white p-3 font-mono text-center focus:border-yellow-400 outline-none"
                                value={inputOar}
                                onChange={(e) => setInputOar(e.target.value ? Number(e.target.value) : '')}
                                placeholder="e.g. 10"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        {feedback ? (
                            <div className={`text-xl font-bold animate-pulse px-8 py-3 bg-black border-2 ${feedback.type === 'success' ? 'text-neonCyan border-neonCyan' : 'text-red-500 border-red-500'}`}>
                                {feedback.msg}
                            </div>
                        ) : (
                            <button
                                onClick={handleVerify}
                                disabled={inputInvChange === '' || inputOar === ''}
                                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest px-12 py-3 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t.verify}
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReconciliationSuite;
