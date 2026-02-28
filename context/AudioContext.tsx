import React, { createContext, useContext, useEffect } from 'react';
import { audioService } from '../services/audioService';
import { useGame } from './GameContext';
import { MusicIntensity, GamePhase } from '../types';

interface AudioContextType {
  initAudio: () => Promise<void>;
  playSFX: (key: string) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useGame();

  // Map Phases to Music Intensity AND Ambience
  useEffect(() => {
    let intensity = MusicIntensity.LOBBY;
    let ambience: any = null;

    switch (state.currentPhase) {
      case GamePhase.START_SCREEN:
        intensity = MusicIntensity.SILENT;
        ambience = null;
        break;
      case GamePhase.PHASE_1_LOBBY:
      case GamePhase.PHASE_1_INTERVIEW:
        intensity = MusicIntensity.LOBBY;
        ambience = 'AMBIENCE_OFFICE';
        break;
      case GamePhase.PHASE_2_SORTING:
      case GamePhase.PHASE_3_ELEMENTS:
        intensity = MusicIntensity.LOBBY;
        ambience = 'AMBIENCE_FACTORY'; // Light machinery
        break;
      case GamePhase.PHASE_4_OVERHEADS:
      case GamePhase.PHASE_5_ALLOCATION:
        intensity = MusicIntensity.LOBBY;
        ambience = 'AMBIENCE_OFFICE';
        break;
      case GamePhase.PHASE_1_QUIZ:
      case GamePhase.PHASE_6_MATH:
      case GamePhase.PHASE_7_DELIVERY:
        intensity = MusicIntensity.FOCUS;
        ambience = 'AMBIENCE_OFFICE';
        break;
      case GamePhase.PHASE_8_PIPES:
        intensity = MusicIntensity.FOCUS;
        ambience = 'AMBIENCE_FACTORY';
        break;
      case GamePhase.PHASE_9_ABSORPTION:
        intensity = MusicIntensity.FOCUS;
        ambience = 'AMBIENCE_OFFICE';
        break;
      case GamePhase.PHASE_10_REALITY:
        intensity = MusicIntensity.SILENT;
        ambience = 'AMBIENCE_RAIN';
        break;
      case GamePhase.PHASE_11_BOSS:
        intensity = MusicIntensity.TENSION;
        ambience = 'ROOF';
        break;
      case GamePhase.PHASE_12_BEHAVIOR:
      case GamePhase.PHASE_13_CONTRIBUTION:
      case GamePhase.PHASE_14_RECONCILIATION:
      case GamePhase.PHASE_15_BREAK_EVEN:
      case GamePhase.PHASE_16_MARGIN_OF_SAFETY:
        intensity = MusicIntensity.FOCUS;
        ambience = 'OFFICE';
        break;
      case GamePhase.PHASE_17_STANDARD:
      case GamePhase.PHASE_18_SALES_VAR:
      case GamePhase.PHASE_19_MATERIAL_VAR:
      case GamePhase.PHASE_20_LABOR_VOH_VAR:
      case GamePhase.PHASE_21_FIXED_VOH_VAR:
        intensity = MusicIntensity.FOCUS;
        ambience = 'FACTORY';
        break;
      case GamePhase.PHASE_22_OP_STATEMENT:
        intensity = MusicIntensity.TENSION;
        ambience = 'ROOF';
        break;
      case GamePhase.PHASE_23_CEREMONY:
        intensity = MusicIntensity.LOBBY;
        ambience = 'OFFICE';
        break;
      case GamePhase.PHASE_24_MATERIAL_MIX_YIELD:
      case GamePhase.PHASE_25_PLANNING_OPERATIONAL:
      case GamePhase.PHASE_26_RELEVANT_COST:
      case GamePhase.PHASE_27_LIMITING_FACTOR:
      case GamePhase.PHASE_28_MAKE_BUY:
      case GamePhase.PHASE_29_SHUTDOWN:
        intensity = MusicIntensity.FOCUS;
        ambience = 'OFFICE';
        break;
      case GamePhase.PHASE_30_STRATEGY_BOSS:
        intensity = MusicIntensity.TENSION;
        ambience = 'ROOF';
        break;
      case GamePhase.PHASE_31_TRANSFER_PRICING:
      case GamePhase.PHASE_32_ROI_RI:
      case GamePhase.PHASE_33_BALANCED_SCORECARD:
      case GamePhase.PHASE_34_DIVISIONAL_PERF:
        intensity = MusicIntensity.FOCUS;
        ambience = 'FACTORY';
        break;
      case GamePhase.PHASE_35_GROUP_BOSS:
        intensity = MusicIntensity.TENSION;
        ambience = 'ROOF';
        break;
      case GamePhase.VICTORY:
        intensity = MusicIntensity.LOBBY;
        ambience = null;
        break;
      case GamePhase.GAME_OVER:
        intensity = MusicIntensity.TENSION;
        ambience = null;
        break;
    }

    audioService.setIntensity(intensity);
    audioService.playAmbience(ambience);

  }, [state.currentPhase]);

  // Update Stress / Sanity Audio Effects
  useEffect(() => {
    audioService.setStressLevel(state.sanity);
  }, [state.sanity]);

  const initAudio = async () => {
    await audioService.initialize();
    audioService.startMusic();
    audioService.setStressLevel(state.sanity);
  };

  const toggleMute = () => {
    audioService.toggleMute();
  };

  const playSFX = (key: any) => {
    audioService.playSFX(key);
  };

  return (
    <AudioContext.Provider value={{ initAudio, playSFX, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};