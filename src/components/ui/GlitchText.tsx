'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

//wrapperClassName tailwind css 유틸리티 클래스 필수 : 'text-[56px] font-bold text-black'
//전체적인 타이포그래피 설정

//cursorClassName tailwind css 유틸리티 클래스 필수 : 'w-2 ml-2'
//커서 UI 설정

const GLITCH_CHARS = ['_', '?', '<', '>', '{', '}'];

interface CharState {
  char: string;
  glitch: boolean;
}

interface GlitchTextProps {
  phrases: string[];
  holdDuration?: number;
  frameDuration?: number;
  totalFrames?: number;
  wrapperClassName: string;
  cursorClassName: string;
}

function maskTransition(from: string, to: string, progress: number, switchPoints: number[]): CharState[] {
  const maxLen = Math.max(from.length, to.length);
  const fromArr = from.padEnd(maxLen, ' ').split('');
  const toArr = to.padEnd(maxLen, ' ').split('');

  return Array.from({ length: maxLen }, (_, i) => {
    const switchPoint = switchPoints[i];

    if (progress < switchPoint * 0.45) {
      return { char: fromArr[i], glitch: false };
    }
    if (progress < switchPoint * 0.85) {
      if (toArr[i] === ' ') return { char: ' ', glitch: false };
      const glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      return { char: glitchChar, glitch: true };
    }
    return { char: toArr[i], glitch: false };
  });
}

export default function GlitchText({
  phrases,
  holdDuration = 1600,
  frameDuration = 25,
  totalFrames = 15,
  wrapperClassName,
  cursorClassName,
}: GlitchTextProps) {
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState<CharState[]>(phrases[0].split('').map((char) => ({ char, glitch: false })));

  const switchPointsRef = useRef<number[]>([]);

  useEffect(() => {
    const hold = setTimeout(() => {
      const nextIndex = (index + 1) % phrases.length;
      const from = phrases[index];
      const to = phrases[nextIndex];
      const maxLen = Math.max(from.length, to.length);

      switchPointsRef.current = Array.from({ length: maxLen }, () => Math.random());

      let frame = 0;
      const interval = setInterval(() => {
        frame += 1;
        setChars(maskTransition(from, to, frame / totalFrames, switchPointsRef.current));

        if (frame >= totalFrames) {
          clearInterval(interval);
          setChars(to.split('').map((char) => ({ char, glitch: false })));
          setIndex(nextIndex);
        }
      }, frameDuration);

      return () => clearInterval(interval);
    }, holdDuration);

    return () => clearTimeout(hold);
  }, [index, phrases, holdDuration, frameDuration, totalFrames]);

  return (
    // wrapper
    <div className={cn('inline-flex justify-center items-center', 'tracking-tighter whitespace-pre', wrapperClassName)}>
      {/* 실제 글자 */}
      {chars.map((c, i) => (
        <span key={i} className={cn(c.glitch ? 'opacity-30' : 'opacity-100')}>
          {c.char}
        </span>
      ))}

      {/* 커서 깜빡이 부분 */}
      <motion.span
        className={cn('inline-block h-[0.9em] rounded-[2px] align-middle bg-current', cursorClassName)}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
