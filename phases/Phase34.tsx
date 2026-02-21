import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import ControllableAudit from '../components/Gameplay/ControllableAudit';
import PhaseResult from '../components/Gameplay/PhaseResult';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import { PHASE34_DIALOGUE, PHASE34_DATA } from '../data/phase34';
import { TUTORIALS, ASSETS } from '../constants';

const Phase34: React.FC = () => {
    const { state, dispatch } = useGame();
    const lang = state.language;

    const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'TUTORIAL' | 'GAME' | 'RESULT'>('DIALOGUE');
    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE34_DIALOGUE[lang]['start']);
    const [score, setScore] = useState(0);

    const [bgImage, setBgImage] = useState(state.assets[PHASE34_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_OFFICE);

    useEffect(() => {
        if (PHASE34_DIALOGUE[lang][currentNodeId]) {
            setCurrentNode(PHASE34_DIALOGUE[lang][currentNodeId]);
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
            dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_35_GROUP_BOSS });
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
                    filter: 'brightness(0.6)'
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
                    title={TUTORIALS.PHASE_34?.title || "TUTORIAL: DIVISIONAL PERFORMANCE"}
                    steps={TUTORIALS.PHASE_34?.steps || []}
                    onComplete={() => setSubPhase('GAME')}
                />
            )}

            {subPhase === 'GAME' && (
                <ControllableAudit
                    scenario={PHASE34_DATA}
                    onComplete={handleGameComplete}
                    language={lang}
                />
            )}

            {subPhase === 'RESULT' && (
                <PhaseResult
                    title="Divisional Performance Audit"
                    score={score}
                    maxScore={10}
                    feedbackText={score > 0 ? "Accountability verified. The manager's bonuses have been accurately calculated based on controllable factors." : "Unfair trial. You are penalizing a manager for costs they have no power to influence."}
                    tipText="Managers should only be judged on costs they can control. Head office rent and CEO expenses are group-level decisions."
                    onContinue={handleResultContinue}
                    onRetry={() => setSubPhase('GAME')}
                    onPractice={() => setSubPhase('GAME')}
                />
            )}
        </div>
    );
};

export default Phase34;
