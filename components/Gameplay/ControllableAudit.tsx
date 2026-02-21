import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { DivisionalScenario } from '../../data/phase34';

interface ControllableAuditProps {
    scenario: DivisionalScenario;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const ControllableAudit: React.FC<ControllableAuditProps> = ({
    scenario, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'CONTROLLABLE PROFIT AUDITOR' : 'BỘ KIỂM TOÁN LỢI NHUẬN KIỂM SOÁT ĐƯỢC',
        rev: language === 'EN' ? 'REVENUE' : 'DOANH THU',
        vc: language === 'EN' ? 'VARIABLE COSTS' : 'BIẾN PHÍ',
        fixed: language === 'EN' ? 'FIXED COSTS PORTFOLIO' : 'DANH MỤC ĐỊNH PHÍ',
        contrib: language === 'EN' ? 'CONTRIBUTION' : 'SỐ DƯ ĐẢM PHÍ',
        ctrlProfit: language === 'EN' ? 'CONTROLLABLE PROFIT' : 'LỢI NHUẬN KIỂM SOÁT ĐƯỢC',
        submit: language === 'EN' ? 'FILE AUDIT REPORT' : 'GỬI BÁO CÁO KIỂM TOÁN',
        hint: language === 'EN' ? 'SELECT ONLY COSTS THE MANAGER CAN DECIDE UPON.' : 'CHỈ CHỌN CÁC CHI PHÍ MÀ QUẢN LÝ CÓ QUYỀN QUYẾT ĐỊNH.'
    };

    const contribution = scenario.revenue - scenario.variableCosts;
    const currentFixed = scenario.items
        .filter(item => selectedIds.includes(item.id))
        .reduce((sum, item) => sum + item.amount, 0);
    const currentProfit = contribution - currentFixed;

    const toggleItem = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleVerify = () => {
        setIsSubmit(true);
        const correctIds = scenario.items.filter(i => i.isControllable).map(i => i.id);
        const isCorrect =
            selectedIds.length === correctIds.length &&
            selectedIds.every(id => correctIds.includes(id));

        if (isCorrect) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'AUDIT VERIFIED. MANAGER PERFORMANCE IS NOW VISIBLE.' : 'ĐÃ XÁC MINH KIỂM TOÁN. HIỆU SUẤT QUẢN LÝ ĐÃ RÕ RÀNG.'
            });
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? 'MISCLASSIFICATION! UNCONTROLLABLE OVERHEADS DETECTED.' : 'PHÂN LOẠI SAI! PHÁT HIỆN CHI PHÍ CHUNG KHÔNG KIỂM SOÁT ĐƯỢC.'
            });
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 3000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white">
            <div className="max-w-6xl w-full border-2 border-neonCyan bg-gray-800 p-8 shadow-[0_0_60px_rgba(0,255,255,0.15)] rounded">

                <div className="flex justify-between items-center mb-10 border-b border-gray-700 pb-6">
                    <h2 className="text-2xl font-black text-neonCyan tracking-widest uppercase italic">{t.title}</h2>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase">{scenario.divisionName[language]}</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-10">
                    {/* Left Column: Financial Summary */}
                    <div className="col-span-4 bg-black/60 p-6 border border-gray-700 space-y-6">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase mb-2">{t.rev}</p>
                            <p className="text-2xl font-bold text-white">${scenario.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase mb-2">{t.vc}</p>
                            <p className="text-2xl font-bold text-neonPink">${scenario.variableCosts.toLocaleString()}</p>
                        </div>
                        <div className="pt-4 border-t border-gray-700">
                            <p className="text-[10px] text-gray-500 uppercase mb-2">{t.contrib}</p>
                            <p className="text-2xl font-bold text-neonCyan">${contribution.toLocaleString()}</p>
                        </div>
                        <div className="pt-10">
                            <p className="text-[10px] text-gray-400 uppercase mb-2">{t.ctrlProfit}</p>
                            <p className={`text-4xl font-black transition-all ${currentProfit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                ${currentProfit.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Cost Item Selection */}
                    <div className="col-span-8 space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                        <p className="text-[10px] text-gray-500 uppercase mb-4 tracking-widest">{t.fixed}</p>
                        {scenario.items.map(item => (
                            <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`p-4 border-2 transition-all cursor-pointer flex justify-between items-center ${selectedIds.includes(item.id) ? 'border-neonCyan bg-neonCyan/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'border-gray-800 bg-black/40 hover:border-gray-600'}`}
                            >
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white uppercase">{item.name[language]}</p>
                                    <p className="text-[8px] text-gray-500 mt-1 uppercase italic leading-none">{item.description[language]}</p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="text-lg font-black text-gray-300">-${item.amount.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center gap-10">
                    <div className="text-[10px] text-gray-600 uppercase italic tracking-widest flex-1">
                        {t.hint}
                    </div>

                    {feedback ? (
                        <div className={`flex-1 p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={handleVerify}
                            className="flex-1 bg-neonCyan text-black font-extrabold py-5 hover:bg-white transition-all uppercase tracking-widest text-xl shadow-[5px_5px_0px_#000] active:translate-y-1 active:shadow-none"
                        >
                            {t.submit}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ControllableAudit;
