import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Always include home as the first item
  const allItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  // Generate structured data for breadcrumbs (JSON-LD format)
  // Note: For the last item (current page), we omit the 'item' property as per Google's guidelines
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => {
      const isLast = index === allItems.length - 1;
      const listItem: Record<string, any> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
      };
      // Only add 'item' for non-last items (current page shouldn't have item URL)
      if (!isLast) {
        listItem.item = `${baseUrl}${item.href}`;
      }
      return listItem;
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isHome = index === 0;
            return (
              <li
                key={item.href}
                className="flex items-center"
              >
                {isLast ? (
                  <span
                    className="text-gray-600 font-medium flex items-center"
                    aria-current="page"
                  >
                    {isHome ? (
                      <>
                        <Home className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">Home</span>
                      </>
                    ) : (
                      item.label
                    )}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-primary hover:text-primary/80 transition-colors duration-200 flex items-center"
                  >
                    {isHome ? (
                      <>
                        <Home className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">Home</span>
                      </>
                    ) : (
                      item.label
                    )}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

