import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { PerformanceScenario } from '../../data/phase32';

interface PerformanceComparerProps {
    scenario: PerformanceScenario;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const PerformanceComparer: React.FC<PerformanceComparerProps> = ({
    scenario, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [inputs, setInputs] = useState<Record<string, { roi: string, ri: string }>>({});
    const [winner, setWinner] = useState<string | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'PERFORMANCE METRIC ANALYZER' : 'BỘ PHÂN TÍCH CHỈ SỐ HIỆU SUẤT',
        profit: language === 'EN' ? 'Annual Profit' : 'Lợi nhuận năm',
        investment: language === 'EN' ? 'Invested Capital' : 'Vốn đầu tư',
        roi: language === 'EN' ? 'ROI (%)' : 'ROI (%)',
        ri: language === 'EN' ? 'Residual Income ($)' : 'Lợi nhuận còn lại ($)',
        coc: language === 'EN' ? 'Cost of Capital' : 'Chi phí sử dụng vốn',
        verdict: language === 'EN' ? 'HIGHER VALUE ADDER?' : 'AI TẠO GIÁ TRỊ CAO HƠN?',
        submit: language === 'EN' ? 'SUBMIT EVALUATION' : 'GỬI ĐÁNH GIÁ',
        formula: language === 'EN' ? 'RI = Profit - (Investment * CoC)' : 'RI = Lợi nhuận - (Vốn * CoC)'
    };

    const handleInputChange = (id: string, field: 'roi' | 'ri', value: string) => {
        setInputs({ ...inputs, [id]: { ...(inputs[id] || { roi: '', ri: '' }), [field]: value } });
    };

    const verifyLogic = () => {
        setIsSubmit(true);
        let allCorrect = true;
        let actualWinner = '';
        let maxRI = -Infinity;

        scenario.divisions.forEach(div => {
            const actualROI = (div.profit / div.investment) * 100;
            const actualRI = div.profit - (div.investment * scenario.costOfCapital);

            const input = inputs[div.id] || { roi: '', ri: '' };

            if (Math.abs(parseFloat(input.roi) - actualROI) > 0.1 || Math.abs(parseFloat(input.ri) - actualRI) > 1) {
                allCorrect = false;
            }

            if (actualRI > maxRI) {
                maxRI = actualRI;
                actualWinner = div.id;
            }
        });

        if (allCorrect && winner === actualWinner) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'EVALUATION VERIFIED. RI FAVORS ABSOLUTE WEALTH.' : 'ĐÃ XÁC MINH ĐÁNH GIÁ. RI ƯU TIÊN GIÁ TRỊ TUYỆT ĐỐI.'
            });
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? 'ERRONEOUS EVALUATION. CHECK YOUR MATH AND RI LOGIC.' : 'ĐÁNH GIÁ SAI. HÃY KIỂM TRA LẠI PHÉP TÍNH VÀ LOGIC RI.'
            });
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 3000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white">
            <div className="max-w-5xl w-full border-2 border-neonPink bg-gray-900 p-8 shadow-[0_0_50px_rgba(255,0,255,0.1)] rounded-lg">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-black text-neonPink tracking-widest uppercase italic">{t.title}</h2>
                    <div className="bg-black border border-gray-800 px-4 py-2 rounded text-xs">
                        <span className="text-gray-500 uppercase mr-2">{t.coc}:</span>
                        <span className="text-neonCyan font-bold">{(scenario.costOfCapital * 100)}%</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12">
                    {scenario.divisions.map(div => (
                        <div key={div.id} className={`p-6 border-2 transition-all ${winner === div.id ? 'border-neonCyan bg-neonCyan/5 shadow-[0_0_20px_rgba(0,255,255,0.1)]' : 'border-gray-800 bg-black/40'}`}>
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold text-white">{div.name[language]}</h3>
                                <button
                                    onClick={() => setWinner(div.id)}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${winner === div.id ? 'bg-neonCyan border-neonCyan' : 'border-gray-600'}`}
                                >
                                    {winner === div.id && <div className="w-2 h-2 bg-black rounded-full" />}
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">{t.profit}</span>
                                    <span className="text-white">${div.profit.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">{t.investment}</span>
                                    <span className="text-white">${div.investment.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] text-gray-600 uppercase mb-1">{t.roi}</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs[div.id]?.roi || ''}
                                        onChange={e => handleInputChange(div.id, 'roi', e.target.value)}
                                        className="w-full bg-gray-800 border-b border-gray-600 p-2 text-white font-bold outline-none focus:border-neonPink"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-gray-600 uppercase mb-1">{t.ri}</label>
                                    <input
                                        type="number"
                                        value={inputs[div.id]?.ri || ''}
                                        onChange={e => handleInputChange(div.id, 'ri', e.target.value)}
                                        className="w-full bg-gray-800 border-b border-gray-600 p-2 text-white font-bold outline-none focus:border-neonPink"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-black/80 border border-gray-800 p-4 mb-8 text-[10px] text-center text-gray-500 italic uppercase">
                    {t.formula}
                </div>

                {feedback ? (
                    <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                        {feedback.msg}
                    </div>
                ) : (
                    <button
                        onClick={verifyLogic}
                        disabled={!winner}
                        className={`w-full font-black py-5 transition-all uppercase tracking-widest text-lg rounded ${!winner ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-neonPink text-black hover:bg-white shadow-[0_5px_15px_rgba(255,0,255,0.2)]'}`}
                    >
                        {t.submit}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PerformanceComparer;
