import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTAButton from '@/components/shared/FloatingCTAButton';
import HeroSection from '@/components/sections/HeroSection';
import ServiceShowcase from '@/components/sections/ServiceShowcase';
import ProjectPortfolio from '@/components/sections/ProjectPortfolio';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import StyleQuizSection from '@/components/sections/StyleQuizSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServiceShowcase id="services" />
        <ProjectPortfolio id="portfolio" />
        <WhyChooseUsSection id="why-choose-us" />
        <StyleQuizSection id="style-quiz" />
        <ContactSection id="contact" />
      </main>
      <FloatingCTAButton />
      <Footer />
    </div>
  );
}
