import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // Stagger delay in ms
  duration?: number; // Animation duration in seconds
  ease?: string; // GSAP-style ease string (e.g. "power3.out")
  splitType?: 'chars' | 'words';
  from?: { opacity?: number; y?: number | string; x?: number | string };
  to?: { opacity?: number; y?: number | string; x?: number | string };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'center' | 'left' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

// Ease mapping helper from GSAP ease string to Framer Motion cubic beziers or standard ease names
const getEaseValue = (easeStr: string) => {
  const norm = easeStr ? easeStr.toLowerCase().trim() : '';
  switch (norm) {
    case 'power1.out':
      return [0.25, 0.46, 0.45, 0.94];
    case 'power1.in':
      return [0.55, 0.085, 0.68, 0.53];
    case 'power1.inout':
      return [0.455, 0.03, 0.515, 0.955];
    case 'power2.out':
      return [0.165, 0.84, 0.44, 1];
    case 'power2.in':
      return [0.6, 0.04, 0.98, 0.335];
    case 'power2.inout':
      return [0.77, 0, 0.175, 1];
    case 'power3.out':
      return [0.215, 0.61, 0.355, 1];
    case 'power3.in':
      return [0.755, 0.05, 0.855, 0.06];
    case 'power3.inout':
      return [0.645, 0.045, 0.355, 1];
    case 'power4.out':
      return [0.165, 0.84, 0.44, 1];
    case 'power4.in':
      return [0.895, 0.03, 0.685, 0.22];
    case 'power4.inout':
      return [0.77, 0, 0.175, 1];
    case 'back.out':
      return [0.175, 0.885, 0.32, 1.275];
    case 'back.in':
      return [0.6, -0.28, 0.735, 0.045];
    case 'back.inout':
      return [0.68, -0.55, 0.265, 1.55];
    case 'circ.out':
      return [0.075, 0.82, 0.165, 1];
    case 'circ.in':
      return [0.6, 0.04, 0.98, 0.335];
    case 'circ.inout':
      return [0.785, 0.135, 0.15, 0.86];
    case 'expo.out':
      return [0.19, 1, 0.22, 1];
    case 'expo.in':
      return [0.95, 0.05, 0.795, 0.035];
    case 'expo.inout':
      return [1, 0, 0, 1];
    default:
      return easeStr || 'easeOut';
  }
};

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: threshold,
    margin: rootMargin as any,
  });

  const durationSec = duration;
  const delaySec = delay / 1000;
  const easeValue = getEaseValue(ease);

  // Split into words
  const words = text.split(' ');

  // Calculate total count and prepare rendering structures
  let globalCharIndex = 0;
  const totalLetters = splitType === 'chars' 
    ? text.replace(/\s/g, '').length 
    : words.length;

  // Track completion
  const animatedCountRef = useRef(0);

  const handleCharAnimationComplete = () => {
    animatedCountRef.current += 1;
    if (animatedCountRef.current === totalLetters) {
      if (showCallback) {
        console.log('All letters have animated!');
      }
      if (onLetterAnimationComplete) {
        onLetterAnimationComplete();
      }
    }
  };

  const textAlignmentClass = 
    textAlign === 'left' ? 'text-left justify-start' :
    textAlign === 'right' ? 'text-right justify-end' :
    textAlign === 'justify' ? 'text-justify justify-between' : 'text-center justify-center';

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-wrap ${textAlignmentClass} overflow-hidden ${className}`}
      style={{ display: 'inline-flex' }}
    >
      {words.map((word, wordIdx) => {
        if (splitType === 'words') {
          const currentIdx = wordIdx;
          return (
            <span key={wordIdx} className="inline-block whitespace-nowrap rudy-word-wrapper mr-[0.25em]">
              <motion.span
                initial={from}
                animate={isInView ? to : from}
                onAnimationComplete={handleCharAnimationComplete}
                transition={{
                  duration: durationSec,
                  delay: currentIdx * delaySec,
                  ease: easeValue as any,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          );
        }

        // Chars splitting
        const chars = Array.from(word);
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap rudy-word-wrapper mr-[0.25em] select-none">
            {chars.map((char, charIdx) => {
              const currentIdx = globalCharIndex;
              globalCharIndex += 1; // Increment running count for next loop index

              return (
                <motion.span
                  key={charIdx}
                  initial={from}
                  animate={isInView ? to : {}}
                  onAnimationComplete={handleCharAnimationComplete}
                  transition={{
                    duration: durationSec,
                    delay: currentIdx * delaySec,
                    ease: easeValue as any,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}
