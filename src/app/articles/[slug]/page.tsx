import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/posts';
import ReadingProgress from '@/components/ReadingProgress';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article non trouvé' };
  return {
    title: post.title,
  };
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, '');
  return Math.max(1, Math.round(text.split(/\s+/).length / 250));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const readTime = estimateReadingTime(post.body);

  return (
    <>
      <ReadingProgress />

      {/* ─── Hero image header ─── */}
      {post.featuredImage && (
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/40 to-transparent" />

          {/* Back link — positioned below the sticky header */}
          <div className="absolute top-4 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-6">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 font-[var(--font-sans)] text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors glass-dark rounded-full px-4 py-2"
              >
                &larr; Articles
              </Link>
            </div>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-4xl mx-auto px-6 pb-12">
              <div className="gold-line mb-5" />
              <h1 className="font-[var(--font-serif)] text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4 tracking-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20">
                    <img
                      src="/uploads/2025/03/Avatar-Axel-2.png"
                      alt="Axel Mongin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-[var(--font-sans)] text-sm font-semibold text-white leading-none">Axel Mongin</p>
                    <p className="font-[var(--font-sans)] text-[0.6rem] text-white/40 mt-0.5">Journaliste</p>
                  </div>
                </div>
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                <time className="font-[var(--font-sans)] text-[0.6rem] text-white/40 uppercase tracking-[0.15em]">
                  {formatDate(post.date)}
                </time>
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                <span className="font-[var(--font-sans)] text-[0.6rem] text-white/40">
                  {readTime} min de lecture
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Non-image header fallback ─── */}
      {!post.featuredImage && (
        <div className="bg-[var(--color-paper-warm)] border-b border-[var(--color-rule)]">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <Link
              href="/articles"
              className="inline-block font-[var(--font-sans)] text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors mb-6"
            >
              &larr; Retour aux articles
            </Link>
            <div className="gold-line mb-5" />
            <h1 className="font-[var(--font-serif)] text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-5">
              {post.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-[var(--color-rule)]">
                <img src="/uploads/2025/03/Avatar-Axel-2.png" alt="Axel Mongin" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-[var(--font-sans)] text-sm font-semibold leading-none">Axel Mongin</p>
                <p className="font-[var(--font-sans)] text-[0.6rem] text-[var(--color-ink-lighter)] mt-0.5">
                  {formatDate(post.date)} &middot; {readTime} min
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Content */}
        <div
          className="article-content drop-cap"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* End ornament */}
        <div className="flex items-center justify-center gap-3 my-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--color-rule)]" />
          <span className="text-[var(--color-gold)] text-lg">&#9670;</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--color-rule)]" />
        </div>

        {/* Share bar */}
        <div className="flex items-center gap-5 py-6 border-t border-b border-[var(--color-rule)]">
          <span className="font-[var(--font-sans)] text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-lighter)]">
            Partager
          </span>
          <div className="gold-line" />
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-[var(--color-rule)] flex items-center justify-center text-[var(--color-ink-lighter)] hover:text-white hover:bg-[var(--color-ink)] hover:border-[var(--color-ink)] transition-all duration-300"
            aria-label="Twitter"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-[var(--color-rule)] flex items-center justify-center text-[var(--color-ink-lighter)] hover:text-white hover:bg-[var(--color-ink)] hover:border-[var(--color-ink)] transition-all duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}`}
            className="w-9 h-9 rounded-full border border-[var(--color-rule)] flex items-center justify-center text-[var(--color-ink-lighter)] hover:text-white hover:bg-[var(--color-ink)] hover:border-[var(--color-ink)] transition-all duration-300"
            aria-label="Email"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Prev / Next */}
        <nav className="pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost && (
              <Link href={`/articles/${prevPost.slug}`} className="group block hover-lift">
                <div className="flex items-start gap-4 p-5 border border-[var(--color-rule)] hover:border-[var(--color-gold)] transition-colors duration-500">
                  {prevPost.featuredImage && (
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                      <img src={prevPost.featuredImage} alt={prevPost.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="font-[var(--font-sans)] text-[0.5rem] font-bold text-[var(--color-gold)] uppercase tracking-[0.2em]">&larr; Précédent</span>
                    <p className="font-[var(--font-serif)] text-sm font-bold mt-1 leading-snug group-hover:text-[var(--color-accent)] transition-colors truncate">
                      {prevPost.title}
                    </p>
                  </div>
                </div>
              </Link>
            )}
            {nextPost && (
              <Link href={`/articles/${nextPost.slug}`} className="group block hover-lift md:ml-auto">
                <div className="flex items-start gap-4 p-5 border border-[var(--color-rule)] hover:border-[var(--color-gold)] transition-colors duration-500 flex-row-reverse text-right">
                  {nextPost.featuredImage && (
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                      <img src={nextPost.featuredImage} alt={nextPost.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="font-[var(--font-sans)] text-[0.5rem] font-bold text-[var(--color-gold)] uppercase tracking-[0.2em]">Suivant &rarr;</span>
                    <p className="font-[var(--font-serif)] text-sm font-bold mt-1 leading-snug group-hover:text-[var(--color-accent)] transition-colors truncate">
                      {nextPost.title}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </>
  );
}
