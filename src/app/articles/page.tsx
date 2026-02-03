import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';

export const metadata: Metadata = {
  title: 'Articles',
};

export default function ArticlesPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-[var(--font-serif)] text-4xl font-bold mb-2">Articles</h1>
        <p className="font-[var(--font-body)] text-[var(--color-ink-lighter)]">
          Tous les articles, analyses et reportages
        </p>
        <div className="w-16 h-0.5 bg-[var(--color-accent)] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ArticleCard key={post.ID} post={post} />
        ))}
      </div>
    </div>
  );
}
