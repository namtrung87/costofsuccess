import React, { useState } from 'react';

interface ContractInterfaceProps {
  onComplete: () => void;
}

const ContractInterface: React.FC<ContractInterfaceProps> = ({ onComplete }) => {
  const [signed, setSigned] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setDragProgress(val);
    if (val === 100 && !signed) {
      setSigned(true);
      setTimeout(onComplete, 2000); // Wait for animation then proceed
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-white text-black rounded-sm p-8 shadow-[0_0_50px_rgba(255,255,255,0.2)] relative overflow-hidden transform rotate-1">
        
        {/* Header */}
        <div className="border-b-2 border-black pb-4 mb-4 flex justify-between items-end">
            <div>
                <h1 className="font-heading font-black text-3xl tracking-tighter">NDA & EMPLOYMENT</h1>
                <p className="font-mono text-xs uppercase text-gray-600">Neon Drop Studios // Legal Dept</p>
            </div>
            <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center font-black text-xl">
                ND
            </div>
        </div>

        {/* Content */}
        <div className="font-mono text-xs md:text-sm space-y-4 mb-8 opacity-80">
            <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>ROLE:</span>
                <span className="font-bold">Financial Hype-Man (Intern)</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>SALARY:</span>
                <span className="font-bold">"Humble Beginnings"</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>PERKS:</span>
                <span className="font-bold">Unltd. Boba / Early Access</span>
            </div>
            <div className="bg-gray-100 p-2 mt-4 text-[10px] leading-tight text-justify">
                CLAUSE 1.1: EMPLOYEE AGREES TO MASTER ABSORPTION COSTING METHODS WITHIN 72 HOURS. 
                CLAUSE 1.2: EMPLOYEE ACKNOWLEDGES THAT "CHEESE FOAM" IS A TAXABLE BENEFIT.
                CLAUSE 1.3: FAILURE TO DISTINGUISH DIRECT LABOR FROM OVERHEAD RESULTS IN IMMEDIATE TERMINATION.
            </div>
        </div>

        {/* Swipe to Sign */}
        <div className="relative pt-6 pb-2">
            {!signed ? (
                <div className="relative w-full h-12 bg-gray-200 rounded-full overflow-hidden border border-gray-400">
                    <div 
                        className="absolute top-0 left-0 h-full bg-neonGreen transition-all duration-75 ease-out flex items-center justify-end pr-4"
                        style={{ width: `${dragProgress}%` }}
                    >
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={dragProgress} 
                        onChange={handleDrag}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="font-heading font-bold text-gray-500 tracking-widest text-sm uppercase">
                            Swipe to Sign
                        </span>
                    </div>
                </div>
            ) : (
                <div className="w-full h-12 flex items-center justify-center text-neonGreen font-bold animate-pulse">
                    PROCESSING...
                </div>
            )}
        </div>

        {/* Stamp Animation */}
        {signed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-4 border-red-600 text-red-600 font-black text-5xl p-4 -rotate-12 opacity-0 animate-[stamp_0.3s_ease-in_forwards] mix-blend-multiply">
                    CONFIRMED
                </div>
            </div>
        )}

      </div>
      <style>{`
        @keyframes stamp {
            0% { opacity: 0; transform: scale(2) rotate(-12deg); }
            100% { opacity: 0.8; transform: scale(1) rotate(-12deg); }
        }
      `}</style>
    </div>
  );
};

export default ContractInterface;