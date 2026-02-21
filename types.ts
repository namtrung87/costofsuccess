
import React from 'react';

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

export interface GameState {
  language: Language;
  currentPhase: GamePhase;
  lastActivePhase: GamePhase | null; // Track where to return after practice
  unlockedPhases: GamePhase[];
  sanity: number;
  budget: number;
  playerName: string;
  playerAvatar: string; // Gen Z: Identity/Customization
  inventory: string[];
  musicEnabled: boolean;
  isHandbookOpen: boolean;
  isMenuOpen: boolean;
  isFeedbackOpen: boolean; // New State for Feedback
  assets: Record<string, string>;
  loadedBundles: string[];
  textSpeed: number;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerTitle?: string;
  text: string;
  mood?: 'neutral' | 'happy' | 'angry' | 'surprised';
  backgroundImage?: string;
  characterImage?: string;
  characterId?: string;
  choices?: {
    text: string;
    nextId: string;
    action?: (dispatch: React.Dispatch<ActionType>) => void;
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
  | { type: 'BUY_BOBA' }
  | { type: 'SET_AVATAR'; payload: string }
  | { type: 'SET_TEXT_SPEED'; payload: number };
