import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { FixedOverheadScenario } from '../../data/phase21';

interface FixedOverheadAnalyzerProps {
    scenario: FixedOverheadScenario;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const FixedOverheadAnalyzer: React.FC<FixedOverheadAnalyzerProps> = ({
    scenario, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [expVarInput, setExpVarInput] = useState('');
    const [volVarInput, setVolVarInput] = useState('');
    const [expVarType, setExpVarType] = useState<'F' | 'A' | null>(null);
    const [volVarType, setVolVarType] = useState<'F' | 'A' | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const { budgetedFixedOH, budgetedVolume, actualFixedOH, actualVolume } = scenario;
    const standardRatePerUnit = budgetedFixedOH / budgetedVolume;

    const t = {
        title: language === 'EN' ? 'FIXED OVERHEAD AUDIT' : 'KIỂM TOÁN ĐỊNH PHÍ',
        budgetLabel: language === 'EN' ? 'ANNUAL BUDGET' : 'NGÂN SÁCH NĂM',
        actualLabel: language === 'EN' ? 'ACTUAL PERFORMANCE' : 'KẾT QUẢ THỰC TẾ',
        fixedOH: language === 'EN' ? 'Fixed Overhead' : 'Định phí SX chung',
        volume: language === 'EN' ? 'Volume (Units)' : 'Sản lượng (Đơn vị)',
        stdRate: language === 'EN' ? 'Std. Fixed OH Rate' : 'Đơn giá định phí ĐM',
        expVar: language === 'EN' ? 'FO Expenditure Variance' : 'Biến động Chi tiêu Định phí',
        volVar: language === 'EN' ? 'FO Volume Variance' : 'Biến động Lượng Định phí',
        submit: language === 'EN' ? 'GENERATE OVERHEAD REPORT' : 'LẬP BÁO CÁO ĐỊNH PHÍ',
        expHint: language === 'EN' ? 'Actual FO - Budget FO' : 'Định phí TT - Định phí NS',
        volHint: language === 'EN' ? '(Actual Qty - Budget Qty) * Std. Rate' : '(Lượng TT - Lượng NS) * Đơn giá ĐM'
    };

    const handleVerify = () => {
        setIsSubmit(true);

        const expectedExpVar = actualFixedOH - budgetedFixedOH; // 530k - 500k = 30k (A)
        const expectedVolVar = (actualVolume - budgetedVolume) * standardRatePerUnit; // (5500 - 5000) * 100 = 50k (F)

        const isExpCorrect = Math.abs(parseFloat(expVarInput)) === Math.abs(expectedExpVar) && expVarType === (expectedExpVar >= 0 ? 'A' : 'F');
        const isVolCorrect = Math.abs(parseFloat(volVarInput)) === Math.abs(expectedVolVar) && volVarType === (expectedVolVar >= 0 ? 'F' : 'A');

        if (isExpCorrect && isVolCorrect) {
            playSFX('SUCCESS');
            setFeedback({ type: 'success', msg: language === 'EN' ? 'OVERHEAD ANALYSIS LOCKED. RECONCILIATION PENDING.' : 'PHÂN TÍCH ĐỊNH PHÍ ĐÃ KHÓA. CHỜ ĐỐI CHIẾU.' });
            onCorrect();
            setTimeout(() => onComplete(10), 3000);
        } else {
            playSFX('ERROR');
            setFeedback({ type: 'error', msg: language === 'EN' ? 'DISCREPANCY IN FO CALCULATION.' : 'SAI SỐ TRONG TÍNH TOÁN ĐỊNH PHÍ.' });
            onIncorrect();
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 2000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white overflow-y-auto">
            <div className="max-w-4xl w-full border border-gray-700 bg-[#0a0a0a] rounded p-8 shadow-2xl relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="white">
                        <path d="M10 10 H90 V90 H10 Z" fill="none" stroke="white" strokeWidth="2" />
                        <path d="M20 30 H80 M20 50 H80 M20 70 H80" stroke="white" strokeWidth="1" />
                    </svg>
                </div>

                <h2 className="text-2xl font-heading text-white mb-8 border-b border-gray-800 pb-4 tracking-[0.2em] uppercase">{t.title}</h2>

                <div className="grid md:grid-cols-2 gap-12 mb-10">
                    {/* Left Side: Ledger */}
                    <div className="space-y-6">
                        <div className="bg-gray-900/50 p-6 border-l-4 border-neonCyan">
                            <h3 className="text-xs text-neonCyan uppercase font-bold mb-4 tracking-widest">{t.budgetLabel}</h3>
                            <div className="space-y-2 text-sm italic text-gray-400">
                                <div className="flex justify-between"><span>{t.fixedOH}:</span> <span>${budgetedFixedOH.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>{t.volume}:</span> <span>{budgetedVolume.toLocaleString()} u</span></div>
                                <div className="flex justify-between border-t border-gray-800 pt-2 text-white not-italic">
                                    <span>{t.stdRate}:</span>
                                    <span className="font-bold">${standardRatePerUnit}/u</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 p-6 border-l-4 border-neonPink">
                            <h3 className="text-xs text-neonPink uppercase font-bold mb-4 tracking-widest">{t.actualLabel}</h3>
                            <div className="space-y-2 text-sm italic text-gray-400">
                                <div className="flex justify-between"><span>{t.fixedOH}:</span> <span>${actualFixedOH.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>{t.volume}:</span> <span>{actualVolume.toLocaleString()} u</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Inputs */}
                    <div className="space-y-8">
                        <div className="group">
                            <label className="block text-xs text-gray-500 uppercase mb-2 tracking-widest font-bold group-hover:text-neonCyan transition-colors">{t.expVar}</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={expVarInput}
                                    onChange={e => setExpVarInput(e.target.value)}
                                    disabled={isSubmit}
                                    className="flex-1 bg-black border border-gray-800 p-3 text-white outline-none focus:border-neonCyan"
                                    placeholder="Value ($)"
                                />
                                <button onClick={() => setExpVarType('F')} className={`w-12 border ${expVarType === 'F' ? 'bg-green-600 border-green-500' : 'border-gray-800 text-gray-600'}`}>F</button>
                                <button onClick={() => setExpVarType('A')} className={`w-12 border ${expVarType === 'A' ? 'bg-red-600 border-red-500' : 'border-gray-800 text-gray-600'}`}>A</button>
                            </div>
                            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-tighter">{t.expHint}</p>
                        </div>

                        <div className="group">
                            <label className="block text-xs text-gray-500 uppercase mb-2 tracking-widest font-bold group-hover:text-neonPink transition-colors">{t.volVar}</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={volVarInput}
                                    onChange={e => setVolVarInput(e.target.value)}
                                    disabled={isSubmit}
                                    className="flex-1 bg-black border border-gray-800 p-3 text-white outline-none focus:border-neonPink"
                                    placeholder="Value ($)"
                                />
                                <button onClick={() => setVolVarType('F')} className={`w-12 border ${volVarType === 'F' ? 'bg-green-600 border-green-500' : 'border-gray-800 text-gray-600'}`}>F</button>
                                <button onClick={() => setVolVarType('A')} className={`w-12 border ${volVarType === 'A' ? 'bg-red-600 border-red-500' : 'border-gray-800 text-gray-600'}`}>A</button>
                            </div>
                            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-tighter">{t.volHint}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    {feedback ? (
                        <div className={`p-4 border text-center font-bold tracking-widest animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={handleVerify}
                            disabled={isSubmit}
                            className="w-full bg-white text-black font-extrabold py-5 hover:bg-neonCyan transition-all uppercase tracking-[0.3em] text-sm"
                        >
                            {t.submit}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FixedOverheadAnalyzer;
