import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Reportages',
};

export default function ReportagesPage() {
  const allPosts = getAllPosts();

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
    <div>
      {/* Page header */}
      <div className="bg-[var(--color-ink)] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
          <div className="gold-line mb-5" />
          <h1 className="font-[var(--font-serif)] text-4xl md:text-5xl font-black tracking-tight">Reportages & Enquêtes</h1>
          <p className="font-[var(--font-body)] text-white/40 mt-3">
            Investigations, portraits et reportages de terrain
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {reportages.length > 0 ? (
          <>
            <ScrollReveal variant="scale">
              <div className="mb-16">
                <ArticleCard post={reportages[0]} featured />
              </div>
            </ScrollReveal>

            <div className="gold-line-center w-full mb-14" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {reportages.slice(1).map((post, i) => (
                <ScrollReveal key={post.ID} delay={i % 3 * 80}>
                  <ArticleCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <span className="font-[var(--font-serif)] text-6xl text-[var(--color-rule)] block mb-4">&#9670;</span>
            <p className="text-[var(--color-ink-lighter)]">Aucun reportage pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
