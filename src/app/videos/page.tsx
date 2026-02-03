import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vidéos',
};

const videos = [
  {
    title: 'Reportage Magazine Radio',
    subtitle: 'Le télétravail',
    date: '30 Octobre 2025',
  },
  {
    title: 'Reportage tournoi de volley glissé',
    subtitle: 'Ugsel',
    date: '23 Juin 2025',
  },
  {
    title: 'Reportage Fête de la musique',
    subtitle: 'Sécurité',
    date: '21 Juin 2025',
  },
  {
    title: 'FaceCam "Contribuables Associés"',
    subtitle: 'Dette publique française',
    date: '18 Mai 2025',
  },
  {
    title: 'Micro-trottoir "Contribuables Associés"',
    subtitle: 'Dépenses publiques françaises',
    date: '17 Mai 2025',
  },
  {
    title: 'Reportage au Parc de Sceaux',
    subtitle: 'Hanami',
    date: '6 Avril 2025',
  },
];

export default function VideosPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-[var(--font-serif)] text-4xl font-bold mb-2">Vidéos</h1>
        <p className="font-[var(--font-body)] text-[var(--color-ink-lighter)]">
          Reportages vidéo, micro-trottoirs et FaceCam
        </p>
        <div className="w-16 h-0.5 bg-[var(--color-accent)] mx-auto mt-4" />
      </div>

      <div className="bg-[var(--color-paper-warm)] border border-[var(--color-rule)] p-8 mb-10 text-center">
        <p className="font-[var(--font-sans)] text-sm text-[var(--color-ink-light)]">
          Les vidéos seront bientôt disponibles en ligne. En attendant, voici la liste des reportages réalisés.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, i) => (
          <div key={i} className="border border-[var(--color-rule)] bg-white p-6">
            <div className="aspect-video bg-[var(--color-paper-warm)] flex items-center justify-center mb-4 rounded">
              <svg className="w-12 h-12 text-[var(--color-ink-lighter)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-[var(--font-serif)] text-lg font-bold leading-snug">
              {video.title}
            </h3>
            <p className="font-[var(--font-sans)] text-sm text-[var(--color-accent)] mt-1">
              {video.subtitle}
            </p>
            <time className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)] mt-1 block">
              {video.date}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}
