
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { GameState, ActionType, GamePhase } from '../types';
import { INITIAL_STATE, ASSET_BUNDLES, DIFFICULTY_SETTINGS } from '../constants';

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<ActionType>;
} | undefined>(undefined);

export const gameReducer = (state: GameState, action: ActionType): GameState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_PHASE':
      // Auto-unlock the new phase if not already unlocked
      const isNewPhase = !state.unlockedPhases.includes(action.payload);
      const unlocked = isNewPhase
        ? [...state.unlockedPhases, action.payload]
        : state.unlockedPhases;

      const isGameOver = action.payload === GamePhase.GAME_OVER;

      return {
        ...state,
        currentPhase: action.payload,
        unlockedPhases: unlocked,
        budgetHistory: isNewPhase ? [...state.budgetHistory, state.budget] : state.budgetHistory,
        sanityHistory: isNewPhase ? [...state.sanityHistory, state.sanity] : state.sanityHistory,
        lastActivePhase: isGameOver ? state.currentPhase : state.lastActivePhase
      };
    case 'ENTER_PRACTICE':
      return {
        ...state,
        lastActivePhase: state.currentPhase,
        currentPhase: GamePhase.PRACTICE_MODE,
        activeModal: null
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
      if (state.currentPhase === GamePhase.GAME_OVER) return state;
      const sMult = state.multipliers?.sanity ?? 1;
      const finalSanityChange = action.payload < 0 ? action.payload * sMult : action.payload; // Multiplier only applies to drain
      return { ...state, sanity: Math.max(0, Math.min(100, state.sanity + finalSanityChange)) };
    case 'UPDATE_BUDGET':
      const bMult = action.payload > 0 ? (state.multipliers?.reward ?? 1) : (state.multipliers?.cost ?? 1);
      return { ...state, budget: Math.max(0, state.budget + (action.payload * bMult)) };
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
      return { ...state, activeModal: state.activeModal === 'HANDBOOK' ? null : 'HANDBOOK' };
    case 'TOGGLE_MENU':
      return { ...state, activeModal: state.activeModal === 'PAUSE' ? null : 'PAUSE' };
    case 'TOGGLE_FEEDBACK':
      return { ...state, activeModal: state.activeModal === 'FEEDBACK' ? null : 'FEEDBACK' };
    case 'RESTART_PHASE':
      return { ...state, activeModal: null, sanity: 100 };
    case 'RETRY_PHASE':
      return {
        ...state,
        currentPhase: state.lastActivePhase || GamePhase.START_SCREEN,
        sanity: 100,
        budget: Math.max(state.budget, 1000) // Give a small pity budget if they were broke
      };
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
    case 'CLOSE_MODAL':
      return { ...state, activeModal: null };
    case 'TOGGLE_WARDROBE':
      return { ...state, activeModal: state.activeModal === 'WARDROBE' ? null : 'WARDROBE' };
    case 'TOGGLE_SHARE_MODAL':
      return { ...state, activeModal: state.activeModal === 'SHARE' ? null : 'SHARE' };
    case 'TOGGLE_DYK':
      return { ...state, activeModal: state.activeModal === 'DYK' ? null : 'DYK' };
    case 'TOGGLE_DASHBOARD':
      return { ...state, activeModal: state.activeModal === 'DASHBOARD' ? null : 'DASHBOARD' };
    case 'TOGGLE_BOBA_SHOP':
      return { ...state, activeModal: state.activeModal === 'BOBA_SHOP' ? null : 'BOBA_SHOP' };
    case 'BUY_BOBA':
      return {
        ...state,
        budget: state.budget - action.payload.cost,
        sanity: Math.min(100, state.sanity + action.payload.sanityHeal)
      };
    case 'SET_DIFFICULTY':
      const settings = DIFFICULTY_SETTINGS[action.payload];
      return {
        ...state,
        difficulty: action.payload,
        budget: settings.startingBudget,
        sanity: settings.startingSanity
      };
    case 'SET_MARKET_EVENT':
      return {
        ...state,
        marketEvent: action.payload ? { name: action.payload.name, description: action.payload.description, type: action.payload.type } : null,
        multipliers: action.payload ? { cost: action.payload.costMult, reward: action.payload.rewardMult, sanity: action.payload.sanityMult } : { cost: 1, reward: 1, sanity: 1 }
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
    case 'RESET_GAME':
      localStorage.removeItem('GAME_PROGRESS_V1');
      localStorage.removeItem('GAME_SAVE_SLOTS_V1');
      return { ...INITIAL_STATE, language: state.language };
    default:
      return state;
  }
};

// Initializer to load assets from LocalStorage
const init = (initialState: GameState): GameState => {
  try {
    // UPDATED STORAGE KEY TO FORCE ASSET REFRESH (V11)
    const savedAssets = localStorage.getItem('GAME_ASSETS_V11');

    // Check for saved avatar settings
    const savedAvatar = localStorage.getItem('GAME_AVATAR');
    const savedSpeed = localStorage.getItem('GAME_SPEED');

    let loadedState = { ...initialState };

    // Load Game Progress (NEW)
    const savedProgress = localStorage.getItem('GAME_PROGRESS_V1');

    if (savedAssets) {
      const parsedAssets = JSON.parse(savedAssets);
      // SANITIZATION: Check for broken local file paths from previous versions
      const hasBrokenPaths = Object.values(parsedAssets).some(url => typeof url === 'string' && url.includes('file:///'));

      if (hasBrokenPaths) {
        console.warn("Detected broken asset paths in storage, resetting to defaults.");
      } else {
        loadedState.assets = parsedAssets;
      }
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
        // ALWAYS START AT START_SCREEN on fresh boot
        currentPhase: GamePhase.START_SCREEN,
        unlockedPhases: progress.unlockedPhases || [GamePhase.START_SCREEN],
        budget: progress.budget,
        sanity: progress.sanity,
        budgetHistory: progress.budgetHistory || [],
        sanityHistory: progress.sanityHistory || [],
        unlockedAchievements: progress.unlockedAchievements || [],
        streak: progress.streak || 0,
        maxStreak: progress.maxStreak || 0,
        equippedAvatar: progress.equippedAvatar || 'avatar_default',
        unlockedCosmetics: progress.unlockedCosmetics || ['avatar_default', 'theme_default'],
        activeTheme: progress.activeTheme || 'theme_default',
        flags: progress.flags || [],
        activeModal: null // Reset on reload
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
      localStorage.setItem('GAME_ASSETS_V11', JSON.stringify(state.assets));
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
      budgetHistory: state.budgetHistory,
      sanityHistory: state.sanityHistory,
      unlockedAchievements: state.unlockedAchievements,
      streak: state.streak,
      maxStreak: state.maxStreak,
      equippedAvatar: state.equippedAvatar,
      unlockedCosmetics: state.unlockedCosmetics,
      activeTheme: state.activeTheme,
      flags: state.flags
    };
    localStorage.setItem('GAME_PROGRESS_V1', JSON.stringify(progress));
  }, [state.currentPhase, state.unlockedPhases, state.budget, state.sanity, state.budgetHistory, state.sanityHistory, state.unlockedAchievements, state.streak, state.maxStreak, state.equippedAvatar, state.unlockedCosmetics, state.activeTheme, state.flags]);

  // --- GAMEPLAY TWIST: SANITY DECAY LOOP ---
  useEffect(() => {
    // Don't decay in non-gameplay phases
    // Don't decay in non-gameplay phases
    const isSafeZone = [
      GamePhase.START_SCREEN,
      GamePhase.GAME_OVER,
      GamePhase.VICTORY
    ].includes(state.currentPhase);

    // Don't decay if paused/menus open
    const isPaused = state.activeModal !== null;

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

      // Start Web Worker Timer
      const worker = new Worker(new URL('../workers/gameWorker.ts', import.meta.url), { type: 'module' });
      worker.postMessage({ type: 'START_SANITY_TIMER', payload: { interval: decayInterval } });

      worker.onmessage = (e) => {
        if (e.data.type === 'TICK_SANITY') {
          dispatch({ type: 'UPDATE_SANITY', payload: -1 });
        }
      };

      return () => {
        worker.postMessage({ type: 'STOP_SANITY_TIMER' });
        worker.terminate();
      };
    }
  }, [state.currentPhase, state.activeModal]);
  // Removed state.sanity from dependency array to prevent timer reset on every update.
  // The reducer handles the math based on current state.

  // --- GLOBAL KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE_MODAL' });
      if (e.key === 'Tab') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_DASHBOARD' });
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

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

  // --- MARKET VOLATILITY LOOP (NEW) ---
  useEffect(() => {
    const isGameplay = ![GamePhase.START_SCREEN, GamePhase.GAME_OVER, GamePhase.VICTORY].includes(state.currentPhase);
    if (!isGameplay) return;

    const events = [
      { name: 'FABRIC SHORTAGE', description: 'SUPPLY CHAIN COLLAPSE IN SECTOR 7', type: 'negative', costMult: 1.5, rewardMult: 1.0, sanityMult: 1.2 },
      { name: 'GLOBAL HYPE SURGE', description: 'VIRAL TRENDING IN NEO-TOKYO', type: 'positive', costMult: 1.1, rewardMult: 2.0, sanityMult: 0.8 },
      { name: 'AUDIT PRESSURE', description: 'INTERNAL AFFAIRS PROBING DEPT B', type: 'negative', costMult: 1.0, rewardMult: 0.8, sanityMult: 2.5 },
      { name: 'SYNERGY BOOST', description: 'COFFEE MACHINE FIXED AT LOBBY', type: 'positive', costMult: 0.9, rewardMult: 1.2, sanityMult: 0.5 },
      { name: 'MARKET STABILIZED', description: 'VOLATILITY SUBSIDING', type: 'neutral', costMult: 1.0, rewardMult: 1.0, sanityMult: 1.0 },
    ];

    const worker = new Worker(new URL('../workers/gameWorker.ts', import.meta.url), { type: 'module' });
    worker.postMessage({ type: 'START_MARKET_TIMER' });

    worker.onmessage = (e) => {
      if (e.data.type === 'TICK_MARKET') {
        // 25% chance of event change every 20 seconds
        if (Math.random() < 0.25) {
          const randomEvent = events[Math.floor(Math.random() * events.length)];
          const payload = randomEvent.name === 'MARKET STABILIZED' ? null : randomEvent;
          dispatch({ type: 'SET_MARKET_EVENT', payload });

          if (payload) {
            dispatch({
              type: 'SHOW_TOAST',
              payload: {
                message: `MARKET ALERT: ${payload.name}`,
                type: payload.type === 'positive' ? 'success' : payload.type === 'negative' ? 'error' : 'info'
              }
            });
          }
        }
      }
    };

    return () => {
      worker.postMessage({ type: 'STOP_MARKET_TIMER' });
      worker.terminate();
    };
  }, [state.currentPhase]);

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
