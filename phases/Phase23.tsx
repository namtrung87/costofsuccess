import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import { PHASE23_DIALOGUE } from '../data/phase23';
import { ASSETS } from '../constants';
import VfxOverlay from '../components/UI/VfxOverlay';

const Phase23: React.FC = () => {
    const { state, dispatch } = useGame();
    const lang = state.language;

    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE23_DIALOGUE[lang]['start']);

    const [bgImage, setBgImage] = useState(state.assets[PHASE23_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_ROOFTOP);

    useEffect(() => {
        if (PHASE23_DIALOGUE[lang][currentNodeId]) {
            setCurrentNode(PHASE23_DIALOGUE[lang][currentNodeId]);
        }
    }, [currentNodeId, lang]);

    useEffect(() => {
        const key = currentNode.backgroundImage;
        if (key && state.assets[key]) {
            setBgImage(state.assets[key]);
        }
    }, [currentNode, state.assets]);

    const handleChoice = (nextId: string) => {
        if (nextId === 'VICTORY') {
            dispatch({ type: 'SET_PHASE', payload: GamePhase.VICTORY });
        } else {
            setCurrentNodeId(nextId);
        }
    };

    const handleDialogueComplete = () => {
        if (currentNode.nextId) {
            handleChoice(currentNode.nextId);
        }
    };

    const charImage = currentNode.characterId && state.assets[currentNode.characterId]
        ? state.assets[currentNode.characterId]
        : currentNode.characterImage;

    return (
        <div className="w-full h-full relative overflow-hidden">
            {/* Cinematic flash effect for the ending */}
            <div className="fixed inset-0 bg-white animate-flash opacity-0 pointer-events-none z-50" />

            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-3000 ease-in-out scale-110 animate-subtleZoom"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    filter: 'brightness(0.4) contrast(1.2)'
                }}
            />

            <VfxOverlay effect="rain" intensity={0.6} active={true} />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

            {charImage && (
                <CharacterDisplay
                    imageSrc={charImage}
                    isSpeaker={true}
                    alignment="RIGHT"
                />
            )}

            <DialogueBox
                speaker={currentNode.speaker}
                speakerTitle={currentNode.speakerTitle}
                text={currentNode.text}
                choices={currentNode.choices?.map(c => ({
text: c.text,
onClick: () => handleChoice(c.nextId),
consequences: c.consequences,
requiredBudget: c.requiredBudget
          }))}
                onComplete={handleDialogueComplete}
            />

            {/* Confetti or particles for victory could be added here if needed */}
        </div>
    );
};

export default Phase23;
