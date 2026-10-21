import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer id="site-footer" className="surface-light">
      <div className="wrap pb-[max(2rem,env(safe-area-inset-bottom,0px)+1rem)] pt-12 md:pb-[30px] md:pt-[72px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Brand size="sm" tone="light" />
          <a
            href="#main"
            className="min-h-11 inline-flex items-center text-[10px] tracking-[1.2px] text-muted-dim transition hover:text-ink"
          >
            Back to top ↑
          </a>
        </div>

        <p className="mt-8 max-w-[1110px] text-[10px] leading-[1.9] text-muted-dim md:mt-[33px]">
          This website is an informational design draft, not an offer to sell or
          a solicitation to buy securities. Any offering will be made solely
          through its definitive offering documents and only to eligible
          investors. Investments in private companies are speculative, illiquid,
          and involve risk of loss. Company names and logos belong to their
          respective owners; their inclusion does not imply endorsement.
          Portfolio examples do not represent all investments or currently
          available opportunities.
        </p>

        <div className="mt-7 flex flex-wrap justify-between gap-5 border-t border-line pt-[22px] text-[9px] text-muted-dim md:mt-[29px]">
          <span>© 2026 Select Syndicate.</span>
          <span className="order-3 basis-full tracking-[1.2px] sm:order-none sm:basis-auto">
            Design preview · Not for distribution
          </span>
          <a href="#main" className="hover:text-ink">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
