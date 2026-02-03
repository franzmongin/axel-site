import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.post_name,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article non trouvé' };
  return {
    title: post.post_title,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.post_name === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Article header */}
      <header className="mb-10">
        <div className="mb-4">
          <Link
            href="/articles"
            className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]"
          >
            &larr; Retour aux articles
          </Link>
        </div>

        <time className="font-[var(--font-sans)] text-sm text-[var(--color-ink-lighter)] uppercase tracking-wider">
          {formatDate(post.post_date)}
        </time>

        <h1 className="font-[var(--font-serif)] text-3xl md:text-4xl lg:text-[2.75rem] font-bold mt-3 mb-4 leading-tight">
          {post.post_title}
        </h1>

        <div className="flex items-center gap-3 mt-6">
          <div className="w-10 h-10 rounded-full bg-[var(--color-paper-warm)] overflow-hidden">
            <img
              src="/uploads/2025/03/Avatar-Axel-2.png"
              alt="Axel Mongin"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-[var(--font-sans)] text-sm font-semibold">Axel Mongin</p>
            <p className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)]">Journaliste</p>
          </div>
        </div>
      </header>

      {/* Featured image */}
      {post.featuredImage && (
        <div className="mb-10 -mx-6 md:-mx-12">
          <img
            src={post.featuredImage}
            alt={post.post_title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Decorative rule */}
      <div className="w-12 h-0.5 bg-[var(--color-accent)] mb-8" />

      {/* Article content */}
      <div
        className="article-content drop-cap"
        dangerouslySetInnerHTML={{ __html: post.post_content }}
      />

      {/* End ornament */}
      <div className="flex items-center justify-center gap-3 my-12">
        <div className="w-1 h-1 rounded-full bg-[var(--color-ink-lighter)]" />
        <div className="w-1 h-1 rounded-full bg-[var(--color-ink-lighter)]" />
        <div className="w-1 h-1 rounded-full bg-[var(--color-ink-lighter)]" />
      </div>

      {/* Navigation between articles */}
      <nav className="border-t border-[var(--color-rule)] pt-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prevPost && (
            <Link href={`/articles/${prevPost.post_name}`} className="group">
              <span className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)] uppercase tracking-wider">
                &larr; Article précédent
              </span>
              <p className="font-[var(--font-serif)] text-lg font-semibold mt-1 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                {prevPost.post_title}
              </p>
            </Link>
          )}
          {nextPost && (
            <Link href={`/articles/${nextPost.post_name}`} className="group text-right md:ml-auto">
              <span className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)] uppercase tracking-wider">
                Article suivant &rarr;
              </span>
              <p className="font-[var(--font-serif)] text-lg font-semibold mt-1 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                {nextPost.post_title}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
