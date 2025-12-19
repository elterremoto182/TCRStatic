'use client';

import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { AlertCircle } from 'lucide-react';

interface CommonCausesSectionProps {
  title: string;
  causes: string[];
}

/**
 * Common Causes Section for main service pages (not city-specific).
 * Displays a simple bullet list of common causes in three columns.
 */
export function CommonCausesSection({ title, causes }: CommonCausesSectionProps) {
  if (!causes || causes.length === 0) {
    return null;
  }

  // Split into three columns for larger screens
  const colSize = Math.ceil(causes.length / 3);
  const col1 = causes.slice(0, colSize);
  const col2 = causes.slice(colSize, colSize * 2);
  const col3 = causes.slice(colSize * 2);

  const renderCause = (cause: string, index: number, delay: number) => (
    <AnimateOnScroll
      key={index}
      animation="fade-in-up"
      duration={400}
      delay={delay}
    >
      <li className="flex items-start gap-3 py-2">
        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <span className="text-gray-700">{cause}</span>
      </li>
    </AnimateOnScroll>
  );

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {title}
          </h3>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
          <ul className="space-y-1">
            {col1.map((cause, index) => renderCause(cause, index, index * 50))}
          </ul>
          {col2.length > 0 && (
            <ul className="space-y-1">
              {col2.map((cause, index) => renderCause(cause, index + colSize, (index + colSize) * 50))}
            </ul>
          )}
          {col3.length > 0 && (
            <ul className="space-y-1">
              {col3.map((cause, index) => renderCause(cause, index + colSize * 2, (index + colSize * 2) * 50))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

