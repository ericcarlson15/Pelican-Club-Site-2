import pelicanOSLogo from 'figma:asset/8cd4d39790de8d33778d9d345d9c0bba09b12f74.png';

interface AboutOSProps {
  onJoinClick?: () => void;
}

export function AboutOS({ onJoinClick }: AboutOSProps) {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      {/* OS Logo Section */}
      <div className="w-full bg-gradient-to-br from-teal-600 to-teal-800 p-8 rounded-lg relative overflow-hidden">
        {/* Diagonal pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.3) 2px,
              rgba(255,255,255,0.3) 4px
            )`
          }}
        />
        <div className="relative">
          <img 
            src={pelicanOSLogo} 
            alt="PelicanOS" 
            className="mx-auto mb-4 max-w-full h-auto"
            style={{ maxHeight: '100px', filter: 'brightness(0) invert(1)' }}
          />
          <p className="text-white text-xl mt-4" style={{ fontFamily: 'Courier New, monospace' }}>
            Version 1.0
          </p>
          <p className="text-white text-sm mt-2">
            Pelican Club® is a registered trademark -
          </p>
          <p className="text-white text-sm">
            Copyright® Pelican Club & Spa
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="px-4">
        <p className="text-base" style={{ fontFamily: 'Courier New, monospace' }}>
          🌴 We exist to bring a little more warmth
        </p>
        <p className="text-base" style={{ fontFamily: 'Courier New, monospace' }}>
          to the lives of our dearly-loved community
        </p>
        <p className="text-base" style={{ fontFamily: 'Courier New, monospace' }}>
          of listeners. 🌴
        </p>
      </div>

      {/* Palm tree divider */}
      <p className="text-2xl">🌴 Brought to you by Pelican Club 🌴</p>

      {/* Credits */}
      <div className="w-full space-y-2 text-left" style={{ fontFamily: 'Courier New, monospace' }}>
        <div className="flex justify-between">
          <span className="font-bold">JACKSON DAY</span>
          <span>The Captain</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">MYLES DONOVAN</span>
          <span>The Navigator</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">JACK MANNING</span>
          <span>The Architect</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">ERIC CARLSON</span>
          <span>The Visionary</span>
        </div>
      </div>

      {/* Join The Club button */}
      <button 
        className="bg-teal-400 text-black px-8 py-3 border-2 border-black hover:bg-teal-300 transition-colors"
        onClick={onJoinClick}
      >
        Join The Club
      </button>

      {/* Footer */}
      <p className="text-xs">
        Powered by <strong>Indie Rock</strong>. Read our <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </div>
  );
}