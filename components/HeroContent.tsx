const HeroContent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tagline */}
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30">
            <span className="text-amber-400 font-semibold tracking-wider">
              EST. 2015 • CRAFT COCKTAILS • PREMIUM SPIRITS
            </span>
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-serif leading-tight">
          <span className="block">EXPERIENCE THE</span>
          <span className="block text-amber-400">ULTIMATE NIGHT</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Where classic cocktails meet modern mixology in an atmosphere of 
          sophistication and style. Join us for an unforgettable evening.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/30">
            <span className="flex items-center gap-2">
              View Our Menu
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
          
          <button className="px-8 py-4 bg-transparent border-2 border-white hover:border-amber-400 text-white hover:text-amber-400 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
            Book a Table
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="space-y-2">
            <h3 className="text-amber-400 font-bold text-xl">OPENING HOURS</h3>
            <p className="text-white/80">Mon - Thu: 5 PM - 2 AM</p>
            <p className="text-white/80">Fri - Sun: 4 PM - 3 AM</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-amber-400 font-bold text-xl">LOCATION</h3>
            <p className="text-white/80">123 Nightlife Street</p>
            <p className="text-white/80">Downtown, NY 10001</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-amber-400 font-bold text-xl">CONTACT</h3>
            <p className="text-white/80">(555) 123-4567</p>
            <p className="text-white/80">reservations@barbyjohn.com</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full mx-auto flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;