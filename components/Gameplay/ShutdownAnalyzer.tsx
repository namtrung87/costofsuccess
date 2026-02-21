import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { ShutdownScenario } from '../../data/phase29';

interface ShutdownAnalyzerProps {
    scenario: ShutdownScenario;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const ShutdownAnalyzer: React.FC<ShutdownAnalyzerProps> = ({
    scenario, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [inputs, setInputs] = useState<Record<string, { contribution: string, impact: string }>>({});
    const [decision, setDecision] = useState<'KEEP' | 'KILL' | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'THE SHUTDOWN ANALYZER' : 'BỘ PHÂN TÍCH KHAI TỬ',
        segment: language === 'EN' ? 'Segment Under Review' : 'Bộ phận đang xem xét',
        revenue: language === 'EN' ? 'Revenue' : 'Doanh thu',
        variable: language === 'EN' ? 'Variable Cost' : 'Biến phí',
        contribution: language === 'EN' ? 'Contribution' : 'Số dư Đảm phí',
        avoidable: language === 'EN' ? 'Avoidable Fixed Costs' : 'Định phí tránh được',
        impact: language === 'EN' ? 'Net Impact of Shutdown' : 'Tác động ròng khi Đóng cửa',
        verdict: language === 'EN' ? 'YOUR DECISION' : 'QUYẾT ĐỊNH CỦA BẠN',
        submit: language === 'EN' ? 'BROADCAST COMMAND' : 'PHÁT LỆNH ĐIỀU HÀNH',
        keep: language === 'EN' ? 'KEEP OPERATING' : 'TIẾP TỤC VẬN HÀNH',
        kill: language === 'EN' ? 'ISSUE KILL ORDER' : 'RA LỆNH KHAI TỬ',
        hint: language === 'EN' ? 'HINT: Net Impact = (Avoidable Costs - Contribution)' : 'GỢI Ý: Tác động ròng = (Định phí tránh được - SDDP)'
    };

    const section = scenario.sections[0]; // Assuming single segment for this level
    const actualContribution = section.revenue - section.variableCosts;
    const actualImpact = section.avoidableFixedCosts - actualContribution; // If negative, shutting down loses money.
    const correctDecision = actualImpact > 0 ? 'KILL' : 'KEEP';

    const handleInputChange = (id: string, field: 'contribution' | 'impact', value: string) => {
        setInputs({ ...inputs, [id]: { ...(inputs[id] || { contribution: '', impact: '' }), [field]: value } });
    };

    const handleVerify = () => {
        setIsSubmit(true);

        const input = inputs[section.id] || { contribution: '', impact: '' };
        const isCorrect =
            parseFloat(input.contribution) === actualContribution &&
            parseFloat(input.impact) === actualImpact &&
            decision === correctDecision;

        if (isCorrect) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'ANALYSIS VERIFIED. THE SEGMENT STATUS IS STABLE.' : 'PHÂN TÍCH ĐÃ XÁC MINH. TRẠNG THÁI BỘ PHẬN ĐÃ ỔN ĐỊNH.'
            });
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? 'LOGIC ERROR: YOU ARE MIXING UP UNIDENTIFIED COSTS.' : 'LỖI LOGIC: BẠN ĐANG NHẦM LẪN CÁC CHI PHÍ KHÔNG XÁC ĐỊNH.'
            });
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 2500);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white">
            <div className="max-w-4xl w-full border-2 border-neonPink bg-gray-900 p-8 shadow-[0_0_40px_rgba(255,0,255,0.15)] rounded">
                <h2 className="text-2xl font-bold mb-8 text-neonPink tracking-widest uppercase flex items-center gap-3">
                    <span className="animate-pulse text-red-500">⚠</span> {t.title}
                </h2>

                <div className="bg-black/40 p-6 border border-gray-800 mb-8 rounded">
                    <p className="text-xs text-gray-500 uppercase mb-4">{t.segment}: <span className="text-white font-bold">{section.name[language]}</span></p>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">{t.revenue}</span>
                                <span className="text-white font-bold">${section.revenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">{t.variable}</span>
                                <span className="text-neonPink">${section.variableCosts.toLocaleString()}</span>
                            </div>
                            <div className="pt-2 border-t border-gray-800">
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">{t.contribution}</label>
                                <input
                                    type="number"
                                    value={inputs[section.id]?.contribution || ''}
                                    onChange={e => handleInputChange(section.id, 'contribution', e.target.value)}
                                    className="w-full bg-gray-800 border-b-2 border-gray-700 p-2 text-white text-xl font-bold outline-none focus:border-neonPink"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">{t.avoidable}</span>
                                <span className="text-green-400 font-bold">${section.avoidableFixedCosts.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-600 italic">
                                <span>(Unavoidable: ${section.unavoidableFixedCosts.toLocaleString()})</span>
                            </div>
                            <div className="pt-2 border-t border-gray-800">
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">{t.impact}</label>
                                <input
                                    type="number"
                                    value={inputs[section.id]?.impact || ''}
                                    onChange={e => handleInputChange(section.id, 'impact', e.target.value)}
                                    className="w-full bg-black border border-gray-700 p-2 text-neonPink text-xl font-bold outline-none focus:border-neonPink"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-10 text-center">
                    <p className="text-xs text-gray-500 uppercase mb-4">{t.verdict}</p>
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={() => setDecision('KEEP')}
                            className={`px-8 py-3 border-2 transition-all font-black uppercase text-sm ${decision === 'KEEP' ? 'bg-green-600 border-green-400 text-white' : 'border-gray-800 text-gray-600 hover:border-gray-500'}`}
                        >
                            {t.keep}
                        </button>
                        <button
                            onClick={() => setDecision('KILL')}
                            className={`px-8 py-3 border-2 transition-all font-black uppercase text-sm ${decision === 'KILL' ? 'bg-red-600 border-red-400 text-white' : 'border-gray-800 text-gray-600 hover:border-gray-500'}`}
                        >
                            {t.kill}
                        </button>
                    </div>
                </div>

                {feedback ? (
                    <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                        {feedback.msg}
                    </div>
                ) : (
                    <button
                        onClick={handleVerify}
                        className="w-full bg-neonPink text-black font-extrabold py-5 hover:bg-white transition-all uppercase tracking-widest text-lg rounded shadow-[5px_5px_0px_#000]"
                    >
                        {t.submit}
                    </button>
                )}
                <p className="mt-4 text-[8px] text-gray-700 text-center uppercase tracking-widest leading-loose">{t.hint}</p>
            </div>
        </div>
    );
};

export default ShutdownAnalyzer;
