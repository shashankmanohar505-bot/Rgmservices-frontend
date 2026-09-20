import React from 'react';
import Header from './Header';
import { Footer } from './BottomSections';
import { Loader2, ChevronRight } from 'lucide-react';

/**
 * Single Product Card Skeleton
 * Matches the exact shape, aspect ratio, and layout of ProductCard.jsx
 */
export const ProductCardSkeleton = ({ className = '' }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-[0_4px_16px_rgba(8,47,137,0.06)] p-4 flex flex-col h-full relative overflow-hidden border border-slate-100 animate-pulse ${className}`}
      aria-hidden="true"
    >
      {/* Badge Placeholder */}
      <div className="w-16 h-5 bg-slate-200 rounded-md mb-2" />

      {/* Image Container Placeholder */}
      <div className="h-[170px] bg-slate-100 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
        <div className="w-20 h-20 bg-slate-200/70 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmerSweep_2s_infinite]" />
      </div>

      {/* Rating Stars Placeholder */}
      <div className="flex items-center gap-1.5 mb-2">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="w-3 h-3 bg-slate-200 rounded-full" />
          ))}
        </div>
        <div className="w-12 h-3 bg-slate-200 rounded" />
      </div>

      {/* Product Title Placeholder (2 lines) */}
      <div className="space-y-1.5 mb-4">
        <div className="h-3.5 bg-slate-200 rounded w-5/6" />
        <div className="h-3.5 bg-slate-200 rounded w-3/5" />
      </div>

      {/* Price & CTA Buttons Placeholder */}
      <div className="mt-auto space-y-3">
        <div className="flex items-baseline gap-2">
          <div className="w-16 h-5 bg-slate-200 rounded" />
          <div className="w-12 h-3.5 bg-slate-100 rounded" />
        </div>

        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-slate-200 rounded-full" />
          <div className="flex-1 h-10 bg-slate-100 border border-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

/**
 * Product Grid Skeleton
 * Used in CategoryPage, Shop All, and Catalog views
 */
export const ProductGridSkeleton = ({ count = 8, message = "Loading RGMS Smart Products..." }) => {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading products">
      {/* Subtle Loading Status Indicator */}
      <div className="flex items-center justify-between bg-[#e8eeff]/60 border border-[#082f89]/15 rounded-2xl px-4 py-3 text-xs font-bold text-[#082f89]">
        <div className="flex items-center gap-2.5">
          <Loader2 size={16} className="animate-spin text-[#082f89]" />
          <span>{message}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] text-[#01a345] bg-white px-2.5 py-1 rounded-full shadow-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#01a345] animate-ping" />
          Live Inventory Sync
        </span>
      </div>

      {/* Skeleton Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

/**
 * Product Carousel Skeleton
 * Used in NewArrivals, BestSellers, DealsSection
 */
export const ProductCarouselSkeleton = ({ count = 4 }) => {
  return (
    <div className="relative overflow-hidden" aria-busy="true" aria-label="Loading carousel">
      <div className="flex gap-4 sm:gap-5 overflow-x-hidden -mx-4 sm:mx-0 px-4 sm:px-0 pb-3">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="w-[82vw] sm:w-[280px] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] flex-none"
          >
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Standalone Branded Spinner
 */
export const ProductSpinner = ({ label = "Loading...", size = "md" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="relative flex items-center justify-center">
        <div className={`rounded-full border-2 border-slate-200 border-t-[#082f89] animate-spin ${sizeClasses[size] || sizeClasses.md}`} />
        <div className="absolute w-2 h-2 rounded-full bg-[#01a345] animate-pulse" />
      </div>
      {label && <p className="text-xs font-bold text-slate-500">{label}</p>}
    </div>
  );
};

/**
 * Product Detail Page Skeleton
 * Used when directly visiting a product URL before data has loaded
 */
export const ProductDetailPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#07152e] flex flex-col justify-between">
      <Header />

      <main className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8 space-y-10 w-full animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-12 h-3.5 bg-slate-200 rounded" />
          <ChevronRight size={14} className="text-slate-300" />
          <div className="w-16 h-3.5 bg-slate-200 rounded" />
          <ChevronRight size={14} className="text-slate-300" />
          <div className="w-20 h-3.5 bg-slate-200 rounded" />
        </div>

        {/* Hero Showcase Grid Skeleton */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-b from-[#f8fafc] to-slate-100 rounded-3xl p-6 border border-slate-200/80 min-h-[340px] md:min-h-[420px] flex items-center justify-center relative overflow-hidden">
              <div className="w-40 h-40 bg-slate-200 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmerSweep_2s_infinite]" />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category and Rating */}
            <div className="flex items-center justify-between gap-4">
              <div className="w-24 h-6 bg-[#e8eeff] rounded-full" />
              <div className="w-32 h-6 bg-slate-100 rounded-full" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className="h-7 bg-slate-200 rounded-lg w-4/5" />
              <div className="h-7 bg-slate-200 rounded-lg w-1/2" />
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex items-center justify-between">
              <div className="space-y-2">
                <div className="w-32 h-8 bg-slate-200 rounded-lg" />
                <div className="w-24 h-3.5 bg-slate-100 rounded" />
              </div>
              <div className="w-28 h-7 bg-slate-200 rounded-full" />
            </div>

            {/* Description Short */}
            <div className="space-y-2">
              <div className="h-3.5 bg-slate-200 rounded w-full" />
              <div className="h-3.5 bg-slate-200 rounded w-11/12" />
              <div className="h-3.5 bg-slate-200 rounded w-4/5" />
            </div>

            {/* Feature bullets */}
            <div className="grid sm:grid-cols-2 gap-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-slate-100 rounded w-3/4" />
              ))}
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div className="h-12 bg-slate-200 rounded-2xl" />
              <div className="h-12 bg-[#082f89]/20 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Loading Banner */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-center gap-3 text-xs font-bold text-[#082f89]">
          <Loader2 size={18} className="animate-spin text-[#082f89]" />
          <span>Loading full technical specifications and verified customer reviews...</span>
        </div>
      </main>

      <Footer />
    </div>
  );
};
