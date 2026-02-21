import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { GamePhase } from '../types';
import CyberButton from '../components/UI/CyberButton';
import { DISCORD_LINK } from '../constants';

const GameOver: React.FC = () => {
    const { state, dispatch } = useGame();
    const { playSFX } = useAudio();

    useEffect(() => {
        playSFX('ERROR');
    }, [playSFX]);

    const handleRetry = () => {
        dispatch({ type: 'SET_PHASE', payload: GamePhase.START_SCREEN });
    };

    const t = {
        title: state.language === 'EN' ? 'REPUTATION COLLAPSED' : 'DANH TIẾNG ĐỔ VỠ',
        desc: state.language === 'EN'
            ? 'The numbers did not add up. Your career has entered a fatal exception state.'
            : 'Các con số không khớp. Sự nghiệp của bạn đã rơi vào trạng thái ngoại lệ nghiêm trọng.',
        btn: state.language === 'EN' ? 'RESTORE PREVIOUS SAVE' : 'KHÔI PHỤC LẠI'
    };

    return (
        <div className="w-full h-full bg-obsidian flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_#200000_0%,_#000000_100%)]">
            <div className="max-w-xl w-full text-center space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-500">
                <div className="text-8xl mb-4 animate-pulse">💀</div>

                <h1 className="text-6xl md:text-7xl font-black text-neonPink tracking-tighter uppercase italic">
                    {t.title}
                </h1>

                <div className="p-6 border border-neonPink/30 bg-black/40 font-mono text-gray-400 text-sm leading-relaxed">
                    <p>{t.desc}</p>
                    <div className="mt-4 text-xs text-red-500 uppercase tracking-widest animate-pulse">
                        {">> FATAL AUDIT ERROR // CAREER_BANKRUPTCY_DETECTED <<"}
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center w-full max-w-sm mx-auto">
                    <CyberButton
                        label={t.btn}
                        variant="DANGER"
                        onClick={handleRetry}
                        className="px-10 py-5 shadow-neon-pink w-full"
                    />
                    <button
                        onClick={() => window.open(DISCORD_LINK, '_blank')}
                        className="w-full py-4 bg-[#5865F2]/20 border border-[#5865F2] text-white font-heading font-bold tracking-widest uppercase hover:bg-[#5865F2] hover:text-white transition-all duration-200 skew-x-[-10deg] shadow-[0_0_15px_rgba(88,101,242,0.4)] mt-2 hover:scale-105 active:scale-95"
                    >
                        <span className="inline-block skew-x-[10deg]">
                            {state.language === 'EN' ? 'ASK FOR HELP ON DISCORD' : 'TÌM SỰ TRỢ GIÚP TRÊN DISCORD'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOver;
