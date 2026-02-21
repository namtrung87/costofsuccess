import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import PlanningOperationalAnalyzer from '../components/Gameplay/PlanningOperationalAnalyzer';
import PhaseResult from '../components/Gameplay/PhaseResult';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import { PHASE25_DIALOGUE, PHASE25_DATA } from '../data/phase25';
import { TUTORIALS, ASSETS } from '../constants';

const Phase25: React.FC = () => {
    const { state, dispatch } = useGame();
    const lang = state.language;

    const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'TUTORIAL' | 'GAME' | 'RESULT'>('DIALOGUE');
    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE25_DIALOGUE[lang]['start']);
    const [score, setScore] = useState(0);

    const [bgImage, setBgImage] = useState(state.assets[PHASE25_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_OFFICE);

    useEffect(() => {
        if (PHASE25_DIALOGUE[lang][currentNodeId]) {
            setCurrentNode(PHASE25_DIALOGUE[lang][currentNodeId]);
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
            dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_22_OP_STATEMENT });
        } else {
            setCurrentNodeId(nextId);
        }
    };

    const handleDialogueComplete = () => {
        if (currentNode.nextId) {
            handleChoice(currentNode.nextId);
        }
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

    const charImage = currentNode.characterId && state.assets[currentNode.characterId]
        ? state.assets[currentNode.characterId]
        : currentNode.characterImage;

    return (
        <div className="w-full h-full relative">
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    filter: 'brightness(0.5) hue-rotate(-45deg) grayscale(0.2)'
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
                    title={TUTORIALS.PHASE_25?.title || "TUTORIAL: PLANNING & OPERATIONAL"}
                    steps={TUTORIALS.PHASE_25?.steps || []}
                    onComplete={() => setSubPhase('GAME')}
                />
            )}

            {subPhase === 'GAME' && (
                <PlanningOperationalAnalyzer
                    scenario={PHASE25_DATA}
                    onCorrect={() => dispatch({ type: 'UPDATE_BUDGET', payload: 600 })}
                    onIncorrect={() => dispatch({ type: 'UPDATE_SANITY', payload: -10 })}
                    onComplete={handleGameComplete}
                    language={lang}
                />
            )}

            {subPhase === 'RESULT' && (
                <PhaseResult
                    title="Accountability Report"
                    score={score}
                    maxScore={10}
                    feedbackText={score > 0 ? "Blame correctly allocated. Planning errors isolated." : "Analysis flawed. Rob is about to get fired for no reason!"}
                    tipText="Planning variance = (Revised Std - Orig Std). Operational variance = (Actual - Revised Std)."
                    onContinue={handleResultContinue}
                    onRetry={() => setSubPhase('GAME')}
                    onPractice={() => setSubPhase('GAME')}
                />
            )}
        </div>
    );
};

export default Phase25;
