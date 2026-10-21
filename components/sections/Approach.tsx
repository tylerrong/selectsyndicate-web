"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { principles } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * 01 — Select story after the film. Compact split: statement left, narrative right,
 * then principles as stacked rows.
 */
export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const principlesEl = principlesRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (principlesEl) {
        gsap.set(principlesEl.querySelectorAll("article"), { opacity: 1, y: 0 });
      }
      if (intro) gsap.set(intro, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (intro) {
        gsap.fromTo(
          intro,
          { y: 20, opacity: 0.55 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: intro,
              start: "top 92%",
              end: "top 62%",
              scrub: 0.5,
            },
          }
        );
      }

      if (principlesEl) {
        const items = principlesEl.querySelectorAll("article");
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { y: 36 + i * 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "top 58%",
                scrub: 0.45 + i * 0.08,
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="surface-black relative overflow-hidden pb-20 pt-2 md:pb-28 md:pt-4"
      aria-labelledby="approach-heading"
    >
      <div
        ref={introRef}
        className="wrap relative grid items-start gap-8 will-change-transform md:grid-cols-[1.15fr_0.95fr] md:gap-16 lg:gap-[88px]"
      >
        <div>
          <h2
            id="approach-heading"
            className="display max-w-[13ch] text-[clamp(34px,4.6vw,60px)] tracking-[-0.035em]"
          >
            Access is the beginning.
            <br />
            Selection is the difference.
          </h2>
          <p className="body mt-5 max-w-[26ch] md:mt-7">
            The Select approach, brought to private markets.
          </p>
        </div>

        <div className="md:pt-[0.35em]">
          <p className="max-w-[36ch] text-[16px] leading-[1.55] tracking-[-0.015em] text-ink md:text-[18px] md:leading-[1.6]">
            The most compelling companies aren’t always the most accessible.
          </p>
          <p className="body mt-5 max-w-[38ch]">
            Select Syndicate brings the Select approach to private markets:
            carefully sourced opportunities, thoughtful diligence, and personal
            support throughout the investment process.
          </p>
          <p className="body mt-4 max-w-[38ch]">
            For members and institutional partners, it’s a connection to
            ambitious companies at defining moments in their growth — from
            mature seed through pre-IPO.
          </p>
        </div>
      </div>

      <div
        ref={principlesRef}
        className="wrap relative mt-14 border-t border-line md:mt-[88px]"
      >
        {principles.map((item) => (
          <article
            key={item.number}
            className="grid grid-cols-[2.5rem_1fr] items-start gap-x-4 gap-y-2 border-b border-line py-7 will-change-transform md:grid-cols-[4.5rem_minmax(0,1.05fr)_minmax(0,1fr)] md:gap-x-10 md:py-9"
            style={{ opacity: 0 }}
          >
            <span className="pt-1 text-[12px] font-medium tracking-[0.12em] text-muted-dim tabular-nums">
              {item.number}
            </span>
            <h3 className="text-[clamp(17px,1.7vw,22px)] font-medium tracking-[-0.02em] text-ink">
              {item.title}
            </h3>
            <p className="body col-start-2 max-w-[34ch] md:col-start-3 md:max-w-[32ch] md:pt-1">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
