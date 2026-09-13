import React from 'react';
import { STYLISTS_TEAM } from '../data/salonData';

interface StylistsSectionProps {
  onSelectStylistForBooking?: (stylistName: string) => void;
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({
  onSelectStylistForBooking,
}) => {
  return (
    <section
      id="stylists"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-8 h-px bg-[#d8b485]"></div>
        <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
          Master Hair Designers &amp; Colorists
        </p>
      </div>

      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-[1.1] max-w-2xl aura-reveal">
        Meet our dedicated styling team.
      </h2>
      <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-2xl mb-12">
        Our licensed stylists bring extensive international craftsmanship from Hong Kong, Tokyo, and Toronto—specializing in Asian hair geometries, color chemistry, and delicate hand texturing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {STYLISTS_TEAM.map((stylist) => (
          <div
            key={stylist.id}
            className="bg-[#0c0c0e] border border-white/5 p-6 flex flex-col justify-between hover:border-white/20 transition-all group"
          >
            <div>
              {/* Profile Image & Rating */}
              <div className="relative aspect-square w-full mb-6 overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-[#09090b]/90 border border-white/10 px-2.5 py-1 text-[9px] font-bold text-[#d8b485] flex items-center gap-1">
                  <iconify-icon icon="solar:star-bold"></iconify-icon>
                  <span>{stylist.rating} ({stylist.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-base font-bold text-white group-hover:text-[#d8b485] transition-colors">
                {stylist.name}
              </h3>
              <p className="text-[10px] text-[#d8b485] font-mono uppercase mb-2">
                {stylist.role}
              </p>
              <p className="text-[10px] text-zinc-500 mb-4">
                {stylist.experience} • Languages: {stylist.languages.join(', ')}
              </p>

              <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                {stylist.bio}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1 mb-6">
                {stylist.specialty.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] px-2 py-0.5 bg-white/5 text-zinc-300 border border-white/5"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Book with Stylist */}
            <button
              onClick={() => {
                if (onSelectStylistForBooking) {
                  onSelectStylistForBooking(stylist.name);
                }
                const bookingElem = document.getElementById('booking');
                bookingElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2.5 text-[10px] font-bold tracking-widest uppercase bg-white/5 hover:bg-[#d8b485] text-zinc-300 hover:text-zinc-950 border border-white/10 hover:border-[#d8b485] transition-all text-center"
            >
              Book with {stylist.name.split(' ')[0]} →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
