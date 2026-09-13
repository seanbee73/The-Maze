import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';

interface HeaderProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onBookClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme = 'dark', onToggleTheme, onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-white/5 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          className="flex items-center gap-3 cursor-pointer group"
          aria-label="The Maze Hair Salon Home"
        >
          <div className="w-10 h-10 rounded-sm border border-[#d8b485]/50 bg-[#0c0c0e] flex items-center justify-center text-[#d8b485] font-serif font-bold text-xl group-hover:border-[#d8b485] transition-colors">
            M
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base font-bold tracking-widest text-white uppercase group-hover:text-[#d8b485] transition-colors">
              THE MAZE
            </span>
            <span className="text-[9px] tracking-[0.25em] text-zinc-500 uppercase font-medium">
              Hair Salon • North York
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[10px] font-bold tracking-widest text-white/70 uppercase">
          <a href="#services" className="hover:text-[#d8b485] transition-colors">
            Services &amp; Pricing
          </a>
          <a href="#portfolio" className="hover:text-[#d8b485] transition-colors">
            Hair Portfolio
          </a>
          <a href="#stylists" className="hover:text-[#d8b485] transition-colors">
            Our Stylists
          </a>
          <a href="#reviews" className="hover:text-[#d8b485] transition-colors">
            Reviews
          </a>
          <a href="#about" className="hover:text-[#d8b485] transition-colors">
            About Salon
          </a>
          <a href="#location" className="hover:text-[#d8b485] transition-colors">
            Hours &amp; Location
          </a>
        </nav>

        {/* Action Controls & Top Right Controls */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="hidden xl:inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#d8b485] transition-colors border-r border-white/10 pr-4"
            title="Call to book an appointment"
          >
            <iconify-icon icon="solar:phone-calling-linear" class="text-[#d8b485] text-base"></iconify-icon>
            <span>{SALON_INFO.phone}</span>
          </a>

          {/* Light / Dark Mode Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              id="theme-toggle-button"
              type="button"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="inline-flex items-center justify-center w-10 h-10 rounded border border-white/10 hover:border-[#d8b485]/60 bg-white/5 hover:bg-white/10 text-[#d8b485] hover:text-white transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <iconify-icon icon="solar:sun-2-bold" style={{ fontSize: '18px' }}></iconify-icon>
              ) : (
                <iconify-icon icon="solar:moon-bold" style={{ fontSize: '18px' }}></iconify-icon>
              )}
            </button>
          )}

          <a
            href="#booking"
            onClick={onBookClick}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] transition-colors uppercase"
          >
            Book Appointment →
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden ml-1 text-zinc-400 hover:text-white p-2"
            aria-label="Toggle Navigation Menu"
          >
            <iconify-icon
              icon={mobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
              style={{ fontSize: '24px' }}
            ></iconify-icon>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09090b] border-b border-white/10 px-6 py-6 space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-mono text-[#d8b485]"
            >
              <iconify-icon icon="solar:phone-calling-linear"></iconify-icon>
              <span>{SALON_INFO.phone}</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-500">11:00 AM - 8:00 PM Daily</span>
            </div>
          </div>

          <nav className="flex flex-col gap-4 text-xs font-bold tracking-widest text-zinc-300 uppercase">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-1 border-b border-white/5"
            >
              Services &amp; Pricing
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-1 border-b border-white/5"
            >
              Hair Portfolio
            </a>
            <a
              href="#stylists"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-1 border-b border-white/5"
            >
              Our Stylists
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-1 border-b border-white/5"
            >
              Client Reviews
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-1 border-b border-white/5"
            >
              About The Maze
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-1 border-b border-white/5"
            >
              Hours &amp; Location
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-6 py-3 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] uppercase text-center"
            >
              Book Appointment Online →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
