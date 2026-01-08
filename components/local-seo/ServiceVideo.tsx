'use client';

import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { YouTubeFacade } from '@/components/YouTubeFacade';

interface ServiceVideoProps {
  videoId: string;
  title?: string;
}

/**
 * A reusable video component for service and city pages.
 * Wraps YouTubeFacade with consistent styling and animation.
 */
export function ServiceVideo({ videoId, title = 'Service Video' }: ServiceVideoProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <YouTubeFacade videoId={videoId} title={title} />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

