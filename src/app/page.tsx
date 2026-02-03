import Link from 'next/link';
import { getAllPosts, extractExcerpt, formatDate } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';

export default function Home() {
  const posts = getAllPosts();
  const heroPost = posts[0];
  const secondaryPosts = posts.slice(1, 4);
  const recentPosts = posts.slice(4, 10);

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero section */}
      <section className="py-10">
        {heroPost && (
          <ArticleCard post={heroPost} featured />
        )}
      </section>

      {/* Decorative rule */}
      <div className="flex items-center gap-4 my-2">
        <div className="flex-1 h-px bg-[var(--color-rule)]" />
        <span className="font-[var(--font-serif)] text-sm text-[var(--color-ink-lighter)] italic">Derniers articles</span>
        <div className="flex-1 h-px bg-[var(--color-rule)]" />
      </div>

      {/* Secondary articles */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {secondaryPosts.map((post) => (
            <ArticleCard key={post.ID} post={post} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[var(--color-rule)] my-4" />

      {/* More articles */}
      <section className="py-8">
        <h2 className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-lighter)] mb-8">
          Plus d&apos;articles
        </h2>
        <div className="space-y-8">
          {recentPosts.map((post) => (
            <Link key={post.ID} href={`/articles/${post.post_name}`} className="block group">
              <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 pb-8 border-b border-[var(--color-rule)] last:border-0">
                {post.featuredImage && (
                  <div className="aspect-[16/10] md:aspect-square overflow-hidden bg-[var(--color-paper-warm)]">
                    <img
                      src={post.featuredImage}
                      alt={post.post_title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className={`flex flex-col justify-center ${!post.featuredImage ? 'md:col-span-2' : ''}`}>
                  <time className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)] uppercase tracking-wider">
                    {formatDate(post.post_date)}
                  </time>
                  <h3 className="font-[var(--font-serif)] text-lg font-bold mt-1 mb-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                    {post.post_title}
                  </h3>
                  <p className="font-[var(--font-body)] text-sm text-[var(--color-ink-light)] leading-relaxed">
                    {extractExcerpt(post.post_content, 200)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-8">
        <Link
          href="/articles"
          className="inline-block font-[var(--font-sans)] text-sm font-semibold uppercase tracking-wider px-8 py-3 border-2 border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          Tous les articles
        </Link>
      </div>
    </div>
  );
}
