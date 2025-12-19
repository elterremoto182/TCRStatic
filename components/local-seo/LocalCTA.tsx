'use client';

import Link from 'next/link';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { Phone, ArrowRight, Clock, Shield } from 'lucide-react';

interface LocalCTAProps {
  headline: string;
  subheadline: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
  className?: string;
}

export function LocalCTA({
  headline,
  subheadline,
  primaryButton,
  secondaryButton,
  className = '',
}: LocalCTAProps) {
  const isPrimaryPhone = primaryButton.href.startsWith('tel:');

  return (
    <section className={`py-20 bg-primary ${className}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">24/7 Emergency Service</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {headline}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isPrimaryPhone ? (
              <a
                href={primaryButton.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {primaryButton.text}
              </a>
            ) : (
              <Link
                href={primaryButton.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                {primaryButton.text}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}

            <Link
              href={secondaryButton.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white/50 hover:bg-white/10 transition-colors"
            >
              {secondaryButton.text}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Phone number display */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm mb-2">
              Or call us directly:
            </p>
            <a
              href="tel:7866106317"
              className="text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors"
            >
              (786) 610-6317
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

// Simpler inline CTA for use within content sections
export function InlineCTA({ cityName }: { cityName: string }) {
  return (
    <div className="my-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900">
            Need immediate help in {cityName}?
          </p>
          <p className="text-sm text-gray-600">
            Our team is ready to respond 24/7
          </p>
        </div>
        <a
          href="tel:7866106317"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
      </div>
    </div>
  );
}

