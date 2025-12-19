'use client';

import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { Lightbulb, CheckCircle } from 'lucide-react';
import type { PreventionTipsContent } from '@/lib/local-seo/templates';

interface PreventionTipsProps {
  content: PreventionTipsContent;
}

export function PreventionTips({ content }: PreventionTipsProps) {
  if (!content.tips || content.tips.length === 0) {
    return null;
  }

  // Split tips into two columns
  const midpoint = Math.ceil(content.tips.length / 2);
  const leftTips = content.tips.slice(0, midpoint);
  const rightTips = content.tips.slice(midpoint);

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-green-700" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {content.title}
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mb-8">
            Take proactive steps to protect your property and minimize the risk of damage.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {leftTips.map((tip, index) => (
              <AnimateOnScroll
                key={index}
                animation="fade-in-up"
                duration={600}
                delay={index * 100}
              >
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{tip}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {rightTips.map((tip, index) => (
              <AnimateOnScroll
                key={index}
                animation="fade-in-up"
                duration={600}
                delay={(midpoint + index) * 100}
              >
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{tip}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

