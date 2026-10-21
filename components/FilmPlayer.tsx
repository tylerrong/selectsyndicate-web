"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type FilmPlayerProps = {
  className?: string;
  videoRef?: RefObject<HTMLVideoElement | null>;
  showCaption?: boolean;
};

export function FilmPlayer({
  className = "",
  videoRef: externalRef,
  showCaption = false,
}: FilmPlayerProps) {
  const internalRef = useRef<HTMLVideoElement>(null);
  const videoRef = externalRef ?? internalRef;
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const film = videoRef.current;
    if (!film) return;

    const sync = () => {
      setPaused(film.paused);
      setMuted(film.muted || film.volume === 0);
    };

    const onError = () => setError(true);

    film.addEventListener("play", sync);
    film.addEventListener("pause", sync);
    film.addEventListener("volumechange", sync);
    film.addEventListener("error", onError);
    sync();

    return () => {
      film.removeEventListener("play", sync);
      film.removeEventListener("pause", sync);
      film.removeEventListener("volumechange", sync);
      film.removeEventListener("error", onError);
    };
  }, [videoRef]);

  const togglePlay = async () => {
    const film = videoRef.current;
    if (!film) return;
    try {
      if (film.paused) await film.play();
      else film.pause();
    } catch {
      setError(true);
    }
  };

  const toggleSound = () => {
    const film = videoRef.current;
    if (!film) return;
    if (film.muted || film.volume === 0) {
      film.muted = false;
      if (film.volume === 0) film.volume = 1;
    } else {
      film.muted = true;
    }
  };

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#05080e] ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        poster="/assets/film-poster.jpg"
        aria-label="Select Syndicate brand film"
      >
        <source src="/assets/syndicate-film.mp4" type="video/mp4" />
      </video>

      {showCaption && paused && (
        <div
          className="pointer-events-none absolute inset-x-6 top-6 z-10 flex justify-between text-[10px] tracking-[2px] text-white drop-shadow md:inset-x-8 md:top-8"
          aria-hidden="true"
        >
          <span>THE NEXT CHAPTER</span>
          <span>00:47 ↗</span>
        </div>
      )}

      {paused && (
        <button
          type="button"
          className="absolute inset-0 z-10 m-auto grid h-[74px] w-[74px] place-content-center rounded-full border border-[#cbd9e299] bg-[rgba(18,30,44,0.4)] text-[17px] text-white backdrop-blur-md transition hover:scale-105 hover:bg-[rgba(141,173,211,0.3)]"
          aria-label="Play the Select Syndicate film"
          onClick={togglePlay}
        >
          <span className="pl-1" aria-hidden="true">
            ▶
          </span>
        </button>
      )}

      <button
        type="button"
        className="absolute top-[max(5.25rem,calc(env(safe-area-inset-top,0px)+4.25rem))] right-4 z-20 flex min-h-11 items-center gap-2 border border-[#cbd9e270] bg-[rgba(10,14,20,0.72)] px-3 py-2.5 text-[11px] text-white backdrop-blur-md transition hover:bg-[rgba(35,54,77,0.9)] md:top-auto md:right-6 md:bottom-16 md:px-3.5"
        aria-label={muted ? "Turn sound on" : "Mute sound"}
        aria-pressed={!muted}
        onClick={toggleSound}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="h-[17px] w-[17px]"
          aria-hidden="true"
        >
          <path d="M4 9h4l5-4v14l-5-4H4z" />
          {muted ? (
            <path d="m16 9 5 5m0-5-5 5" />
          ) : (
            <path d="M17 8a6 6 0 0 1 0 8" />
          )}
        </svg>
        <span className="hidden sm:inline">
          {muted ? "Turn sound on" : "Mute sound"}
        </span>
      </button>

      {error && (
        <p className="absolute bottom-4 left-4 z-20 text-xs text-muted" role="status">
          Playback could not start.{" "}
          <a href="/assets/syndicate-film.mp4" className="underline">
            Open the film directly
          </a>
          .
        </p>
      )}
    </div>
  );
}
