"use client";

import { Reveal } from "../Reveal";

/**
 * Closing CTA — light surface to mesh with Experience; raised white panel.
 */
export function Connect() {
  return (
    <section
      id="connect"
      className="surface-light py-12 md:py-24"
      aria-labelledby="connect-heading"
    >
      <div className="wrap">
        <Reveal>
          <div
            className="relative overflow-hidden border border-line bg-panel px-5 py-12 text-center md:px-12 md:py-[96px]"
            style={{
              boxShadow:
                "0 28px 80px rgba(10,14,20,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(10,14,20,0.03) 0%, transparent 55%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-[560px]">
              <h2
                id="connect-heading"
                className="display text-[clamp(36px,9vw,68px)]"
              >
                Let’s look ahead.
              </h2>

              <p className="body mx-auto mt-4 max-w-[360px] md:mt-5">
                For Select members, family offices, and institutional partners.
              </p>

              <div className="mt-8 flex w-full flex-col items-center gap-4 md:mt-10">
                <a
                  href="mailto:carlo@meetselect.com"
                  className="group inline-flex min-h-12 w-full max-w-[280px] items-center justify-center gap-3 px-7 py-[15px] text-[13px] font-medium tracking-[0.01em] transition-opacity hover:opacity-90 md:w-auto"
                  style={{
                    backgroundColor: "#0a0e14",
                    color: "#f2f1eb",
                  }}
                >
                  Connect with Carlo
                  <span
                    aria-hidden="true"
                    className="text-[12px] opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
                <a
                  href="mailto:carlo@meetselect.com"
                  className="text-[12px] text-muted transition-colors hover:text-ink"
                >
                  carlo@meetselect.com
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
