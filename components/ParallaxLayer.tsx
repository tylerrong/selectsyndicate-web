"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ParallaxLayerProps = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

/** Moves at a fraction of scroll speed. speed=0.2 is slow background. */
export function ParallaxLayer({
  children,
  speed = 0.25,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => -window.innerHeight * speed * 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={`parallax-layer will-change-transform ${className}`}>
      {children}
    </div>
  );
}
