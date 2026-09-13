import React from 'react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onOpenAdmin?: () => void;
  pendingBookingsCount?: number;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, pendingBookingsCount = 0 }) => {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 z-10 relative mt-auto aura-reveal text-left">
      <div className="max-w-[1400px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-widest text-white uppercase">
              THE MAZE HAIR SALON
            </span>
          </div>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="text-xs text-zinc-500">
            5233 Yonge St, North York, ON •{' '}
            <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-zinc-400 hover:text-[#d8b485]">
              {SALON_INFO.phone}
            </a>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500">
          <a href="#about" className="hover:text-zinc-300 transition-colors">
            About Us
          </a>
          <a href="#services" className="hover:text-zinc-300 transition-colors">
            Services &amp; Pricing
          </a>
          <a href="#location" className="hover:text-zinc-300 transition-colors">
            Location &amp; Map
          </a>
          <a href="#booking" className="hover:text-zinc-300 transition-colors">
            Book Appointment
          </a>
          
          {/* Admin Access next to Book Appointment */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-[#d8b485] border border-white/10 hover:border-[#d8b485]/40 transition-all font-medium cursor-pointer"
              title="Salon Staff & Management Admin Portal"
            >
              <iconify-icon icon="solar:shield-keyhole-bold" class="text-[#d8b485] text-xs"></iconify-icon>
              <span>Admin</span>
              {pendingBookingsCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-400 text-zinc-950 text-[9px] font-bold rounded-full">
                  {pendingBookingsCount}
                </span>
              )}
            </button>
          )}

          <span className="text-zinc-600">© 2016–2026 The Maze Hair Salon.</span>
        </div>
      </div>
    </footer>
  );
};

