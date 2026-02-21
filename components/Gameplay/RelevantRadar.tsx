import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { RelevantCostScenario, RelevantCostItem } from '../../data/phase26';

interface RelevantRadarProps {
    scenario: RelevantCostScenario;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const RelevantRadar: React.FC<RelevantRadarProps> = ({
    scenario, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'RELEVANT COST RADAR' : 'RA-ĐA CHI PHÍ ĐỐI CHIẾU',
        revenue: language === 'EN' ? 'Special Order Revenue' : 'Doanh thu Đơn hàng',
        instruction: language === 'EN' ? 'Select ONLY the costs that change based on this decision.' : 'Chỉ chọn các chi phí sẽ THAY ĐỔI dựa trên quyết định này.',
        analyze: language === 'EN' ? 'RUN DEAL ANALYSIS' : 'CHẠY PHÂN TÍCH KÈO',
        totalRelevant: language === 'EN' ? 'Total Relevant Cost' : 'Tổng Chi phí Đối chiếu',
        trueProfit: language === 'EN' ? 'Relevant Profit/Loss' : 'Lợi nhuận/Lỗ Đối chiếu',
        verdict: language === 'EN' ? 'VERDICT' : 'KẾT LUẬN',
        accept: language === 'EN' ? 'ACCEPT DEAL' : 'CHẤP NHẬN KÈO',
        reject: language === 'EN' ? 'REJECT DEAL' : 'TỪ CHỐI KÈO',
        itemHeader: language === 'EN' ? 'Cost Streams' : 'Dòng Chi phí'
    };

    const toggleItem = (id: string) => {
        if (isAnalyzed) return;
        playSFX('CLICK');
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const calculateResults = () => {
        let relevantCost = 0;
        scenario.items.forEach(item => {
            if (selectedIds.has(item.id)) {
                relevantCost += item.cost;
            }
        });
        return {
            relevantCost,
            relevantProfit: scenario.specialOrderRevenue - relevantCost
        };
    };

    const handleAnalyze = () => {
        setIsAnalyzed(true);

        // Check if player picked only the relevant ones
        const correctIds = scenario.items.filter(i => i.isRelevant).map(i => i.id);
        const selectedArray = Array.from(selectedIds);

        const isCostSelectionCorrect =
            selectedArray.length === correctIds.length &&
            correctIds.every(id => selectedIds.has(id));

        if (isCostSelectionCorrect) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'LOGIC VERIFIED. THE SIGNAL IS CLEAR.' : 'LOGIC HỢP LỆ. TÍN HIỆU ĐÃ RÕ RÀNG.'
            });
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? 'NOISE DETECTED. YOU ARE INCLUDING IRRELEVANT COSTS.' : 'PHÁT HIỆN NHIỄU. BẠN ĐANG ĐƯA CHI PHÍ KHÔNG LIÊN QUAN VÀO.'
            });
            setTimeout(() => { setIsAnalyzed(false); setFeedback(null); }, 3000);
        }
    };

    const { relevantCost, relevantProfit } = calculateResults();

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white overflow-y-auto">
            <div className="max-w-4xl w-full border border-neonCyan bg-gray-900 shadow-[0_0_50px_rgba(0,255,255,0.1)] p-8">
                <h2 className="text-2xl font-bold mb-2 text-neonCyan tracking-widest uppercase">{t.title}</h2>
                <p className="text-[10px] text-gray-500 mb-8 uppercase tracking-tighter">{t.instruction}</p>

                <div className="bg-black/40 p-4 border border-gray-800 flex justify-between items-center mb-6">
                    <span className="text-xs text-gray-400 uppercase">{t.revenue}</span>
                    <span className="text-2xl font-bold text-neonCyan">${scenario.specialOrderRevenue.toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {scenario.items.map(item => (
                        <div
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`p-4 border transition-all cursor-pointer group ${selectedIds.has(item.id)
                                    ? 'bg-neonCyan/10 border-neonCyan'
                                    : 'bg-black/20 border-gray-800 hover:border-gray-600'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-sm font-bold ${selectedIds.has(item.id) ? 'text-neonCyan' : 'text-white'}`}>
                                    {item.name[language]}
                                </span>
                                <span className="text-white font-bold">${item.cost.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors uppercase leading-tight mb-2">
                                {item.description[language]}
                            </p>
                            <div className="text-[8px] px-1 bg-gray-800 text-gray-500 w-fit tracking-widest">{item.category}</div>
                        </div>
                    ))}
                </div>

                {isAnalyzed && (
                    <div className={`mb-8 p-6 border-t-2 border-b-2 flex justify-between items-center ${relevantProfit >= 0 ? 'border-green-500 bg-green-900/10' : 'border-red-500 bg-red-900/10'}`}>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">{t.totalRelevant}</p>
                            <p className="text-xl font-bold">${relevantCost.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase">{t.trueProfit}</p>
                            <p className={`text-2xl font-black ${relevantProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ${relevantProfit.toLocaleString()}
                            </p>
                        </div>
                    </div>
                )}

                {feedback ? (
                    <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                        {feedback.msg}
                    </div>
                ) : (
                    <button
                        onClick={handleAnalyze}
                        className="w-full bg-neonCyan text-black font-extrabold py-5 hover:bg-white transition-all uppercase tracking-widest text-lg"
                    >
                        {t.analyze}
                    </button>
                )}
            </div>

            {/* Background Radar Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center -z-10">
                <div className="w-[800px] h-[800px] border border-neonCyan rounded-full animate-ping" />
                <div className="w-[400px] h-[400px] border border-neonCyan/50 rounded-full" />
            </div>
        </div>
    );
};

export default RelevantRadar;
