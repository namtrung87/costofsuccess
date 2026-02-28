
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import AllocationGame from '../components/Gameplay/AllocationGame';
import { PHASE5_DIALOGUE, ALLOCATION_ITEMS } from '../data/phase5';
import { ASSETS } from '../constants';
import BackgroundParallax from '../components/UI/BackgroundParallax';
import { useAssetPreloader } from '../hooks/useAssetPreloader';

const Phase5: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;

  // Asset Keys for Preloader
  const assetKeys = [
    'BG_ALLOCATION_SECTOR',
    'CHAR_JULES',
    'CHAR_ROB_NEUTRAL'
  ];

  const isAssetsLoading = useAssetPreloader(assetKeys);

  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'GAME'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE5_DIALOGUE[lang]['start']);

  const [bgImage, setBgImage] = useState(state.assets[PHASE5_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_COMMAND_CENTER);

  useEffect(() => {
    if (PHASE5_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE5_DIALOGUE[lang][currentNodeId]);
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
      dispatch({ type: 'ADD_INVENTORY', payload: 'RANK_ALLOCATION_EXPERT' });
      dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_6_MATH });
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
    dispatch({ type: 'UPDATE_BUDGET', payload: 30 });
  };

  const handleGameIncorrect = () => {
    dispatch({ type: 'UPDATE_SANITY', payload: -4 });
  };

  const handleGameComplete = (score: number) => {
    setSubPhase('DIALOGUE');
    setCurrentNodeId('post_game');
  };

  const charImage = currentNode.characterId && state.assets[currentNode.characterId]
    ? state.assets[currentNode.characterId]
    : currentNode.characterImage;

  return (
    <div className={`w-full h-full relative transition-opacity duration-1000 ${isAssetsLoading ? 'opacity-0' : 'opacity-1'}`}>
      <BackgroundParallax
        image={bgImage}
        intensity={0.03}
      />

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
onClick: () => handleChoice(c.nextId, c.action),
consequences: c.consequences,
requiredBudget: c.requiredBudget
          }))}
          onComplete={handleDialogueComplete}
        />
      )}

      {subPhase === 'GAME' && (
        <AllocationGame
          items={ALLOCATION_ITEMS[lang]}
          onCorrect={handleGameCorrect}
          onIncorrect={handleGameIncorrect}
          onComplete={handleGameComplete}
        />
      )}
    </div>
  );
};

export default Phase5;
