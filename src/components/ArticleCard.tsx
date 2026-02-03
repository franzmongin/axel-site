import Link from 'next/link';
import { Post, extractExcerpt, formatDate } from '@/lib/posts';

interface ArticleCardProps {
  post: Post;
  featured?: boolean;
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const excerpt = extractExcerpt(post.post_content, featured ? 300 : 180);
  const date = formatDate(post.post_date);

  if (featured) {
    return (
      <Link href={`/articles/${post.post_name}`} className="block article-card group">
        <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {post.featuredImage && (
            <div className="aspect-[16/10] overflow-hidden bg-[var(--color-paper-warm)]">
              <img
                src={post.featuredImage}
                alt={post.post_title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className={`flex flex-col justify-center ${!post.featuredImage ? 'md:col-span-2' : ''}`}>
            <time className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)] uppercase tracking-wider">
              {date}
            </time>
            <h2 className="font-[var(--font-serif)] text-2xl md:text-3xl font-bold mt-2 mb-3 leading-tight group-hover:text-[var(--color-accent)] transition-colors">
              {post.post_title}
            </h2>
            <p className="font-[var(--font-body)] text-[var(--color-ink-light)] leading-relaxed">
              {excerpt}
            </p>
            <span className="mt-4 font-[var(--font-sans)] text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              Lire l&apos;article &rarr;
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${post.post_name}`} className="block article-card group">
      <article>
        {post.featuredImage && (
          <div className="aspect-[16/10] overflow-hidden mb-4 bg-[var(--color-paper-warm)]">
            <img
              src={post.featuredImage}
              alt={post.post_title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <time className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)] uppercase tracking-wider">
          {date}
        </time>
        <h3 className="font-[var(--font-serif)] text-lg font-bold mt-1 mb-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
          {post.post_title}
        </h3>
        <p className="font-[var(--font-body)] text-sm text-[var(--color-ink-light)] leading-relaxed">
          {excerpt}
        </p>
      </article>
    </Link>
  );
}
