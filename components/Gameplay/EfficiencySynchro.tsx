import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { LaborVOHScenario } from '../../data/phase20';

interface EfficiencySynchroProps {
    scenario: LaborVOHScenario;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const EfficiencySynchro: React.FC<EfficiencySynchroProps> = ({
    scenario, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [tab, setTab] = useState<'LABOR' | 'VOH'>('LABOR');
    const [inputs, setInputs] = useState({
        laborRate: '', laborRateType: null as 'F' | 'A' | null,
        laborEff: '', laborEffType: null as 'F' | 'A' | null,
        vohExp: '', vohExpType: null as 'F' | 'A' | null,
        vohEff: '', vohEffType: null as 'F' | 'A' | null
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const { standardLaborRate, standardLaborHoursPerUnit, standardVOHRate, actualLaborRate, actualLaborHours, actualVOH, actualUnitsProduced } = scenario;
    const standardHoursAllowed = actualUnitsProduced * standardLaborHoursPerUnit;

    const t = {
        title: language === 'EN' ? 'EFFICIENCY SYNCHRO TERMINAL' : 'TRẠM ĐỒNG BỘ HIỆU SUẤT',
        laborTab: language === 'EN' ? 'LABOR VARIANCES' : 'BIẾN ĐỘNG NHÂN CÔNG',
        vohTab: language === 'EN' ? 'VOH VARIANCES' : 'BIẾN ĐỘNG VOH',
        rateVar: language === 'EN' ? 'Labor Rate Variance' : 'Biến động Đơn giá lương',
        effVar: language === 'EN' ? 'Labor Efficiency Variance' : 'Biến động Hiệu suất lương',
        vohExpVar: language === 'EN' ? 'VOH Expenditure Variance' : 'Biến động Chi tiêu VOH',
        vohEffVar: language === 'EN' ? 'VOH Efficiency Variance' : 'Biến động Hiệu suất VOH',
        sync: language === 'EN' ? 'INITIATE SYNC' : 'KHỞI CHẠY ĐỒNG BỘ',
        actualHours: language === 'EN' ? 'Actual Hours' : 'Giờ thực tế',
        stdHours: language === 'EN' ? 'Std. Hours Allowed' : 'Giờ tiêu chuẩn cho phép',
        actualRate: language === 'EN' ? 'Actual Rate' : 'Đơn giá thực tế',
        stdRate: language === 'EN' ? 'Standard Rate' : 'Đơn giá tiêu chuẩn'
    };

    const handleVerify = () => {
        setIsSubmit(true);

        // Labor
        const expLaborRate = (actualLaborRate - standardLaborRate) * actualLaborHours; // (28-30)*13k = -26k (F)
        const expLaborEff = (actualLaborHours - standardHoursAllowed) * standardLaborRate; // (13k-11k)*30 = 60k (A)
        // VOH
        const expVohExp = actualVOH - (actualLaborHours * standardVOHRate); // 135k - (13k*10) = 5k (A)
        const expVohEff = (actualLaborHours - standardHoursAllowed) * standardVOHRate; // (13k-11k)*10 = 20k (A)

        const check = (val: string, type: string | null, expected: number) => {
            const isF = expected <= 0;
            return Math.abs(parseFloat(val)) === Math.abs(expected) && type === (isF ? 'F' : 'A');
        };

        const isLaborCorrect = check(inputs.laborRate, inputs.laborRateType, expLaborRate) &&
            check(inputs.laborEff, inputs.laborEffType, expLaborEff);
        const isVohCorrect = check(inputs.vohExp, inputs.vohExpType, expVohExp) &&
            check(inputs.vohEff, inputs.vohEffType, expVohEff);

        if (isLaborCorrect && isVohCorrect) {
            playSFX('SUCCESS');
            setFeedback({ type: 'success', msg: language === 'EN' ? 'EFFICIENCY SYNCED. SYSTEM STABLE.' : 'ĐỒNG BỘ HOÀN TẤT. HỆ THỐNG ỔN ĐỊNH.' });
            onCorrect();
            setTimeout(() => onComplete(10), 3000);
        } else {
            playSFX('ERROR');
            setFeedback({ type: 'error', msg: language === 'EN' ? 'EFFICIENCY MISMATCH. SYNC FAILED.' : 'SAI LỆCH HIỆU SUẤT. ĐỒNG BỘ THẤT BẠI.' });
            onIncorrect();
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 2000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white">
            <div className="max-w-5xl w-full border border-neonCyan bg-gray-900 shadow-[0_0_30px_#00F0FF33]">
                <div className="flex border-b border-neonCyan/30">
                    <button onClick={() => setTab('LABOR')} className={`flex-1 py-4 font-bold transition-all ${tab === 'LABOR' ? 'bg-neonCyan text-black' : 'text-gray-500 hover:text-white'}`}>
                        {t.laborTab}
                    </button>
                    <button onClick={() => setTab('VOH')} className={`flex-1 py-4 font-bold transition-all ${tab === 'VOH' ? 'bg-neonCyan text-black' : 'text-gray-500 hover:text-white'}`}>
                        {t.vohTab}
                    </button>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-2 gap-8 mb-8 text-xs text-gray-400">
                        <div className="space-y-2 border-r border-gray-800 pr-8">
                            <div className="flex justify-between"><span>{t.actualHours}:</span> <span className="text-white font-bold">{actualLaborHours.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span>{t.stdHours}:</span> <span className="text-neonCyan font-bold">{standardHoursAllowed.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span>{t.actualRate}:</span> <span className="text-white font-bold">${actualLaborRate}</span></div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between"><span>{t.stdRate} (Labor):</span> <span className="text-white font-bold">${standardLaborRate}/h</span></div>
                            <div className="flex justify-between"><span>{t.stdRate} (VOH):</span> <span className="text-white font-bold">${standardVOHRate}/h</span></div>
                            <div className="flex justify-between"><span>Actual Total VOH:</span> <span className="text-neonPink font-bold">${actualVOH.toLocaleString()}</span></div>
                        </div>
                    </div>

                    {tab === 'LABOR' ? (
                        <div className="space-y-6">
                            <div className="bg-black/40 p-6 border border-gray-800 rounded">
                                <p className="text-sm font-bold text-neonCyan mb-4 uppercase">{t.rateVar}</p>
                                <div className="flex gap-4">
                                    <input type="number" placeholder="Value ($)" value={inputs.laborRate} onChange={e => setInputs({ ...inputs, laborRate: e.target.value })} className="flex-1 bg-gray-800 border border-gray-700 p-3 text-white focus:border-neonCyan outline-none" />
                                    <div className="flex border border-gray-700">
                                        <button onClick={() => setInputs({ ...inputs, laborRateType: 'F' })} className={`px-4 py-2 ${inputs.laborRateType === 'F' ? 'bg-green-600 text-white' : 'text-gray-500'}`}>F</button>
                                        <button onClick={() => setInputs({ ...inputs, laborRateType: 'A' })} className={`px-4 py-2 ${inputs.laborRateType === 'A' ? 'bg-red-600 text-white' : 'text-gray-500'}`}>A</button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black/40 p-6 border border-gray-800 rounded">
                                <p className="text-sm font-bold text-neonCyan mb-4 uppercase">{t.effVar}</p>
                                <div className="flex gap-4">
                                    <input type="number" placeholder="Value ($)" value={inputs.laborEff} onChange={e => setInputs({ ...inputs, laborEff: e.target.value })} className="flex-1 bg-gray-800 border border-gray-700 p-3 text-white focus:border-neonCyan outline-none" />
                                    <div className="flex border border-gray-700">
                                        <button onClick={() => setInputs({ ...inputs, laborEffType: 'F' })} className={`px-4 py-2 ${inputs.laborEffType === 'F' ? 'bg-green-600 text-white' : 'text-gray-500'}`}>F</button>
                                        <button onClick={() => setInputs({ ...inputs, laborEffType: 'A' })} className={`px-4 py-2 ${inputs.laborEffType === 'A' ? 'bg-red-600 text-white' : 'text-gray-500'}`}>A</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-black/40 p-6 border border-gray-800 rounded">
                                <p className="text-sm font-bold text-neonPink mb-4 uppercase">{t.vohExpVar}</p>
                                <div className="flex gap-4">
                                    <input type="number" placeholder="Value ($)" value={inputs.vohExp} onChange={e => setInputs({ ...inputs, vohExp: e.target.value })} className="flex-1 bg-gray-800 border border-gray-700 p-3 text-white focus:border-neonPink outline-none" />
                                    <div className="flex border border-gray-700">
                                        <button onClick={() => setInputs({ ...inputs, vohExpType: 'F' })} className={`px-4 py-2 ${inputs.vohExpType === 'F' ? 'bg-green-600 text-white' : 'text-gray-500'}`}>F</button>
                                        <button onClick={() => setInputs({ ...inputs, vohExpType: 'A' })} className={`px-4 py-2 ${inputs.vohExpType === 'A' ? 'bg-red-600 text-white' : 'text-gray-500'}`}>A</button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black/40 p-6 border border-gray-800 rounded">
                                <p className="text-sm font-bold text-neonPink mb-4 uppercase">{t.vohEffVar}</p>
                                <div className="flex gap-4">
                                    <input type="number" placeholder="Value ($)" value={inputs.vohEff} onChange={e => setInputs({ ...inputs, vohEff: e.target.value })} className="flex-1 bg-gray-800 border border-gray-700 p-3 text-white focus:border-neonPink outline-none" />
                                    <div className="flex border border-gray-700">
                                        <button onClick={() => setInputs({ ...inputs, vohEffType: 'F' })} className={`px-4 py-2 ${inputs.vohEffType === 'F' ? 'bg-green-600 text-white' : 'text-gray-500'}`}>F</button>
                                        <button onClick={() => setInputs({ ...inputs, vohEffType: 'A' })} className={`px-4 py-2 ${inputs.vohEffType === 'A' ? 'bg-red-600 text-white' : 'text-gray-500'}`}>A</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8">
                        {feedback ? (
                            <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                                {feedback.msg}
                            </div>
                        ) : (
                            <button
                                onClick={handleVerify}
                                disabled={isSubmit}
                                className="w-full bg-neonCyan text-black font-extrabold py-4 hover:bg-white transition-all shadow-[0_0_20px_#00F0FF66] uppercase tracking-tighter text-xl"
                            >
                                {t.sync}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EfficiencySynchro;
