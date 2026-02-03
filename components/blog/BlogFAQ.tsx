'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogFAQProps {
  faqs: FAQItem[];
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
          isOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="p-4 pt-0 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export function BlogFAQ({ faqs, className = '' }: BlogFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className={`mt-12 ${className}`} id="faq">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <FAQAccordionItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
