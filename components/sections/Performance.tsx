"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type MetricSlide = {
  id: string;
  label: string;
  detail: string;
  kind: "number" | "text";
  value?: number;
  decimals?: number;
  suffix?: string;
  display?: string;
};

const slides: MetricSlide[] = [
  {
    id: "irr",
    label: "Net IRR · Annualized",
    detail: "Since first investment · November 8, 2024",
    kind: "number",
    value: 110,
    decimals: 0,
    suffix: "%",
  },
  {
    id: "moic",
    label: "Net MOIC · Approximate",
    detail: "Multiple on invested capital · Syndicate-wide, net of fees",
    kind: "number",
    value: 1.85,
    decimals: 2,
    suffix: "×",
  },
  {
    id: "dist",
    label: "Distributions",
    detail: "Cash distributions to investors have begun.",
    kind: "text",
    display: "Underway",
  },
];

function formatValue(n: number, decimals: number) {
  return decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
}

export function Performance() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 820px)").matches;

    if (reduced) {
      // Show all slides stacked statically — only first visible as primary
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
      });
      slides.forEach((slide, i) => {
        const el = valueRefs.current[i];
        if (!el || slide.kind !== "number" || slide.value == null) return;
        el.textContent = formatValue(slide.value, slide.decimals ?? 0);
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=120%" : "+=300%",
          pin: pin,
          scrub: isMobile ? 0.45 : 0.65,
          anticipatePin: 1,
        },
      });

      // Init slides off-stage
      slideRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 56 });
      });

      slides.forEach((slide, i) => {
        const el = slideRefs.current[i];
        const valueEl = valueRefs.current[i];
        if (!el) return;

        const segment = i; // each slide owns a timeline window
        const enter = segment * 0.9;
        const hold = enter + 0.25;
        const exit = enter + 0.7;

        // Enter from below
        tl.fromTo(
          el,
          { opacity: 0, y: 64, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "none" },
          enter
        );

        if (slide.kind === "number" && valueEl && slide.value != null) {
          const obj = { n: 0 };
          const decimals = slide.decimals ?? 0;
          // Metric scrub — count while settling
          tl.to(
            obj,
            {
              n: slide.value,
              duration: 0.55,
              ease: "none",
              onUpdate: () => {
                valueEl.textContent = formatValue(obj.n, decimals);
              },
            },
            enter
          );
          // Subtle number parallax — continues to breathe during hold
          tl.fromTo(
            valueEl,
            { y: 18 },
            { y: -14, duration: 0.55, ease: "none" },
            enter
          );
        }

        // Hold briefly then exit upward (except last — stays)
        if (i < slides.length - 1) {
          tl.to(
            el,
            { opacity: 0, y: -56, scale: 1.03, duration: 0.28, ease: "none" },
            exit
          );
        } else {
          tl.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.01 }, hold);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="performance"
      className="surface-black relative"
      aria-labelledby="performance-heading"
    >
      {/* Pinned number stage — Flair-inspired */}
      <div
        ref={pinRef}
        className="relative flex h-[100svh] flex-col overflow-hidden md:min-h-[640px]"
      >
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-5 text-center md:px-6">
          <div className="w-full max-w-[920px]">
            <h2
              id="performance-heading"
              className="display text-[clamp(26px,6.5vw,48px)] text-ink"
            >
              An early track record.
              <br />
              A long-term ambition.
            </h2>

            {/* Stacked metric slides — absolute, cycle on scrub */}
            <div className="relative mt-8 h-[200px] w-full md:mt-12 md:h-[250px]">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  ref={(node) => {
                    slideRefs.current[i] = node;
                  }}
                  className="absolute inset-x-0 top-0 flex flex-col items-center justify-center"
                  style={{ opacity: 0 }}
                >
                  <p className="text-[clamp(56px,16vw,140px)] font-light leading-none tracking-[-0.06em] text-ink tabular-nums">
                    {slide.kind === "number" ? (
                      <>
                        <span
                          ref={(node) => {
                            valueRefs.current[i] = node;
                          }}
                        >
                          0
                        </span>
                        <span className="ml-1 text-[0.45em] font-light tracking-[-0.02em] text-muted">
                          {slide.suffix}
                        </span>
                      </>
                    ) : (
                      <span className="text-[clamp(40px,10vw,96px)] tracking-[-0.04em]">
                        {slide.display}
                      </span>
                    )}
                  </p>
                  <p className="mt-4 text-[11px] font-medium tracking-[0.14em] text-muted uppercase md:mt-5 md:text-[13px] md:tracking-[0.16em]">
                    {slide.label}
                  </p>
                  <p className="mt-2 max-w-[320px] px-2 text-[12px] leading-[1.55] text-muted-dim md:mt-3 md:max-w-[360px] md:text-[13px] md:leading-[1.6]">
                    {slide.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 mx-auto w-full max-w-[540px] shrink-0 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom,0px)+0.75rem)] text-center text-[10px] leading-[1.7] text-muted-dim md:px-6 md:pb-10 md:text-[11px]">
          Past performance is not indicative of future results. Not an offer to
          sell or a solicitation to buy securities. Private investments involve
          risk of loss.
        </p>
      </div>
    </section>
  );
}
