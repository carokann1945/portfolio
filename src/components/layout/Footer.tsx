import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className={cn('w-full mt-30')}>
      <div
        className={cn(
          'w-full border-t border-gray-200/80 bg-[#2a2a2a]',
          'flex justify-center items-center',
          'py-10 bp960:py-12',
        )}>
        <p className={cn('text-[0.9rem] bp960:text-[0.95rem] font-medium text-gray-400')}>
          © 2026 윤동주 All rights reserved.
        </p>
      </div>
    </footer>
  );
}
