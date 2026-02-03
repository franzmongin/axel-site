import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Axel Mongin | Journal",
    template: "%s | Axel Mongin",
  },
  description: "Enquêtes, reportages et réflexions par Axel Mongin. Un espace d'exploration guidé par un seul élan : comprendre et faire comprendre.",
};

function Header() {
  return (
    <header className="border-b border-[var(--color-rule)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-[var(--color-rule)]">
          <span className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)] tracking-wider uppercase">
            Journalisme & Investigation
          </span>
          <span className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)]">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Masthead */}
        <div className="py-6 text-center">
          <Link href="/">
            <h1 className="font-[var(--font-serif)] text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
              Axel Mongin
            </h1>
          </Link>
          <p className="mt-1 font-[var(--font-sans)] text-sm text-[var(--color-ink-lighter)] tracking-wide">
            Enquêtes &middot; Reportages &middot; Réflexions
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center gap-8 pb-4">
          <Link href="/" className="nav-link">Accueil</Link>
          <Link href="/articles" className="nav-link">Articles</Link>
          <Link href="/reportages" className="nav-link">Reportages</Link>
          <Link href="/videos" className="nav-link">Vidéos</Link>
          <Link href="/a-propos" className="nav-link">À propos</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-rule)] mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-[var(--font-serif)] text-xl font-bold mb-3">Axel Mongin</h3>
            <p className="font-[var(--font-sans)] text-sm text-[var(--color-ink-lighter)] leading-relaxed">
              Journaliste passionné par l&apos;investigation et les reportages terrain.
              Comprendre et faire comprendre.
            </p>
          </div>
          <div>
            <h4 className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-wider mb-3 text-[var(--color-ink-light)]">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><Link href="/articles" className="font-[var(--font-sans)] text-sm text-[var(--color-ink-lighter)] hover:text-[var(--color-accent)]">Articles</Link></li>
              <li><Link href="/reportages" className="font-[var(--font-sans)] text-sm text-[var(--color-ink-lighter)] hover:text-[var(--color-accent)]">Reportages</Link></li>
              <li><Link href="/videos" className="font-[var(--font-sans)] text-sm text-[var(--color-ink-lighter)] hover:text-[var(--color-accent)]">Vidéos</Link></li>
              <li><Link href="/a-propos" className="font-[var(--font-sans)] text-sm text-[var(--color-ink-lighter)] hover:text-[var(--color-accent)]">À propos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-wider mb-3 text-[var(--color-ink-light)]">
              Contact
            </h4>
            <p className="font-[var(--font-sans)] text-sm text-[var(--color-ink-lighter)]">
              axelmongin@gmail.com
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--color-rule)] text-center">
          <p className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)]">
            &copy; {new Date().getFullYear()} Axel Mongin. Tous droits réservés.
          </p>
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
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
