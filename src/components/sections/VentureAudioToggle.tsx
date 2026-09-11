"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { ensureUnlockListener, isMuted, onMuteChange, setMuted } from "@/lib/venture-audio";

// XGL msg 7317-7324 (Lucy brief 2026-09-10) : the venture audio mute
// toggle. Fixed bottom-right, only rendered on the swatch pages (Home
// via Cohort). Persisted in localStorage — a user who silenced once
// keeps it silenced across sessions.

export default function VentureAudioToggle() {
  const [muted, setMutedLocal] = useState(false);

  useEffect(() => {
    // Hydration read : the singleton pre-read the persisted value at
    // module init ; we sync the local state to it.
    setMutedLocal(isMuted());
    ensureUnlockListener();
    const unsub = onMuteChange(setMutedLocal);
    return () => unsub();
  }, []);

  const label = muted ? "Activer le son" : "Couper le son";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setMuted(!muted)}
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur transition hover:bg-black/85 sm:h-12 sm:w-12"
    >
      {muted ? <VolumeX size={18} strokeWidth={1.8} /> : <Volume2 size={18} strokeWidth={1.8} />}
    </button>
  );
}
