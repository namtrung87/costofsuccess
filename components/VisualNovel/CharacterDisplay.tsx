import React, { useState } from 'react';
import NeonEffect from '../UI/NeonEffect';

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
  const [imgError, setImgError] = useState(false);

  let positionClass = '';
  if (alignment === 'LEFT') positionClass = 'left-0 md:left-20';
  if (alignment === 'CENTER') positionClass = 'left-1/2 transform -translate-x-1/2';
  if (alignment === 'RIGHT') positionClass = 'right-0 md:right-20';

  // Fallback if local asset fails
  const fallbackSrc = `https://api.dicebear.com/7.x/avataaars/svg?seed=${imageSrc.replace(/\W/g, '')}`;

  return (
    <div className={`absolute bottom-0 z-20 transition-all duration-500 ease-out ${positionClass} ${className}`}>
      <NeonEffect
        color={isSpeaker ? 'cyan' : 'blue'}
        intensity={isSpeaker ? 'medium' : 'low'}
        className="animate-[breathe_4s_ease-in-out_infinite] origin-bottom"
      >
        <img
          src={imgError ? fallbackSrc : imageSrc}
          alt="Character"
          onError={() => setImgError(true)}
          className={`
                    h-[60vh] md:h-[80vh] object-contain
                    transition-all duration-300
                    ${isSpeaker ? 'filter-none scale-100' : 'brightness-50 grayscale-[0.3] scale-95'}
                `}
        />
      </NeonEffect>
    </div>
  );
};

export default CharacterDisplay;