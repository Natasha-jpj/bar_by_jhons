"use client"

import { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function Home() {
  const storyRef = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(storyRef, { once: true, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.6 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Hide the header while the hero is visible
  useEffect(() => {
    if (heroInView) {
      document.body.classList.add('hide-header');
    } else {
      document.body.classList.remove('hide-header');
    }

    return () => {
      document.body.classList.remove('hide-header');
    };
  }, [heroInView]);

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

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    const startX = event.clientX;
    const initialIndex = currentIndex;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newIndex = Math.round(initialIndex - deltaX / 100); // Adjust 100 based on your image width
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
          <div className="flex justify-center">
            <Image
              src="/logooo.png"
              alt="Bar by John's Logo"
              width={240}
              height={240}
              className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] m-0 p-0"
              priority
              style={{padding:0,margin:0}}
            />
          </div>

          <p className="text-base md:text-lg uppercase tracking-[0.35em] text-amber-200 mt-0 mb-0">Bar by John's</p>
          <h1 className="text-3xl md:text-5xl leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)] mt-0 mb-0">
            Curated cocktails and classy service for every occasion.
          </h1>
          <div className="mx-auto h-px w-24 bg-amber-300/80" />
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="relative z-10 px-8 overflow-hidden flex items-center justify-center min-h-screen">
        
        <div className="relative mx-auto max-w-5xl text-center px-4">
          <motion.p 
            className="text-base md:text-lg uppercase tracking-[0.35em] text-amber-300 font-light mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.p>

          <motion.p 
            className="text-2xl md:text-4xl leading-relaxed text-white/90"
            style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
          >
            {isInView && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {"With over fifteen years of experience in the hospitality industry, from bartender to bar manager we have perfected the art of mixology, delivering exceptional service and thoughtfully curated cocktails that transform moments into lasting memories.".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02, duration: 0.1 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            )}
          </motion.p>
        </div>
      </section>

      {/* Menu Card Section */}
      {/* <section className="relative z-5 w-full overflow-hidden bg-black/40 py-24">
        <motion.div
          className="relative w-full h-screen md:h-screen"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src="/menu.jpg"
            alt="Bar by John's Menu"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>
      </section> */}

      {/* Full Page Photo Collage - Overlap */}
      <section className="relative z-10 w-full min-h-screen overflow-hidden px-4 py-32">
        <div className="relative w-full min-h-[60vh] flex items-center justify-center">
          {collageItems.map((item, i) => (
            <motion.div
              key={`${item.src}-${i}`}
              className="absolute overflow-hidden rounded-2xl shadow-2xl border border-amber-300/20 bg-black/30 backdrop-blur-[1px]"
              style={{
                top: `${Math.max(15, Math.min(70, item.top))}%`,
                left: `${item.left}%`,
                width: `${item.width}vw`,
                maxWidth: 360,
                minWidth: 180,
                transform: `rotate(${item.rotation}deg)`,
                zIndex: 10 + i,
              }}
              initial={{ opacity: 0, scale: 0.6, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 1.2, type: 'spring', stiffness: 120, damping: 30 }}
              whileHover={{ scale: 1, rotate: 0, zIndex: 80 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={item.src}
                  alt={`Cocktail collage ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 36vw"
                  className="object-cover"
                  priority={i < 6}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/35 via-black/20 to-black/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gold Card Section */}
      <section
        className="relative z-10 w-full min-h-screen overflow-hidden px-0 py-20 flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #c3aa4b 18%, #c3aa4b 100%)' }}
      >
        <motion.div
          className="relative w-full max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Title */}
          <div className="text-center mb-16">
      <h2
        className="text-5xl md:text-6xl leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.2)] mb-6 text-white"
        style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
      >
          
      </h2>
      <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
        {/* Experience the warmth of exceptional cocktails crafted with passion and
        precision. Every drink tells a story of dedication to our craft. */}
      </p>
    </div>

    {/* Image Grid with Hover Expansion */}
    <div className="relative h-screen flex items-center justify-center overflow-hidden" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <div className="relative w-full h-full flex items-center justify-center">
        {collageImages.slice(0, 3).map((image, idx) => {
          const labels = ['BASIC', 'MODERATE', 'PREMIUM'];
          const descriptions = [
            {
              title: 'BASIC',
              rate: 'Starting at $90/hour',
              includes: [
                '2 Professional Bartenders',
                'Complete Essential Bar Tools',
                'Full Bar Setup',
                'Non-Alcoholic Drink Service',
                'Beer, Wine, Spirits & Mixed Drinks',
                'Liquor & Ingredients Shopping Checklist'
              ]
            },
            {
              title: 'MODERATE',
              rate: 'Custom Quote',
              includes: [
                'Everything in Basic +',
                'Mobile Bar Setup',
                'Custom Designed Menu',
                'Premium Glassware Selection',
                'Extended Bartender Hours',
                'Special Event Coordination'
              ]
            },
            {
              title: 'PREMIUM',
              rate: 'Custom Quote',
              includes: [
                'Everything in Moderate +',
                'Extra Professional Bartenders',
                'Server Staff Included',
                'Premium Liquor Selection',
                'Full Event Bar Management',
                'Signature Cocktail Creation'
              ]
            }
          ];
          return (
            <motion.div
              key={idx}
              className="relative h-full group overflow-hidden cursor-pointer"
              style={{ width: '33.3333%' }}
              whileHover={{ width: '70%' }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Image
                src={image}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover"
                priority={true}
              />
              {/* Vertical Text Overlay (hidden on hover) */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0 group-hover:invisible"
              >
                <p 
                  className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-xl tracking-widest"
                  style={{ 
                    fontFamily: '"Playfair Display", "Times New Roman", serif',
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    letterSpacing: '0.3em',
                  }}
                >
                  {labels[idx]}
                </p>
              </div>
              {/* Menu-style details centered over photo; no boxed container, no emojis, no zoom */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/30" />
                <div className="relative w-full max-w-3xl px-6 md:px-10 text-center text-white space-y-4">
                  <h3 className="text-5xl md:text-6xl font-extrabold tracking-[0.18em] text-amber-200" style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}>
                    {descriptions[idx].title}
                  </h3>
                  <div className="w-16 h-1 bg-amber-400 mx-auto" />
                  <p className="text-amber-200 text-lg md:text-2xl font-semibold uppercase tracking-[0.28em]">
                    {descriptions[idx].rate}
                  </p>
                  <div className="space-y-3">
                    <p className="text-xs md:text-sm text-amber-100/90 font-bold uppercase tracking-[0.22em]">Includes</p>
                    <div className="grid md:grid-cols-2 gap-3 md:gap-4 text-sm md:text-base text-white/95 text-left mx-auto max-w-3xl">
                      {descriptions[idx].includes.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 leading-snug">
                          <span className="text-amber-300 text-lg">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-amber-300/30 space-y-2">
                    <p className="text-xs md:text-sm text-amber-100/90 font-bold uppercase tracking-[0.22em]">Add-Ons</p>
                    <div className="grid md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm text-white/85 text-left mx-auto max-w-3xl">
                      <span>• Glassware: from $0.50</span>
                      <span>• Mobile Bar: from $200</span>
                      <span>• Custom Menu: $15</span>
                      <span>• Server: $30/hr</span>
                      <span>• Extra Bartender: $45/hr</span>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-white/60 italic">Alcohol not included</p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </motion.div>
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
        
        /* Custom shine effect */
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
  );
}