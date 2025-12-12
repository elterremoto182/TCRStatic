import { markdownToHtml } from '@/lib/markdown';
import { YouTubeHydrator } from './YouTubeHydrator';

interface MarkdownRendererProps {
  content: string;
}

/**
 * Server component that renders markdown to HTML at build time.
 * No client JavaScript is shipped for the markdown rendering itself.
 * Only a small hydrator is added for YouTube facade interactivity.
 */
export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = await markdownToHtml(content);
  
  // Check if content has YouTube placeholders that need client hydration
  const hasYouTube = html.includes('youtube-facade-placeholder');
  
  const renderedContent = (
    <div 
      className="prose prose-lg max-w-none markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );

  // Only wrap with YouTubeHydrator if there are YouTube embeds
  if (hasYouTube) {
    return <YouTubeHydrator>{renderedContent}</YouTubeHydrator>;
  }

  return renderedContent;
}
