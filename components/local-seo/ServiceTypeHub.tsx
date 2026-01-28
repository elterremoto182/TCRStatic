'use client';

import Link from 'next/link';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { Home, Building2, ArrowRight, CheckCircle, Lightbulb, Star, AlertCircle } from 'lucide-react';
import type { RelatedLink } from '@/lib/local-seo/links';

interface City {
  name: string;
  slug: string;
}

interface ProblemLink {
  slug: string;
  name: string;
  description: string;
  urgency?: 'emergency' | 'high' | 'moderate';
}

interface ServiceTypeHubProps {
  serviceName: string;
  serviceSlug: string;
  type: 'residential' | 'commercial';
  description: string;
  cities: City[];
  focusAreas: string[];
  challenges?: string;
  tips?: string[];
  tier1CityLinks?: RelatedLink[];
  problemLinks?: ProblemLink[];
  className?: string;
}

export function ServiceTypeHub({
  serviceName,
  serviceSlug,
  type,
  description,
  cities,
  focusAreas,
  challenges,
  tips,
  tier1CityLinks,
  problemLinks,
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

      {/* Challenges Section */}
      {challenges && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Why Choose Us for {typeLabel} {serviceName}
                </h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-600 text-center">
                {challenges.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Tips Section */}
      {tips && tips.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center justify-center gap-3 mb-8">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {typeLabel} {serviceName.split(' ')[0]} Tips
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {tips.slice(0, 6).map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Tier 1 Cities Section (Major Metros) */}
      {tier1CityLinks && tier1CityLinks.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-6xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Major Service Areas
                </h2>
              </div>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                Our primary service locations for {type} {serviceName.toLowerCase()} throughout South Florida.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {tier1CityLinks.map((link, index) => (
                <AnimateOnScroll
                  key={link.href}
                  animation="fade-in-up"
                  duration={400}
                  delay={index * 50}
                >
                  <Link
                    href={link.href}
                    className="group block p-4 bg-white rounded-xl border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm">
                        {link.label.replace(serviceName, '').replace(' in ', '').trim()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    {link.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {link.description}
                      </p>
                    )}
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Problems Section */}
      {problemLinks && problemLinks.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Common Problems We Solve
                </h2>
              </div>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                Learn about specific {serviceName.toLowerCase().split(' ')[0]} issues and how we address them.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {problemLinks.map((problem, index) => (
                <AnimateOnScroll
                  key={problem.slug}
                  animation="fade-in-up"
                  duration={400}
                  delay={index * 50}
                >
                  <Link
                    href={`/problems/${problem.slug}`}
                    className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm">
                            {problem.name}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {problem.description}
                        </p>
                        {problem.urgency === 'emergency' && (
                          <span className="inline-block mt-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                            Emergency
                          </span>
                        )}
                        {problem.urgency === 'high' && (
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
      )}

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

