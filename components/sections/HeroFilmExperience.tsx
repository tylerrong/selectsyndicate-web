"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FilmPlayer } from "../FilmPlayer";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-bleed film hero with a sticky scroll chapter, then a soft fade
 * into Approach so the handoff doesn't feel cut off.
 */
export function HeroFilmExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const filmCopyRef = useRef<HTMLDivElement>(null);
  const exitScrimRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const heroCopy = heroCopyRef.current;
    const filmCopy = filmCopyRef.current;
    const exitScrim = exitScrimRef.current;
    if (!root || !pin || !heroCopy || !filmCopy || !exitScrim) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(filmCopy, { opacity: 1, y: 0 });
      gsap.set(exitScrim, { opacity: 0 });
      return;
    }

    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    // Keep the chapter brief — both surfaces are black, so leftover pin = empty void
    const pinDistance = isMobile ? "+=32%" : "+=42%";

    const ctx = gsap.context(() => {
      const filmScale = pin.querySelector(".film-scale");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: pinDistance,
          pin: pin,
          scrub: isMobile ? 0.35 : 0.45,
          anticipatePin: 1,
        },
      });

      // 0–0.3: hero copy out
      tl.to(
        heroCopy,
        {
          opacity: 0,
          y: isMobile ? -16 : -28,
          ease: "none",
        },
        0
      );

      if (filmScale) {
        tl.to(filmScale, { scale: 1, ease: "none" }, 0);
      }

      // 0.18–0.42: film caption in
      tl.fromTo(
        filmCopy,
        { opacity: 0, y: isMobile ? 20 : 28 },
        { opacity: 1, y: 0, ease: "none" },
        0.18
      );

      // Exit lands at the end of the pin — Approach follows immediately
      tl.to(
        filmCopy,
        {
          opacity: 0,
          y: isMobile ? -8 : -12,
          ease: "none",
        },
        0.72
      );

      tl.fromTo(
        exitScrim,
        { opacity: 0 },
        { opacity: 1, ease: "none" },
        0.74
      );

      if (filmScale) {
        tl.to(filmScale, { scale: 1.015, ease: "none" }, 0.76);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div
        ref={pinRef}
        className="relative h-[100svh] overflow-hidden bg-bg md:min-h-[640px]"
      >
        <div className="film-scale absolute inset-0 origin-center scale-[1.06] will-change-transform">
          <FilmPlayer videoRef={videoRef} />
        </div>

        {/* Readable overlay for hero copy */}
        <div className="hero-scrim pointer-events-none absolute inset-0" />

        {/* Exit wash — fades film into Approach (black) */}
        <div
          ref={exitScrimRef}
          className="pointer-events-none absolute inset-0 z-[5] bg-[#05070b] opacity-0 will-change-[opacity]"
          aria-hidden="true"
        />

        {/* Hero overlay — first viewport */}
        <div
          ref={heroCopyRef}
          className="wrap absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end pb-[max(3.5rem,env(safe-area-inset-bottom,0px)+2rem)] pt-[100px] will-change-transform md:pb-20 md:pt-[140px]"
          style={{ top: 0 }}
        >
          <h1
            id="hero-heading"
            className="display max-w-[14ch] text-[clamp(40px,9vw,108px)]"
          >
            A different kind
            <br />
            of access.
          </h1>

          <div className="mt-7 flex flex-col-reverse items-start justify-between gap-6 md:mt-12 md:flex-row md:items-end md:gap-8">
            <a
              href="#approach"
              className="group pointer-events-auto inline-flex min-h-11 items-center gap-3 text-xs"
            >
              Explore the Syndicate
              <span
                className="transition-transform group-hover:translate-y-1"
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
            <p className="max-w-[440px] text-[13px] leading-[1.75] text-muted md:text-sm md:leading-[1.9]">
              Extraordinary companies. Curated opportunities.
              Connecting Select members and institutional partners
              to private markets, from mature seed to pre-IPO.
            </p>
          </div>

          <div
            className="pointer-events-none absolute right-[-30px] top-[204px] hidden text-[9px] tracking-[2px] text-[#6b788b] [writing-mode:vertical-rl] xl:block"
            aria-hidden="true"
          >
            EST. 2024 &nbsp; / &nbsp; A LONG-TERM PERSPECTIVE
          </div>
        </div>

        {/* Film chapter caption — mid-pin */}
        <div
          ref={filmCopyRef}
          id="film"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 wrap pb-12 opacity-0 will-change-transform md:pb-16"
          aria-label="The Select Syndicate film"
        >
          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-5 text-[11px] text-muted md:flex-row md:items-end md:text-[12px]">
            <span>Conviction begins with a different perspective.</span>
            <span className="text-[9px] tracking-[0.14em] uppercase">
              Select Syndicate — The Film
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
