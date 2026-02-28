import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import ReconciliationSuite from '../components/Gameplay/ReconciliationSuite';
import PhaseResult from '../components/Gameplay/PhaseResult';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import { PHASE14_DIALOGUE, RECONCILIATION_SCENARIOS } from '../data/phase14';
import { TUTORIALS, ASSETS } from '../constants';

const Phase14: React.FC = () => {
    const { state, dispatch } = useGame();
    const lang = state.language;

    const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'TUTORIAL' | 'GAME' | 'RESULT'>('DIALOGUE');
    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE14_DIALOGUE[lang]['start']);
    const [score, setScore] = useState(0);

    const [bgImage, setBgImage] = useState(state.assets[PHASE14_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_VALUATION_ROOM);

    useEffect(() => {
        if (PHASE14_DIALOGUE[lang][currentNodeId]) {
            setCurrentNode(PHASE14_DIALOGUE[lang][currentNodeId]);
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
            dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_15_BREAK_EVEN });
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
        dispatch({ type: 'UPDATE_BUDGET', payload: 200 });
    };

    const handleGameIncorrect = () => {
        dispatch({ type: 'UPDATE_SANITY', payload: -20 });
    };

    const handleGameComplete = (finalScore: number) => {
        setScore(finalScore);
        setSubPhase('RESULT');
    };

    const handleResultContinue = () => {
        setSubPhase('DIALOGUE');
        if (score >= RECONCILIATION_SCENARIOS.length - 1) { // Allow 1 mistake
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
        <div className="w-full h-full relative">
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    filter: 'brightness(0.5)'
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

            {subPhase === 'TUTORIAL' && (
                <TutorialOverlay
                    title={TUTORIALS.PHASE_14?.title || "TUTORIAL: RECONCILIATION"}
                    steps={TUTORIALS.PHASE_14?.steps || []}
                    onComplete={() => setSubPhase('GAME')}
                />
            )}

            {subPhase === 'GAME' && (
                <ReconciliationSuite
                    scenarios={RECONCILIATION_SCENARIOS}
                    onCorrect={handleGameCorrect}
                    onIncorrect={handleGameIncorrect}
                    onComplete={handleGameComplete}
                    language={lang}
                />
            )}

            {subPhase === 'RESULT' && (
                <PhaseResult
                    title="Reconciliation Complete"
                    score={score}
                    maxScore={RECONCILIATION_SCENARIOS.length}
                    feedbackText={score >= RECONCILIATION_SCENARIOS.length - 1 ? "Profits successfully synchronized." : "Books are out of balance. The auditors are weeping."}
                    tipText="The ONLY difference in profit is the Fixed Production Overhead trapped in or released from Inventory. (Change in units * OAR)."
                    onContinue={handleResultContinue}
                    onRetry={handlePractice}
                    onPractice={handlePractice}
                />
            )}
        </div>
    );
};

export default Phase14;
