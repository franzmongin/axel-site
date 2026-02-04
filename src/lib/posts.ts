import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  title: string;
  slug: string;
  date: string;
  featuredImage?: string;
  category: string;
  excerpt: string;
  body: string;
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

let cachedPosts: Post[] | null = null;

function loadPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));

  const posts: Post[] = fileNames.map(fileName => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      slug: data.slug || fileName.replace(/\.md$/, ''),
      date: data.date || '',
      featuredImage: data.featuredImage || undefined,
      category: data.category || 'article',
      excerpt: data.excerpt || extractExcerpt(content, 200),
      body: content.trim(),
    };
  });

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  cachedPosts = posts;
  return posts;
}

export function getAllPosts(): Post[] {
  return loadPosts();
}

export function getPostBySlug(slug: string): Post | undefined {
  return loadPosts().find(p => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return loadPosts().filter(p => p.category === category);
}

export function extractExcerpt(html: string, maxLength: number = 200): string {
  const text = html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
