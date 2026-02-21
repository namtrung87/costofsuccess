
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import QuizInterface from '../components/Gameplay/QuizInterface';
import ContractInterface from '../components/Gameplay/ContractInterface';
import PhaseResult from '../components/Gameplay/PhaseResult';
import VfxOverlay from '../components/UI/VfxOverlay';
import { PHASE1_DIALOGUE, PHASE1_QUIZ } from '../data/phase1';
import { ASSETS } from '../constants';

const Phase1: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;

  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'QUIZ' | 'CONTRACT' | 'RESULT'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE1_DIALOGUE[lang]['start']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  // Persistent Background State
  const [bgImage, setBgImage] = useState(state.assets[PHASE1_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_LOBBY);

  useEffect(() => {
    if (PHASE1_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE1_DIALOGUE[lang][currentNodeId]);
    }
  }, [currentNodeId, lang]);

  // Update Background only if new node has one
  useEffect(() => {
    const key = currentNode.backgroundImage;
    if (key && state.assets[key]) {
      setBgImage(state.assets[key]);
    }
  }, [currentNode, state.assets]);

  const handleChoice = (nextId: string, action?: (dispatch: any) => void) => {
    if (action) {
      action(dispatch);
    }

    if (nextId === 'GAME_OVER') {
      alert("GAME OVER");
      window.location.reload();
      return;
    }

    processNextNode(nextId);
  };

  const handleDialogueComplete = () => {
    if (currentNode.nextId) {
      processNextNode(currentNode.nextId);
    }
  };

  const processNextNode = (nextId: string) => {
    if (nextId === 'START_QUIZ') {
      setSubPhase('QUIZ');
    } else if (nextId === 'START_CONTRACT') {
      setSubPhase('CONTRACT');
    } else if (nextId === 'END_PHASE') {
      setSubPhase('RESULT');
    } else {
      setCurrentNodeId(nextId);
    }
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    const question = PHASE1_QUIZ[lang][currentQuestionIndex];

    if (isCorrect) {
      dispatch({ type: 'UPDATE_BUDGET', payload: question.reward });
      setQuizScore(prev => prev + 1);
    } else {
      dispatch({ type: 'UPDATE_SANITY', payload: -question.penalty });
    }

    if (currentQuestionIndex < PHASE1_QUIZ[lang].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setSubPhase('DIALOGUE');
      setCurrentNodeId('elevator_ride');
    }
  };

  const handleContractSigned = () => {
    setSubPhase('DIALOGUE');
    setCurrentNodeId('post_contract');
  };

  const handleResultContinue = () => {
    dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_2_SORTING });
  };

  const handleResultRetry = () => {
    window.location.reload();
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
          filter: 'brightness(0.6)'
        }}
      />

      <VfxOverlay type="data" intensity="low" />

      {charImage && subPhase === 'DIALOGUE' && (
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

      {subPhase === 'QUIZ' && (
        <QuizInterface
          question={PHASE1_QUIZ[lang][currentQuestionIndex]}
          onComplete={handleQuizComplete}
        />
      )}

      {subPhase === 'CONTRACT' && (
        <ContractInterface onComplete={handleContractSigned} />
      )}

      {subPhase === 'RESULT' && (
        <PhaseResult
          title={lang === 'EN' ? "INTERVIEW PASSED" : "PHỎNG VẤN THÀNH CÔNG"}
          score={quizScore}
          maxScore={3}
          feedbackText={quizScore === 3
            ? (lang === 'EN' ? "Perfect math skills. Jules is impressed." : "Kỹ năng toán học hoàn hảo. Jules rất ấn tượng.")
            : (lang === 'EN' ? "You got the job, but check your basic math." : "Bạn được nhận, nhưng hãy xem lại toán cơ bản nhé.")}
          tipText={lang === 'EN' ? "Prime Cost = Direct Materials + Direct Labor." : "Chi phí Cơ bản = Nguyên liệu TT + Nhân công TT."}
          onContinue={handleResultContinue}
          onRetry={handleResultRetry}
        />
      )}
    </div>
  );
};

export default Phase1;
