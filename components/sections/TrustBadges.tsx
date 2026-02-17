import OptimizedImage from '@/components/OptimizedImage';
import { Shield, Award, CheckCircle, BadgeCheck, FileCheck, Users, type LucideIcon } from 'lucide-react';
import { generateAltText } from '@/lib/seo-utils';
import content from '@/config/content.json';

// Map icon names to components for badges that don't have images
const badgeIconMap: Record<string, LucideIcon> = {
  Shield,
  Award,
  CheckCircle,
  BadgeCheck,
};

export function TrustBadges() {
  const branding = (content as any).branding;

  // Default badges with icons if not provided in config
  const defaultBadges = [
    {
      name: 'Licensed & Insured',
      icon: Shield,
      description: 'Fully licensed and insured for your protection',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      iconColor: 'text-blue-600',
      image: '',
    },
    {
      name: 'BBB Accredited',
      icon: Award,
      description: 'Better Business Bureau accredited business',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      iconColor: 'text-yellow-600',
      image: '',
    },
    {
      name: 'Certified Professional',
      icon: BadgeCheck,
      description: 'Industry certified technicians',
      color: 'bg-green-50 border-green-200 text-green-700',
      iconColor: 'text-green-600',
      image: '',
    },
    {
      name: 'Satisfaction Guaranteed',
      icon: CheckCircle,
      description: '100% satisfaction guarantee',
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      iconColor: 'text-purple-600',
      image: '',
    },
  ];

  const badges = branding?.badges && branding.badges.length > 0 
    ? branding.badges.map((badge: any, index: number) => ({
        ...defaultBadges[index % defaultBadges.length],
        ...badge, // Config badges override defaults
      }))
    : defaultBadges;

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Trusted & Certified
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Your peace of mind is our priority. We're fully licensed, insured, and committed to excellence.
          </p>
          
          {/* License Numbers - Prominently Displayed */}
          <div className="inline-flex items-center gap-6 bg-white px-8 py-6 rounded-xl border-2 border-primary shadow-lg mb-16">
            <FileCheck className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="text-left space-y-2">
              <p className="text-sm text-gray-600 font-medium">Licensed • Insured • IICRC Certified Firm</p>
              <p className="text-base font-bold text-gray-900">Florida Mold Remediator License #MRSR2596</p>
              <p className="text-base font-bold text-gray-900">IICRC Certified Firm #219076</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge: any, index: number) => {
            const IconComponent = badge.icon || Shield;
            const hasImage = badge.image && badge.image !== '';

            return (
              <div 
                key={index} 
                className={`bg-white rounded-xl border-2 ${badge.color || 'border-gray-200'} p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex flex-col items-center text-center">
                  {hasImage ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-md mb-4 group-hover:shadow-lg transition-shadow duration-200 border-2 border-gray-100">
                      <OptimizedImage
                        src={badge.image}
                        alt={generateAltText({ type: 'badge', badgeName: badge.name })}
                        width={80}
                        height={80}
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className={`w-20 h-20 rounded-full ${badge.color || 'bg-primary/10'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-10 h-10 ${badge.iconColor || 'text-primary'}`} />
                    </div>
                  )}
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {badge.name}
                  </h3>
                  {badge.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {badge.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-900">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-medium">1000+ Satisfied Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <span className="font-medium">10+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">24/7 Emergency Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
