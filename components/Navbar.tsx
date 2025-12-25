"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic: Navbar becomes solid after scrolling past hero height
      const heroHeight = window.innerHeight;
      if (window.scrollY >= heroHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = isScrolled || isHovered || pathname !== "/";

  // Common link style for consistency
  const linkStyle = `text-[13px] font-bold tracking-[0.25em] transition-colors whitespace-nowrap ${
    isSolid ? 'text-gray-900 hover:text-amber-700' : 'text-white hover:text-amber-400'
  }`;

  return (
    <nav 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 flex items-center justify-center ${
        isSolid ? 'shadow-sm border-b border-amber-200/50' : 'bg-transparent border-b border-transparent'
      }`}
      style={{
        background: isSolid 
          ? 'linear-gradient(to right, #ffffff 0%, #fffdf5 70%, #f7e7ce 100%)' 
          : 'transparent',
        height: isSolid ? '80px' : '100px'
      }}
    >
      <div 
        className="w-full flex items-center justify-center relative"
        style={{ maxWidth: '1440px', paddingLeft: '40px', paddingRight: '40px' }}
      >
        
        {/* 1. LEFT LINKS (Packages & About) */}
        {/* We use flex-1 and justify-end to push them towards the center logo */}
        <div className="flex-1 flex items-center justify-end gap-12 pr-12">
          <Link href="/#packages" className={linkStyle}>PACKAGES</Link>
          <Link href="/#about" className={linkStyle}>ABOUT</Link>
        </div>

        {/* 2. CENTER LOGO */}
        <div className="flex-shrink-0">
          <Link href="/">
             <motion.div 
               animate={{ scale: isSolid ? 0.7 : 0.85 }} 
               transition={{ duration: 0.3 }}
             >
                <Image 
                  src="/logooo.png" 
                  alt="Bar By John" 
                  width={150} 
                  height={150}
                  className="object-contain"
                  priority
                />
             </motion.div>
          </Link>
        </div>

        {/* 3. RIGHT LINKS (Gallery & Contact) */}
        {/* We use flex-1 and justify-start to push them away from the logo symmetrically */}
        <div className="flex-1 flex items-center justify-start gap-12 pl-12">
          <Link href="/#gallery" className={linkStyle}>GALLERY</Link>
          <Link href="/#contact" className={linkStyle}>CONTACT</Link>
        </div>

      </div>
    </nav>
  );
}