
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { GameState, ActionType, GamePhase } from '../types';
import { INITIAL_STATE, ASSET_BUNDLES } from '../constants';

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
      return { 
          ...state, 
          currentPhase: action.payload,
          unlockedPhases: unlocked
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
      return { ...state, budget: state.budget + action.payload };
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

    if (savedAssets) {
        loadedState.assets = JSON.parse(savedAssets);
    }
    if (savedAvatar) {
        loadedState.playerAvatar = savedAvatar;
    }
    if (savedSpeed) {
        loadedState.textSpeed = parseInt(savedSpeed, 10);
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
          const decayTimer = setInterval(() => {
              dispatch({ type: 'UPDATE_SANITY', payload: -1 }); // Lose 1 Sanity every 4 seconds
          }, 4000); 

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
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
