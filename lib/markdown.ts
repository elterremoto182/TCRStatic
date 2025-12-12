import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

// Custom thumbnails for specific YouTube videos
const customThumbnails: Record<string, string> = {
  'aFbrhj_jQgw': '/wp-content/uploads/2021/10/Screen-Shot-2021-10-07-at-12.13.10-PM.png',
};

/**
 * Converts markdown to HTML at build time.
 * This runs during static generation, so no client JavaScript is needed.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);

  let html = String(result);

  // Post-process to add YouTube facade markers for client hydration
  // Replace YouTube iframes with facade placeholders
  html = html.replace(
    /<iframe[^>]*src=["']https?:\/\/(?:www\.)?(?:youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]+)[^"']*["'][^>]*(?:title=["']([^"']*)["'])?[^>]*><\/iframe>/gi,
    (match, videoId, title) => {
      const safeTitle = title || 'YouTube video';
      const customThumb = customThumbnails[videoId] || '';
      return `<div class="youtube-facade-placeholder" data-video-id="${videoId}" data-title="${safeTitle.replace(/"/g, '&quot;')}" data-custom-thumb="${customThumb}"></div>`;
    }
  );

  return html;
}

/**
 * Extracts YouTube video IDs from a YouTube URL
 */
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

