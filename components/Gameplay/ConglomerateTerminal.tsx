import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { ConglomerateBossData, ConglomerateDivision } from '../../data/phase35';

interface ConglomerateTerminalProps {
    data: ConglomerateBossData;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const ConglomerateTerminal: React.FC<ConglomerateTerminalProps> = ({
    data, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [allocations, setAllocations] = useState<Record<string, number>>({});
    const [metrics, setMetrics] = useState({
        totalProfit: 0,
        avgSatisfaction: 0,
        avgRetention: 0,
        budgetUsed: 0
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'GLOBAL CONGLOMERATE TERMINAL' : 'HỆ THỐNG ĐIỀU PHỐI TẬP ĐOÀN TOÀN CẦU',
        budget: language === 'EN' ? 'Capital Budget' : 'Ngân sách Vốn',
        profit: language === 'EN' ? 'Group Profit' : 'Lợi nhuận Tập đoàn',
        satisfaction: language === 'EN' ? 'Avg Satisfaction' : 'Sự hài lòng TB',
        retention: language === 'EN' ? 'Avg Retention' : 'Giữ chân Nhân sự TB',
        submit: language === 'EN' ? 'EXECUTE FISCAL PLAN' : 'THỰC THI KẾ HOẠCH TÀI CHÍNH',
        division: language === 'EN' ? 'Division' : 'Bộ phận',
        alloc: language === 'EN' ? 'Budget Allocation' : 'Phân bổ Ngân sách',
        targets: language === 'EN' ? 'BOARD TARGETS' : 'MỤC TIÊU HỘI ĐỒNG'
    };

    useEffect(() => {
        let profit = 0;
        let sat = 0;
        let ret = 0;
        let used = 0;

        data.divisions.forEach(div => {
            const alloc = allocations[div.id] || 0;
            used += alloc;

            // Scaling logic:
            // Profit = Allocation * ROI
            profit += alloc * div.roi;

            // Satisfaction and Retention improve with allocation relative to "needed"
            const ratio = alloc / div.budgetNeeded;
            sat += div.customerSatisfaction * (0.5 + 0.5 * Math.min(ratio, 1.2));
            ret += div.staffRetention * (0.4 + 0.6 * Math.min(ratio, 1.1));
        });

        setMetrics({
            totalProfit: profit,
            avgSatisfaction: Math.round(sat / data.divisions.length),
            avgRetention: Math.round(ret / data.divisions.length),
            budgetUsed: used
        });
    }, [allocations, data]);

    const handleAllocChange = (id: string, value: number) => {
        setAllocations({ ...allocations, [id]: value });
    };

    const handleVerify = () => {
        setIsSubmit(true);

        const isBudgetOk = metrics.budgetUsed <= data.totalBudgetAvailable;
        const isProfitOk = metrics.totalProfit >= data.targetGroupProfit;
        const isSatOk = metrics.avgSatisfaction >= data.targetGroupNPS;
        const isRetOk = metrics.avgRetention >= 75; // Hidden retention target

        if (isBudgetOk && isProfitOk && isSatOk && isRetOk) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'PLAN APPROVED. GROUP STABILITY ACHIEVED.' : 'KẾ HOẠCH ĐƯỢC DUYỆT. TẬP ĐOÀN ỔN ĐỊNH.'
            });
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            let msg = language === 'EN' ? 'PLAN REJECTED:' : 'KẾ HOẠCH BỊ TỪ CHỐI:';
            if (!isBudgetOk) msg += language === 'EN' ? ' Budget Overdraft.' : ' Vượt quá ngân sách.';
            else if (!isProfitOk) msg += language === 'EN' ? ' Profit Target Missed.' : ' Hụt mục tiêu lợi nhuận.';
            else if (!isSatOk) msg += language === 'EN' ? ' Low Customer Vibe.' : ' Khách hàng không hài lòng.';
            else msg += language === 'EN' ? ' Resource Decay (Low Retention).' : ' Chảy máu chất xám (Retention thấp).';

            setFeedback({ type: 'error', msg });
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 3000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black font-mono text-white p-6">
            <div className="max-w-7xl w-full border-4 border-neonCyan bg-gray-900/90 p-10 shadow-[0_0_100px_rgba(0,255,255,0.2)] rounded relative">

                {/* Header Stats */}
                <div className="grid grid-cols-4 gap-6 mb-12">
                    <div className="p-4 bg-black/60 border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase mb-2">{t.budget}</p>
                        <p className={`text-2xl font-black ${metrics.budgetUsed > data.totalBudgetAvailable ? 'text-red-500 animate-pulse' : 'text-neonCyan'}`}>
                            ${(data.totalBudgetAvailable - metrics.budgetUsed).toLocaleString()}
                        </p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-neonCyan transition-all" style={{ width: `${(metrics.budgetUsed / data.totalBudgetAvailable) * 100}%` }} />
                        </div>
                    </div>
                    <div className="p-4 bg-black/60 border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase mb-2">{t.profit}</p>
                        <p className={`text-2xl font-black ${metrics.totalProfit >= data.targetGroupProfit ? 'text-green-500' : 'text-white'}`}>
                            ${Math.round(metrics.totalProfit).toLocaleString()}
                        </p>
                        <p className="text-[8px] text-gray-600 mt-1">TARGET: ${data.targetGroupProfit.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-black/60 border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase mb-2">{t.satisfaction}</p>
                        <p className={`text-2xl font-black ${metrics.avgSatisfaction >= data.targetGroupNPS ? 'text-neonCyan' : 'text-orange-500'}`}>
                            {metrics.avgSatisfaction}%
                        </p>
                        <p className="text-[8px] text-gray-600 mt-1">TARGET: {data.targetGroupNPS}%</p>
                    </div>
                    <div className="p-4 bg-black/60 border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase mb-2">{t.retention}</p>
                        <p className={`text-2xl font-black ${metrics.avgRetention >= 75 ? 'text-neonCyan' : 'text-orange-500'}`}>
                            {metrics.avgRetention}%
                        </p>
                        <p className="text-[8px] text-gray-600 mt-1">TARGET: 75%</p>
                    </div>
                </div>

                {/* Divisions Table */}
                <div className="space-y-6 mb-12 overflow-y-auto max-h-[450px] pr-4 scrollbar-hide">
                    {data.divisions.map(div => (
                        <div key={div.id} className="grid grid-cols-12 gap-8 items-center bg-black/40 p-6 border border-gray-800 hover:border-neonCyan transition-all">
                            <div className="col-span-3">
                                <p className="text-xl font-bold text-white uppercase">{div.name[language]}</p>
                                <p className="text-[10px] text-gray-400 mt-1">ROI: {(div.roi * 100)}% | NEED: ${div.budgetNeeded.toLocaleString()}</p>
                            </div>

                            <div className="col-span-6 flex items-center gap-6">
                                <div className="flex-1">
                                    <input
                                        type="range"
                                        min="0"
                                        max={div.budgetNeeded * 1.5}
                                        step="100000"
                                        value={allocations[div.id] || 0}
                                        onChange={(e) => handleAllocChange(div.id, parseInt(e.target.value))}
                                        className="w-full accent-neonCyan"
                                    />
                                </div>
                                <div className="w-32">
                                    <input
                                        type="number"
                                        value={allocations[div.id] || 0}
                                        onChange={(e) => handleAllocChange(div.id, parseInt(e.target.value))}
                                        className="w-full bg-gray-800 border-b-2 border-neonCyan p-2 text-center text-sm font-bold text-white outline-none"
                                    />
                                </div>
                            </div>

                            <div className="col-span-3 grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="text-[8px] text-gray-600 mb-1">SATISFACTION</p>
                                    <div className="w-full h-1.5 bg-gray-800 rounded-full">
                                        <div
                                            className="h-full bg-neonCyan transition-all duration-500"
                                            style={{ width: `${Math.min(100, (div.customerSatisfaction * (0.5 + 0.5 * ((allocations[div.id] || 0) / div.budgetNeeded))))}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] text-gray-600 mb-1">RETENTION</p>
                                    <div className="w-full h-1.5 bg-gray-800 rounded-full">
                                        <div
                                            className="h-full bg-neonCyan transition-all duration-500"
                                            style={{ width: `${Math.min(100, (div.staffRetention * (0.4 + 0.6 * ((allocations[div.id] || 0) / div.budgetNeeded))))}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Bar */}
                <div className="flex gap-8 items-center border-t border-gray-800 pt-8">
                    <div className="flex-1 p-4 bg-black/40 border border-gray-800 text-[10px] text-gray-600 leading-relaxed uppercase tracking-widest">
                        BOARD MANDATE: MAXIMIZE RESIDUAL INCOME // MINIMIZE RESOURCE FRICTION // GOAL CONGRUENCE REQUIRED.
                    </div>

                    {feedback ? (
                        <div className={`flex-1 p-5 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={handleVerify}
                            className="flex-1 bg-neonCyan text-black font-extrabold py-5 hover:bg-white transition-all uppercase tracking-[0.4em] text-xl shadow-[10px_10px_0px_#000] active:translate-y-1 active:shadow-none"
                        >
                            {t.submit}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConglomerateTerminal;
