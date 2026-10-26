"use client";

import { useEffect, useRef } from "react";

type IPhoneFrameProps = {
  src: string;
  poster: string;
  label?: string;
  className?: string;
  finish?: "dark" | "light";
};

/**
 * Realistic iPhone Pro frame. Dynamic Island comes from the recording —
 * no fake overlay.
 */
export function IPhoneFrame({
  src,
  poster,
  label = "Select Syndicate in the Select app",
  className = "",
  finish = "dark",
}: IPhoneFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const light = finish === "light";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`relative w-full ${className}`}
      role="img"
      aria-label={label}
    >
      {/* Soft contact shadow under the device */}
      <div
        className="pointer-events-none absolute -bottom-[6%] left-[8%] right-[8%] h-[12%] rounded-[100%] bg-black/35 blur-2xl"
        aria-hidden="true"
      />

      <div
        className="relative"
        style={{
          borderRadius: "2.85rem",
          padding: "0.5rem",
          background: light
            ? "linear-gradient(160deg, #f8f9fb 0%, #e2e5eb 50%, #c5c9d1 100%)"
            : "linear-gradient(160deg, #4a4e56 0%, #2a2d34 38%, #12141a 100%)",
          boxShadow: light
            ? [
                "0 40px 80px rgba(10,14,20,0.16)",
                "0 12px 28px rgba(10,14,20,0.1)",
                "inset 0 1px 0 rgba(255,255,255,0.85)",
                "inset 0 -1px 1px rgba(0,0,0,0.08)",
              ].join(", ")
            : [
                "0 40px 80px rgba(0,0,0,0.4)",
                "0 12px 28px rgba(0,0,0,0.28)",
                "inset 0 1px 0 rgba(255,255,255,0.18)",
                "inset 0 -1px 1px rgba(0,0,0,0.55)",
              ].join(", "),
          border: light
            ? "1px solid rgba(150,156,168,0.5)"
            : "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Side buttons */}
        <span
          aria-hidden="true"
          className="absolute top-[6.8rem] -left-[2.5px] h-6 w-[2.5px] rounded-l-sm"
          style={{ background: light ? "#9aa0aa" : "#3a3e46" }}
        />
        <span
          aria-hidden="true"
          className="absolute top-[9.8rem] -left-[2.5px] h-11 w-[2.5px] rounded-l-sm"
          style={{ background: light ? "#9aa0aa" : "#3a3e46" }}
        />
        <span
          aria-hidden="true"
          className="absolute top-[13.2rem] -left-[2.5px] h-11 w-[2.5px] rounded-l-sm"
          style={{ background: light ? "#9aa0aa" : "#3a3e46" }}
        />
        <span
          aria-hidden="true"
          className="absolute top-[10.8rem] -right-[2.5px] h-16 w-[2.5px] rounded-r-sm"
          style={{ background: light ? "#9aa0aa" : "#3a3e46" }}
        />

        <div
          className="relative overflow-hidden bg-black"
          style={{
            // Match the capture (780×1696) so object-cover doesn't skew sides
            aspectRatio: "780 / 1696",
            borderRadius: "2.4rem",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.35)",
          }}
        >
          {/* Mild center crop — trims recording chrome without shifting the bottom */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[center_14%]"
            style={{
              transform: "scale(1.04)",
              transformOrigin: "center center",
            }}
            src={src}
            poster={poster}
            muted
            playsInline
            loop
            preload="metadata"
            aria-label={label}
          />
        </div>
      </div>
    </div>
  );
}
