import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import NegotiationSlider from '../components/Gameplay/NegotiationSlider';
import PhaseResult from '../components/Gameplay/PhaseResult';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import { PHASE31_DIALOGUE, PHASE31_DATA_FINAL } from '../data/phase31';
import { TUTORIALS, ASSETS } from '../constants';

const Phase31: React.FC = () => {
    const { state, dispatch } = useGame();
    const lang = state.language;

    const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'TUTORIAL' | 'GAME' | 'RESULT'>('DIALOGUE');
    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE31_DIALOGUE[lang]['start']);
    const [score, setScore] = useState(0);

    const [bgImage, setBgImage] = useState(state.assets[PHASE31_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_OFFICE);

    useEffect(() => {
        if (PHASE31_DIALOGUE[lang][currentNodeId]) {
            setCurrentNode(PHASE31_DIALOGUE[lang][currentNodeId]);
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
            dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_32_ROI_RI });
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
                    filter: 'brightness(0.6) hue-rotate(-45deg) grayscale(0.2)'
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
                    title={TUTORIALS.PHASE_31?.title || "TUTORIAL: TRANSFER PRICING"}
                    steps={TUTORIALS.PHASE_31?.steps || []}
                    onComplete={() => setSubPhase('GAME')}
                />
            )}

            {subPhase === 'GAME' && (
                <NegotiationSlider
                    scenario={PHASE31_DATA_FINAL}
                    onComplete={handleGameComplete}
                    language={lang}
                />
            )}

            {subPhase === 'RESULT' && (
                <PhaseResult
                    title="Negotiation Results"
                    score={score}
                    maxScore={10}
                    feedbackText={score > 0 ? "Internal trade finalized. Divisions are aligned with Group strategy." : "Negotiation breakdown. Managers are acting in silos."}
                    tipText="Transfer Price should be between the Seller's Min and Buyer's Max to achieve Goal Congruence."
                    onContinue={handleResultContinue}
                    onRetry={() => setSubPhase('GAME')}
                    onPractice={() => setSubPhase('GAME')}
                />
            )}
        </div>
    );
};

export default Phase31;
