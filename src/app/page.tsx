import Link from 'next/link';
import { getAllPosts, extractExcerpt, formatDate } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import ScrollReveal from '@/components/ScrollReveal';

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, '');
  return Math.max(1, Math.round(text.split(/\s+/).length / 250));
}

export default function Home() {
  const posts = getAllPosts();
  const heroPost = posts[0];
  const featuredPosts = posts.slice(1, 4);
  const gridPosts = posts.slice(4, 10);
  const listPosts = posts.slice(10, 16);

  return (
    <div>
      {/* ═══════ HERO — Full viewport ═══════ */}
      <section className="relative min-h-screen -mt-[var(--header-h,100px)] overflow-hidden">
        {heroPost?.featuredImage && (
          <img
            src={heroPost.featuredImage}
            alt={heroPost.post_title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/60 to-[#1a1a2e]/30" />

        {/* Decorative outlined text */}
        <div className="absolute bottom-[25%] right-8 md:right-16 font-[var(--font-serif)] text-[8rem] md:text-[14rem] font-black leading-none pointer-events-none select-none hidden lg:block" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)', color: 'transparent' }}>
          AM
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-20">
            <div className="gold-line mb-6" />
            <span className="tag mb-5 inline-block">À la une</span>
            {heroPost && (
              <Link href={`/articles/${heroPost.post_name}`} className="block group">
                <h1 className="font-[var(--font-serif)] text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 max-w-3xl tracking-tight">
                  {heroPost.post_title}
                </h1>
                <p className="font-[var(--font-body)] text-white/70 text-lg leading-relaxed max-w-xl mb-6 hidden md:block">
                  {extractExcerpt(heroPost.post_content, 200)}
                </p>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                      <img src="/uploads/2025/03/Avatar-Axel-2.png" alt="Axel Mongin" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-[var(--font-sans)] text-xs text-white/70">Axel Mongin</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                  <time className="font-[var(--font-sans)] text-[0.6rem] text-white/60 uppercase tracking-[0.15em]">
                    {formatDate(heroPost.post_date)}
                  </time>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                  <span className="font-[var(--font-sans)] text-[0.6rem] text-white/60">
                    {estimateReadingTime(heroPost.post_content)} min
                  </span>
                  <span className="ml-6 font-[var(--font-sans)] text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] group-hover:tracking-[0.3em] transition-all duration-500">
                    Lire l&apos;article &rarr;
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED TRIO — Asymmetric grid ═══════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        {/* Section header with decorative number */}
        <div className="relative mb-12">
          <span className="decorative-num absolute -top-16 -left-2">01</span>
          <div className="flex items-end gap-4">
            <h2 className="font-[var(--font-sans)] text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[var(--color-ink)]">
              Dernières publications
            </h2>
            <div className="flex-1 h-px bg-[var(--color-rule)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          {/* Large card */}
          {featuredPosts[0] && (
            <ScrollReveal variant="left">
              <Link href={`/articles/${featuredPosts[0].post_name}`} className="block group">
                <article className="card-overlay relative h-[400px] md:h-[480px] overflow-hidden">
                  {featuredPosts[0].featuredImage && (
                    <img
                      src={featuredPosts[0].featuredImage}
                      alt={featuredPosts[0].post_title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[800ms]"
                    />
                  )}
                  <div className="card-content absolute bottom-0 left-0 right-0 p-8">
                    <div className="gold-line mb-4" />
                    <h3 className="font-[var(--font-serif)] text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                      {featuredPosts[0].post_title}
                    </h3>
                    <p className="font-[var(--font-body)] text-sm text-white/70 leading-relaxed max-w-md hidden md:block">
                      {extractExcerpt(featuredPosts[0].post_content, 150)}
                    </p>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          )}

          {/* Two stacked cards */}
          <div className="flex flex-col gap-8">
            {featuredPosts.slice(1, 3).map((post, i) => (
              <ScrollReveal key={post.ID} variant="right" delay={i * 120}>
                <Link href={`/articles/${post.post_name}`} className="block group">
                  <article className="card-overlay relative h-[220px] md:h-[226px] overflow-hidden">
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage}
                        alt={post.post_title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[800ms]"
                      />
                    )}
                    <div className="card-content absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-[var(--font-serif)] text-lg font-bold text-white leading-snug mb-1">
                        {post.post_title}
                      </h3>
                      <time className="font-[var(--font-sans)] text-[0.55rem] text-white/60 uppercase tracking-[0.1em]">
                        {formatDate(post.post_date)}
                      </time>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ NUMBERS STRIP — Dark section ═══════ */}
      <section className="section-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <span className="font-[var(--font-serif)] text-4xl md:text-5xl font-black text-[var(--color-gold)]">
                {posts.length}
              </span>
              <p className="font-[var(--font-sans)] text-[0.6rem] uppercase tracking-[0.2em] text-white/60 mt-2">
                Articles publiés
              </p>
            </div>
            <div>
              <span className="font-[var(--font-serif)] text-4xl md:text-5xl font-black text-[var(--color-gold)]">
                6
              </span>
              <p className="font-[var(--font-sans)] text-[0.6rem] uppercase tracking-[0.2em] text-white/60 mt-2">
                Reportages vidéo
              </p>
            </div>
            <div>
              <span className="font-[var(--font-serif)] text-4xl md:text-5xl font-black text-[var(--color-gold)]">
                &infin;
              </span>
              <p className="font-[var(--font-sans)] text-[0.6rem] uppercase tracking-[0.2em] text-white/60 mt-2">
                Curiosité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ARTICLE GRID — Magazine layout ═══════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="relative mb-12">
          <span className="decorative-num absolute -top-16 -left-2">02</span>
          <div className="flex items-end gap-4">
            <h2 className="font-[var(--font-sans)] text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[var(--color-ink)]">
              Articles récents
            </h2>
            <div className="flex-1 h-px bg-[var(--color-rule)]" />
          </div>
        </div>

        {/* Bento-style grid: first article spans 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {gridPosts[0] && (
            <ScrollReveal variant="scale" className="md:col-span-2 lg:col-span-2">
              <Link href={`/articles/${gridPosts[0].post_name}`} className="block group">
                <article className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {gridPosts[0].featuredImage && (
                    <div className="aspect-[4/3] overflow-hidden img-reveal">
                      <img
                        src={gridPosts[0].featuredImage}
                        alt={gridPosts[0].post_title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="accent-line mb-4" />
                    <time className="font-[var(--font-sans)] text-[0.58rem] text-[var(--color-ink-lighter)] uppercase tracking-[0.1em]">
                      {formatDate(gridPosts[0].post_date)}
                    </time>
                    <h3 className="font-[var(--font-serif)] text-2xl font-bold leading-tight mt-2 mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {gridPosts[0].post_title}
                    </h3>
                    <p className="font-[var(--font-body)] text-sm text-[var(--color-ink-light)] leading-relaxed line-clamp-4">
                      {extractExcerpt(gridPosts[0].post_content, 200)}
                    </p>
                    <span className="inline-block mt-4 font-[var(--font-sans)] text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)] group-hover:tracking-[0.2em] transition-all duration-300">
                      Lire &rarr;
                    </span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          )}
          {gridPosts[1] && (
            <ScrollReveal delay={100}>
              <ArticleCard post={gridPosts[1]} />
            </ScrollReveal>
          )}
          {gridPosts.slice(2).map((post, i) => (
            <ScrollReveal key={post.ID} delay={i * 80}>
              <ArticleCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════ PULL QUOTE — Full width ═══════ */}
      <section className="bg-[var(--color-paper-warm)]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 text-center">
          <ScrollReveal variant="scale">
            <div className="gold-line-center w-full mb-8" />
            <p className="font-[var(--font-serif)] text-3xl md:text-4xl italic text-[var(--color-ink)] leading-relaxed">
              &laquo; Comprendre et faire comprendre &raquo;
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img src="/uploads/2025/03/Avatar-Axel-2.png" alt="Axel Mongin" className="w-full h-full object-cover" />
              </div>
              <span className="font-[var(--font-sans)] text-xs text-[var(--color-ink-lighter)] uppercase tracking-[0.2em]">
                Axel Mongin
              </span>
            </div>
            <div className="gold-line-center w-full mt-8" />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ EXPLORER — Numbered list ═══════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="relative mb-12">
          <span className="decorative-num absolute -top-16 -left-2">03</span>
          <div className="flex items-end gap-4">
            <h2 className="font-[var(--font-sans)] text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[var(--color-ink)]">
              Explorer
            </h2>
            <div className="flex-1 h-px bg-[var(--color-rule)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {listPosts.map((post, i) => (
            <ScrollReveal key={post.ID} variant={i % 2 === 0 ? 'left' : 'right'} delay={i % 2 * 80}>
              <Link href={`/articles/${post.post_name}`} className="block group">
                <article className="flex gap-6 py-6 border-b border-[var(--color-rule)] hover:border-[var(--color-gold)] transition-colors duration-500">
                  {/* Decorative number */}
                  <span className="font-[var(--font-serif)] text-3xl font-black text-[var(--color-gold)]/40 group-hover:text-[var(--color-gold)] transition-colors duration-500 flex-shrink-0 w-12 pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <time className="font-[var(--font-sans)] text-[0.55rem] text-[var(--color-ink-lighter)] uppercase tracking-[0.1em]">
                      {formatDate(post.post_date)}
                    </time>
                    <h3 className="font-[var(--font-serif)] text-base font-bold leading-snug mt-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {post.post_title}
                    </h3>
                  </div>
                  {post.featuredImage && (
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden hidden md:block">
                      <img
                        src={post.featuredImage}
                        alt={post.post_title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  )}
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════ CTA — Dark section ═══════ */}
      <section className="section-dark">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-20 text-center">
          <ScrollReveal variant="scale">
            <span className="font-[var(--font-sans)] text-[0.55rem] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4 block">
              Tous les contenus
            </span>
            <h2 className="font-[var(--font-serif)] text-3xl md:text-4xl font-bold text-white mb-4">
              Découvrir tous les articles
            </h2>
            <p className="font-[var(--font-body)] text-white/60 mb-8 max-w-md mx-auto">
              Enquêtes, reportages, analyses et réflexions sur l&apos;actualité et la société.
            </p>
            <Link
              href="/articles"
              className="inline-block font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[0.2em] px-10 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-all duration-500"
            >
              Voir tous les articles
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
