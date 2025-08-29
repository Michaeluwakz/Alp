import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[600px] w-full flex items-center justify-center text-center">
      <Image
        src="https://i.ibb.co/dsnHGnMN/Untitled-design-1.png"
        alt="Luxurious modern interior design"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="absolute inset-0 z-0"
        data-ai-hint="modern interior"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-md">
          Apholaby Bespoke Interiors
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl drop-shadow-sm">
          Crafting unique and inspiring interiors tailored to your vision. We bring your dream spaces to life with creativity and precision.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#contact">
            <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
              Get a Quote
            </Button>
          </Link>
          <Link href="#portfolio">
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 text-lg">
              View Our Work
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
