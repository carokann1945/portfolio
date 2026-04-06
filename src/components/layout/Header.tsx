'use client';

import { useEffect, useState } from 'react';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';

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
            'flex md:hidden w-full h-[70px]',
            'justify-end items-center px-4',
            'bg-white',
            scrolled && 'shadow-md',
          )}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-2xl text-gray-600 cursor-pointer"
            aria-label="메뉴 열기 닫기">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div
          className={cn(
            'md:hidden grid transition-all duration-200',
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
                    'px-6 py-3 text-left',
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
            'md:flex justify-center items-center gap-5',
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
