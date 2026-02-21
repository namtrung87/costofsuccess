import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { MoSScenario } from '../../data/phase16';

interface MarginOfSafetyPitchProps {
    scenario: MoSScenario;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const MarginOfSafetyPitch: React.FC<MarginOfSafetyPitchProps> = ({
    scenario, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [targetUnits, setTargetUnits] = useState(scenario.breakEvenUnits); // Start at BEP
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(30);

    const { breakEvenUnits, requiredMoSPercentage, maxCapacity } = scenario;

    // Real-time calculation
    // MoS = (Expected Sales - BEP) / Expected Sales
    const currentMosPercentage = targetUnits > 0 ? ((targetUnits - breakEvenUnits) / targetUnits) * 100 : 0;

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isSubmit && timeRemaining > 0) {
            timer = setInterval(() => setTimeRemaining(t => t - 1), 1000);
        } else if (timeRemaining === 0 && !isSubmit) {
            handleVerify(true); // Auto submit on timeout
        }
        return () => clearInterval(timer);
    }, [timeRemaining, isSubmit]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTargetUnits(Number(e.target.value));
        playSFX('HOVER');
    };

    const handleVerify = (timeout: boolean = false) => {
        setIsSubmit(true);
        // We need exact match for the boss fight (25% MoS means 8000 units target when BEP is 6000)
        // 8000 - 6000 = 2000. 2000 / 8000 = 25%.
        const expectedTarget = breakEvenUnits / (1 - (requiredMoSPercentage / 100)); // 6000 / (1-0.25) = 8000

        if (Math.abs(targetUnits - expectedTarget) < 10) { // Slight buffer, but UI uses step=100 so it should be exact
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? `PROPOSAL ACCEPTED. Target locked at ${targetUnits.toLocaleString()} units.` : `CHẤP THUẬN CẤP VỐN. Đã chốt ${targetUnits.toLocaleString()} SP.`
            });
            onCorrect();
            setTimeout(() => onComplete(10), 3000);
        } else {
            playSFX('ERROR');
            const errorMsg = timeout
                ? (language === 'EN' ? "TIME EXPIRED. BOARD REJECTED THE PITCH." : "HẾT GIỜ. HỘI ĐỒNG TỪ CHỐI DỰ ÁN.")
                : (language === 'EN' ? `REJECTED. MoS is ${currentMosPercentage.toFixed(1)}%, not ${requiredMoSPercentage}%.` : `TỪ CHỐI. Biên An toàn đang là ${currentMosPercentage.toFixed(1)}%, không phải ${requiredMoSPercentage}%.`);

            setFeedback({
                type: 'error',
                msg: errorMsg
            });
            onIncorrect();
            setTimeout(() => {
                setFeedback(null);
                setIsSubmit(false);
                setTimeRemaining(30); // Reset for retry
            }, 3000);
        }
    };

    const t = {
        title: language === 'EN' ? 'THE BOARDROOM PITCH' : 'VÒNG GỌI VỐN',
        timer: language === 'EN' ? 'TIME REMAINING' : 'THỜI GIAN CÒN LẠI',
        bep: language === 'EN' ? 'BREAK-EVEN POINT' : 'ĐIỂM HÒA VỐN',
        target: language === 'EN' ? 'YOUR TARGET SALES' : 'MỤC TIÊU DOANH SỐ',
        mos: language === 'EN' ? 'CURRENT MARGIN OF SAFETY' : 'BIÊN AN TOÀN HIỆN TẠI',
        req: language === 'EN' ? `REQUIRED: ${requiredMoSPercentage}%` : `YÊU CẦU: ${requiredMoSPercentage}%`,
        verify: language === 'EN' ? 'PITCH TO BOARD' : 'CHỐT PHƯƠNG ÁN',
        risk: language === 'EN' ? 'DANGER ZONE' : 'VÙNG NGUY HIỂM'
    };

    const bepPercent = (breakEvenUnits / maxCapacity) * 100;
    const targetPercent = (targetUnits / maxCapacity) * 100;

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 overflow-hidden font-mono p-4">

            {/* Intense Boss Header */}
            <div className="absolute top-10 w-full text-center">
                <h2 className="text-3xl md:text-5xl font-heading text-red-500 tracking-widest uppercase mb-2 animate-pulse [text-shadow:_0_0_20px_rgb(239_68_68)]">{t.title}</h2>
                <div className="flex justify-center items-center gap-4 mt-4">
                    <span className="text-gray-400 text-sm">{t.timer}:</span>
                    <span className={`text-4xl font-bold ${timeRemaining <= 10 ? 'text-red-500 animate-bounce' : 'text-white'}`}>
                        {timeRemaining}s
                    </span>
                </div>
            </div>

            {/* The Pitch Interface */}
            <div className="w-full max-w-4xl bg-gray-900 border-2 border-red-900 p-8 rounded-lg mt-16 shadow-[0_0_50px_rgba(150,0,0,0.5)]">

                <div className="flex justify-between items-end border-b border-red-900 pb-4 mb-8">
                    <div>
                        <p className="text-red-500 text-sm">{t.bep}</p>
                        <p className="text-3xl font-bold text-gray-300">{breakEvenUnits.toLocaleString()} <span className="text-sm font-normal">Units</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-neonCyan text-sm font-bold animate-pulse">{t.req}</p>
                        <p className="text-sm text-gray-500">MoS = (Target - BEP) / Target</p>
                    </div>
                </div>

                {/* Live Readout */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-black border border-gray-700 p-6 flex flex-col justify-center items-center rounded">
                        <p className="text-gray-400 mb-2">{t.target}</p>
                        <p className="text-5xl font-heading text-white">{targetUnits.toLocaleString()}</p>
                    </div>
                    <div className={`border p-6 flex flex-col justify-center items-center rounded transition-colors ${currentMosPercentage >= requiredMoSPercentage ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'}`}>
                        <p className="text-gray-400 mb-2">{t.mos}</p>
                        <p className={`text-5xl font-bold ${currentMosPercentage >= requiredMoSPercentage ? 'text-green-400 shadow-[0_0_15px_#4ade80]' : 'text-red-400 animate-pulse outline-double outline-red-500 rounded p-1'}`}>
                            {currentMosPercentage.toFixed(1)}%
                        </p>
                    </div>
                </div>

                {/* The Capacity Gauge */}
                <div className="relative w-full h-12 bg-gray-800 rounded mb-4 overflow-hidden border border-gray-600">
                    {/* Danger Zone (0 to BEP) */}
                    <div
                        className="absolute top-0 left-0 h-full bg-red-900/50 border-r-2 border-red-500 flex items-center justify-center overflow-hidden"
                        style={{ width: `${bepPercent}%` }}
                    >
                        <span className="text-red-400/50 text-xs font-bold uppercase tracking-widest">{t.risk}</span>
                    </div>

                    {/* Target Marker */}
                    <div
                        className="absolute top-0 h-full w-2 bg-neonCyan shadow-[0_0_10px_#00F0FF] z-10 transition-all duration-100 ease-out"
                        style={{ left: `calc(${targetPercent}% - 4px)` }}
                    />

                    {/* Safe Zone indicator if Target > BEP */}
                    {targetUnits > breakEvenUnits && (
                        <div
                            className="absolute top-0 h-full bg-green-500/20 transition-all duration-100 ease-out"
                            style={{ left: `${bepPercent}%`, width: `${targetPercent - bepPercent}%` }}
                        />
                    )}
                </div>

                {/* Slider */}
                <div className="mb-8">
                    <input
                        type="range"
                        min={breakEvenUnits} // Don't let them pitch below BEP in the boardroom!
                        max={maxCapacity}
                        step="100"
                        value={targetUnits}
                        onChange={handleSliderChange}
                        disabled={isSubmit || timeRemaining === 0}
                        className="w-full h-4 bg-transparent rounded-lg appearance-none cursor-pointer focus:outline-none"
                        style={{ WebkitAppearance: 'none' }} // Needed to hide default slider in some browsers to use custom styles below
                    />
                </div>

                <div className="text-center">
                    {feedback ? (
                        <div className={`text-xl font-bold px-8 py-4 bg-black border-2 shadow-[0_0_30px_currentColor] ${feedback.type === 'success' ? 'text-neonCyan border-neonCyan' : 'text-red-500 border-red-500'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={() => handleVerify(false)}
                            disabled={isSubmit}
                            className="bg-red-600 hover:bg-red-500 text-black font-bold uppercase text-2xl px-16 py-4 transition-transform hover:scale-105 shadow-[0_0_15px_#dc2626] border border-red-400 w-full"
                        >
                            {t.verify}
                        </button>
                    )}
                </div>
            </div>

            <style>{`
           input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 40px;
                height: 40px;
                background: #000;
                border: 3px solid #00F0FF;
                border-radius: 5px;
                cursor: pointer;
                box-shadow: 0 0 15px #00F0FF;
                margin-top: -18px; /* align with track if needed */
           }
           input[type='range']::-webkit-slider-runnable-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: #374151; /* gray-700 */
                border-radius: 2px;
           }
        `}</style>

        </div>
    );
};

export default MarginOfSafetyPitch;
