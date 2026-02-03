'use client';

import { useRef, useEffect, type ReactNode } from 'react';

type RevealVariant = 'up' | 'left' | 'right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}

const variantClasses: Record<RevealVariant, string> = {
  up: 'scroll-reveal',
  left: 'scroll-reveal-left',
  right: 'scroll-reveal-right',
  scale: 'scroll-reveal-scale',
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('revealed');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
