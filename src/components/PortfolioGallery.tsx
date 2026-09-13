import React, { useState } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioGalleryProps {
  portfolioItems: PortfolioItem[];
  onSelectPortfolioItem: (item: PortfolioItem) => void;
  onOpenCMS?: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  portfolioItems,
  onSelectPortfolioItem,
  onOpenCMS,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Balayage & Ombre',
    'Precision Cuts & Bobs',
    'Perms & Waves',
    'Creative Color',
    "Men's Cuts",
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter(
          (item) => item.category === selectedCategory || item.tags.includes(selectedCategory)
        );

  return (
    <section
      id="portfolio"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              Transformations &amp; Hair Portfolio
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1] max-w-2xl">
            Recent styles, color melts &amp; texture cuts.
          </h2>
          <p className="text-sm text-zinc-400 font-light mt-3 max-w-xl">
            Real clients transformed at The Maze. Click on any style to see the technique breakdown, hair diagnosis, and stylist details.
          </p>
        </div>

        {/* Filter Pills & CMS Action */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#d8b485] text-zinc-950 border-[#d8b485]'
                  : 'bg-[#0c0c0e] text-zinc-400 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
          {onOpenCMS && (
            <button
              onClick={onOpenCMS}
              className="px-3 py-2 text-[10px] font-bold tracking-widest uppercase bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors inline-flex items-center gap-1.5 ml-2"
              title="Add or update portfolio styles in CMS"
            >
              <iconify-icon icon="solar:camera-add-linear" style={{ fontSize: '13px' }}></iconify-icon>
              <span>Manage Gallery</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Hair Transformations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectPortfolioItem(item)}
            className="group cursor-pointer bg-[#0c0c0e] border border-white/5 hover:border-[#d8b485]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            role="button"
            tabIndex={0}
          >
            {/* Image Preview */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-80"></div>
              <div className="absolute top-4 left-4 bg-[#09090b]/85 backdrop-blur-md px-3 py-1 border border-white/10 text-[9px] font-bold tracking-widest text-[#d8b485] uppercase">
                Stylist: {item.stylist}
              </div>
              <div className="absolute bottom-3 right-3 bg-[#0c0c0e]/90 text-zinc-400 text-[9px] px-2 py-1 font-mono border border-white/10">
                {item.category}
              </div>
            </div>

            {/* Description & Technical Summary */}
            <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-medium text-white group-hover:text-[#d8b485] transition-colors mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4 line-clamp-2">
                  {item.summary}
                </p>

                {/* Technique Tag */}
                <p className="text-[10px] text-zinc-500 font-mono mb-4 border-l-2 border-[#d8b485]/40 pl-2">
                  {item.technique}
                </p>
              </div>

              {/* Metrics Highlights Bar */}
              {item.metrics && item.metrics.length > 0 && (
                <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-left mb-4">
                  {item.metrics.slice(0, 3).map((m, idx) => (
                    <div key={idx}>
                      <span className="block text-xs font-bold text-white group-hover:text-[#d8b485] transition-colors">
                        {m.value}
                      </span>
                      <span className="block text-[8px] uppercase tracking-wider text-zinc-500 truncate">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* View Transformation Action */}
              <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-white/60 group-hover:text-[#d8b485] transition-colors pt-3 border-t border-white/5">
                <span>View Technique &amp; Photos</span>
                <iconify-icon icon="solar:arrow-right-up-linear" class="text-sm"></iconify-icon>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
