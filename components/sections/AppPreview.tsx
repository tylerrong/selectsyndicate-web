"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IPhoneFrame } from "../IPhoneFrame";

gsap.registerPlugin(ScrollTrigger);

/**
 * Avec-inspired phone jump-out. Headline sits tight above the stage;
 * the device fills the well and rises on scrub.
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
      // Keep travel modest so the device top never clips the stage edge
      gsap.set(phone, {
        y: isMobile ? 28 : 40,
        scale: isMobile ? 0.95 : 0.92,
        rotateX: isMobile ? 0 : 3,
      });
      if (copyTop) gsap.set(copyTop, { y: 8, opacity: 0.65 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=70%" : "+=140%",
          pin: true,
          scrub: isMobile ? 0.4 : 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(stage, { scale: 0.98 }, { scale: 1, ease: "none" }, 0);

      if (copyTop) {
        tl.to(copyTop, { y: 0, opacity: 1, ease: "none" }, 0);
      }

      tl.to(
        phone,
        {
          y: 0,
          scale: 1,
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
      className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#f7f7f5] px-5 py-12 text-[#0a0e14] md:px-8 md:py-16"
      aria-labelledby="app-heading"
      style={{ perspective: "1400px" }}
    >
      <div className="flex w-full max-w-[720px] flex-col items-center">
        <div
          ref={copyTopRef}
          className="relative z-20 mb-4 w-full text-center will-change-transform md:mb-5"
        >
          <h2
            id="app-heading"
            className="display mx-auto max-w-[16ch] text-[clamp(36px,5vw,52px)] tracking-[-0.035em] leading-[1.08]"
          >
            Syndicate,
            <br />
            where members already are.
          </h2>
        </div>

        <div
          ref={stageRef}
          className="relative z-10 flex w-full items-end justify-center overflow-hidden rounded-[1.5rem] will-change-transform md:rounded-[2.25rem]"
          style={{
            background:
              "linear-gradient(180deg, #e8e9e6 0%, #ddded9 55%, #d0d1cb 100%)",
            boxShadow:
              "0 32px 72px rgba(10,14,20,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
            height: "min(56svh, 500px)",
            paddingTop: "2.5rem",
          }}
        >
          <div
            ref={phoneRef}
            className="relative w-[min(56vw,236px)] origin-bottom will-change-transform md:w-[268px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Sink only the bottom — keep the device top fully inside the well */}
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
      </div>
    </section>
  );
}
