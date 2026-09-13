import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';

export const Location: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeMapLayer, setActiveMapLayer] = useState<'streets' | 'transit' | 'satellite'>('streets');

  const fullAddress = '5233 Yonge St, North York, ON M2N 5P8, Toronto, Canada';
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('The Maze Hair Salon 5233 Yonge St North York ON M2N 5P8')}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('5233 Yonge St, North York, ON M2N 5P8')}`;

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  return (
    <section
      id="location"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              Location &amp; Visiting Us
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1] max-w-2xl">
            Centrally located on Yonge Street in North York.
          </h2>
          <p className="text-sm text-zinc-400 font-light mt-3 max-w-xl">
            Conveniently situated just minutes between North York Centre and Finch subway stations with accessible transit routes and nearby parking.
          </p>
        </div>

        {/* Quick Map Action Links */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyAddress}
            className="px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-[#0c0c0e] hover:bg-white/5 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2 rounded-none"
            title="Copy address to clipboard"
          >
            <iconify-icon
              icon={copiedAddress ? 'solar:check-circle-bold' : 'solar:copy-linear'}
              class={copiedAddress ? 'text-emerald-400 text-sm' : 'text-zinc-400 text-sm'}
            ></iconify-icon>
            <span>{copiedAddress ? 'Address Copied!' : 'Copy Address'}</span>
          </button>

          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-[#0c0c0e] hover:bg-white/5 text-zinc-300 hover:text-white border border-white/10 hover:border-[#d8b485]/40 transition-all inline-flex items-center gap-2"
          >
            <iconify-icon icon="solar:routing-2-linear" class="text-[#d8b485] text-sm"></iconify-icon>
            <span>Get Directions</span>
          </a>

          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-[#d8b485] hover:bg-[#c2a277] text-zinc-950 transition-all inline-flex items-center gap-2 font-bold shadow-lg"
          >
            <iconify-icon icon="solar:map-point-bold" class="text-zinc-950 text-sm"></iconify-icon>
            <span>View on Maps</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Styled Map Visualizer & Direction Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left / Top: Styled Map Visualizer Container (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0c0c0e] border border-white/10 relative overflow-hidden flex flex-col min-h-[440px] md:min-h-[500px]">
          
          {/* Map Controls Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#09090b] z-20">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                North York Studio Map
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span className="hidden sm:inline text-[9px] text-[#d8b485] font-mono">
                43.7719° N, 79.4147° W
              </span>
            </div>

            {/* Map Layer Switcher */}
            <div className="flex items-center gap-1 bg-[#0c0c0e] p-1 border border-white/5 text-[9px] font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveMapLayer('streets')}
                className={`px-2 py-1 transition-colors ${
                  activeMapLayer === 'streets'
                    ? 'bg-[#d8b485] text-zinc-950'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Dark Map
              </button>
              <button
                type="button"
                onClick={() => setActiveMapLayer('transit')}
                className={`px-2 py-1 transition-colors ${
                  activeMapLayer === 'transit'
                    ? 'bg-[#d8b485] text-zinc-950'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Transit
              </button>
            </div>
          </div>

          {/* Cartographic Styled Map Viewport */}
          <div className="relative flex-grow w-full bg-[#08080a] overflow-hidden flex items-center justify-center p-4 select-none">
            
            {/* SVG Vector Map Rendering */}
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-85"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Grid Pattern */}
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                </pattern>
                {/* Radial Glow for Salon Location */}
                <radialGradient id="salonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d8b485" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#d8b485" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Grid */}
              <rect width="800" height="600" fill="#08080a" />
              <rect width="800" height="600" fill="url(#mapGrid)" />

              {/* Major Road Arteries */}
              {/* Yonge Street (North-South Main Artery) */}
              <line x1="400" y1="0" x2="400" y2="600" stroke="#1f242d" strokeWidth="24" />
              <line x1="400" y1="0" x2="400" y2="600" stroke="#d8b485" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" />

              {/* Finch Avenue (North Horizontal) */}
              <line x1="0" y1="120" x2="800" y2="120" stroke="#191c22" strokeWidth="18" />
              {/* Park Home Ave / Empress Ave (Middle Horizontal) */}
              <line x1="0" y1="310" x2="800" y2="310" stroke="#191c22" strokeWidth="14" />
              {/* Sheppard Avenue (South Horizontal) */}
              <line x1="0" y1="500" x2="800" y2="500" stroke="#191c22" strokeWidth="18" />

              {/* Secondary Cross Streets */}
              <line x1="0" y1="210" x2="800" y2="210" stroke="#12141a" strokeWidth="8" />
              <line x1="0" y1="410" x2="800" y2="410" stroke="#12141a" strokeWidth="8" />
              <line x1="220" y1="0" x2="220" y2="600" stroke="#12141a" strokeWidth="8" />
              <line x1="580" y1="0" x2="580" y2="600" stroke="#12141a" strokeWidth="8" />

              {/* TTC Subway Line 1 Overlay (Yellow/Amber Track) */}
              {activeMapLayer === 'transit' && (
                <g>
                  <line x1="394" y1="0" x2="394" y2="600" stroke="#eab308" strokeWidth="4" strokeOpacity="0.75" />
                  {/* Finch Station */}
                  <circle cx="394" cy="120" r="7" fill="#08080a" stroke="#eab308" strokeWidth="3" />
                  {/* North York Centre Station */}
                  <circle cx="394" cy="310" r="7" fill="#08080a" stroke="#eab308" strokeWidth="3" />
                  {/* Sheppard-Yonge Station */}
                  <circle cx="394" cy="500" r="7" fill="#08080a" stroke="#eab308" strokeWidth="3" />
                </g>
              )}

              {/* Blocks & Points of Interest */}
              {/* Mel Lastman Square / Civic Centre */}
              <rect x="250" y="325" width="120" height="70" fill="#0f1218" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              {/* Empress Walk Complex */}
              <rect x="425" y="325" width="130" height="65" fill="#0f1218" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

              {/* Radial Beacon around Salon */}
              <circle cx="400" cy="245" r="90" fill="url(#salonGlow)" />
              <circle cx="400" cy="245" r="50" fill="none" stroke="#d8b485" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />

              {/* Text Labels on Map */}
              <text x="415" y="55" fill="#71717a" fontSize="11" fontFamily="sans-serif" letterSpacing="2">YONGE STREET (NORTH YORK)</text>
              <text x="30" y="112" fill="#52525b" fontSize="10" fontFamily="sans-serif" letterSpacing="1">FINCH AVE W</text>
              <text x="680" y="112" fill="#52525b" fontSize="10" fontFamily="sans-serif" letterSpacing="1">FINCH AVE E</text>
              <text x="30" y="302" fill="#52525b" fontSize="10" fontFamily="sans-serif" letterSpacing="1">PARK HOME AVE</text>
              <text x="660" y="302" fill="#52525b" fontSize="10" fontFamily="sans-serif" letterSpacing="1">EMPRESS AVE</text>
              <text x="30" y="492" fill="#52525b" fontSize="10" fontFamily="sans-serif" letterSpacing="1">SHEPPARD AVE W</text>

              {/* Landmark Labels */}
              <text x="260" y="360" fill="#a1a1aa" fontSize="9" fontFamily="sans-serif" fontWeight="bold">MEL LASTMAN SQUARE</text>
              <text x="435" y="360" fill="#a1a1aa" fontSize="9" fontFamily="sans-serif" fontWeight="bold">EMPRESS WALK</text>

              {/* Subway Station Labels */}
              <text x="310" y="124" fill="#fbbf24" fontSize="9" fontFamily="sans-serif" fontWeight="bold">🚇 FINCH STN</text>
              <text x="245" y="305" fill="#fbbf24" fontSize="9" fontFamily="sans-serif" fontWeight="bold">🚇 NORTH YORK CENTRE</text>
            </svg>

            {/* Pulsing Salon Pin Overlay at Center */}
            <div className="absolute top-[39%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
              {/* Gold Pin Badge */}
              <div className="px-3 py-1.5 bg-[#0c0c0e]/95 border border-[#d8b485] text-white shadow-2xl rounded-sm flex items-center gap-2 backdrop-blur-md">
                <div className="w-2.5 h-2.5 rounded-full bg-[#d8b485] animate-ping"></div>
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-[#d8b485] tracking-wider uppercase whitespace-nowrap">
                    THE MAZE HAIR SALON
                  </span>
                  <span className="block text-[9px] text-zinc-300 font-mono">
                    5233 Yonge St, North York
                  </span>
                </div>
              </div>
              
              {/* Pin Pointer Stem & Dot */}
              <div className="w-0.5 h-4 bg-[#d8b485]"></div>
              <div className="w-3 h-3 rounded-full bg-[#d8b485] border-2 border-zinc-950 shadow-md"></div>
            </div>

            {/* Bottom Overlay Card: Quick Information Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#0c0c0e]/90 backdrop-blur-md p-4 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold uppercase rounded-xs">
                    Open 7 Days
                  </span>
                  <span className="text-xs text-white font-medium">11:00 AM – 8:00 PM Daily</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  5233 Yonge St • Call{' '}
                  <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-[#d8b485] hover:underline font-mono">
                    {SALON_INFO.phone}
                  </a>
                </p>
              </div>

              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-white/10 hover:bg-[#d8b485] hover:text-zinc-950 text-white text-[10px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Open in Google Maps</span>
                <iconify-icon icon="solar:arrow-right-up-linear" style={{ fontSize: '12px' }}></iconify-icon>
              </a>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Directions & Transit Guide (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Box 1: Address & Fast Contact */}
          <div className="p-6 bg-[#0c0c0e] border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-[#d8b485]">
                <iconify-icon icon="solar:map-point-bold" style={{ fontSize: '18px' }}></iconify-icon>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Studio Address</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">North York, ON</span>
            </div>

            <div className="text-left space-y-1">
              <p className="text-base text-white font-medium">5233 Yonge St</p>
              <p className="text-xs text-zinc-400">North York, ON M2N 5P8 • Toronto, Canada</p>
              <p className="text-[11px] text-zinc-500 font-mono pt-1">
                Secondary Studio Station: Unit 106, 4750 Yonge St, M2N 6G5
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="flex-1 min-w-[130px] px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <iconify-icon icon="solar:phone-calling-linear" class="text-[#d8b485]"></iconify-icon>
                <span>(416) 227-1818</span>
              </a>
              <a
                href="#booking"
                className="flex-1 min-w-[130px] px-3.5 py-2.5 bg-[#d8b485] hover:bg-[#c2a277] text-zinc-950 text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors font-bold"
              >
                <iconify-icon icon="solar:calendar-date-bold" class="text-zinc-950"></iconify-icon>
                <span>Book Chair Slot</span>
              </a>
            </div>
          </div>

          {/* Box 2: Quick Directions by Transit & Car */}
          <div className="p-6 bg-[#0c0c0e] border border-white/5 space-y-4 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#d8b485] border-b border-white/5 pb-3 mb-4">
                <iconify-icon icon="solar:signpost-2-linear" style={{ fontSize: '18px' }}></iconify-icon>
                <span className="text-xs font-bold uppercase tracking-widest text-white">How To Reach Us</span>
              </div>

              <div className="space-y-4 text-left">
                {/* Subway */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    🚇
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                      By TTC Subway (Line 1)
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5 leading-relaxed">
                      Exit at <strong className="text-zinc-200">North York Centre Station</strong> (4 min walk north) or <strong className="text-zinc-200">Finch Station</strong> (7 min walk south) along Yonge Street.
                    </p>
                  </div>
                </div>

                {/* Bus & Transit */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    🚌
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                      TTC Bus Routes &amp; VIVA
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5 leading-relaxed">
                      Bus 97 Yonge and Blue Night 320 stop directly outside. Direct connections to GO Transit and VIVA buses at Finch Terminal.
                    </p>
                  </div>
                </div>

                {/* Driving & Parking */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    🚗
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                      Driving &amp; Parking
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5 leading-relaxed">
                      Take Hwy 401 to Yonge St North. Metered street parking available on Yonge St, plus underground public garage parking at Empress Walk &amp; nearby Green P lots.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Hours Strip */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <iconify-icon icon="solar:clock-circle-linear" class="text-[#d8b485]"></iconify-icon>
                <span>Mon – Sun: 11:00 AM – 8:00 PM</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Appointments &amp; Walk-ins</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
