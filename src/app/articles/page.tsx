import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Articles',
};

export default function ArticlesPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div>
      {/* Page header */}
      <div className="bg-[var(--color-ink)] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
          <div className="gold-line mb-5" />
          <h1 className="font-[var(--font-serif)] text-4xl md:text-5xl font-black tracking-tight">Articles</h1>
          <p className="font-[var(--font-body)] text-white/40 mt-3 max-w-lg">
            Tous les articles, analyses et reportages. Enquêtes de terrain et réflexions sur le monde.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {/* Featured */}
        {featured && (
          <ScrollReveal variant="scale">
            <div className="mb-16">
              <ArticleCard post={featured} featured />
            </div>
          </ScrollReveal>
        )}

        <div className="gold-line-center w-full mb-14" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {rest.map((post, i) => (
            <ScrollReveal key={post.ID} delay={i % 3 * 80}>
              <ArticleCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
