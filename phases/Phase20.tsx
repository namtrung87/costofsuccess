import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import EfficiencySynchro from '../components/Gameplay/EfficiencySynchro';
import PhaseResult from '../components/Gameplay/PhaseResult';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import { PHASE20_DIALOGUE, PHASE20_DATA } from '../data/phase20';
import { TUTORIALS, ASSETS } from '../constants';

const Phase20: React.FC = () => {
    const { state, dispatch } = useGame();
    const lang = state.language;

    const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'TUTORIAL' | 'GAME' | 'RESULT'>('DIALOGUE');
    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE20_DIALOGUE[lang]['start']);
    const [score, setScore] = useState(0);

    const [bgImage, setBgImage] = useState(state.assets[PHASE20_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_PUMP_ROOM);

    useEffect(() => {
        if (PHASE20_DIALOGUE[lang][currentNodeId]) {
            setCurrentNode(PHASE20_DIALOGUE[lang][currentNodeId]);
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
            dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_21_FIXED_VOH_VAR });
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
                    filter: 'brightness(0.5) hue-rotate(90deg)'
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
                    title={TUTORIALS.PHASE_20?.title || "TUTORIAL: LABOR & VOH VARIANCES"}
                    steps={TUTORIALS.PHASE_20?.steps || []}
                    onComplete={() => setSubPhase('GAME')}
                />
            )}

            {subPhase === 'GAME' && (
                <EfficiencySynchro
                    scenario={PHASE20_DATA}
                    onCorrect={() => dispatch({ type: 'UPDATE_BUDGET', payload: 400 })}
                    onIncorrect={() => dispatch({ type: 'UPDATE_SANITY', payload: -10 })}
                    onComplete={handleGameComplete}
                    language={lang}
                />
            )}

            {subPhase === 'RESULT' && (
                <PhaseResult
                    title="Efficiency Synchro Report"
                    score={score}
                    maxScore={10}
                    feedbackText={score > 0 ? "Labor and VOH synchronization successful." : "Efficiency drain detected in the system."}
                    tipText="VOH Efficiency Variance is driven by Labor Hours. If people are slow, overheads burn longer."
                    onContinue={handleResultContinue}
                    onRetry={() => setSubPhase('GAME')}
                    onPractice={() => setSubPhase('GAME')}
                />
            )}
        </div>
    );
};

export default Phase20;
