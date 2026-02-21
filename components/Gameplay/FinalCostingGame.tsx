
import React, { useState } from 'react';
import { COST_ORBS, CostOrb } from '../../data/phase11';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { UI_STRINGS, ASSETS } from '../../constants';

interface FinalCostingGameProps {
  onComplete: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const FinalCostingGame: React.FC<FinalCostingGameProps> = ({ onComplete, onCorrect, onIncorrect }) => {
  const { state } = useGame();
  const { playSFX } = useAudio();
  const ui = UI_STRINGS[state.language];
  const [stage, setStage] = useState<'ASSEMBLY' | 'CALC_NON_PROD' | 'CALC_TOTAL' | 'CALC_PRICE' | 'LAUNCH'>('ASSEMBLY');
  
  // Assembly State
  const [primeItems, setPrimeItems] = useState<CostOrb[]>([]);
  const [overheadItems, setOverheadItems] = useState<CostOrb[]>([]);
  const [selectedOrb, setSelectedOrb] = useState<CostOrb | null>(null);
  const [availableOrbs, setAvailableOrbs] = useState<CostOrb[]>(COST_ORBS[state.language]);

  // Calc State
  const [calcInput, setCalcInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Calculated Values
  const primeTotal = primeItems.reduce((acc, item) => acc + item.amount, 0);
  const ohTotal = overheadItems.reduce((acc, item) => acc + item.amount, 0);
  const factoryCost = primeTotal + ohTotal; // Should be 132.50 if correct items selected
  const nonProdCost = 26.50; // Hardcoded goal (132.50 * 20%)
  const totalCost = 159.00; // Hardcoded goal
  const sellingPrice = 212.00; // Hardcoded goal

  // -- HANDLERS --

  const handleOrbClick = (orb: CostOrb) => {
    playSFX('CLICK');
    setSelectedOrb(orb);
  };

  const handleSlotClick = (slotType: 'PRIME' | 'FACTORY_OH') => {
    if (!selectedOrb) return;
    playSFX('CLICK');

    // Check Logic
    if (selectedOrb.type === 'TRAP') {
        setFeedback(ui.ERR_TRAP);
        playSFX('ERROR');
        onIncorrect();
        setTimeout(() => setFeedback(null), 1500);
        setSelectedOrb(null);
        return;
    }

    if (slotType === selectedOrb.type) {
        // Correct Placement
        if (slotType === 'PRIME') setPrimeItems([...primeItems, selectedOrb]);
        else setOverheadItems([...overheadItems, selectedOrb]);

        playSFX('DROP');
        setAvailableOrbs(availableOrbs.filter(o => o.id !== selectedOrb.id));
        setSelectedOrb(null);
        onCorrect();

        // Check if Assembly Complete (3 Prime, 2 OH based on data/phase11.ts)
        const newPrimeCount = slotType === 'PRIME' ? primeItems.length + 1 : primeItems.length;
        const newOHCount = slotType === 'FACTORY_OH' ? overheadItems.length + 1 : overheadItems.length;

        if (newPrimeCount === 3 && newOHCount === 2) {
            playSFX('SUCCESS');
            setTimeout(() => setStage('CALC_NON_PROD'), 1500);
        }

    } else {
        setFeedback(ui.ERR_CATEGORY);
        playSFX('ERROR');
        onIncorrect();
        setTimeout(() => setFeedback(null), 1500);
        setSelectedOrb(null);
    }
  };

  const handleCalcSubmit = () => {
    playSFX('CLICK');
    const val = parseFloat(calcInput);
    
    if (stage === 'CALC_NON_PROD') {
        // Goal: 20% of Factory Cost (132.50) = 26.50
        if (Math.abs(val - nonProdCost) < 0.1) {
            setFeedback(ui.MSG_CORRECT_LOAD);
            playSFX('SUCCESS');
            onCorrect();
            setTimeout(() => {
                setFeedback(null);
                setCalcInput('');
                setStage('CALC_TOTAL');
            }, 1500);
        } else {
            setFeedback(ui.ERR_NON_PROD);
            playSFX('ERROR');
            onIncorrect();
            setCalcInput('');
        }
    } else if (stage === 'CALC_TOTAL') {
        // Goal: 132.5 + 26.5 = 159.0
        if (Math.abs(val - totalCost) < 0.1) {
            setFeedback(ui.MSG_TOTAL_VERIFIED);
            playSFX('SUCCESS');
            onCorrect();
            setTimeout(() => {
                setFeedback(null);
                setCalcInput('');
                setStage('CALC_PRICE');
            }, 1500);
        } else {
            setFeedback(ui.ERR_TOTAL);
            playSFX('ERROR');
            onIncorrect();
            setCalcInput('');
        }
    } else if (stage === 'CALC_PRICE') {
        // Goal: 159 / 0.75 = 212
        if (Math.abs(val - sellingPrice) < 0.1) {
            setFeedback(ui.MSG_PRICE_SET);
            playSFX('SUCCESS');
            onCorrect();
            setTimeout(() => {
                setFeedback(null);
                setStage('LAUNCH');
            }, 1500);
        } else {
            setFeedback(ui.ERR_MARGIN);
            playSFX('ERROR');
            onIncorrect();
            setCalcInput('');
        }
    }
  };

  const handleNumpad = (val: string) => {
    playSFX('CLICK');
    if (val === 'CLR') setCalcInput('');
    else if (val === 'ENTER') handleCalcSubmit();
    else setCalcInput(prev => prev + val);
  };

  const handleLaunch = () => {
      playSFX('LAUNCH');
      onComplete();
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4">
        
        {/* Header */}
        <div className="absolute top-0 w-full p-4 flex justify-center z-10">
            <div className="bg-black border border-neonCyan px-8 py-2 rounded text-neonCyan font-heading text-xl uppercase tracking-widest">
                {ui.JOB_SHEET}
            </div>
        </div>

        <div className="w-full max-w-6xl flex gap-8 h-full max-h-[80vh] mt-16">
            
            {/* LEFT: ORB REPOSITORY (Only visible during Assembly) */}
            {stage === 'ASSEMBLY' && (
                <div className="w-1/3 bg-gray-900/50 border border-gray-700 rounded-xl p-4 flex flex-col gap-4 overflow-y-auto">
                    <h3 className="text-gray-400 font-mono text-sm uppercase text-center">{ui.DATA_FRAGMENTS}</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {availableOrbs.map(orb => (
                            <button
                                key={orb.id}
                                onClick={() => handleOrbClick(orb)}
                                onMouseEnter={() => playSFX('HOVER')}
                                className={`
                                    p-4 rounded border-2 text-left transition-all relative overflow-hidden group
                                    ${selectedOrb?.id === orb.id ? 'border-neonCyan bg-neonCyan/10' : 'border-gray-600 hover:border-white bg-black'}
                                `}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-white">{orb.label}</span>
                                    <span className="font-mono text-neonGreen">${orb.amount.toFixed(2)}</span>
                                </div>
                                <div className="text-xs text-gray-500 font-mono">{orb.description}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* CENTER: COST SHEET */}
            <div className={`flex-1 bg-white text-black p-8 rounded-xl shadow-2xl flex flex-col relative ${stage === 'LAUNCH' ? 'items-center justify-center' : ''}`}>
                
                {stage !== 'LAUNCH' ? (
                    <>  
                        <div className="flex justify-between items-start border-b-4 border-black pb-2 mb-2">
                            <div>
                                <h2 className="text-3xl font-black uppercase">{ui.COST_STATEMENT}</h2>
                                <div className="font-mono text-xs text-gray-500">UNIT: CYBER-HOODIE // BATCH: #9901</div>
                            </div>
                            {/* Product Visualization Asset */}
                            <img src={ASSETS.NAMED_HOODIE} alt="Hoodie" className="w-20 h-20 object-contain -mt-4 drop-shadow-md" />
                        </div>

                        <div className="flex-1 space-y-2 overflow-y-auto">
                            {/* Prime Section */}
                            <div 
                                onClick={() => stage === 'ASSEMBLY' && handleSlotClick('PRIME')}
                                className={`
                                    border-2 border-dashed p-4 rounded transition-colors
                                    ${stage === 'ASSEMBLY' && selectedOrb ? 'border-neonCyan bg-neonCyan/5 cursor-pointer hover:bg-neonCyan/10' : 'border-gray-300'}
                                `}
                            >
                                <div className="font-bold text-sm mb-2 text-gray-700">{ui.PRIME_COST}</div>
                                {primeItems.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm font-mono border-b border-gray-200 py-1">
                                        <span>{item.label}</span>
                                        <span>${item.amount.toFixed(2)}</span>
                                    </div>
                                ))}
                                {primeItems.length === 0 && <div className="text-gray-400 text-xs italic text-center py-2">{ui.ADD_PRIME}</div>}
                                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-black">
                                    <span>{ui.PRIME_SUBTOTAL}</span>
                                    <span>${primeTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Overhead Section */}
                            <div 
                                onClick={() => stage === 'ASSEMBLY' && handleSlotClick('FACTORY_OH')}
                                className={`
                                    border-2 border-dashed p-4 rounded transition-colors
                                    ${stage === 'ASSEMBLY' && selectedOrb ? 'border-neonCyan bg-neonCyan/5 cursor-pointer hover:bg-neonCyan/10' : 'border-gray-300'}
                                `}
                            >
                                <div className="font-bold text-sm mb-2 text-gray-700">FACTORY OVERHEADS (ABSORBED)</div>
                                {overheadItems.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm font-mono border-b border-gray-200 py-1">
                                        <span>{item.label}</span>
                                        <span>${item.amount.toFixed(2)}</span>
                                    </div>
                                ))}
                                {overheadItems.length === 0 && <div className="text-gray-400 text-xs italic text-center py-2">{ui.ADD_OH}</div>}
                            </div>

                            {/* Factory Cost Total */}
                            <div className="bg-black text-white p-2 flex justify-between font-black text-lg">
                                <span>{ui.FACTORY_SUBTOTAL}</span>
                                <span>${factoryCost.toFixed(2)}</span>
                            </div>

                            {/* Non Prod & Total (Visible in later stages) */}
                            {stage !== 'ASSEMBLY' && (
                                <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="flex justify-between items-center text-sm font-bold text-gray-600">
                                        <span>{ui.NON_PROD} (+20%)</span>
                                        <span className={stage === 'CALC_NON_PROD' ? 'text-neonPink animate-pulse' : ''}>
                                            {stage === 'CALC_NON_PROD' ? '???' : `$${nonProdCost.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xl font-black border-t-2 border-black pt-2">
                                        <span>{ui.TOTAL_UNIT_COST}</span>
                                        <span className={stage === 'CALC_TOTAL' ? 'text-neonPink animate-pulse' : ''}>
                                            {stage === 'CALC_TOTAL' || stage === 'CALC_NON_PROD' ? '???' : `$${totalCost.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-2xl font-black text-neonGreen bg-black/5 p-2 rounded">
                                        <span>{ui.SELLING_PRICE} (25% Margin)</span>
                                        <span className={stage === 'CALC_PRICE' ? 'text-neonPink animate-pulse' : ''}>
                                             {stage === 'CALC_PRICE' || stage === 'CALC_TOTAL' || stage === 'CALC_NON_PROD' ? '???' : `$${sellingPrice.toFixed(2)}`}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="text-6xl animate-bounce">🚀</div>
                        <h2 className="text-4xl font-black uppercase">{ui.MSG_PRICE_SET}</h2>
                        <img src={ASSETS.NAMED_HOODIE} alt="Hoodie" className="w-48 h-48 object-contain mx-auto drop-shadow-2xl" />
                        <div className="text-2xl font-mono bg-neonGreen text-black p-4 rounded">
                            ${sellingPrice.toFixed(2)}
                        </div>
                        <button
                            onClick={handleLaunch}
                            onMouseEnter={() => playSFX('HOVER')}
                            className="px-12 py-4 bg-black text-white font-heading font-bold text-xl uppercase hover:bg-neonCyan hover:text-black transition-all"
                        >
                            {ui.LAUNCH}
                        </button>
                    </div>
                )}
            </div>

            {/* RIGHT: CALCULATOR (Only in Calc Stages) */}
            {(stage === 'CALC_NON_PROD' || stage === 'CALC_TOTAL' || stage === 'CALC_PRICE') && (
                <div className="w-1/3 flex flex-col items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-xl border-4 border-gray-600 shadow-2xl w-full max-w-sm">
                        <div className="mb-4 text-center">
                            <h3 className="text-neonCyan font-mono text-sm uppercase mb-1">
                                {stage === 'CALC_NON_PROD' && "CALCULATE ADMIN LOADING (20%)"}
                                {stage === 'CALC_TOTAL' && "CALCULATE TOTAL COST"}
                                {stage === 'CALC_PRICE' && "SET PRICE (TARGET 25% MARGIN)"}
                            </h3>
                            <div className="text-xs text-gray-400">
                                {stage === 'CALC_PRICE' && "Hint: Total Cost / (1 - 0.25)"}
                            </div>
                        </div>

                        <div className="bg-[#9ea792] h-16 mb-4 border-2 border-gray-500 shadow-inner flex items-center justify-end px-4 font-mono text-3xl tracking-widest text-black/80">
                            {calcInput || '0'}
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[7, 8, 9, 4, 5, 6, 1, 2, 3, '.', 0, 'CLR'].map((key) => (
                                <button
                                    key={key}
                                    onClick={() => handleNumpad(key.toString())}
                                    onMouseEnter={() => playSFX('HOVER')}
                                    className={`
                                        h-14 font-bold rounded shadow-[0_4px_0_rgba(0,0,0,0.5)] active:translate-y-[2px] active:shadow-none transition-all text-xl
                                        ${key === 'CLR' ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}
                                    `}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handleNumpad('ENTER')}
                            onMouseEnter={() => playSFX('HOVER')}
                            className="w-full mt-4 h-14 bg-neonGreen font-bold rounded shadow-[0_4px_0_rgba(0,0,0,0.5)] active:translate-y-[2px] active:shadow-none transition-all border-none text-black text-xl"
                        >
                            ENTER
                        </button>
                    </div>
                </div>
            )}

        </div>

        {/* FEEDBACK OVERLAY */}
        {feedback && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                 <div className={`
                    px-8 py-4 rounded text-xl font-bold font-mono text-center shadow-2xl animate-bounce border-2
                    ${feedback.includes('CORRECT') || feedback.includes('VERIFIED') || feedback.includes('SET') ? 'bg-black text-neonGreen border-neonGreen' : 'bg-black text-neonPink border-neonPink'}
                 `}>
                     {feedback}
                 </div>
            </div>
        )}

    </div>
  );
};

export default FinalCostingGame;
