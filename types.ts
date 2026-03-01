import React from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Consequence {
  type: 'SANITY' | 'BUDGET' | 'FLAG';
  value: number | string;
  description?: string;
}

export enum Difficulty {
  ZEN = 'ZEN',           // Relaxed, high budget
  NORMAL = 'NORMAL',     // Standard experience
  HARDCORE = 'HARDCORE'  // Low starting resources, high stakes
}

export enum GamePhase {
  START_SCREEN = 'START_SCREEN',
  PHASE_1_LOBBY = 'PHASE_1_LOBBY',
  PHASE_1_QUIZ = 'PHASE_1_QUIZ',
  PHASE_1_INTERVIEW = 'PHASE_1_INTERVIEW',
  PHASE_2_SORTING = 'PHASE_2_SORTING',
  PHASE_3_ELEMENTS = 'PHASE_3_ELEMENTS',
  PHASE_4_OVERHEADS = 'PHASE_4_OVERHEADS',
  PHASE_5_ALLOCATION = 'PHASE_5_ALLOCATION',
  PHASE_6_MATH = 'PHASE_6_MATH',
  PHASE_7_DELIVERY = 'PHASE_7_DELIVERY',
  PHASE_8_PIPES = 'PHASE_8_PIPES',
  PHASE_9_ABSORPTION = 'PHASE_9_ABSORPTION',
  PHASE_10_REALITY = 'PHASE_10_REALITY',
  PHASE_11_BOSS = 'PHASE_11_BOSS',
  PHASE_12_BEHAVIOR = 'PHASE_12_BEHAVIOR',
  PHASE_13_CONTRIBUTION = 'PHASE_13_CONTRIBUTION',
  PHASE_14_RECONCILIATION = 'PHASE_14_RECONCILIATION',
  PHASE_15_BREAK_EVEN = 'PHASE_15_BREAK_EVEN',
  PHASE_16_MARGIN_OF_SAFETY = 'PHASE_16_MARGIN_OF_SAFETY',
  PHASE_17_STANDARD = 'PHASE_17_STANDARD',
  PHASE_18_SALES_VAR = 'PHASE_18_SALES_VAR',
  PHASE_19_MATERIAL_VAR = 'PHASE_19_MATERIAL_VAR',
  PHASE_20_LABOR_VOH_VAR = 'PHASE_20_LABOR_VOH_VAR',
  PHASE_21_FIXED_VOH_VAR = 'PHASE_21_FIXED_VOH_VAR',
  PHASE_22_OP_STATEMENT = 'PHASE_22_OP_STATEMENT',
  PHASE_23_CEREMONY = 'PHASE_23_CEREMONY',
  PHASE_24_MATERIAL_MIX_YIELD = 'PHASE_24_MATERIAL_MIX_YIELD',
  PHASE_25_PLANNING_OPERATIONAL = 'PHASE_25_PLANNING_OPERATIONAL',
  PHASE_26_RELEVANT_COST = 'PHASE_26_RELEVANT_COST',
  PHASE_27_LIMITING_FACTOR = 'PHASE_27_LIMITING_FACTOR',
  PHASE_28_MAKE_BUY = 'PHASE_28_MAKE_BUY',
  PHASE_29_SHUTDOWN = 'PHASE_29_SHUTDOWN',
  PHASE_30_STRATEGY_BOSS = 'PHASE_30_STRATEGY_BOSS',
  PHASE_31_TRANSFER_PRICING = 'PHASE_31_TRANSFER_PRICING',
  PHASE_32_ROI_RI = 'PHASE_32_ROI_RI',
  PHASE_33_BALANCED_SCORECARD = 'PHASE_33_BALANCED_SCORECARD',
  PHASE_34_DIVISIONAL_PERF = 'PHASE_34_DIVISIONAL_PERF',
  PHASE_35_GROUP_BOSS = 'PHASE_35_GROUP_BOSS',
  PRACTICE_MODE = 'PRACTICE_MODE',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY'
}

export type Language = 'EN' | 'VI';

export enum MusicIntensity {
  SILENT = 'SILENT',
  LOBBY = 'LOBBY',       // Bass + Keys
  FOCUS = 'FOCUS',       // Bass + Keys + Drums
  TENSION = 'TENSION'    // Bass + Keys + Drums + Synth/Hats
}

export type ModalType = 'HANDBOOK' | 'PAUSE' | 'FEEDBACK' | 'WARDROBE' | 'SHARE' | 'DASHBOARD' | 'BOBA_SHOP' | 'DYK' | null;

export interface GameState {
  language: Language;
  currentPhase: GamePhase;
  lastActivePhase: GamePhase | null; // Track where to return after practice
  unlockedPhases: GamePhase[];
  sanity: number;
  budget: number;
  sanityHistory: number[];
  budgetHistory: number[];
  playerName: string;
  playerAvatar: string; // Gen Z: Identity/Customization
  inventory: string[];
  musicEnabled: boolean;
  activeModal: ModalType; // Replaces multiple isXOpen boolean flags to enforce exclusivity
  assets: Record<string, string>;
  loadedBundles: string[];
  textSpeed: number;
  isAssetsLoading: boolean;
  percentageLoaded: number;
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info' }[];
  unlockedAchievements: string[];
  streak: number;
  maxStreak: number;
  equippedAvatar: string;
  unlockedCosmetics: string[];
  activeTheme: string;
  flags: string[];
  difficulty: Difficulty;
  marketEvent: { name: string; description: string; type: 'neutral' | 'positive' | 'negative' } | null;
  multipliers: { cost: number; reward: number; sanity: number };
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerTitle?: string;
  text: string;
  characterId?: string;
  mood?: 'neutral' | 'happy' | 'angry' | 'surprised';
  backgroundImage?: string;
  characterImage?: string;
  requiredBudget?: number; // Tier 4.4
  condition?: (state: any) => boolean; // Using 'any' for now to avoid circular ref if needed, or specify GameState
  choices?: {
    text: string;
    nextId: string;
    action?: (dispatch: React.Dispatch<ActionType>) => void;
    consequences?: Consequence[];
    requiredBudget?: number;
  }[];
  nextId?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  reward: number;
  penalty: number;
}

export type ActionType =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_PHASE'; payload: GamePhase }
  | { type: 'ENTER_PRACTICE' }
  | { type: 'EXIT_PRACTICE' }
  | { type: 'UNLOCK_PHASE'; payload: GamePhase }
  | { type: 'UPDATE_SANITY'; payload: number }
  | { type: 'UPDATE_BUDGET'; payload: number }
  | { type: 'ADD_INVENTORY'; payload: string }
  | { type: 'UPDATE_ASSET'; payload: { id: string; data: string } }
  | { type: 'BUNDLE_LOADED'; payload: string }
  | { type: 'TOGGLE_MUSIC' }
  | { type: 'TOGGLE_HANDBOOK' }
  | { type: 'TOGGLE_MENU' }
  | { type: 'TOGGLE_FEEDBACK' }
  | { type: 'RESTART_PHASE' }
  | { type: 'RETRY_PHASE' }
  | { type: 'TOGGLE_DASHBOARD' }
  | { type: 'TOGGLE_BOBA_SHOP' }
  | { type: 'BUY_BOBA'; payload: { cost: number; sanityHeal: number } }
  | { type: 'SET_AVATAR'; payload: string }
  | { type: 'SET_TEXT_SPEED'; payload: number }
  | { type: 'SET_ASSETS_LOADING'; payload: { isLoading: boolean; percentage: number } }
  | { type: 'SHOW_TOAST'; payload: { message: string; type: 'success' | 'error' | 'info' } }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'INCREMENT_STREAK' }
  | { type: 'RESET_STREAK' }
  | { type: 'UNLOCK_COSMETIC'; payload: string }
  | { type: 'EQUIP_COSMETIC'; payload: { type: 'AVATAR' | 'THEME'; id: string } }
  | { type: 'TOGGLE_WARDROBE' }
  | { type: 'TOGGLE_SHARE_MODAL' }
  | { type: 'TOGGLE_DYK' }
  | { type: 'SET_DIFFICULTY'; payload: Difficulty }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_MARKET_EVENT'; payload: { name: string; description: string; type: 'neutral' | 'positive' | 'negative'; costMult: number; rewardMult: number; sanityMult: number } | null }
  | { type: 'RESOLVE_CONSEQUENCES'; payload: Consequence[] }
  | { type: 'RESET_GAME' };
