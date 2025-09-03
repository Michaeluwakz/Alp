
"use client";

import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const allProjects: Project[] = [
  {
    id: 'kitchen-video-1',
    title: 'Kitchen Transformation Showcase',
    category: 'Kitchens',
    imageSrc: 'https://placehold.co/600x450.png',
    imageHint: 'kitchen tour',
    videoSrc: 'https://player.vimeo.com/video/1094515394?h=808a0e259e&badge=0&autopause=0&player_id=0&app_id=58479',
  },
  { id: 'kitchen-img-showcase-1', title: 'Modern Kitchen Showcase 1', category: 'Kitchens', imageSrc: 'https://i.ibb.co/BVBW85qM/image.png', imageHint: 'modern kitchen' },
  { id: 'kitchen-img-showcase-2', title: 'Sleek Kitchen Showcase', category: 'Kitchens', imageSrc: 'https://i.ibb.co/MxqjF4Gh/image.png', imageHint: 'sleek kitchen' },
  { id: 'kitchen-img-showcase-3', title: 'Minimalist Kitchen View', category: 'Kitchens', imageSrc: 'https://i.ibb.co/C58TqdGW/image.png', imageHint: 'minimalist kitchen' },
  { id: 'kitchen-img-tphnmdls', title: 'Detailed Kitchen Design', category: 'Kitchens', imageSrc: 'https://i.ibb.co/tPHNMDLs/image.png', imageHint: 'kitchen detail' },
  { id: 'kitchen-img-xsbcm7bb-set2', title: 'Bright Kitchen Space Design', category: 'Kitchens', imageSrc: 'https://i.ibb.co/xSbcm7Bb/image.png', imageHint: 'bright kitchen' },
  { id: 'kitchen-img-jw1p3jhp-set2', title: 'Modern Kitchen Detail View', category: 'Kitchens', imageSrc: 'https://i.ibb.co/JW1p3JhP/image.png', imageHint: 'kitchen detail' },
  { id: 'kitchen-img-w4g6vchy-set2', title: 'Elegant Kitchen Interior View', category: 'Kitchens', imageSrc: 'https://i.ibb.co/W4g6VcHy/image.png', imageHint: 'elegant kitchen' },
  { id: 'kitchen-img-cfhvvgY-set2', title: 'Stylish Kitchen Setup Design', category: 'Kitchens', imageSrc: 'https://i.ibb.co/CFHvVGY/image.png', imageHint: 'stylish kitchen' },
  { id: 'lr-img-MybRfYh1', title: 'Elegant Living Space', category: 'Living Rooms', imageSrc: 'https://i.ibb.co/MybRfYh1/image.png', imageHint: 'elegant living' },
  { id: 'lr-img-pvBT2tkw', title: 'Modern Comfort Living', category: 'Living Rooms', imageSrc: 'https://i.ibb.co/pvBT2tkw/image.png', imageHint: 'modern living' },
  { id: 'lr-img-JR1KqgbR', title: 'Bright Living Area', category: 'Living Rooms', imageSrc: 'https://i.ibb.co/JR1KqgbR/image.png', imageHint: 'bright living' },
  { id: 'lr-img-whBCdK83', title: 'Stylish Living Room Design', category: 'Living Rooms', imageSrc: 'https://i.ibb.co/whBCdK83/image.png', imageHint: 'stylish living' },
  { id: 'lr-img-tPHNMDLs-living', title: 'Cozy Living Room Corner', category: 'Living Rooms', imageSrc: 'https://i.ibb.co/tPHNMDLs/image.png', imageHint: 'cozy corner' },
  { id: 'lr-img-Kcm6nCwL', title: 'Spacious Living Design', category: 'Living Rooms', imageSrc: 'https://i.ibb.co/Kcm6nCwL/image.png', imageHint: 'spacious living' },
  { id: 'lr-img-bg7PQ6jY', title: 'Contemporary Living Setup', category: 'Living Rooms', imageSrc: 'https://i.ibb.co/bg7PQ6jY/image.png', imageHint: 'contemporary living' },
  { id: 'lr-img-CpHLRQSx', title: 'Luxury Living Interior', category: 'Living Rooms', imageSrc: 'https://i.ibb.co/CpHLRQSx/image.png', imageHint: 'luxury living' },
  {
    id: 'bedroom-video-1',
    title: 'Bedroom Design Tour',
    category: 'Bedrooms',
    imageSrc: 'https://placehold.co/600x450.png',
    imageHint: 'bedroom tour',
    videoSrc: 'https://player.vimeo.com/video/1094527178?h=6edd603206&badge=0&autopause=0&player_id=0&app_id=58479',
  },
  { id: 'bedroom-img-z1zdrdp', title: 'Serene Master Bedroom', category: 'Bedrooms', imageSrc: 'https://i.ibb.co/Z1zDrdpP/image.png', imageHint: 'serene bedroom' },
  { id: 'bedroom-img-j9qkf9r', title: 'Modern Bedroom Aesthetics', category: 'Bedrooms', imageSrc: 'https://i.ibb.co/j9Qkf9RX/image.png', imageHint: 'modern bedroom' },
  { id: 'bedroom-img-x8cqr7k', title: 'Elegant Bedroom Details', category: 'Bedrooms', imageSrc: 'https://i.ibb.co/x8Cqr7k9/image.png', imageHint: 'elegant bedroom' },
  { id: 'wardrobe-img-LqXxsRc', title: 'Spacious Wardrobe Design', category: 'Wardrobes', imageSrc: 'https://i.ibb.co/LqXxsRc/image.png', imageHint: 'spacious wardrobe' },
  { id: 'wardrobe-img-6cZFg5XN', title: 'Modern Closet System', category: 'Wardrobes', imageSrc: 'https://i.ibb.co/6cZFg5XN/image.png', imageHint: 'modern closet' },
  { id: 'wardrobe-img-LzHYmDw1', title: 'Walk-in Wardrobe Luxury', category: 'Wardrobes', imageSrc: 'https://i.ibb.co/LzHYmDw1/image.png', imageHint: 'luxury walk-in' },
  { id: 'wardrobe-img-2bGD7TB', title: 'Organized Wardrobe Space', category: 'Wardrobes', imageSrc: 'https://i.ibb.co/2bGD7TB/image.png', imageHint: 'organized wardrobe' },
  { id: 'wardrobe-img-CKtyVDcS', title: 'Sleek Wardrobe Finish', category: 'Wardrobes', imageSrc: 'https://i.ibb.co/CKtyVDcS/image.png', imageHint: 'sleek wardrobe' },
  { id: 'wardrobe-img-xtxsmq8f', title: 'Custom Wardrobe Solution', category: 'Wardrobes', imageSrc: 'https://i.ibb.co/xtxsmq8f/image.png', imageHint: 'custom wardrobe' },
  { id: 'commercial-img-fVTPGZMj', title: 'Modern Office Space', category: 'Commercial', imageSrc: 'https://i.ibb.co/fVTPGZMj/image.png', imageHint: 'office space' },
  { id: 'commercial-img-RTScjX6r', title: 'Retail Store Interior', category: 'Commercial', imageSrc: 'https://i.ibb.co/RTScjX6r/image.png', imageHint: 'retail interior' },
  { id: 'commercial-img-FkPYvJZ7', title: 'Restaurant Ambiance', category: 'Commercial', imageSrc: 'https://i.ibb.co/FkPYvJZ7/image.png', imageHint: 'restaurant design' },
  { id: 'commercial-img-Vc6fWghJ', title: 'Hotel Lobby Design', category: 'Commercial', imageSrc: 'https://i.ibb.co/Vc6fWghJ/image.png', imageHint: 'hotel lobby' },
  { id: 'commercial-img-9kQvyGm3', title: 'Creative Studio Space', category: 'Commercial', imageSrc: 'https://i.ibb.co/9kQvyGm3/image.png', imageHint: 'studio space' },
  { id: 'pop-img-1', title: 'POP Design Ceiling', category: 'POP', imageSrc: 'https://i.ibb.co/r2kfb0Ns/image.png', imageHint: 'pop ceiling' },

];

const categories = ['All', ...new Set(allProjects.map(p => p.category))];

export default function ProjectPortfolio({ id }: { id: string }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(project => project.category === selectedCategory);

  return (
    <section id={id} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-extrabold text-foreground sm:text-5xl">Our Portfolio</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            A glimpse into the spaces we've transformed.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'text-accent border-accent hover:bg-accent hover:text-accent-foreground'} transition-colors`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <Card key={project.id} className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card">
              <div className="relative w-full">
                {project.videoSrc ? (
                  <div className="relative w-full" style={{ paddingTop: '75%' /* 4:3 Aspect Ratio */ }}>
                    <iframe
                      src={project.videoSrc}
                      title={project.title}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-lg"
                      data-ai-hint={project.imageHint}
                    />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-headline text-xl font-semibold text-white">{project.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <p className="text-center text-foreground/70 mt-8">No projects found for this category.</p>
        )}
      </div>
    </section>
  );
}

