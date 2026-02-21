
import React from 'react';
import { useGame } from '../../context/GameContext';
import { HANDBOOK_DATA, UI_STRINGS } from '../../constants';
import GlassPanel from './GlassPanel';
import CyberButton from './CyberButton';

const Handbook: React.FC = () => {
  const { state, dispatch } = useGame();
  const ui = UI_STRINGS[state.language];

  if (!state.isHandbookOpen) return null;

  const handleClose = () => {
      dispatch({ type: 'TOGGLE_HANDBOOK' });
  };

  const data = HANDBOOK_DATA[state.language];

  return (
    <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
      <GlassPanel 
        intensity="HIGH" 
        className="w-full max-w-4xl h-[80vh] relative border-neonCyan"
        contentClassName="flex flex-col"
      >
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-neonCyan/30 pb-4">
            <div>
                <h2 className="text-3xl font-heading text-neonCyan tracking-widest uppercase">{ui.HANDBOOK_TITLE}</h2>
                <p className="font-mono text-xs text-gray-400">Standard Operating Procedures // v2.0</p>
            </div>
            <CyberButton label={ui.CLOSE} variant="SECONDARY" onClick={handleClose} />
        </div>

        {/* Content with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto pr-4 space-y-6 custom-scrollbar">
            {data.map((entry) => (
                <div key={entry.id} className="bg-black/40 border border-gray-700 p-6 rounded hover:border-neonGreen transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`
                            px-2 py-1 text-[10px] font-bold rounded uppercase
                            ${entry.category === 'BASIC' ? 'bg-gray-700 text-white' : ''}
                            ${entry.category === 'INTERMEDIATE' ? 'bg-blue-900 text-blue-200' : ''}
                            ${entry.category === 'ADVANCED' ? 'bg-purple-900 text-purple-200' : ''}
                        `}>
                            {entry.category}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-neonGreen">{entry.title}</h3>
                    </div>
                    
                    <p className="text-gray-300 font-body mb-3 leading-relaxed">
                        {entry.definition}
                    </p>
                    
                    <div className="bg-gray-900/50 p-3 rounded border-l-2 border-neonCyan">
                        <span className="text-neonCyan font-bold text-xs uppercase mr-2">Example:</span>
                        <span className="text-gray-400 text-sm italic">{entry.example}</span>
                    </div>
                </div>
            ))}
        </div>
        
        <style>{`
            .custom-scrollbar::-webkit-scrollbar {
                width: 10px;
                background-color: #1a1a1a;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #00F0FF;
                border-radius: 5px;
                border: 2px solid #1a1a1a;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #39FF14;
            }
        `}</style>

      </GlassPanel>
    </div>
  );
};

export default Handbook;
