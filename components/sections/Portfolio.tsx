"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * 02 — Logo stagger.
 * Cells stay locked (borders align); parallax runs on the mark inside only.
 */
export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const heading = headingRef.current;
    if (!section || !grid) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const cells = grid.querySelectorAll(".logo-cell");
      const marks = grid.querySelectorAll(".logo-mark");

      if (reduced) {
        gsap.set(cells, { opacity: 1, y: 0 });
        return;
      }

      if (heading) {
        gsap.fromTo(
          heading,
          { y: 36, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              end: "top 55%",
              scrub: 0.6,
            },
          }
        );
      }

      gsap.fromTo(
        cells,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: { each: 0.04, from: "start" },
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Parallax the mark only — keeps grid borders locked
      marks.forEach((mark, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(mark, {
          y: dir * 10,
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="surface-black relative overflow-hidden py-16 md:py-[118px]"
      aria-labelledby="portfolio-heading"
    >
      <div className="wrap relative">
        <div
          ref={headingRef}
          className="flex flex-col justify-between gap-8 will-change-transform md:flex-row md:items-end"
        >
          <h2
            id="portfolio-heading"
            className="display text-[clamp(32px,7vw,56px)]"
          >
            The future doesn’t
            <br />
            wait for an IPO.
          </h2>
          <p className="max-w-[320px] text-[13px] leading-[1.7] text-muted md:max-w-[280px] md:pr-8 md:text-sm md:leading-[1.8]">
            From artificial intelligence to aerospace. Meet some of the
            companies in the Select Syndicate portfolio.
          </p>
        </div>

        <div
          ref={gridRef}
          className="logo-grid mt-8 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 md:mt-14 md:grid-cols-4"
          aria-label="Selected portfolio companies"
        >
          {portfolio.map((item) => (
            <div
              key={item.alt}
              className="logo-cell group flex h-[88px] items-center justify-center border-b border-r border-line transition-colors duration-200 hover:bg-panel sm:h-[100px] md:h-[130px]"
              style={{ opacity: 0 }}
            >
              <span
                className="logo-mark relative flex h-[30px] w-[76%] items-center justify-center will-change-transform sm:h-[35px] sm:w-[70%] md:h-12 md:w-[61%]"
                style={{ transform: `scale(${item.scale})` }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={480}
                  height={120}
                  className="h-full w-full object-contain opacity-[0.82] brightness-0 invert transition duration-300 group-hover:opacity-100"
                />
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[10px] leading-[1.7] text-muted-dim">
          A selection of portfolio companies — and others. Not a list of
          currently available opportunities.
        </p>
      </div>
    </section>
  );
}
