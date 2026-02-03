'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/articles', label: 'Articles' },
  { href: '/reportages', label: 'Reportages' },
  { href: '/videos', label: 'Vidéos' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        aria-label="Menu"
      >
        <span
          className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
            open ? 'rotate-45 translate-y-[4.5px]' : ''
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
            open ? '-rotate-45 -translate-y-[4.5px]' : ''
          }`}
        />
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 top-[var(--header-h,80px)] z-40 bg-[var(--color-ink)]">
          <nav className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-[var(--font-serif)] text-2xl font-bold text-white/60 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
