'use client';

import OptimizedImage from '@/components/OptimizedImage';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import content from '@/config/content.json';

export function TrustBadges() {
  const { branding } = content;

  if (!branding?.badges || branding.badges.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-background border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600} delay={0}>
          <div className="text-center">
          <p className="text-sm text-gray-600 mb-6 font-semibold uppercase tracking-wide">
            Trusted & Certified
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {branding.badges.map((badge, index) => (
              <AnimateOnScroll
                key={index}
                animation="scale-in"
                duration={500}
                delay={index * 100}
              >
                <div className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <OptimizedImage
                    src={badge.image}
                    alt={badge.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-gray-600 mt-2 font-medium">
                  {badge.name}
                </span>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
