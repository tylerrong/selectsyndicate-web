import Image from "next/image";

type BrandProps = {
  size?: "sm" | "md";
  className?: string;
  /** dark = white mark on dark UI; light = dark mark on light UI */
  tone?: "dark" | "light";
};

export function Brand({
  size = "md",
  className = "",
  tone = "dark",
}: BrandProps) {
  const width = size === "sm" ? 78 : 103;
  const onLight = tone === "light";

  return (
    <a
      href="#main"
      aria-label="Select Syndicate home"
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <Image
        src="/assets/select-wordmark.png"
        alt="Select"
        width={width}
        height={Math.round(width * 0.32)}
        className={`h-auto ${onLight ? "" : "brightness-0 invert"}`}
        style={{ width }}
        priority
      />
      <span
        className={
          size === "sm"
            ? `h-4 w-px ${onLight ? "bg-[#c5cad1]" : "bg-[#526071]"}`
            : `h-[25px] w-px ${onLight ? "bg-[#c5cad1]" : "bg-[#526071]"}`
        }
        aria-hidden="true"
      />
      <span
        className={
          size === "sm"
            ? `text-[11px] font-light tracking-[0.22em] ${
                onLight ? "text-[#5c6570]" : "text-muted"
              }`
            : `text-[15px] font-light tracking-[3px] ${
                onLight ? "text-[#5c6570]" : ""
              }`
        }
      >
        syndicate
      </span>
    </a>
  );
}
