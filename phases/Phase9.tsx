
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import AbsorptionGame from '../components/Gameplay/AbsorptionGame';
import { PHASE9_DIALOGUE, OAR_CHALLENGES } from '../data/phase9';
import { ASSETS } from '../constants';

const Phase9: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;
  
  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'GAME'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE9_DIALOGUE[lang]['start']);
  
  const [bgImage, setBgImage] = useState(state.assets[PHASE9_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_VALUATION_ROOM);

  useEffect(() => {
    if (PHASE9_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE9_DIALOGUE[lang][currentNodeId]);
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
      // Reward logic
      dispatch({ type: 'ADD_INVENTORY', payload: 'NAMED_HOODIE' });
      dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_10_REALITY }); 
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
    dispatch({ type: 'UPDATE_BUDGET', payload: 50 });
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
    <div className="w-full h-full relative">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
            backgroundImage: `url(${bgImage})`,
            filter: 'brightness(0.9) contrast(1.1)' 
        }}
      />

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
onClick: () => handleChoice(c.nextId, c.action),
consequences: c.consequences,
requiredBudget: c.requiredBudget
          }))}
          onComplete={handleDialogueComplete}
        />
      )}

      {subPhase === 'GAME' && (
        <AbsorptionGame 
            challenges={OAR_CHALLENGES}
            onCorrect={handleGameCorrect}
            onIncorrect={handleGameIncorrect}
            onComplete={handleGameComplete}
        />
      )}
    </div>
  );
};

export default Phase9;
