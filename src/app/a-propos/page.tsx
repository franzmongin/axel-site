import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
};

export default function AProposPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-[var(--font-serif)] text-4xl font-bold mb-2">À propos</h1>
        <div className="w-16 h-0.5 bg-[var(--color-accent)] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-start">
        <div className="mx-auto md:mx-0">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[var(--color-paper-warm)] shadow-lg">
            <img
              src="/uploads/2025/03/Avatar-Axel-2.png"
              alt="Axel Mongin"
              className="w-full h-full object-cover"
            />
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

          <blockquote className="border-l-3 border-[var(--color-accent)] pl-6 my-8 italic text-[var(--color-ink-light)]">
            &laquo; L&apos;homme se découvre quand il se mesure avec l&apos;obstacle &raquo;
            <br />
            <span className="text-sm not-italic">&mdash; Antoine de Saint-Exupéry</span>
          </blockquote>

          <h2 className="font-[var(--font-serif)] text-2xl font-bold mt-8 mb-4">Parcours</h2>
          <p>
            Diplômé en journalisme, j&apos;ai développé une expertise dans le traitement de sujets
            géopolitiques, sociétaux et culturels. Mon travail mêle analyse approfondie et
            reportage de terrain, avec une attention particulière portée aux récits humains
            derrière les événements.
          </p>

          <h2 className="font-[var(--font-serif)] text-2xl font-bold mt-8 mb-4">Thématiques</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Géopolitique et relations internationales</li>
            <li>Politique française et européenne</li>
            <li>Culture, cinéma et littérature</li>
            <li>Enquêtes et reportages de terrain</li>
            <li>Société et enjeux contemporains</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
