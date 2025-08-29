import type { ValuePropositionItem } from '@/types';
import { Award, Palette, Users, Clock3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const values: ValuePropositionItem[] = [
  { id: 'bespoke', icon: Palette, title: 'Bespoke Designs', description: 'Every design is uniquely tailored to your personal style, preferences, and the specific needs of your space.' },
  { id: 'quality', icon: Award, title: 'Quality Materials', description: 'We source only the finest materials and work with skilled craftsmen to ensure lasting beauty and durability.' },
  { id: 'timely', icon: Clock3, title: 'Timely Delivery', description: 'Our efficient project management ensures your project is completed on schedule, without compromising on quality.' },
  { id: 'customer', icon: Users, title: 'Customer-Centric', description: 'Your satisfaction is our ultimate goal. We collaborate closely with you at every step of the design journey.' },
];

export default function WhyChooseUsSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-extrabold text-foreground sm:text-5xl">Why Choose Apholaby?</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Experience the difference of truly personalized and high-quality interior design.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.id} className="text-center bg-card shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
              <CardHeader className="p-6 items-center">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                  <value.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-card-foreground">{value.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-card-foreground/80">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
