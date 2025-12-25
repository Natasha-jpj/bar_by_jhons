// "use client"

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';

// const packages = [
//   {
//     id: 'basic',
//     title: 'BASIC',
//     subtitle: 'Essential Excellence',
//     description: 'Perfect for intimate gatherings',
//     price: '$90/hour',
//     image: '/menu1.jpg',
//   },
//   {
//     id: 'moderate',
//     title: 'MODERATE',
//     subtitle: 'Elevated Experience',
//     description: 'Enhanced service for special occasions',
//     price: 'Custom Quote',
//     image: '/menu2.jpg',
//   },
//   {
//     id: 'premium',
//     title: 'PREMIUM',
//     subtitle: 'Ultimate Luxury',
//     description: 'Complete white-glove service',
//     price: 'Custom Quote',
//     image: '/menu3.jpg',
//   },
// ];

// export default function PackagesPage() {
//   return (
//     <main className="relative min-h-screen bg-gradient-to-b from-[var(--color-soft-ivory)] via-[var(--color-muted-gold)] to-[var(--color-antique-gold)] text-[var(--color-charcoal-black)] overflow-hidden">
//       {/* Wall Texture Overlay */}
//       <div className="fixed inset-0 opacity-5 pointer-events-none" 
//            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")' }}
//       />

//       {/* Ambient Lighting Effects */}
//       <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#C9A24D]/10 rounded-full blur-[120px] pointer-events-none" />
//       <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#E0C97A]/10 rounded-full blur-[120px] pointer-events-none" />

//       {/* Fixed Navigation */}
//       <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-1 bg-gradient-to-r from-[var(--color-antique-gold)] via-[var(--color-muted-gold)] to-[var(--color-soft-ivory)] border-b border-[var(--color-antique-gold)] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <Link href="/" className="hover:opacity-80 transition-opacity">
//             <div className="w-18 h-18 relative">
//               <Image
//                 src="/logooo.png"
//                 alt="Bar by John"
//                 fill
//                 className="object-contain"
//                 priority
//               />
//             </div>
//           </Link>
//           <div className="hidden md:flex items-center gap-8">
//             <Link href="/#story" className="text-[#3f2a00]/85 hover:text-[#8f5f00] text-sm uppercase tracking-wider transition-colors">Our Story</Link>
//             <Link href="/#gallery" className="text-[#3f2a00]/85 hover:text-[#8f5f00] text-sm uppercase tracking-wider transition-colors">Gallery</Link>
//             <Link href="/#contact" className="text-[#3f2a00]/85 hover:text-[#8f5f00] text-sm uppercase tracking-wider transition-colors">Contact</Link>
//           </div>
//         </div>
//       </nav>

//       {/* Gallery Header */}
//       <section className="relative pt-32 pb-16 px-6">
//         <div className="max-w-7xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <p className="text-amber-500/80 text-xs uppercase tracking-[0.3em] mb-4 font-light">
//               Curated Collection
//             </p>
//             <h1 
//               className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
//               style={{ fontFamily: '"Playfair Display", serif' }}
//             >
//               Our Packages
//             </h1>
//             <div className="w-24 h-1 bg-amber-500 mx-auto mb-8" />
//             <p className="text-white/60 max-w-2xl mx-auto text-lg">
//               Each package thoughtfully crafted to deliver exceptional service and unforgettable experiences
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Gallery Grid */}
//       <section className="relative py-16 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
//             {packages.map((pkg, index) => (
//               <motion.div
//                 key={pkg.id}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: index * 0.2 }}
//                 className="group"
//               >
//                 {/* Gallery Frame */}
//                 <div className="relative bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] p-4 shadow-2xl">
//                   {/* Inner Border */}
//                   <div className="relative border-2 border-amber-500/20 p-3">
//                     {/* Image Container */}
//                     <div className="relative aspect-[3/4] overflow-hidden bg-black">
//                       <Image
//                         src={pkg.image}
//                         alt={pkg.title}
//                         fill
//                         className="object-cover transition-transform duration-700 group-hover:scale-110"
//                       />
                      
//                       {/* Hover Overlay */}
//                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
                      
//                       {/* Spotlight Effect */}
//                       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
//                            style={{
//                              background: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
//                            }}
//                       />
//                     </div>
//                   </div>

//                   {/* Gallery Plaque */}
//                   <div className="mt-6 text-center px-4 pb-2">
//                     <h3 
//                       className="text-2xl md:text-3xl font-bold mb-2 text-amber-500"
//                       style={{ fontFamily: '"Playfair Display", serif' }}
//                     >
//                       {pkg.title}
//                     </h3>
//                     <p className="text-white/90 text-sm uppercase tracking-widest mb-2">
//                       {pkg.subtitle}
//                     </p>
//                     <p className="text-white/60 text-sm mb-3">
//                       {pkg.description}
//                     </p>
//                     <div className="w-12 h-px bg-amber-500/30 mx-auto mb-3" />
//                     <p className="text-amber-500 font-bold text-lg">
//                       {pkg.price}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer CTA Section */}
//       <section className="relative py-24 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <h2 
//               className="text-4xl md:text-5xl font-bold mb-8"
//               style={{ fontFamily: '"Playfair Display", serif' }}
//             >
//               Ready to Elevate Your Event?
//             </h2>
//             <p className="text-white/60 mb-12 text-lg">
//               Let's discuss which package best suits your vision
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-6 justify-center">
//               <Link
//                 href="/#contact"
//                 className="group inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-black px-10 py-5 font-bold text-sm uppercase tracking-wider transition-all duration-300"
//               >
//                 Book Now
//                 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
              
//               <Link
//                 href="/"
//                 className="group inline-flex items-center justify-center gap-3 border-2 border-amber-500/30 hover:border-amber-500 text-white px-10 py-5 font-bold text-sm uppercase tracking-wider transition-all duration-300"
//               >
//                 <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back Home
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </main>
//   );
// }
