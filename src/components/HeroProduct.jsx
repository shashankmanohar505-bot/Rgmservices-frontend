import React from 'react';
import { Mic, HardDrive, Sparkles, ShieldCheck, Eye, Video, BellRing, Wifi } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import useCarousel from '../hooks/useCarousel';
import { NavArrow, Dots } from './CarouselControls';
import { HeroProductSkeleton } from './ProductLoader';
import { Link } from 'react-router-dom';

const getBadgeIcon = (iconName) => {
  switch (iconName) {
    case 'mic': return <Mic size={14} />;
    case 'wifi': return <Wifi size={14} />;
    case 'video': return <Video size={14} />;
    case 'shield': return <ShieldCheck size={14} />;
    case 'bell': return <BellRing size={14} />;
    case 'sd':
    default: return <HardDrive size={14} />;
  }
};

const HeroProduct = () => {
  const { heroSlides, heroSlidesLoading } = useProducts();
  const { addToCart } = useCart();
  const carousel = useCarousel({ autoplay: true, interval: 6000, pauseOnHover: false });

  if (heroSlidesLoading && (!heroSlides || heroSlides.length === 0)) {
    return <HeroProductSkeleton />;
  }

  const slides = (heroSlides && heroSlides.length > 0) ? heroSlides : [];
  if (slides.length === 0) return null;

  return (
    <section
      className="relative bg-gradient-to-b from-[#e8eeff] via-[#f1f5f9] to-[#ffffff] overflow-hidden"
      data-testid="hero-product-section"
      aria-label="Featured products"
    >
      {/* Ambient Radial Light Glow Orbs */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-r from-[#082f89]/20 via-[#01a345]/15 to-[#082f89]/20 blur-[110px] rounded-full pointer-events-none animate-heroGlow" />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8 md:py-12 lg:py-14 relative z-10">
        <NavArrow dir="left" onClick={carousel.prev} className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20" />
        <NavArrow dir="right" onClick={carousel.next} className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20" />

        <div
          {...carousel.scrollerProps}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory focus:outline-none py-4"
          aria-roledescription="carousel"
        >
          {slides.map((slide) => (
            <div key={slide.id} data-slide className="min-w-full snap-start px-2 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left content */}
                <div className="animate-fadeSlideIn">
                  <span className="inline-flex items-center gap-1.5 bg-[#082f89] text-white text-[11.5px] font-extrabold px-4 py-1.5 rounded-full mb-5 shadow-[0_6px_18px_rgba(8,47,137,0.3)] animate-pulse">
                    {slide.badge || "Featured"}
                  </span>
                  <h1 className="text-[28px] sm:text-[32px] md:text-[40px] leading-[1.12] font-black text-[#07152e] tracking-tight">
                    {slide.titleLine1}
                    {slide.titleLine2 && (
                      <>
                        <br />
                        <span className="text-[#082f89]">{slide.titleLine2}</span>
                      </>
                    )}
                  </h1>
                  {slide.subtitle && (
                    <p className="text-[#5b6b82] text-[13.5px] md:text-[14.5px] mt-4 max-w-md leading-relaxed font-semibold">{slide.subtitle}</p>
                  )}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
                    <Link to={slide.buttonLink || "/products"} className="btn-primary text-[13.5px] font-bold px-6 py-3 rounded-full h-11 flex items-center justify-center shadow-md active:scale-95 transition-transform" data-testid={`hero-view-${slide.id}`}>
                      {slide.buttonText || 'View Camera'}
                    </Link>
                    <button
                      onClick={() =>
                        addToCart({
                          id: `hero-${slide.id}`,
                          name: `${slide.titleLine1} ${slide.titleLine2 || ''}`.trim(),
                          price: Number(slide.price) || 3499,
                          image: slide.image,
                        })
                      }
                      className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#082f89] hover:text-[#082f89] text-[#1e2c45] text-[13.5px] font-bold px-6 py-3 rounded-full h-11 flex items-center justify-center transition-colors active:scale-95 shadow-sm"
                      data-testid={`hero-add-${slide.id}`}
                    >
                      Add to Cart
                    </button>
                  </div>
                  {Array.isArray(slide.specs) && slide.specs.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-8 md:gap-12 mt-7 md:mt-10 border-t border-slate-200/60 pt-5 sm:border-t-0 sm:pt-0">
                      {slide.specs.map((s, idx) => (
                        <div key={idx} className="text-center sm:text-left">
                          <p className="text-[14px] sm:text-[16px] md:text-[17px] font-extrabold text-[#082f89] tabular-nums leading-tight">{s.value}</p>
                          <p className="text-[10.5px] sm:text-[11px] text-[#8b98ad] mt-1 font-semibold">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right product card with unobscured floating badges */}
                <div className="relative flex justify-center items-center animate-fadeSlideIn my-8 lg:my-4">
                  <div className="relative bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,47,137,0.09)] border border-slate-100/90 p-6 sm:p-8 w-[280px] sm:w-[340px] md:w-[380px] min-h-[260px] sm:min-h-[300px] flex items-center justify-center">
                    <img
                      src={slide.image}
                      alt={`${slide.titleLine1} ${slide.titleLine2 || ''}`}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      className="w-full h-[200px] sm:h-[240px] md:h-[270px] object-contain select-none pointer-events-none drop-shadow-[0_10px_20px_rgba(8,47,137,0.1)]"
                    />

                    {/* Top-Left Floating Badge */}
                    {slide.floatTopLeft?.title && (
                      <div className="absolute -top-3 left-2 sm:-top-3.5 sm:-left-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_28px_rgba(8,47,137,0.14)] border border-slate-100 px-3.5 py-2 flex items-center gap-2 animate-floatY z-20">
                        <span className="w-6 h-6 rounded-xl bg-[#082f89] text-white flex items-center justify-center shrink-0 shadow-sm">
                          {getBadgeIcon(slide.floatTopLeft.icon || 'mic')}
                        </span>
                        <span className="text-[11.5px] font-bold text-[#07152e] whitespace-nowrap">{slide.floatTopLeft.title}</span>
                      </div>
                    )}

                    {/* Bottom-Right Floating Badge */}
                    {slide.floatRight?.title && (
                      <div
                        className="absolute -bottom-3 right-2 sm:-bottom-3.5 sm:-right-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_28px_rgba(8,47,137,0.14)] border border-slate-100 px-3.5 py-2 flex items-center gap-2 animate-floatY z-20"
                        style={{ animationDelay: '1.2s' }}
                      >
                        <span className="w-6 h-6 rounded-xl bg-[#082f89] text-white flex items-center justify-center shrink-0 shadow-sm">
                          {getBadgeIcon(slide.floatRight.icon || 'sd')}
                        </span>
                        <span className="text-[11.5px] font-bold text-[#07152e] whitespace-nowrap">{slide.floatRight.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dots count={slides.length} activeIndex={carousel.activeIndex} onSelect={carousel.scrollToIndex} className="mt-6" />
      </div>
    </section>
  );
};

export default HeroProduct;
