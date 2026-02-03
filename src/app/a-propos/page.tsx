import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'À propos',
};

export default function AProposPage() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-[var(--color-ink)] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
          <div className="gold-line mb-5" />
          <h1 className="font-[var(--font-serif)] text-4xl md:text-5xl font-black tracking-tight">À propos</h1>
          <p className="font-[var(--font-body)] text-white/40 mt-3">
            Journaliste, investigateur, raconteur d&apos;histoires.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
            {/* Photo + decorative element */}
            <div className="relative">
              <div className="relative z-10 mx-auto md:mx-0">
                <div className="w-64 h-64 md:w-full md:h-auto md:aspect-square overflow-hidden">
                  <img
                    src="/uploads/2025/03/Avatar-Axel-2.png"
                    alt="Axel Mongin"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="gold-line mt-4" />
              </div>
              {/* Decorative outlined text behind photo */}
              <div className="absolute -top-6 -left-4 text-outlined font-[var(--font-serif)] text-[6rem] font-black leading-none opacity-5 pointer-events-none select-none hidden md:block">
                AX
              </div>
            </div>

            <div className="article-content">
              <p>
                Je m&apos;appelle <strong>Axel Mongin</strong>, journaliste en reconversion, passionné par
                l&apos;investigation et les reportages terrain.
              </p>
              <p>
                Fort d&apos;une formation en journalisme et d&apos;un parcours international, je mets ma plume
                et ma curiosité au service de récits authentiques.
              </p>
              <p>
                Ce journal est un espace d&apos;exploration où s&apos;entremêlent enquêtes, réflexions et récits,
                guidé par un seul élan : <em>comprendre et faire comprendre</em>.
              </p>

              <blockquote>
                &laquo; L&apos;homme se découvre quand il se mesure avec l&apos;obstacle &raquo;
                <br />
                <span className="text-sm not-italic">&mdash; Antoine de Saint-Exupéry</span>
              </blockquote>

              <h2>Parcours</h2>
              <p>
                Diplômé en journalisme, j&apos;ai développé une expertise dans le traitement de sujets
                géopolitiques, sociétaux et culturels. Mon travail mêle analyse approfondie et
                reportage de terrain, avec une attention particulière portée aux récits humains
                derrière les événements.
              </p>

              <h2>Thématiques</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Géopolitique et relations internationales</li>
                <li>Politique française et européenne</li>
                <li>Culture, cinéma et littérature</li>
                <li>Enquêtes et reportages de terrain</li>
                <li>Société et enjeux contemporains</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
