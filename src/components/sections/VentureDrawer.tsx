"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { VentureDetail } from "@/data/ventures";

// XGL msg 7042 (2026-09-03) · full-width drawer that opens downward when a
// swatch is clicked. 8 tabs, parallax background gradient, sticky tab nav.
// Pilot = HERAKLYS ; other ventures currently render a "coming soon" state.

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
  accent: string; // gradient CSS
  detail: VentureDetail | null;
  onClose: () => void;
};

export default function VentureDrawer({
  ventureName,
  ventureEyebrow,
  accent,
  detail,
  onClose,
}: Props) {
  const [tab, setTab] = useState<string>("description");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Parallax: background gradient translates at 0.3x scroll speed inside
  // the drawer, giving a subtle depth cue as the user reads through.
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        height: { duration: 0.55, ease: [0.32, 0.72, 0, 1] },
        opacity: { duration: 0.35 },
      }}
      className="relative w-full overflow-hidden"
    >
      {/* Parallax gradient backdrop — venture accent colour */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[140%] w-full"
        style={{ background: accent, y: bgY }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
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
            className="sticky top-0 z-20 -mx-6 border-b border-white/15 bg-black/40 px-6 py-3 backdrop-blur-md"
          >
            <div className="flex gap-1 overflow-x-auto scrollbar-none">
              {TABS.map((t) => {
                const active = t.key === tab;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition ${
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

          {/* Tab content — fade + Y translate transitions */}
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              {!detail ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg border border-white/15 bg-white/5 p-8 text-center text-sm text-white/70"
                >
                  Detailed content for <strong>{ventureName}</strong> is coming
                  soon. HERAKLYS is currently the pilot showcase for this
                  drawer — click it to see the full 8-tab layout.
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
                      src={detail.conceptDiagramSrc}
                      caption={detail.conceptDiagramCaption}
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
}: {
  src?: string;
  caption?: string;
}) {
  if (!src) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-white/25 bg-white/5 p-8 text-center">
        <p className="text-sm text-white/70">
          Concept diagram — image forthcoming.
        </p>
        {caption ? (
          <p className="mt-3 max-w-lg text-xs text-white/50">{caption}</p>
        ) : null}
      </div>
    );
  }
  return (
    <figure className="mx-auto max-w-5xl">
      <img
        src={src}
        alt={caption ?? "Concept diagram"}
        className="w-full rounded-lg border border-white/15 shadow-2xl"
      />
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
