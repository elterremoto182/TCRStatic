'use client';

import Link from 'next/link';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { AlertCircle } from 'lucide-react';
import type { CauseConfig } from '@/lib/local-seo/data';

interface RelatedProblemsProps {
  title: string;
  causes: CauseConfig[];
  defaultCity: string;
}

/**
 * Related Problems Section for main service pages.
 * Displays clickable cards linking to problem/cause detail pages.
 */
export function RelatedProblems({ title, causes, defaultCity }: RelatedProblemsProps) {
  if (!causes || causes.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            We handle all types of damage. Click to learn more about each specific issue.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {causes.map((cause, index) => (
            <AnimateOnScroll
              key={cause.slug}
              animation="fade-in-up"
              duration={600}
              delay={index * 100}
            >
              <Link
                href={`/problems/${cause.slug}/${defaultCity}/`}
                className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                      {cause.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {cause.description}
                    </p>
                    {cause.urgency === 'emergency' && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                        Emergency
                      </span>
                    )}
                    {cause.urgency === 'high' && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                        High Priority
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
