"use client";

import { useEffect, useRef } from "react";

// XGL msg 7381 (2026-09-14) · Petsnation concept diagram = an MP4
// clip lifted from XGL's local render. Playback contract :
//   1. Autoplay the moment the drawer opens on the concept tab.
//   2. Slowed to 0.75× original speed.
//   3. On natural end, freeze on the last frame for 6 s.
//   4. Restart from t=0 and loop indefinitely.
// Muted so the drawer's video-with-audio observer doesn't collide
// with the voiceover.

const SRC = "/videos/ventures/petsnation.mp4";
const HOLD_MS = 6000;
const RATE = 0.75;

export default function PetsnationDiagram() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = RATE;
    let timer: ReturnType<typeof setTimeout> | null = null;
    v.play().catch(() => {
      /* autoplay blocked pre-gesture — will retry on next state change */
    });
    const onEnded = () => {
      timer = setTimeout(() => {
        try {
          v.currentTime = 0;
          v.playbackRate = RATE;
          v.play().catch(() => {});
        } catch {
          /* element torn down mid-hold */
        }
      }, HOLD_MS);
    };
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("ended", onEnded);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={SRC}
      muted
      playsInline
      preload="auto"
      className="h-full w-full object-cover"
    />
  );
}
