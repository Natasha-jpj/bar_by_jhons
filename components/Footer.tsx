"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#F9F6F0] text-slate-900 pt-24 pb-12 relative overflow-hidden border-t border-[#D4AF37]/20">
      
      {/* Texture Overlay (Optional, matches your other sections) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* TOP ROW: Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Logo / Brand Area */}
          <div className="max-w-md">
            {/* Replace with your logo image if you have one, currently using text */}
            <div className="flex flex-col items-start">
               <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs font-bold mb-2">Est. 2024</span>
               <h2 className="text-4xl font-serif text-slate-900 leading-none mb-6">
                 BAR BY <span className="text-[#9B1C31] italic">JOHN</span>
               </h2>
            </div>
            <p className="text-slate-600 font-light leading-relaxed">
              Elevating events with curated cocktails, premium service, and an unforgettable atmosphere. Based in Nepal, serving everywhere.
            </p>
          </div>

          {/* Newsletter Section (Maxwell Style) */}
          <div className="w-full lg:w-auto min-w-[300px]">
            <h4 className="font-serif text-xl mb-6">Join our Guest List</h4>
            <form className="flex flex-col gap-4">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-400 font-light"
                />
                {/* Animated Arrow Button */}
                <button 
                  type="submit" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#9B1C31] transition-colors"
                >
                  →
                </button>
              </div>
              <p className="text-xs text-slate-400 font-light mt-2">
                Receive exclusive seasonal menus and event tips.
              </p>
            </form>
          </div>
        </div>

        {/* MIDDLE ROW: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-t border-slate-200 pt-12">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold uppercase tracking-widest text-xs text-[#D4AF37] mb-2">Explore</h5>
            <Link href="/" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">Home</Link>
            <Link href="#packages" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">Packages</Link>
            <Link href="#gallery" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">Gallery</Link>
            <Link href="#about" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">About Us</Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold uppercase tracking-widest text-xs text-[#D4AF37] mb-2">Services</h5>
            <Link href="#" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">Weddings</Link>
            <Link href="#" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">Corporate</Link>
            <Link href="#" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">Private Parties</Link>
            <Link href="#" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">Masterclasses</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold uppercase tracking-widest text-xs text-[#D4AF37] mb-2">Contact</h5>
            <a href="mailto:hello@barbyjohn.com" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">hello@barbyjohn.com</a>
            <a href="tel:6478663017" className="text-slate-600 hover:text-[#9B1C31] transition-colors font-light">6478663017</a>
            <span className="text-slate-600 font-light">GTA, Canada</span>
          </div>

           {/* Column 4: Socials */}
           <div className="flex flex-col gap-4">
            <h5 className="font-bold uppercase tracking-widest text-xs text-[#D4AF37] mb-2">Follow</h5>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-slate-300 rounded-full flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                IG
              </a>
              <a href="#" className="w-10 h-10 border border-slate-300 rounded-full flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                FB
              </a>
            </div>
          </div>

        </div>

        {/* MASSIVE FOOTER TEXT (Maxwell Style) */}
        <div className="w-full overflow-hidden border-b border-slate-200 mb-8">
           <h1 className="text-[12vw] md:text-[13vw] leading-[0.8] font-serif text-center text-[#D4AF37] opacity-20 select-none whitespace-nowrap">
            BAR BY JOHN
           </h1>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-light uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Bar by John. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link href="#" className="hover:text-[#9B1C31]">Privacy Policy</Link>
             <Link href="#" className="hover:text-[#9B1C31]">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}