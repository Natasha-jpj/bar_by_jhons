import Image from 'next/image';

export default function FullImageHero() {
  return (
    /* Background set to Cream (#F9F6F0) */
    <section className="w-full min-h-[70vh] flex flex-col justify-center items-center px-2 sm:px-4 md:px-8 bg-[#F9F6F0]">
      {/* Hero Content Row: Centered left and right columns */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between pt-10 pb-10 gap-10 md:gap-20 flex-wrap px-4 md:px-8 py-6 md:py-10" style={{ minHeight: '320px' }}>
        {/* Left: Heading and subheading */}
        <div className="flex-1 min-w-[320px] pr-0 md:pr-8 flex flex-col justify-center mb-6 md:mb-0">
          <h1 className="font-serif text-[#1a1a1a] text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 md:mb-4 text-center md:text-left" style={{ letterSpacing: '-0.03em' }}>
            Welcome to Bar by John
          </h1>
          {/* Subheading in Crimson (#9B1C31) */}
          <span className="italic font-normal text-lg sm:text-xl md:text-2xl lg:text-4xl text-center md:text-left block text-[#9B1C31]">
            Signature Cocktails & Modern Mixology
          </span>
        </div>
        
        {/* Right: Paragraph and button */}
        <div className="flex-1 flex flex-col min-w-[320px] max-w-xl pl-0 md:pl-8">
          <p className="text-[#333333] text-base md:text-lg font-normal leading-relaxed mb-8 text-center md:text-left" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
            Discover a curated menu of classic and contemporary cocktails, crafted with passion and precision. Experience the art of mixology in a welcoming, stylish setting.
          </p>
          {/* Link with Gold (#D4AF37) border/text accent */}
          <a href="#menu" className="inline-block px-0 py-0 bg-transparent text-[#1a1a1a] font-bold uppercase tracking-wide hover:text-[#9B1C31] transition text-base md:text-lg self-center md:self-start border-b-2 border-[#D4AF37]" style={{ letterSpacing: '0.08em' }}>
            VIEW OUR MENU <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      
      {/* Image below - Wide rectangle with Gold border accent */}
      <div className="w-full max-w-7xl mx-auto mt-8 md:mt-12 px-2 sm:px-4">
        <div className="w-full rounded-md shadow-xl overflow-hidden border border-[#D4AF37]">
          <Image
            src="/style.jpg"
            alt="Bar by John Signature Cocktail"
            width={1600}
            height={500}
            className="object-cover w-full h-[300px] md:h-[400px]"
            priority
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}