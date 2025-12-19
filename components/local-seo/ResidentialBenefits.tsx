'use client';

import { Home, Heart, Shield, Clock, FileCheck, Users } from 'lucide-react';

interface ResidentialBenefitsProps {
  className?: string;
}

const benefits = [
  {
    icon: Heart,
    title: 'Family Safety First',
    description: 'We prioritize your family\'s health and safety throughout the restoration process.',
  },
  {
    icon: Shield,
    title: 'Mold Prevention',
    description: 'Expert techniques to prevent mold growth that can harm children and elderly family members.',
  },
  {
    icon: FileCheck,
    title: 'Insurance Guidance',
    description: 'We help navigate homeowner insurance claims and work directly with adjusters.',
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'Fast arrival times to minimize damage and get your family back to normal life.',
  },
  {
    icon: Home,
    title: 'Protect Your Home',
    description: 'Careful restoration that preserves your home\'s value and your belongings.',
  },
  {
    icon: Users,
    title: 'Personal Service',
    description: 'Compassionate, family-owned service that treats your home like our own.',
  },
];

export function ResidentialBenefits({ className = '' }: ResidentialBenefitsProps) {
  return (
    <div className={`bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 md:p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Home className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          Residential Benefits
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

      {/* Reassurance message */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 italic">
          "We understand how stressful property damage can be for families. Our team is here to guide you through every step."
        </p>
      </div>
    </div>
  );
}

