import type { Metadata } from "next";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Axel Mongin | Journal",
    template: "%s | Axel Mongin",
  },
  description: "Enquêtes, reportages et réflexions par Axel Mongin. Un espace d'exploration guidé par un seul élan : comprendre et faire comprendre.",
};

function HeaderContent() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      {/* Top accent bar */}
      <div className="flex items-center justify-between py-2 border-b border-white/8">
        <span className="font-[var(--font-sans)] text-[0.55rem] tracking-[0.25em] uppercase text-white/50">
          Journalisme &middot; Investigation &middot; Reportage
        </span>
        <span className="font-[var(--font-sans)] text-[0.55rem] text-white/40 hidden md:block">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      {/* Main header */}
      <div className="flex items-center justify-between py-4 md:py-5">
        <Link href="/" className="group flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-[var(--color-gold)] transition-colors duration-500">
            <img
              src="/uploads/2025/03/Avatar-Axel-2.png"
              alt="Axel Mongin"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-[var(--font-serif)] text-xl md:text-2xl font-bold tracking-tight text-white">
              Axel Mongin
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <Link href="/" className="nav-link">Accueil</Link>
          <Link href="/articles" className="nav-link">Articles</Link>
          <Link href="/reportages" className="nav-link">Reportages</Link>
          <Link href="/videos" className="nav-link">Vidéos</Link>
          <Link href="/a-propos" className="nav-link">À propos</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>
        <MobileNav />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white/50 mt-24">
      {/* Gold line separator */}
      <div className="gold-line-center w-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <h3 className="font-[var(--font-serif)] text-3xl font-bold text-white mb-2">
              Axel Mongin
            </h3>
            <div className="gold-line mb-5" />
            <p className="font-[var(--font-body)] text-sm leading-relaxed max-w-sm text-white/60">
              Journaliste passionné par l&apos;investigation et les reportages terrain.
              Un espace d&apos;exploration guidé par un seul élan : comprendre et faire comprendre.
            </p>
          </div>

          {/* Nav column */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-[var(--font-sans)] text-[0.55rem] font-bold uppercase tracking-[0.25em] mb-5 text-[var(--color-gold)]">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li><Link href="/articles" className="font-[var(--font-sans)] text-sm text-white/60 hover:text-white transition-colors duration-300">Articles</Link></li>
              <li><Link href="/reportages" className="font-[var(--font-sans)] text-sm text-white/60 hover:text-white transition-colors duration-300">Reportages</Link></li>
              <li><Link href="/videos" className="font-[var(--font-sans)] text-sm text-white/60 hover:text-white transition-colors duration-300">Vidéos</Link></li>
              <li><Link href="/a-propos" className="font-[var(--font-sans)] text-sm text-white/60 hover:text-white transition-colors duration-300">À propos</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="md:col-span-3">
            <h4 className="font-[var(--font-sans)] text-[0.55rem] font-bold uppercase tracking-[0.25em] mb-5 text-[var(--color-gold)]">
              Contact
            </h4>
            <a
              href="mailto:axelmongin@gmail.com"
              className="font-[var(--font-sans)] text-sm text-white/60 hover:text-[var(--color-gold)] transition-colors duration-300"
            >
              axelmongin@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/8 flex items-center justify-between">
          <p className="font-[var(--font-sans)] text-[0.65rem] text-white/40">
            &copy; {new Date().getFullYear()} Axel Mongin. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1 text-white/40">
            <span className="font-[var(--font-serif)] text-xs italic">comprendre</span>
            <span className="text-[var(--color-gold)] text-xs">&amp;</span>
            <span className="font-[var(--font-serif)] text-xs italic">faire comprendre</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <StickyHeader>
          <HeaderContent />
        </StickyHeader>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
