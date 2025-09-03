import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, Eye, Heart, Star, Award, Users, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-headline text-4xl font-extrabold text-foreground sm:text-5xl mb-6">
                About Us
              </h1>
              <p className="text-lg text-foreground/80 max-w-4xl mx-auto leading-relaxed">
                At Apholaby Enterprises Ltd, we believe that every space tells a story — and we are passionate about creating homes and commercial spaces that inspire comfort, style, and functionality. Established with a commitment to quality craftsmanship and customer satisfaction, we have grown into a trusted name in general home contracting and interior solutions across Nigeria.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  With years of hands-on experience, our team specializes in residential and commercial projects, blending modern design with durable construction practices. From concept to completion, we ensure that every detail reflects excellence, whether we're building from the ground up or transforming existing spaces.
                </p>
              </div>

              {/* What We Do Section */}
              <div className="mb-16">
                <h2 className="font-headline text-3xl font-bold text-foreground mb-8 text-center">
                  What We Do
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-card-foreground">
                        <Award className="h-6 w-6 text-primary" />
                        General Home Contracting
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground/80">
                        Delivering reliable building solutions tailored to your needs.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-card-foreground">
                        <Star className="h-6 w-6 text-primary" />
                        Interior & Exterior Design
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground/80">
                        Bringing creativity and elegance to kitchens, wardrobes, living rooms, and offices.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-card-foreground">
                        <Lightbulb className="h-6 w-6 text-primary" />
                        Custom Furniture & Finishing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground/80">
                        From TV consoles and sideboards to POP ceilings, we design with precision.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-card-foreground">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        Doors & Fittings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground/80">
                        Offering premium imported entrance doors and stylish interior doors that combine security with beauty.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Mission, Vision, Values */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Mission */}
                <Card className="bg-card shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-card-foreground">
                      <Target className="h-6 w-6 text-primary" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground/80">
                      To provide homeowners and businesses with innovative, reliable, and affordable contracting and interior solutions that enhance everyday living and working experiences.
                    </p>
                  </CardContent>
                </Card>

                {/* Vision */}
                <Card className="bg-card shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-card-foreground">
                      <Eye className="h-6 w-6 text-primary" />
                      Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground/80">
                      To be the leading choice in Nigeria and beyond for home contracting and interior excellence, recognized for quality, trust, and creativity.
                    </p>
                  </CardContent>
                </Card>

                {/* Values */}
                <Card className="bg-card shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-card-foreground">
                      <Heart className="h-6 w-6 text-primary" />
                      Our Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">
                        <Star className="h-3 w-3 mr-1" />
                        Excellence
                      </Badge>
                      <p className="text-sm text-card-foreground/80">
                        We never compromise on quality.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Integrity
                      </Badge>
                      <p className="text-sm text-card-foreground/80">
                        We keep our promises and deliver with transparency.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        Innovation
                      </Badge>
                      <p className="text-sm text-card-foreground/80">
                        We blend creativity with functionality in every project.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        Customer Focus
                      </Badge>
                      <p className="text-sm text-card-foreground/80">
                        Your satisfaction is at the heart of everything we do.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
