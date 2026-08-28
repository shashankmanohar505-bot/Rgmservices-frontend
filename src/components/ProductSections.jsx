import React from 'react';
import { Link } from 'react-router-dom';
import { Projector, Car, Gamepad2, Mic2, Trophy, Tv, RotateCw, Wifi, Briefcase, Baby, Users, Sun, Store, PawPrint } from 'lucide-react';
import { newArrivals as fallbackNewArrivals, bestSellers as fallbackBestSellers, brandCategories, usageTypes } from '../mock/mock';
import ProductCard from './ProductCard';
import useCarousel from '../hooks/useCarousel';
import { NavArrow, Dots } from './CarouselControls';
import { useProducts } from '../context/ProductContext';

const brandIconMap = { projector: Projector, car: Car, gamepad: Gamepad2, mic: Mic2 };
const usageIconMap = { briefcase: Briefcase, baby: Baby, users: Users, sun: Sun, store: Store, paw: PawPrint };

const CarouselRow = ({ products, testId }) => {
  const carousel = useCarousel({ autoplay: false });
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm text-slate-500 font-bold text-xs sm:text-sm">
        No products currently listed in this section.
      </div>
    );
  }

  return (
    <div className="relative">
      <NavArrow dir="left" onClick={carousel.prev} className="absolute -left-3 lg:-left-5 top-[38%] -translate-y-1/2 z-10 hidden sm:flex" />
      <div
        {...carousel.scrollerProps}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 sm:mx-0 px-4 sm:px-0 pb-3 focus:outline-none"
        data-testid={testId}
        aria-label="Product carousel"
      >
        {products.map((p) => (
          <div key={p.id} data-slide className="w-[82vw] sm:w-[280px] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] flex-none snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <NavArrow dir="right" onClick={carousel.next} className="absolute -right-3 lg:-right-5 top-[38%] -translate-y-1/2 z-10 hidden sm:flex" />
      <Dots count={products.length} activeIndex={carousel.activeIndex} onSelect={carousel.scrollToIndex} className="mt-5" />
    </div>
  );
};

const SectionHeader = ({ title, subtitle, testId, linkTo = '/products' }) => (
  <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8 md:mb-10">
    <div>
      <h2 className="text-[24px] sm:text-[32px] font-black text-[#07152e] tracking-tight" data-testid={testId}>{title}</h2>
      <p className="text-[13px] sm:text-[13.5px] text-[#64748b] mt-1 sm:mt-2 font-medium">{subtitle}</p>
    </div>
    <Link
      to={linkTo}
      className="bg-white border border-[#d4dce7] hover:border-[#082f89] hover:text-[#082f89] text-[#1e2c45] text-[12px] sm:text-[12.5px] font-bold px-4 sm:px-5 py-2 rounded-full transition-colors shrink-0 hover:-translate-y-0.5 duration-200 shadow-sm active:scale-95 flex items-center gap-1"
    >
      <span>View All</span>
      <span>→</span>
    </Link>
  </div>
);

export const NewArrivals = () => {
  const { newArrivalsList } = useProducts();
  const activeNewArrivals = newArrivalsList && newArrivalsList.length > 0 ? newArrivalsList : fallbackNewArrivals;

  return (
    <section className="bg-[#f1f5f9] py-12 md:py-16" data-testid="new-arrivals-section">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <SectionHeader title="New Arrivals" subtitle="The latest additions to our family" testId="new-arrivals-title" />
        <CarouselRow products={activeNewArrivals} testId="new-arrivals-scroller" />
      </div>
    </section>
  );
};

export const BrandSection = () => (
  <section className="bg-gradient-to-b from-[#041b54] to-[#082f89] py-14 md:py-20 overflow-hidden relative" data-testid="brand-section">
    {/* subtle grid backdrop */}
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.12] pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
      }}
    />
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 md:gap-12 items-center relative">
      <div>
        <span className="inline-flex items-center gap-2 bg-[#01a345]/20 text-[#01a345] border border-[#01a345]/40 text-[11.5px] font-bold px-4 py-1.5 rounded-full mb-5">
          <Trophy size={13} className="text-[#01a345]" /> <span className="text-white">#BeyondTheLens</span>
        </span>
        <h2 className="text-[28px] sm:text-[36px] font-black leading-[1.1] tracking-tight">
          <span className="text-white">Next-Gen</span>
          <br />
          <span className="text-[#01a345]">AI Smarthome Brand</span>
        </h2>
        <p className="text-[#e8eeff] text-[13.5px] mt-3.5 max-w-sm leading-relaxed font-medium">
          At RGMS, we are redefining the boundaries of a connected lifestyle.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 mt-7 max-w-md">
          {brandCategories.map((c) => {
            const Icon = brandIconMap[c.icon];
            return (
              <div key={c.title} className="bg-white/10 backdrop-blur-md hover:bg-white/15 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 transition-all duration-300 cursor-pointer group hover:-translate-y-0.5">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#082f89] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                  <Icon size={17} className="text-[#e8eeff]" />
                </span>
                <div>
                  <p className="text-white text-[13px] sm:text-[13.5px] font-bold">{c.title}</p>
                  <p className="text-[#cbd5e1] text-[11px] sm:text-[11.5px] mt-0.5 leading-snug">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative flex justify-center mt-4 lg:mt-0">
        <div className="relative bg-white rounded-3xl p-6 sm:p-8 w-[270px] sm:w-[320px] md:w-[400px] shadow-[0_30px_70px_rgba(0,0,0,0.4)]">
          <img src="/assets/asset-27.png" alt="4K HD Android Smart Projector" loading="lazy" decoding="async" draggable={false} className="w-full h-[220px] sm:h-[260px] md:h-[360px] object-contain select-none pointer-events-none" />
          <div className="absolute -left-2 sm:-left-4 md:-left-12 top-4 sm:top-8 bg-[#01a345] text-white rounded-xl shadow-lg px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-2 animate-floatY z-10">
            <Tv size={14} />
            <div className="leading-tight">
              <p className="text-[11px] sm:text-[11.5px] font-bold">4K HD Android</p>
              <p className="text-[9.5px] sm:text-[10px] opacity-90">Smart Projector</p>
            </div>
          </div>
          <div className="absolute -right-2 sm:-right-3 md:-right-10 top-1/3 bg-[#041b54] text-[#ffffff] rounded-xl shadow-lg px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-2 animate-floatY z-10" style={{ animationDelay: '1s' }}>
            <RotateCw size={13} className="text-[#01a345]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold">180° Rotation</span>
          </div>
          <div className="absolute -left-2 sm:-left-3 md:-left-10 bottom-6 sm:bottom-10 bg-[#041b54] text-white rounded-xl shadow-lg px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-2 animate-floatY z-10" style={{ animationDelay: '2s' }}>
            <Wifi size={13} className="text-[#01a345]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold">Wifi Portable BT</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const BestSellers = () => {
  const { bestSellersList } = useProducts();
  const activeBestSellers = bestSellersList && bestSellersList.length > 0 ? bestSellersList : fallbackBestSellers;

  return (
    <section className="bg-white py-14 md:py-16" data-testid="best-sellers-section">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <SectionHeader title="Best Sellers" subtitle="Our most popular AI cameras" testId="best-sellers-title" />
        <CarouselRow products={activeBestSellers} testId="best-sellers-scroller" />
      </div>
    </section>
  );
};

export const UsageTypes = () => (
  <section className="bg-[#f8fafc] py-14 md:py-16" data-testid="usage-types-section">
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
      <div className="mb-8 md:mb-10">
        <h2 className="text-h2 text-[#07152e]">Shop by Usage Type</h2>
        <p className="text-[13.5px] text-[#64748b] mt-2 font-medium">Find the perfect camera for your specific needs</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {usageTypes.map((u) => {
          const Icon = usageIconMap[u.icon];
          return (
            <div key={u.title} className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 text-center card-lift cursor-pointer shadow-sm">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_6px_16px_rgba(8,47,137,0.12)]" style={{ backgroundColor: u.color }}>
                <Icon size={20} className="text-white" />
              </span>
              <p className="text-[13px] font-bold text-[#07152e]">{u.title}</p>
              <p className="text-[11.5px] text-[#8b98ad] mt-1.5 leading-snug">{u.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
