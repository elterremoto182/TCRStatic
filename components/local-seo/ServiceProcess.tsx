'use client';

import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import * as LucideIcons from 'lucide-react';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  title: string;
  steps: ProcessStep[];
  className?: string;
}

// Map step numbers to icons
const stepIcons: Record<number, keyof typeof LucideIcons> = {
  1: 'Search',
  2: 'Droplets',
  3: 'Wind',
  4: 'Shield',
  5: 'Hammer',
  6: 'CheckCircle',
};

export function ServiceProcess({ title, steps, className = '' }: ServiceProcessProps) {
  return (
    <section className={`py-16 bg-gray-50 ${className}`} id="process">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our proven restoration process ensures thorough, professional results every time.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const iconName = stepIcons[step.step] || 'CheckCircle';
            const IconComponent = (LucideIcons[iconName] ||
              LucideIcons.CheckCircle) as React.ElementType;

            return (
              <AnimateOnScroll
                key={step.step}
                animation="fade-in-up"
                duration={600}
                delay={index * 100}
              >
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-primary">
                          Step {step.step}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

