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
          x: alignment === 'LEFT' ? -100 : alignment === 'RIGHT' ? 100 : 0,
          y: alignment === 'CENTER' ? 100 : 0
        }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{
          opacity: 0,
          x: alignment === 'LEFT' ? -50 : alignment === 'RIGHT' ? 50 : 0,
          transition: { duration: 0.2 }
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`absolute bottom-0 z-20 ${positionClass} ${className}`}
      >
        <NeonEffect
          color={isSpeaker ? 'cyan' : 'blue'}
          intensity={isSpeaker ? 'medium' : 'low'}
          className={`origin-bottom transition-all duration-700 ${isSpeaker ? 'animate-breathe animate-talking' : 'animate-breathe opacity-70'}`}
        >
          <img
            src={imgError ? fallbackSrc : actualSrc}
            alt="Character"
            onError={() => setImgError(true)}
            className={`
                      h-[60vh] md:h-[80vh] object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]
                      transition-all duration-300
                      ${isSpeaker ? 'filter-none scale-100 translate-y-0' : 'brightness-50 grayscale-[0.3] scale-95 translate-y-4'}
                  `}
          />
        </NeonEffect>
      </motion.div>
    </AnimatePresence>
  );
};

export default CharacterDisplay;