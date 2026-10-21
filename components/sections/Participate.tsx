"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * How it works — lean steps after the app beat. No hard rules.
 */
export function Participate() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list = stepsRef.current;
    const heading = headingRef.current;
    if (!section || !list) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(list.querySelectorAll("li"), { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 28, opacity: 0.45 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              end: "top 55%",
              scrub: 0.55,
            },
          }
        );
      }

      const items = list.querySelectorAll<HTMLLIElement>("li");
      items.forEach((item: HTMLLIElement, i: number) => {
        gsap.fromTo(
          item,
          { y: 48 + i * 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              end: "top 55%",
              scrub: 0.45 + i * 0.12,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="surface-light relative z-10 pb-16 pt-10 md:pb-28 md:pt-16"
      aria-labelledby="participate-heading"
    >
      <div className="wrap grid items-start gap-8 md:grid-cols-2 md:gap-[96px]">
        <div ref={headingRef} className="will-change-transform md:self-start">
          <h2
            id="participate-heading"
            className="display text-[clamp(30px,7.5vw,52px)]"
          >
            Thoughtful access.
            <br />
            At every step.
          </h2>
        </div>

        <ol ref={stepsRef} className="m-0 list-none space-y-7 p-0 md:space-y-10">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex gap-4 will-change-transform md:gap-6"
              style={{ opacity: 0 }}
            >
              <span className="shrink-0 pt-1 text-[12px] font-medium tracking-[0.1em] text-muted-dim">
                {step.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-[16px] font-medium tracking-[-0.01em] md:text-[18px]">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[340px] text-[13px] leading-[1.65] text-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
