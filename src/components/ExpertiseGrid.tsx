import React from 'react';

export const ExpertiseGrid: React.FC = () => {
  return (
    <div className="w-full border-y border-white/5 bg-[#09090b]/80 backdrop-blur-md py-8">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
        <div className="flex items-start gap-4 aura-reveal">
          <iconify-icon icon="solar:crown-minimalistic-linear" class="text-3xl text-[#d8b485] shrink-0"></iconify-icon>
          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
              Shampoo &amp; Head Spa
            </h4>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Relaxing scalp massage
              <br />
              before &amp; after every haircut
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 aura-reveal">
          <iconify-icon icon="solar:scissors-square-linear" class="text-3xl text-[#d8b485] shrink-0"></iconify-icon>
          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
              Asian Hair Specialists
            </h4>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Pixie cuts, bobs, two-blocks
              <br />
              &amp; volume root elevation
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 aura-reveal">
          <iconify-icon icon="solar:palette-round-linear" class="text-3xl text-[#d8b485] shrink-0"></iconify-icon>
          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
              Color &amp; Strand Testing
            </h4>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Meticulous balayage,
              <br />
              zero-damage bond protection
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 aura-reveal">
          <iconify-icon icon="solar:lock-keyhole-linear" class="text-3xl text-[#d8b485] shrink-0"></iconify-icon>
          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
              Guest Lockers &amp; Comfort
            </h4>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Private storage lockers,
              <br />
              English, Mandarin &amp; Cantonese
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
