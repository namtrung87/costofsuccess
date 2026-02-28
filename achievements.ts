import { Achievement } from './types';

export const ACHIEVEMENTS: Record<string, Achievement> = {
    FIRST_STEPS: {
        id: 'FIRST_STEPS',
        title: 'Hustle Culture 101',
        description: 'Survived your first day at the Neo-CFO office.',
        icon: '🚀'
    },
    BOBA_ADDICT: {
        id: 'BOBA_ADDICT',
        title: 'Boba Fuelled',
        description: 'Bought your first Boba to stay sane.',
        icon: '🧋'
    },
    BUDGET_MASTER: {
        id: 'BUDGET_MASTER',
        title: 'Spreadsheet Warrior',
        description: 'Balanced a budget with zero variance.',
        icon: '📊'
    },
    SPEED_RUNNER: {
        id: 'SPEED_RUNNER',
        title: 'Main Character Energy',
        description: 'Finished a level in record time.',
        icon: '⚡'
    },
    SURVIVOR: {
        id: 'SURVIVOR',
        title: 'Still Alive (Barely)',
        description: 'Survived a boss fight with less than 5% sanity.',
        icon: '💀'
    }
};
