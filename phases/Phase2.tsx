
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import SortingGame from '../components/Gameplay/SortingGame';
import PhaseResult from '../components/Gameplay/PhaseResult';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import BackgroundParallax from '../components/UI/BackgroundParallax';
import { useAssetPreloader } from '../hooks/useAssetPreloader';
import { PHASE2_DIALOGUE, SORTING_ITEMS } from '../data/phase2';
import { TUTORIALS, ASSETS } from '../constants';

const Phase2: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;

  // Asset Keys for Preloader
  const assetKeys = [
    'BG_DESIGN_LAB',
    'CHAR_KAI_STRESSED',
    'PHASE_COMPLETE'
  ];

  const isAssetsLoading = useAssetPreloader(assetKeys);

  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'TUTORIAL' | 'GAME' | 'RESULT'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE2_DIALOGUE[lang]['start']);
  const [score, setScore] = useState(0);

  const [bgImage, setBgImage] = useState(state.assets[PHASE2_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_DESIGN_LAB);

  useEffect(() => {
    if (PHASE2_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE2_DIALOGUE[lang][currentNodeId]);
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
      setSubPhase('TUTORIAL');
    } else if (nextId === 'END_PHASE') {
      dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_3_ELEMENTS });
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

  const handleGameComplete = (finalScore: number) => {
    setScore(finalScore);
    setSubPhase('RESULT');
  };

  const handleResultContinue = () => {
    setSubPhase('DIALOGUE');
    if (score >= 7) {
      setCurrentNodeId('post_game_success');
    } else {
      setCurrentNodeId('post_game_failure');
    }
  };

  const handlePractice = () => {
    setSubPhase('GAME');
    setScore(0);
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

      {subPhase === 'TUTORIAL' && (
        <TutorialOverlay
          title={TUTORIALS.PHASE_2.title}
          steps={TUTORIALS.PHASE_2.steps}
          onComplete={() => setSubPhase('GAME')}
        />
      )}

      {subPhase === 'GAME' && (
        <SortingGame
          items={SORTING_ITEMS[lang]}
          onCorrect={handleGameCorrect}
          onIncorrect={handleGameIncorrect}
          onComplete={handleGameComplete}
        />
      )}

      {subPhase === 'RESULT' && (
        <PhaseResult
          title="Classification Complete"
          score={score}
          maxScore={10}
          feedbackText={score >= 7 ? "Solid work. Expenses separated from Assets." : "Too many errors. Review the handbook."}
          tipText="Prime Costs follow the product. Period Costs follow time."
          onContinue={handleResultContinue}
          onRetry={handlePractice}
          onPractice={handlePractice}
        />
      )}
    </div>
  );
};

export default Phase2;
