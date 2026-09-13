import React, { useState } from 'react';
import { HairService } from '../types';

interface AboutServicesProps {
  services: HairService[];
  onSelectServiceForBooking?: (serviceName: string) => void;
}

export const AboutServices: React.FC<AboutServicesProps> = ({
  services,
  onSelectServiceForBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const categories = [
    'All',
    'Haircuts & Styling',
    'Color & Balayage',
    'Perms & Texturizing',
    'Treatments & Extensions',
    'Nail Care',
  ];

  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              Our Services &amp; Pricing
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1] max-w-2xl">
            Custom hair artistry, coloring &amp; texture perms.
          </h2>
          <p className="text-sm text-zinc-400 font-light mt-3 max-w-xl">
            Every hair service includes our signature relaxing wash &amp; scalp massage. Transparent pricing with customized consultations.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all border ${
                activeCategory === cat
                  ? 'bg-[#d8b485] text-zinc-950 border-[#d8b485]'
                  : 'bg-[#0c0c0e] text-zinc-400 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => {
          const isExpanded = expandedServiceId === service.id;

          return (
            <div
              key={service.id}
              className={`p-6 sm:p-8 bg-[#0c0c0e] border transition-all duration-300 relative flex flex-col justify-between ${
                isExpanded ? 'border-[#d8b485]/50 bg-[#111114]' : 'border-white/5 hover:border-white/15'
              }`}
            >
              {service.popular && (
                <span className="absolute top-4 right-4 bg-[#d8b485]/10 text-[#d8b485] border border-[#d8b485]/30 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5">
                  Popular Service
                </span>
              )}

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2 pr-16">
                  <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                    {service.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    ⏱ {service.duration}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#d8b485] transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features & Highlights */}
                {service.features && service.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] px-2 py-1 bg-white/5 text-zinc-300 border border-white/5 font-mono"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing & Booking Row */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-500">
                    Estimated Price
                  </span>
                  <span className="text-lg font-bold text-[#d8b485] font-mono">
                    {service.priceEstimate}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (onSelectServiceForBooking) {
                        onSelectServiceForBooking(service.name);
                      }
                      const bookingElem = document.getElementById('booking');
                      bookingElem?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] uppercase transition-colors"
                  >
                    Book Service →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note about Consultation & Custom Estimates */}
      <div className="mt-12 p-6 bg-[#0c0c0e] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <iconify-icon icon="solar:info-circle-linear" class="text-xl text-[#d8b485] shrink-0 mt-0.5"></iconify-icon>
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong className="text-white">Note on Color &amp; Perm Pricing:</strong> Exact rates for bleach, balayage, and digital perms depend on hair length, density, and previous chemical history. We conduct complimentary strand diagnosis before starting.
          </p>
        </div>
        <a
          href="tel:4162271818"
          className="shrink-0 text-xs font-mono font-bold text-[#d8b485] hover:underline whitespace-nowrap"
        >
          Questions? Call (416) 227-1818
        </a>
      </div>
    </section>
  );
};
