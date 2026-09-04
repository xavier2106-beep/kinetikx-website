"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import VentureDrawer from "@/components/sections/VentureDrawer";
import { VENTURE_DETAILS } from "@/data/ventures";

type Venture = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  accent: string;
  logoSrc?: string;
  // XGL msg 7117-7118 (2026-09-04) : 5-row labeled info block shown on
  // hover, same structure across all ventures. Placeholder values until
  // XGL drops the real numbers per venture.
  sector?: string;
  segment?: string;
  marketSize?: string;
  model?: string;
  stage?: string;
};

// Placeholder shared across all ventures — XGL will supply real values
// per venture ; using consistent stand-ins so the hover fit reads clean
// on every swatch in the meantime. Format matches XGL msg 7119 style
// (comma-separated market size, "Tokens" plural, ampersand-joined segment).
const TBD_INFO = {
  segment: "B2B & B2C",
  marketSize: "GCC $XB, GLB $YB",
  model: "SaaS + Tokens",
  stage: "MVP Ready",
} as const;

// XGL msg 6461-6462 · Two cohorts. Journey ONE is the current set (5
// stage-0 ventures). Journey TWO is queued up behind a red arrow —
// same design + colour scheme reused so the whole strip reads as one
// unified family. Taglines / market / stage will land later.
// XGL msg 7039 (2026-09-03) · colour is now a BRAND attribute, not a
// slot attribute. Each venture in J1 pairs with one in J2 on the same
// colour (NYSM↔FinWel blue, Heraklys↔Falcon purple, Tchipin↔Stardust
// green, PetsNation↔AOSX brown, LiquidSpace↔Deuce yellow). Positions
// within each row are independent.
const COLOR = {
  blue:   "linear-gradient(135deg, #1a3a5c 0%, #0a0a0a 100%)",
  purple: "linear-gradient(135deg, #4a1a3a 0%, #0a0a0a 100%)",
  green:  "linear-gradient(135deg, #1a4a2a 0%, #0a0a0a 100%)",
  brown:  "linear-gradient(135deg, #4a2a1a 0%, #0a0a0a 100%)",
  yellow: "linear-gradient(135deg, #6a5010 0%, #0a0a0a 100%)",
} as const;

const JOURNEY_ONE: Venture[] = [
  {
    slug: "nysm",
    name: "N•Y•S•M",
    eyebrow: "THE REVEALER",
    summary:
      "Video résumés that read as authentic and ship as professional. Script, record, reveal.",
    accent: COLOR.blue,
    logoSrc: "/images/ventures/nysm-symbol.svg",
    // XGL msg 7119 — real NYSM values, verbatim.
    sector: "HRtech",
    segment: "B2B & B2C",
    marketSize: "GCC $XB, GLB $YB",
    model: "SaaS + Tokens",
    stage: "MVP Ready",
  },
  {
    slug: "heraklys",
    name: "HERAKLYS",
    eyebrow: "THE BACKBONE OF SPORTS VENUES",
    summary: "",
    accent: COLOR.purple,
    logoSrc: "/images/ventures/heraklys-symbol.png",
    // XGL msg 7122 — real HERAKLYS values, verbatim.
    sector: "SportsTech",
    segment: "B2B",
    marketSize: "GCC $XB, US & CAN $ZB, GLB $YB",
    model: "License + Revenue Share",
    stage: "MVP Ready + Client in Production 12/26",
  },
  {
    slug: "tchipin",
    name: "TCHIP•IN",
    eyebrow: "THE GIFTER",
    summary:
      "Crowd gifting for the GCC. The whole circle chips in for the moments that matter.",
    accent: COLOR.green,
    sector: "SocialCommerce",
    ...TBD_INFO,
  },
  {
    slug: "petsnation",
    name: "PETS•NATION",
    eyebrow: "THE CARETAKER",
    summary:
      "Pet care for the GCC, end-to-end. One app for every need your animal has.",
    accent: COLOR.brown,
    sector: "PetTech",
    ...TBD_INFO,
  },
  {
    slug: "liquid-space",
    name: "LIQUID SPACE",
    eyebrow: "A DRINK OUT OF THIS WORLD",
    summary: "",
    accent: COLOR.yellow,
    sector: "F&B",
    ...TBD_INFO,
  },
];

const JOURNEY_TWO: Venture[] = [
  {
    slug: "finwel",
    name: "FIN•WEL",
    eyebrow: "THE UPLIFTER",
    summary:
      "Embedded financial wellness for GCC employees, delivered through the employer. The retention engine inside the org chart.",
    accent: COLOR.blue,
    sector: "FinTech",
    ...TBD_INFO,
  },
  {
    slug: "aosx",
    name: "AOSX",
    eyebrow: "EXECUTIVE TEAM IN A BOX",
    summary: "",
    accent: COLOR.brown,
    sector: "AI-Enterprise",
    ...TBD_INFO,
  },
  {
    slug: "stardust",
    name: "STAR•DUST",
    eyebrow: "THE PASSIONATE",
    summary:
      "Fractional ownership of celebrity-owned real-world assets. Fan capital, professionally structured.",
    accent: COLOR.green,
    sector: "FanEconomy",
    ...TBD_INFO,
  },
  {
    slug: "falcon",
    name: "FALCON",
    eyebrow: "NEXTGEN OF FAN OWNERSHIP",
    summary: "",
    accent: COLOR.purple,
    sector: "SportsCulture",
    ...TBD_INFO,
  },
  {
    slug: "deuce",
    name: "DEUCE",
    eyebrow: "YOUR ADVANTAGE",
    summary: "",
    accent: COLOR.yellow,
    sector: "SportsTech",
    ...TBD_INFO,
  },
];

function VentureCard({
  v,
  i,
  isOpen,
  onClick,
  onMouseEnter,
}: {
  v: Venture;
  i: number;
  isOpen: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
}) {
  const hasLogo = Boolean(v.logoSrc);
  // XGL msg 7117-7118 : same 5-row labeled info block across all cards.
  // Rows only render when a value is present, so early cohort placeholders
  // don't ship empty lines.
  const infoRows = [
    { label: "Sector", value: v.sector },
    { label: "Segment", value: v.segment },
    { label: "Market Size", value: v.marketSize },
    { label: "Model", value: v.model },
    { label: "Stage", value: v.stage },
  ].filter((r): r is { label: string; value: string } =>
    Boolean(r.value && r.value.trim())
  );
  const hasInfo = infoRows.length > 0;
  const hasHover = hasLogo || hasInfo;
  return (
    <Reveal delay={i * 0.08}>
      <motion.article
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        animate={
          isOpen
            ? { scale: 1.02, boxShadow: "0 12px 32px rgba(0,0,0,0.7)" }
            : { scale: 1, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }
        }
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className={`group relative cursor-pointer overflow-hidden bg-[#1a1a1a] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
          isOpen ? "ring-2 ring-white/70" : ""
        }`}
      >
        <div
          className="relative aspect-[3/4] overflow-hidden"
          style={{ background: v.accent }}
        >
          {/* Default front face: eyebrow + large name at bottom. Fades
              out on hover when there's a reveal treatment underneath. */}
          <div
            className={`absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 ${hasHover ? "group-hover:opacity-0" : ""}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
              {v.eyebrow || " "}
            </p>
            <h3 className="mt-2 font-heading text-3xl font-extralight text-white sm:text-4xl">
              {v.name}
            </h3>
          </div>

          {/* Hover face — unified overlay (XGL msg 7117-7118) : logo
              (or fallback headline) top-half + 5-row labeled info block
              bottom. Same 5-row schema across all cards so ventures read
              as a family ; per-row render is guarded so empty values
              don't ship as blank lines. */}
          {hasHover && (
            <div className="pointer-events-none absolute inset-0 flex flex-col bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover:opacity-100">
              <div className="flex flex-1 items-center justify-center px-6 pb-2 pt-6">
                {hasLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={v.logoSrc}
                    alt={`${v.name} symbol`}
                    className="max-h-full max-w-[65%] object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
                      {v.eyebrow}
                    </p>
                    <h3 className="mt-2 font-heading text-3xl font-extralight text-white">
                      {v.name}
                    </h3>
                  </div>
                )}
              </div>

              {hasInfo && (
                <dl className="space-y-1 px-4 pb-4 font-mono text-[10px] leading-tight text-white/90">
                  {infoRows.map((r) => (
                    <div key={r.label} className="flex items-baseline gap-2">
                      <dt className="min-w-[76px] uppercase tracking-[0.08em] text-white/50">
                        {r.label}
                      </dt>
                      <dd className="flex-1 text-white/95">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Cohort() {
  // 1 = JOURNEY·ONE (default), 2 = JOURNEY·TWO
  const [cohort, setCohort] = useState<1 | 2>(1);
  // Slug of the currently expanded venture ; null = drawer closed.
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const list = cohort === 1 ? JOURNEY_ONE : JOURNEY_TWO;
  const direction = cohort === 1 ? -1 : 1;

  // Close the drawer whenever the user swaps journeys (open venture may
  // no longer be visible in the new list) — feels clean, avoids stale UI.
  const swapCohort = (target: 1 | 2) => {
    setOpenSlug(null);
    setCohort(target);
  };

  const openVenture = openSlug ? list.find((v) => v.slug === openSlug) : null;
  const openDetail = openSlug ? VENTURE_DETAILS[openSlug] ?? null : null;

  return (
    <section id="cohort" className="w-full bg-[#f5f1ea] py-24 sm:py-32 text-[#1a1a1a]">
      <Reveal>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-3xl font-light leading-tight sm:text-5xl">
            One Thesis. One Cohort. One Journey.
          </h2>
          <p className="mt-3 text-sm uppercase tracking-[0.35em] text-[var(--kx-crimson)] sm:text-base">
            Five Ventures
          </p>
          <p className="mt-5 text-base leading-relaxed text-[#1a1a1a]/70 sm:text-lg">
            Each venture was chosen for market timing, founder strength, and fit with the
            audiences of other four to optimize marketing &amp; communication
            potential. Shared tech stack. Complementary segments. Cross-fertilising
            distribution.{" "}
            <strong className="text-[#1a1a1a]">
              The cohort is the asset. The dragons are what come out of it.
            </strong>{" "}
            Underwrite one and you&rsquo;re underwriting all five — by design.
          </p>
        </div>
      </Reveal>

      {/* XGL msg 7111 (2026-09-04) : JOURNEY title + navigation arrows
          moved ABOVE the swatches — makes the current cohort context read
          first, before the eye lands on the cards. */}
      <Reveal delay={0.15}>
        <div className="mx-auto mt-12 flex max-w-3xl items-center justify-center gap-4 px-6">
          {cohort === 2 && (
            <button
              type="button"
              onClick={() => swapCohort(1)}
              aria-label="Voir Journey One"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--kx-crimson)]/40 text-[var(--kx-crimson)] transition hover:border-[var(--kx-crimson)] hover:bg-[var(--kx-crimson)]/10"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
          )}

          <h4 className="font-heading text-3xl font-light uppercase tracking-[0.25em] sm:text-4xl">
            <span className="text-[#1a1a1a]">JOURNEY</span>
            <span className="text-[var(--kx-crimson)]">&middot;{cohort === 1 ? "ONE" : "TWO"}</span>
          </h4>

          {cohort === 1 && (
            <button
              type="button"
              onClick={() => swapCohort(2)}
              aria-label="Voir Journey Two"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--kx-crimson)]/40 text-[var(--kx-crimson)] transition hover:border-[var(--kx-crimson)] hover:bg-[var(--kx-crimson)]/10"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </Reveal>

      <div className="mx-auto mt-8 max-w-7xl overflow-hidden px-6">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={cohort}
            custom={direction}
            initial={{ x: cohort === 2 ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: cohort === 2 ? "-100%" : "100%", opacity: 0 }}
            transition={{ x: { duration: 0.55, ease: [0.32, 0.72, 0, 1] }, opacity: { duration: 0.35 } }}
            className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
          >
            {list.map((v, i) => (
              <VentureCard
                key={`${cohort}-${v.name}`}
                v={v}
                i={i}
                isOpen={openSlug === v.slug}
                onClick={() =>
                  setOpenSlug((prev) => (prev === v.slug ? null : v.slug))
                }
                // XGL msg 7108 (2026-09-04) : hovering another swatch while
                // a drawer is open closes it — feels natural, avoids
                // click-close-then-click-other two-step.
                onMouseEnter={() => {
                  if (openSlug && openSlug !== v.slug) setOpenSlug(null);
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full-width venture detail drawer — opens below the card grid */}
      <AnimatePresence>
        {openVenture ? (
          <VentureDrawer
            key={openVenture.slug}
            ventureName={openVenture.name}
            ventureEyebrow={openVenture.eyebrow || "STAGE 0"}
            accent={openVenture.accent}
            detail={openDetail}
            onClose={() => setOpenSlug(null)}
          />
        ) : null}
      </AnimatePresence>

    </section>
  );
}
