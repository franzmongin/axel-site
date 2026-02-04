import fs from "fs";
import path from "path";

interface Post {
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

interface Attachment {
  ID: number;
  guid: string;
}

interface DataFile {
  posts: Post[];
  attachments: Attachment[];
  featured_images: Record<string, string>;
}

function wpUrlToLocal(url: string): string {
  const patterns = [
    /https?:\/\/localhost:8888\/wordpress\/wp-content\/uploads\//,
    /https?:\/\/axelmonginjournal\.fr\/wp-content\/uploads\//,
  ];
  for (const pattern of patterns) {
    if (pattern.test(url)) {
      return "/uploads/" + url.replace(pattern, "");
    }
  }
  return url;
}

function cleanContent(html: string): string {
  let cleaned = html.replace(
    /<!-- \/?(wp:[^\s]*?)(\s+\{[^}]*\})?\s*\/?-->\n?/g,
    ""
  );
  cleaned = cleaned.replace(
    /<div class="wp-block-uagb-separator[^"]*">[^]*?<\/div>/g,
    ""
  );
  cleaned = cleaned.replace(/<p><\/p>/g, "");
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, "");
  cleaned = cleaned.replace(
    /src="(https?:\/\/localhost:8888\/wordpress\/wp-content\/uploads\/[^"]+)"/g,
    (_, url) => `src="${wpUrlToLocal(url)}"`
  );
  cleaned = cleaned.replace(
    /src="(https?:\/\/axelmonginjournal\.fr\/wp-content\/uploads\/[^"]+)"/g,
    (_, url) => `src="${wpUrlToLocal(url)}"`
  );
  cleaned = cleaned.replace(
    /<div class="wp-block-uagb[^"]*"[^>]*>/g,
    ""
  );
  cleaned = cleaned.replace(
    /<h([1-6]) class="[^"]*uagb[^"]*"[^>]*>/g,
    "<h$1>"
  );
  cleaned = cleaned.replace(/<p class="[^"]*uagb[^"]*"[^>]*>/g, "<p>");
  return cleaned.trim();
}

function extractExcerpt(html: string, maxLength: number = 200): string {
  const text = html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

function determineCategory(post: Post): string {
  const title = post.post_title.toLowerCase();
  const content = post.post_content.toLowerCase();

  if (
    title.includes("reportage") ||
    title.includes("enquête") ||
    title.includes("enquete") ||
    title.includes("portrait") ||
    title.includes("investigation") ||
    (content.includes("reportage") && title.includes(":"))
  ) {
    return "reportage";
  }

  if (
    title.includes("vidéo") ||
    title.includes("video") ||
    title.includes("facecam") ||
    title.includes("micro-trottoir")
  ) {
    return "video";
  }

  return "article";
}

function escapeYaml(str: string): string {
  // Always use single quotes with escaped single quotes for safety
  // YAML single-quoted strings escape ' as ''
  const escaped = str.replace(/'/g, "''");
  return `'${escaped}'`;
}

function main() {
  const dataPath = path.join(__dirname, "..", "data", "posts.json");
  const outputDir = path.join(__dirname, "..", "content", "posts");

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const raw = fs.readFileSync(dataPath, "utf-8");
  const data: DataFile = JSON.parse(raw);

  console.log(`Found ${data.posts.length} posts to migrate`);
  console.log(
    `Found ${Object.keys(data.featured_images).length} featured image mappings`
  );

  let migrated = 0;

  for (const post of data.posts) {
    const slug = post.post_name;
    const cleanedContent = cleanContent(post.post_content);
    const excerpt = extractExcerpt(cleanedContent, 200);
    const category = determineCategory(post);

    // Get featured image
    let featuredImage = "";
    const attachmentId = data.featured_images[String(post.ID)];
    if (attachmentId) {
      const attachment = data.attachments.find(
        (a) => String(a.ID) === attachmentId
      );
      if (attachment) {
        featuredImage = wpUrlToLocal(attachment.guid);
      }
    }

    // Convert date from "2024-12-06 16:25:16" to ISO format
    const date = new Date(post.post_date.replace(" ", "T") + "Z");
    const isoDate = date.toISOString();

    // Build frontmatter
    const lines: string[] = ["---"];
    lines.push(`title: ${escapeYaml(post.post_title)}`);
    lines.push(`slug: ${slug}`);
    lines.push(`date: '${isoDate}'`);
    if (featuredImage) {
      lines.push(`featuredImage: ${featuredImage}`);
    }
    lines.push(`category: ${category}`);
    lines.push(`excerpt: ${escapeYaml(excerpt)}`);
    lines.push("---");
    lines.push("");
    // Store cleaned HTML content as the markdown body
    // We use a special marker so the data layer knows this is HTML
    lines.push(cleanedContent);
    lines.push("");

    const filePath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
    migrated++;

    console.log(
      `  [${migrated}/${data.posts.length}] ${slug} (${category})`
    );
  }

  console.log(`\nMigration complete: ${migrated} posts migrated to ${outputDir}`);

  // Summary by category
  const categories: Record<string, number> = {};
  for (const post of data.posts) {
    const cat = determineCategory(post);
    categories[cat] = (categories[cat] || 0) + 1;
  }
  console.log("\nBy category:");
  for (const [cat, count] of Object.entries(categories)) {
    console.log(`  ${cat}: ${count}`);
  }
}

main();
