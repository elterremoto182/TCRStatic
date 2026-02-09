'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LocalCTA } from './LocalCTA';
import { LocalFAQ } from './LocalFAQ';
import { ServiceProcess } from './ServiceProcess';
import { NeighborhoodList } from './NeighborhoodList';
import {
  Phone,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  Lightbulb,
  XCircle,
  ChevronDown,
  Home,
  Building2,
  Award,
  FileCheck,
} from 'lucide-react';
import type { CauseConfig, CityConfig, ServiceConfig, CauseCityContent } from '@/lib/local-seo/data';

interface CausePageProps {
  cause: CauseConfig;
  city: CityConfig;
  citySlug: string;
  parentServices: { slug: string; name: string }[];
  breadcrumbs: { label: string; href: string }[];
  cityContent?: CauseCityContent | null;
}

const urgencyColors = {
  emergency: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', accent: 'red' },
  high: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', accent: 'orange' },
  moderate: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', accent: 'yellow' },
};

export function CausePage({
  cause,
  city,
  citySlug,
  parentServices,
  breadcrumbs,
  cityContent,
}: CausePageProps) {
  const urgencyStyle = urgencyColors[cause.urgency] || urgencyColors.moderate;
  const hasBodyContent = cause.bodyContent && cause.bodyContent.overview;

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 ${urgencyStyle.bg} ${urgencyStyle.text} text-sm font-semibold rounded-full`}
              >
                <AlertTriangle className="w-4 h-4" />
                {cause.urgency === 'emergency'
                  ? 'Emergency'
                  : cause.urgency === 'high'
                  ? 'High Priority'
                  : 'Professional Service'}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                <Clock className="w-4 h-4" />
                24/7 Response
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {cause.name} in {city.name}, FL
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mb-8">
              {cause.description} Our {city.name} team provides fast, professional restoration
              services with {city.responseTime} response times.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:7866106317"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 ${
                  cause.urgency === 'emergency'
                    ? 'bg-red-600 hover:bg-red-700 shadow-red-600/25'
                    : 'bg-primary hover:bg-primary/90 shadow-primary/25'
                } text-white font-bold rounded-lg transition-colors shadow-lg`}
              >
                <Phone className="w-5 h-5" />
                {cause.urgency === 'emergency' ? 'Emergency: ' : 'Call '}
                (786) 610-6317
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors"
              >
                Get Free Assessment
              </Link>
            </div>
          
        </div>
      </section>

      {/* Overview Section - Rich Content */}
      {hasBodyContent && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Overview Content */}
              <div className="lg:col-span-2">
                
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Understanding {cause.name} in {city.name}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {cause.bodyContent!.overview.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-gray-600 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* City-Specific Context - SEO Differentiator */}
                  {cityContent?.localContext && (
                    <div className="mt-6 p-5 bg-primary/5 border border-primary/20 rounded-xl">
                      <div className="flex items-start gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <h3 className="font-bold text-gray-900">
                          {cause.name} in {city.name} Specifically
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {cityContent.localContext}
                      </p>
                    </div>
                  )}
                
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Why Act Fast Card */}
                
                  <div className={`${urgencyStyle.bg} ${urgencyStyle.border} border rounded-xl p-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 ${urgencyStyle.bg} rounded-lg flex items-center justify-center`}>
                        <Clock className={`w-5 h-5 ${urgencyStyle.text}`} />
                      </div>
                      <h3 className={`text-lg font-bold ${urgencyStyle.text}`}>Why Act Fast</h3>
                    </div>
                    <p className={`${urgencyStyle.text} text-sm leading-relaxed`}>
                      {cause.bodyContent!.whyActFast}
                    </p>
                  </div>
                

                {/* Trust Signals */}
                
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Why Choose Us in {city.name}?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">{city.responseTime} Response</span>
                          <p className="text-sm text-gray-600">Fast arrival to minimize damage</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Licensed & Insured</span>
                          <p className="text-sm text-gray-600">IICRC certified technicians</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">5-Star Reviews</span>
                          <p className="text-sm text-gray-600">100+ satisfied customers</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Insurance Assistance</span>
                          <p className="text-sm text-gray-600">We work with all major insurers</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Common Causes Section */}
      {hasBodyContent && cause.bodyContent!.commonCauses.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Causes {cause.name}?
              </h2>
              <p className="text-gray-600 max-w-2xl mb-8">
                Understanding the common causes helps you prevent future incidents and identify issues early.
              </p>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cause.bodyContent!.commonCauses.map((causeItem, idx) => (
                
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-gray-700">{causeItem}</span>
                  </div>
                
              ))}
            </div>

            {/* City-Specific Causes - SEO Differentiator */}
            {cityContent?.citySpecificCauses && cityContent.citySpecificCauses.length > 0 && (
              <div className="mt-8">
                
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Specific to {city.name}
                    </h3>
                  </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cityContent.citySpecificCauses.map((causeItem, idx) => (
                    
                      <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-gray-700">{causeItem}</span>
                      </div>
                    
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Warning Signs Section */}
      {hasBodyContent && cause.bodyContent!.warningSignals && cause.bodyContent!.warningSignals.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Warning Signs of {cause.name}
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mb-8">
                Early detection can save you thousands in repairs. Watch for these warning signs:
              </p>
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cause.bodyContent!.warningSignals.map((signal, idx) => (
                
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{signal}</span>
                  </div>
                
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Process Section */}
      {hasBodyContent && cause.bodyContent!.process && cause.bodyContent!.process.length > 0 && (
        <ServiceProcess
          title={`Our ${cause.name} Restoration Process`}
          steps={cause.bodyContent!.process}
        />
      )}

      {/* Prevention Tips Section */}
      {hasBodyContent && cause.bodyContent!.preventionTips && cause.bodyContent!.preventionTips.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-6xl mx-auto px-4">
            
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-green-700" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  How to Prevent {cause.name}
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mb-8">
                Take these proactive steps to protect your {city.name} property from {cause.name.toLowerCase()}.
              </p>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cause.bodyContent!.preventionTips.map((tip, idx) => (
                
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                
              ))}
            </div>

            {/* City-Specific Prevention Tips - SEO Differentiator */}
            {cityContent?.citySpecificPrevention && cityContent.citySpecificPrevention.length > 0 && (
              <div className="mt-8">
                
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-green-700" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Tips for {city.name} Properties
                    </h3>
                  </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cityContent.citySpecificPrevention.map((tip, idx) => (
                    
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-green-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-green-700" />
                        </div>
                        <p className="text-gray-700 leading-relaxed">{tip}</p>
                      </div>
                    
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Related Restoration Services in {city.name}
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              {cause.name} often requires comprehensive restoration. Explore our full service options.
            </p>
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parentServices.map((service, index) => (
              
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <Link
                    href={`/${service.slug}/residential/${citySlug}`}
                    className="group block p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-5 h-5 text-primary" />
                      <span className="text-xs font-medium text-gray-500 uppercase">Residential</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Professional {service.name.toLowerCase()} for homes in {city.name}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <div className="border-t border-gray-100">
                    <Link
                      href={`/${service.slug}/commercial/${citySlug}`}
                      className="group flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Commercial Services</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>
              
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {hasBodyContent && cause.bodyContent!.faqs && cause.bodyContent!.faqs.length > 0 && (
        <LocalFAQ
          title={`${cause.name} FAQs for ${city.name}`}
          faqs={cause.bodyContent!.faqs}
          localFAQs={cityContent?.localFAQs}
        />
      )}

      {/* Neighborhoods Section */}
      <NeighborhoodList
        title={`Serving All of ${city.name}`}
        neighborhoods={city.neighborhoods}
        zipCodes={city.zipCodes}
        cityName={city.name}
      />

      {/* CTA Section */}
      <LocalCTA
        headline={`${cause.name} in ${city.name}? Get Help Now`}
        subheadline={`Our ${city.name} team is ready to respond ${
          cause.urgency === 'emergency' ? 'immediately' : '24/7'
        }. Fast, professional ${cause.name.toLowerCase()} restoration with ${city.responseTime} response time.`}
        primaryButton={{
          text: cause.urgency === 'emergency' ? 'Emergency Call Now' : 'Call Now - 24/7',
          href: 'tel:7866106317',
        }}
        secondaryButton={{
          text: 'Get Free Assessment',
          href: '/#contact',
        }}
      />
    </div>
  );
}

