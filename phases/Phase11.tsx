
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import FinalCostingGame from '../components/Gameplay/FinalCostingGame';
import { PHASE11_DIALOGUE } from '../data/phase11';
import { ASSETS } from '../constants';
import VfxOverlay from '../components/UI/VfxOverlay';

const Phase11: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;

  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'GAME'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE11_DIALOGUE[lang]['start']);

  const [bgImage, setBgImage] = useState(state.assets[PHASE11_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_DROP_ROOM);

  useEffect(() => {
    if (PHASE11_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE11_DIALOGUE[lang][currentNodeId]);
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
    } else if (nextId === 'RESTART') {
      // Hard Reset for now
      window.location.reload();
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
    dispatch({ type: 'UPDATE_BUDGET', payload: 100 });
  };

  const handleGameIncorrect = () => {
    dispatch({ type: 'UPDATE_SANITY', payload: -2 });
  };

  const handleGameComplete = () => {
    setSubPhase('DIALOGUE');
    setCurrentNodeId('post_game');
    dispatch({ type: 'ADD_INVENTORY', payload: 'RANK_CERTIFIED_CONTROLLER' });
  };

  const charImage = currentNode.characterId && state.assets[currentNode.characterId]
    ? state.assets[currentNode.characterId]
    : currentNode.characterImage;

  return (
    <div className="w-full h-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: currentNode.id === 'rooftop_scene' ? 'brightness(0.5) contrast(1.2)' : 'brightness(0.5) contrast(1.2)'
        }}
      />

      {currentNode.id === 'rooftop_scene' && (
        <VfxOverlay effect="rain" intensity={0.8} active={true} />
      )}

      {subPhase === 'DIALOGUE' && charImage && (
        <CharacterDisplay
          imageSrc={charImage}
          isSpeaker={true}
          alignment="RIGHT"
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
        <FinalCostingGame
          onCorrect={handleGameCorrect}
          onIncorrect={handleGameIncorrect}
          onComplete={handleGameComplete}
        />
      )}
    </div>
  );
};

export default Phase11;
