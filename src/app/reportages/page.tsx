import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';

export const metadata: Metadata = {
  title: 'Reportages',
};

export default function ReportagesPage() {
  const allPosts = getAllPosts();

  // Filter posts that have "reportage" or "enquête" in title, or are investigative pieces
  const reportages = allPosts.filter(post => {
    const title = post.post_title.toLowerCase();
    const content = post.post_content.toLowerCase();
    return (
      title.includes('reportage') ||
      title.includes('enquête') ||
      title.includes('enquete') ||
      title.includes('portrait') ||
      title.includes('investigation') ||
      content.includes('reportage') && title.includes(':')
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-[var(--font-serif)] text-4xl font-bold mb-2">Reportages & Enquêtes</h1>
        <p className="font-[var(--font-body)] text-[var(--color-ink-lighter)]">
          Investigations, portraits et reportages de terrain
        </p>
        <div className="w-16 h-0.5 bg-[var(--color-accent)] mx-auto mt-4" />
      </div>

      {reportages.length > 0 ? (
        <>
          {/* Featured reportage */}
          <section className="mb-12">
            <ArticleCard post={reportages[0]} featured />
          </section>

          <div className="h-px bg-[var(--color-rule)] my-8" />

          {/* Rest of reportages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reportages.slice(1).map((post) => (
              <ArticleCard key={post.ID} post={post} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-[var(--color-ink-lighter)]">Aucun reportage pour le moment.</p>
      )}
    </div>
  );
}
