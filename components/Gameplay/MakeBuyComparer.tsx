import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { MakeBuyScenario } from '../../data/phase28';

interface MakeBuyComparerProps {
    scenario: MakeBuyScenario;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const MakeBuyComparer: React.FC<MakeBuyComparerProps> = ({
    scenario, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [makeInputs, setMakeInputs] = useState({ vc: '', avoidable: '', total: '' });
    const [buyInputs, setBuyInputs] = useState({ price: '', total: '' });
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'MAKE OR BUY SCALER' : 'BỘ SO SÁNH TỰ LÀM / ĐI MUA',
        internal: language === 'EN' ? 'INTERNAL PRODUCTION (MAKE)' : 'SẢN XUẤT NỘI BỘ (MAKE)',
        external: language === 'EN' ? 'EXTERNAL OUTSOURCING (BUY)' : 'THUÊ NGOÀI (BUY)',
        qty: language === 'EN' ? 'Total Quantity' : 'Tổng số lượng',
        vc: language === 'EN' ? 'Variable Cost ($/unit)' : 'Biến phí ($/sp)',
        avoidable: language === 'EN' ? 'Avoidable Fixed Cost ($)' : 'Định phí tránh được ($)',
        internalTotal: language === 'EN' ? 'Total Relevant Make Cost' : 'Tổng Chi phí Liên quan (Make)',
        buyTotal: language === 'EN' ? 'Total Relevant Buy Cost' : 'Tổng Chi phí Liên quan (Buy)',
        submit: language === 'EN' ? 'FINALIZE DECISION' : 'HOÀN TẤT QUYẾT ĐỊNH',
        verdict: language === 'EN' ? 'BEST OPTION' : 'PHƯƠNG ÁN TỐI ƯU',
        saving: language === 'EN' ? 'Savings Identified' : 'Tiết kiệm được'
    };

    const actualMakeTotal = (scenario.internalVariableCost * scenario.quantityNeeded) + scenario.internalAvoidableFixedCost;
    const actualBuyTotal = scenario.externalPrice * scenario.quantityNeeded;
    const bestPath = actualMakeTotal < actualBuyTotal ? 'MAKE' : 'BUY';
    const totalSaving = Math.abs(actualBuyTotal - actualMakeTotal);

    const handleVerify = () => {
        setIsSubmit(true);

        const isMakeCorrect =
            parseFloat(makeInputs.vc) === scenario.internalVariableCost &&
            parseFloat(makeInputs.avoidable) === scenario.internalAvoidableFixedCost &&
            parseFloat(makeInputs.total) === actualMakeTotal;

        const isBuyCorrect =
            parseFloat(buyInputs.price) === scenario.externalPrice &&
            parseFloat(buyInputs.total) === actualBuyTotal;

        if (isMakeCorrect && isBuyCorrect) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? `OPTIMAL DECISION: ${bestPath}. SAVING $${totalSaving.toLocaleString()}` : `QUYẾT ĐỊNH TỐI ƯU: ${bestPath === 'MAKE' ? 'TỰ LÀM' : 'ĐI MUA'}. TIẾT KIỆM $${totalSaving.toLocaleString()}`
            });
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            setFeedback({ type: 'error', msg: language === 'EN' ? 'CALCULATION ERROR DETECTED.' : 'PHÁT HIỆN SAI SÓT TRONG TÍNH TOÁN.' });
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 2500);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white">
            <div className="max-w-5xl w-full border border-neonCyan bg-gray-900 p-10 shadow-2xl rounded-sm">
                <h2 className="text-2xl font-bold mb-8 text-neonCyan tracking-widest uppercase flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full border-2 border-neonCyan flex items-center justify-center text-xs">M/B</span>
                    {t.title}
                </h2>

                <div className="grid grid-cols-2 gap-12 mb-10">
                    {/* MAKE Side */}
                    <div className="space-y-6">
                        <h3 className="text-xs text-gray-400 font-bold uppercase border-b border-gray-800 pb-2">{t.internal}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">{t.vc}</label>
                                <input
                                    type="number"
                                    value={makeInputs.vc}
                                    onChange={e => setMakeInputs({ ...makeInputs, vc: e.target.value })}
                                    className="w-full bg-gray-800 border border-gray-700 p-3 text-neonCyan focus:border-neonCyan outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">{t.avoidable}</label>
                                <input
                                    type="number"
                                    value={makeInputs.avoidable}
                                    onChange={e => setMakeInputs({ ...makeInputs, avoidable: e.target.value })}
                                    className="w-full bg-gray-800 border border-gray-700 p-3 text-neonCyan focus:border-neonCyan outline-none"
                                    placeholder="0"
                                />
                            </div>
                            <div className="pt-4 border-t border-gray-800">
                                <label className="block text-xs font-bold text-white uppercase mb-2">{t.internalTotal}</label>
                                <input
                                    type="number"
                                    value={makeInputs.total}
                                    onChange={e => setMakeInputs({ ...makeInputs, total: e.target.value })}
                                    className="w-full bg-black border-2 border-neonCyan p-4 text-xl font-bold text-neonCyan outline-none"
                                    placeholder="TOTAL ($)"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BUY Side */}
                    <div className="space-y-6">
                        <h3 className="text-xs text-gray-400 font-bold uppercase border-b border-gray-800 pb-2">{t.external}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">{t.qty}</label>
                                <div className="p-3 bg-gray-800 border border-transparent text-gray-400 font-bold">{scenario.quantityNeeded.toLocaleString()}</div>
                            </div>
                            <div>
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">Purchase Price ($/unit)</label>
                                <input
                                    type="number"
                                    value={buyInputs.price}
                                    onChange={e => setBuyInputs({ ...buyInputs, price: e.target.value })}
                                    className="w-full bg-gray-800 border border-gray-700 p-3 text-neonPink focus:border-neonPink outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="pt-4 border-t border-gray-800">
                                <label className="block text-xs font-bold text-white uppercase mb-2">{t.buyTotal}</label>
                                <input
                                    type="number"
                                    value={buyInputs.total}
                                    onChange={e => setBuyInputs({ ...buyInputs, total: e.target.value })}
                                    className="w-full bg-black border-2 border-neonPink p-4 text-xl font-bold text-neonPink outline-none"
                                    placeholder="TOTAL ($)"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black/40 p-4 border border-gray-800 mb-8 flex justify-between items-center text-[10px] text-gray-500">
                    <span className="uppercase tracking-widest">Unavoidable Penalty: ${scenario.internalUnavoidableFixedCost.toLocaleString()} (IGNORE FOR DECISION)</span>
                    <span className="text-neonPink uppercase">Risk: {scenario.externalQualityRisk}</span>
                </div>

                {feedback ? (
                    <div className={`p-5 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                        {feedback.msg}
                    </div>
                ) : (
                    <button
                        onClick={handleVerify}
                        className="w-full bg-white text-black font-extrabold py-5 hover:bg-neonCyan transition-all uppercase tracking-[0.4em] text-lg"
                    >
                        {t.submit}
                    </button>
                )}
            </div>
        </div>
    );
};

export default MakeBuyComparer;
