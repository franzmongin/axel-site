'use client';

import { useState, useEffect, useRef } from 'react';

interface StickyHeaderProps {
  children: React.ReactNode;
}

export default function StickyHeader({ children }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    // Expose header height as CSS variable
    if (ref.current) {
      document.documentElement.style.setProperty('--header-h', `${ref.current.offsetHeight}px`);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--color-ink)] shadow-lg shadow-black/20'
          : 'bg-[var(--color-ink)]/80 backdrop-blur-md'
      }`}
    >
      {children}
    </header>
  );
}
