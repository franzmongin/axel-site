import Link from 'next/link';
import { Post, extractExcerpt, formatDate } from '@/lib/posts';

interface ArticleCardProps {
  post: Post;
  featured?: boolean;
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 250));
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const excerpt = extractExcerpt(post.post_content, featured ? 220 : 120);
  const date = formatDate(post.post_date);
  const readTime = estimateReadingTime(post.post_content);

  if (featured) {
    return (
      <Link href={`/articles/${post.post_name}`} className="block group">
        <article className="card-overlay relative h-[480px] md:h-[520px] overflow-hidden">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.post_title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[800ms]"
            />
          )}
          <div className="card-content absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <span className="tag mb-4">À la une</span>
            <h2 className="font-[var(--font-serif)] text-2xl md:text-4xl font-bold text-white leading-tight mb-4 max-w-2xl">
              {post.post_title}
            </h2>
            <p className="font-[var(--font-body)] text-white/60 leading-relaxed mb-5 max-w-xl hidden md:block">
              {excerpt}
            </p>
            <div className="flex items-center gap-4">
              <time className="font-[var(--font-sans)] text-[0.6rem] text-white/40 uppercase tracking-[0.15em]">
                {date}
              </time>
              <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
              <span className="font-[var(--font-sans)] text-[0.6rem] text-white/40">
                {readTime} min de lecture
              </span>
              <span className="ml-auto font-[var(--font-sans)] text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] group-hover:tracking-[0.25em] transition-all duration-500">
                Lire &rarr;
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${post.post_name}`} className="block group">
      <article className="card-3d img-reveal h-full">
        {post.featuredImage && (
          <div className="aspect-[3/2] overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.post_title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="pt-5 pb-3">
          <div className="accent-line mb-4" />
          <div className="flex items-center gap-2 mb-2">
            <time className="font-[var(--font-sans)] text-[0.58rem] text-[var(--color-ink-lighter)] uppercase tracking-[0.1em]">
              {date}
            </time>
            <span className="w-0.5 h-0.5 rounded-full bg-[var(--color-rule-dark)]" />
            <span className="font-[var(--font-sans)] text-[0.58rem] text-[var(--color-ink-lighter)]">
              {readTime} min
            </span>
          </div>
          <h3 className="font-[var(--font-serif)] text-lg font-bold leading-snug mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
            {post.post_title}
          </h3>
          <p className="font-[var(--font-body)] text-sm text-[var(--color-ink-light)] leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
