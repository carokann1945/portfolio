'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <a
      href="#projects"
      aria-label="Projects 섹션으로 이동"
      className={cn(
        'group absolute bottom-8 left-1/2 z-10 -translate-x-1/2',
        'inline-flex flex-col items-center gap-3 text-neutral-700',
      )}>
      <span
        className={cn(
          'text-[10px] font-semibold tracking-[0.35em] text-neutral-500',
          'transition-colors duration-200 group-hover:text-neutral-900',
        )}>
        더 알아보기 ↓
      </span>

      <span
        className={cn(
          'flex h-14 w-8 justify-center rounded-full border border-neutral-400/80 pt-2',
          'transition-colors duration-200 group-hover:border-neutral-900',
        )}>
        <motion.span
          className="block h-2.5 w-1.5 rounded-full bg-neutral-900"
          animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: [0.2, 1, 0.35], y: [0, 16, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </a>
  );
}
