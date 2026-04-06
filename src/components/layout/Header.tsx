'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50')}>
      <nav>
        {/* Mobile top bar */}
        <div
          className={cn(
            'flex md:hidden w-full h-[50px]',
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

        {/* Mobile dropdown */}
        <div
          className={cn(
            'md:hidden grid transition-all duration-200',
            menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            menuOpen && 'shadow-md',
          )}>
          <div className="overflow-hidden">
            <div className="flex flex-col bg-white shadow-md">
              {[
                { href: '#home', label: 'Home', hover: 'hover:text-blue-400' },
                { href: '#projects', label: 'Projects', hover: 'hover:text-green-500' },
                { href: '#about', label: 'About', hover: 'hover:text-yellow-500' },
              ].map(({ href, label, hover }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={cn('px-6 py-3', 'font-semibold text-gray-600', 'transition-all duration-200', hover)}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <ul
          className={cn(
            'hidden w-full h-[50px]',
            'md:flex justify-center items-center gap-5',
            'bg-white',
            '[&>li>a]:font-semibold [&>li>a]:text-gray-600',
            '[&>li>a]:transition-all [&>li>a]:duration-200',
            scrolled && 'shadow-md',
          )}>
          <li>
            <a href="#home" className="hover:text-blue-400">
              Home
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-green-500">
              Projects
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-yellow-500">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
