import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-[var(--color-ink)] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
          <div className="gold-line mb-5" />
          <h1 className="font-[var(--font-serif)] text-4xl md:text-5xl font-black tracking-tight">Contact</h1>
          <p className="font-[var(--font-body)] text-white/40 mt-3">
            Pour toute question, collaboration ou proposition de sujet.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Contact info */}
            <div>
              <div className="accent-line mb-6" style={{ width: '40px' }} />
              <h2 className="font-[var(--font-serif)] text-2xl font-bold mb-4">Me contacter</h2>
              <p className="font-[var(--font-body)] text-[var(--color-ink-light)] mb-8 leading-relaxed">
                Vous souhaitez me contacter pour une collaboration, une proposition de sujet
                ou simplement pour échanger ? N&apos;hésitez pas à me joindre par email.
              </p>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[var(--color-paper-warm)] flex items-center justify-center flex-shrink-0 border border-[var(--color-rule)]">
                  <svg className="w-5 h-5 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-[var(--font-sans)] text-sm font-semibold">Email</p>
                  <a href="mailto:axelmongin@gmail.com" className="font-[var(--font-sans)] text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors">
                    axelmongin@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Proposer un sujet */}
            <ScrollReveal variant="right" delay={150}>
              <div className="bg-[var(--color-ink)] text-white p-10 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-4 right-4 text-outlined font-[var(--font-serif)] text-[5rem] font-black leading-none opacity-5 pointer-events-none select-none">
                  ?
                </div>
                <div className="gold-line mb-5" />
                <h3 className="font-[var(--font-serif)] text-xl font-bold mb-3">Proposer un sujet</h3>
                <p className="font-[var(--font-body)] text-sm text-white/40 mb-6 leading-relaxed">
                  Vous avez un sujet à me soumettre, une histoire à raconter ?
                  Envoyez-moi un email avec les détails.
                </p>
                <a
                  href="mailto:axelmongin@gmail.com?subject=Proposition de sujet"
                  className="inline-block font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[0.2em] px-7 py-3.5 border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-all duration-500"
                >
                  Envoyer un email
                </a>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
