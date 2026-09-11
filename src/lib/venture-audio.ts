// XGL msg 7317-7324 · Lucy brief (DM 2294+2296, 2026-09-10). Venture
// swatch hover-play manager.
//
// Behaviour:
//   • Hover a swatch → play the venture's EN voiceover from t=0.
//   • Mouse-out → stop (≤200 ms fade). Re-hover → restart from 0.
//   • Only one audio active at a time.
//   • AudioContext unlock on first user click anywhere on the page.
//   • Mute toggle (persisted in localStorage) suspends all playback.
//
// Assets live under public/audio/ventures/<slug>.mp3 so we're decoupled
// from Lucy's -draft → v1 rename cycle in Content-Kits.

const STORAGE_KEY = "kx-ventures-muted";
const FADE_OUT_MS = 180;
const AVAILABLE = new Set([
  "kinetikx-vs",
  "nysm",
  "heraklys",
  "liquid-space",
  "tchipin",
  "petsnation",
]);

type State = {
  unlocked: boolean;
  muted: boolean;
  el: HTMLAudioElement | null;
  gainRamp: number | null;
  playing: string | null;
  muteListeners: Set<(muted: boolean) => void>;
};

function readMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

const state: State = {
  unlocked: false,
  muted: readMuted(),
  el: null,
  gainRamp: null,
  playing: null,
  muteListeners: new Set(),
};

function persistMuted() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, state.muted ? "1" : "0");
  } catch {
    /* private-mode / quota — ignore */
  }
}

/** Attach a one-shot listener that flips `unlocked` on the first click.
 * Chrome/Safari require a user gesture before <audio>.play() succeeds.
 * We hook `pointerdown` capture on window so ANY interaction primes us. */
export function ensureUnlockListener() {
  if (typeof window === "undefined" || state.unlocked) return;
  const handler = () => {
    state.unlocked = true;
    window.removeEventListener("pointerdown", handler, true);
  };
  window.addEventListener("pointerdown", handler, true);
}

function getEl(): HTMLAudioElement {
  if (state.el) return state.el;
  const el = document.createElement("audio");
  el.preload = "metadata";
  el.crossOrigin = "anonymous";
  el.style.display = "none";
  document.body.appendChild(el);
  state.el = el;
  return el;
}

function clearFade() {
  if (state.gainRamp !== null) {
    window.clearInterval(state.gainRamp);
    state.gainRamp = null;
  }
}

function hardStop() {
  clearFade();
  const el = state.el;
  if (el) {
    el.pause();
    el.currentTime = 0;
    el.volume = 1;
  }
  state.playing = null;
}

/** Called on hover-enter. Aborts any running clip + starts the new one at
 * t=0. Silently no-op when muted, when the venture has no clip, or before
 * the user has clicked once. */
export function playVenture(slug: string) {
  if (typeof window === "undefined") return;
  if (state.muted || !state.unlocked) return;
  if (!AVAILABLE.has(slug)) return;

  hardStop();
  const el = getEl();
  const src = `/audio/ventures/${slug}.mp3`;
  if (el.src.endsWith(src)) {
    el.currentTime = 0;
  } else {
    el.src = src;
  }
  el.volume = 1;
  state.playing = slug;
  el.play().catch(() => {
    // Autoplay policy may still refuse (e.g. mouseenter without prior
    // pointerdown). Failing silently is the correct behaviour — the
    // toggle button + first-click unlock cover the recovery path.
    state.playing = null;
  });
}

/** Called on hover-leave. Fades to 0 over ≤200 ms, then pauses + rewinds
 * so the next re-hover starts from t=0. */
export function stopVenture(slug?: string) {
  if (typeof window === "undefined") return;
  if (slug && state.playing !== slug) return;
  const el = state.el;
  if (!el) return;

  clearFade();
  const start = el.volume;
  const steps = 8;
  const stepMs = FADE_OUT_MS / steps;
  let i = 0;
  state.gainRamp = window.setInterval(() => {
    i += 1;
    const v = Math.max(0, start * (1 - i / steps));
    el.volume = v;
    if (i >= steps) {
      hardStop();
    }
  }, stepMs);
}

/** Toggle mute. Persisted in localStorage. Fires listeners so the UI
 * button updates in step. */
export function setMuted(next: boolean) {
  state.muted = next;
  persistMuted();
  if (next) hardStop();
  state.muteListeners.forEach((fn) => fn(next));
}

export function isMuted(): boolean {
  return state.muted;
}

export function onMuteChange(cb: (muted: boolean) => void): () => void {
  state.muteListeners.add(cb);
  return () => {
    state.muteListeners.delete(cb);
  };
}

/** True iff this venture ships an audio file. Used to gate hover
 * handlers so unmapped ventures stay silent forever. */
export function hasAudio(slug: string): boolean {
  return AVAILABLE.has(slug);
}
