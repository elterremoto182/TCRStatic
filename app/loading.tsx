import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export default function Loading() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-600">Loading...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
