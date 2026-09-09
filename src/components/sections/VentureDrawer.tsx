"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { VentureDetail } from "@/data/ventures";

// XGL msg 7182-7185 (2026-09-07) · Rive runtime is lazy-loaded so the
// ~200 KB canvas engine only ships when a venture actually has a .riv
// diagram. ssr:false because @rive-app/react-canvas touches window.
const RiveDiagram = dynamic(() => import("./RiveDiagram"), { ssr: false });

// XGL msg 7206 (2026-09-07 nuit) · Rive abandonné (msg 7200-7204) au
// profit de framer-motion codé main. Registry per-slug : quand un
// venture a un composant custom, il override l'image PNG. Chaque
// diagramme est un chunk séparé (ssr:false suffit pour éviter le
// hydration mismatch quand l'anim démarre au mount).
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
              <h3 className="mt-2 font-heading text-4xl font-extralight sm:text-5xl">
                {ventureName}
              </h3>
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
  // .riv → Rive runtime (animated build-up), else static <img>.
  const isRive = src.toLowerCase().endsWith(".riv");
  return (
    <figure className="mx-auto max-w-2xl">
      <div className={FRAME_CLASSES + " flex items-center justify-center"}>
        {isRive ? (
          <RiveDiagram src={src} className="h-full w-full" />
        ) : (
          <img
            src={src}
            alt={caption ?? "Concept diagram"}
            className="h-full w-full object-contain"
          />
        )}
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
