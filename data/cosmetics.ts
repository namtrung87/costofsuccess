import { ASSETS } from '../constants';

export interface CosmeticItem {
    id: string;
    name: string;
    description: string;
    type: 'AVATAR' | 'THEME';
    rarity: 'COMMON' | 'RARE' | 'LEGENDARY';
    thumbnail?: string;
    value?: string; // Image path for avatar, or CSS class name for theme
}

export const COSMETICS: CosmeticItem[] = [
    // AVATARS
    {
        id: 'avatar_default',
        name: 'Corporate Intern',
        description: 'Standard issue profile.',
        type: 'AVATAR',
        rarity: 'COMMON',
        value: 'CHAR_JULES_NEUTRAL'
    },
    {
        id: 'avatar_hacker',
        name: 'Glitch Runner',
        description: 'For those who see the code.',
        type: 'AVATAR',
        rarity: 'RARE',
        value: 'CHAR_JULES_SMUG'
    },
    {
        id: 'avatar_boba',
        name: 'Boba Addict',
        description: 'Fuelled by sugar and pearls.',
        type: 'AVATAR',
        rarity: 'RARE',
        value: 'CHAR_JULES_SIP'
    },
    {
        id: 'avatar_cfo',
        name: 'Shadow CFO',
        description: 'The ultimate accountant.',
        type: 'AVATAR',
        rarity: 'LEGENDARY',
        value: 'CHAR_JULES_HAPPY'
    },

    // THEMES
    {
        id: 'theme_default',
        name: 'Standard HUD',
        description: 'The matrix as intended.',
        type: 'THEME',
        rarity: 'COMMON',
        value: 'theme-default'
    },
    {
        id: 'theme_retro',
        name: '80s Retro',
        description: 'Vaporwave vibes.',
        type: 'THEME',
        rarity: 'RARE',
        value: 'theme-retro'
    },
    {
        id: 'theme_minimal',
        name: 'Ghost Shell',
        description: 'Clean. Efficient. Cold.',
        type: 'THEME',
        rarity: 'LEGENDARY',
        value: 'theme-minimal'
    }
];
