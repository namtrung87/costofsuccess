import React, { useState } from 'react';
import { ASSETS } from '../../constants';
import NeonEffect from '../UI/NeonEffect';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { COSMETICS } from '../../data/cosmetics';

interface CharacterDisplayProps {
  imageSrc: string;
  isSpeaker: boolean;
  alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  className?: string;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  imageSrc,
  isSpeaker,
  alignment = 'RIGHT',
  className = ''
}) => {
  const { state } = useGame();
  const [imgError, setImgError] = useState(false);

  // If the imageSrc is meant to be the player avatar placeholder
  let actualSrc = imageSrc;

  // Check if characterId is in ASSETS, otherwise use as is
  if (ASSETS[imageSrc as keyof typeof ASSETS]) {
    actualSrc = ASSETS[imageSrc as keyof typeof ASSETS];
  }

  if (imageSrc === 'PLAYER_AVATAR') {
    const cosmetic = COSMETICS.find(c => c.id === state.equippedAvatar);
    actualSrc = cosmetic ? (state.assets[cosmetic.value!] || cosmetic.value!) : imageSrc;
  }

  let positionClass = '';
  if (alignment === 'LEFT') positionClass = 'left-0 md:left-20';
  if (alignment === 'CENTER') positionClass = 'left-1/2 transform -translate-x-1/2';
  if (alignment === 'RIGHT') positionClass = 'right-0 md:right-20';

  // Fallback if local asset fails
  const fallbackSrc = `https://api.dicebear.com/7.x/avataaars/svg?seed=${imageSrc.replace(/\W/g, '')}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={imageSrc}
        initial={{
          opacity: 0,
          x: alignment === 'LEFT' ? -150 : alignment === 'RIGHT' ? 150 : 0,
          y: alignment === 'CENTER' ? 150 : 20,
          scale: 0.95,
          filter: 'blur(10px)'
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          // High-Fidelity Breathing & Subtle Float
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 15,
            restDelta: 0.001
          }
        }}
        exit={{
          opacity: 0,
          x: alignment === 'LEFT' ? -80 : alignment === 'RIGHT' ? 80 : 0,
          y: 20,
          scale: 0.95,
          filter: 'blur(5px)',
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
        className={`absolute bottom-0 z-20 ${positionClass} ${className}`}
      >
        <motion.div
          animate={isSpeaker ? {
            y: [0, -8, 0],
            scale: [1, 1.01, 1],
          } : {
            y: [0, -4, 0],
            opacity: 0.7
          }}
          transition={{
            duration: isSpeaker ? 3 : 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <NeonEffect
            color={isSpeaker ? 'cyan' : 'blue'}
            intensity={isSpeaker ? 'medium' : 'low'}
            className="origin-bottom"
          >
            <img
              src={imgError ? fallbackSrc : actualSrc}
              alt="Character"
              onError={() => setImgError(true)}
              className={`
                        h-[50vh] md:h-[65vh] lg:h-[75vh] max-h-[600px] object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.6)]
                        transition-all duration-500 ease-out
                        ${isSpeaker ? 'filter-none scale-100 translate-y-0' : 'brightness-40 grayscale-[0.4] scale-95 translate-y-6'}
                    `}
            />
          </NeonEffect>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CharacterDisplay;