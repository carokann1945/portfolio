'use client';

import type { ReactNode } from 'react';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';

type SectionHeadingButtonProps = {
  sectionId: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function SectionHeadingButton({ sectionId, children, className, ariaLabel }: SectionHeadingButtonProps) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(sectionId)}
      aria-label={ariaLabel ?? `${sectionId} 섹션으로 이동`}
      className={cn('cursor-pointer', className)}>
      {children}
    </button>
  );
}
