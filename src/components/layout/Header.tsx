
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Briefcase, Sparkles, Users, Brain, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { href: '#services', label: 'Services', icon: Briefcase },
  { href: '#portfolio', label: 'Portfolio', icon: Sparkles },
  { href: '#why-choose-us', label: 'Why Us', icon: Users },
  { href: '#style-quiz', label: 'Style Quiz', icon: Brain },
  { href: '#contact', label: 'Contact', icon: MessageCircle },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="https://i.ibb.co/0VXkWx18/APARTMENT-6.png" alt="Apholaby Logo" width={40} height={40} className="h-10 w-10 text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">Apholaby</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                 <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image src="https://i.ibb.co/0VXkWx18/APARTMENT-6.png" alt="Apholaby Logo" width={36} height={36} className="h-9 w-9 text-primary" />
                    <span className="font-headline text-xl font-bold text-foreground">Apholaby</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6 text-foreground" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-3 rounded-md p-2 text-base font-medium text-foreground/90 hover:bg-secondary hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
