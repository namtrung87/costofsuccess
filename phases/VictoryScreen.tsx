import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { GamePhase } from '../types';
import { ASSETS, DISCORD_LINK } from '../constants';
import CyberButton from '../components/UI/CyberButton';

const VictoryScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { playSFX } = useAudio();

    useEffect(() => {
        playSFX('SUCCESS');
    }, [playSFX]);

    const handleRestart = () => {
        dispatch({ type: 'SET_PHASE', payload: GamePhase.START_SCREEN });
    };

    const t = {
        title: state.language === 'EN' ? 'LEGACY SECURED' : 'DI SẢN ĐÃ ĐƯỢC KHẲNG ĐỊNH',
        subtitle: state.language === 'EN'
            ? 'FROM INTERN TO GROUP CFO'
            : 'TỪ THỰC TẬP SINH ĐẾN CFO TẬP ĐOÀN',
        desc: state.language === 'EN'
            ? 'You have mastered the mechanics of value. The Neon Group is now the ultimate conglomerate under your control.'
            : 'Bạn đã nắm vững các cơ chế tạo ra giá trị. Tập đoàn Neon hiện là đế chế tối thượng dưới sự điều hành của bạn.',
        stats: state.language === 'EN' ? 'GLOBAL PERFORMANCE REPORT' : 'BÁO CÁO HIỆU SUẤT TOÀN CẦU',
        btn: state.language === 'EN' ? 'NEW GAME PLUS' : 'CHƠI LẠI TỪ ĐẦU'
    };

    return (
        <div className="w-full h-full relative bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30 scale-110 blur-sm"
                style={{ backgroundImage: `url(${ASSETS.BG_OFFICE})` }}
            />

            <div className="relative z-10 max-w-4xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-1000">
                <div className="inline-block p-4 border-2 border-neonGreen shadow-[0_0_30px_rgba(57,255,20,0.3)] bg-black/80 mb-6">
                    <span className="text-6xl">🏆</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neonGreen tracking-tighter uppercase italic drop-shadow-2xl">
                    {t.title}
                </h1>

                <h2 className="text-2xl font-mono text-neonCyan tracking-[0.4em] uppercase font-bold">
                    {t.subtitle}
                </h2>

                <div className="p-8 border-x-2 border-neonGreen bg-black/60 backdrop-blur-md max-w-2xl mx-auto">
                    <p className="text-gray-300 font-body text-lg leading-relaxed italic">
                        "{t.desc}"
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
                    <div className="p-4 bg-gray-900/80 border border-gray-700">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{state.language === 'EN' ? 'FINAL STATUS' : 'TRẠNG THÁI CUỐI'}</p>
                        <p className="text-xl font-bold text-white uppercase mt-2">GROUP CFO</p>
                    </div>
                    <div className="p-4 bg-gray-900/80 border border-gray-700">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{state.language === 'EN' ? 'CREDITS' : 'NGÂN LƯỢNG'}</p>
                        <p className="text-xl font-bold text-neonGreen mt-2">${state.budget.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-gray-900/80 border border-gray-700">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{state.language === 'EN' ? 'NET WORTH' : 'TỔNG TÀI SẢN'}</p>
                        <p className="text-xl font-bold text-neonCyan mt-2">UNTOUCHABLE</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center pt-8 w-full max-w-sm mx-auto">
                    <div className="flex flex-col gap-3 w-full mt-4">
                        <CyberButton
                            label={t.btn}
                            variant="PRIMARY"
                            onClick={handleRestart}
                            className="w-full text-xl shadow-neon-cyan"
                        />

                        {/* New Thematic CTA */}
                        <button
                            onClick={() => window.open(DISCORD_LINK, '_blank')}
                            className="group relative w-full h-16 bg-black border border-[#5865F2] text-[#5865F2] font-mono font-bold tracking-widest uppercase hover:bg-[#5865F2] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(88,101,242,0.4)] hover:shadow-[0_0_25px_rgba(88,101,242,0.8)]"
                        >
                            <span className="block text-xs opacity-70 mb-1 font-body">
                                {state.language === 'EN' ? "YOUR REAL JOB OFFER AWAITS" : "THƯ MỜI NHẬN VIỆC THỰC SỰ CỦA BẠN"}
                            </span>
                            <span className="relative z-10 font-heading">
                                {state.language === 'EN' ? 'BECOME A SYSTEM ARCHITECT (DISCORD)' : 'TRỞ THÀNH KIẾN TRÚC SƯ HỆ THỐNG'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Confetti (Wait, we can do better than just a div) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full animate-confetti"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-20px`,
                            backgroundColor: ['#00F0FF', '#39FF14', '#FF0055', '#FFFB1D'][Math.floor(Math.random() * 4)],
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                            opacity: 0.7
                        }}
                    />
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti {
                    animation-name: confetti;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}} />
        </div>
    );
};

export default VictoryScreen;
