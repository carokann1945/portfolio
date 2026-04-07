'use client';

import { useEffect, useState } from 'react';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';
import SectionHeadingButton from '../ui/SectionHeadingButton';

const navItems = [
  { id: 'home', label: 'Home', hover: 'hover:text-blue-400' },
  { id: 'projects', label: 'Projects', hover: 'hover:text-blue-400' },
  { id: 'about', label: 'About', hover: 'hover:text-blue-400' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
      setMenuOpen(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMove = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50')}>
      <nav>
        <div
          className={cn(
            'flex bp960:hidden w-full h-[70px]',
            'justify-between items-center px-4',
            'bg-white',
            scrolled && 'shadow-md',
          )}>
          <h1 className={cn('font-bold text-[1.5rem]', 'hover:text-blue-400')}>
            <SectionHeadingButton sectionId="home">YDJ Portfolio</SectionHeadingButton>
          </h1>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-[40px] h-[40px] rounded-md text-2xl text-gray-600 cursor-pointer border border-gray-300"
            aria-label="메뉴 열기 닫기">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div
          className={cn(
            'bp960:hidden grid transition-all duration-200',
            menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            menuOpen && 'shadow-md',
          )}>
          <div className="overflow-hidden">
            <div className="flex flex-col bg-white shadow-md">
              {navItems.map(({ id, label, hover }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleMove(id)}
                  className={cn(
                    'px-6 py-2 text-left',
                    'font-semibold text-gray-600',
                    'transition-all duration-200 cursor-pointer',
                    hover,
                  )}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ul
          className={cn(
            'hidden w-full h-[70px]',
            'bp960:flex justify-center items-center gap-5',
            'bg-white',
            '[&>li>button]:font-semibold [&>li>button]:text-gray-800',
            '[&>li>button]:transition-all [&>li>button]:duration-200',
            scrolled && 'shadow-md',
          )}>
          {navItems.map(({ id, label, hover }) => (
            <li key={id}>
              <button type="button" onClick={() => handleMove(id)} className={cn('cursor-pointer', hover)}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
