import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Robust carousel behaviour hook for native scroll-snap containers.
 *  - Mouse drag with grab cursor
 *  - Touch swipe (native)
 *  - Keyboard arrows (Left / Right) when focused
 *  - Autoplay with pause on hover / focus / drag / hidden tab
 *  - Pagination dot state via IntersectionObserver
 *  - Respects prefers-reduced-motion
 */
export default function useCarousel({ autoplay = false, interval = 5000, itemSelector = '[data-slide]' } = {}) {
  const [scrollerNode, setScrollerNode] = useState(null);
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startLeft = useRef(0);
  const moved = useRef(false);

  const setRef = useCallback((node) => {
    scrollerRef.current = node;
    setScrollerNode(node);
  }, []);

  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  const scrollByAmount = useCallback((dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector(itemSelector);
    const step = first ? first.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: reducedMotion.current ? 'auto' : 'smooth' });
  }, [itemSelector]);

  const scrollToIndex = useCallback((i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = el.querySelectorAll(itemSelector);
    if (!slides.length) return;
    const target = slides[Math.max(0, Math.min(i, slides.length - 1))];
    if (target) {
      el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: reducedMotion.current ? 'auto' : 'smooth' });
      setActiveIndex(i); // Provide instant visual dot highlight feedback
    }
  }, [itemSelector]);

  // Track active slide via IntersectionObserver + MutationObserver for dynamic slide count updates
  useEffect(() => {
    const el = scrollerNode;
    if (!el) return;

    let io;

    const setupObserver = () => {
      if (io) io.disconnect();
      const slides = Array.from(el.querySelectorAll(itemSelector));
      setCount(slides.length);
      if (!slides.length) return;

      io = new IntersectionObserver(
        (entries) => {
          let best = null;
          entries.forEach((e) => {
            if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
          });
          if (best?.isIntersecting) {
            const idx = slides.indexOf(best.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        },
        { root: el, threshold: [0.55, 0.75, 1] }
      );
      slides.forEach((s) => io.observe(s));
    };

    setupObserver();

    // Re-bind when slides are dynamically added, removed, or changed
    const mutationObserver = new MutationObserver(() => {
      setupObserver();
    });
    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      if (io) io.disconnect();
      mutationObserver.disconnect();
    };
  }, [scrollerNode, itemSelector]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || reducedMotion.current || isPaused || count < 2) return;
    const t = setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const slides = el.querySelectorAll(itemSelector);
      if (!slides.length) return;
      const next = (activeIndex + 1) % slides.length;
      const target = slides[next];
      if (next === 0) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
        setActiveIndex(0);
      } else if (target) {
        el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: 'smooth' });
        setActiveIndex(next);
      }
    }, interval);
    return () => clearInterval(t);
  }, [autoplay, interval, isPaused, activeIndex, count, itemSelector]);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => setIsPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Mouse drag
  const onMouseDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragging.current = true;
    moved.current = false;
    startX.current = e.pageX - el.offsetLeft;
    startLeft.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
    el.style.scrollSnapType = 'none';
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const el = scrollerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const delta = x - startX.current;
    if (Math.abs(delta) > 4) moved.current = true;
    el.scrollLeft = startLeft.current - delta;
  };
  const endDrag = () => {
    const el = scrollerRef.current;
    if (!el) return;
    dragging.current = false;
    el.style.cursor = '';
    el.style.scrollSnapType = '';
    if (moved.current) {
      // Snap to nearest slide
      const slides = Array.from(el.querySelectorAll(itemSelector));
      let closest = 0;
      let min = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (d < min) { min = d; closest = i; }
      });
      scrollToIndex(closest);
    }
  };

  // Prevent click-through after drag
  const onClickCapture = (e) => {
    if (moved.current) {
      e.stopPropagation();
      e.preventDefault();
      moved.current = false;
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByAmount('left'); }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByAmount('right'); }
    if (e.key === 'Home') { e.preventDefault(); scrollToIndex(0); }
    if (e.key === 'End') { e.preventDefault(); scrollToIndex(count - 1); }
  };

  const scrollerProps = {
    ref: setRef,
    tabIndex: 0,
    onMouseDown,
    onMouseMove,
    onMouseUp: endDrag,
    onMouseLeave: endDrag,
    onClickCapture,
    onKeyDown,
    onMouseEnter: () => setIsPaused(true),
    onFocus: () => setIsPaused(true),
    onBlur: () => setIsPaused(false),
    onPointerLeave: () => setIsPaused(false),
    style: { cursor: 'grab', touchAction: 'pan-x pan-y' },
  };

  return {
    scrollerRef,
    scrollerProps,
    activeIndex,
    count,
    next: () => scrollByAmount('right'),
    prev: () => scrollByAmount('left'),
    scrollToIndex,
  };
}
