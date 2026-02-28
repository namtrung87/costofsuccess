
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GamePhase, DialogueNode } from '../types';
import DialogueBox from '../components/VisualNovel/DialogueBox';
import CharacterDisplay from '../components/VisualNovel/CharacterDisplay';
import TraceabilityGame from '../components/Gameplay/TraceabilityGame';
import { PHASE4_DIALOGUE, TRACEABILITY_ITEMS } from '../data/phase4';
import { ASSETS } from '../constants';
import BackgroundParallax from '../components/UI/BackgroundParallax';
import { useAssetPreloader } from '../hooks/useAssetPreloader';

const Phase4: React.FC = () => {
  const { state, dispatch } = useGame();
  const lang = state.language;

  // Asset Keys for Preloader
  const assetKeys = [
    'BG_OPS_CENTER',
    'CHAR_JULES',
    'CHAR_ROB_NEUTRAL',
    'CHAR_ROB_ANGRY'
  ];

  const isAssetsLoading = useAssetPreloader(assetKeys);

  const [subPhase, setSubPhase] = useState<'DIALOGUE' | 'GAME' | 'SUMMARY'>('DIALOGUE');
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [currentNode, setCurrentNode] = useState<DialogueNode>(PHASE4_DIALOGUE[lang]['start']);

  const [bgImage, setBgImage] = useState(state.assets[PHASE4_DIALOGUE[lang]['start'].backgroundImage!] || ASSETS.BG_OPS_CENTER);

  useEffect(() => {
    if (PHASE4_DIALOGUE[lang][currentNodeId]) {
      setCurrentNode(PHASE4_DIALOGUE[lang][currentNodeId]);
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
      setSubPhase('GAME');
    } else if (nextId === 'END_PHASE') {
      dispatch({ type: 'ADD_INVENTORY', payload: 'RANK_COST_ANALYST_LV1' });
      dispatch({ type: 'SET_PHASE', payload: GamePhase.PHASE_5_ALLOCATION });
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
    dispatch({ type: 'UPDATE_BUDGET', payload: 25 });
  };

  const handleGameIncorrect = () => {
    dispatch({ type: 'UPDATE_SANITY', payload: -3 });
  };

  const handleGameComplete = (score: number) => {
    setSubPhase('SUMMARY');
  };

  const handleSummaryContinue = () => {
    setSubPhase('DIALOGUE');
    setCurrentNodeId('post_game');
  };

  const charImage = currentNode.characterId && state.assets[currentNode.characterId]
    ? state.assets[currentNode.characterId]
    : currentNode.characterImage;

  return (
    <div className={`w-full h-full relative transition-opacity duration-1000 ${isAssetsLoading ? 'opacity-0' : 'opacity-1'}`}>
      <BackgroundParallax
        image={bgImage}
        intensity={0.03}
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

      {subPhase === 'GAME' && (
        <TraceabilityGame
          items={TRACEABILITY_ITEMS[lang]}
          onCorrect={handleGameCorrect}
          onIncorrect={handleGameIncorrect}
          onComplete={handleGameComplete}
        />
      )}

      {subPhase === 'SUMMARY' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <div className="w-full max-w-4xl p-8 border border-neonCyan/30 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonGreen via-neonCyan to-neonPink" />

            <h2 className="text-3xl font-heading text-white mb-8 text-center uppercase tracking-widest">
              Cost Structure Verified
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Direct Costs */}
              <div className="border border-neonGreen/30 bg-neonGreen/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-neonGreen mb-4 flex items-center gap-2">
                  <span>🎯</span> DIRECT COSTS
                </h3>
                <p className="text-gray-400 text-sm mb-4">Traceable to the specific Unit.</p>
                <ul className="space-y-2 font-mono text-sm text-gray-300">
                  <li>+ Direct Material (Fabric)</li>
                  <li>+ Direct Labor (Sewing)</li>
                  <li>+ Direct Expense (Royalties)</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-neonGreen/30 text-right font-bold text-white">
                  = PRIME COST
                </div>
              </div>

              {/* Indirect Costs */}
              <div className="border border-neonCyan/30 bg-neonCyan/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-neonCyan mb-4 flex items-center gap-2">
                  <span>☁️</span> INDIRECT COSTS
                </h3>
                <p className="text-gray-400 text-sm mb-4">Shared across the Factory.</p>
                <ul className="space-y-2 font-mono text-sm text-gray-300">
                  <li>+ Indirect Material (Consumables)</li>
                  <li>+ Indirect Labor (Supervisors)</li>
                  <li>+ Indirect Expense (Rent/Power)</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-neonCyan/30 text-right font-bold text-white">
                  = PRODUCTION OVERHEADS
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSummaryContinue}
                className="px-8 py-3 bg-white text-black font-heading font-bold uppercase hover:bg-neonCyan transition-colors"
              >
                Analyze Overheads
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase4;
