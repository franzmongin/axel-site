import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-[var(--font-serif)] text-4xl font-bold mb-2">Contact</h1>
        <p className="font-[var(--font-body)] text-[var(--color-ink-lighter)] mt-2">
          Pour toute question, collaboration ou suggestion
        </p>
        <div className="w-16 h-0.5 bg-[var(--color-accent)] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-[var(--font-serif)] text-2xl font-bold mb-4">Me contacter</h2>
          <p className="font-[var(--font-body)] text-[var(--color-ink-light)] mb-6 leading-relaxed">
            Vous souhaitez me contacter pour une collaboration, une proposition de sujet
            ou simplement pour échanger ? N&apos;hésitez pas à me joindre par email.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-paper-warm)] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-[var(--font-sans)] text-sm font-semibold">Email</p>
                <a href="mailto:axelmongin@gmail.com" className="font-[var(--font-sans)] text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]">
                  axelmongin@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-paper-warm)] p-8 border border-[var(--color-rule)]">
          <h3 className="font-[var(--font-serif)] text-xl font-bold mb-4">Proposer un sujet</h3>
          <p className="font-[var(--font-body)] text-sm text-[var(--color-ink-light)] mb-4 leading-relaxed">
            Vous avez un sujet à me soumettre, une histoire à raconter ?
            Envoyez-moi un email avec les détails.
          </p>
          <a
            href="mailto:axelmongin@gmail.com?subject=Proposition de sujet"
            className="inline-block font-[var(--font-sans)] text-sm font-semibold uppercase tracking-wider px-6 py-3 bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] transition-colors"
          >
            Envoyer un email
          </a>
        </div>
      </div>
    </div>
  );
}
