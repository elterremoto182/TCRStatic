import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { BlogCardSkeleton } from '@/components/ui/loading-skeleton';

export default function Loading() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 md:pb-28 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
