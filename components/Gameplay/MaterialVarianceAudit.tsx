import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { MaterialVarianceScenario } from '../../data/phase19';

interface MaterialVarianceAuditProps {
    scenario: MaterialVarianceScenario;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const MaterialVarianceAudit: React.FC<MaterialVarianceAuditProps> = ({
    scenario, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [priceVarInput, setPriceVarInput] = useState('');
    const [usageVarInput, setUsageVarInput] = useState('');
    const [priceVarType, setPriceVarType] = useState<'F' | 'A' | null>(null);
    const [usageVarType, setUsageVarType] = useState<'F' | 'A' | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const { standardPrice, standardQuantity, actualPrice, actualQuantity, actualUnitsProduced } = scenario;
    const standardQuantityForActualProduction = actualUnitsProduced * standardQuantity;

    const t = {
        title: language === 'EN' ? 'SUPPLY CHAIN AUDIT' : 'KIỂM TOÁN CHUỖI CUNG ỨNG',
        standard: language === 'EN' ? 'STANDARD' : 'TIÊU CHUẨN',
        actual: language === 'EN' ? 'ACTUAL' : 'THỰC TẾ',
        price: language === 'EN' ? 'Price/m' : 'Giá/m',
        quantity: language === 'EN' ? 'Total Qty' : 'Tổng Lượng',
        stdUsage: language === 'EN' ? 'Std. Usage (for actual output)' : 'Định mức (cho SL thực tế)',
        priceVar: language === 'EN' ? 'Material Price Variance' : 'Biến động Giá Nguyên liệu',
        usageVar: language === 'EN' ? 'Material Usage Variance' : 'Biến động Lượng Nguyên liệu',
        audit: language === 'EN' ? 'LOCK AUDIT DATA' : 'KHÓA DỮ LIỆU KIỂM TOÁN',
        priceHint: language === 'EN' ? '(AP - SP) * AQ' : '(Giá TT - Giá ĐM) * Lượng TT',
        usageHint: language === 'EN' ? '(AQ - SQ) * SP' : '(Lượng TT - Lượng ĐM) * Giá ĐM'
    };

    const handleVerify = () => {
        setIsSubmit(true);

        // Calculations
        const expectedPriceVar = (actualPrice - standardPrice) * actualQuantity; // (36-40)*11500 = -46000 (Favorable - cost is lower)
        // Wait, in accounting a lower price is FAVORABLE. 
        // AP < SP => Favorable. 
        // (Actual Price - Standard Price) * Actual Quantity
        // (36 - 40) * 11500 = -46,000. Since cost is lower, it is Favorable.

        const expectedUsageVar = (actualQuantity - standardQuantityForActualProduction) * standardPrice;
        // (11500 - (6000 * 1.5)) * 40 = (11500 - 9000) * 40 = 2500 * 40 = 100,000 (Adverse - used more)

        const isPriceCorrect = Math.abs(parseFloat(priceVarInput)) === Math.abs(expectedPriceVar) && priceVarType === (expectedPriceVar <= 0 ? 'F' : 'A');
        const isUsageCorrect = Math.abs(parseFloat(usageVarInput)) === Math.abs(expectedUsageVar) && usageVarType === (expectedUsageVar >= 0 ? 'A' : 'F');

        if (isPriceCorrect && isUsageCorrect) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'WASTE DETECTED. LOSS ACCOUNTED.' : 'ĐÃ XÁC ĐỊNH LÃNG PHÍ. DỮ LIỆU ĐÃ LƯU.'
            });
            onCorrect();
            setTimeout(() => onComplete(10), 3000);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? 'AUDIT REJECTED. CHECK USAGE VS SPECS.' : 'KIỂM TOÁN BỊ TỪ CHỐI. KIỂM TRA LẠI HAO HỤT.'
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
            <div className="max-w-4xl w-full border-2 border-neonPink p-8 bg-gray-900 shadow-[0_0_40px_rgba(255,0,112,0.2)]">
                <h2 className="text-3xl font-heading text-neonPink mb-6 tracking-tighter uppercase">{t.title}</h2>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    {/* Targets */}
                    <div className="bg-black/50 p-6 border border-gray-800">
                        <h3 className="text-xs text-gray-500 uppercase mb-4 tracking-widest">{t.standard} TARGETS</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>{t.price}</span>
                                <span className="text-neonCyan">${standardPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Std. Qty / unit</span>
                                <span>{standardQuantity} m</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-800 pt-2 text-sm">
                                <span className="text-gray-500">{t.stdUsage}</span>
                                <span className="text-white font-bold">{standardQuantityForActualProduction.toLocaleString()} m</span>
                            </div>
                        </div>
                    </div>

                    {/* Reality */}
                    <div className="bg-black/50 p-6 border border-gray-800">
                        <h3 className="text-xs text-gray-500 uppercase mb-4 tracking-widest">{t.actual} DATA</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>{t.price}</span>
                                <span className="text-neonPink">${actualPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t.quantity}</span>
                                <span className="text-neonPink">{actualQuantity.toLocaleString()} m</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-800 pt-2 text-sm">
                                <span className="text-gray-500">Units Produced</span>
                                <span className="text-white font-bold">{actualUnitsProduced.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 bg-black/30 p-6 border border-gray-800 rounded">
                    {/* Price Var */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-12 md:col-span-6">
                            <p className="font-bold text-sm text-gray-300">{t.priceVar}</p>
                            <p className="text-[10px] text-gray-600 italic mt-1">{t.priceHint}</p>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex gap-2">
                            <input
                                type="number"
                                placeholder="Value ($)"
                                value={priceVarInput}
                                onChange={(e) => setPriceVarInput(e.target.value)}
                                disabled={isSubmit}
                                className="flex-1 bg-gray-800 border border-gray-600 px-3 py-2 text-white outline-none focus:border-neonPink"
                            />
                            <div className="flex border border-gray-600">
                                <button
                                    onClick={() => setPriceVarType('F')}
                                    className={`px-3 py-1 ${priceVarType === 'F' ? 'bg-green-600 text-white' : 'text-gray-500'}`}
                                >F</button>
                                <button
                                    onClick={() => setPriceVarType('A')}
                                    className={`px-3 py-1 ${priceVarType === 'A' ? 'bg-red-600 text-white' : 'text-gray-500'}`}
                                >A</button>
                            </div>
                        </div>
                    </div>

                    {/* Usage Var */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-12 md:col-span-6">
                            <p className="font-bold text-sm text-gray-300">{t.usageVar}</p>
                            <p className="text-[10px] text-gray-600 italic mt-1">{t.usageHint}</p>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex gap-2">
                            <input
                                type="number"
                                placeholder="Value ($)"
                                value={usageVarInput}
                                onChange={(e) => setUsageVarInput(e.target.value)}
                                disabled={isSubmit}
                                className="flex-1 bg-gray-800 border border-gray-600 px-3 py-2 text-white outline-none focus:border-neonPink"
                            />
                            <div className="flex border border-gray-600">
                                <button
                                    onClick={() => setUsageVarType('F')}
                                    className={`px-3 py-1 ${usageVarType === 'F' ? 'bg-green-600 text-white' : 'text-gray-500'}`}
                                >F</button>
                                <button
                                    onClick={() => setUsageVarType('A')}
                                    className={`px-3 py-1 ${usageVarType === 'A' ? 'bg-red-600 text-white' : 'text-gray-500'}`}
                                >A</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    {feedback ? (
                        <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={handleVerify}
                            disabled={!priceVarInput || !usageVarInput || !priceVarType || !usageVarType || isSubmit}
                            className="w-full bg-neonPink text-white font-bold py-4 hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,0,112,0.4)] uppercase tracking-tighter text-xl"
                        >
                            {t.audit}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MaterialVarianceAudit;
