'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

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
  fontSize?: number | string;
  fontWeight?: number | string;
  color?: string;
  cursorWidth?: number;
  cursorMargin?: number;
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
  frameDuration = 30,
  totalFrames = 10,
  fontSize = 56,
  fontWeight = 800,
  color = '#111',
  cursorWidth = 6,
  cursorMargin = 6,
}: GlitchTextProps) {
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState<CharState[]>(phrases[0].split('').map((char) => ({ char, glitch: false })));

  // switchPoints를 전환 시작 시점에 한 번만 생성해서 ref로 고정
  const switchPointsRef = useRef<number[]>([]);

  useEffect(() => {
    const hold = setTimeout(() => {
      const nextIndex = (index + 1) % phrases.length;
      const from = phrases[index];
      const to = phrases[nextIndex];
      const maxLen = Math.max(from.length, to.length);

      // 전환 시작할 때 각 글자별 랜덤 순서 딱 한 번 생성
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
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight,
        letterSpacing: '-0.04em',
        color,
        whiteSpace: 'pre',
      }}>
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            opacity: c.glitch ? 0.1 : 1,
            color: c.glitch ? color : color,
            transition: 'opacity 0.05s',
          }}>
          {c.char}
        </span>
      ))}

      {/* 커서 깜빡이 부분 */}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          display: 'inline-block',
          width: cursorWidth,
          height: '0.9em',
          marginLeft: cursorMargin,
          background: color,
          borderRadius: 2,
          verticalAlign: 'middle',
        }}
      />
    </div>
  );
}
