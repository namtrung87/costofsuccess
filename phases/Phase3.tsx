
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import ElementSorter from '../components/Gameplay/ElementSorter';
import { PHASE3_DIALOGUE, ELEMENT_ITEMS } from '../data/phase3';
import { ASSETS } from '../constants';

const Phase3: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;
  
  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'GAME' | 'COST_CARD'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE3_DIALOGUE[lang]['start']);
  
  const [bgImage, setBgImage] = useState(state.assets[PHASE3_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_TECH_ROOM);

  useEffect(() => {
    if (PHASE3_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE3_DIALOGUE[lang][currentNodeId]);
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
    } else if (nextId === 'SHOW_COST_CARD') {
      setSubPhase('COST_CARD');
    } else if (nextId === 'END_PHASE') {
      dispatch({ type: 'ADD_INVENTORY', payload: 'NEON_VISOR_SKIN' });
      dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_4_OVERHEADS }); 
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
    dispatch({ type: 'UPDATE_BUDGET', payload: 20 });
  };

  const handleGameIncorrect = () => {
    dispatch({ type: 'UPDATE_SANITY', payload: -2 });
  };

  const handleGameComplete = (score: number) => {
    setSubPhase('DIALOGUE');
    setCurrentNodeId('post_game');
  };

  const handleCostCardContinue = () => {
      setSubPhase('DIALOGUE');
      setCurrentNodeId('kai_interruption');
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
            filter: 'brightness(0.6) contrast(1.2)' 
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
        <ElementSorter 
            items={ELEMENT_ITEMS[lang]}
            onCorrect={handleGameCorrect}
            onIncorrect={handleGameIncorrect}
            onComplete={handleGameComplete}
        />
      )}

      {subPhase === 'COST_CARD' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="w-full max-w-2xl bg-obsidian border-2 border-neonCyan p-8 rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.3)]">
                <h2 className="text-3xl font-heading text-white mb-6 text-center">COST CARD: <span className="text-neonCyan">CYBER-SNEAKER</span></h2>
                
                <div className="space-y-4 font-mono text-lg mb-8">
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-neonCyan">Direct Material</span>
                        <span>$30.00</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-purple-400">Direct Labor</span>
                        <span>$15.00</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-orange-400">Direct Expense</span>
                        <span>$5.00</span>
                    </div>
                    <div className="flex justify-between pt-4 text-2xl font-bold">
                        <span className="text-white">TOTAL PRIME COST</span>
                        <span className="text-neonGreen">$50.00</span>
                    </div>
                </div>

                <div className="text-center">
                    <button 
                        onClick={handleCostCardContinue}
                        className="bg-neonCyan text-black font-heading font-bold px-8 py-3 rounded hover:bg-white hover:scale-105 transition-all"
                    >
                        ANALYZE
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Phase3;
