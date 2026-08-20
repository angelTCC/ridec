"use client";

import { useState, useRef, useEffect, useCallback, Children, ReactNode } from "react";

interface SliderProps {
  children: ReactNode;
  visibleCount?: number;
}

export default function Slider({ children, visibleCount = 3 }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [cardWidth, setCardWidth] = useState(336);
  const count = Children.count(children);
  const maxIdx = Math.max(0, count - visibleCount);

  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        const first = trackRef.current.children[0] as HTMLElement;
        if (first) {
          const gap = parseInt(getComputedStyle(trackRef.current).gap) || 24;
          setCardWidth(first.offsetWidth + gap);
        }
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(i, maxIdx)),
    [maxIdx]
  );

  return (
    <div className="slider">
      <div
        ref={trackRef}
        className="slider__track"
        style={{ transform: `translateX(-${slideIdx * cardWidth}px)` }}
      >
        {children}
      </div>

      {slideIdx > 0 && (
        <button
          className="slider__btn slider__btn--prev"
          onClick={() => setSlideIdx((i) => clamp(i - 1))}
          aria-label="Anterior"
        >
          &#8249;
        </button>
      )}
      {slideIdx < maxIdx && (
        <button
          className="slider__btn slider__btn--next"
          onClick={() => setSlideIdx((i) => clamp(i + 1))}
          aria-label="Siguiente"
        >
          &#8250;
        </button>
      )}
    </div>
  );
}
