import React from 'react';
import { SALON_INFO } from '../data/salonData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 z-10 relative mt-auto aura-reveal text-left">
      <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-widest text-white uppercase">
              THE MAZE HAIR SALON
            </span>
          </div>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="text-xs text-zinc-500">
            5233 Yonge St, North York, ON • <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-zinc-400 hover:text-[#d8b485]">{SALON_INFO.phone}</a>
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-600">
          <a href="#about" className="hover:text-zinc-300 transition-colors">
            About Us
          </a>
          <a href="#services" className="hover:text-zinc-300 transition-colors">
            Services &amp; Pricing
          </a>
          <a href="#booking" className="hover:text-zinc-300 transition-colors">
            Book Appointment
          </a>
          <span>© 2016–2026 The Maze Hair Salon. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
