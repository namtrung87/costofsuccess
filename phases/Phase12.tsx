import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import BehaviorSortingGame from '../components/Gameplay/BehaviorSortingGame';
import PhaseResult from '../components/Gameplay/PhaseResult';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import { PHASE12_DIALOGUE, BEHAVIOR_ITEMS } from '../data/phase12';
import { TUTORIALS, ASSETS } from '../constants';

const Phase12: React.FC = () => {
    const { state, dispatch } = useGame();
    const lang = state.language;

    const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'TUTORIAL' | 'GAME' | 'RESULT'>('DIALOGUE');
    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE12_DIALOGUE[lang]['start']);
    const [score, setScore] = useState(0);

    const [bgImage, setBgImage] = useState(state.assets[PHASE12_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_TECH_ROOM);

    useEffect(() => {
        if (PHASE12_DIALOGUE[lang][currentNodeId]) {
            setCurrentNode(PHASE12_DIALOGUE[lang][currentNodeId]);
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
            dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_13_CONTRIBUTION });
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
        dispatch({ type: 'UPDATE_BUDGET', payload: 100 });
    };

    const handleGameIncorrect = () => {
        dispatch({ type: 'UPDATE_SANITY', payload: -10 });
    };

    const handleGameComplete = (finalScore: number) => {
        setScore(finalScore);
        setSubPhase('RESULT');
    };

    const handleResultContinue = () => {
        setSubPhase('DIALOGUE');
        if (score >= 5) {
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
                        onClick: () => handleChoice(c.nextId, c.action)
                    }))}
                    onComplete={handleDialogueComplete}
                />
            )}

            {subPhase === 'TUTORIAL' && (
                <TutorialOverlay
                    title={TUTORIALS.PHASE_12.title}
                    steps={TUTORIALS.PHASE_12.steps}
                    onComplete={() => setSubPhase('GAME')}
                />
            )}

            {subPhase === 'GAME' && (
                <BehaviorSortingGame
                    items={BEHAVIOR_ITEMS[lang]}
                    onCorrect={handleGameCorrect}
                    onIncorrect={handleGameIncorrect}
                    onComplete={handleGameComplete}
                />
            )}

            {subPhase === 'RESULT' && (
                <PhaseResult
                    title="Behavior Split Complete"
                    score={score}
                    maxScore={BEHAVIOR_ITEMS[lang].length}
                    feedbackText={score >= 5 ? "Variable and Fixed costs successfully isolated." : "Critical errors in cost behavior assumptions."}
                    tipText="Variable Costs fluctuate with exactly one unit of output. Fixed Costs exist independently of output within a period."
                    onContinue={handleResultContinue}
                    onRetry={handlePractice}
                    onPractice={handlePractice}
                />
            )}
        </div>
    );
};

export default Phase12;
