
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { HANDBOOK_DATA } from '../../constants';

interface DialogueBoxProps {
  speaker: string;
  speakerTitle?: string;
  text: string;
  onComplete?: () => void;
  choices?: { text: string; onClick: () => void }[];
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ speaker, speakerTitle, text, choices, onComplete }) => {
  const { state, dispatch } = useGame();
  const { playSFX } = useAudio();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [renderedContent, setRenderedContent] = useState<ReactNode | string>('');
  
  const typeIntervalRef = useRef<any>(null);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    
    // Clear any existing interval to be safe
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);

    // If speed is 0, instant render
    if (state.textSpeed === 0) {
        setDisplayedText(text);
        setIsTyping(false);
        return;
    }

    typeIntervalRef.current = setInterval(() => {
      if (index < text.length) {
        const nextChar = text.charAt(index);
        setDisplayedText((prev) => prev + nextChar);
        
        // Play typing sound sparingly to avoid fatigue
        // Logic: Play sound every 3 chars if normal, every 5 if fast
        const mod = state.textSpeed < 30 ? 5 : 3;
        if (index % mod === 0) {
            playSFX('TYPE');
        }
        
        index++;
      } else {
        clearInterval(typeIntervalRef.current);
        setIsTyping(false);
      }
    }, state.textSpeed);

    return () => {
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    };
  }, [text, state.textSpeed]); 

  // Effect to play sound when choices appear
  useEffect(() => {
      if (!isTyping && choices && choices.length > 0) {
          playSFX('HOVER'); // Subtle cue that options are ready
      }
  }, [isTyping, choices]);

  // Process Tooltips only after typing is done (or if skipped)
  useEffect(() => {
    if (!isTyping) {
        setRenderedContent(parseTextWithTooltips(text, state.language));
    } else {
        setRenderedContent(displayedText);
    }
  }, [isTyping, displayedText, text, state.language]);

  const handleClick = () => {
    if (isTyping) {
        // Instant Finish
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
        setDisplayedText(text);
        setIsTyping(false);
    } else {
        playSFX('CLICK');
        // Advance if no choices are present
        if ((!choices || choices.length === 0) && onComplete) {
            onComplete();
        }
    }
  };

  const cycleSpeed = (e: React.MouseEvent) => {
      e.stopPropagation();
      let nextSpeed = 30;
      if (state.textSpeed === 30) nextSpeed = 0; // Normal -> Instant
      else if (state.textSpeed === 0) nextSpeed = 60; // Instant -> Slow
      else nextSpeed = 30; // Slow -> Normal
      
      dispatch({ type: 'SET_TEXT_SPEED', payload: nextSpeed });
  };

  let speedLabel = 'SPEED: 1x';
  if (state.textSpeed === 0) speedLabel = 'SPEED: MAX';
  if (state.textSpeed === 60) speedLabel = 'SPEED: 0.5x';

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-20 md:right-20 lg:left-40 lg:right-40 z-50">
      
      {/* Name Tag & Speed Control */}
      <div className="flex justify-between items-end transform -translate-y-2 animate-in slide-in-from-bottom-2 duration-300">
         <div className="bg-obsidian border border-neonCyan px-4 py-1 shadow-neon-cyan clip-path-slant-right">
             <span className="font-heading font-bold text-neonCyan uppercase text-sm">
                 {speaker} {speakerTitle && <span className="text-white/60 text-xs">| {speakerTitle}</span>}
             </span>
         </div>
         <button 
            onClick={cycleSpeed}
            className="bg-black/50 border border-gray-600 px-2 py-1 text-[10px] text-gray-400 font-mono hover:text-white hover:border-white transition-colors"
         >
             {speedLabel}
         </button>
      </div>

      {/* Main Glass Panel */}
      <div 
        className="bg-black/80 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-tr-xl rounded-bl-xl shadow-2xl relative cursor-pointer hover:border-white/40 transition-colors"
        onClick={handleClick}
      >
        {/* Text Content */}
        <div className="font-body text-lg leading-relaxed text-white min-h-[4rem]">
          {renderedContent}
          {isTyping && <span className="animate-pulse inline-block w-2 h-4 bg-neonCyan ml-1 align-middle"/>}
        </div>

        {/* Continue Indicator */}
        {!isTyping && (!choices || choices.length === 0) && (
            <div className="absolute bottom-4 right-4 animate-bounce text-neonCyan text-xs uppercase tracking-widest font-heading">
                Click to Continue ▼
            </div>
        )}
      </div>

      {/* Choices Overlay */}
      {!isTyping && choices && choices.length > 0 && (
        <div className="absolute bottom-full mb-4 w-full flex flex-col gap-3 items-center">
            {choices.map((choice, idx) => (
                <button
                    key={idx}
                    onClick={(e) => {
                        e.stopPropagation();
                        playSFX('CLICK');
                        choice.onClick();
                    }}
                    style={{ animationDelay: `${idx * 100}ms` }}
                    className="
                        bg-black/90 border border-neonCyan text-white font-heading font-bold py-3 px-8 
                        rounded hover:bg-neonCyan hover:text-black hover:shadow-neon-cyan
                        transition-all duration-200 transform hover:scale-105
                        w-full md:w-auto md:min-w-[400px] text-center
                        animate-in slide-in-from-bottom-4 fade-in fill-mode-both
                    "
                >
                    {choice.text}
                </button>
            ))}
        </div>
      )}
    </div>
  );
};

// Helper function to replace keywords with tooltip elements
// Improved regex to avoid partial matches inside HTML tags if complex
const parseTextWithTooltips = (text: string, lang: 'EN' | 'VI'): ReactNode => {
    const definitions = HANDBOOK_DATA[lang];
    let parts: (string | ReactNode)[] = [text];

    // Filter to finding only the most relevant terms first (Longer terms first to avoid partial replacements)
    // e.g. "Direct Material" before "Material"
    const sortedDefs = [...definitions].sort((a, b) => b.title.length - a.title.length);

    // Limit to 3 replacements per text block to avoid visual clutter
    let replacements = 0;

    sortedDefs.forEach(def => {
        if (replacements > 3) return;

        // Clean keyword for regex
        const keyword = def.title.split('(')[0].trim();
        if (keyword.length < 4) return; // Skip very short words to avoid false positives

        const regex = new RegExp(`(${keyword})`, 'i'); // Case insensitive, first match only to avoid spam
        
        let foundInThisPass = false;
        const newParts: (string | ReactNode)[] = [];
        
        parts.forEach(part => {
            if (typeof part === 'string' && !foundInThisPass) {
                const match = part.match(regex);
                if (match) {
                    const split = part.split(regex);
                    // Reconstruct with tooltip
                    if (split.length >= 2) {
                        newParts.push(split[0]);
                        newParts.push(
                            <span key={`${def.id}`} className="tooltip-trigger group relative inline-block text-neonCyan font-bold cursor-help border-b border-dashed border-neonCyan/50">
                                {match[0]}
                                {/* Gen Z style popup */}
                                <span className="
                                    pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 
                                    bg-black border-2 border-neonCyan p-3 rounded z-50 opacity-0 
                                    group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200
                                    shadow-[4px_4px_0px_#00F0FF]
                                ">
                                    <strong className="block text-neonCyan mb-1 text-xs uppercase tracking-widest">{def.title}</strong>
                                    <span className="block text-white text-xs font-mono leading-tight">{def.definition}</span>
                                </span>
                            </span>
                        );
                        newParts.push(split.slice(2).join(match[0])); // Join rest
                        foundInThisPass = true;
                        replacements++;
                    } else {
                        newParts.push(part);
                    }
                } else {
                    newParts.push(part);
                }
            } else {
                newParts.push(part);
            }
        });
        parts = newParts;
    });

    return <>{parts}</>;
};

export default DialogueBox;
