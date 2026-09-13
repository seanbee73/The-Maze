import React from 'react';
import { SALON_INFO } from '../data/salonData';

export const AboutSalon: React.FC = () => {
  return (
    <section
      id="about"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 flex flex-col lg:flex-row mt-0 scroll-mt-24 aura-reveal text-left"
    >
      {/* Left Column: About & Heritage */}
      <div className="flex-1 p-8 sm:p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/5 relative bg-[#0c0c0e]">
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center opacity-5 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80')`,
          }}
        ></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              Our Story &amp; Philosophy
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-[1.1] max-w-md aura-reveal">
            Artistry, precision &amp; care since 2016.
          </h2>

          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6 max-w-md">
            Established on July 16, 2016 in North York, <strong className="text-white">The Maze Hair Salon</strong> was founded by master stylists Jason and William with a simple commitment: providing attentive, unhurried, and geometrically customized hair design.
          </p>

          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10 max-w-md">
            Whether crafting an Asian female textured pixie, executing a multi-level ash balayage with zero breakage, or giving you a soothing scalp massage wash, our team prioritizes hair health and your personal lifestyle.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md pt-6 border-t border-white/10">
            <div>
              <span className="block text-2xl font-bold text-[#d8b485] font-mono">
                {SALON_INFO.yearsInBusiness}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                In North York, Toronto
              </span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-[#d8b485] font-mono">
                7 Days
              </span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                Open 11 AM - 8 PM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Salon Amenities & Comfort */}
      <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col bg-[#09090b]">
        <div className="p-8 sm:p-12 lg:p-16 border-b border-white/5 flex-grow">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              The Client Experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SALON_INFO.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#0c0c0e] border border-white/5 hover:border-white/10 transition-colors"
              >
                <iconify-icon
                  icon={amenity.icon}
                  class="text-2xl text-[#d8b485] mb-3 block"
                ></iconify-icon>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  {amenity.title}
                </h4>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Imagery Grid */}
        <div className="grid grid-cols-2 min-h-[160px]">
          <div
            className="bg-cover bg-center border-r border-white/5"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80')`,
            }}
          ></div>
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80')`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};
