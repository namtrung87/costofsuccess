import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { LimitingFactorScenario, LimitingFactorProduct } from '../../data/phase27';

interface OptimizationGridProps {
    scenario: LimitingFactorScenario;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const OptimizationGrid: React.FC<OptimizationGridProps> = ({
    scenario, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [calculationInputs, setCalculationInputs] = useState<Record<string, { contribution: string, perFactor: string }>>({});
    const [rankings, setRankings] = useState<Record<string, number>>({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'THE OPTIMIZATION GRID' : 'LƯỚI TỐI ƯU HÓA',
        product: language === 'EN' ? 'Product' : 'Sản phẩm',
        contrib: language === 'EN' ? 'Contribution/Unit' : 'SDDP/Sp',
        factorNeed: language === 'EN' ? `${scenario.limitingFactorUnit}/Unit` : `${scenario.limitingFactorUnit}/Sp`,
        contribPerFactor: language === 'EN' ? `Contrib/${scenario.limitingFactorUnit}` : `SDDP/${scenario.limitingFactorUnit}`,
        rank: language === 'EN' ? 'Priority Rank' : 'Thứ tự ưu tiên',
        submit: language === 'EN' ? 'EXECUTE PRODUCTION PLAN' : 'THỰC THI KẾ HOẠCH SẢN XUẤT',
        available: language === 'EN' ? 'Resource Available' : 'Nguồn lực hiện có'
    };

    const handleInputChange = (id: string, field: 'contribution' | 'perFactor', value: string) => {
        setCalculationInputs({
            ...calculationInputs,
            [id]: { ...(calculationInputs[id] || { contribution: '', perFactor: '' }), [field]: value }
        });
    };

    const handleRankChange = (id: string, rank: number) => {
        setRankings({ ...rankings, [id]: rank });
    };

    const verifyLogic = () => {
        setIsSubmit(true);

        const productsWithStats = scenario.products.map(p => {
            const actualContrib = p.sellingPrice - p.variableCost;
            const actualPerFactor = actualContrib / p.materialNeeded;
            return { ...p, actualContrib, actualPerFactor };
        });

        // Sort by actualPerFactor to get correct ranks
        const sorted = [...productsWithStats].sort((a, b) => b.actualPerFactor - a.actualPerFactor);
        const correctRanks: Record<string, number> = {};
        sorted.forEach((p, index) => {
            correctRanks[p.id] = index + 1;
        });

        let isCorrect = true;
        scenario.products.forEach(p => {
            const stats = productsWithStats.find(ps => ps.id === p.id)!;
            const input = calculationInputs[p.id] || { contribution: '', perFactor: '' };
            const rank = rankings[p.id];

            if (
                parseFloat(input.contribution) !== stats.actualContrib ||
                parseFloat(input.perFactor) !== stats.actualPerFactor ||
                rank !== correctRanks[p.id]
            ) {
                isCorrect = false;
            }
        });

        if (isCorrect) {
            playSFX('SUCCESS');
            setFeedback({ type: 'success', msg: language === 'EN' ? 'OPTIMAL PLAN REACHED.' : 'ĐẠT KẾ HOẠCH TỐI ƯU.' });
            setTimeout(() => onComplete(10), 3000);
        } else {
            playSFX('ERROR');
            setFeedback({ type: 'error', msg: language === 'EN' ? 'INEFFICIENT ALLOCATION DETECTED.' : 'PHÁT HIỆN PHÂN BỔ KÉM HIỆU QUẢ.' });
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 2500);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white">
            <div className="max-w-6xl w-full border border-neonPink bg-gray-900 shadow-[0_0_30px_rgba(255,0,255,0.1)] p-8">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold text-neonPink tracking-widest uppercase">{t.title}</h2>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase">{t.available}</p>
                        <p className="text-xl font-bold text-neonCyan">{scenario.totalMaterialAvailable}{scenario.limitingFactorUnit} ({scenario.limitingFactorName[language]})</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse h-full">
                        <thead>
                            <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-gray-800">
                                <th className="pb-4 pt-0">{t.product}</th>
                                <th className="pb-4 pt-0">Price/VC</th>
                                <th className="pb-4 pt-0">{t.contrib}</th>
                                <th className="pb-4 pt-0">{t.factorNeed}</th>
                                <th className="pb-4 pt-0 text-neonPink">{t.contribPerFactor}</th>
                                <th className="pb-4 pt-0 text-center">{t.rank}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {scenario.products.map(p => (
                                <tr key={p.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-6">
                                        <p className="font-bold text-white">{p.name[language]}</p>
                                        <p className="text-[10px] text-gray-600">Max: {p.maxDemand} units</p>
                                    </td>
                                    <td className="py-6">
                                        <p className="text-xs text-gray-400">${p.sellingPrice} / ${p.variableCost}</p>
                                    </td>
                                    <td className="py-6">
                                        <input
                                            type="number"
                                            value={calculationInputs[p.id]?.contribution || ''}
                                            onChange={e => handleInputChange(p.id, 'contribution', e.target.value)}
                                            className="w-20 bg-gray-800 border border-gray-700 p-2 text-white outline-none focus:border-neonPink"
                                        />
                                    </td>
                                    <td className="py-6">
                                        <span className="text-gray-400 font-bold">{p.materialNeeded}{scenario.limitingFactorUnit}</span>
                                    </td>
                                    <td className="py-6">
                                        <input
                                            type="number"
                                            value={calculationInputs[p.id]?.perFactor || ''}
                                            onChange={e => handleInputChange(p.id, 'perFactor', e.target.value)}
                                            className="w-24 bg-gray-800 border border-gray-700 p-2 text-white outline-none focus:border-neonPink font-black"
                                        />
                                    </td>
                                    <td className="py-6 text-center">
                                        <div className="flex justify-center gap-2">
                                            {[1, 2, 3].map(r => (
                                                <button
                                                    key={r}
                                                    onClick={() => handleRankChange(p.id, r)}
                                                    className={`w-8 h-8 rounded-full border border-gray-700 text-xs transition-all ${rankings[p.id] === r ? 'bg-neonPink text-black border-neonPink font-bold' : 'text-gray-500 hover:border-gray-500'
                                                        }`}
                                                >
                                                    {r}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12">
                    {feedback ? (
                        <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={verifyLogic}
                            disabled={isSubmit}
                            className="w-full bg-neonPink text-black font-extrabold py-5 hover:bg-white transition-all uppercase tracking-[0.3em] text-lg"
                        >
                            {t.submit}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OptimizationGrid;
