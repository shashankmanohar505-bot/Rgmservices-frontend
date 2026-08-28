import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const NavArrow = ({ dir, onClick, className = '', label }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label || (dir === 'left' ? 'Previous' : 'Next')}
    data-testid={`carousel-${dir}`}
    className={
      'w-10 h-10 rounded-full bg-white/95 backdrop-blur border border-slate-200/80 ' +
      'shadow-[0_6px_20px_rgba(8,47,137,0.14)] flex items-center justify-center ' +
      'text-[#1e2c45] hover:text-[#082f89] hover:bg-white hover:scale-105 ' +
      'active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#082f89] ' +
      'disabled:opacity-40 disabled:cursor-not-allowed ' + className
    }
  >
    {dir === 'left' ? <ChevronLeft size={18} strokeWidth={2.2} /> : <ChevronRight size={18} strokeWidth={2.2} />}
  </button>
);

export const Dots = ({ count, activeIndex, onSelect, className = '' }) => {
  if (count <= 1) return null;

  const maxVisible = 7;
  let start = 0;
  let end = count - 1;

  if (count > maxVisible) {
    start = activeIndex - Math.floor(maxVisible / 2);
    end = activeIndex + Math.ceil(maxVisible / 2) - 1;

    if (start < 0) {
      end = end - start;
      start = 0;
    } else if (end >= count) {
      start = Math.max(0, start - (end - count + 1));
      end = count - 1;
    }
  }

  return (
    <div className={'flex items-center justify-center ' + className} role="tablist" aria-label="Slide navigation">
      {Array.from({ length: count }).map((_, i) => {
        const isVisible = i >= start && i <= end;
        const isActive = i === activeIndex;

        // Determine edge sizes for a clean sliding window transition
        const isLeftEdge = count > maxVisible && i === start && start > 0;
        const isRightEdge = count > maxVisible && i === end && end < count - 1;
        const isSecondLeftEdge = count > maxVisible && i === start + 1 && start > 0;
        const isSecondRightEdge = count > maxVisible && i === end - 1 && end < count - 1;

        let dotWidthClass = 'w-2';
        let dotHeightClass = 'h-2';
        let opacityClass = 'opacity-100';

        if (!isVisible) {
          dotWidthClass = 'w-0';
          dotHeightClass = 'h-0';
          opacityClass = 'opacity-0';
        } else if (isActive) {
          dotWidthClass = 'w-7';
          dotHeightClass = 'h-2';
        } else if (isLeftEdge || isRightEdge) {
          dotWidthClass = 'w-1';
          dotHeightClass = 'h-1';
        } else if (isSecondLeftEdge || isSecondRightEdge) {
          dotWidthClass = 'w-1.5';
          dotHeightClass = 'h-1.5';
        }

        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            disabled={!isVisible}
            className="focus:outline-none flex items-center justify-center transition-all duration-300"
            style={{
              padding: isVisible ? '10px 4px' : '0px',
              margin: isVisible ? '0 2px' : '0px',
              width: isVisible ? 'auto' : '0px',
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${dotWidthClass} ${dotHeightClass} ${
                isActive ? 'bg-[#082f89]' : 'bg-[#cbd5e1] hover:bg-[#94a3b8]'
              } ${opacityClass}`}
            />
          </button>
        );
      })}
    </div>
  );
};
