import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { MaterialMixYieldScenario } from '../../data/phase24';

interface MaterialMixYieldAuditProps {
    scenario: MaterialMixYieldScenario;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const MaterialMixYieldAudit: React.FC<MaterialMixYieldAuditProps> = ({
    scenario, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [mixInputs, setMixInputs] = useState<Record<string, string>>({});
    const [mixTypes, setMixTypes] = useState<Record<string, 'F' | 'A' | null>>({});
    const [yieldInput, setYieldInput] = useState('');
    const [yieldType, setYieldType] = useState<'F' | 'A' | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const totalActualQty = scenario.materials.reduce((acc, m) => acc + m.actualQuantity, 0);
    const totalStandardQtyForActualYield = scenario.actualUnitsProduced * scenario.standardYieldPerUnitTotal;

    // Expected Mix Variances
    // Formula: (Actual Qty in Actual Mix - Actual Qty in Standard Mix) * Std. Price
    const expectedMixVars = scenario.materials.reduce((acc, m) => {
        const actualInStdMix = totalActualQty * m.standardMixPercent;
        acc[m.id] = (m.actualQuantity - actualInStdMix) * m.standardPrice;
        return acc;
    }, {} as Record<string, number>);

    // Expected Yield Variance
    // Formula: (Total Actual Input Qty - Total Standard Qty for Actual Yield) * Weighted Average Std. Price
    const weightedAvgStdPrice = scenario.materials.reduce((acc, m) => acc + (m.standardPrice * m.standardMixPercent), 0);
    const expectedYieldVar = (totalActualQty - totalStandardQtyForActualYield) * weightedAvgStdPrice;

    const t = {
        title: language === 'EN' ? 'SECRET SAUCE ANALYZER' : 'PHÂN TÍCH CÔNG THỨC BÍ MẬT',
        actualInput: language === 'EN' ? 'Actual Total Input' : 'Tổng đầu vào TT',
        stdYield: language === 'EN' ? 'Std. Input for Actual Yield' : 'Đầu vào ĐM cho SL thực tế',
        mixSection: language === 'EN' ? 'Material Mix' : 'Hợp phần Nguyên liệu',
        yieldSection: language === 'EN' ? 'Material Yield' : 'Hiệu suất Nguyên liệu',
        submit: language === 'EN' ? 'RUN FULL DIAGNOSTIC' : 'CHẠY PHÂN TÍCH TỔNG THỂ',
        actual: language === 'EN' ? 'Actual' : 'Thực tế',
        stdInMix: language === 'EN' ? 'Std. In Mix' : 'ĐM trong Hợp phần'
    };

    const handleVerify = () => {
        setIsSubmit(true);

        let isMixCorrect = true;
        scenario.materials.forEach(m => {
            const input = mixInputs[m.id] || '';
            const type = mixTypes[m.id];
            const expected = expectedMixVars[m.id];
            if (Math.abs(parseFloat(input)) !== Math.abs(expected) || type !== (expected <= 0 ? 'F' : 'A')) {
                isMixCorrect = false;
            }
        });

        const isYieldCorrect = Math.abs(parseFloat(yieldInput)) === Math.abs(expectedYieldVar) && yieldType === (expectedYieldVar <= 0 ? 'F' : 'A');

        if (isMixCorrect && isYieldCorrect) {
            playSFX('SUCCESS');
            setFeedback({ type: 'success', msg: language === 'EN' ? 'MIX & YIELD SYNCHRONIZED.' : 'ĐỒNG BỘ HỢP PHẦN & HIỆU SUẤT THÀNH CÔNG.' });
            onCorrect();
            setTimeout(() => onComplete(10), 3000);
        } else {
            playSFX('ERROR');
            setFeedback({ type: 'error', msg: language === 'EN' ? 'FORMULA MISMATCH DETECTED.' : 'PHÁT HIỆN SAI LỆCH CÔNG THỨC.' });
            onIncorrect();
            setTimeout(() => { setIsSubmit(false); setFeedback(null); }, 2000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 font-mono p-4 text-white">
            <div className="max-w-5xl w-full border-t-4 border-neonCyan bg-gray-900 p-8 shadow-[0_0_40px_rgba(0,240,255,0.2)]">
                <h2 className="text-2xl font-bold mb-8 text-neonCyan tracking-widest uppercase">{t.title}</h2>

                <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="bg-black/40 p-6 border border-gray-800">
                        <p className="text-xs text-gray-500 uppercase mb-4">{t.mixSection}</p>
                        <div className="space-y-6">
                            {scenario.materials.map(m => (
                                <div key={m.id} className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span>{m.name[language]}</span>
                                        <span className="text-gray-500">{t.actual}: {m.actualQuantity}m | {t.stdInMix}: {totalActualQty * m.standardMixPercent}m</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Mix Var ($)"
                                            value={mixInputs[m.id] || ''}
                                            onChange={e => setMixInputs({ ...mixInputs, [m.id]: e.target.value })}
                                            className="flex-1 bg-gray-800 border border-gray-700 p-2 text-white outline-none focus:border-neonCyan"
                                        />
                                        <div className="flex border border-gray-700">
                                            <button onClick={() => setMixTypes({ ...mixTypes, [m.id]: 'F' })} className={`px-3 ${mixTypes[m.id] === 'F' ? 'bg-green-600 text-white' : 'text-gray-500'}`}>F</button>
                                            <button onClick={() => setMixTypes({ ...mixTypes, [m.id]: 'A' })} className={`px-3 ${mixTypes[m.id] === 'A' ? 'bg-red-600 text-white' : 'text-gray-500'}`}>A</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-black/40 p-6 border border-gray-800 flex flex-col">
                        <p className="text-xs text-gray-500 uppercase mb-4">{t.yieldSection}</p>
                        <div className="space-y-4 flex-1">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400">{t.actualInput}</p>
                                <p className="text-xl font-bold">{totalActualQty.toLocaleString()}m</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400">{t.stdYield}</p>
                                <p className="text-xl font-bold text-neonCyan">{totalStandardQtyForActualYield.toLocaleString()}m</p>
                            </div>
                            <div className="pt-4 border-t border-gray-800">
                                <p className="text-xs text-neonPink uppercase mb-2">Total Yield Variance ($)</p>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Yield Var ($)"
                                        value={yieldInput}
                                        onChange={e => setYieldInput(e.target.value)}
                                        className="flex-1 bg-gray-800 border border-gray-700 p-2 text-white outline-none focus:border-neonPink"
                                    />
                                    <div className="flex border border-gray-700">
                                        <button onClick={() => setYieldType('F')} className={`px-3 ${yieldType === 'F' ? 'bg-green-600 text-white' : 'text-gray-500'}`}>F</button>
                                        <button onClick={() => setYieldType('A')} className={`px-3 ${yieldType === 'A' ? 'bg-red-600 text-white' : 'text-gray-500'}`}>A</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    {feedback ? (
                        <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                            {feedback.msg}
                        </div>
                    ) : (
                        <button
                            onClick={handleVerify}
                            disabled={isSubmit}
                            className="w-full bg-neonCyan text-black font-extrabold py-4 hover:bg-white transition-all uppercase tracking-widest text-lg"
                        >
                            {t.submit}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MaterialMixYieldAudit;
