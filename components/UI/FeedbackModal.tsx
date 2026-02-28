import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { UI_STRINGS } from '../../constants';
import GlassPanel from './GlassPanel';
import CyberButton from './CyberButton';

const FeedbackModal: React.FC = () => {
    const { state, dispatch } = useGame();
    const ui = UI_STRINGS[state.language];
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5);
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE');
    const [error, setError] = useState<string | null>(null);

    if (state.activeModal !== 'FEEDBACK') return null;

    const handleClose = () => {
        dispatch({ type: 'TOGGLE_FEEDBACK' });
        // Reset state for next open
        setTimeout(() => {
            setStatus('IDLE');
            setText('');
            setError(null);
        }, 500);
    };

    const handleSubmit = () => {
        if (!text.trim()) {
            setError(ui.REQUIRED_FIELD);
            return;
        }

        setStatus('SENDING');
        setError(null);

        // Simulate API Call
        setTimeout(() => {
            setStatus('SENT');
            console.log({ rating, text, phase: state.currentPhase });

            setTimeout(() => {
                handleClose();
            }, 1500);
        }, 1000);
    };

    return (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
            <GlassPanel intensity="HIGH" border="PINK" className="w-full max-w-md">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-heading text-neonPink tracking-widest uppercase">{ui.FEEDBACK}</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white">X</button>
                </div>

                {status === 'SENT' ? (
                    <div className="h-40 flex flex-col items-center justify-center text-neonGreen animate-pulse">
                        <span className="text-4xl mb-2">✓</span>
                        <span className="font-mono">{ui.FEEDBACK_SENT}</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Rating */}
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setRating(r)}
                                    className={`w-10 h-10 border rounded flex items-center justify-center font-bold transition-all ${rating >= r ? 'bg-neonPink text-black border-neonPink' : 'border-gray-600 text-gray-600'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>

                        {/* Text Area */}
                        <div className="relative">
                            <textarea
                                value={text}
                                onChange={(e) => { setText(e.target.value); setError(null); }}
                                placeholder={ui.FEEDBACK_PLACEHOLDER}
                                className={`
                            w-full h-32 bg-black/50 border rounded p-3 text-white font-mono text-sm resize-none focus:outline-none focus:border-neonPink
                            ${error ? 'border-red-500' : 'border-gray-600'}
                        `}
                            />
                            {error && (
                                <span className="absolute bottom-2 right-2 text-xs text-red-500 font-bold bg-black px-1">
                                    {error}
                                </span>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <CyberButton
                                label={status === 'SENDING' ? ui.WAIT : ui.SEND_FEEDBACK}
                                variant="DANGER"
                                onClick={handleSubmit}
                                disabled={status === 'SENDING'}
                            />
                        </div>
                    </div>
                )}

            </GlassPanel>
        </div>
    );
};

export default FeedbackModal;