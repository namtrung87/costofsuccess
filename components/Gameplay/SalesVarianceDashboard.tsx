import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { SalesVarianceScenario } from '../../data/phase18';

interface SalesVarianceDashboardProps {
    scenario: SalesVarianceScenario;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const SalesVarianceDashboard: React.FC<SalesVarianceDashboardProps> = ({
    scenario, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [priceVarInput, setPriceVarInput] = useState('');
    const [volumeVarInput, setVolumeVarInput] = useState('');
    const [priceVarType, setPriceVarType] = useState<'F' | 'A' | null>(null);
    const [volumeVarType, setVolumeVarType] = useState<'F' | 'A' | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const { standardSellingPrice, standardProfitPerUnit, budgetedQuantity, actualSellingPrice, actualQuantity } = scenario;

    const t = {
        title: language === 'EN' ? 'SALES PERFORMANCE RADAR' : 'RADAR HIỆU SUẤT BÁN HÀNG',
        budget: language === 'EN' ? 'BUDGET' : 'NGÂN SÁCH',
        actual: language === 'EN' ? 'ACTUAL' : 'THỰC TẾ',
        price: language === 'EN' ? 'Price' : 'Giá',
        volume: language === 'EN' ? 'Volume' : 'Lượng',
        profitPerUnit: language === 'EN' ? 'Std. Profit/Unit' : 'LNĐM/Đơn vị',
        priceVar: language === 'EN' ? 'Sales Price Variance' : 'Biến động Giá bán',
        volumeVar: language === 'EN' ? 'Sales Volume Profit Var' : 'Biến động Lượng (Lợi nhuận)',
        favorable: language === 'EN' ? 'Favorable (F)' : 'Có lợi (F)',
        adverse: language === 'EN' ? 'Adverse (A)' : 'Bất lợi (A)',
        analyze: language === 'EN' ? 'SUBMIT ANALYSIS' : 'GỬI PHÂN TÍCH',
        formula: language === 'EN' ? 'Formula Hint' : 'Gợi ý công thức',
        priceHint: language === 'EN' ? '(AP - SP) * AQ' : '(Giá TT - Giá ĐM) * Lượng TT',
        volumeHint: language === 'EN' ? '(AQ - BQ) * Std. Profit' : '(Lượng TT - Lượng NS) * LN ĐM'
    };

    const handleVerify = () => {
        setIsSubmit(true);

        // Calculations
        const expectedPriceVar = (actualSellingPrice - standardSellingPrice) * actualQuantity; // (180-200)*6500 = -130000 (Adverse)
        const expectedVolumeVar = (actualQuantity - budgetedQuantity) * standardProfitPerUnit; // (6500-5000)*80 = 120000 (Favorable)

        const isPriceCorrect = Math.abs(parseFloat(priceVarInput)) === Math.abs(expectedPriceVar) && priceVarType === (expectedPriceVar >= 0 ? 'F' : 'A');
        const isVolumeCorrect = Math.abs(parseFloat(volumeVarInput)) === Math.abs(expectedVolumeVar) && volumeVarType === (expectedVolumeVar >= 0 ? 'F' : 'A');

        if (isPriceCorrect && isVolumeCorrect) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'ANALYSIS COMPLETED. DATA SYNCHRONIZED.' : 'PHÂN TÍCH HOÀN TẤT. DỮ LIỆU ĐÃ KHỚP.'
            });
            onCorrect();
            setTimeout(() => onComplete(10), 3000);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? 'DISCREPANCY DETECTED. RE-CHECK FORMULAS.' : 'PHÁT HIỆU SAI SỐ. KIỂM TRA LẠI CÔNG THỨC.'
            });
            onIncorrect();
            setTimeout(() => {
                setIsSubmit(false);
                setFeedback(null);
            }, 2000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white overflow-y-auto">
            <div className="max-w-5xl w-full border border-gray-700 bg-gray-900 rounded-lg p-8 shadow-2xl">
                <h2 className="text-3xl font-heading text-neonCyan mb-8 tracking-widest text-center uppercase">{t.title}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {/* Data Panel */}
                    <div className="space-y-4 border-r border-gray-800 pr-8">
                        <h3 className="text-neonPink uppercase text-xs tracking-widest mb-4 font-bold">RAW DATA SECTOR</h3>

                        <div className="bg-black/40 p-4 border border-gray-800 flex justify-between">
                            <span className="text-gray-500">{t.budget} {t.volume}</span>
                            <span className="font-bold">{budgetedQuantity.toLocaleString()} u</span>
                        </div>
                        <div className="bg-black/40 p-4 border border-gray-800 flex justify-between">
                            <span className="text-gray-500">{t.budget} {t.price}</span>
                            <span className="font-bold">${standardSellingPrice}</span>
                        </div>
                        <div className="bg-black/40 p-4 border border-gray-800 flex justify-between">
                            <span className="text-gray-500">{t.profitPerUnit}</span>
                            <span className="font-bold text-neonCyan">${standardProfitPerUnit}</span>
                        </div>
                        <div className="h-4" />
                        <div className="bg-neonCyan/10 p-4 border border-neonCyan/30 flex justify-between">
                            <span className="text-neonCyan/80">{t.actual} {t.volume}</span>
                            <span className="font-bold text-white">{actualQuantity.toLocaleString()} u</span>
                        </div>
                        <div className="bg-neonCyan/10 p-4 border border-neonCyan/30 flex justify-between">
                            <span className="text-neonCyan/80">{t.actual} {t.price}</span>
                            <span className="font-bold text-white">${actualSellingPrice}</span>
                        </div>
                    </div>

                    {/* Analysis Panel */}
                    <div className="space-y-8">
                        <h3 className="text-neonPink uppercase text-xs tracking-widest font-bold">CALCULATION MODULE</h3>

                        {/* Price Variance */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-sm font-bold text-gray-300">{t.priceVar}</label>
                                <span className="text-[10px] text-gray-600 italic">{t.formula}: {t.priceHint}</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Value ($)"
                                    value={priceVarInput}
                                    onChange={(e) => setPriceVarInput(e.target.value)}
                                    disabled={isSubmit}
                                    className="flex-1 bg-black border border-gray-700 px-4 py-3 text-white focus:border-neonCyan outline-none"
                                />
                                <button
                                    onClick={() => setPriceVarType('F')}
                                    className={`px-4 py-2 border ${priceVarType === 'F' ? 'bg-green-600 border-green-500 text-white shadow-[0_0_10px_#16a34a]' : 'border-gray-700 text-gray-500 opacity-50'}`}
                                >F</button>
                                <button
                                    onClick={() => setPriceVarType('A')}
                                    className={`px-4 py-2 border ${priceVarType === 'A' ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_#dc2626]' : 'border-gray-700 text-gray-500 opacity-50'}`}
                                >A</button>
                            </div>
                        </div>

                        {/* Volume Variance */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-sm font-bold text-gray-300">{t.volumeVar}</label>
                                <span className="text-[10px] text-gray-600 italic">{t.formula}: {t.volumeHint}</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Value ($)"
                                    value={volumeVarInput}
                                    onChange={(e) => setVolumeVarInput(e.target.value)}
                                    disabled={isSubmit}
                                    className="flex-1 bg-black border border-gray-700 px-4 py-3 text-white focus:border-neonCyan outline-none"
                                />
                                <button
                                    onClick={() => setVolumeVarType('F')}
                                    className={`px-4 py-2 border ${volumeVarType === 'F' ? 'bg-green-600 border-green-500 text-white shadow-[0_0_10px_#16a34a]' : 'border-gray-700 text-gray-500 opacity-50'}`}
                                >F</button>
                                <button
                                    onClick={() => setVolumeVarType('A')}
                                    className={`px-4 py-2 border ${volumeVarType === 'A' ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_#dc2626]' : 'border-gray-700 text-gray-500 opacity-50'}`}
                                >A</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-gray-800">
                    {feedback ? (
                        <div className={`p-4 border-2 text-xl font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={handleVerify}
                            disabled={!priceVarInput || !volumeVarInput || !priceVarType || !volumeVarType || isSubmit}
                            className="px-16 py-4 bg-neonCyan text-black font-extrabold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_#00F0FF] transition-all disabled:opacity-30"
                        >
                            {t.analyze}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesVarianceDashboard;
