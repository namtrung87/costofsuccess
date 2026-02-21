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
            ambience = 'AMBIENCE_ROOF';
            break;
        case GamePhase.GAME_OVER:
            intensity = MusicIntensity.TENSION;
            ambience = null;
            break;
    }

    audioService.setIntensity(intensity);
    // @ts-ignore
    audioService.playAmbience(ambience);

  }, [state.currentPhase]);

  const initAudio = async () => {
    await audioService.initialize();
    audioService.startMusic();
  };

  const toggleMute = () => {
      audioService.toggleMute();
  };

  const playSFX = (key: string) => {
      // @ts-ignore
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