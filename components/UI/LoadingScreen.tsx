import React, { useState, useEffect } from 'react';
import NeonEffect from './NeonEffect';

interface LoadingScreenProps {
    onComplete?: () => void;
    message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, message = "INITIALIZING CORE SYSTEMS..." }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const diagnosticLogs = [
        "[OK] MEMORY_CHECK ... STABLE",
        "[OK] NEON_DRIVE_MOUNTED",
        "[OK] COST_ENGINE_V5.4_LOADED",
        "[!!] MARGINAL_DECAY_DETECTED ... FILTERING",
        "[OK] VOID_SYNC_ESTABLISHED",
        "[OK] CFO_CREDENTIALS_VERIFIED",
        "[DONE] ASSET_CACHE_WARM"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete?.(), 500);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        const logInterval = setInterval(() => {
            setLogs(prev => {
                if (prev.length >= diagnosticLogs.length) {
                    clearInterval(logInterval);
                    return prev;
                }
                return [...prev, diagnosticLogs[prev.length]];
            });
        }, 400);

        return () => clearInterval(logInterval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center p-8 font-mono overflow-hidden">
            {/* Background Grid/Scanlines */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

            <div className="w-full max-w-md space-y-8 z-10">
                <NeonEffect color="cyan" intensity="high" glitch pulse>
                    <div className="text-4xl font-bold tracking-widest text-center">
                        COST_OF_SUCCESS
                    </div>
                </NeonEffect>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-neonCyan opacity-70">
                        <span className="animate-pulse">{message}</span>
                        <span>{progress}%</span>
                    </div>

                    <div className="h-2 w-full bg-white/5 border border-white/10 relative overflow-hidden">
                        <div
                            className="h-full bg-neonCyan transition-all duration-300 shadow-[0_0_15px_#00F0FF]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="h-32 w-full bg-black/40 border border-white/5 p-4 overflow-hidden text-[10px] space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} className={log.includes('[!!]') ? 'text-neonPink' : 'text-neonGreen'}>
                            {log}
                        </div>
                    ))}
                    {logs.length < diagnosticLogs.length && (
                        <div className="w-2 h-4 bg-neonCyan animate-pulse inline-block" />
                    )}
                </div>
            </div>

            <div className="absolute bottom-8 text-[8px] text-white/20 tracking-[1em] uppercase">
                Advanced Agentic Development // 2026
            </div>
        </div>
    );
};

export default LoadingScreen;
