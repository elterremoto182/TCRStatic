import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import OptimizedImage from '@/components/OptimizedImage';
import { ServiceProcess } from './ServiceProcess';
import { ReviewsSection } from './ReviewsSection';
import { NeighborhoodList } from './NeighborhoodList';
import { LocalFAQ } from './LocalFAQ';
import { LocalCTA } from './LocalCTA';
import { ResidentialBenefits } from './ResidentialBenefits';
import { CommercialBenefits } from './CommercialBenefits';
import { ServiceOverview } from './ServiceOverview';
import { PreventionTips } from './PreventionTips';
import { ServiceVideo } from './ServiceVideo';
import { generateAltText } from '@/lib/seo-utils';
import type { ServiceVideo as ServiceVideoType } from '@/lib/local-seo/data';
import {
  Phone,
  Clock,
  Shield,
  Award,
  FileCheck,
  Home,
  Building2,
  ArrowRight,
  AlertCircle,
  Camera,
  MapPin,
  Briefcase,
  ClipboardCheck,
  Zap,
  BadgeCheck,
  ThumbsUp,
  Wallet,
  Smile,
  CheckCircle,
  Users,
  Heart,
  Wrench,
  Headphones,
  Star,
  CalendarCheck,
  BookOpen,
} from 'lucide-react';
import type { PageContent } from '@/lib/local-seo/templates';
import { getCity, getService } from '@/lib/local-seo/data';
import { getCityTier } from '@/lib/local-seo/city-tiers';
import { getReviewsForCityPage } from '@/lib/local-seo/reviews';

// Map service slugs to their canonical guide slugs
const serviceToGuideMap: Record<string, string> = {
  'water-damage-restoration': 'water-damage-restoration',
  'fire-damage-restoration': 'fire-damage-restoration',
  'mold-remediation': 'mold-remediation',
  'storm-damage-restoration': 'storm-damage-restoration',
  'roof-tarping': 'roof-tarping-shrink-wrapping',
  'shrink-wrapping': 'roof-tarping-shrink-wrapping',
  'sewage-cleanup': 'water-damage-restoration', // Related to water damage
  'emergency-restoration': 'water-damage-restoration', // General emergency falls under water
};

// Informational anchor text variations (non-geo, non-salesy)
const guideAnchorText: Record<string, string> = {
  'water-damage-restoration': 'How water damage restoration works',
  'fire-damage-restoration': 'Understanding the fire damage restoration process',
  'mold-remediation': 'How mold remediation works',
  'storm-damage-restoration': 'Understanding storm damage restoration',
  'roof-tarping-shrink-wrapping': 'How roof tarping and shrink wrapping works',
};

interface CityServicePageProps {
  content: PageContent;
  serviceSlug: string;
  citySlug: string;
  type: 'residential' | 'commercial';
  breadcrumbs: { label: string; href: string }[];
  video?: ServiceVideoType | null;
}

// Icon mapping for trust signals
const iconMap: Record<string, React.ElementType> = {
  Clock,
  Shield,
  Award,
  FileCheck,
  Home,
  Building2,
  Users,
  Heart,
  Phone,
  MapPin,
  Briefcase,
  ClipboardCheck,
  Zap,
  BadgeCheck,
  ThumbsUp,
  Wallet,
  Smile,
  CheckCircle,
};

export function CityServicePage({
  content,
  serviceSlug,
  citySlug,
  type,
  breadcrumbs,
  video,
}: CityServicePageProps) {
  const TypeIcon = type === 'residential' ? Home : Building2;
  const oppositeType = type === 'residential' ? 'commercial' : 'residential';
  const oppositeLabel = type === 'residential' ? 'Commercial' : 'Residential';

  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  const tier = getCityTier(citySlug);
  const { reviews, showGbpLink } = getReviewsForCityPage(
    citySlug,
    city?.name ?? citySlug,
    serviceSlug,
    tier ?? 2
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        {/* Hero Background Image */}
        {content.images?.hero && (
          <div className="absolute inset-0 z-0">
            <OptimizedImage
              src={content.images.hero}
              alt={generateAltText({ 
                type: 'hero',
                serviceName: content.hero.headline.split(' in ')[0],
                cityName: content.hero.headline.split(' in ')[1]?.replace(/, FL$/, '')
              })}
              fill
              sizes="100vw"
              className="object-cover opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/70" />
          </div>
        )}
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  <TypeIcon className="w-4 h-4" />
                  {type === 'residential' ? 'Residential' : 'Commercial'} Services
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  <Clock className="w-4 h-4" />
                  24/7 Emergency
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {content.hero.headline}
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mb-8">
                {content.hero.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={`tel:${content.hero.ctaPhone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6200] text-white font-bold rounded-lg hover:bg-[#E55A00] transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  {content.hero.ctaPhone}
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors"
                >
                  {content.hero.ctaText}
                </Link>
              </div>

              {/* Switch to other type */}
              <Link
                href={`/${serviceSlug}/${oppositeType}/${citySlug}`}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                Looking for {oppositeLabel} services?
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Hero Feature Image */}
            {content.images?.hero && (
              <div>
                <div className="hidden lg:block relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={content.images.hero}
                    alt={generateAltText({ 
                      type: 'service',
                      serviceName: content.hero.headline.split(' in ')[0],
                      cityName: content.hero.headline.split(' in ')[1]?.replace(/, FL$/, '')
                    })}
                    fill
                    sizes="(max-width: 1024px) 0vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                      <Camera className="w-4 h-4" />
                      Professional restoration in action
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* City-Specific Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {content.intro.title}
              </h2>
              {/* Split intro content into paragraphs for better readability */}
              {content.intro.content.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                <p key={`intro-${index}`} className="text-gray-600 text-lg leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              {content.intro.extendedContent && content.intro.extendedContent.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                <p key={`extended-${index}`} className="text-gray-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              {content.intro.localChallenges && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Local Challenges</h3>
                  {content.intro.localChallenges.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                    <p key={`challenges-${index}`} className="text-blue-800 text-sm leading-relaxed mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              <div className="space-y-3 mt-6">
                {content.intro.focusPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
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
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="space-y-6">
                {/* Overview Image */}
                {content.images?.overview && (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg mb-6">
                    <OptimizedImage
                      src={content.images.overview}
                      alt={generateAltText({ 
                        type: 'overview',
                        serviceName: content.intro.title,
                        cityName: content.hero.headline.split(' in ')[1]?.replace(/, FL$/, '')
                      })}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                {type === 'residential' ? (
                  <ResidentialBenefits />
                ) : (
                  <CommercialBenefits />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Risk Factors - City-specific challenges (SEO differentiator) */}
      {content.localFactors && content.localFactors.risks.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-700" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {content.localFactors.title}
                </h2>
              </div>
              
              <p className="text-gray-600 text-lg mb-8 max-w-3xl">
                {content.localFactors.characteristics}. {content.localFactors.climate}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {content.localFactors.risks.map((risk, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-amber-200 shadow-sm">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                  </div>
                  <span className="text-gray-700 font-medium">{risk}</span>
                </div>
              ))}
            </div>

            {/* Seasonal Triggers */}
            {content.localFactors.seasonalTriggers && (
              <div className="p-6 bg-white rounded-xl border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">When Damage Is Most Likely</h3>
                    <p className="text-gray-600">{content.localFactors.seasonalTriggers}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Insurance Notes */}
            {content.localFactors.insuranceNotes && (
              <div className="mt-4 p-6 bg-white rounded-xl border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Local Insurance &amp; HOA Considerations</h3>
                    <p className="text-gray-600">{content.localFactors.insuranceNotes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Service Overview - New Expanded Content */}
      {content.serviceOverview && content.serviceOverview.overview && (
        <ServiceOverview content={content.serviceOverview} />
      )}

      {/* Common Causes - Card-based layout */}
      {content.causes.causes.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                {content.causes.title}
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                We handle all types of damage. Here are the most common issues we see in your area.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.causes.causes.map((cause, index) => (
                <div
                  key={cause.slug}
                  className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {cause.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {cause.description}
                      </p>
                      {cause.urgency === 'emergency' && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          Emergency
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section - Our Work in Action */}
      {content.images?.gallery && content.images.gallery.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Our Work in Action
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                See examples of our professional restoration services. We take pride in restoring properties to their pre-damage condition.
              </p>
            </div>

            <div className={`grid gap-4 ${
              content.images.gallery.length === 1 
                ? 'grid-cols-1 max-w-2xl mx-auto' 
                : content.images.gallery.length === 2 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {content.images.gallery.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <OptimizedImage
                    src={image}
                    alt={generateAltText({ 
                      type: 'gallery-item',
                      serviceName: content.hero.headline.split(' in ')[0],
                      cityName: content.hero.headline.split(' in ')[1]?.replace(/, FL$/, ''),
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

      {/* Reviews Section - before Process */}
      <ReviewsSection
        reviews={reviews}
        cityName={city?.name ?? citySlug}
        serviceName={service?.name ?? serviceSlug}
        showGbpLink={showGbpLink}
      />

      {/* Process Section */}
      <ServiceProcess title={content.process.title} steps={content.process.steps} />

      {/* Service Video - Watch our process in action */}
      {video && (
        <ServiceVideo 
          videoId={video.youtubeId} 
          title={video.title}
          serviceName={content.hero.headline.split(' in ')[0]}
          cityName={content.hero.headline.split(' in ')[1]?.replace(/, FL$/, '')}
        />
      )}

      {/* What to Expect Section - New detailed content section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What to Expect When You Call Us
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Property damage is stressful. Here's what happens when you call us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                    <Headphones className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Immediate Response</h3>
                    <p className="text-gray-600">24/7 availability, every day</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    You'll speak with a trained specialist—not a call center. We gather key details and send a crew your way.
                  </p>
                  <p>
                    Our trucks are fully stocked. We can start work as soon as we arrive.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                    <ClipboardCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Thorough Assessment</h3>
                    <p className="text-gray-600">Professional damage evaluation</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We inspect with thermal cameras and moisture meters. We find visible damage and hidden moisture.
                  </p>
                  <p>
                    We explain what we find and give you a clear cost estimate. We document everything for insurance. We answer your questions before we start.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Wrench className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Professional Restoration</h3>
                    <p className="text-gray-600">Expert execution of repairs</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our IICRC-certified team uses top equipment. We follow proven methods for lasting results.
                  </p>
                  <p>
                    We keep you updated on progress. We work fast to minimize disruption.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Final Walkthrough</h3>
                    <p className="text-gray-600">Your satisfaction guaranteed</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We do a final walkthrough with you. We check that everything meets your standards.
                  </p>
                  <p>
                    We share tips to prevent future issues. We back our work with a quality guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Expertise Section - New content highlighting city-specific knowledge */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Local Expertise</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  We Know {content.neighborhoods.title.replace('Serving ', '').replace(' Neighborhoods', '')} Inside and Out
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We're local and know your area well. We understand Florida's climate and local building styles. Our experience means faster, better results.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Faster Response Times</h4>
                      <p className="text-gray-600 text-sm">
                        We're nearby. We know the fastest routes. We keep equipment ready for quick dispatch.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Local Building Know-How</h4>
                      <p className="text-gray-600 text-sm">
                        We know local building styles and materials. This helps us restore your property right the first time.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Local Connections</h4>
                      <p className="text-gray-600 text-sm">
                        We work with local adjusters, contractors, and suppliers. This speeds up your project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Insurance & Cost Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Direct Insurance Billing</h4>
                      <p className="text-gray-600 text-sm">
                        We bill your insurance directly. Less hassle for you. Our paperwork meets all requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Wallet className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Free Estimates</h4>
                      <p className="text-gray-600 text-sm">
                        Free written estimates. No obligation. No hidden fees.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CalendarCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Flexible Scheduling</h4>
                      <p className="text-gray-600 text-sm">
                        We work around your schedule. {type === 'commercial' ? 'After-hours and weekend service available.' : 'Evenings and weekends available.'} 24/7 emergency service.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <a
                    href="tel:7866106317"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Get Your Free Estimate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Tips - New Section */}
      {content.preventionTips && content.preventionTips.tips.length > 0 && (
        <PreventionTips content={content.preventionTips} />
      )}

      {/* Neighborhoods */}
      <NeighborhoodList
        title={content.neighborhoods.title}
        neighborhoods={content.neighborhoods.neighborhoods}
        zipCodes={content.neighborhoods.zipCodes}
        cityName={content.neighborhoods.title.replace('Serving ', '').replace(' Neighborhoods', '')}
      />

      {/* Trust Signals */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
              {content.trustSignals.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.trustSignals.signals.map((signal, index) => {
              const IconComponent = iconMap[signal.icon] || Shield;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-gray-800 font-medium">{signal.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <LocalFAQ 
        title={content.faq.title} 
        faqs={content.faq.faqs} 
        localFAQs={content.localFAQs}
      />

      {/* Canonical Guide Link - Single informational link to pillar content */}
      {serviceToGuideMap[serviceSlug] && (
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <Link
              href={`/guides/${serviceToGuideMap[serviceSlug]}/`}
              className="group flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">
                {guideAnchorText[serviceToGuideMap[serviceSlug]] || 'Learn more about this service'}
              </span>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <LocalCTA
        headline={content.cta.headline}
        subheadline={content.cta.subheadline}
        primaryButton={content.cta.primaryButton}
        secondaryButton={content.cta.secondaryButton}
      />
    </div>
  );
}

