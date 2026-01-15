'use client';

import { useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface LocalFAQProps {
  title: string;
  faqs: FAQItem[];
  localFAQs?: FAQItem[]; // City-specific FAQs to merge in
  className?: string;
}

function FAQAccordionItem({ faq, isOpen, onToggle }: { 
  faq: FAQItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-4 pt-0 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export function LocalFAQ({ title, faqs, localFAQs, className = '' }: LocalFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Merge templated FAQs with city-specific local FAQs
  const allFaqs = localFAQs && localFAQs.length > 0 
    ? [...faqs, ...localFAQs] 
    : faqs;
  
  // Track where local FAQs start for visual differentiation
  const localFAQsStartIndex = faqs.length;
  const hasLocalFAQs = localFAQs && localFAQs.length > 0;

  if (!allFaqs || allFaqs.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`} id="faq">
      <div className="max-w-4xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Get answers to common questions about our services in your area.
          </p>
        </AnimateOnScroll>

        <div className="space-y-3">
          {allFaqs.map((faq, index) => (
            <AnimateOnScroll
              key={index}
              animation="fade-in-up"
              duration={600}
              delay={index * 100}
            >
              {/* Add visual marker for local FAQs */}
              {hasLocalFAQs && index === localFAQsStartIndex && (
                <div className="flex items-center gap-2 py-2 mb-2">
                  <div className="h-px flex-1 bg-primary/20" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Local Questions
                  </span>
                  <div className="h-px flex-1 bg-primary/20" />
                </div>
              )}
              <FAQAccordionItem
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </AnimateOnScroll>
          ))}
        </div>

        {/* Additional Help CTA */}
        <AnimateOnScroll animation="fade-in-up" duration={600} delay={400}>
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">
              Have a question not answered here?
            </p>
            <a
              href="tel:7866106317"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              Call us at (786) 610-6317 — We're here to help 24/7
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

// Generate FAQ Schema JSON-LD
export function generateFAQSchemaScript(faqs: FAQItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify(schema);
}

