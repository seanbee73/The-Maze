import React, { useState } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioDetailModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onBookLook: (serviceCategory: string, stylist: string) => void;
}

export const PortfolioDetailModal: React.FC<PortfolioDetailModalProps> = ({
  item,
  onClose,
  onBookLook,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!item) return null;

  const images =
    item.galleryImages && item.galleryImages.length > 0
      ? item.galleryImages
      : [item.image];

  const currentImage = images[activeImageIndex] || item.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0c0c0e] border border-white/10 shadow-2xl my-auto text-left overflow-hidden max-h-[95vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#09090b] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d8b485]">
              {item.category}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400 font-mono">
              Designed by {item.stylist}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors"
            aria-label="Close modal"
          >
            <iconify-icon icon="solar:close-circle-linear" style={{ fontSize: '24px' }}></iconify-icon>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow">
          {/* Main Hero Image */}
          <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden border-b border-white/5">
            <img
              src={currentImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-[10px] font-mono text-[#d8b485] uppercase tracking-wider block mb-1">
                The Maze Hair Studio Portfolio
              </span>
              <h2 className="text-2xl md:text-3xl font-medium text-white leading-tight">
                {item.title}
              </h2>
            </div>
          </div>

          {/* Thumbnails switcher */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 px-6 py-3 bg-[#09090b] border-b border-white/5 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 shrink-0 overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#d8b485] scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Body Info */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Technical Metrics */}
            {item.metrics && item.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-4 p-6 bg-[#09090b] border border-white/5 text-left">
                {item.metrics.map((m, idx) => (
                  <div key={idx}>
                    <span className="block text-xl md:text-2xl font-bold text-[#d8b485] font-mono">
                      {m.value}
                    </span>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500 mt-1">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Hair Profile Diagnosis */}
            <div className="p-4 bg-[#09090b] border border-white/5 space-y-2">
              <h4 className="text-[10px] font-bold tracking-widest text-[#d8b485] uppercase">
                Client Hair Diagnosis &amp; Technique
              </h4>
              <p className="text-xs text-zinc-300">
                <strong className="text-white">Starting Hair Profile:</strong> {item.clientHairType}
              </p>
              <p className="text-xs text-zinc-300">
                <strong className="text-white">Salon Execution:</strong> {item.technique}
              </p>
            </div>

            {/* In-depth details */}
            <div>
              <h4 className="text-xs font-bold tracking-widest text-[#d8b485] uppercase mb-2">
                Stylist Notes &amp; Maintenance Routine
              </h4>
              <p className="text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                {item.details}
              </p>
            </div>

            {/* Tags */}
            {item.tags && (
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/5 text-zinc-400 text-[10px] font-mono border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#09090b] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <p className="text-xs text-zinc-400">
            Love this look? Book a consultation with <strong className="text-white">{item.stylist}</strong>.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-3 text-[10px] font-bold tracking-widest text-zinc-400 border border-white/10 hover:text-white uppercase transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookLook(item.title, item.stylist);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-3 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] uppercase transition-colors"
            >
              Book This Style →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
