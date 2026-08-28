import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { videoProducts, formatPrice } from '../mock/mock';
import { useCart } from '../context/CartContext';
import useCarousel from '../hooks/useCarousel';
import { NavArrow, Dots } from './CarouselControls';

const VideoTestimonials = () => {
  const { addToCart } = useCart();
  const [playing, setPlaying] = useState(null);
  const carousel = useCarousel({ autoplay: false });

  return (
    <section className="bg-white py-14 md:py-16" data-testid="video-testimonials-section">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <h2 className="text-center text-[22px] md:text-[26px] font-bold text-[#07152e] leading-snug mb-10 md:mb-12 tracking-tight">
          Tech experts, celebrities and real users –
          <br />
          hear about <span className="text-[#082f89]">RGMS</span> from those who love us.
        </h2>

        <div className="relative">
          <NavArrow dir="left" onClick={carousel.prev} className="absolute -left-3 lg:-left-5 top-[32%] -translate-y-1/2 z-10 hidden sm:flex" />
          <div
            {...carousel.scrollerProps}
            className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 sm:mx-0 px-4 sm:px-0 pb-3 focus:outline-none"
            data-testid="video-scroller"
            aria-label="Video testimonials"
          >
            {videoProducts.map((v) => (
              <div key={v.id} data-slide className="w-[65vw] sm:w-[220px] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] flex-none snap-start">
                {/* Video-style card (MOCKED with product image + play overlay) */}
                <div
                  className="relative rounded-2xl overflow-hidden bg-[#f1f5f9] aspect-[9/14] cursor-pointer group shadow-[0_6px_18px_rgba(8,47,137,0.08)] border border-slate-100 hover:shadow-[0_14px_32px_rgba(8,47,137,0.14)] transition-shadow duration-300"
                  onClick={() => setPlaying(playing === v.id ? null : v.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setPlaying(playing === v.id ? null : v.id); }}
                  aria-label={`Play video for ${v.name}`}
                >
                  <img src={v.thumb} alt="" loading="lazy" decoding="async" draggable={false} className="w-full h-full object-contain p-4 group-hover:scale-[1.05] transition-transform duration-500 select-none pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.2)] group-hover:scale-110 active:scale-95 transition-transform duration-300">
                      <Play size={18} className="text-[#07152e] ml-0.5" fill="#07152e" />
                    </span>
                  </div>
                </div>
                <div className="pt-3 text-center">
                  <p className="text-[12px] font-bold text-[#1e2c45] truncate" title={v.name}>{v.name}</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-[11.5px] text-[#9aa7ba] line-through tabular-nums">{formatPrice(v.oldPrice)}</span>
                    <span className="text-[13px] font-extrabold text-[#082f89] tabular-nums">{formatPrice(v.price)}</span>
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    {v.outOfStock ? (
                      <button className="flex-1 bg-[#f00102] text-white text-[11.5px] font-bold py-2 rounded-full cursor-not-allowed h-9 flex items-center justify-center" disabled>Out of Stock</button>
                    ) : (
                      <button onClick={() => addToCart(v)} className="flex-1 btn-primary text-[11.5px] font-bold py-2 rounded-full h-9 flex items-center justify-center active:scale-95 transition-transform" data-testid={`video-add-${v.id}`}>Add to Cart</button>
                    )}
                    <button className="flex-1 bg-white border border-[#d4dce7] hover:border-[#082f89] hover:text-[#082f89] text-[#1e2c45] text-[11.5px] font-bold py-2 rounded-full h-9 flex items-center justify-center transition-colors active:scale-95">View More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <NavArrow dir="right" onClick={carousel.next} className="absolute -right-3 lg:-right-5 top-[32%] -translate-y-1/2 z-10 hidden sm:flex" />
          <Dots count={videoProducts.length} activeIndex={carousel.activeIndex} onSelect={carousel.scrollToIndex} className="mt-6" />
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
