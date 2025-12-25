"use client";

import { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import ImageLayout from '@/components/ImageLayout';
import InfiniteMenu from '@/components/InfiniteMenu';
import EventsHeroSection from '@/components/EventsHero';
import Navbar from '@/components/Navbar';
import FullImageHero from '@/components/FullImageHero';
import EventsWeServe from '@/components/EventsHero';
import PackageCollage from '@/components/PackageCollage';
import SeasonalSpecials from '@/components/SeasonalSpecials'; 
import Footer from '@/components/Footer';

export default function Home() {
  const storyRef = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(storyRef, { once: true, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.6 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Modern & classic cocktail photos data
  const cocktails = [
    {
      id: 1,
      name: "Vintage Old Fashioned",
      description: "A timeless classic with premium bourbon",
      year: "1880",
      color: "from-amber-900/40 to-yellow-900/30",
      border: "border-amber-300/30"
    },
    {
      id: 2,
      name: "Artisan Martini",
      description: "Perfectly chilled with a lemon twist",
      year: "1860",
      color: "from-emerald-900/40 to-teal-900/30",
      border: "border-emerald-300/30"
    },
    {
      id: 3,
      name: "Signature Negroni",
      description: "Bold Italian aperitif",
      year: "1919",
      color: "from-red-900/40 to-rose-900/30",
      border: "border-red-300/30"
    },
    {
      id: 4,
      name: "Classic Manhattan",
      description: "New York sophistication",
      year: "1870",
      color: "from-purple-900/40 to-indigo-900/30",
      border: "border-purple-300/30"
    },
    {
      id: 5,
      name: "Elegant Champagne Cocktail",
      description: "Bubbles with a touch of cognac",
      year: "1860",
      color: "from-gold-900/40 to-yellow-900/30",
      border: "border-yellow-300/30"
    },
    {
      id: 6,
      name: "Herbal Sazerac",
      description: "New Orleans original with rye",
      year: "1850",
      color: "from-green-900/40 to-emerald-900/30",
      border: "border-green-300/30"
    }
  ];

  // Use every unique image from /public exactly once
  const collageImages = useMemo(() => Array.from(new Set([
    '/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg', '/6.jpg', '/7.jpg',
    '/8.jpg', '/9.jpg', '/10.jpg', '/11.jpg', '/12.jpg', '/13.jpg'
  ])), []);

  // Fixed placement array - no randomization on reload
  const collageItems = useMemo(() => {
    const placements = [
      { top: 8, left: 8, width: 24, rotation: 3 },
      { top: 12, left: 30, width: 22, rotation: -2 },
      { top: 18, left: 55, width: 25, rotation: 4 },
      { top: 25, left: 75, width: 21, rotation: -3 },
      { top: 35, left: 12, width: 23, rotation: 2 },
      { top: 42, left: 40, width: 24, rotation: -1 },
      { top: 48, left: 65, width: 22, rotation: 3 },
      { top: 58, left: 20, width: 25, rotation: -2 },
      { top: 65, left: 50, width: 23, rotation: 1 },
      { top: 72, left: 72, width: 24, rotation: -3 },
      { top: 78, left: 8, width: 21, rotation: 2 },
      { top: 85, left: 38, width: 26, rotation: -1 },
      { top: 88, left: 68, width: 22, rotation: 3 },
    ];
    return collageImages.map((src, i) => ({
      src,
      ...placements[i % placements.length],
      delay: i * 0.06,
    }));
  }, [collageImages]);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    const startX = event.clientX;
    const initialIndex = currentIndex;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newIndex = Math.round(initialIndex - deltaX / 100); 
      setCurrentIndex(Math.max(0, Math.min(newIndex, cocktails.length - 1)));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden text-white">
        {/* Background Video */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute h-full w-full object-cover"
            poster="/videos/Project.mp4"
          >
            <source src="/videos/Project.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
          <div
            className="text-center space-y-0 mt-0"
            style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
          >
          
            <h1 className="text-3xl md:text-5xl leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)] mt-0 mb-0">
              Curated cocktails and classy service for every occasion.
            </h1>
            <div className="mx-auto h-px w-24 bg-amber-300/80" />
          </div>
        </section>

        {/* Full-width hero section */}

        <div className="relative z-20 w-full" style={{ background: 'linear-gradient(135deg, #fffbe6 0%, #f7e7ce 60%, #e6c77f 100%)' }}>
          <FullImageHero />
        </div>

        {/* About Section (ImageLayout) */}
        <section id="about">
          <ImageLayout />
        </section>

        {/* Events Section (EventsHero) */}
        <section id="events">
          <EventsHeroSection />
        </section>

        <SeasonalSpecials />

        {/* Packages Section (PackageCollage) */}
        <section id="packages">
          <PackageCollage />
        </section>

        {/* Contact Section (Footer) */}
        <section id="contact">
          <Footer />
        </section>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
          
          html {
            scroll-behavior: smooth;
          }
          
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #fbbf24, #92400e);
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #f59e0b, #78350f);
          }
          
          .shine-effect {
            position: relative;
            overflow: hidden;
          }
          
          .shine-effect::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to right,
              transparent 20%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 80%
            );
            transform: rotate(30deg);
            animation: shine 3s infinite;
          }
          
          @keyframes shine {
            0% { transform: translateX(-100%) rotate(30deg); }
            100% { transform: translateX(100%) rotate(30deg); }
          }
        `}</style>
      </main>
    </>
  );
}