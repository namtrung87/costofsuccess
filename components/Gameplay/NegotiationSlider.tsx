import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { TransferPricingScenario } from '../../data/phase31';

interface NegotiationSliderProps {
    scenario: TransferPricingScenario;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const NegotiationSlider: React.FC<NegotiationSliderProps> = ({
    scenario, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [internalPrice, setInternalPrice] = useState(scenario.sellerMarginalCost);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'TRANSFER PRICE NEGOTIATOR' : 'BỘ ĐÀM PHÁN GIÁ CHUYỂN GIAO',
        seller: language === 'EN' ? 'SELLER: NEON FAB' : 'NGƯỜI BÁN: NEON FAB',
        buyer: language === 'EN' ? 'BUYER: NEON RETAIL' : 'NGƯỜI MUA: NEON RETAIL',
        floor: language === 'EN' ? "Seller's Floor (Min)" : "Giá Sàn người bán (Min)",
        ceiling: language === 'EN' ? "Buyer's Ceiling (Max)" : "Giá Trần người mua (Max)",
        current: language === 'EN' ? 'Proposed Internal Price' : 'Giá nội bộ đề xuất',
        submit: language === 'EN' ? 'LOCK DEAL' : 'CHỐT KÈO',
        groupImpact: language === 'EN' ? 'Group Profit Impact' : 'Tác động đến Lợi nhuận Tập đoàn',
        motivated: language === 'EN' ? 'MOTIVATED' : 'SẴN SÀNG',
        unmotivated: language === 'EN' ? 'REFUSED' : 'TỪ CHỐI'
    };

    const minPrice = scenario.sellerMarginalCost + scenario.sellerOpportunityCost;
    const maxPrice = scenario.buyerExternalPrice;

    const isSellerHappy = internalPrice >= minPrice;
    const isBuyerHappy = internalPrice <= maxPrice;
    const isGroupWinning = minPrice <= maxPrice; // In this scenario it is.

    const handleVerify = () => {
        setIsSubmit(true);
        if (isSellerHappy && isBuyerHappy) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'DEAL SECURED. GOAL CONGRUENCE ACHIEVED.' : 'KÈO ĐÃ CHỐT. ĐẠT ĐƯỢC HÒA HỢP MỤC TIÊU.'
            });
            setTimeout(() => onComplete(10), 4000);
        } else {
            playSFX('ERROR');
            const msg = !isSellerHappy
                ? (language === 'EN' ? 'Fab Manager is threatening to strike. Price too low.' : 'Quản lý Fab dọa đình công. Giá quá thấp.')
                : (language === 'EN' ? 'Retail is buying from an external supplier. Price too high.' : 'Retail đang đi mua ngoài. Giá quá cao.');
            setFeedback({ type: 'error', msg });
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 3000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 font-mono p-4 text-white">
            <div className="max-w-4xl w-full border-t-8 border-neonCyan bg-gray-900 p-10 shadow-2xl relative overflow-hidden">

                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #00ffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <h2 className="text-3xl font-black mb-12 text-center text-neonCyan tracking-tighter uppercase italic">
                    {t.title}
                </h2>

                <div className="grid grid-cols-2 gap-10 mb-16 relative z-10">
                    {/* Seller Info */}
                    <div className={`p-6 border-2 transition-all ${isSellerHappy ? 'border-green-500 bg-green-900/10' : 'border-red-500 bg-red-900/10'}`}>
                        <p className="text-xs text-gray-500 mb-2 uppercase">{t.seller}</p>
                        <p className="text-xl font-bold mb-4">{scenario.sellerName[language]}</p>
                        <div className="space-y-2 text-[10px] text-gray-400">
                            <div className="flex justify-between">
                                <span>Marginal Cost:</span> <span>${scenario.sellerMarginalCost}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Opp. Cost:</span> <span>${scenario.sellerOpportunityCost}</span>
                            </div>
                            <div className="pt-2 border-t border-gray-800 flex justify-between font-bold text-white">
                                <span>MIN PRICE:</span> <span>${minPrice}</span>
                            </div>
                        </div>
                        <div className={`mt-6 text-center py-2 font-black text-xs ${isSellerHappy ? 'text-green-500' : 'text-red-500 animate-pulse'}`}>
                            {isSellerHappy ? t.motivated : t.unmotivated}
                        </div>
                    </div>

                    {/* Buyer Info */}
                    <div className={`p-6 border-2 transition-all ${isBuyerHappy ? 'border-green-500 bg-green-900/10' : 'border-red-500 bg-red-900/10'}`}>
                        <p className="text-xs text-gray-500 mb-2 uppercase">{t.buyer}</p>
                        <p className="text-xl font-bold mb-4">{scenario.buyerName[language]}</p>
                        <div className="space-y-2 text-[10px] text-gray-400">
                            <div className="flex justify-between">
                                <span>Market Price:</span> <span>${scenario.buyerExternalPrice}</span>
                            </div>
                            <div className="pt-2 border-t border-gray-800 flex justify-between font-bold text-white">
                                <span>MAX PRICE:</span> <span>${maxPrice}</span>
                            </div>
                        </div>
                        <div className={`mt-6 text-center py-2 font-black text-xs ${isBuyerHappy ? 'text-green-500' : 'text-red-500 animate-pulse'}`}>
                            {isBuyerHappy ? t.motivated : t.unmotivated}
                        </div>
                    </div>
                </div>

                {/* The Slider */}
                <div className="relative pt-12 pb-20 px-4">
                    <div className="absolute top-0 left-0 w-full flex justify-between text-[10px] text-gray-600 font-bold px-4">
                        <span>$0</span>
                        <span>$100</span>
                    </div>

                    {/* Visualizing the valid range */}
                    <div className="absolute top-1/2 left-4 right-4 h-2 bg-gray-800 -translate-y-1/2 rounded-full overflow-hidden">
                        <div
                            className="absolute h-full bg-green-500/30 border-x border-green-500/50"
                            style={{
                                left: `${(minPrice / 100) * 100}%`,
                                width: `${((maxPrice - minPrice) / 100) * 100}%`
                            }}
                        />
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={internalPrice}
                        onChange={(e) => setInternalPrice(parseInt(e.target.value))}
                        className="w-full h-2 bg-transparent appearance-none cursor-pointer relative z-20 accent-neonCyan"
                        style={{
                            WebkitAppearance: 'none'
                        }}
                    />

                    <div
                        className="absolute flex flex-col items-center mt-4 transition-all duration-75 pointer-events-none"
                        style={{ left: `${(internalPrice / 100) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-neonCyan mb-2" />
                        <span className="text-3xl font-black text-white bg-neonCyan/20 px-3 py-1 border border-neonCyan">${internalPrice}</span>
                        <span className="text-[10px] text-neonCyan mt-1 font-bold">{t.current}</span>
                    </div>
                </div>

                {feedback ? (
                    <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                        {feedback.msg}
                    </div>
                ) : (
                    <button
                        onClick={handleVerify}
                        className="w-full bg-neonCyan text-black font-extrabold py-5 hover:bg-white transition-all uppercase tracking-widest text-lg shadow-[0_10px_0px_#008888] active:translate-y-1 active:shadow-none"
                    >
                        {t.submit}
                    </button>
                )}
            </div>
        </div>
    );
};

export default NegotiationSlider;
