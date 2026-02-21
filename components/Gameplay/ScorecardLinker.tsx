import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { ScorecardScenario, Perspective, ScorecardObjective } from '../../data/phase33';

interface ScorecardLinkerProps {
    scenario: ScorecardScenario;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const ScorecardLinker: React.FC<ScorecardLinkerProps> = ({
    scenario, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [assignments, setAssignments] = useState<Record<string, Perspective>>({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'SCORECARD STRATEGY MAPPER' : 'BỘ LẬP BẢN ĐỒ THẺ ĐIỂM',
        FINANCIAL: language === 'EN' ? 'FINANCIAL' : 'TÀI CHÍNH',
        CUSTOMER: language === 'EN' ? 'CUSTOMER' : 'KHÁCH HÀNG',
        INTERNAL_PROCESS: language === 'EN' ? 'INTERNAL PROCESS' : 'QUY TRÌNH NỘI BỘ',
        LEARNING_GROWTH: language === 'EN' ? 'LEARNING & GROWTH' : 'HỌC HỎI & PHÁT TRIỂN',
        submit: language === 'EN' ? 'VALIDATE STRATEGY' : 'XÁC MINH CHIẾN LƯỢC',
        unassigned: language === 'EN' ? 'Awaiting Classification' : 'Đang chờ phân loại'
    };

    const perspectives: Perspective[] = ['FINANCIAL', 'CUSTOMER', 'INTERNAL_PROCESS', 'LEARNING_GROWTH'];

    const handleAssign = (id: string, p: Perspective) => {
        setAssignments({ ...assignments, [id]: p });
    };

    const handleVerify = () => {
        setIsSubmit(true);
        let correctCount = 0;
        scenario.objectives.forEach(obj => {
            if (assignments[obj.id] === obj.perspective) correctCount++;
        });

        if (correctCount === scenario.objectives.length) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'STRATEGY BALANCED. ENGINE OPTIMIZED.' : 'CHIẾN LƯỢC ĐÃ CÂN BẰNG. CỖ MÁY ĐÃ TỐI ƯU.'
            });
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? `${correctCount}/${scenario.objectives.length} OBJECTIVES CORRECT. THE PERSPECTIVES ARE SKEWED.` : `${correctCount}/${scenario.objectives.length} MỤC TIÊU ĐÚNG. CÁC KHÍA CẠNH ĐANG BỊ LỆCH.`
            });
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 3000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white overflow-hidden">
            <div className="max-w-6xl w-full h-[85vh] flex flex-col border-4 border-neonCyan bg-gray-900 rounded-lg shadow-[0_0_80px_rgba(0,255,255,0.1)] p-8">

                <h2 className="text-3xl font-black mb-8 text-neonCyan tracking-widest uppercase italic text-center border-b border-gray-800 pb-4">
                    {t.title}
                </h2>

                <div className="flex-1 flex gap-8 overflow-hidden mb-8">
                    {/* Objectives Pool */}
                    <div className="w-1/3 flex flex-col">
                        <p className="text-[10px] text-gray-500 uppercase mb-4 tracking-[0.3em]">{t.unassigned}</p>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                            {scenario.objectives.map(obj => (
                                <div
                                    key={obj.id}
                                    className={`p-4 border-2 transition-all cursor-pointer ${assignments[obj.id] ? 'opacity-30 grayscale border-gray-800' : 'border-gray-700 bg-black/40 hover:border-neonCyan'}`}
                                >
                                    <p className="text-sm font-bold">{obj.text[language]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Perspectives Grid */}
                    <div className="w-2/3 grid grid-cols-2 gap-6">
                        {perspectives.map(p => (
                            <div key={p} className="flex flex-col bg-black/60 border border-gray-800 p-4 rounded relative hover:bg-black/80 transition-all">
                                <h3 className="text-xs font-black text-neonCyan mb-4 tracking-wider border-l-4 border-neonCyan pl-2">{t[p]}</h3>

                                <div className="flex-1 overflow-y-auto space-y-2 min-h-[100px]">
                                    {scenario.objectives.filter(obj => assignments[obj.id] === p).map(obj => (
                                        <div
                                            key={obj.id}
                                            onClick={() => handleAssign(obj.id, p === 'FINANCIAL' ? 'CUSTOMER' : 'FINANCIAL')} // Just to allow unassign/swap logic easily? No, let's just make them clickable to reassign below.
                                            className="p-2 bg-neonCyan/10 border border-neonCyan/40 text-[10px] font-bold text-white flex justify-between items-center group cursor-pointer"
                                        >
                                            {obj.text[language]}
                                            <button onClick={(e) => { e.stopPropagation(); delete assignments[obj.id]; setAssignments({ ...assignments }); }} className="text-red-500 opacity-0 group-hover:opacity-100">×</button>
                                        </div>
                                    ))}
                                </div>

                                {/* Drop Zones / Quick Assign Buttons */}
                                <div className="mt-4 pt-4 border-t border-gray-800 flex flex-wrap gap-2">
                                    {scenario.objectives.filter(obj => !assignments[obj.id]).map(obj => (
                                        <button
                                            key={obj.id + p}
                                            onClick={() => handleAssign(obj.id, p)}
                                            className="px-2 py-1 bg-gray-800 text-[8px] hover:bg-neonCyan hover:text-black transition-all rounded"
                                        >
                                            + {obj.text[language].substring(0, 15)}...
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {feedback ? (
                    <div className={`p-6 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                        {feedback.msg}
                    </div>
                ) : (
                    <button
                        onClick={handleVerify}
                        className="w-full bg-neonCyan text-black font-extrabold py-5 hover:bg-white transition-all uppercase tracking-widest text-xl shadow-[8px_8px_0px_#000] active:translate-y-1 active:shadow-none"
                    >
                        {t.submit}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ScorecardLinker;
