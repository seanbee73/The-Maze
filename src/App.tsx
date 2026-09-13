import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExpertiseGrid } from './components/ExpertiseGrid';
import { AboutServices } from './components/AboutServices';
import { PortfolioGallery } from './components/PortfolioGallery';
import { StylistsSection } from './components/StylistsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSalon } from './components/AboutSalon';
import { ContactBookingSection } from './components/ContactBookingSection';
import { Footer } from './components/Footer';
import { PortfolioDetailModal } from './components/PortfolioDetailModal';
import { CMSModal } from './components/CMSModal';
import { INITIAL_PORTFOLIO, INITIAL_SERVICES } from './data/salonData';
import { HairService, PortfolioItem } from './types';

export default function App() {
  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem('the_maze_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  // Sync theme to document element
  useEffect(() => {
    try {
      if (theme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
      localStorage.setItem('the_maze_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Persistence state for Portfolio Transformations
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('the_maze_portfolio');
      return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
    } catch {
      return INITIAL_PORTFOLIO;
    }
  });

  // Persistence state for Hair Services & Pricing
  const [services, setServices] = useState<HairService[]>(() => {
    try {
      const saved = localStorage.getItem('the_maze_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  // Modals and interactive booking pre-fills
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [preselectedStylist, setPreselectedStylist] = useState<string | undefined>(undefined);

  // Persistence handlers
  const handleUpdatePortfolio = (updated: PortfolioItem[]) => {
    setPortfolioItems(updated);
    try {
      localStorage.setItem('the_maze_portfolio', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleUpdateServices = (updated: HairService[]) => {
    setServices(updated);
    try {
      localStorage.setItem('the_maze_services', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetDefaults = () => {
    setPortfolioItems(INITIAL_PORTFOLIO);
    setServices(INITIAL_SERVICES);
    try {
      localStorage.removeItem('the_maze_portfolio');
      localStorage.removeItem('the_maze_services');
    } catch {
      // ignore
    }
  };

  // Pre-fill booking form helpers
  const handleSelectServiceForBooking = (serviceName: string) => {
    setPreselectedService(serviceName);
  };

  const handleSelectStylistForBooking = (stylistName: string) => {
    setPreselectedStylist(stylistName);
  };

  const handleBookFromPortfolio = (serviceName: string, stylistName: string) => {
    setPreselectedService(serviceName);
    setPreselectedStylist(stylistName);
    const bookingElem = document.getElementById('booking');
    bookingElem?.scrollIntoView({ behavior: 'smooth' });
  };

  // IntersectionObserver for smooth scroll entrance animations
  useEffect(() => {
    const els = document.querySelectorAll('section, footer, .grid > div, h1, h2, .aura-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('aura-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, [portfolioItems, services]);

  return (
    <div className={`text-zinc-300 antialiased selection:bg-zinc-800 selection:text-white relative min-h-screen flex flex-col bg-[#09090b] ${theme}`}>
      {/* Background Ambience Glow */}
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Navigation Header with Light/Dark Mode Toggle in Top Right */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onBookClick={() => {
          const bookingElem = document.getElementById('booking');
          bookingElem?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-grow z-10 relative pt-0 pb-0">
        <Hero />
        <ExpertiseGrid />
        <AboutServices
          services={services}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />
        <PortfolioGallery
          portfolioItems={portfolioItems}
          onSelectPortfolioItem={(item) => setSelectedPortfolioItem(item)}
          onOpenCMS={() => setIsCMSOpen(true)}
        />
        <StylistsSection onSelectStylistForBooking={handleSelectStylistForBooking} />
        <ReviewsSection />
        <AboutSalon />
        <ContactBookingSection
          preselectedService={preselectedService}
          preselectedStylist={preselectedStylist}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Hair Transformation Detail Modal */}
      <PortfolioDetailModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onBookLook={handleBookFromPortfolio}
      />

      {/* Salon CMS Modal */}
      <CMSModal
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        portfolioItems={portfolioItems}
        onUpdatePortfolio={handleUpdatePortfolio}
        services={services}
        onUpdateServices={handleUpdateServices}
        onResetDefaults={handleResetDefaults}
      />

      {/* Floating Salon CMS Quick-Access Button */}
      <aside aria-label="CMS Quick Access" className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsCMSOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#0c0c0e]/90 hover:bg-[#111114] border border-white/10 hover:border-[#d8b485]/50 text-zinc-300 hover:text-white rounded-full shadow-lg backdrop-blur-md transition-all text-[10px] font-bold tracking-widest uppercase group"
          title="Open Salon CMS to manage portfolio styles and service prices"
        >
          <iconify-icon
            icon="solar:pen-new-square-linear"
            class="text-[#d8b485] text-sm group-hover:rotate-12 transition-transform"
          ></iconify-icon>
          <span className="hidden sm:inline">Manage Portfolio &amp; Services (CMS)</span>
          <span className="sm:hidden">CMS</span>
        </button>
      </aside>
    </div>
  );
}
