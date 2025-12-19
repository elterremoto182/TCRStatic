'use client';

import { Building2, Clock, FileText, Users, Briefcase, Shield } from 'lucide-react';

interface CommercialBenefitsProps {
  className?: string;
}

const benefits = [
  {
    icon: Clock,
    title: 'Minimize Downtime',
    description: 'Rapid response and aggressive timelines to get your business operational fast.',
  },
  {
    icon: FileText,
    title: 'Business Interruption Docs',
    description: 'Comprehensive documentation to support your business interruption insurance claims.',
  },
  {
    icon: Briefcase,
    title: 'Project Management',
    description: 'Dedicated project managers for large-loss commercial restoration projects.',
  },
  {
    icon: Clock,
    title: 'After-Hours Service',
    description: 'Flexible scheduling including nights and weekends to minimize operational disruption.',
  },
  {
    icon: Shield,
    title: 'Compliance & Safety',
    description: 'Full compliance with OSHA, building codes, and health regulations.',
  },
  {
    icon: Users,
    title: 'Multi-Location Support',
    description: 'Capacity to handle simultaneous restoration across multiple properties.',
  },
];

export function CommercialBenefits({ className = '' }: CommercialBenefitsProps) {
  return (
    <div className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 md:p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          Commercial Benefits
        </h3>
      </div>

      <div className="space-y-4">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <IconComponent className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Business focus message */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900">Bottom Line:</span>
          <span className="text-gray-600">Every hour of downtime costs money. We work fast.</span>
        </div>
      </div>
    </div>
  );
}

