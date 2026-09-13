import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExpertiseGrid } from './components/ExpertiseGrid';
import { AboutServices } from './components/AboutServices';
import { PortfolioGallery } from './components/PortfolioGallery';
import { StylistsSection } from './components/StylistsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSalon } from './components/AboutSalon';
import { Location } from './components/Location';
import { ContactBookingSection } from './components/ContactBookingSection';
import { Footer } from './components/Footer';
import { PortfolioDetailModal } from './components/PortfolioDetailModal';
import { CMSModal } from './components/CMSModal';
import { INITIAL_BOOKINGS, INITIAL_PORTFOLIO, INITIAL_SERVICES } from './data/salonData';
import { BookingInquiry, HairService, PortfolioItem } from './types';

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

  // Persistence state for Booking Inquiries & Appointments
  const [bookings, setBookings] = useState<BookingInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('the_maze_appointments');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Modals and interactive booking pre-fills
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [cmsInitialTab, setCmsInitialTab] = useState<'bookings' | 'portfolio' | 'services' | 'backup'>('bookings');
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [preselectedStylist, setPreselectedStylist] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistence handlers for Portfolio
  const handleUpdatePortfolio = (updated: PortfolioItem[]) => {
    setPortfolioItems(updated);
    try {
      localStorage.setItem('the_maze_portfolio', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Persistence handlers for Services
  const handleUpdateServices = (updated: HairService[]) => {
    setServices(updated);
    try {
      localStorage.setItem('the_maze_services', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Persistence handlers for Bookings
  const handleNewBooking = (newRecord: BookingInquiry) => {
    const updated = [newRecord, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('the_maze_appointments', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setToastMessage(`New booking received from ${newRecord.name} (#${newRecord.id})!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleUpdateBookingStatus = (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    try {
      localStorage.setItem('the_maze_appointments', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    try {
      localStorage.setItem('the_maze_appointments', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddManualBooking = (created: BookingInquiry) => {
    const updated = [created, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('the_maze_appointments', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleClearAllBookings = () => {
    setBookings([]);
    try {
      localStorage.setItem('the_maze_appointments', JSON.stringify([]));
    } catch {
      // ignore
    }
  };

  const handleResetDefaults = () => {
    setPortfolioItems(INITIAL_PORTFOLIO);
    setServices(INITIAL_SERVICES);
    setBookings(INITIAL_BOOKINGS);
    try {
      localStorage.removeItem('the_maze_portfolio');
      localStorage.removeItem('the_maze_services');
      localStorage.setItem('the_maze_appointments', JSON.stringify(INITIAL_BOOKINGS));
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
          onOpenCMS={() => {
            setCmsInitialTab('portfolio');
            setIsCMSOpen(true);
          }}
        />
        <StylistsSection onSelectStylistForBooking={handleSelectStylistForBooking} />
        <ReviewsSection />
        <AboutSalon />
        <Location />
        <ContactBookingSection
          preselectedService={preselectedService}
          preselectedStylist={preselectedStylist}
          bookingsCount={bookings.length}
          onNewBooking={handleNewBooking}
          onOpenBookingsInbox={() => {
            setCmsInitialTab('bookings');
            setIsCMSOpen(true);
          }}
        />
      </main>

      {/* Footer with Admin Access next to Book Appointment */}
      <Footer
        onOpenAdmin={() => {
          setCmsInitialTab('bookings');
          setIsCMSOpen(true);
        }}
        pendingBookingsCount={bookings.filter((b) => (b.status || 'pending') === 'pending').length}
      />

      {/* Toast Notification for incoming booking requests */}
      {toastMessage && (
        <aside aria-label="Notifications" className="fixed top-24 right-6 z-50 animate-fadeIn">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0c0c0e] border border-[#d8b485] text-white shadow-2xl rounded">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <div className="text-xs">
              <p className="font-bold text-[#d8b485] uppercase tracking-wider text-[10px]">New Booking Request</p>
              <p className="text-zinc-200">{toastMessage}</p>
            </div>
            <button
              onClick={() => {
                setCmsInitialTab('bookings');
                setIsCMSOpen(true);
                setToastMessage(null);
              }}
              className="ml-2 px-2.5 py-1 text-[10px] font-bold uppercase bg-[#d8b485] text-zinc-950 rounded hover:bg-[#c2a277]"
            >
              Open Admin
            </button>
            <button
              onClick={() => setToastMessage(null)}
              className="text-zinc-500 hover:text-white p-1 text-xs"
            >
              ✕
            </button>
          </div>
        </aside>
      )}

      {/* Hair Transformation Detail Modal */}
      <PortfolioDetailModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onBookLook={handleBookFromPortfolio}
      />

      {/* Salon Admin Portal Modal */}
      <CMSModal
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        portfolioItems={portfolioItems}
        onUpdatePortfolio={handleUpdatePortfolio}
        services={services}
        onUpdateServices={handleUpdateServices}
        onResetDefaults={handleResetDefaults}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onDeleteBooking={handleDeleteBooking}
        onAddManualBooking={handleAddManualBooking}
        onClearAllBookings={handleClearAllBookings}
        initialTab={cmsInitialTab}
      />
    </div>
  );
}
