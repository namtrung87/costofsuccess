
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import ApportionmentMathGame from '../components/Gameplay/ApportionmentMathGame';
import { PHASE6_DIALOGUE, MATH_PROBLEMS } from '../data/phase6';
import { ASSETS } from '../constants';
import BackgroundParallax from '../components/UI/BackgroundParallax';
import { useAssetPreloader } from '../hooks/useAssetPreloader';

const Phase6: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;

  // Asset Keys for Preloader
  const assetKeys = [
    'BG_MAINFRAME'
  ];

  const isAssetsLoading = useAssetPreloader(assetKeys);

  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'GAME'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE6_DIALOGUE[lang]['start']);

  const [bgImage, setBgImage] = useState(state.assets[PHASE6_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_OPS_CENTER);

  useEffect(() => {
    if (PHASE6_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE6_DIALOGUE[lang][currentNodeId]);
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
    else if (nextId === 'END_PHASE') dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_7_DELIVERY });
    else setCurrentNodeId(nextId);
  };

  return (
    <div className={`w-full h-full relative transition-opacity duration-1000 ${isAssetsLoading ? 'opacity-0' : 'opacity-1'}`}>
      <BackgroundParallax
        image={bgImage}
        intensity={0.03}
      />

      {subPhase === 'DIALOGUE' && (
        <DialogueBox
          speaker={currentNode.speaker}
          speakerTitle={currentNode.speakerTitle}
          text={currentNode.text}
          choices={currentNode.choices?.map(c => ({ text: c.text, onClick: () => handleChoice(c.nextId, c.action) }))}
          onComplete={() => currentNode.nextId && handleChoice(currentNode.nextId)}
        />
      )}

      {subPhase === 'GAME' && (
        <ApportionmentMathGame
          problems={MATH_PROBLEMS}
          onCorrect={() => dispatch({ type: 'UPDATE_BUDGET', payload: 10 })}
          onIncorrect={() => dispatch({ type: 'UPDATE_SANITY', payload: -2 })}
          onComplete={() => {
            setSubPhase('DIALOGUE');
            setCurrentNodeId('post_game');
          }}
        />
      )}
    </div>
  );
};

export default Phase6;
