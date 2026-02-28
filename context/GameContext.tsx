
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { GameState, ActionType, GamePhase } from '../types';
import { INITIAL_STATE, ASSET_BUNDLES, DIFFICULTY_SETTINGS } from '../constants';

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<ActionType>;
} | undefined>(undefined);

const gameReducer = (state: GameState, action: ActionType): GameState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_PHASE':
      // Auto-unlock the new phase if not already unlocked
      const unlocked = state.unlockedPhases.includes(action.payload)
        ? state.unlockedPhases
        : [...state.unlockedPhases, action.payload];

      const isGameOver = action.payload === GamePhase.GAME_OVER;

      return {
        ...state,
        currentPhase: action.payload,
        unlockedPhases: unlocked,
        lastActivePhase: isGameOver ? state.currentPhase : state.lastActivePhase
      };
    case 'ENTER_PRACTICE':
      return {
        ...state,
        lastActivePhase: state.currentPhase,
        currentPhase: GamePhase.PRACTICE_MODE,
        isMenuOpen: false
      };
    case 'EXIT_PRACTICE':
      return {
        ...state,
        currentPhase: state.lastActivePhase || GamePhase.START_SCREEN,
        lastActivePhase: null
      };
    case 'UNLOCK_PHASE':
      if (state.unlockedPhases.includes(action.payload)) return state;
      return { ...state, unlockedPhases: [...state.unlockedPhases, action.payload] };
    case 'UPDATE_SANITY':
      // Prevent updates if already dead to avoid loops
      if (state.currentPhase === GamePhase.GAME_OVER) return state;
      const newSanity = Math.max(0, Math.min(100, state.sanity + action.payload));
      return { ...state, sanity: newSanity };
    case 'UPDATE_BUDGET':
      return { ...state, budget: Math.max(0, state.budget + action.payload) };
    case 'ADD_INVENTORY':
      if (state.inventory.includes(action.payload)) return state;
      return { ...state, inventory: [...state.inventory, action.payload] };
    case 'UPDATE_ASSET':
      return {
        ...state,
        assets: {
          ...state.assets,
          [action.payload.id]: action.payload.data
        }
      };
    case 'BUNDLE_LOADED':
      return { ...state, loadedBundles: [...state.loadedBundles, action.payload] };
    case 'TOGGLE_MUSIC':
      return { ...state, musicEnabled: !state.musicEnabled };
    case 'TOGGLE_HANDBOOK':
      return { ...state, isHandbookOpen: !state.isHandbookOpen, isMenuOpen: false, isFeedbackOpen: false };
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen, isHandbookOpen: false, isFeedbackOpen: false };
    case 'TOGGLE_FEEDBACK':
      return { ...state, isFeedbackOpen: !state.isFeedbackOpen, isMenuOpen: false };
    case 'RESTART_PHASE':
      return { ...state, isMenuOpen: false, sanity: 100 };
    case 'RETRY_PHASE':
      return {
        ...state,
        currentPhase: state.lastActivePhase || GamePhase.START_SCREEN,
        sanity: 100,
        budget: Math.max(state.budget, 1000) // Give a small pity budget if they were broke
      };
    case 'BUY_BOBA':
      if (state.budget >= 50 && state.sanity < 100) {
        return {
          ...state,
          budget: state.budget - 50,
          sanity: Math.min(100, state.sanity + 20) // Restore 20 Sanity
        };
      }
      return state;
    case 'SET_AVATAR':
      return { ...state, playerAvatar: action.payload };
    case 'SET_TEXT_SPEED':
      return { ...state, textSpeed: action.payload };
    case 'SET_ASSETS_LOADING':
      return {
        ...state,
        isAssetsLoading: action.payload.isLoading,
        percentageLoaded: action.payload.percentage
      };
    case 'SHOW_TOAST':
      const newToast = {
        id: Math.random().toString(36).substr(2, 9),
        message: action.payload.message,
        type: action.payload.type
      };
      return { ...state, toasts: [...state.toasts, newToast] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    case 'UNLOCK_ACHIEVEMENT':
      if (state.unlockedAchievements.includes(action.payload)) return state;
      return { ...state, unlockedAchievements: [...state.unlockedAchievements, action.payload] };
    case 'INCREMENT_STREAK':
      const newStreak = state.streak + 1;
      return {
        ...state,
        streak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak)
      };
    case 'RESET_STREAK':
      return { ...state, streak: 0 };
    case 'UNLOCK_COSMETIC':
      if (state.unlockedCosmetics.includes(action.payload)) return state;
      return { ...state, unlockedCosmetics: [...state.unlockedCosmetics, action.payload] };
    case 'EQUIP_COSMETIC':
      return action.payload.type === 'AVATAR'
        ? { ...state, equippedAvatar: action.payload.id }
        : { ...state, activeTheme: action.payload.id };
    case 'TOGGLE_WARDROBE':
      return { ...state, isWardrobeOpen: !state.isWardrobeOpen };
    case 'TOGGLE_SHARE_MODAL':
      return { ...state, isShareModalOpen: !state.isShareModalOpen };
    case 'SET_DIFFICULTY':
      const settings = DIFFICULTY_SETTINGS[action.payload];
      return {
        ...state,
        difficulty: action.payload,
        budget: settings.startingBudget,
        sanity: settings.startingSanity
      };
    case 'RESOLVE_CONSEQUENCES':
      let newState = { ...state };
      action.payload.forEach(cons => {
        if (cons.type === 'SANITY') newState.sanity += cons.value as number;
        if (cons.type === 'BUDGET') newState.budget += cons.value as number;
        if (cons.type === 'FLAG' && !newState.flags.includes(cons.value as string)) {
          newState.flags = [...newState.flags, cons.value as string];
        }
      });
      return newState;
    default:
      return state;
  }
};

// Initializer to load assets from LocalStorage
const init = (initialState: GameState): GameState => {
  try {
    // UPDATED STORAGE KEY TO FORCE ASSET REFRESH (V10)
    const savedAssets = localStorage.getItem('GAME_ASSETS_V10');

    // Check for saved avatar settings
    const savedAvatar = localStorage.getItem('GAME_AVATAR');
    const savedSpeed = localStorage.getItem('GAME_SPEED');

    let loadedState = { ...initialState };

    // Load Game Progress (NEW)
    const savedProgress = localStorage.getItem('GAME_PROGRESS_V1');

    if (savedAssets) {
      loadedState.assets = JSON.parse(savedAssets);
    }
    if (savedAvatar) {
      loadedState.playerAvatar = savedAvatar;
    }
    if (savedSpeed) {
      loadedState.textSpeed = parseInt(savedSpeed, 10);
    }
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      loadedState = {
        ...loadedState,
        currentPhase: progress.currentPhase,
        unlockedPhases: progress.unlockedPhases,
        budget: progress.budget,
        sanity: progress.sanity,
        unlockedAchievements: progress.unlockedAchievements || [],
        streak: progress.streak || 0,
        maxStreak: progress.maxStreak || 0,
        equippedAvatar: progress.equippedAvatar || 'avatar_default',
        unlockedCosmetics: progress.unlockedCosmetics || ['avatar_default', 'theme_default'],
        activeTheme: progress.activeTheme || 'theme_default',
        flags: progress.flags || []
      };
    }

    return loadedState;
  } catch (e) {
    console.error("Failed to load assets from storage", e);
  }
  return initialState;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE, init);

  // Persistence Logic: Save assets whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('GAME_ASSETS_V10', JSON.stringify(state.assets));
    } catch (e) {
      console.warn("Failed to save assets to storage (Quota exceeded?)", e);
    }
  }, [state.assets]);

  // Persist Avatar choice
  useEffect(() => {
    localStorage.setItem('GAME_AVATAR', state.playerAvatar);
  }, [state.playerAvatar]);

  // Persist Settings
  useEffect(() => {
    localStorage.setItem('GAME_SPEED', state.textSpeed.toString());
  }, [state.textSpeed]);

  // Persist Game Progress
  useEffect(() => {
    const progress = {
      currentPhase: state.currentPhase,
      unlockedPhases: state.unlockedPhases,
      budget: state.budget,
      sanity: state.sanity,
      unlockedAchievements: state.unlockedAchievements,
      streak: state.streak,
      maxStreak: state.maxStreak,
      equippedAvatar: state.equippedAvatar,
      unlockedCosmetics: state.unlockedCosmetics,
      activeTheme: state.activeTheme,
      flags: state.flags
    };
    localStorage.setItem('GAME_PROGRESS_V1', JSON.stringify(progress));
  }, [state.currentPhase, state.unlockedPhases, state.budget, state.sanity, state.unlockedAchievements, state.streak, state.maxStreak, state.equippedAvatar, state.unlockedCosmetics, state.activeTheme, state.flags]);

  // --- GAMEPLAY TWIST: SANITY DECAY LOOP ---
  useEffect(() => {
    // Don't decay in non-gameplay phases
    const isSafeZone = [
      GamePhase.START_SCREEN,
      GamePhase.GAME_OVER,
      GamePhase.VICTORY
    ].includes(state.currentPhase);

    // Don't decay if paused/menus open
    const isPaused = state.isMenuOpen || state.isHandbookOpen || state.isFeedbackOpen;

    if (!isSafeZone && !isPaused) {
      // Difficulty Scaling for Sanity Decay
      let decayInterval = 4000; // Intermediate default
      const phaseNum = parseInt(state.currentPhase.replace(/[^0-9]/g, ''), 10);

      if (state.currentPhase.includes('BOSS')) {
        decayInterval = 2500;
      } else if (phaseNum >= 24) {
        decayInterval = 3000;
      } else if (phaseNum >= 12) {
        decayInterval = 4000;
      } else {
        decayInterval = 5000;
      }

      const decayTimer = setInterval(() => {
        dispatch({ type: 'UPDATE_SANITY', payload: -1 });
      }, decayInterval);

      return () => clearInterval(decayTimer);
    }
  }, [state.currentPhase, state.isMenuOpen, state.isHandbookOpen, state.isFeedbackOpen]);
  // Removed state.sanity from dependency array to prevent timer reset on every update.
  // The reducer handles the math based on current state.

  // --- GAME OVER TRIGGER ---
  useEffect(() => {
    if (state.sanity <= 0 && state.currentPhase !== GamePhase.GAME_OVER && state.currentPhase !== GamePhase.START_SCREEN) {
      dispatch({ type: 'SET_PHASE', payload: GamePhase.GAME_OVER });
    }
  }, [state.sanity, state.currentPhase]);


  // Lazy Load Logic - OPTIMIZED FOR SPEED
  useEffect(() => {
    const loadBundle = (bundleName: string, assetKeys: string[]) => {
      if (state.loadedBundles.includes(bundleName)) return;

      // Optimization: Real background prefetching without artificial delay
      // Triggers browser to fetch images immediately
      assetKeys.forEach(key => {
        const url = state.assets[key];
        if (url) {
          const img = new Image();
          img.onload = () => console.log(`Prefetched: ${key}`);
          img.onerror = () => console.warn(`Failed to prefetch: ${key}`);
          img.src = url;
        }
      });

      dispatch({ type: 'BUNDLE_LOADED', payload: bundleName });
    };

    if (state.currentPhase === GamePhase.PHASE_1_LOBBY) {
      loadBundle('BUNDLE_LAB', ASSET_BUNDLES.BUNDLE_LAB);
    }
    if (state.currentPhase === GamePhase.PHASE_3_ELEMENTS) {
      loadBundle('BUNDLE_OPS', ASSET_BUNDLES.BUNDLE_OPS);
    }
    if (state.currentPhase === GamePhase.PHASE_8_PIPES) {
      loadBundle('BUNDLE_FINALE', ASSET_BUNDLES.BUNDLE_FINALE);
    }

  }, [state.currentPhase, state.loadedBundles]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const useLanguage = () => {
  const { state } = useGame();
  return state.language;
};

export const useBudget = () => {
  const { state } = useGame();
  return state.budget;
};

export const usePhase = () => {
  const { state } = useGame();
  return state.currentPhase;
};

export const useSanity = () => {
  const { state } = useGame();
  return state.sanity;
};
