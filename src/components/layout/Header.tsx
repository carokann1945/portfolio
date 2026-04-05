'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={cn('fixed inset-x-0 top-0 z-50')}>
      <nav>
        <ul
          className={cn(
            'w-full h-[50px]',
            'flex justify-center items-center gap-5',
            'bg-white',
            '[&>li>a]:hover:text-blue-400 [&>li>a]:font-semibold [&>li>a]:text-gray-600',
            '[&>li>a]:transition-all [&>li>a]:duration-200',
            scrolled && 'shadow-md',
          )}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
