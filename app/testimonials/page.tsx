import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Star, Quote, Home } from 'lucide-react';
import { generatePageMetadata } from '@/lib/utils';
import content from '@/config/content.json';

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Customer Reviews & Testimonials - Total Care Restoration',
    description: 'Read what our customers say about Total Care Restoration. Real reviews from homeowners and property owners in South Florida who trust us for water damage, mold remediation, and fire restoration.',
    keywords: ['testimonials', 'reviews', 'customer reviews', 'Total Care Restoration reviews', 'water damage reviews', 'mold remediation reviews'],
    path: '/testimonials',
  });
}

export default function TestimonialsPage() {
  const { testimonials } = content;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-8">
              <Breadcrumbs items={[{ label: 'Testimonials', href: '/testimonials' }]} className="mb-6" />
              <Link
                href="/"
                className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                What Our Clients Say
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Don't just take our word for it — hear from homeowners and property owners 
                across South Florida who trust Total Care Restoration for their restoration needs.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <article 
                  key={testimonial.id} 
                  className="group relative bg-white p-8 md:p-10 rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white fill-current" />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center mb-6 pt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-accent fill-current"
                      />
                    ))}
                    <span className="ml-3 text-sm font-medium text-gray-500">
                      5.0 Rating
                    </span>
                  </div>

                  {/* Full Content */}
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-8">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <footer className="flex items-center border-t border-gray-100 pt-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                      <span className="text-xl font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="font-bold text-gray-900 not-italic text-lg">
                        {testimonial.name}
                      </cite>
                      <p className="text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Our Service?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join hundreds of satisfied customers across South Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get a Free Estimate
              </Link>
              <Link
                href="tel:+17866106317"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Call (786) 610-6317
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

