"use client";

import { motion } from "framer-motion";

export default function LiveCalendar() {
  return (
    <section className="bg-[#F9F6F0] py-20 px-6 border-t border-[#D4AF37]/20">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AF37] tracking-[0.4em] uppercase text-xs font-bold mb-4 block">
            Real-Time Schedule
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-slate-900 leading-tight">
            Live <span className="italic text-[#9B1C31]">Availability</span>
          </h2>
        </motion.div>

        {/* Calendar Container */}
        <div className="relative w-full h-[700px] bg-white shadow-2xl border border-[#D4AF37]/30 rounded-sm overflow-hidden group">
          {/* Elegant Overlay for loading/depth */}
          <div className="absolute inset-0 pointer-events-none border-[10px] border-white z-10"></div>
          
          <iframe 
            src="https://calendar.google.com/calendar/embed?src=barbyjohn2026%40gmail.com&ctz=Asia%2FKathmandu&mode=WEEK&hl=en&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&bgcolor=%23F9F6F0" 
            style={{ border: 0 }} 
            className="w-full h-full opacity-90 contrast-[1.05]"
            frameBorder="0" 
            scrolling="no"
          ></iframe>
        </div>

        <div className="mt-8 flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#f6bf26] rounded-full"></span>
            <span className="text-slate-500">Provisional Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#0b8043] rounded-full"></span>
            <span className="text-slate-500">Confirmed Event</span>
          </div>
        </div>
      </div>
    </section>
  );
}