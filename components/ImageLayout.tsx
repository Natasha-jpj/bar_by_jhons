"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants, useScroll, useTransform, useSpring } from 'framer-motion';

interface ImageLayoutProps {
  rightImages?: string[];
}

const ImageLayout: React.FC<ImageLayoutProps> = ({
  rightImages = ['/e.jpeg', '/a.jpeg', '/f.jpeg', '/g.jpeg', '/h.jpeg', '/1.jpg'],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    }
  };

  const itemVars: Variants = {
    initial: { opacity: 0, y: 40 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: "easeOut" } 
    }
  };

  const watermarkX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const leftCol = rightImages.filter((_, i) => i % 2 === 0);
  const rightCol = rightImages.filter((_, i) => i % 2 !== 0);

  return (
    <div ref={containerRef} className="relative w-full bg-[#F9F6F0]">
      
      {/* --- WATERMARK --- */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center md:justify-start overflow-hidden opacity-[0.05] z-0">
        <motion.h1 
          style={{ x: watermarkX }}
          className="text-[25vw] font-bold uppercase leading-none tracking-tighter text-black select-none pl-4 md:pl-0"
        >
          JOHN
        </motion.h1>
      </div>

      <div className="flex flex-col md:flex-row min-h-[180vh] relative z-10">
        
        {/* --- LEFT SIDE: Sticky Content --- */}
        <div className="w-full md:w-1/2 h-screen sticky top-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 border-b md:border-b-0 md:border-r border-[#D4AF37]/20">
          <motion.div
            variants={containerVars}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative z-20 flex flex-col items-start text-left"
          >
            <motion.span variants={itemVars} className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
              The Collection
            </motion.span>
            <motion.h2 variants={itemVars} className="mb-6 font-serif text-5xl leading-[1.1] text-slate-900 md:text-7xl lg:text-8xl">
              A Legacy in <br />
              <span className="italic text-[#9B1C31]">Motion.</span>
            </motion.h2>
            <motion.p variants={itemVars} className="max-w-md text-base font-light leading-relaxed text-slate-600 md:text-lg mb-10">
              Swipe to explore. Watch the gallery evolve with every movement.
            </motion.p>

            {/* NAVIGATES TO FOOTER */}
            <motion.a
              href="#booking-section"
              variants={itemVars}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] uppercase tracking-widest text-xs font-bold transition-all inline-block cursor-pointer"
            >
              Check Availability
            </motion.a>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: Gallery --- */}
        <div className="w-full md:w-1/2 flex px-4 md:px-10 gap-6 md:gap-12 py-20">
          <div className="flex-1 space-y-32 md:space-y-48">
            {leftCol.map((src, i) => (
              <ParallaxImage key={`left-${i}`} src={src} index={i * 2} progress={scrollYProgress} speed={[0, -200]} />
            ))}
          </div>
          <div className="flex-1 space-y-32 md:space-y-48 mt-48 md:mt-80">
            {rightCol.map((src, i) => (
              <ParallaxImage key={`right-${i}`} src={src} index={i * 2 + 1} progress={scrollYProgress} speed={[100, -600]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ParallaxImage = ({ src, index, progress, speed }: { src: string, index: number, progress: any, speed: number[] }) => {
  const y = useSpring(useTransform(progress, [0, 1], speed), { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      style={{ y }}
      className="relative w-full aspect-[2/3] shadow-2xl overflow-hidden group border border-[#D4AF37]/10 bg-white"
    >
      <Image
        src={src}
        alt={`Gallery Image ${index}`}
        fill
        className="object-cover transition-transform duration-1000 scale-105 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
      <span className="absolute bottom-4 left-4 text-white font-serif italic text-2xl z-20 drop-shadow-md">
        0{index + 1}
      </span>
    </motion.div>
  );
};

export default ImageLayout;