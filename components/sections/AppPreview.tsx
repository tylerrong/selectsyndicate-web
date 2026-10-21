"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IPhoneFrame } from "../IPhoneFrame";

gsap.registerPlugin(ScrollTrigger);

/**
 * Avec-inspired phone jump-out. Headline + device only —
 * supporting copy lives in Experience next.
 */
export function AppPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const copyTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const phone = phoneRef.current;
    const copyTop = copyTopRef.current;
    if (!section || !stage || !phone) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const isMobile = window.matchMedia("(max-width: 820px)").matches;

    const ctx = gsap.context(() => {
      gsap.set(phone, {
        y: isMobile ? 36 : 80,
        scale: isMobile ? 0.92 : 0.88,
        rotateX: isMobile ? 1 : 6,
      });
      if (copyTop) gsap.set(copyTop, { y: 10, opacity: 0.55 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=70%" : "+=160%",
          pin: true,
          scrub: isMobile ? 0.45 : 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(stage, { scale: 0.97 }, { scale: 1, ease: "none" }, 0);

      if (copyTop) {
        tl.to(copyTop, { y: 0, opacity: 1, ease: "none" }, 0);
      }

      tl.to(
        phone,
        {
          y: isMobile ? -4 : -28,
          scale: isMobile ? 1.01 : 1.05,
          rotateX: 0,
          ease: "none",
        },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="app"
      className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center gap-5 overflow-hidden bg-[#f7f7f5] px-4 py-10 text-[#0a0e14] md:gap-7 md:px-8 md:py-16"
      aria-labelledby="app-heading"
      style={{ perspective: "1400px" }}
    >
      <div
        ref={copyTopRef}
        className="relative z-20 max-w-[18ch] px-1 text-center will-change-transform"
      >
        <h2
          id="app-heading"
          className="display text-[clamp(34px,5.2vw,56px)] tracking-[-0.035em]"
        >
          Syndicate,
          <br />
          where members
          <br />
          already are.
        </h2>
      </div>

      <div
        ref={stageRef}
        className="relative z-10 flex w-full max-w-[680px] items-end justify-center overflow-hidden rounded-[1.75rem] will-change-transform md:rounded-[2.5rem]"
        style={{
          background:
            "linear-gradient(180deg, #e8e9e6 0%, #ddded9 55%, #d0d1cb 100%)",
          boxShadow:
            "0 40px 90px rgba(10,14,20,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
          minHeight: "min(44svh, 400px)",
          paddingTop: "1.5rem",
          paddingBottom: 0,
        }}
      >
        <div
          ref={phoneRef}
          className="relative w-[min(50vw,230px)] origin-bottom will-change-transform sm:w-[min(54vw,250px)] md:w-[280px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="translate-y-[10%] md:translate-y-[12%]">
            <IPhoneFrame
              finish="dark"
              src="/assets/syndicate-app.mp4"
              poster="/assets/syndicate-app-poster.png"
              label="Screen recording of Select Syndicate inside the Select mobile app"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
