'use client';

import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { AlertTriangle, Clock } from 'lucide-react';
import type { ServiceOverviewContent } from '@/lib/local-seo/templates';

interface ServiceOverviewProps {
  content: ServiceOverviewContent;
}

export function ServiceOverview({ content }: ServiceOverviewProps) {
  // Split overview into paragraphs
  const paragraphs = content.overview.split('\n\n').filter(p => p.trim());

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {content.title}
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <AnimateOnScroll animation="fade-in-up" duration={600} delay={100}>
              <div className="prose prose-lg max-w-none">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* Sidebar with why act fast and health risks */}
          <div className="lg:col-span-1">
            <AnimateOnScroll animation="fade-in-up" duration={600} delay={200}>
              {/* Why Act Fast Card */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="text-lg font-bold text-amber-900">
                    Why Act Fast
                  </h3>
                </div>
                <p className="text-amber-800 text-sm leading-relaxed">
                  {content.whyActFast}
                </p>
              </div>

              {/* Health Risks Card (if applicable) */}
              {content.healthRisks && content.healthRisks.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-700" />
                    </div>
                    <h3 className="text-lg font-bold text-red-900">
                      Health Risks
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {content.healthRisks.slice(0, 5).map((risk, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-red-800">
                        <span className="text-red-500 mt-1">•</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

