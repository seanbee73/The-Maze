import React from 'react';
import { SALON_INFO } from '../data/salonData';

export const Hero: React.FC = () => {
  return (
    <>
      {/* Background Salon Atmosphere & Gradients */}
      <div className="absolute top-0 left-0 w-full h-[100vh] min-h-[750px] z-[-1] pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=2000')`,
            backgroundPosition: 'center 35%',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/90 to-[#09090b]/40 hero-bg-gradient-r"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/60 hero-bg-gradient-t"></div>
      </div>

      {/* Hero Content */}
      <section
        id="home"
        className="max-w-[1400px] mx-auto px-6 flex flex-col items-start text-left pt-36 md:pt-40 pb-20 relative w-full scroll-mt-24 aura-reveal"
      >
        {/* Rating & Heritage Pill */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#d8b485]"></div>
          <div className="flex items-center gap-2 bg-[#0c0c0e]/80 border border-white/10 px-3 py-1 backdrop-blur-sm">
            <div className="flex items-center text-[#d8b485] text-xs">
              <iconify-icon icon="solar:star-bold"></iconify-icon>
              <iconify-icon icon="solar:star-bold"></iconify-icon>
              <iconify-icon icon="solar:star-bold"></iconify-icon>
              <iconify-icon icon="solar:star-bold"></iconify-icon>
              <iconify-icon icon="solar:star-linear"></iconify-icon>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              4.4 ★ (148+ Google Reviews)
            </span>
          </div>
          <span className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
            Est. July 16, 2016 • North York
          </span>
        </div>

        {/* Big H1 Brand */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-2 leading-none uppercase aura-reveal">
          THE MAZE
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 w-full max-w-2xl">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-light tracking-[0.25em] text-[#d8b485] uppercase whitespace-nowrap aura-reveal">
            Hair Salon
          </h2>
          <div className="hidden sm:block flex-grow h-px bg-[#d8b485]/40"></div>
        </div>

        <p className="text-sm md:text-base text-zinc-300 max-w-xl font-light mb-10 leading-relaxed">
          Full-service hair design studio specializing in <strong className="text-white font-medium">dimensional balayage</strong>, Asian female pixie cuts, precision layering, Japanese &amp; Korean digital perms, and relaxing head massage washes in North York.
        </p>

        {/* Fast Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-16 w-full sm:w-auto">
          <a
            href="#booking"
            className="inline-flex items-center justify-center px-8 py-4 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] transition-all uppercase text-center"
          >
            Book Appointment →
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center px-6 py-4 text-[10px] font-bold tracking-widest text-white uppercase border border-white/20 hover:border-[#d8b485] hover:text-[#d8b485] transition-colors text-center bg-[#0c0c0e]/60"
          >
            Services &amp; Pricing
          </a>
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase hover:text-white transition-colors py-2"
          >
            <iconify-icon icon="solar:phone-calling-linear" class="text-base text-[#d8b485]"></iconify-icon>
            <span>Call (416) 227-1818</span>
          </a>
        </div>

        {/* Quick Highlights Bar */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-left">
          <div className="p-4 bg-[#0c0c0e]/80 border border-white/5 backdrop-blur-sm">
            <span className="block text-[9px] uppercase tracking-widest text-[#d8b485] font-bold mb-1">
              Location
            </span>
            <p className="text-xs text-white font-medium">5233 Yonge St</p>
            <p className="text-[10px] text-zinc-500">North York, ON (TTC Accessible)</p>
          </div>

          <div className="p-4 bg-[#0c0c0e]/80 border border-white/5 backdrop-blur-sm">
            <span className="block text-[9px] uppercase tracking-widest text-[#d8b485] font-bold mb-1">
              Opening Hours
            </span>
            <p className="text-xs text-white font-medium">11:00 AM – 8:00 PM</p>
            <p className="text-[10px] text-emerald-400 font-medium">Open 7 Days a Week</p>
          </div>

          <div className="p-4 bg-[#0c0c0e]/80 border border-white/5 backdrop-blur-sm">
            <span className="block text-[9px] uppercase tracking-widest text-[#d8b485] font-bold mb-1">
              Signature Service
            </span>
            <p className="text-xs text-white font-medium">Balayage &amp; Pixie Cuts</p>
            <p className="text-[10px] text-zinc-500">Expert Asian Hair Textures</p>
          </div>

          <div className="p-4 bg-[#0c0c0e]/80 border border-white/5 backdrop-blur-sm">
            <span className="block text-[9px] uppercase tracking-widest text-[#d8b485] font-bold mb-1">
              Client Amenities
            </span>
            <p className="text-xs text-white font-medium">Scalp Massage &amp; Lockers</p>
            <p className="text-[10px] text-zinc-500">English, Mandarin, Cantonese</p>
          </div>
        </div>

        {/* Vertical decorative region tag */}
        <div className="absolute right-0 top-[60%] -translate-y-1/2 rotate-90 origin-right text-[10px] tracking-[0.5em] text-zinc-500 uppercase hidden xl:block">
          North York • Toronto
        </div>

        {/* Circular Seal Badge */}
        <div className="absolute right-12 bottom-12 w-32 h-32 rounded-full border border-[#d8b485]/30 hidden lg:flex items-center justify-center backdrop-blur-sm">
          <div className="text-center flex flex-col items-center justify-center">
            <span className="block text-[#d8b485] text-[10px] tracking-widest mb-1">
              THE MAZE
            </span>
            <span className="block text-3xl font-serif text-[#d8b485] leading-none mb-1 font-bold">
              M
            </span>
            <span className="block text-zinc-500 text-[8px] tracking-widest">
              EST. 2016
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
