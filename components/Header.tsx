"use client";

import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { lightSections, nav } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 821px)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const nodes = lightSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (nodes.length === 0) return;

    const headerH = 64;

    const onScrollCheck = () => {
      let light = false;
      for (const el of nodes) {
        const r = el.getBoundingClientRect();
        if (r.top < headerH + 8 && r.bottom > headerH + 40) {
          light = true;
          break;
        }
      }
      setOnLight(light);
    };

    window.addEventListener("scroll", onScrollCheck, { passive: true });
    onScrollCheck();
    return () => window.removeEventListener("scroll", onScrollCheck);
  }, []);

  const solid = scrolled || open || onLight;

  const linkTone = onLight
    ? "text-[#5c6570] hover:text-[#0a0e14]"
    : "text-muted hover:text-ink";

  const ctaTone = onLight
    ? "text-[#0a0e14] hover:text-[#5c6570]"
    : "text-ink hover:text-muted";

  const dividerTone = onLight ? "bg-[#c5cad1]" : "bg-white/20";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background,backdrop-filter,border-color,color] duration-300 ${
        onLight
          ? solid
            ? "border-b border-[#d8dce2]/80 bg-[rgba(247,247,245,0.88)] text-[#0a0e14] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent text-[#0a0e14]"
          : solid
            ? "border-b border-white/[0.06] bg-[rgba(10,14,20,0.72)] text-[#f2f1eb] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent text-[#f2f1eb]"
      }`}
    >
      <div className="wrap flex h-14 items-center justify-between md:h-[72px]">
        <Brand size="sm" tone={onLight ? "light" : "dark"} />

        <button
          type="button"
          className={`flex min-h-11 min-w-11 items-center justify-end gap-3 py-2 pl-3 text-[11px] leading-none tracking-[0.12em] uppercase md:hidden ${
            onLight ? "text-[#5c6570]" : "text-muted"
          }`}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
          <span
            aria-hidden="true"
            className={`text-sm leading-none ${onLight ? "text-[#0a0e14]" : "text-ink"}`}
          >
            {open ? "−" : "+"}
          </span>
        </button>

        <nav
          id="navigation"
          aria-label="Main navigation"
          className={`${
            open
              ? onLight
                ? "absolute left-0 right-0 top-full flex max-h-[min(70svh,480px)] flex-col overflow-y-auto border-b border-[#d8dce2] bg-[rgba(247,247,245,0.98)] px-6 py-4 backdrop-blur-xl"
                : "absolute left-0 right-0 top-full flex max-h-[min(70svh,480px)] flex-col overflow-y-auto border-b border-white/[0.06] bg-[rgba(10,14,20,0.96)] px-6 py-4 backdrop-blur-xl"
              : "hidden"
          } md:static md:flex md:h-full md:max-h-none md:flex-row md:items-center md:gap-0 md:overflow-visible md:border-0 md:bg-transparent md:p-0`}
        >
          <div className="flex flex-col md:flex md:h-full md:flex-row md:items-center md:gap-5 lg:gap-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex min-h-11 items-center py-3.5 text-[13px] leading-none transition-colors md:h-full md:min-h-0 md:py-0 ${linkTone}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <span
            className={`my-3 block h-px w-full md:mx-7 md:my-0 md:block md:h-3.5 md:w-px lg:mx-8 ${
              open ? (onLight ? "bg-[#d8dce2]" : "bg-white/10") : `hidden md:block ${dividerTone}`
            }`}
            aria-hidden="true"
          />

          <a
            href="#connect"
            className={`inline-flex min-h-11 items-center gap-2 py-3.5 text-[13px] leading-none transition-colors md:h-full md:min-h-0 md:py-0 ${ctaTone}`}
            onClick={() => setOpen(false)}
          >
            Get in touch
            <span aria-hidden="true" className="text-[11px] leading-none opacity-70">
              ↗
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
