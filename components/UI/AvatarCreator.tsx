
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import CyberButton from './CyberButton';
import GlassPanel from './GlassPanel';

interface AvatarCreatorProps {
    onComplete: () => void;
}

const AvatarCreator: React.FC<AvatarCreatorProps> = ({ onComplete }) => {
    const { state, dispatch } = useGame();
    const { playSFX } = useAudio();
    
    // Using Dicebear for dynamic "Identity Synthesis"
    const seeds = ['Felix', 'Aneka', 'Zack', 'Luna', 'Kai', 'Leo', 'Mia', 'Ryo'];
    const [selectedSeed, setSelectedSeed] = useState(seeds[0]);

    const handleSelect = (seed: string) => {
        playSFX('CLICK');
        setSelectedSeed(seed);
    };

    const handleConfirm = () => {
        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedSeed}&backgroundColor=b6e3f4`;
        dispatch({ type: 'SET_AVATAR', payload: avatarUrl });
        playSFX('SUCCESS');
        onComplete();
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-500">
            <GlassPanel intensity="HIGH" border="CYAN" className="max-w-2xl w-full flex flex-col items-center gap-6">
                
                <div className="w-full border-b border-neonCyan/50 pb-4 text-center">
                    <h2 className="text-2xl font-heading text-neonCyan tracking-widest uppercase">IDENTITY SYNTHESIS</h2>
                    <p className="font-mono text-xs text-gray-400">SELECT YOUR CORPORATE AVATAR</p>
                </div>

                {/* Avatar Preview */}
                <div className="w-40 h-40 rounded-full border-4 border-neonCyan bg-white overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.4)] relative">
                    <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedSeed}&backgroundColor=b6e3f4`}
                        alt="Avatar Preview" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Grid Selection */}
                <div className="grid grid-cols-4 gap-4 w-full">
                    {seeds.map((seed) => (
                        <button
                            key={seed}
                            onClick={() => handleSelect(seed)}
                            onMouseEnter={() => playSFX('HOVER')}
                            className={`
                                w-full aspect-square rounded-lg border-2 overflow-hidden transition-all duration-200 group relative
                                ${selectedSeed === seed ? 'border-neonGreen shadow-[0_0_10px_#39FF14] scale-105' : 'border-gray-700 hover:border-white'}
                            `}
                        >
                            <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`}
                                alt={seed}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                            {selectedSeed === seed && (
                                <div className="absolute inset-0 border-4 border-neonGreen animate-pulse rounded-lg" />
                            )}
                        </button>
                    ))}
                </div>

                <CyberButton 
                    label="INITIALIZE PERSONA" 
                    variant="PRIMARY" 
                    onClick={handleConfirm}
                    className="w-full mt-4"
                />

            </GlassPanel>
        </div>
    );
};

export default AvatarCreator;
