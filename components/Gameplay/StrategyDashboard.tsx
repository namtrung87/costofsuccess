import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { StrategyBossData, StrategyProduct } from '../../data/phase30';

interface StrategyDashboardProps {
    data: StrategyBossData;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const StrategyDashboard: React.FC<StrategyDashboardProps> = ({
    data, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [rankings, setRankings] = useState<Record<string, number>>({});
    const [allocations, setAllocations] = useState<Record<string, number>>({});
    const [currentMaterialLeft, setCurrentMaterialLeft] = useState(data.totalAvailableMaterial);
    const [currentProfit, setCurrentProfit] = useState(-data.fixedCosts);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'THE GRAND STRATEGY TERMINAL' : 'HỆ THỐNG ĐIỀU PHỐI CHIẾN LƯỢC',
        material: language === 'EN' ? 'Raw Material Pool' : 'Tổng kho Nguyên liệu',
        profitTarget: language === 'EN' ? 'Target Profit' : 'Mục tiêu Lợi nhuận',
        currentProfit: language === 'EN' ? 'Projected Profit' : 'Lợi nhuận Dự kiến',
        submit: language === 'EN' ? 'COMMIT ALLOCATION' : 'XÁC NHẬN PHÂN BỔ',
        rank: language === 'EN' ? 'Rank' : 'Hạng',
        qty: language === 'EN' ? 'Units' : 'Sp',
        demand: language === 'EN' ? 'Demand' : 'Nhu cầu',
        status: language === 'EN' ? 'SYSTEM STATUS' : 'TRẠNG THÁI HỆ THỐNG'
    };

    useEffect(() => {
        let materialUsed = 0;
        let totalContrib = 0;

        Object.entries(allocations).forEach(([id, qty]) => {
            const p = data.products.find(prod => prod.id === id);
            if (p) {
                materialUsed += Number(qty) * Number(p.materialNeeded);
                totalContrib += Number(qty) * (Number(p.price) - Number(p.variableCost));
            }
        });

        setCurrentMaterialLeft(data.totalAvailableMaterial - materialUsed);
        setCurrentProfit(totalContrib - data.fixedCosts);
    }, [allocations, data]);

    const handleRankChange = (id: string, rank: number) => {
        setRankings({ ...rankings, [id]: rank });
    };

    const handleQtyChange = (id: string, qty: number) => {
        // Basic validation: qty cannot exceed demand or exceed material (handled by UI feedback)
        const p = data.products.find(prod => prod.id === id)!;
        const finalQty = Math.max(0, Math.min(qty, p.maxDemand));
        setAllocations({ ...allocations, [id]: finalQty });
    };

    const handleVerify = () => {
        setIsSubmit(true);

        // 1. Check if rankings are correct (by contrib/m)
        const productsWithStats = data.products.map(p => ({
            ...p,
            contribPerMeter: (p.price - p.variableCost) / p.materialNeeded
        }));
        const sorted = [...productsWithStats].sort((a, b) => b.contribPerMeter - a.contribPerMeter);

        let isRankingCorrect = true;
        sorted.forEach((p, index) => {
            if (rankings[p.id] !== index + 1) isRankingCorrect = false;
        });

        // 2. Check if profit meets target
        const isProfitTargetMet = currentProfit >= data.targetProfit;

        // 3. Check if resource is allocated optimally (no material left if there is unfilled demand for higher rank)
        let isOptimal = true;
        if (currentMaterialLeft < 0) isOptimal = false;

        if (isRankingCorrect && isProfitTargetMet && isOptimal) {
            playSFX('SUCCESS');
            setFeedback({ type: 'success', msg: language === 'EN' ? 'STRATEGIC OBJECTIVE ACHIEVED.' : 'ĐÃ ĐẠT ĐƯỢC MỤC TIÊU CHIẾN LƯỢC.' });
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            let errorMsg = language === 'EN' ? 'ALLOCATION FAILURE.' : 'PHÂN BỔ THẤT BẠI.';
            if (!isRankingCorrect) errorMsg += language === 'EN' ? ' Check your Priority Ranks.' : ' Kiểm tra lại Thứ tự ưu tiên.';
            else if (!isProfitTargetMet) errorMsg += language === 'EN' ? ' Target Profit not reached.' : ' Chưa đạt mục tiêu lợi nhuận.';
            else if (currentMaterialLeft < 0) errorMsg += language === 'EN' ? ' Resource Overdraft!' : ' Vượt quá nguồn lực!';

            setFeedback({ type: 'error', msg: errorMsg });
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 3000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black font-mono text-white p-4">
            <div className="max-w-6xl w-full border-4 border-double border-neonCyan bg-gray-900/80 backdrop-blur-md p-10 shadow-[0_0_100px_rgba(0,255,255,0.2)]">

                {/* Header Dashboard */}
                <div className="grid grid-cols-3 gap-8 mb-12 border-b-2 border-neonCyan pb-8">
                    <div className="bg-black/60 p-4 border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase mb-2">{t.material}</p>
                        <p className={`text-3xl font-black ${currentMaterialLeft < 0 ? 'text-red-500 animate-pulse' : 'text-neonCyan'}`}>
                            {currentMaterialLeft.toLocaleString()}{language === 'EN' ? 'm' : 'm'}
                        </p>
                        <p className="text-[8px] text-gray-600 mt-1">AVAILABLE: {data.totalAvailableMaterial}m</p>
                    </div>
                    <div className="bg-black/60 p-4 border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase mb-2">{t.profitTarget}</p>
                        <p className="text-3xl font-black text-white">${data.targetProfit.toLocaleString()}</p>
                    </div>
                    <div className={`p-4 border-2 transition-all ${currentProfit >= data.targetProfit ? 'bg-green-600/20 border-green-500' : 'bg-red-600/10 border-red-900'}`}>
                        <p className="text-[10px] text-gray-400 uppercase mb-2">{t.currentProfit}</p>
                        <p className={`text-3xl font-black ${currentProfit >= data.targetProfit ? 'text-green-400' : 'text-red-400'}`}>
                            ${currentProfit.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Product Allocation Table */}
                <div className="space-y-6 mb-12">
                    {data.products.map(p => (
                        <div key={p.id} className="grid grid-cols-12 gap-6 items-center bg-black/40 p-5 border border-gray-800 hover:border-neonCyan transition-all">
                            <div className="col-span-3">
                                <p className="text-lg font-bold text-white uppercase">{p.name[language]}</p>
                                <p className="text-[10px] text-gray-500">
                                    PRICE: ${p.price} | VC: ${p.variableCost} | NEED: {p.materialNeeded}m
                                </p>
                            </div>

                            <div className="col-span-2 text-center">
                                <p className="text-[10px] text-gray-600 uppercase mb-2">{t.rank}</p>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3].map(r => (
                                        <button
                                            key={r}
                                            onClick={() => handleRankChange(p.id, r)}
                                            className={`w-7 h-7 rounded border transition-all text-xs font-bold ${rankings[p.id] === r ? 'bg-neonCyan text-black border-neonCyan' : 'border-gray-700 text-gray-600'}`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-4 flex items-center gap-4">
                                <div className="flex-1">
                                    <p className="text-[10px] text-gray-600 uppercase mb-2 text-center">{t.qty}</p>
                                    <input
                                        type="range"
                                        min="0"
                                        max={p.maxDemand}
                                        value={allocations[p.id] || 0}
                                        onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value))}
                                        className="w-full accent-neonCyan"
                                    />
                                </div>
                                <div className="w-16">
                                    <input
                                        type="number"
                                        value={allocations[p.id] || 0}
                                        onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value))}
                                        className="w-full bg-gray-800 border border-gray-700 p-2 text-center text-sm font-bold text-neonCyan outline-none"
                                    />
                                </div>
                            </div>

                            <div className="col-span-3 text-right">
                                <p className="text-[10px] text-gray-600 uppercase mb-1">{t.demand}</p>
                                <p className="text-sm font-bold opacity-60">{p.maxDemand} UNITS</p>
                                <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-neonCyan transition-all duration-500"
                                        style={{ width: `${((allocations[p.id] || 0) / p.maxDemand) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center gap-8">
                    <div className="flex-1 bg-black/40 border border-gray-800 p-4 text-[10px] text-gray-600 uppercase tracking-widest leading-loose">
                        {t.status}: SYSTEM READY // PRIORITY QUEUE ACTIVE // BOTTLENECK: {data.materialName[language]}
                    </div>

                    {feedback ? (
                        <div className={`flex-1 p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={handleVerify}
                            className="flex-1 bg-neonCyan text-black font-extrabold py-5 hover:bg-white transition-all uppercase tracking-[0.5em] text-xl shadow-[8px_8px_0px_#000] active:translate-y-1 active:shadow-none"
                        >
                            {t.submit}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StrategyDashboard;
