"use client";

import { useRef, useEffect, useState } from "react";
// 1. IMPORT VARIANTS
import { motion, useMotionValue, useSpring, useTransform, PanInfo, Variants } from "framer-motion";

interface EventItem {
  slug: string;
  title: string;
  blurb: string;
  color: string;
  video: string;
}

export default function EventsHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (isDragging) return; 
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const getDefaultEvents = (): EventItem[] => [
    {
      slug: "white-parties",
      title: "White Parties",
      blurb: "",
      color: "#9B1C31",
      video: "/videos/white-parties.mp4"
    },
    {
      slug: "private-parties",
      title: "Private Parties",
      blurb: "",
      color: "#D4AF37",
      video: "/videos/private-parties.mp4"
    },
    {
      slug: "corporate-events",
      title: "Corporate Events",
      blurb: "",
      color: "#0f172a",
      video: "/videos/corporate-events.mp4"
    },
    {
      slug: "birthday-celebrations",
      title: "Birthday Celebrations",
      blurb: "",
      color: "#475569",
      video: "/videos/birthday-celebrations.mp4"
    }
  ];

  useEffect(() => {
    setEvents(getDefaultEvents());
  }, []);

  const currentEvent = events[currentEventIndex];
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handleVideoError = (slug: string) => {
    setVideoErrors(prev => ({ ...prev, [slug]: true }));
  };
  const handleVideoLoad = (slug: string) => {
    setVideoErrors(prev => ({ ...prev, [slug]: false }));
  };

  useEffect(() => {
    if (!currentEvent) return;
    const currentVideo = videoRefs.current[currentEvent.slug];
    if (currentVideo && !videoErrors[currentEvent.slug]) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => handleVideoError(currentEvent.slug));
    }
    Object.keys(videoRefs.current).forEach(slug => {
      const video = videoRefs.current[slug];
      if (video && slug !== currentEvent.slug) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentEvent, videoErrors]);

  const nextEvent = () => {
    if (isAnimating || events.length === 0) return;
    setIsAnimating(true);
    setCurrentEventIndex((prev) => (prev + 1) % events.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevEvent = () => {
    if (isAnimating || events.length === 0) return;
    setIsAnimating(true);
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // --- DRAG HANDLER ---
  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50; 
    const velocityThreshold = 500; 

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      nextEvent();
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      prevEvent();
    }
  };

  const getVisibleEvents = () => {
    if (events.length === 0) return [];
    const visible = [];
    const total = events.length;
    for (let i = 2; i > 0; i--) {
      const index = (currentEventIndex - i + total) % total;
      visible.push({ event: events[index], position: `left-${i}` });
    }
    visible.push({ event: events[currentEventIndex], position: 'current' });
    for (let i = 1; i <= 2; i++) {
      const index = (currentEventIndex + i) % total;
      visible.push({ event: events[index], position: `right-${i}` });
    }
    return visible;
  };

  const getTransform = (position: string) => {
    switch (position) {
      case 'current':
        return 'translate-x-0 scale-100 z-50 opacity-100 shadow-2xl';
      case 'right-1':
        return 'translate-x-[12%] scale-[0.9] z-40 opacity-60 blur-[1px]';
      case 'right-2':
        return 'translate-x-[24%] scale-[0.8] z-30 opacity-40 blur-[2px]';
      case 'left-1':
        return '-translate-x-[12%] scale-[0.9] z-40 opacity-60 blur-[1px]';
      case 'left-2':
        return '-translate-x-[24%] scale-[0.8] z-30 opacity-40 blur-[2px]';
      default:
        return 'translate-x-0 scale-100 opacity-100';
    }
  };

  // --- ANIMATION VARIANTS (Explicitly Typed) ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const watermarkAnim: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 0.03, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
  };

  if (events.length === 0) return null;

  return (
    // FIX APPLIED HERE:
    // 1. 'min-h-screen' ensures the section takes up 100% of the viewport height MINIMUM.
    // 2. 'flex flex-col justify-center' centers the content vertically within that full screen.
    // 3. 'py-24' adds safe padding so content doesn't hit the edges.
    <section 
      id="events" 
      ref={sectionRef} 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-[#F9F6F0] py-24"
    >
      
      {/* Texture Grain */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      ></div>

      {/* ANIMATED WATERMARK */}
      <motion.div 
        variants={watermarkAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0"
      >
        <h1 className="text-[20vw] font-bold uppercase leading-none tracking-tighter text-black select-none">
          EVENTS
        </h1>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center">
          
          {/* ANIMATED HEADER SECTION */}
          {/* Increased margin-bottom slightly to separate title from cards */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-24"
          >
            <motion.span variants={fadeInUp} className="block text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-3">
              Celebrate
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-serif text-slate-900 mb-4">
              Events By <span className="italic text-[#9B1C31]">John's</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-1 mx-auto w-fit">
              <div className="w-16 h-0.5 bg-[#D4AF37]/60 mx-auto"></div>
              <div className="w-8 h-0.5 bg-[#D4AF37]/30 mx-auto"></div>
            </motion.div>
          </motion.div>

          {/* ANIMATED CAROUSEL CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="w-full relative h-[500px] flex justify-center items-center perspective-[1200px]"
          >
            {getVisibleEvents().map(({ event, position }) => {
              const isCurrent = position === 'current';
              const hasVideoError = videoErrors[event.slug];
              const cardStyle = isCurrent ? { rotateX, rotateY, cursor: isDragging ? 'grabbing' : 'grab' } : { cursor: 'pointer' };
              
              return (
                <motion.div
                  key={event.slug}
                  className={`absolute transition-all duration-700 ease-out ${getTransform(position)}`}
                  style={{ 
                    width: '1000px', 
                    maxWidth: '92vw', 
                    height: '500px',
                    transformStyle: 'preserve-3d',
                    ...cardStyle
                  }}
                  
                  // Gestures
                  drag={isCurrent ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  
                  onClick={() => {
                    if (position.includes('left')) prevEvent();
                    if (position.includes('right')) nextEvent();
                  }}

                  onMouseMove={isCurrent ? handleMouseMove : undefined}
                  onMouseLeave={isCurrent ? handleMouseLeave : undefined}
                >
                  <div className="relative w-full h-full bg-white rounded-sm border border-slate-200 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 overflow-hidden">
                      {!hasVideoError && (
                        <video
                          ref={el => { videoRefs.current[event.slug] = el; }}
                          src={event.video}
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className="absolute inset-0 w-full h-full object-cover transform scale-105"
                          onError={() => handleVideoError(event.slug)}
                          onLoadedData={() => handleVideoLoad(event.slug)}
                          style={{ filter: isCurrent ? 'brightness(0.95)' : 'brightness(0.5) grayscale(50%)' }}
                        />
                      )}
                      <div
                        className="absolute inset-0 transition-all duration-500"
                        style={{ backgroundColor: event.color, opacity: hasVideoError ? 1 : 0 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 p-10 h-full flex flex-col justify-end text-center pb-10">
                      <div className="transform transition-all duration-500" style={{ transform: isCurrent && !isDragging ? 'translateZ(30px)' : 'none' }}>
                        
                        <h3 className="text-4xl md:text-5xl font-serif text-white mb-3 drop-shadow-md">
                          {event.title}
                        </h3>
                        <div 
                          className={`overflow-hidden transition-all duration-500 mx-auto max-w-3xl ${isCurrent ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <p className="text-slate-100 leading-relaxed text-lg font-light drop-shadow-sm">
                            {event.blurb}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}