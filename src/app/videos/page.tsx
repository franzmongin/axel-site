import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Vidéos',
};

const videos = [
  { title: 'Reportage Magazine Radio', subtitle: 'Le télétravail', date: '30 Octobre 2025' },
  { title: 'Reportage tournoi de volley glissé', subtitle: 'Ugsel', date: '23 Juin 2025' },
  { title: 'Reportage Fête de la musique', subtitle: 'Sécurité', date: '21 Juin 2025' },
  { title: 'FaceCam "Contribuables Associés"', subtitle: 'Dette publique française', date: '18 Mai 2025' },
  { title: 'Micro-trottoir "Contribuables Associés"', subtitle: 'Dépenses publiques françaises', date: '17 Mai 2025' },
  { title: 'Reportage au Parc de Sceaux', subtitle: 'Hanami', date: '6 Avril 2025' },
];

export default function VideosPage() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-[var(--color-ink)] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
          <div className="gold-line mb-5" />
          <h1 className="font-[var(--font-serif)] text-4xl md:text-5xl font-black tracking-tight">Vidéos</h1>
          <p className="font-[var(--font-body)] text-white/40 mt-3">
            Reportages vidéo, micro-trottoirs et FaceCam
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <ScrollReveal>
          <div className="bg-[var(--color-paper-warm)] border border-[var(--color-rule)] p-6 mb-14 text-center rounded-sm">
            <p className="font-[var(--font-sans)] text-sm text-[var(--color-ink-light)]">
              Les vidéos seront bientôt disponibles en ligne. En attendant, voici la liste des reportages réalisés.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {videos.map((video, i) => (
            <ScrollReveal key={i} delay={i % 3 * 100}>
              <div className="card-3d group">
                <div className="aspect-video bg-[var(--color-ink)] flex items-center justify-center relative overflow-hidden">
                  {/* Decorative number */}
                  <span className="absolute top-3 left-4 font-[var(--font-serif)] text-xs font-bold text-[var(--color-gold)] opacity-60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <svg className="w-12 h-12 text-white/10 group-hover:text-[var(--color-gold)]/30 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="pt-5">
                  <div className="accent-line mb-3" />
                  <h3 className="font-[var(--font-serif)] text-lg font-bold leading-snug">
                    {video.title}
                  </h3>
                  <p className="font-[var(--font-sans)] text-sm text-[var(--color-gold)] mt-1">
                    {video.subtitle}
                  </p>
                  <time className="font-[var(--font-sans)] text-[0.6rem] text-[var(--color-ink-lighter)] mt-2 block uppercase tracking-wider">
                    {video.date}
                  </time>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
