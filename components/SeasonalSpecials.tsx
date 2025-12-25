"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const items = [
  { 
    id: "summer", 
    title: "Summer Special Cocktails", 
    icon: "🍹",
    desc: "Light, refreshing, and vibrant drinks crafted to beat the heat and keep the celebration flowing. Perfect for outdoor events, white parties, and summer celebrations.", 
    img: "/1.jpg", 
    borderColor: "border-[#D4AF37]", 
    textColor: "text-slate-900"
  },
  { 
    id: "winter", 
    title: "Winter Special Cocktails", 
    icon: "❄️",
    desc: "Warm, rich, and cozy cocktail selections designed for winter events, holiday parties, and elegant indoor gatherings.",
    img: "/2.jpg", 
    borderColor: "border-[#9B1C31]", 
    textColor: "text-slate-900"
  },
];

export default function SeasonalSpecials() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // NO PHYSICS, NO MATH FIGHTING.
  // Just pure linear mapping. 1px scroll down = 1px scroll sideways.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200vw"]);

  return (
    // 1. TALL TRACK: 300vh
    <section ref={targetRef} className="relative h-[300vh] bg-[#F9F6F0]">
      
      {/* 2. REAL STICKY CONTAINER */}
      {/* With the CSS fix above, this will now lock perfectly. */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* 3. HORIZONTAL TRACK */}
        <motion.div style={{ x }} className="flex gap-0">
          
          {/* --- SLIDE 1: INTRO --- */}
          <div className="w-[100vw] h-screen flex-shrink-0 flex flex-col justify-center items-center bg-[#F9F6F0] relative border-r border-[#D4AF37]/20">
             {/* Texture Grain */}
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
             
             <div className="max-w-3xl text-center px-6 z-10">
                <span className="text-[#D4AF37] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">
                  The Menu
                </span>
                <h2 className="text-6xl md:text-8xl font-serif text-slate-900 mb-8">
                  Seasonal <br/>
                  <span className="italic text-[#9B1C31]">Specials</span>
                </h2>
                <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-10"></div>
                <p className="text-slate-600 text-lg md:text-xl font-light italic">
                  "Curated flavors for every season."
                </p>
                <div className="mt-12 animate-bounce text-4xl text-[#9B1C31]">↓</div>
             </div>
          </div>

          {/* --- SLIDES 2 & 3: CONTENT --- */}
          {items.map((item) => (
            <div key={item.id} className="relative w-[100vw] h-screen flex-shrink-0 flex flex-col md:flex-row">
              
              {/* Image Half */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                 <div className="absolute inset-0 bg-[#F9F6F0]" />
                 <Image 
                   src={item.img} 
                   alt={item.title} 
                   fill 
                   className="object-cover" 
                 />
              </div>

              {/* Text Half */}
              <div className={`w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-12 md:p-24 bg-[#F9F6F0] border-l-8 ${item.borderColor} relative`}>
                
                {/* Texture Grain */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

                <div className="relative z-10">
                  <span className="text-6xl mb-6 block drop-shadow-sm">{item.icon}</span>
                  <h3 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-light">
                    {item.desc}
                  </p>
                  
                  <button className={`mt-10 px-8 py-4 border ${item.borderColor} text-slate-900 font-serif tracking-widest uppercase hover:bg-slate-900 hover:text-[#D4AF37] hover:border-slate-900 transition-all w-fit text-sm bg-transparent`}>
                    View Menu
                  </button>
                </div>
              </div>

            </div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}