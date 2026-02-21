import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import PerformanceComparer from '../components/Gameplay/PerformanceComparer';
import PhaseResult from '../components/Gameplay/PhaseResult';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import { PHASE32_DIALOGUE, PHASE32_DATA_FINAL } from '../data/phase32';
import { TUTORIALS, ASSETS } from '../constants';

const Phase32: React.FC = () => {
    const { state, dispatch } = useGame();
    const lang = state.language;

    const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'TUTORIAL' | 'GAME' | 'RESULT'>('DIALOGUE');
    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE32_DIALOGUE[lang]['start']);
    const [score, setScore] = useState(0);

    const [bgImage, setBgImage] = useState(state.assets[PHASE32_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_OFFICE);

    useEffect(() => {
        if (PHASE32_DIALOGUE[lang][currentNodeId]) {
            setCurrentNode(PHASE32_DIALOGUE[lang][currentNodeId]);
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
            dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_33_BALANCED_SCORECARD });
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
                    filter: 'brightness(0.6) hue-rotate(90deg)'
                }}
            />

            {subPhase === 'DIALOGUE' && charImage && (
                <CharacterDisplay
                    imageSrc={charImage}
                    isSpeaker={true}
                    alignment="CENTER"
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
                    title={TUTORIALS.PHASE_32?.title || "TUTORIAL: ROI VS RI"}
                    steps={TUTORIALS.PHASE_32?.steps || []}
                    onComplete={() => setSubPhase('GAME')}
                />
            )}

            {subPhase === 'GAME' && (
                <PerformanceComparer
                    scenario={PHASE32_DATA_FINAL}
                    onComplete={handleGameComplete}
                    language={lang}
                />
            )}

            {subPhase === 'RESULT' && (
                <PhaseResult
                    title="Performance Audit Report"
                    score={score}
                    maxScore={10}
                    feedbackText={score > 0 ? "Strategic performance verified. RI correctly identifies absolute value creation." : "Metric confusion. You are favoring relative percentages over absolute wealth."}
                    tipText="Use RI to align division decisions with the Group's cost of capital. Highly profitable divisions might reject good projects if judged solely on ROI."
                    onContinue={handleResultContinue}
                    onRetry={() => setSubPhase('GAME')}
                    onPractice={() => setSubPhase('GAME')}
                />
            )}
        </div>
    );
};

export default Phase32;
