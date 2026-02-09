import { YouTubeFacade } from '@/components/YouTubeFacade';
import { Play, Phone, Clock, BadgeCheck } from 'lucide-react';

interface ServiceVideoProps {
  videoId: string;
  title?: string;
  serviceName?: string;
  cityName?: string;
}

/**
 * A reusable video component for service and city pages.
 * Wraps YouTubeFacade with consistent styling, heading, and context.
 */
export function ServiceVideo({ 
  videoId, 
  title = 'Service Video',
  serviceName,
  cityName,
}: ServiceVideoProps) {
  // Generate contextual heading based on service
  const getHeading = () => {
    if (serviceName?.toLowerCase().includes('mold')) {
      return 'See Our Mold Remediation Process';
    }
    if (serviceName?.toLowerCase().includes('water')) {
      return 'Watch Our Water Damage Restoration Process';
    }
    if (serviceName?.toLowerCase().includes('fire')) {
      return 'See Our Fire Damage Restoration in Action';
    }
    if (serviceName?.toLowerCase().includes('roof') || serviceName?.toLowerCase().includes('tarp')) {
      return 'Watch Our Professional Roof Protection';
    }
    return 'See Our Restoration Process in Action';
  };

  const getDescription = () => {
    if (serviceName?.toLowerCase().includes('mold')) {
      return 'Watch how our IICRC-certified team safely contains, removes, and treats mold. See the professional equipment and techniques we use to protect your property and health.';
    }
    if (serviceName?.toLowerCase().includes('water')) {
      return 'See how we extract water, dry structures, and prevent mold growth. Our team uses industrial equipment to restore your property quickly and thoroughly.';
    }
    if (serviceName?.toLowerCase().includes('fire')) {
      return 'Watch our comprehensive approach to fire and smoke damage restoration. From debris removal to odor elimination, see how we restore properties to pre-loss condition.';
    }
    if (serviceName?.toLowerCase().includes('roof') || serviceName?.toLowerCase().includes('tarp')) {
      return 'See how we professionally secure and protect damaged roofs. Our team installs heavy-duty protection that withstands Florida weather conditions.';
    }
    return 'Watch our professional restoration team in action. See the equipment, techniques, and attention to detail we bring to every project.';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-4">
            <Play className="w-4 h-4" />
            <span className="font-semibold text-sm">Video</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getHeading()}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {getDescription()}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Video container with enhanced styling */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <YouTubeFacade videoId={videoId} title={title} />
            
            {/* Bottom gradient overlay with trust badges */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 pointer-events-none">
              <div className="flex items-center justify-center gap-4 text-white/90 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4" />
                  Real restoration footage
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Professional techniques
                </span>
              </div>
            </div>
          </div>

          {/* CTA below video */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Have questions about our process?{cityName ? ` We serve ${cityName} and surrounding areas.` : ''}
            </p>
            <a
              href="tel:7866106317"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              <Phone className="w-5 h-5" />
              Call for a Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
