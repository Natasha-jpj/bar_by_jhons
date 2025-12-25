"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageLayoutProps {
  rightImages?: string[];
}

const ImageLayout: React.FC<ImageLayoutProps> = ({
  rightImages = [
    '/e.jpeg',
    '/a.jpeg',
    '/f.jpeg',
    '/g.jpeg',
    '/h.jpeg',
  ],
}) => {
  return (
    <div
      className="relative w-full bg-[#F9F6F0]"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      {/* --- WATERMARK --- */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-start overflow-hidden opacity-[0.03] z-0">
        <h1 className="text-[25vw] font-bold uppercase leading-none tracking-tighter text-black select-none pl-4 md:pl-0">
          JOHN
        </h1>
      </div>

      <div className="flex h-full w-full flex-col md:flex-row relative z-10">
        
        {/* --- LEFT SIDE: Static Content --- */}
        <div className="flex h-1/2 w-full flex-col justify-center items-center px-8 md:h-full md:w-1/2 md:pl-0 lg:pl-0 border-b md:border-b-0 md:border-r border-[#D4AF37]/20">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-20 flex flex-col items-center text-center"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]"
            >
              The Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6 font-serif text-5xl leading-[1.1] text-slate-900 md:text-7xl"
            >
              A Legacy in <br />
              <span className="italic text-[#9B1C31]">Motion.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="max-w-md text-base font-light leading-relaxed text-slate-600 md:text-lg"
            >
              Swipe to explore. Watch the gallery evolve with every movement.
            </motion.p>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: Manual Strip Scroll --- */}
        <div className="relative flex h-full w-full items-center md:h-full md:w-1/2 overflow-x-auto overflow-y-hidden custom-scrollbar">
          
          <motion.div
            className="flex h-[60vh] md:h-[70vh] items-center px-12 gap-6" 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {rightImages.length === 0 ? (
              <div className="flex items-center justify-center w-full h-full text-gray-400 text-xl">No images found.</div>
            ) : (
              rightImages.map((src, index) => (
                <div
                  key={index}
                  // ✅ UPDATED WIDTH: Slightly thinner (70px mobile / 95px desktop)
                  className="relative flex-shrink-0 h-full w-[70px] md:w-[95px] flex items-center justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                      delay: 0.1 * index
                    }}
                    className="relative w-full h-full overflow-hidden rounded-none bg-white shadow-xl"
                  >
                    <Image
                      src={src}
                      alt={`Slide ${index}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
                  </motion.div>
                </div>
              ))
            )}
            
            <div className="w-12 flex-shrink-0"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageLayout;