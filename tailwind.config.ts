import type { Config } from 'tailwindcss';

export default {
    content: [
        './index.html',
        './**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                obsidian: '#0F0F12', // Deep Charcoal/Black
                neonGreen: '#39FF14', // Acid Green (Profit)
                neonPink: '#FF0055', // Glitch Magenta (Loss)
                neonCyan: '#00F0FF', // Cyan (Tech)
                glass: 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                heading: ['"Exo 2"', 'sans-serif'],
                body: ['Montserrat', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            boxShadow: {
                'neon-green': '0 0 10px #39FF14, 0 0 20px #39FF14',
                'neon-pink': '0 0 10px #FF0055, 0 0 20px #FF0055',
                'neon-cyan': '0 0 10px #00F0FF, 0 0 20px #00F0FF',
            },
            keyframes: {
                breathe: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.02)' },
                },
                scan: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-5px)' },
                    '75%': { transform: 'translateX(5px)' },
                },
                pop: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                }
            },
            animation: {
                breathe: 'breathe 4s ease-in-out infinite',
                scan: 'scan 2s linear infinite',
                shake: 'shake 0.3s ease-in-out',
                pop: 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }
        },
    },
    plugins: [],
} satisfies Config;
