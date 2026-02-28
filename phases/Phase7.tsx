
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import DroneDeliveryGame from '../components/Gameplay/DroneDeliveryGame';
import { PHASE7_DIALOGUE } from '../data/phase7';
import { ASSETS } from '../constants';

const Phase7: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;
  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'GAME'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE7_DIALOGUE[lang]['start']);
  
  const [bgImage, setBgImage] = useState(state.assets[PHASE7_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_OPS_CENTER);

  useEffect(() => {
    if (PHASE7_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE7_DIALOGUE[lang][currentNodeId]);
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
    if (nextId === 'START_GAME') setSubPhase('GAME');
    else if (nextId === 'END_PHASE') dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_8_PIPES });
    else setCurrentNodeId(nextId);
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out" style={{ backgroundImage: `url(${bgImage})`, filter: 'brightness(0.5)' }} />
      
      {subPhase === 'DIALOGUE' && (
        <DialogueBox 
          speaker={currentNode.speaker}
          speakerTitle={currentNode.speakerTitle}
          text={currentNode.text}
          choices={currentNode.choices?.map(c => ({
text: c.text, onClick: () => handleChoice(c.nextId, c.action),
consequences: c.consequences,
requiredBudget: c.requiredBudget
          }))}
          onComplete={() => currentNode.nextId && handleChoice(currentNode.nextId)}
        />
      )}

      {subPhase === 'GAME' && (
        <DroneDeliveryGame 
            onCorrect={() => dispatch({ type: 'UPDATE_BUDGET', payload: 5 })}
            onIncorrect={() => dispatch({ type: 'UPDATE_SANITY', payload: -1 })}
            onComplete={() => {
                setSubPhase('DIALOGUE');
                setCurrentNodeId('post_game');
            }}
        />
      )}
    </div>
  );
};

export default Phase7;
