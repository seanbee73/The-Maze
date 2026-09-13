import React, { useState } from 'react';
import { REAL_REVIEWS, SALON_INFO } from '../data/salonData';

export const ReviewsSection: React.FC = () => {
  const [filterTag, setFilterTag] = useState<string>('All');

  const reviewKeywords = [
    'All',
    'attentive stylist',
    'Asian pixie cut',
    'balayage',
    'gentle staff',
    'lockers',
    'comfortable atmosphere',
  ];

  const filteredReviews =
    filterTag === 'All'
      ? REAL_REVIEWS
      : REAL_REVIEWS.filter(
          (r) =>
            r.content.toLowerCase().includes(filterTag.toLowerCase()) ||
            r.positivePoints?.some((p) => p.toLowerCase().includes(filterTag.toLowerCase())) ||
            r.serviceMentioned?.toLowerCase().includes(filterTag.toLowerCase())
        );

  return (
    <section
      id="reviews"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              Verified Client Experiences
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1] max-w-2xl">
            Trusted by clients across North York &amp; Toronto.
          </h2>
        </div>

        {/* Rating Summary Badge */}
        <div className="flex items-center gap-4 bg-[#0c0c0e] border border-white/10 p-4">
          <div className="text-3xl font-bold text-[#d8b485] font-mono leading-none">
            {SALON_INFO.rating}
          </div>
          <div>
            <div className="flex text-[#d8b485] text-xs mb-1">
              <iconify-icon icon="solar:star-bold"></iconify-icon>
              <iconify-icon icon="solar:star-bold"></iconify-icon>
              <iconify-icon icon="solar:star-bold"></iconify-icon>
              <iconify-icon icon="solar:star-bold"></iconify-icon>
              <iconify-icon icon="solar:star-linear"></iconify-icon>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">
              Based on {SALON_INFO.reviewCount}
            </p>
          </div>
        </div>
      </div>

      {/* Popular Sentiment Topics / Filter Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 mr-2">
          Filter by topic:
        </span>
        {reviewKeywords.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-3 py-1.5 text-[9px] font-bold tracking-wider uppercase transition-all border ${
              filterTag === tag
                ? 'bg-[#d8b485] text-zinc-950 border-[#d8b485]'
                : 'bg-[#0c0c0e] text-zinc-400 border-white/5 hover:border-white/20'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 md:p-8 bg-[#0c0c0e] border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all"
          >
            <div>
              {/* Header: Author & Source */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                    {review.author[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{review.author}</h4>
                    <p className="text-[9px] text-zinc-500">{review.date}</p>
                  </div>
                </div>

                <div className="flex text-[#d8b485] text-xs">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <iconify-icon key={i} icon="solar:star-bold"></iconify-icon>
                  ))}
                </div>
              </div>

              {/* Service & Stylist Tags */}
              {(review.stylistMentioned || review.serviceMentioned) && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {review.stylistMentioned && (
                    <span className="text-[9px] px-2 py-0.5 bg-[#d8b485]/10 text-[#d8b485] border border-[#d8b485]/20 font-mono">
                      Stylist: {review.stylistMentioned}
                    </span>
                  )}
                  {review.serviceMentioned && (
                    <span className="text-[9px] px-2 py-0.5 bg-white/5 text-zinc-400 font-mono">
                      {review.serviceMentioned}
                    </span>
                  )}
                </div>
              )}

              {/* Review Body */}
              <p className="text-xs text-zinc-300 font-light leading-relaxed mb-6 italic">
                "{review.content}"
              </p>
            </div>

            {/* Positive Highlight Chips */}
            {review.positivePoints && (
              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1">
                {review.positivePoints.map((point, idx) => (
                  <span
                    key={idx}
                    className="text-[8px] uppercase tracking-wider text-zinc-500 bg-black/40 px-2 py-0.5"
                  >
                    ✓ {point}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
