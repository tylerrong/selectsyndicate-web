"use client";

import { FaqAccordion } from "../FaqAccordion";
import { Reveal } from "../Reveal";

export function Faq() {
  return (
    <section
      id="faq"
      className="surface-light py-[72px] md:py-[96px]"
      aria-labelledby="faq-heading"
    >
      <div className="wrap grid gap-10 md:grid-cols-2 md:gap-[110px]">
        <Reveal>
          <h2
            id="faq-heading"
            className="display text-[clamp(36px,4vw,56px)]"
          >
            FAQ
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <FaqAccordion />
        </Reveal>
      </div>
    </section>
  );
}
