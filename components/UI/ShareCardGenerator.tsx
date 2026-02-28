import React, { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { COSMETICS } from '../../data/cosmetics';
import { ACHIEVEMENTS } from '../../achievements';

interface ShareCardGeneratorProps {
    onReady: (dataUrl: string) => void;
}

const ShareCardGenerator: React.FC<ShareCardGeneratorProps> = ({ onReady }) => {
    const { state } = useGame();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const drawCard = async () => {
            // Set dimensions for a high-quality vertical social card (e.g., Instagram Story/Phone screen)
            canvas.width = 1080;
            canvas.height = 1920;

            // 1. Background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#0F0F12');
            gradient.addColorStop(1, '#1A0B2E');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. Cyber-Grid Overlay
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < canvas.width; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            for (let i = 0; i < canvas.height; i += 50) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }

            // 3. Header Text
            ctx.fillStyle = '#00F0FF';
            ctx.font = 'bold 80px "Rajdhani", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('PERFORMANCE REVIEW', canvas.width / 2, 200);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = '40px "Roboto Mono", monospace';
            ctx.fillText('NEON DROP STUDIOS | INTERNAL AUDIT', canvas.width / 2, 270);

            // 4. Player Identity
            const avatarId = state.equippedAvatar;
            const cosmetic = COSMETICS.find(c => c.id === avatarId);
            const avatarUrl = cosmetic?.value || '';

            // Draw Avatar (Box with Glow)
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#00F0FF';
            ctx.strokeStyle = '#00F0FF';
            ctx.lineWidth = 10;
            const avatarSize = 400;
            const avatarX = (canvas.width - avatarSize) / 2;
            const avatarY = 350;

            ctx.strokeRect(avatarX, avatarY, avatarSize, avatarSize);
            ctx.shadowBlur = 0;

            if (avatarUrl) {
                try {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = avatarUrl;
                    await new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve; // Continue even if img fails
                    });
                    ctx.drawImage(img, avatarX + 10, avatarY + 10, avatarSize - 20, avatarSize - 20);
                } catch (e) {
                    // Fallback square
                    ctx.fillStyle = '#222';
                    ctx.fillRect(avatarX + 10, avatarY + 10, avatarSize - 20, avatarSize - 20);
                }
            }

            ctx.fillStyle = '#00F0FF';
            ctx.font = 'bold 60px "Rajdhani"';
            ctx.fillText(state.playerName.toUpperCase() || 'ANONYMOUS_INTERN', canvas.width / 2, 820);

            // 5. Stats Section
            const statsY = 950;
            const drawStat = (label: string, value: string, y: number, color: string) => {
                ctx.textAlign = 'left';
                ctx.fillStyle = '#888';
                ctx.font = '30px "Roboto Mono"';
                ctx.fillText(label, 200, y);

                ctx.textAlign = 'right';
                ctx.fillStyle = color;
                ctx.font = 'bold 45px "Rajdhani"';
                ctx.fillText(value, canvas.width - 200, y);

                // Divider
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(200, y + 20);
                ctx.lineTo(canvas.width - 200, y + 20);
                ctx.stroke();
            };

            drawStat('BUDGET_REMAINING', `$${state.budget.toLocaleString()}`, statsY, '#39FF14');
            drawStat('SANITY_STABILITY', `${state.sanity}%`, statsY + 100, state.sanity < 30 ? '#FF0055' : '#00F0FF');
            drawStat('MAX_STREAK', `${state.maxStreak}x`, statsY + 200, '#FFD700');
            drawStat('ACHIEVEMENTS', `${state.unlockedAchievements.length} / ${ACHIEVEMENTS.length}`, statsY + 300, '#FFFFFF');

            // 6. Recent Achievements (Icons)
            const iconY = 1450;
            ctx.textAlign = 'center';
            ctx.fillStyle = '#00F0FF';
            ctx.font = 'bold 40px "Rajdhani"';
            ctx.fillText('TOP MILESTONES', canvas.width / 2, iconY - 50);

            const recentIds = state.unlockedAchievements.slice(-3);
            recentIds.forEach((id, idx) => {
                const achievement = ACHIEVEMENTS[id];
                if (achievement) {
                    const x = (canvas.width / 2) - (1 - idx) * 200;
                    ctx.fillStyle = 'rgba(0, 240, 255, 0.1)';
                    ctx.strokeStyle = '#00F0FF';
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.arc(x, iconY + 80, 70, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.fillStyle = '#FFF';
                    ctx.font = 'bold 20px "Roboto Mono"';
                    const title = achievement.title.length > 12 ? achievement.title.substring(0, 10) + '..' : achievement.title;
                    ctx.fillText(title, x, iconY + 180);
                }
            });

            // 7. Footer / Branding
            ctx.fillStyle = 'rgba(0,240,255,0.3)';
            ctx.font = 'italic 30px "Roboto Mono"';
            ctx.fillText('BUILT AT NEON DROP STUDIOS', canvas.width / 2, 1800);
            ctx.fillText('COST_OF_SUCCESS: VERSION 1.0', canvas.width / 2, 1840);

            // Signal ready
            onReady(canvas.toDataURL('image/png'));
        };

        drawCard();
    }, [state, onReady]);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: 'none' }} // Hidden, we only use the dataUrl
        />
    );
};

export default ShareCardGenerator;
