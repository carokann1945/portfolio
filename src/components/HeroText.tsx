'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const phrases = ['신입 프론트엔드 개발자', '끝까지 해내는 집요함', '항상 생각하는', '팀이 같이 코딩해.'];

function maskTransition(from: string, to: string, progress: number) {
  const maxLen = Math.max(from.length, to.length);
  const fromArr = from.padEnd(maxLen, ' ').split('');
  const toArr = to.padEnd(maxLen, ' ').split('');

  return Array.from({ length: maxLen }, (_, i) => {
    const switchPoint = (i + 1) / maxLen;

    if (progress < switchPoint * 0.45) {
      return fromArr[i];
    }

    if (progress < switchPoint * 0.85) {
      return toArr[i] === ' ' ? ' ' : '_';
    }

    return toArr[i];
  }).join('');
}

export default function HeroText() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(phrases[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hold = setTimeout(() => {
      const nextIndex = (index + 1) % phrases.length;
      const from = phrases[index];
      const to = phrases[nextIndex];

      setIsAnimating(true);

      const totalFrames = 12;
      let frame = 0;

      const interval = setInterval(() => {
        frame += 1;
        const progress = frame / totalFrames;

        setDisplay(maskTransition(from, to, progress));

        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplay(to);
          setIndex(nextIndex);
          setIsAnimating(false);
        }
      }, 40); // 40ms * 12 = 480ms
    }, 1600);

    return () => clearTimeout(hold);
  }, [index]);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#f7f7f5',
        fontFamily: 'Inter, Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      }}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.06em',
            marginBottom: 24,
          }}>
          bkit
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 72,
            minWidth: '12ch',
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#111',
          }}>
          <motion.span
            key={display}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            initial={{
              opacity: isAnimating ? 0.92 : 1,
              y: isAnimating ? 4 : 0,
              filter: isAnimating ? 'blur(2px)' : 'blur(0px)',
            }}
            transition={{
              duration: 0.18,
              ease: 'easeOut',
            }}
            style={{
              whiteSpace: 'pre',
            }}>
            {display}
          </motion.span>

          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              display: 'inline-block',
              width: 8,
              height: '0.9em',
              marginLeft: 6,
              background: '#111',
              borderRadius: 2,
              verticalAlign: 'middle',
            }}
          />
        </div>
      </div>
    </section>
  );
}
