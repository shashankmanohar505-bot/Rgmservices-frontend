import React from 'react';
import { heroBanners, categories } from '../mock/mock';
import useCarousel from '../hooks/useCarousel';
import { NavArrow, Dots } from './CarouselControls';
import { Sparkles } from 'lucide-react';

import { Link } from 'react-router-dom';

const HeroBanner = () => {
  const banner = useCarousel({ autoplay: true, interval: 5500 });
  const cats = useCarousel({ autoplay: false });

  return (
    <section className="bg-white pt-6 md:pt-8 pb-4 relative overflow-hidden" id="top" data-testid="hero-banner-section">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-gradient-to-r from-[#082f89]/15 via-[#01a345]/10 to-[#f00102]/10 blur-[100px] rounded-full pointer-events-none animate-heroGlow" />
      
      {/* Banner carousel */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
        <NavArrow dir="left" onClick={banner.prev} className="absolute left-1 lg:-left-2 top-1/2 -translate-y-1/2 hidden sm:flex" label="Previous banner" />
        <div
          {...banner.scrollerProps}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-1 focus:outline-none -mx-4 sm:mx-0 px-4 sm:px-1"
          aria-roledescription="carousel"
          aria-label="Featured banners"
          data-testid="hero-banner-scroller"
        >
          {heroBanners.map((b, i) => (
            <div key={b.id} data-slide className="w-[88vw] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex-none snap-start" aria-roledescription="slide" aria-label={`${i + 1} of ${heroBanners.length}`}>
              <div className="rounded-3xl overflow-hidden aspect-[16/10] group cursor-pointer bg-[#f1f5f9] shadow-[0_8px_25px_rgba(8,47,137,0.08)] hover:shadow-[0_20px_45px_rgba(8,47,137,0.18)] border border-slate-200/80 transition-all duration-500 relative">
                {/* Image */}
                <img
                  src={b.image}
                  alt={b.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out select-none pointer-events-none"
                  draggable={false}
                />
                {/* Shimmer overlay sweep */}
                <div className="animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
        <NavArrow dir="right" onClick={banner.next} className="absolute right-1 lg:-right-2 top-1/2 -translate-y-1/2 hidden sm:flex" label="Next banner" />

        <Dots count={heroBanners.length} activeIndex={banner.activeIndex} onSelect={banner.scrollToIndex} className="mt-5" />
      </div>

      {/* Premium Luxury Categories Showcase */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 mt-10 md:mt-12 relative z-10" data-testid="categories-strip">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[#e8eeff] text-[#082f89] text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1 rounded-full border border-[#082f89]/20 shadow-xs mb-1.5">
              Explore Collections
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#07152e] tracking-tight">
              Shop By Product Category
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs font-bold text-[#64748b]">
            Scroll to view all 7 categories →
          </span>
        </div>

        <div
          {...cats.scrollerProps}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide justify-start -mx-4 sm:mx-0 px-4 sm:px-1 pb-4 focus:outline-none"
          aria-label="Shop by category"
        >
          {categories.map((c) => {
            const targetUrl = `/category/${c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

            return (
              <Link
                key={c.id}
                to={targetUrl}
                data-slide
                className="flex-none min-w-[130px] sm:min-w-[145px] md:min-w-[155px] group focus-visible:outline-none"
              >
                <div className="bg-gradient-to-b from-white via-white to-slate-50/80 hover:from-white hover:to-[#e8eeff]/50 border border-slate-200/90 hover:border-[#082f89]/40 rounded-3xl p-4 shadow-[0_6px_20px_rgba(8,47,137,0.06)] hover:shadow-[0_16px_35px_rgba(8,47,137,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                  
                  {/* Top Badge Tag */}
                  {c.tag && (
                    <span className={`absolute top-2.5 right-2.5 ${c.tagColor || 'bg-[#082f89]'} text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm tracking-wider uppercase z-10`}>
                      {c.tag}
                    </span>
                  )}

                  {/* Glowing Ring Frame Image */}
                  <div className="w-[84px] h-[84px] sm:w-[94px] sm:h-[94px] rounded-full p-1 bg-gradient-to-tr from-[#082f89]/20 via-[#01a345]/30 to-[#082f89]/20 group-hover:from-[#082f89] group-hover:to-[#01a345] transition-all duration-300 my-2 shadow-inner">
                    <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden shadow-sm">
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <span className="text-[13px] sm:text-[14px] font-black text-[#07152e] group-hover:text-[#082f89] transition-colors tracking-tight mt-1 line-clamp-1">
                    {c.name}
                  </span>
                  <span className="text-[10.5px] font-extrabold text-[#01a345] opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 flex items-center gap-0.5">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
