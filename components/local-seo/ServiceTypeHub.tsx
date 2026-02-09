import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import OptimizedImage from '@/components/OptimizedImage';
import { ServiceProcess } from './ServiceProcess';
import { LocalFAQ } from './LocalFAQ';
import { generateAltText } from '@/lib/seo-utils';
import {
  Home,
  Building2,
  ArrowRight,
  AlertCircle,
  Phone,
  Clock,
  Shield,
  Award,
  FileCheck,
  Heart,
  Users,
  Star,
  CheckCircle,
  Camera,
  MapPin,
  Zap,
  HeartPulse,
} from 'lucide-react';
import type { RelatedLink } from '@/lib/local-seo/links';

// ============================================================================
// TYPES
// ============================================================================

interface ProblemLink {
  slug: string;
  name: string;
  description: string;
  urgency?: 'emergency' | 'high' | 'moderate';
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceTypeHubProps {
  // Core identifiers
  serviceName: string;
  serviceSlug: string;
  type: 'residential' | 'commercial';
  
  // Hero content
  heroImage?: string;
  heroDescription: string;
  
  // Service overview (deep content)
  overview: string;
  overviewImage?: string;
  typeSpecificOverview?: string;
  whyActFast?: string;
  
  // Common causes (links to problem pages)
  commonCauses?: string[];
  problemLinks?: ProblemLink[];
  
  // Health risks (conditional - only for mold, sewage, fire)
  healthRisks?: string[];
  
  // Process
  process: ProcessStep[];
  
  // Gallery images
  galleryImages?: string[];
  
  // Trust signals / Why choose us
  focusAreas: string[];
  challenges?: string;
  
  // FAQs (evergreen, non-city)
  faqs?: FAQItem[];
  
  // Service areas (max 10 Tier-1 city links)
  tier1CityLinks?: RelatedLink[];
  
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const MAX_CITY_LINKS = 10;

// ============================================================================
// COMPONENT
// ============================================================================

export function ServiceTypeHub({
  serviceName,
  serviceSlug,
  type,
  heroImage,
  heroDescription,
  overview,
  overviewImage,
  typeSpecificOverview,
  whyActFast,
  commonCauses,
  problemLinks,
  healthRisks,
  process,
  galleryImages,
  focusAreas,
  challenges,
  faqs,
  tier1CityLinks,
  className = '',
}: ServiceTypeHubProps) {
  const TypeIcon = type === 'residential' ? Home : Building2;
  const typeLabel = type === 'residential' ? 'Residential' : 'Commercial';
  const oppositeType = type === 'residential' ? 'commercial' : 'residential';
  const oppositeLabel = type === 'residential' ? 'Commercial' : 'Residential';
  
  // Hard cap city links at MAX_CITY_LINKS
  const cappedCityLinks = tier1CityLinks?.slice(0, MAX_CITY_LINKS) || [];
  
  // Determine if health risks should be shown (only for certain services)
  const showHealthRisks = healthRisks && healthRisks.length > 0;

  // Build breadcrumbs for this hub page
  const breadcrumbs = [
    { label: serviceName, href: `/${serviceSlug}` },
    { label: typeLabel, href: `/${serviceSlug}/${type}` },
  ];

  return (
    <div className={className}>
      {/* ================================================================== */}
      {/* 1. HERO SECTION - With image, locked H1, no city names */}
      {/* ================================================================== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <OptimizedImage
              src={heroImage}
              alt={generateAltText({ 
                type: 'hero',
                serviceName: `${typeLabel} ${serviceName}`
              })}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />
          </div>
        )}
        
        {/* Fallback gradient if no image */}
        {!heroImage && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        )}

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <Breadcrumbs 
            items={breadcrumbs} 
            className={`mb-6 ${heroImage ? '[&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/60' : ''}`} 
          />
          
            <div className="max-w-3xl">
              {/* Service type badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  heroImage 
                    ? 'bg-white/20 text-white backdrop-blur-sm' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  <TypeIcon className="w-4 h-4" />
                  {typeLabel} Services
                </span>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  heroImage 
                    ? 'bg-green-500/20 text-green-100 backdrop-blur-sm' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  <Clock className="w-4 h-4" />
                  24/7 Emergency
                </span>
              </div>

              {/* Locked H1 - No city names, consistent per hub */}
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
                heroImage ? 'text-white' : 'text-gray-900'
              }`}>
                {typeLabel} {serviceName}
              </h1>

              <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${
                heroImage ? 'text-gray-100' : 'text-gray-600'
              }`}>
                {heroDescription}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href="tel:7866106317"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Call (786) 610-6317
                </a>
                <Link
                  href="/#contact"
                  className={`inline-flex items-center justify-center px-8 py-4 font-bold rounded-lg transition-colors ${
                    heroImage 
                      ? 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 backdrop-blur-sm'
                      : 'bg-white text-primary border-2 border-primary hover:bg-primary/5'
                  }`}
                >
                  Get Free Assessment
                </Link>
              </div>

              {/* Link to opposite type */}
              <Link
                href={`/${serviceSlug}/${oppositeType}`}
                className={`inline-flex items-center gap-2 font-medium transition-colors ${
                  heroImage 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Looking for {oppositeLabel} Services?
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. SERVICE OVERVIEW - Deep pillar content */}
      {/* ================================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left column: optional overview image, heading, and content */}
            <div className="space-y-6">
              {overviewImage && (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                  <OptimizedImage
                    src={overviewImage}
                    alt={generateAltText({
                      type: 'overview',
                      serviceName: `${typeLabel} ${serviceName}`,
                    })}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What is {typeLabel} {serviceName}?
              </h2>
              {/* Main overview content */}
              <div className="prose prose-lg max-w-none text-gray-600">
                {overview.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {/* Type-specific content */}
              {typeSpecificOverview && (
                <div className="mt-6 p-6 bg-primary/5 rounded-xl border border-primary/10">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <TypeIcon className="w-5 h-5 text-primary" />
                    Why {typeLabel} {serviceName.split(' ')[0]} is Different
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {typeSpecificOverview}
                  </p>
                </div>
              )}
            </div>

            {/* Right column: focus areas and why act fast */}
            <div className="space-y-6">
                {/* Focus areas / benefits */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Our {typeLabel} Service Focus
                  </h3>
                  <div className="space-y-3">
                    {focusAreas.map((area, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why act fast */}
                {whyActFast && (
                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                    <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-600" />
                      Why Fast Action Matters
                    </h3>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      {whyActFast}
                    </p>
                  </div>
                )}
              </div>
            
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. COMMON CAUSES - Links to problem pages ONLY (no city links) */}
      {/* ================================================================== */}
      {((commonCauses && commonCauses.length > 0) || (problemLinks && problemLinks.length > 0)) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Common Causes of {serviceName.split(' ')[0]} Issues
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Understanding the root causes helps prevent future problems. Here are the most common issues we address.
                </p>
              </div>
            

            {/* Common causes list */}
            {commonCauses && commonCauses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {commonCauses.slice(0, 12).map((cause, index) => (
                  
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-700 text-sm">{cause}</span>
                    </div>
                  
                ))}
              </div>
            )}

            {/* Problem page links */}
            {problemLinks && problemLinks.length > 0 && (
              <>
                
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
                    Learn More About Specific Issues
                  </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {problemLinks.map((problem, index) => (
                    
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
                    
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 4. HEALTH RISKS - Conditional (mold, sewage, fire only) */}
      {/* ================================================================== */}
      {showHealthRisks && (
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4">
            
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <HeartPulse className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Health Risks & Why Action is Critical
                </h2>
              </div>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                {serviceName} issues can pose serious health risks. Understanding these risks helps you make informed decisions about protecting your {type === 'residential' ? 'family' : 'employees and customers'}.
              </p>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {healthRisks.map((risk, index) => (
                
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-red-200 shadow-sm">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-gray-700">{risk}</span>
                  </div>
                
              ))}
            </div>

            
              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-4">
                  Don't wait until health issues appear. Get a professional assessment today.
                </p>
                <a
                  href="tel:7866106317"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Request Assessment
                </a>
              </div>
            
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 5. OUR PROCESS - Canonical process section */}
      {/* ================================================================== */}
      {process && process.length > 0 && (
        <ServiceProcess
          title={`Our ${typeLabel} ${serviceName} Process`}
          steps={process}
        />
      )}

      {/* ================================================================== */}
      {/* 6. GALLERY - After process (intentional), broader shots */}
      {/* ================================================================== */}
      {galleryImages && galleryImages.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Camera className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Our Work in Action
                  </h2>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  See examples of our professional {serviceName.toLowerCase()} work. We take pride in restoring properties to their pre-damage condition.
                </p>
              </div>
            

            <div className={`grid gap-4 ${
              galleryImages.length === 1 
                ? 'grid-cols-1 max-w-2xl mx-auto' 
                : galleryImages.length === 2 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {galleryImages.slice(0, 6).map((image, index) => (
                
                  <div className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <OptimizedImage
                      src={image}
                      alt={generateAltText({ 
                        type: 'gallery-item',
                        serviceName: `${typeLabel} ${serviceName}`,
                        index
                      })}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                        <Camera className="w-4 h-4" />
                        Professional restoration
                      </span>
                    </div>
                  </div>
                
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 7. WHY CHOOSE US - Trust signals, differentiation */}
      {/* ================================================================== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why {type === 'residential' ? 'Homeowners' : 'Businesses'} Choose Total Care Restoration
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to providing exceptional {serviceName.toLowerCase()} services with professionalism and care.
              </p>
            </div>
          

          {/* Type-specific challenges */}
          {challenges && (
            
              <div className="max-w-3xl mx-auto mb-10 p-6 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-600 text-center leading-relaxed">
                  {challenges}
                </p>
              </div>
            
          )}

          {/* Trust signals grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, text: 'Licensed & Insured', description: 'Fully licensed Florida contractor with comprehensive insurance coverage' },
              { icon: Clock, text: '24/7 Emergency Response', description: 'Available around the clock for urgent restoration needs' },
              { icon: Award, text: 'IICRC Certified', description: 'Industry-certified technicians following best practices' },
              { icon: FileCheck, text: 'Insurance Assistance', description: 'We work directly with your insurance company' },
              { icon: Users, text: 'Local South Florida Team', description: 'Based locally with fast response throughout the region' },
              { icon: Star, text: 'Satisfaction Guaranteed', description: 'We stand behind our work with quality guarantees' },
            ].map((signal, index) => (
              
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <signal.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{signal.text}</h3>
                    <p className="text-sm text-gray-600">{signal.description}</p>
                  </div>
                </div>
              
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. RESIDENTIAL VS COMMERCIAL - Cross-link comparison */}
      {/* ================================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Residential vs Commercial {serviceName}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer specialized services for both residential and commercial properties, each with unique approaches.
              </p>
            </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current type (highlighted) */}
            
              <div className={`p-6 rounded-xl border-2 ${
                type === 'residential' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    type === 'residential' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Residential</h3>
                    {type === 'residential' && (
                      <span className="text-xs text-primary font-semibold">You are here</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Focus on family safety and health
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Personal, compassionate service
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Homeowner insurance guidance
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Protecting belongings and memories
                  </li>
                </ul>
                {type !== 'residential' && (
                  <Link
                    href={`/${serviceSlug}/residential`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    View Residential Services
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            

            {/* Opposite type */}
            
              <div className={`p-6 rounded-xl border-2 ${
                type === 'commercial' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    type === 'commercial' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Commercial</h3>
                    {type === 'commercial' && (
                      <span className="text-xs text-primary font-semibold">You are here</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Minimize business downtime
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Compliance with regulations
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    After-hours service available
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Multi-location coordination
                  </li>
                </ul>
                {type !== 'commercial' && (
                  <Link
                    href={`/${serviceSlug}/commercial`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    View Commercial Services
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. FAQs - Evergreen, non-city specific */}
      {/* ================================================================== */}
      {faqs && faqs.length > 0 && (
        <LocalFAQ
          title={`${serviceName} FAQs`}
          faqs={faqs}
        />
      )}

      {/* ================================================================== */}
      {/* 10. SERVICE AREAS - Hard capped at MAX_CITY_LINKS, Tier-1 only */}
      {/* ================================================================== */}
      {cappedCityLinks.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Where We Provide {typeLabel} {serviceName}
                  </h2>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We serve {type === 'residential' ? 'homeowners' : 'businesses'} throughout South Florida. Select your city for local service information.
                </p>
              </div>
            

            {/* Clean city link grid - navigation aid, not ranking engine */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {cappedCityLinks.map((link, index) => {
                // Extract just the city name from the link label
                const cityName = link.label
                  .replace(serviceName, '')
                  .replace(' in ', '')
                  .replace(typeLabel, '')
                  .trim();
                
                return (
                  
                    <Link
                      href={link.href}
                      className="group block p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-center"
                    >
                      <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {cityName}
                      </span>
                    </Link>
                  
                );
              })}
            </div>

            
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Don't see your city? We likely serve your area.{' '}
                  <a href="tel:7866106317" className="text-primary font-semibold hover:underline">
                    Call us to confirm
                  </a>
                </p>
              </div>
            
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 11. FINAL CTA - Soft, professional, consultation-focused */}
      {/* ================================================================== */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Discuss Your {serviceName} Needs?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Our {type === 'residential' ? 'residential' : 'commercial'} specialists are here to help. 
              Get a free consultation and learn how we can restore your {type === 'residential' ? 'home' : 'property'}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:7866106317"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call (786) 610-6317
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-dark text-white font-bold rounded-lg border-2 border-white/30 hover:bg-primary-dark/80 transition-colors"
              >
                Request Free Consultation
              </Link>
            </div>
          
        </div>
      </section>
    </div>
  );
}
