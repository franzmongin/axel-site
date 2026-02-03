import fs from 'fs';
import path from 'path';

export interface Post {
  ID: number;
  post_date: string;
  post_content: string;
  post_title: string;
  post_name: string;
  post_type: string;
  post_status: string;
  post_parent: number;
  guid: string;
  featuredImage?: string;
}

export interface Attachment {
  ID: number;
  post_date: string;
  post_content: string;
  post_title: string;
  post_name: string;
  post_type: string;
  post_status: string;
  post_parent: number;
  guid: string;
}

interface DataFile {
  posts: Post[];
  pages: Post[];
  attachments: Attachment[];
  featured_images: Record<string, string>;
}

let cachedData: DataFile | null = null;

function getData(): DataFile {
  if (cachedData) return cachedData;
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  cachedData = JSON.parse(raw);
  return cachedData!;
}

function wpUrlToLocal(url: string): string {
  // Convert WordPress URLs to local paths
  const patterns = [
    /https?:\/\/localhost:8888\/wordpress\/wp-content\/uploads\//,
    /https?:\/\/axelmonginjournal\.fr\/wp-content\/uploads\//,
  ];
  for (const pattern of patterns) {
    if (pattern.test(url)) {
      return '/uploads/' + url.replace(pattern, '');
    }
  }
  return url;
}

function getAttachmentUrl(attachmentId: string, attachments: Attachment[]): string | undefined {
  const attachment = attachments.find(a => String(a.ID) === attachmentId);
  if (!attachment) return undefined;
  return wpUrlToLocal(attachment.guid);
}

function cleanContent(html: string): string {
  // Remove WordPress block comments
  let cleaned = html.replace(/<!-- \/?(wp:[^\s]*?)(\s+\{[^}]*\})?\s*\/?-->\n?/g, '');

  // Remove uagb separator divs
  cleaned = cleaned.replace(/<div class="wp-block-uagb-separator[^"]*">[^]*?<\/div>/g, '');

  // Remove empty paragraphs
  cleaned = cleaned.replace(/<p><\/p>/g, '');
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');

  // Fix image URLs in content
  cleaned = cleaned.replace(
    /src="(https?:\/\/localhost:8888\/wordpress\/wp-content\/uploads\/[^"]+)"/g,
    (_, url) => `src="${wpUrlToLocal(url)}"`
  );
  cleaned = cleaned.replace(
    /src="(https?:\/\/axelmonginjournal\.fr\/wp-content\/uploads\/[^"]+)"/g,
    (_, url) => `src="${wpUrlToLocal(url)}"`
  );

  // Remove uagb classes from headings but keep content
  cleaned = cleaned.replace(/<div class="wp-block-uagb[^"]*"[^>]*>/g, '');
  cleaned = cleaned.replace(/<h([1-6]) class="[^"]*uagb[^"]*"[^>]*>/g, '<h$1>');
  cleaned = cleaned.replace(/<p class="[^"]*uagb[^"]*"[^>]*>/g, '<p>');

  return cleaned.trim();
}

function extractExcerpt(html: string, maxLength: number = 200): string {
  const text = html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getAllPosts(): Post[] {
  const data = getData();
  const posts = data.posts
    .map(post => ({
      ...post,
      featuredImage: data.featured_images[String(post.ID)]
        ? getAttachmentUrl(data.featured_images[String(post.ID)], data.attachments)
        : undefined,
      post_content: cleanContent(post.post_content),
    }))
    .sort((a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(p => p.post_name === slug);
}

export function getPages(): Post[] {
  const data = getData();
  return data.pages.map(page => ({
    ...page,
    post_content: cleanContent(page.post_content),
  }));
}

export function getPageBySlug(slug: string): Post | undefined {
  return getPages().find(p => p.post_name === slug);
}

export { extractExcerpt, formatDate, wpUrlToLocal };
