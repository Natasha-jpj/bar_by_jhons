"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Ensure lucide-react is installed

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isSolid = isScrolled || isHovered || pathname !== "/" || isOpen;

  const linkStyle = `text-[13px] font-bold tracking-[0.25em] transition-colors whitespace-nowrap ${
    isSolid ? 'text-gray-900 hover:text-amber-700' : 'text-white hover:text-amber-400'
  }`;

  const navLinks = [
    { name: 'PACKAGES', href: '/#packages' },
    { name: 'ABOUT', href: '/#about' },
    { name: 'EVENTS', href: '/#events' },
    { name: 'CONTACT', href: '/#contact' },
  ];

  return (
    <>
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
  <div className="w-full max-w-[1440px] px-6 md:px-10 flex items-center h-full relative">
    
    {/* 1. DESKTOP LEFT LINKS (Hidden on mobile) */}
    <div className="hidden md:flex flex-1 items-center justify-end gap-12 pr-12">
      <Link href={navLinks[0].href} className={linkStyle}>{navLinks[0].name}</Link>
      <Link href={navLinks[1].href} className={linkStyle}>{navLinks[1].name}</Link>
    </div>

    {/* 2. CENTER LOGO (Fixed centering for both Mobile & Desktop) */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:flex-shrink-0 z-[1001]">
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

    {/* 3. DESKTOP RIGHT LINKS (Hidden on mobile) */}
    <div className="hidden md:flex flex-1 items-center justify-start gap-12 pl-12">
      <Link href={navLinks[2].href} className={linkStyle}>{navLinks[2].name}</Link>
      <Link href={navLinks[3].href} className={linkStyle}>{navLinks[3].name}</Link>
    </div>

    {/* 4. MOBILE HAMBURGER BUTTON (Positioned far right) */}
    <div className="md:hidden ml-auto">
      <button 
        className="p-2 z-[1001] relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="text-gray-900 w-8 h-8" />
        ) : (
          <Menu className={`${isSolid ? 'text-gray-900' : 'text-white'} w-8 h-8 transition-colors`} />
        )}
      </button>
    </div>
  </div>
</nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-900 text-xl font-bold tracking-[0.3em] hover:text-amber-700 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}