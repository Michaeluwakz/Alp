
import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Building, Lamp, Wrench, Sparkles } from 'lucide-react';

const servicesData: Service[] = [
  { id: 'residential', icon: Home, title: 'Residential Design', description: 'Creating beautiful and functional living spaces tailored to your lifestyle.', imageSrc: 'https://decorcity.com.ng/wp-content/uploads/2023/05/Residential-Living-Room-Interior-Design-by-Decor-City-Nigeria-03.jpg', imageHint: 'living room' },
  { id: 'commercial', icon: Building, title: 'Commercial Spaces', description: 'Designing inspiring and productive environments for businesses and organizations.', imageSrc: 'https://thearchitectsdiary.com/wp-content/uploads/2023/11/Interior-design-5-jpg.webp', imageHint: 'office interior' },
  { id: 'lighting', icon: Lamp, title: 'Lighting Design', description: 'Expert lighting solutions to enhance ambiance and functionality in any room.', imageSrc: 'https://i.pinimg.com/736x/61/b5/fe/61b5fe8feccabe7cbbf69b9de0c06cc5.jpg', imageHint: 'modern lighting' },
  { id: 'renovations', icon: Wrench, title: 'Renovations', description: 'Transforming existing spaces with innovative renovation and remodeling services.', imageSrc: 'https://www.bigsteelbox.com/wp-content/uploads/2019/11/Home-renovation-costs-2100x1200.jpg', imageHint: 'kitchen renovation' },
  { id: 'styling', icon: Sparkles, title: 'Styling & Decor', description: 'Adding the perfect finishing touches with curated decor and styling expertise.', imageSrc: 'https://decorcity.com.ng/wp-content/uploads/2023/05/Residential-Living-Room-Interior-Design-by-Decor-City-Nigeria-02.jpg', imageHint: 'home decor' },
];

export default function ServiceShowcase({ id }: { id: string }) {
  return (
    <section id={id} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-extrabold text-foreground sm:text-5xl">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            From concept to completion, we offer a comprehensive range of interior design services.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <Card key={service.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card group">
              <div className="relative h-56 w-full">
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={service.imageHint}
                />
              </div>
              <CardHeader className="p-6">
                <div className="flex items-center gap-4 mb-2">
                  <service.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="font-headline text-2xl text-card-foreground">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow">
                <p className="text-card-foreground/80">{service.description}</p>
              </CardContent>
              <CardFooter className="p-6 bg-card">
                <Link href="#contact" className="w-full">
                  <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Inquire Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
