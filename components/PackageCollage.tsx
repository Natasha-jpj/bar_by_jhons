"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const collageImages = [
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80',
];

const menuImages = ['/menu1.png', '/menu2.png', '/menu3.png'];
const labels = ['BASIC', 'MODERATE', 'PREMIUM'];

const descriptions = [
  { title: 'BASIC', rate: 'Starting at $90/hour' },
  { title: 'MODERATE', rate: 'Custom Quote' },
  { title: 'PREMIUM', rate: 'Custom Quote' }
];

export default function PackageCollage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      {/* Interactive Grid */}
      <div className="relative w-full h-full flex items-center justify-center">
        {collageImages.map((image, idx) => (
          <motion.div
            key={idx}
            className="relative h-full group overflow-hidden cursor-pointer border-x border-white/5"
            style={{ width: '33.3333%' }}
            whileHover={{ width: '70%' }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
            onClick={() => setSelectedPackage(idx)}
          >
            <Image
              src={image}
              alt={labels[idx]}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0 group-hover:invisible">
              <p className="text-white text-3xl md:text-5xl font-extrabold tracking-widest drop-shadow-2xl font-serif uppercase"
                 style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {labels[idx]}
              </p>
            </div>

            <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
              <div className="relative z-10 text-center px-4">
                <h3 className="text-5xl md:text-6xl font-serif text-[#bfa77a] mb-4">{descriptions[idx].title}</h3>
                <div className="w-20 h-[1px] bg-[#bfa77a] mx-auto mb-6" />
                <p className="text-xl md:text-2xl tracking-widest uppercase mb-4">{descriptions[idx].rate}</p>
                <p className="text-white/40 italic text-sm">Click to view details</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Menu Overlay: Slightly Bigger and Lower */}
      <AnimatePresence>
        {selectedPackage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPackage(null)}
            className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              // mt-20 pushes it lower, max-w-3xl makes it bigger than before
              className="relative w-full h-[70vh] max-w-3xl mt-20"
              onClick={(e) => e.stopPropagation()} 
            >
              <Image
                src={menuImages[selectedPackage]}
                alt="Menu Detail"
                fill
                className="object-contain drop-shadow-[0_10px_50px_rgba(0,0,0,0.7)]"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}