import { Metadata } from 'next';
import Link from 'next/link';

const REDIRECT_URL = '/guides/fire-damage-restoration/';

export const metadata: Metadata = {
  title: 'Redirecting to Fire Damage Restoration Guide',
  description: 'This page has moved. Redirecting to the complete Fire Damage Restoration Guide.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://totalcarerestoration.com/guides/fire-damage-restoration/',
  },
  other: {
    'http-equiv': 'refresh',
    content: `0;url=${REDIRECT_URL}`,
  },
};

export default function FireDamageRestorationGuideRedirect() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${REDIRECT_URL}`} />
        <link rel="canonical" href="https://totalcarerestoration.com/guides/fire-damage-restoration/" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace('${REDIRECT_URL}');`,
          }}
        />
      </head>
      <body className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Page Has Moved
          </h1>
          <p className="text-gray-600 mb-6">
            This article has been merged into our comprehensive Fire Damage Restoration Guide.
          </p>
          <p className="text-gray-600 mb-6">
            Redirecting automatically...
          </p>
          <Link
            href={REDIRECT_URL}
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Fire Damage Restoration Guide
          </Link>
        </div>
      </body>
    </html>
  );
}
