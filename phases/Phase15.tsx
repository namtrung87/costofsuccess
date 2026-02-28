import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import BreakEvenGraph from '../components/Gameplay/BreakEvenGraph';
import PhaseResult from '../components/Gameplay/PhaseResult';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import { PHASE15_DIALOGUE, PHASE15_DATA } from '../data/phase15';
import { TUTORIALS, ASSETS } from '../constants';

const Phase15: React.FC = () => {
    const { state, dispatch } = useGame();
    const lang = state.language;

    const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'TUTORIAL' | 'GAME' | 'RESULT'>('DIALOGUE');
    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE15_DIALOGUE[lang]['start']);
    const [score, setScore] = useState(0);

    const [bgImage, setBgImage] = useState(state.assets[PHASE15_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_TECH_ROOM);

    useEffect(() => {
        if (PHASE15_DIALOGUE[lang][currentNodeId]) {
            setCurrentNode(PHASE15_DIALOGUE[lang][currentNodeId]);
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
            dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_16_MARGIN_OF_SAFETY });
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
        dispatch({ type: 'UPDATE_BUDGET', payload: 300 }); // High reward for mastering CVP
    };

    const handleGameIncorrect = () => {
        dispatch({ type: 'UPDATE_SANITY', payload: -25 }); // High penalty
    };

    const handleGameComplete = (finalScore: number) => {
        setScore(finalScore);
        setSubPhase('RESULT');
    };

    const handleResultContinue = () => {
        setSubPhase('DIALOGUE');
        if (score > 0) {
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
                    title={TUTORIALS.PHASE_15?.title || "TUTORIAL: CVP ANALYSIS"}
                    steps={TUTORIALS.PHASE_15?.steps || []}
                    onComplete={() => setSubPhase('GAME')}
                />
            )}

            {subPhase === 'GAME' && (
                <BreakEvenGraph
                    scenario={PHASE15_DATA}
                    onCorrect={handleGameCorrect}
                    onIncorrect={handleGameIncorrect}
                    onComplete={handleGameComplete}
                    language={lang}
                />
            )}

            {subPhase === 'RESULT' && (
                <PhaseResult
                    title="Break-Even Canvas Complete"
                    score={score}
                    maxScore={10}
                    feedbackText={score > 0 ? "Target intersection located." : "Critical miscalculation on risk threshold."}
                    tipText="Break-Even Point (Units) = Fixed Costs ÷ Contribution Margin per unit. At this exact volume, Total Revenue equals Total Cost."
                    onContinue={handleResultContinue}
                    onRetry={handlePractice}
                    onPractice={handlePractice}
                />
            )}
        </div>
    );
};

export default Phase15;
