import Link from 'next/link';
import { getTagPostCounts } from '@/lib/blog/posts';
import blogTags from '@/config/blog-tags.json';
import { Clock, Building2, FileText, HeartPulse, Shield, CloudLightning } from 'lucide-react';

interface TagCloudProps {
  activeTag?: string;
  showCounts?: boolean;
}

const tagIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'clock': Clock,
  'building': Building2,
  'file-text': FileText,
  'heart-pulse': HeartPulse,
  'shield': Shield,
  'cloud-lightning': CloudLightning,
};

export function TagCloud({ activeTag, showCounts = true }: TagCloudProps) {
  const counts = getTagPostCounts();
  const tags = Object.entries(blogTags.tags);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(([slug, config]) => {
        const count = counts[slug] || 0;
        const isActive = activeTag === slug;
        const Icon = tagIcons[config.icon];

        return (
          <Link
            key={slug}
            href={`/blog/tag/${slug}/`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {config.label}
            {showCounts && count > 0 && (
              <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                ({count})
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
