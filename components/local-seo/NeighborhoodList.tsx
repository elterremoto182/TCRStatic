'use client';

import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { MapPin, Navigation } from 'lucide-react';

interface NeighborhoodListProps {
  title: string;
  neighborhoods: string[];
  zipCodes: string[];
  cityName: string;
  className?: string;
}

export function NeighborhoodList({
  title,
  neighborhoods,
  zipCodes,
  cityName,
  className = '',
}: NeighborhoodListProps) {
  return (
    <section className={`py-16 bg-white ${className}`} id="service-areas">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We proudly serve homes and businesses throughout {cityName} and surrounding areas.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Neighborhoods */}
          <AnimateOnScroll animation="fade-in-up" duration={600} delay={100}>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-gray-900">
                  Neighborhoods We Serve
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {neighborhoods.map((neighborhood, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-sm">{neighborhood}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Zip Codes */}
          <AnimateOnScroll animation="fade-in-up" duration={600} delay={200}>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-gray-900">
                  ZIP Codes Covered
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {zipCodes.map((zip, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium"
                  >
                    {zip}
                  </span>
                ))}
              </div>
              {zipCodes.length > 0 && (
                <p className="mt-4 text-sm text-gray-500">
                  Don't see your ZIP code? We likely still serve your area. Call us to confirm.
                </p>
              )}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Response Time Banner */}
        <AnimateOnScroll animation="fade-in-up" duration={600} delay={300}>
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <p className="text-lg text-gray-800">
              <span className="font-bold text-primary">Fast Response</span> — Our {cityName} team is strategically positioned to reach you quickly.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

