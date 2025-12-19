'use client';

import Link from 'next/link';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { Home, Building2, MapPin, ArrowRight } from 'lucide-react';

interface City {
  name: string;
  slug: string;
}

interface ServiceTypeHubProps {
  serviceName: string;
  serviceSlug: string;
  type: 'residential' | 'commercial';
  description: string;
  cities: City[];
  focusAreas: string[];
  className?: string;
}

export function ServiceTypeHub({
  serviceName,
  serviceSlug,
  type,
  description,
  cities,
  focusAreas,
  className = '',
}: ServiceTypeHubProps) {
  const TypeIcon = type === 'residential' ? Home : Building2;
  const typeLabel = type === 'residential' ? 'Residential' : 'Commercial';
  const oppositeType = type === 'residential' ? 'commercial' : 'residential';
  const oppositeLabel = type === 'residential' ? 'Commercial' : 'Residential';

  return (
    <div className={className}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-6xl mx-auto px-4">
          <AnimateOnScroll animation="fade-in-up" duration={600}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <TypeIcon className="w-7 h-7 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6">
              {typeLabel} {serviceName}
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8">
              {description}
            </p>
            {/* Switch to other type */}
            <div className="flex justify-center">
              <Link
                href={`/${serviceSlug}/${oppositeType}`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Looking for {oppositeLabel} Services?
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimateOnScroll animation="fade-in-up" duration={600}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              {typeLabel} Service Focus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimateOnScroll animation="fade-in-up" duration={600}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Select Your City
              </h2>
            </div>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              Choose your location for {type}-specific {serviceName.toLowerCase()} information and services.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city, index) => (
              <AnimateOnScroll
                key={city.slug}
                animation="fade-in-up"
                duration={400}
                delay={index * 50}
              >
                <Link
                  href={`/${serviceSlug}/${type}/${city.slug}`}
                  className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {city.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimateOnScroll animation="fade-in-up" duration={600}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need {typeLabel} {serviceName} Now?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Our {type} specialists are available 24/7 for emergency response throughout South Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:7866106317"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Call (786) 610-6317
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-dark text-white font-bold rounded-lg border-2 border-white/30 hover:bg-primary-dark/80 transition-colors"
              >
                Get Free Assessment
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

