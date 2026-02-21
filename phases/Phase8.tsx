
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import PumpRoomGame from '../components/Gameplay/PumpRoomGame';
import VfxOverlay from '../components/UI/VfxOverlay';
import { PHASE8_DIALOGUE, PUMP_CHALLENGES } from '../data/phase8';
import { ASSETS } from '../constants';

const Phase8: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;

  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'GAME'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE8_DIALOGUE[lang]['start']);

  const [bgImage, setBgImage] = useState(state.assets[PHASE8_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_PUMP_ROOM);

  useEffect(() => {
    if (PHASE8_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE8_DIALOGUE[lang][currentNodeId]);
    }
  }, [currentNodeId, lang]);

  useEffect(() => {
    const key = currentNode.backgroundImage;
    if (key && state.assets[key]) {
      setBgImage(state.assets[key]);
    }
  }, [currentNode, state.assets]);

  const handleChoice = (nextId: string, action?: (dispatch: any) => void) => {
    if (action) action(dispatch);

    if (nextId === 'START_GAME') {
      setSubPhase('GAME');
    } else if (nextId === 'END_PHASE') {
      dispatch({ type: 'ADD_INVENTORY', payload: 'RANK_REAPPORTIONMENT_SPEC' });
      dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_9_ABSORPTION });
    } else {
      setCurrentNodeId(nextId);
    }
  };

  const handleDialogueComplete = () => {
    if (currentNode.nextId) {
      handleChoice(currentNode.nextId);
    }
  };

  const handleGameCorrect = () => {
    dispatch({ type: 'UPDATE_BUDGET', payload: 40 });
  };

  const handleGameIncorrect = () => {
    dispatch({ type: 'UPDATE_SANITY', payload: -5 });
  };

  const handleGameComplete = () => {
    setSubPhase('DIALOGUE');
    setCurrentNodeId('post_game');
  };

  const charImage = currentNode.characterId && state.assets[currentNode.characterId]
    ? state.assets[currentNode.characterId]
    : currentNode.characterImage;

  return (
    <div className="w-full h-full relative scanlines">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'brightness(0.5) sepia(0.3) contrast(1.1)'
        }}
      />

      <VfxOverlay type="dust" intensity="medium" />

      {subPhase === 'DIALOGUE' && charImage && (
        <CharacterDisplay
          imageSrc={charImage}
          isSpeaker={true}
          alignment="LEFT"
        />
      )}

      {subPhase === 'DIALOGUE' && (
        <DialogueBox
          speaker={currentNode.speaker}
          speakerTitle={currentNode.speakerTitle}
          text={currentNode.text}
          choices={currentNode.choices?.map(c => ({
            text: c.text,
            onClick: () => handleChoice(c.nextId, c.action)
          }))}
          onComplete={handleDialogueComplete}
        />
      )}

      {subPhase === 'GAME' && (
        <PumpRoomGame
          challenges={PUMP_CHALLENGES}
          onCorrect={handleGameCorrect}
          onIncorrect={handleGameIncorrect}
          onComplete={handleGameComplete}
        />
      )}
    </div>
  );
};

export default Phase8;
