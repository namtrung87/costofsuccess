import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { PlanningOperationalScenario } from '../../data/phase25';

interface PlanningOperationalAnalyzerProps {
    scenario: PlanningOperationalScenario;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const PlanningOperationalAnalyzer: React.FC<PlanningOperationalAnalyzerProps> = ({
    scenario, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [planningInput, setPlanningInput] = useState('');
    const [planningType, setPlanningType] = useState<'F' | 'A' | null>(null);
    const [operationalInput, setOperationalInput] = useState('');
    const [operationalType, setOperationalType] = useState<'F' | 'A' | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const { originalStandardPrice, revisedStandardPrice, actualPrice, actualQuantity, itemName } = scenario;

    // Expected Variances
    // Planning: (Revised Std - Original Std) * Actual Qty (or Budgeted Qty, but commonly Actual for this exercise)
    // operational: (Actual - Revised Std) * Actual Qty
    const expectedPlanningVar = (revisedStandardPrice - originalStandardPrice) * actualQuantity;
    const expectedOperationalVar = (actualPrice - revisedStandardPrice) * actualQuantity;

    const t = {
        title: language === 'EN' ? 'RECONCILIATION RADAR' : 'RA-ĐA ĐỐI CHIẾU',
        item: language === 'EN' ? 'Target Item' : 'Đối tượng',
        origStd: language === 'EN' ? 'Original Standard' : 'Định mức Ban đầu',
        revStd: language === 'EN' ? 'Revised Standard (Market)' : 'Định mức Điều chỉnh (Thị trường)',
        actual: language === 'EN' ? 'Actual Price' : 'Giá thực tế',
        qty: language === 'EN' ? 'Actual Quantity' : 'Số lượng thực tế',
        planVar: language === 'EN' ? 'Planning Variance' : 'Biến động Lập kế hoạch',
        operVar: language === 'EN' ? 'Operational Variance' : 'Biến động Vận hành',
        submit: language === 'EN' ? 'FINALIZE AUDIT' : 'HOÀN TẤT KIỂM TOÁN',
        totalVar: language === 'EN' ? 'Total Price Variance' : 'Tổng biến động giá'
    };

    const currentTotal = (expectedPlanningVar + expectedOperationalVar);

    const handleVerify = () => {
        setIsSubmit(true);

        const isPlanCorrect = Math.abs(parseFloat(planningInput)) === Math.abs(expectedPlanningVar) && planningType === (expectedPlanningVar <= 0 ? 'F' : 'A');
        const isOperCorrect = Math.abs(parseFloat(operationalInput)) === Math.abs(expectedOperationalVar) && operationalType === (expectedOperationalVar <= 0 ? 'F' : 'A');

        if (isPlanCorrect && isOperCorrect) {
            playSFX('SUCCESS');
            setFeedback({ type: 'success', msg: language === 'EN' ? 'AUDIT VERIFIED. RESPONSIBILITY CLEAR.' : 'XÁC MINH HOÀN TẤT. TRÁCH NHIỆM RÕ RÀNG.' });
            onCorrect();
            setTimeout(() => onComplete(10), 3000);
        } else {
            playSFX('ERROR');
            setFeedback({ type: 'error', msg: language === 'EN' ? 'DISCREPANCY DETECTED. RE-EVALUATE BLAME.' : 'PHÁT HIỆN SAI LỆCH. HÃY ĐÁNH GIÁ LẠI.' });
            onIncorrect();
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 2000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white">
            <div className="max-w-4xl w-full border border-neonPink bg-gray-900 shadow-[0_0_30px_rgba(255,0,255,0.15)] rounded-lg p-8">
                <h2 className="text-xl font-bold mb-6 text-neonPink tracking-widest uppercase flex items-center gap-3">
                    <span className="animate-pulse">●</span> {t.title}
                </h2>

                <div className="grid grid-cols-3 gap-6 mb-8 text-xs text-gray-400">
                    <div className="bg-black/50 p-4 border border-gray-800 rounded">
                        <p className="mb-1 uppercase tracking-tighter">{t.origStd}</p>
                        <p className="text-lg font-bold text-white">${originalStandardPrice}</p>
                    </div>
                    <div className="bg-neonPink/5 p-4 border border-neonPink/30 rounded">
                        <p className="mb-1 uppercase tracking-tighter text-neonPink">{t.revStd}</p>
                        <p className="text-lg font-bold text-white">${revisedStandardPrice}</p>
                    </div>
                    <div className="bg-black/50 p-4 border border-gray-800 rounded">
                        <p className="mb-1 uppercase tracking-tighter">{t.actual}</p>
                        <p className="text-lg font-bold text-white">${actualPrice}</p>
                    </div>
                </div>

                <div className="bg-black/40 p-6 border border-gray-800 rounded mb-8">
                    <p className="text-sm font-bold text-white mb-6 uppercase border-b border-gray-800 pb-2">{t.item}: {itemName[language]} ({actualQuantity}m)</p>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase">{t.planVar}</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={planningInput}
                                    onChange={e => setPlanningInput(e.target.value)}
                                    className="flex-1 bg-gray-800 border border-gray-700 p-3 text-white outline-none focus:border-neonPink"
                                    placeholder="Value ($)"
                                />
                                <div className="flex border border-gray-700">
                                    <button onClick={() => setPlanningType('F')} className={`px-4 ${planningType === 'F' ? 'bg-green-600' : 'text-gray-500'}`}>F</button>
                                    <button onClick={() => setPlanningType('A')} className={`px-4 ${planningType === 'A' ? 'bg-red-600' : 'text-gray-500'}`}>A</button>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-600 italic">Market Shift Impact</p>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase">{t.operVar}</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={operationalInput}
                                    onChange={e => setOperationalInput(e.target.value)}
                                    className="flex-1 bg-gray-800 border border-gray-700 p-3 text-white outline-none focus:border-neonPink"
                                    placeholder="Value ($)"
                                />
                                <div className="flex border border-gray-700">
                                    <button onClick={() => setOperationalType('F')} className={`px-4 ${operationalType === 'F' ? 'bg-green-600' : 'text-gray-500'}`}>F</button>
                                    <button onClick={() => setOperationalType('A')} className={`px-4 ${operationalType === 'A' ? 'bg-red-600' : 'text-gray-500'}`}>A</button>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-600 italic">Management Performance</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-8 px-2">
                    <p className="text-xs text-gray-500 uppercase">{t.totalVar}:</p>
                    <p className="text-xl font-bold text-neonPink">${Math.abs(currentTotal).toLocaleString()} ({currentTotal >= 0 ? 'A' : 'F'})</p>
                </div>

                {feedback ? (
                    <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                        {feedback.msg}
                    </div>
                ) : (
                    <button
                        onClick={handleVerify}
                        disabled={isSubmit}
                        className="w-full bg-neonPink text-black font-extrabold py-4 hover:bg-white transition-all uppercase tracking-[0.2em] text-lg rounded"
                    >
                        {t.submit}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PlanningOperationalAnalyzer;
