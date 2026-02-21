
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import RealityCheckGame from '../components/Gameplay/RealityCheckGame';
import { PHASE10_DIALOGUE, REALITY_CHALLENGES } from '../data/phase10';
import { ASSETS } from '../constants';

const Phase10: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;
  
  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'GAME'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  
  // Safe initialization
  const initialNode = PHASE10_DIALOGUE[lang]?.['start'] || {
      id: 'error',
      speaker: 'System',
      text: 'Error loading Phase 10 data.',
      nextId: null
  };

  const [currentNode, setCurrentNode] = useState<DialogueNode>(initialNode);
  const [bgImage, setBgImage] = useState(ASSETS.BG_COMMAND_CENTER);

  useEffect(() => {
    if (PHASE10_DIALOGUE[lang] && PHASE10_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE10_DIALOGUE[lang][currentNodeId]);
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
      dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_11_BOSS }); 
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
    dispatch({ type: 'UPDATE_SANITY', payload: -10 });
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
      {/* Dynamic Rain Effect Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none mix-blend-multiply" />
      
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
            backgroundImage: `url(${bgImage})`,
            filter: 'brightness(0.4) contrast(1.3) grayscale(0.5)' 
        }}
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
            onClick: () => handleChoice(c.nextId, c.action)
          }))}
          onComplete={handleDialogueComplete}
        />
      )}

      {subPhase === 'GAME' && (
        <RealityCheckGame 
            challenges={REALITY_CHALLENGES[lang] || []}
            onCorrect={handleGameCorrect}
            onIncorrect={handleGameIncorrect}
            onComplete={handleGameComplete}
        />
      )}
    </div>
  );
};

export default Phase10;
