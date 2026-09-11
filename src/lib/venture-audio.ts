// XGL msg 7317-7326 · Lucy brief. Venture drawer voiceover manager.
//
// Behaviour (final spec msg 7325) :
//   • Drawer OPEN → play the venture's EN voiceover from t=0, once. It
//     runs while the user browses tabs and completes even if the tab
//     scrolls off-screen.
//   • Drawer CLOSE → hard stop the voiceover.
//   • Drawer contains a video WITH audio → suspend voiceover ; when
//     that video pauses / ends, resume voiceover from where it stopped.
//   • Video without audio → voiceover keeps playing.
//   • Voiceover ends while drawer still open → surface a Play button
//     next to the venture title so the user can replay it.
//   • Mute toggle bottom-right of Cohort — persisted in localStorage.
//
// Assets under public/audio/ventures/<slug>.mp3, decoupled from Lucy's
// -draft → v1 rename cycle in Content-Kits.

const STORAGE_KEY = "kx-ventures-muted";
const AVAILABLE = new Set([
  "kinetikx-vs",
  "nysm",
  "heraklys",
  "liquid-space",
  "tchipin",
  "petsnation",
]);

type Listener<T> = (value: T) => void;

type State = {
  unlocked: boolean;
  muted: boolean;
  el: HTMLAudioElement | null;
  playing: string | null; // slug currently loaded ; may be paused
  suspendedByVideo: boolean; // true = video-with-audio pre-empted us
  ended: boolean; // true once the current clip has finished
  muteListeners: Set<Listener<boolean>>;
  endedListeners: Set<Listener<{ slug: string }>>;
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
  playing: null,
  suspendedByVideo: false,
  ended: false,
  muteListeners: new Set(),
  endedListeners: new Set(),
};

function persistMuted() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, state.muted ? "1" : "0");
  } catch {
    /* private-mode / quota — silent */
  }
}

/** Attach a global first-gesture listener so Chrome/Safari's autoplay
 * gate lets us play on subsequent programmatic .play() calls. */
export function ensureUnlockListener() {
  if (typeof window === "undefined" || state.unlocked) return;
  const handler = () => {
    state.unlocked = true;
    window.removeEventListener("pointerdown", handler, true);
    window.removeEventListener("keydown", handler, true);
  };
  window.addEventListener("pointerdown", handler, true);
  window.addEventListener("keydown", handler, true);
}

function getEl(): HTMLAudioElement {
  if (state.el) return state.el;
  const el = document.createElement("audio");
  el.preload = "metadata";
  el.crossOrigin = "anonymous";
  el.style.display = "none";
  el.addEventListener("ended", () => {
    const slug = state.playing;
    state.ended = true;
    if (slug) {
      state.endedListeners.forEach((fn) => fn({ slug }));
    }
  });
  document.body.appendChild(el);
  state.el = el;
  return el;
}

function hardStop() {
  const el = state.el;
  if (el) {
    el.pause();
    el.currentTime = 0;
    el.volume = 1;
  }
  state.playing = null;
  state.suspendedByVideo = false;
  state.ended = false;
}

/** Start a venture voiceover from t=0. Called by VentureDrawer when it
 * mounts and by the in-drawer Play button. Silent no-op when muted, when
 * the venture has no clip, or before the user has clicked once.
 *
 * XGL msg 7331 (2026-09-11 bug report) : on the very first click, the
 * voiceover started then paused within ~1s. Root cause = race between
 * setting el.src and calling el.play() while the media is still loading
 * — Chrome resolves the play() promise, starts playback for a beat, then
 * the load pipeline interrupts. Fix : wait for `canplay` before calling
 * play() when the src changes, so playback starts from a decoded frame. */
export function playVentureFromStart(slug: string) {
  if (typeof window === "undefined") return;
  if (state.muted || !state.unlocked) return;
  if (!AVAILABLE.has(slug)) return;

  const el = getEl();
  const src = `/audio/ventures/${slug}.mp3`;
  const sameSrc = el.src.endsWith(src);

  // Reset bookkeeping BEFORE touching the element so an in-flight `play`
  // callback (from a previous invocation) can no-op on the state.playing
  // check.
  state.playing = slug;
  state.ended = false;
  state.suspendedByVideo = false;
  el.volume = 1;

  const start = () => {
    if (state.playing !== slug) return; // superseded by another call
    try {
      el.currentTime = 0;
    } catch {
      /* NotAllowedError on unloaded element — ignore, canplay will retry */
    }
    el.play().catch(() => {
      // Autoplay policy may still refuse (rare after unlock) ; the
      // in-drawer Play button + mute toggle give the user recourse.
      state.playing = null;
    });
  };

  if (sameSrc && el.readyState >= 3 /* HAVE_FUTURE_DATA */) {
    // Cached from a previous play — restart in place, no reload.
    el.pause();
    start();
    return;
  }

  if (!sameSrc) el.src = src;
  el.load();
  const onReady = () => {
    el.removeEventListener("canplay", onReady);
    start();
  };
  el.addEventListener("canplay", onReady, { once: true });
}

/** Called on drawer close. Hard stop + reset — no fade, no resume. */
export function stopVenture() {
  hardStop();
}

/** Scoped stop : only pauses if THIS venture is still the owner.
 *
 * XGL msg 7336 · switching from swatch A to swatch B keeps A's drawer
 * alive during framer-motion's exit animation. When A finally unmounts,
 * its cleanup fires AFTER B has already claimed state.playing and
 * started its own audio. A bare stopVenture() would kill B's playback.
 *
 * Guarding by slug means : the drawer cleans up after itself only when
 * no newer drawer has taken over the singleton. */
export function stopVentureIfOwned(slug: string) {
  if (state.playing === slug) hardStop();
}

/** Called when a video-with-audio inside a drawer tab starts playing.
 * Pauses the voiceover but keeps its position so we can resume when the
 * video ends / pauses. No-op if voiceover isn't playing. */
export function suspendForVideo() {
  const el = state.el;
  if (!el || state.playing === null || el.paused) return;
  el.pause();
  state.suspendedByVideo = true;
}

/** Counterpart to suspendForVideo — called on video pause / ended. */
export function resumeFromVideoSuspend() {
  if (!state.suspendedByVideo) return;
  state.suspendedByVideo = false;
  const el = state.el;
  if (!el || state.playing === null || state.ended) return;
  el.play().catch(() => {
    /* autoplay refused — user can hit the in-drawer Play button */
  });
}

/** Mute toggle. Persisted. Fires listeners so the toggle button + drawer
 * Play button can react. */
export function setMuted(next: boolean) {
  state.muted = next;
  persistMuted();
  if (next) hardStop();
  state.muteListeners.forEach((fn) => fn(next));
}

export function isMuted(): boolean {
  return state.muted;
}

export function isEnded(): boolean {
  return state.ended;
}

export function onMuteChange(cb: Listener<boolean>): () => void {
  state.muteListeners.add(cb);
  return () => {
    state.muteListeners.delete(cb);
  };
}

export function onEnded(cb: Listener<{ slug: string }>): () => void {
  state.endedListeners.add(cb);
  return () => {
    state.endedListeners.delete(cb);
  };
}

/** True iff this venture ships an audio file. */
export function hasAudio(slug: string): boolean {
  return AVAILABLE.has(slug);
}
