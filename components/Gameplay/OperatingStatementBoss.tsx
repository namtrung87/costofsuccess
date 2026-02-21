import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { OperatingStatementData } from '../../data/phase22';

interface OperatingStatementBossProps {
    data: OperatingStatementData;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const OperatingStatementBoss: React.FC<OperatingStatementBossProps> = ({
    data, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [signs, setSigns] = useState<Record<string, 1 | -1>>({});
    const [currentProfit, setCurrentProfit] = useState(data.budgetedProfit);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'THE OPERATING STATEMENT' : 'BÁO CÁO VẬN HÀNH',
        budgetedProfit: language === 'EN' ? 'Budgeted Profit' : 'Lợi nhuận Dự toán',
        stdProfitActual: language === 'EN' ? 'Standard Profit on Actual Sales' : 'Lợi nhuận ĐM trên Doanh số TT',
        actualProfit: language === 'EN' ? 'Actual Profit' : 'Lợi nhuận Thực tế',
        target: language === 'EN' ? 'RECONCILIATION TARGET' : 'MỤC TIÊU ĐỐI CHIẾU',
        submit: language === 'EN' ? 'FINALIZE REPORT' : 'HOÀN TẤT BÁO CÁO',
        favorable: language === 'EN' ? 'Favorable (+)' : 'Có lợi (+)',
        adverse: language === 'EN' ? 'Adverse (-)' : 'Bất lợi (-)',
        unassigned: language === 'EN' ? 'Select Impact' : 'Chọn tác động'
    };

    useEffect(() => {
        let profit = data.budgetedProfit;
        data.variances.forEach(v => {
            if (signs[v.id]) {
                profit += Math.abs(v.value) * signs[v.id];
            }
        });
        setCurrentProfit(profit);
    }, [signs, data]);

    const toggleSign = (id: string, sign: 1 | -1) => {
        if (isSubmit) return;
        setSigns(prev => ({ ...prev, [id]: sign }));
        playSFX('CLICK');
    };

    const handleVerify = () => {
        setIsSubmit(true);

        // Check if all variances matched their true value (Favorable = +, Adverse = -)
        const isCorrect = data.variances.every(v => {
            const expectedSign = v.value >= 0 ? 1 : -1;
            return signs[v.id] === expectedSign;
        }) && currentProfit === data.actualProfit;

        if (isCorrect) {
            playSFX('SUCCESS');
            setFeedback({ type: 'success', msg: language === 'EN' ? 'RECONCILIATION SUCCESSFUL. PROOF ATTAINED.' : 'ĐỐI CHIẾU THÀNH CÔNG. BẰNG CHỨNG ĐÃ ĐƯỢC XÁC LẬP.' });
            onCorrect();
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            setFeedback({ type: 'error', msg: language === 'EN' ? 'RECONCILIATION FAILED. THE NUMBERS DO NOT BALANCED.' : 'ĐỐI CHIẾU THẤT BẠI. CÁC CON SỐ KHÔNG KHỚP.' });
            onIncorrect();
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 2500);
        }
    };

    const allAssigned = data.variances.every(v => signs[v.id] !== undefined);

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center bg-obsidian text-white overflow-y-auto p-4 md:p-10 font-mono">
            <div className="max-w-4xl w-full border-t-4 border-neonCyan bg-gray-900/80 p-6 md:p-10 shadow-2xl space-y-8 animate-fadeIn">

                <div className="flex justify-between items-center border-b border-gray-800 pb-6">
                    <h2 className="text-3xl font-heading text-white tracking-widest uppercase">{t.title}</h2>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{t.target}</p>
                        <p className="text-2xl font-bold text-neonCyan">${data.actualProfit.toLocaleString()}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Starting point */}
                    <div className="flex justify-between items-center bg-black/40 p-4 border border-gray-800">
                        <span className="text-gray-400 font-bold uppercase text-sm">{t.budgetedProfit}</span>
                        <span className="text-xl font-bold">${data.budgetedProfit.toLocaleString()}</span>
                    </div>

                    {/* Variances List */}
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {data.variances.map((v) => (
                            <div key={v.id} className="grid grid-cols-12 gap-4 items-center bg-black/20 p-3 border border-gray-800 hover:border-gray-600 transition-colors">
                                <div className="col-span-7">
                                    <p className="text-sm font-bold text-white">{v.name[language]}</p>
                                    <p className="text-[10px] text-gray-600 uppercase tracking-tighter">{v.category}</p>
                                </div>
                                <div className="col-span-2 text-right">
                                    <span className="text-sm font-bold">${Math.abs(v.value).toLocaleString()}</span>
                                </div>
                                <div className="col-span-3 flex justify-end gap-1">
                                    <button
                                        onClick={() => toggleSign(v.id, 1)}
                                        className={`flex-1 py-1 text-xs border ${signs[v.id] === 1 ? 'bg-green-600 border-green-500 text-white' : 'border-gray-800 text-gray-600 hover:border-green-800'}`}
                                    >+</button>
                                    <button
                                        onClick={() => toggleSign(v.id, -1)}
                                        className={`flex-1 py-1 text-xs border ${signs[v.id] === -1 ? 'bg-red-600 border-red-500 text-white' : 'border-gray-800 text-gray-600 hover:border-red-800'}`}
                                    >-</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Bottom Line */}
                    <div className={`mt-6 p-6 border-b-4 transition-all duration-500 flex justify-between items-center ${currentProfit === data.actualProfit ? 'bg-green-900/20 border-green-500' : 'bg-black/40 border-gray-800'}`}>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Current Balance</p>
                            <p className={`text-3xl font-bold ${currentProfit === data.actualProfit ? 'text-green-400' : 'text-white'}`}>
                                ${currentProfit.toLocaleString()}
                            </p>
                        </div>
                        {currentProfit !== data.actualProfit && (
                            <div className="text-right">
                                <p className="text-[10px] text-gray-500 uppercase">Variance to Target</p>
                                <p className="text-xl text-neonPink">
                                    {currentProfit > data.actualProfit ? '+' : ''}${(currentProfit - data.actualProfit).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-6">
                    {feedback ? (
                        <div className={`p-6 border-2 text-xl font-bold tracking-[0.2em] text-center animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={handleVerify}
                            disabled={!allAssigned || isSubmit}
                            className="w-full bg-white text-black font-extrabold py-5 hover:bg-neonCyan transition-all uppercase tracking-[0.5em] text-lg disabled:opacity-30 disabled:cursor-not-allowed group"
                        >
                            <span className="group-hover:tracking-[0.6em] transition-all">{t.submit}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Decorative Glitch Elements */}
            <div className="fixed bottom-10 left-10 pointer-events-none opacity-20">
                <div className="text-[8px] text-neonCyan animate-pulse">SYSTEM_AUTH: MASTER_CONTROLLER</div>
                <div className="text-[8px] text-neonPink">TRACE_LOAD: RECONCILIATION_ACTIVE</div>
            </div>
        </div>
    );
};

export default OperatingStatementBoss;
