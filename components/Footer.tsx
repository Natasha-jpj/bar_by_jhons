"use client"

import Link from "next/link";

export default function Footer() {
  return (
    /* ADDED ID HERE: id="booking-section" */
    <footer id="booking-section" className="bg-[#F9F6F0] text-slate-900 pt-24 pb-12 relative overflow-hidden border-t border-[#D4AF37]/20 font-sans">
      
      {/* Texture Overlay for luxury depth */}
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* TOP ROW: Brand & Appointment Calendar */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Logo / Brand Area */}
          <div className="max-w-md">
            <div className="flex flex-col items-start">
               <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs font-bold mb-2">Est. 2025</span>
               <h2 className="text-4xl font-serif text-slate-900 leading-none mb-6">
                 BAR BY <span className="text-[#9B1C31] italic uppercase">John</span>
               </h2>
            </div>
            <p className="text-slate-600 font-light leading-relaxed">
              Elevating events with curated cocktails, premium service, and an unforgettable atmosphere. Based in Nepal, serving everywhere.
            </p>
          </div>

          {/* Appointment Calendar */}
          <div className="w-full lg:max-w-2xl">
            <h4 className="font-serif text-2xl mb-2 text-slate-900">Have an Upcoming Event?</h4>
            <p className="text-[#D4AF37] tracking-widest uppercase text-[10px] font-bold mb-8 italic">Secure Your Date Instantly</p>
            
            <div className="bg-white p-2 shadow-2xl border border-[#D4AF37]/30 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 pointer-events-none border-[8px] border-white z-10"></div>
                
                <iframe 
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1RtrTnTaZDdYxr3NFxyRVU3cGKE4nArkXvFtN4eyrgvSkvu4D9Gha9F79-rUjd-B0GFtCicEGM?gv=true" 
                  style={{ border: 0 }} 
                  width="100%" 
                  height="600" 
                  frameBorder="0"
                  className="relative z-0 opacity-95 contrast-[1.02]"
                ></iframe>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-t border-slate-200 pt-12 text-left">
          <div className="flex flex-col gap-4">
            <h5 className="font-bold uppercase tracking-widest text-xs text-[#D4AF37] mb-2">Explore</h5>
            <Link href="/" className="footer-link">Home</Link>
            <Link href="#packages" className="footer-link">Packages</Link>
            <Link href="#events" className="footer-link">Events</Link>
            <Link href="#about" className="footer-link">About Us</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="font-bold uppercase tracking-widest text-xs text-[#D4AF37] mb-2">Services</h5>
            <Link href="#" className="footer-link">Weddings</Link>
            <Link href="#" className="footer-link">Corporate</Link>
            <Link href="#" className="footer-link">Private Parties</Link>
            <Link href="#" className="footer-link">Masterclasses</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="font-bold uppercase tracking-widest text-xs text-[#D4AF37] mb-2">Contact</h5>
            <span className="text-slate-600 font-light text-sm italic">info@barbyjohn2026.com</span>
            <a 
              href="https://wa.me/16478663017" 
              target="_blank" rel="noopener noreferrer" 
              className="text-slate-600 hover:text-[#25D366] transition-colors font-light text-sm flex items-center gap-2"
            >
              WhatsApp: [6478663017]
            </a>
            <span className="text-slate-600 font-light text-sm">Kathmandu, Nepal</span>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="font-bold uppercase tracking-widest text-xs text-[#D4AF37] mb-2">Follow</h5>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/barbyjohn2026/" target="_blank" className="social-icon">IG</a>
              <a href="https://www.facebook.com/profile.php?id=61585694137437" target="_blank" className="social-icon">FB</a>
            </div>
          </div>
        </div>

        {/* MASSIVE BRAND TEXT */}
        <div className="w-full overflow-hidden border-b border-slate-200 mb-8">
           <h1 className="text-[12vw] md:text-[13vw] leading-[0.8] font-serif text-center text-[#D4AF37] opacity-20 select-none whitespace-nowrap uppercase tracking-tighter">
             Bar by John
           </h1>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-light uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Bar by John. Luxury Mixology Services.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <Link href="#" className="hover:text-[#9B1C31] transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-[#9B1C31] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-link { color: #475569; font-weight: 300; transition: color 0.3s; font-size: 0.875rem; text-decoration: none; }
        .footer-link:hover { color: #9B1C31; }
        .social-icon { width: 2.5rem; height: 2.5rem; border: 1px solid #cbd5e1; border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; transition: all 0.3s; text-decoration: none; color: inherit; }
        .social-icon:hover { border-color: #D4AF37; color: #D4AF37; transform: translateY(-2px); }
      `}</style>
    </footer>
  );
}