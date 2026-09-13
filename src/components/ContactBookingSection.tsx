import React, { useState } from 'react';
import { SALON_INFO, STYLISTS_TEAM } from '../data/salonData';
import { BookingInquiry } from '../types';

interface ContactBookingSectionProps {
  preselectedService?: string;
  preselectedStylist?: string;
}

export const ContactBookingSection: React.FC<ContactBookingSectionProps> = ({
  preselectedService,
  preselectedStylist,
}) => {
  const [bookingData, setBookingData] = useState<BookingInquiry>({
    name: '',
    phone: '',
    email: '',
    preferredStylist: preselectedStylist || 'First Available Master Stylist',
    serviceCategory: preselectedService || "Women's Designer Haircut & Blowout",
    preferredDate: '',
    preferredTime: '11:00 AM',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync prop changes
  React.useEffect(() => {
    if (preselectedService) {
      setBookingData((prev) => ({ ...prev, serviceCategory: preselectedService }));
    }
  }, [preselectedService]);

  React.useEffect(() => {
    if (preselectedStylist) {
      setBookingData((prev) => ({ ...prev, preferredStylist: preselectedStylist }));
    }
  }, [preselectedStylist]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.name.trim() || !bookingData.phone.trim()) {
      setErrorMsg('Please enter your name and contact phone number.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Persist in local storage for salon records
      try {
        const existing = JSON.parse(localStorage.getItem('the_maze_appointments') || '[]');
        existing.push({ ...bookingData, createdAt: new Date().toISOString() });
        localStorage.setItem('the_maze_appointments', JSON.stringify(existing));
      } catch {
        // ignore
      }
    }, 600);
  };

  return (
    <section
      id="booking"
      className="max-w-[1400px] mx-auto w-full py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      <div id="location" className="flex flex-col lg:flex-row gap-16">
        {/* Left Column: Salon Location, Schedule & Contact */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              Visit &amp; Contact Us
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-[1.1] max-w-md aura-reveal">
            Book your appointment at The Maze.
          </h2>

          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10 max-w-md">
            Call us directly or send a booking request online. We recommend booking 2–3 days in advance for weekend balayage and digital perms.
          </p>

          <div className="space-y-6 mb-10">
            {/* Phone direct */}
            <div className="flex items-start gap-4">
              <iconify-icon
                icon="solar:phone-calling-linear"
                class="text-2xl text-[#d8b485] shrink-0 mt-1"
              ></iconify-icon>
              <div>
                <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
                  Telephone (Direct Booking)
                </h4>
                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="text-lg font-mono font-bold text-[#d8b485] hover:underline"
                >
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <iconify-icon
                icon="solar:map-point-linear"
                class="text-2xl text-[#d8b485] shrink-0 mt-1"
              ></iconify-icon>
              <div>
                <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
                  Salon Address
                </h4>
                <p className="text-sm text-zinc-300 font-medium">{SALON_INFO.address}</p>
                <p className="text-xs text-zinc-500 mt-1">{SALON_INFO.transit}</p>
                <p className="text-xs text-zinc-500">{SALON_INFO.parking}</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <iconify-icon
                icon="solar:clock-circle-linear"
                class="text-2xl text-[#d8b485] shrink-0 mt-1"
              ></iconify-icon>
              <div className="w-full">
                <h4 className="text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                  Opening Hours (7 Days a Week)
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-zinc-400 font-mono">
                  {SALON_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 py-1">
                      <span>{h.day}</span>
                      <span className="text-zinc-300">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Online Booking Form */}
        <div className="flex-1 lg:max-w-xl w-full">
          {isSubmitted ? (
            <div className="bg-[#0c0c0e] p-8 md:p-12 border border-[#d8b485]/30 text-left animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#d8b485]/10 flex items-center justify-center text-[#d8b485] mb-6">
                <iconify-icon icon="solar:check-circle-linear" style={{ fontSize: '28px' }}></iconify-icon>
              </div>
              <h3 className="text-xl font-medium text-white mb-2 uppercase tracking-wide">
                Booking Request Received
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Thank you, {bookingData.name}! We have received your appointment request for{' '}
                <strong className="text-white">{bookingData.serviceCategory}</strong> with{' '}
                <strong className="text-[#d8b485]">{bookingData.preferredStylist}</strong>. Our front desk team will call or text you at <strong className="text-white">{bookingData.phone}</strong> to confirm your exact chair slot.
              </p>
              <div className="p-4 bg-[#09090b] border border-white/5 text-xs text-zinc-400 font-mono mb-6">
                <p>📍 The Maze Hair Salon: 5233 Yonge St, North York</p>
                <p>📞 Urgent confirmation? Call: (416) 227-1818</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setBookingData({
                    name: '',
                    phone: '',
                    email: '',
                    preferredStylist: 'First Available Master Stylist',
                    serviceCategory: "Women's Designer Haircut & Blowout",
                    preferredDate: '',
                    preferredTime: '11:00 AM',
                    notes: '',
                  });
                }}
                className="px-6 py-3 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] uppercase transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-[#0c0c0e] p-8 md:p-12 border border-white/5 text-left"
            >
              <div className="border-b border-white/5 pb-4 mb-2">
                <h3 className="text-sm font-bold tracking-widest text-white uppercase">
                  Appointment Request Form
                </h3>
                <p className="text-xs text-zinc-500">
                  Fill in your details and preferred stylist. We will confirm your timing promptly.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 text-xs bg-red-950/40 border border-red-500/30 text-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485] placeholder:text-zinc-700"
                    placeholder="e.g. Vivie Jiang"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485] placeholder:text-zinc-700"
                    placeholder="e.g. (416) 555-0199"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485] placeholder:text-zinc-700"
                    placeholder="your.email@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Preferred Stylist
                  </label>
                  <select
                    value={bookingData.preferredStylist}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, preferredStylist: e.target.value })
                    }
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                  >
                    <option value="First Available Master Stylist">
                      First Available Master Stylist
                    </option>
                    {STYLISTS_TEAM.map((st) => (
                      <option key={st.id} value={st.name}>
                        {st.name} ({st.role.split('&')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                  Service Requested
                </label>
                <select
                  value={bookingData.serviceCategory}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, serviceCategory: e.target.value })
                  }
                  className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                >
                  <option value="Women's Designer Haircut & Blowout">
                    Women's Designer Haircut &amp; Blowout ($65 - $95)
                  </option>
                  <option value="Men's Precision Cut & Barbering">
                    Men's Precision Cut &amp; Barbering ($38 - $55)
                  </option>
                  <option value="Asian Female Pixie & Textured Short Cut">
                    Asian Female Pixie &amp; Textured Cut ($70 - $90)
                  </option>
                  <option value="Bangs & Curtain Bangs Reshaping">
                    Bangs &amp; Curtain Bangs Trim ($20)
                  </option>
                  <option value="Signature Dimensional Balayage & Ombré">
                    Signature Dimensional Balayage &amp; Ombré ($220 - $380)
                  </option>
                  <option value="Foil Highlights & Babylights">
                    Foil Highlights &amp; Babylights ($160 - $260)
                  </option>
                  <option value="Full Color & Root Retouch">
                    Full Color &amp; Root Retouch ($95 - $160)
                  </option>
                  <option value="Creative Pastel & Bleach Tone">
                    Creative Pastel &amp; Bleach Tone ($240 - $420)
                  </option>
                  <option value="Japanese / Korean Digital Wave Perm">
                    Japanese / Korean Digital Wave Perm ($190 - $280)
                  </option>
                  <option value="Morgan Lancet Root Volume Perm">
                    Morgan Lancet Root Volume Perm ($120 - $180)
                  </option>
                  <option value="Men's Texture & Korean Wave Perm">
                    Men's Texture &amp; Wave Perm ($110 - $160)
                  </option>
                  <option value="Keratin & Hair Botox Smoothing Therapy">
                    Keratin &amp; Hair Botox Smoothing ($180 - $290)
                  </option>
                  <option value="Feather Hair Extensions & Micro-Fills">
                    Feather Hair Extensions &amp; Fills ($180 - $450+)
                  </option>
                  <option value="Detailed Russian Manicure & Gel Polish">
                    Detailed Russian Manicure &amp; Gel ($45 - $70)
                  </option>
                  <option value="Classic Spa Pedicure & Polish">
                    Classic Spa Pedicure &amp; Polish ($55 - $85)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, preferredDate: e.target.value })
                    }
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Preferred Time
                  </label>
                  <select
                    value={bookingData.preferredTime}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, preferredTime: e.target.value })
                    }
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                  >
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:30 PM">1:30 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:30 PM">4:30 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                  Notes on Hair History / Desired Inspiration
                </label>
                <textarea
                  rows={3}
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  className="w-full bg-[#09090b] border border-white/10 p-4 text-xs text-white focus:outline-none focus:border-[#d8b485] placeholder:text-zinc-700 resize-none"
                  placeholder="Tell us about previous color, bleach history, length to cut, or specific style..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-8 py-4 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] transition-all uppercase disabled:opacity-50"
              >
                {isSubmitting ? 'Sending Request...' : 'Send Booking Request →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
