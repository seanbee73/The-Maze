import React, { useState, useEffect } from 'react';
import { BookingInquiry, HairService, PortfolioItem } from '../types';
import { BookingRequestsManager } from './BookingRequestsManager';

interface CMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioItems: PortfolioItem[];
  onUpdatePortfolio: (items: PortfolioItem[]) => void;
  services: HairService[];
  onUpdateServices: (services: HairService[]) => void;
  onResetDefaults: () => void;
  bookings: BookingInquiry[];
  onUpdateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => void;
  onDeleteBooking: (id: string) => void;
  onAddManualBooking: (booking: BookingInquiry) => void;
  onClearAllBookings?: () => void;
  initialTab?: 'bookings' | 'portfolio' | 'services' | 'backup';
}

export const CMSModal: React.FC<CMSModalProps> = ({
  isOpen,
  onClose,
  portfolioItems,
  onUpdatePortfolio,
  services,
  onUpdateServices,
  onResetDefaults,
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  onAddManualBooking,
  onClearAllBookings,
  initialTab = 'bookings',
}) => {
  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return (
        localStorage.getItem('the_maze_admin_auth') === 'true' ||
        sessionStorage.getItem('the_maze_admin_auth') === 'true'
      );
    } catch {
      return false;
    }
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'bookings' | 'portfolio' | 'services' | 'backup'>(initialTab);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    const user = usernameInput.trim().toLowerCase();
    const pass = passwordInput.trim();

    // Valid credentials:
    // Usernames: 'admin', 'admin@themaze.ca', 'manager'
    // Passwords: 'themaze2026', 'maze5233', '5233', 'admin'
    const validUsernames = ['admin', 'admin@themaze.ca', 'manager', 'themaze'];
    const validPasswords = ['themaze2026', 'maze5233', '5233', 'admin'];

    setTimeout(() => {
      setIsLoggingIn(false);
      if (validUsernames.includes(user) && validPasswords.includes(pass)) {
        setIsAuthenticated(true);
        try {
          if (rememberMe) {
            localStorage.setItem('the_maze_admin_auth', 'true');
          } else {
            sessionStorage.setItem('the_maze_admin_auth', 'true');
          }
        } catch {
          // ignore
        }
      } else {
        setLoginError('Invalid admin credentials. Please check your username and password.');
      }
    }, 400);
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('the_maze_admin_auth');
      sessionStorage.removeItem('the_maze_admin_auth');
    } catch {
      // ignore
    }
  };

  const handleQuickFillDemo = () => {
    setUsernameInput('admin');
    setPasswordInput('themaze2026');
    setLoginError(null);
  };

  const pendingBookingsCount = bookings.filter((b) => (b.status || 'pending') === 'pending').length;

  // Form State for Portfolio Item
  const [portfolioForm, setPortfolioForm] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'Balayage & Ombre',
    stylist: 'Jason (Master Stylist)',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200',
    galleryImages: ['https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200'],
    clientHairType: 'Asian straight hair seeking volume',
    technique: 'Seamless Balayage + Bond Multiplier',
    summary: 'Dimensional ash tones with soft face-framing layers.',
    details: 'Custom consultation and formulation to prevent breakage while maintaining cool tone longevity.',
    tags: ['Balayage', 'Ash Blonde', 'Fine Hair'],
    metrics: [
      { label: 'Lift Level', value: 'Level 9' },
      { label: 'Tone Durability', value: '12 Weeks' },
      { label: 'Damage Control', value: 'Zero Breakage' },
    ],
  });

  // Form State for Service
  const [serviceForm, setServiceForm] = useState<Partial<HairService>>({
    name: '',
    category: 'Haircuts & Styling',
    priceEstimate: '$65 - $95',
    duration: '60 mins',
    description: '',
    features: ['Scalp massage wash', 'Blowout style'],
    popular: false,
  });

  if (!isOpen) return null;

  // Portfolio Handlers
  const handleEditPortfolio = (item: PortfolioItem) => {
    setEditingItemId(item.id);
    setPortfolioForm(JSON.parse(JSON.stringify(item)));
  };

  const handleNewPortfolio = () => {
    setEditingItemId('new');
    setPortfolioForm({
      title: '',
      category: 'Balayage & Ombre',
      stylist: 'Jason (Master Stylist)',
      image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200',
      galleryImages: ['https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200'],
      clientHairType: 'Medium density hair',
      technique: 'Custom layered cut & dimensional color',
      summary: '',
      details: '',
      tags: ['Salon Style', 'The Maze'],
      metrics: [
        { label: 'Duration', value: '2 hrs' },
        { label: 'Longevity', value: '8 Weeks' },
        { label: 'Finish', value: 'Silky Gloss' },
      ],
    });
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioForm.title) return;

    if (editingItemId === 'new') {
      const newItem: PortfolioItem = {
        id: `p_${Date.now()}`,
        title: portfolioForm.title || 'New Hair Style',
        category: (portfolioForm.category as any) || 'Balayage & Ombre',
        stylist: portfolioForm.stylist || 'Jason',
        image: portfolioForm.image || 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200',
        galleryImages: portfolioForm.galleryImages || [portfolioForm.image || ''],
        clientHairType: portfolioForm.clientHairType || 'Natural hair',
        technique: portfolioForm.technique || 'Precision haircut',
        summary: portfolioForm.summary || '',
        details: portfolioForm.details || '',
        tags: portfolioForm.tags || [],
        metrics: portfolioForm.metrics || [],
      };
      onUpdatePortfolio([newItem, ...portfolioItems]);
    } else if (editingItemId) {
      const updated = portfolioItems.map((item) =>
        item.id === editingItemId ? ({ ...item, ...portfolioForm } as PortfolioItem) : item
      );
      onUpdatePortfolio(updated);
    }
    setEditingItemId(null);
  };

  const handleDeletePortfolio = (id: string) => {
    if (confirm('Delete this style from the hair portfolio?')) {
      onUpdatePortfolio(portfolioItems.filter((i) => i.id !== id));
      if (editingItemId === id) setEditingItemId(null);
    }
  };

  // Service Handlers
  const handleEditService = (srv: HairService) => {
    setEditingServiceId(srv.id);
    setServiceForm(JSON.parse(JSON.stringify(srv)));
  };

  const handleNewService = () => {
    setEditingServiceId('new');
    setServiceForm({
      name: '',
      category: 'Haircuts & Styling',
      priceEstimate: '$50 - $80',
      duration: '45 mins',
      description: '',
      features: ['Includes wash & scalp massage'],
      popular: false,
    });
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name) return;

    if (editingServiceId === 'new') {
      const newSrv: HairService = {
        id: `srv_${Date.now()}`,
        name: serviceForm.name,
        category: (serviceForm.category as any) || 'Haircuts & Styling',
        priceEstimate: serviceForm.priceEstimate || '$50 - $80',
        duration: serviceForm.duration || '45 mins',
        description: serviceForm.description || '',
        features: serviceForm.features || [],
        popular: serviceForm.popular || false,
      };
      onUpdateServices([...services, newSrv]);
    } else if (editingServiceId) {
      const updated = services.map((s) =>
        s.id === editingServiceId ? ({ ...s, ...serviceForm } as HairService) : s
      );
      onUpdateServices(updated);
    }
    setEditingServiceId(null);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Delete this service from the price menu?')) {
      onUpdateServices(services.filter((s) => s.id !== id));
      if (editingServiceId === id) setEditingServiceId(null);
    }
  };

  // Export / Backup
  const handleExportData = () => {
    const data = { portfolioItems, services };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `the_maze_salon_content_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        if (json.portfolioItems) onUpdatePortfolio(json.portfolioItems);
        if (json.services) onUpdateServices(json.services);
        alert('Salon content successfully restored!');
      } catch {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* If Not Authenticated: Show Secure Admin Login Dialog */}
      {!isAuthenticated ? (
        <div className="relative w-full max-w-md bg-[#0c0c0e] border border-[#d8b485]/40 shadow-2xl my-auto text-left overflow-hidden">
          {/* Top Gold Accent Bar */}
          <div className="h-1 bg-gradient-to-r from-[#d8b485] via-amber-200 to-[#d8b485]"></div>

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#09090b]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#d8b485]/10 border border-[#d8b485]/30 flex items-center justify-center text-[#d8b485]">
                <iconify-icon icon="solar:shield-keyhole-bold" style={{ fontSize: '16px' }}></iconify-icon>
              </div>
              <div>
                <h2 className="text-xs font-bold tracking-widest text-white uppercase">
                  The Maze • Admin Portal
                </h2>
                <p className="text-[10px] text-zinc-500">Staff &amp; Salon Management Access</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 transition-colors"
              aria-label="Close"
            >
              <iconify-icon icon="solar:close-circle-linear" style={{ fontSize: '20px' }}></iconify-icon>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
            <div className="text-left">
              <p className="text-xs text-zinc-300 leading-relaxed">
                Enter your administrative credentials to manage client booking requests, hair portfolio transformations, and salon service prices.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs rounded flex items-center gap-2">
                <iconify-icon icon="solar:danger-triangle-bold" style={{ fontSize: '16px' }}></iconify-icon>
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Username / Email
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. admin or admin@themaze.ca"
                required
                className="w-full bg-[#09090b] border border-white/10 focus:border-[#d8b485] px-3.5 py-2.5 text-xs text-white outline-none rounded transition-colors"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-[#09090b] border border-white/10 focus:border-[#d8b485] px-3.5 py-2.5 text-xs text-white outline-none rounded transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[11px]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-zinc-900 border-white/20 text-[#d8b485] focus:ring-0"
                />
                <span>Remember this device</span>
              </label>

              <button
                type="button"
                onClick={handleQuickFillDemo}
                className="text-[11px] text-[#d8b485] hover:underline font-mono"
              >
                Auto-fill Demo
              </button>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-[#d8b485] hover:bg-[#c2a277] text-zinc-950 text-xs font-bold uppercase tracking-widest transition-all rounded shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <iconify-icon icon="solar:spinner-linear" class="animate-spin text-sm"></iconify-icon>
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <iconify-icon icon="solar:lock-unlocked-bold" style={{ fontSize: '15px' }}></iconify-icon>
                    <span>Access Admin Portal</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Helper Note for the Owner */}
            <div className="p-3 bg-white/5 border border-white/5 rounded text-[11px] text-zinc-400 font-mono space-y-1">
              <p className="text-zinc-300 font-bold text-[10px] uppercase tracking-wider">Default Admin Credentials:</p>
              <p>👤 <span className="text-zinc-200">Username:</span> <code className="text-[#d8b485]">admin</code></p>
              <p>🔑 <span className="text-zinc-200">Password:</span> <code className="text-[#d8b485]">themaze2026</code></p>
            </div>
          </form>
        </div>
      ) : (
        <div className="relative w-full max-w-5xl bg-[#0c0c0e] border border-white/10 shadow-2xl my-auto text-left flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#09090b]">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold tracking-widest text-white uppercase">
                    The Maze Salon Admin Portal
                  </h2>
                  <span className="px-2 py-0.5 bg-[#d8b485]/10 border border-[#d8b485]/30 text-[#d8b485] text-[9px] font-mono font-bold rounded">
                    Staff Authenticated
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500">
                  5233 Yonge St • Manage bookings, portfolio transformations and pricing
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAdminLogout}
                className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-zinc-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 rounded uppercase transition-colors flex items-center gap-1"
                title="Log out of Admin Portal"
              >
                <iconify-icon icon="solar:logout-linear" style={{ fontSize: '13px' }}></iconify-icon>
                <span className="hidden sm:inline">Log Out</span>
              </button>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white p-1 transition-colors"
                aria-label="Close Admin Portal"
              >
                <iconify-icon icon="solar:close-circle-linear" style={{ fontSize: '24px' }}></iconify-icon>
              </button>
            </div>
          </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-white/10 bg-[#09090b]/50 px-6 gap-6 text-xs uppercase font-bold tracking-widest overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('bookings');
              setEditingItemId(null);
              setEditingServiceId(null);
            }}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'bookings'
                ? 'border-[#d8b485] text-[#d8b485]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <iconify-icon icon="solar:inbox-line-bold" style={{ fontSize: '15px' }}></iconify-icon>
            <span>Booking Requests ({bookings.length})</span>
            {pendingBookingsCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-400 text-zinc-950 text-[9px] font-extrabold rounded-full animate-pulse">
                {pendingBookingsCount} New
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('portfolio');
              setEditingItemId(null);
              setEditingServiceId(null);
            }}
            className={`py-3.5 border-b-2 transition-colors shrink-0 ${
              activeTab === 'portfolio'
                ? 'border-[#d8b485] text-[#d8b485]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Hair Portfolio ({portfolioItems.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('services');
              setEditingServiceId(null);
              setEditingItemId(null);
            }}
            className={`py-3.5 border-b-2 transition-colors shrink-0 ${
              activeTab === 'services'
                ? 'border-[#d8b485] text-[#d8b485]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Services &amp; Pricing ({services.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('backup');
              setEditingItemId(null);
              setEditingServiceId(null);
            }}
            className={`py-3.5 border-b-2 transition-colors shrink-0 ${
              activeTab === 'backup'
                ? 'border-[#d8b485] text-[#d8b485]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Backup &amp; Reset
          </button>
        </div>

        {/* CMS Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* TAB 0: Booking Requests Inbox */}
          {activeTab === 'bookings' && (
            <BookingRequestsManager
              bookings={bookings}
              onUpdateStatus={onUpdateBookingStatus}
              onDeleteBooking={onDeleteBooking}
              onAddManualBooking={onAddManualBooking}
              onClearAllBookings={onClearAllBookings}
            />
          )}

          {/* TAB 1: Portfolio Items */}
          {activeTab === 'portfolio' && (
            <div>
              {editingItemId ? (
                /* Edit/New Portfolio Form */
                <form onSubmit={handleSavePortfolio} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingItemId === 'new' ? 'Add New Hair Transformation' : 'Edit Hair Style'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingItemId(null)}
                      className="text-xs text-zinc-400 hover:text-white"
                    >
                      ← Back to list
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Transformation Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={portfolioForm.title || ''}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                        placeholder="e.g. Ash Blonde Balayage Melt"
                        className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Category
                      </label>
                      <select
                        value={portfolioForm.category || 'Balayage & Ombre'}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value as any })}
                        className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                      >
                        <option value="Balayage & Ombre">Balayage &amp; Ombre</option>
                        <option value="Precision Cuts & Bobs">Precision Cuts &amp; Bobs</option>
                        <option value="Perms & Waves">Perms &amp; Waves</option>
                        <option value="Creative Color">Creative Color</option>
                        <option value="Men's Cuts">Men's Cuts</option>
                        <option value="Extensions">Extensions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Stylist Name
                      </label>
                      <input
                        type="text"
                        value={portfolioForm.stylist || ''}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, stylist: e.target.value })}
                        placeholder="e.g. Jason (Master Stylist)"
                        className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Main Image URL
                      </label>
                      <input
                        type="url"
                        value={portfolioForm.image || ''}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Technique Used
                    </label>
                    <input
                      type="text"
                      value={portfolioForm.technique || ''}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, technique: e.target.value })}
                      placeholder="e.g. Foil Balayage + Olaplex + Japanese Point Texturing"
                      className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Short Summary
                    </label>
                    <input
                      type="text"
                      value={portfolioForm.summary || ''}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, summary: e.target.value })}
                      placeholder="e.g. Added seamless ash dimension with soft face-framing curtain layers."
                      className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Full Stylist Details &amp; Maintenance Routine
                    </label>
                    <textarea
                      rows={3}
                      value={portfolioForm.details || ''}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, details: e.target.value })}
                      placeholder="Details of client consultation, bleach processing, tone formulation, and home styling advice..."
                      className="w-full bg-[#09090b] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                    ></textarea>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingItemId(null)}
                      className="px-4 py-2 text-xs uppercase font-bold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs uppercase font-bold text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277]"
                    >
                      Save Style to Portfolio
                    </button>
                  </div>
                </form>
              ) : (
                /* List of Portfolio Styles */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-400">
                      Manage haircuts, color transformations, and perms showcased in the portfolio gallery.
                    </p>
                    <button
                      onClick={handleNewPortfolio}
                      className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277]"
                    >
                      <span>+ Add Hair Transformation</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {portfolioItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#09090b] border border-white/5 hover:border-white/10 gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt=""
                            className="w-14 h-14 object-cover rounded-sm bg-zinc-800 shrink-0"
                          />
                          <div>
                            <h4 className="text-xs font-medium text-white">{item.title}</h4>
                            <p className="text-[10px] text-zinc-500">
                              Stylist: {item.stylist} • {item.category}
                            </p>
                            <p className="text-[9px] text-zinc-400 font-mono line-clamp-1">
                              {item.technique}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleEditPortfolio(item)}
                            className="px-3 py-1.5 text-[9px] font-bold uppercase text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePortfolio(item.id)}
                            className="px-3 py-1.5 text-[9px] font-bold uppercase text-red-400 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Services & Pricing */}
          {activeTab === 'services' && (
            <div>
              {editingServiceId ? (
                /* Edit/Add Service Form */
                <form onSubmit={handleSaveService} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingServiceId === 'new' ? 'New Service Offering' : 'Edit Service & Pricing'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingServiceId(null)}
                      className="text-xs text-zinc-400 hover:text-white"
                    >
                      ← Back to services
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Service Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceForm.name || ''}
                        onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        placeholder="e.g. Women's Designer Haircut"
                        className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Category
                      </label>
                      <select
                        value={serviceForm.category || 'Haircuts & Styling'}
                        onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as any })}
                        className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                      >
                        <option value="Haircuts & Styling">Haircuts &amp; Styling</option>
                        <option value="Color & Balayage">Color &amp; Balayage</option>
                        <option value="Perms & Texturizing">Perms &amp; Texturizing</option>
                        <option value="Treatments & Extensions">Treatments &amp; Extensions</option>
                        <option value="Nail Care">Nail Care</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Price Estimate (e.g. $65 - $95)
                      </label>
                      <input
                        type="text"
                        value={serviceForm.priceEstimate || ''}
                        onChange={(e) => setServiceForm({ ...serviceForm, priceEstimate: e.target.value })}
                        className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Estimated Duration
                      </label>
                      <input
                        type="text"
                        value={serviceForm.duration || ''}
                        onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                        placeholder="e.g. 60 mins"
                        className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={serviceForm.description || ''}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      placeholder="Detailed description of what the service includes..."
                      className="w-full bg-[#09090b] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pop_srv"
                      checked={serviceForm.popular || false}
                      onChange={(e) => setServiceForm({ ...serviceForm, popular: e.target.checked })}
                      className="accent-[#d8b485]"
                    />
                    <label htmlFor="pop_srv" className="text-xs text-zinc-300">
                      Mark as Popular / Signature Service
                    </label>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingServiceId(null)}
                      className="px-4 py-2 text-xs uppercase font-bold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs uppercase font-bold text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277]"
                    >
                      Save Service
                    </button>
                  </div>
                </form>
              ) : (
                /* Services List */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-400">
                      Manage hair salon services, pricing estimates, and features.
                    </p>
                    <button
                      onClick={handleNewService}
                      className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277]"
                    >
                      <span>+ Add New Service</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {services.map((srv) => (
                      <div
                        key={srv.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#09090b] border border-white/5 hover:border-white/10 gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{srv.name}</h4>
                            {srv.popular && (
                              <span className="text-[8px] bg-[#d8b485]/10 text-[#d8b485] border border-[#d8b485]/30 px-1.5 py-0.5 uppercase">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-500">
                            {srv.category} • {srv.duration} • <span className="text-[#d8b485] font-mono">{srv.priceEstimate}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleEditService(srv)}
                            className="px-3 py-1 text-[9px] font-bold uppercase text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteService(srv.id)}
                            className="px-3 py-1 text-[9px] font-bold uppercase text-red-400 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Backup & Reset */}
          {activeTab === 'backup' && (
            <div className="space-y-6 text-sm text-zinc-300">
              <div className="p-6 bg-[#09090b] border border-white/5 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Export &amp; Restore Salon Data
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Download a complete backup JSON containing all hair portfolio styles, services, and pricing updates.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={handleExportData}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase bg-white/10 hover:bg-white/15 text-white border border-white/10"
                  >
                    <iconify-icon icon="solar:download-square-linear" class="text-base"></iconify-icon>
                    <span>Export JSON Backup</span>
                  </button>

                  <label className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 cursor-pointer">
                    <iconify-icon icon="solar:upload-square-linear" class="text-base"></iconify-icon>
                    <span>Import JSON Backup</span>
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="p-6 bg-red-950/20 border border-red-500/20 space-y-4">
                <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider">
                  Reset Demo Content
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Restore the initial The Maze Hair Salon portfolio styles, prices, and verified services from the North York studio.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Reset portfolio and services to initial salon data?')) {
                      onResetDefaults();
                      alert('Data has been reset to default.');
                    }
                  }}
                  className="px-5 py-2.5 text-xs font-bold uppercase bg-red-900/40 hover:bg-red-900/60 text-red-200 border border-red-500/30"
                >
                  Reset to Default Salon Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};
