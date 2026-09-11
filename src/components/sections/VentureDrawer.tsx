"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ExternalLink, Play } from "lucide-react";
import type { VentureDetail } from "@/data/ventures";
import {
  ensureUnlockListener,
  hasAudio,
  isEnded,
  isMuted,
  onEnded,
  onMuteChange,
  playVentureFromStart,
  resumeFromVideoSuspend,
  stopVentureIfOwned,
  suspendForVideo,
} from "@/lib/venture-audio";

// XGL msg 7284 (2026-09-10) · Rive dead-code excised — no .riv files
// exist in the data model (msg 7206 abandoned Rive for framer-motion),
// but the dynamic import kept @rive-app/react-canvas in a lazy chunk
// that got prefetched at hydration and its runtime init was the
// prime suspect for the permanent Chrome tab spinner. Diagram
// registry below stays.
const TchipinDiagram = dynamic(
  () => import("./diagrams/TchipinDiagram"),
  { ssr: false },
);
const DIAGRAM_COMPONENTS: Record<string, React.ComponentType> = {
  tchipin: TchipinDiagram,
};

// XGL msg 7042 (2026-09-03) · full-width drawer that opens downward when a
// swatch is clicked. 8 tabs, parallax background gradient, sticky tab nav.
// Pilot = HERAKLYS ; other ventures currently render a "coming soon" state.
//
// XGL msg 7104 (2026-09-04) · v2 layout fix : the swatch gradient is
// 135deg (top-left → bottom-right) which reads fine on a 3:4 card but
// concentrates the venture colour in one corner across a wide drawer,
// leaving the right/bottom near-black and killing text contrast. Fix:
// extract the venture's primary hex and render a vertical top-anchored
// wash so the colour reads consistently across the full width. Tab bar
// gets a solid dark backing so it stops floating.

// Extracts the first #rrggbb from a linear-gradient string so we can
// rebuild a top-anchored vertical wash inside the drawer.
function extractPrimaryColor(accent: string): string {
  const m = accent.match(/#[0-9a-fA-F]{6}/);
  return m?.[0] ?? "#1a1a1a";
}

type Tab = {
  key: string;
  label: string;
  short: string; // for narrow viewports
};

const TABS: Tab[] = [
  { key: "description", label: "Description", short: "About" },
  { key: "concept", label: "Concept diagram", short: "Concept" },
  { key: "market", label: "TAM · SAM · SOM", short: "Market" },
  { key: "uiux", label: "UI / UX + demo", short: "Demo" },
  { key: "model", label: "Business model", short: "Model" },
  { key: "gtm", label: "Go-to-market", short: "GTM" },
  { key: "numbers", label: "Key numbers", short: "Numbers" },
  { key: "team", label: "Founders & team", short: "Team" },
];

type Props = {
  ventureName: string;
  ventureEyebrow: string;
  ventureSlug: string;
  accent: string; // gradient CSS
  detail: VentureDetail | null;
  // XGL msg 7147 : Venture-level concept diagram, wins over detail's own.
  // Set on ventures that ship the diagram alone (no full VentureDetail).
  conceptDiagramSrcOverride?: string;
  onClose: () => void;
};

export default function VentureDrawer({
  ventureName,
  ventureEyebrow,
  ventureSlug,
  accent,
  detail,
  conceptDiagramSrcOverride,
  onClose,
}: Props) {
  const [tab, setTab] = useState<string>("description");
  const scrollRef = useRef<HTMLDivElement>(null);
  const primary = extractPrimaryColor(accent);

  // Parallax: background gradient translates at 0.2x scroll speed inside
  // the drawer, giving a subtle depth cue as the user reads through.
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // XGL msg 7325 · voiceover playback lifecycle. Fires once on mount from
  // t=0, hard-stops on unmount. Subscribes to the `ended` event so the
  // in-drawer replay button appears when the clip finishes.
  const [audioEnded, setAudioEnded] = useState(false);
  const ventureHasVoiceover = hasAudio(ventureSlug);
  useEffect(() => {
    if (!ventureHasVoiceover) return;
    ensureUnlockListener();
    setAudioEnded(isEnded() && !isMuted());
    playVentureFromStart(ventureSlug);
    const unsubEnded = onEnded(({ slug }) => {
      if (slug === ventureSlug) setAudioEnded(true);
    });
    const unsubMute = onMuteChange((muted) => {
      if (muted) setAudioEnded(false);
    });
    return () => {
      // Scoped stop — see venture-audio.ts. AnimatePresence keeps the
      // outgoing drawer mounted through its exit animation ; if we
      // unconditionally stopped here, the incoming drawer's audio (which
      // has already claimed state.playing) would be silenced.
      stopVentureIfOwned(ventureSlug);
      unsubEnded();
      unsubMute();
      setAudioEnded(false);
    };
  }, [ventureHasVoiceover, ventureSlug]);

  // XGL msg 7325 · video-in-drawer interception. Watch every <video>
  // element inside the drawer scroll container ; when one starts playing
  // WITH audio, suspend the voiceover ; resume on pause / ended.
  // Videos without an audio track (muted or no soundtrack) don't
  // interrupt — voiceover plays through them.
  useEffect(() => {
    if (!ventureHasVoiceover) return;
    const root = scrollRef.current;
    if (!root) return;

    type VideoLike = HTMLVideoElement & { mozHasAudio?: boolean; webkitAudioDecodedByteCount?: number };
    const hasAudioTrack = (v: VideoLike) => {
      if (v.muted) return false;
      // Modern Chrome/Safari: check the AudioTracks API when available.
      const tracks = (v as HTMLVideoElement & { audioTracks?: { length: number } }).audioTracks;
      if (tracks && typeof tracks.length === "number") return tracks.length > 0;
      // Firefox exposes mozHasAudio ; Safari has webkitAudioDecodedByteCount.
      if (typeof v.mozHasAudio === "boolean") return v.mozHasAudio;
      if (typeof v.webkitAudioDecodedByteCount === "number") return v.webkitAudioDecodedByteCount > 0;
      // Conservative default : assume audio present so we don't talk over it.
      return true;
    };

    const onPlay = (e: Event) => {
      const v = e.target as VideoLike;
      if (hasAudioTrack(v)) suspendForVideo();
    };
    const onPauseOrEnded = () => resumeFromVideoSuspend();

    const attach = (v: HTMLVideoElement) => {
      v.addEventListener("play", onPlay);
      v.addEventListener("pause", onPauseOrEnded);
      v.addEventListener("ended", onPauseOrEnded);
    };
    const detach = (v: HTMLVideoElement) => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPauseOrEnded);
      v.removeEventListener("ended", onPauseOrEnded);
    };

    root.querySelectorAll("video").forEach(attach);
    const mo = new MutationObserver((records) => {
      records.forEach((r) => {
        r.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n instanceof HTMLVideoElement) attach(n);
            n.querySelectorAll?.("video").forEach(attach);
          }
        });
        r.removedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n instanceof HTMLVideoElement) detach(n);
            n.querySelectorAll?.("video").forEach(detach);
          }
        });
      });
    });
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      root.querySelectorAll("video").forEach(detach);
    };
  }, [ventureHasVoiceover, tab]);

  const handleReplay = () => {
    if (!ventureHasVoiceover) return;
    setAudioEnded(false);
    playVentureFromStart(ventureSlug);
  };

  return (
    <motion.div
      // XGL msg 7108 (2026-09-04) · softer, stylish open/close.
      // Open : panel grows first with an easeOutExpo-ish curve, content
      // fades in 100ms later — feels like the drawer settles, then reveals.
      // Close : content fades out fast (200ms), then the panel folds up
      // smoothly — avoids the mechanical snap-shut of a single-track exit.
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: "auto",
        opacity: 1,
        transition: {
          height: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.55, delay: 0.12, ease: [0.4, 0, 0.2, 1] },
        },
      }}
      exit={{
        height: 0,
        opacity: 0,
        transition: {
          height: { duration: 0.6, delay: 0.1, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: 0.22, ease: [0.4, 0, 1, 1] },
        },
      }}
      className="relative mt-5 w-full overflow-hidden"
    >
      {/* Solid dark base — guarantees text-legible bg everywhere */}
      <div aria-hidden className="absolute inset-0 bg-[#0a0a0a]" />
      {/* Venture-colour wash: top-anchored vertical fade so the accent
          reads consistently across the whole width of the drawer, unlike
          the swatch's diagonal 135deg which would corner-concentrate. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[120%] w-full"
        style={{
          background: `linear-gradient(180deg, ${primary} 0%, ${primary} 25%, rgba(10,10,10,0.6) 70%, #0a0a0a 100%)`,
          y: bgY,
        }}
      />
      {/* Readability veil — mild darkening under body text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/45"
      />

      <div
        ref={scrollRef}
        className="relative z-10 max-h-[80vh] overflow-y-auto text-white"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:py-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex items-start justify-between gap-6"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
                {ventureEyebrow}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <h3 className="font-heading text-4xl font-extralight sm:text-5xl">
                  {ventureName}
                </h3>
                {/* XGL msg 7325 · replay button surfaces only after the
                    voiceover ends. Muted state hides it too (the user
                    opted out). */}
                {ventureHasVoiceover && audioEnded ? (
                  <button
                    type="button"
                    onClick={handleReplay}
                    aria-label="Rejouer le voice over"
                    title="Rejouer le voice over"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white/85 transition hover:border-white hover:bg-white/10"
                  >
                    <Play size={14} strokeWidth={1.8} />
                  </button>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le tiroir"
              className="mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </motion.div>

          {/* Tab nav — sticky at top of drawer scroll */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="sticky top-0 z-20 -mx-6 border-y border-white/15 bg-[#0a0a0a]/95 px-6 py-3 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
          >
            {/* XGL msg 7129 · mobile : 8 tabs won't fit one line, so
                switch to a 4-column grid = 4×2 rows using short labels.
                sm+ keeps the horizontal scroll-strip with long labels. */}
            <div className="grid grid-cols-4 gap-1.5 sm:flex sm:gap-1 sm:overflow-x-auto sm:scrollbar-none">
              {TABS.map((t) => {
                const active = t.key === tab;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key)}
                    className={`whitespace-nowrap rounded-full px-2 py-1.5 text-center text-[10px] uppercase tracking-[0.12em] transition sm:px-4 sm:text-xs sm:tracking-[0.15em] ${
                      active
                        ? "bg-white text-[#1a1a1a]"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="hidden sm:inline">{t.label}</span>
                    <span className="sm:hidden">{t.short}</span>
                  </button>
                );
              })}
            </div>
          </motion.nav>

          {/* Tab content — fixed height so switching tabs never resizes
              the drawer frame (XGL msg 7213). Content that overflows
              scrolls INSIDE this container ; the drawer outer stays put. */}
          <div className="h-[560px] overflow-y-auto">
            <AnimatePresence mode="wait">
              {!detail ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="rounded-lg border border-white/15 bg-white/5 p-8 text-center text-sm text-white/70">
                    Detailed content for <strong>{ventureName}</strong> is coming
                    soon. HERAKLYS is currently the pilot showcase for this
                    drawer — click it to see the full 8-tab layout.
                  </div>
                  {/* XGL msg 7147 : if the venture ships a concept diagram
                      independently of a full detail record, render it below
                      the placeholder so the drawer still has visual payload. */}
                  {(DIAGRAM_COMPONENTS[ventureSlug] || conceptDiagramSrcOverride) && (
                    <ConceptTab
                      src={conceptDiagramSrcOverride}
                      ventureSlug={ventureSlug}
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab === "description" && (
                    <DescriptionTab paragraphs={detail.description} />
                  )}
                  {tab === "concept" && (
                    <ConceptTab
                      src={conceptDiagramSrcOverride ?? detail.conceptDiagramSrc}
                      caption={detail.conceptDiagramCaption}
                      ventureSlug={ventureSlug}
                    />
                  )}
                  {tab === "market" && <MarketTab market={detail.market} />}
                  {tab === "uiux" && <UiUxTab uiUx={detail.uiUx} />}
                  {tab === "model" && (
                    <TextTab paragraphs={detail.businessModel} />
                  )}
                  {tab === "gtm" && <TextTab paragraphs={detail.gtm} />}
                  {tab === "numbers" && (
                    <NumbersTab numbers={detail.keyNumbers} />
                  )}
                  {tab === "team" && <TeamTab team={detail.team} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---- Tab renderers -------------------------------------------------------

function DescriptionTab({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="prose prose-invert max-w-3xl space-y-4 text-[15px] leading-relaxed text-white/85">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function ConceptTab({
  src,
  caption,
  ventureSlug,
}: {
  src?: string;
  caption?: string;
  ventureSlug?: string;
}) {
  // XGL msg 7213 (2026-09-09) : absolute consistency across all
  // ventures + all tabs — fixed 16/9 frame at max-w-2xl. Any diagram
  // source (PNG, SVG, .riv, custom React) renders INSIDE this box.
  // No drawer reflow when switching between ventures with wildly
  // different image aspect ratios.
  const FRAME_CLASSES =
    "mx-auto aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-lg border border-white/15 bg-black/40 shadow-2xl";

  // XGL msg 7206 : per-slug custom framer-motion component wins over
  // src (PNG or .riv). Registry lives at the top of this file.
  const CustomDiagram = ventureSlug ? DIAGRAM_COMPONENTS[ventureSlug] : undefined;
  if (CustomDiagram) {
    return (
      <figure className="mx-auto max-w-2xl">
        <div className={FRAME_CLASSES}>
          <CustomDiagram />
        </div>
        {caption ? (
          <figcaption className="mt-3 text-center text-xs text-white/60">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (!src) {
    return (
      <figure className="mx-auto max-w-2xl">
        <div
          className={
            FRAME_CLASSES + " flex flex-col items-center justify-center p-8 text-center"
          }
        >
          <p className="text-sm text-white/70">
            Concept diagram — image forthcoming.
          </p>
          {caption ? (
            <p className="mt-3 max-w-lg text-xs text-white/50">{caption}</p>
          ) : null}
        </div>
      </figure>
    );
  }
  return (
    <figure className="mx-auto max-w-2xl">
      <div className={FRAME_CLASSES + " flex items-center justify-center"}>
        <img
          src={src}
          alt={caption ?? "Concept diagram"}
          className="h-full w-full object-contain"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-white/60">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function MarketTab({
  market,
}: {
  market: VentureDetail["market"];
}) {
  const tiers = [market.tam, market.sam, market.som];
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.label}
            className="rounded-lg border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--kx-crimson)]">
              {tier.label}
            </p>
            <p className="mt-2 font-heading text-3xl font-extralight text-white">
              {tier.amountLabel}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-5 text-[15px] leading-relaxed text-white/85">
        {tiers.map((tier) => (
          <div key={tier.label}>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
              {tier.label} — {tier.amountLabel}
            </p>
            <p className="mt-1">{tier.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UiUxTab({ uiUx }: { uiUx: VentureDetail["uiUx"] }) {
  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/85">
        {uiUx.paragraph}
      </p>
      {uiUx.demoUrl ? (
        <a
          href={uiUx.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm text-white transition hover:border-white hover:bg-white/10"
        >
          {uiUx.demoLabel ?? "Open demo"}
          <ExternalLink size={14} strokeWidth={1.5} />
        </a>
      ) : null}
      {uiUx.screenshots && uiUx.screenshots.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {uiUx.screenshots.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt={s.alt}
              className="w-full rounded-lg border border-white/15 shadow-lg"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TextTab({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-white/85">
      {paragraphs.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: renderBold(p) }} />
      ))}
    </div>
  );
}

// Minimal **bold** → <strong> renderer for the exec-summary paragraphs.
function renderBold(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function NumbersTab({
  numbers,
}: {
  numbers: VentureDetail["keyNumbers"];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {numbers.map((n, i) => (
        <div
          key={i}
          className="rounded-lg border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--kx-crimson)]">
            {n.label}
          </p>
          <p className="mt-2 font-heading text-2xl font-extralight text-white">
            {n.value}
          </p>
          {n.hint ? (
            <p className="mt-1 text-xs text-white/55">{n.hint}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function TeamTab({ team }: { team: VentureDetail["team"] }) {
  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/85">
        {team.intro}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {team.members.map((m, i) => (
          <li
            key={i}
            className="rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-sm"
          >
            <p className="font-heading text-lg text-white">{m.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
              {m.role}
            </p>
            {m.note ? (
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                {m.note}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
