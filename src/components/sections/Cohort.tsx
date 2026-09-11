"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import VentureDrawer from "@/components/sections/VentureDrawer";
import VentureAudioToggle from "@/components/sections/VentureAudioToggle";
import { VENTURE_DETAILS } from "@/data/ventures";

type Venture = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  accent: string;
  logoSrc?: string;
  // XGL msg 7147 (2026-09-04) : concept diagram overlay for the drawer's
  // Concept tab. Populated per Venture so ventures without a full
  // VentureDetail record can still ship their diagram — the drawer
  // prefers this prop over `detail.conceptDiagramSrc` when both exist.
  conceptDiagramSrc?: string;
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
    eyebrow: "THE BACKBONE OF PERFORMANCE",
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
    logoSrc: "/images/ventures/tchipin-symbol.png",
    conceptDiagramSrc: "/images/ventures/diagrams/tchipin.png",
    // XGL msg 7133 — real TCHIPIN values, verbatim.
    sector: "Fintech",
    segment: "B2C",
    marketSize: "GCC $XB, GLB $YB",
    model: "Trx Fee + Revenue Share",
    stage: "Build → MVP 12/26",
  },
  {
    slug: "petsnation",
    name: "PETS•NATION",
    eyebrow: "THE CARETAKER",
    summary:
      "Pet care for the GCC, end-to-end. One app for every need your animal has.",
    accent: COLOR.brown,
    logoSrc: "/images/ventures/petsnation-symbol.png",
    conceptDiagramSrc: "/images/ventures/diagrams/petsnation.png",
    // XGL msg 7135 — real PETSNATION values, verbatim.
    sector: "PetsTech, eCommerce",
    segment: "B2C",
    marketSize: "GCC $XB, GLB $YB",
    model: "Subscription + Revenue Share",
    stage: "Build → MVP Q127",
  },
  {
    slug: "liquid-space",
    name: "LIQUID SPACE",
    eyebrow: "A DRINK OUT OF THIS WORLD",
    summary: "",
    accent: COLOR.yellow,
    logoSrc: "/images/ventures/liquid-space-symbol.png",
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
    logoSrc: "/images/ventures/finwel-symbol.png",
    conceptDiagramSrc: "/images/ventures/diagrams/finwel.png",
    sector: "FinTech",
    ...TBD_INFO,
  },
  {
    slug: "aosx",
    name: "AOSX",
    eyebrow: "EXECUTIVE TEAM IN A BOX",
    summary: "",
    accent: COLOR.brown,
    logoSrc: "/images/ventures/aosx-symbol.png",
    // XGL msg 7141 — real AOSX values, verbatim.
    sector: "AI & Device",
    segment: "B2B & B2C",
    marketSize: "GCC $XB, US & CAN $ZB, GLB $YB",
    model: "Subscription + HW Margin",
    stage: "Build → MVP Q1-27",
  },
  {
    slug: "stardust",
    name: "STAR•DUST",
    eyebrow: "THE PASSIONATE",
    summary:
      "Fractional ownership of celebrity-owned real-world assets. Fan capital, professionally structured.",
    accent: COLOR.green,
    logoSrc: "/images/ventures/stardust-symbol.png",
    conceptDiagramSrc: "/images/ventures/diagrams/stardust.png",
    // XGL msg 7143 — real Stardust Capital values, verbatim.
    sector: "FinTech",
    segment: "B2C",
    marketSize: "GCC $XB, US & CAN $ZB, GLB $YB",
    model: "Trx Fee + Revenue Share",
    stage: "Validation & Regulatory Assessment",
  },
  {
    slug: "falcon",
    name: "FALCON",
    eyebrow: "NEXTGEN OF FAN OWNERSHIP",
    summary: "",
    accent: COLOR.purple,
    logoSrc: "/images/ventures/falcon-symbol.png",
    // XGL msg 7139 — real FALCON values, verbatim.
    sector: "EventsTech",
    segment: "B2B2C",
    marketSize: "GCC $XB, GLB $YB",
    model: "License + Revenue Share",
    stage: "Validation + 2x Anchor Clients pitch",
  },
  {
    slug: "deuce",
    name: "DEUCE",
    eyebrow: "YOUR ADVANTAGE",
    summary: "",
    accent: COLOR.yellow,
    logoSrc: "/images/ventures/deuce-symbol.png",
    // XGL msg 7137 — real DEUCE values, verbatim (Collection typo fixed).
    sector: "Fashion & Apparel",
    segment: "B2B2C & B2C",
    marketSize: "GCC $XB, US & CAN $ZB, GLB $YB",
    model: "Sales Margin",
    stage: "Validation + Collection V1",
  },
];

function VentureCard({
  v,
  i,
  isOpen,
  onClick,
}: {
  v: Venture;
  i: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  const hasLogo = Boolean(v.logoSrc);
  // XGL msg 7117-7118 + 7124 : same 5-row labeled info block across all
  // cards, fixed positions. Always render 5 rows so any missing value
  // reserves its slot ; empty ones show a nbsp so the block height stays
  // constant no matter what data lands. XGL will shorten strings to fit.
  const infoRows: Array<{ label: string; value: string }> = [
    { label: "Sector", value: v.sector ?? "" },
    { label: "Segment", value: v.segment ?? "" },
    { label: "Market", value: v.marketSize ?? "" },
    { label: "Model", value: v.model ?? "" },
    { label: "Stage", value: v.stage ?? "" },
  ];
  const hasInfo = infoRows.some((r) => r.value.trim().length > 0);
  const hasHover = hasLogo || hasInfo;
  // XGL msg 7325 revised spec : hover is silent — voiceover fires only
  // when the drawer opens (handled inside VentureDrawer), so the swatch
  // needs no audio wiring at all.
  return (
    <Reveal delay={i * 0.08}>
      <motion.article
        onClick={onClick}
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

          {/* Hover face — XGL msg 7124 v3 :
              • Top strip : eyebrow + name (small) — cross-fade with the
                large front-face copy so the identity reads as "moved
                from bottom to top", not "disappeared".
              • Middle : logo in a FIXED square container so every
                symbol renders at the same visual footprint regardless
                of source aspect ratio ; CSS filter forces white so
                coloured source SVGs/PNGs still ship as pure white.
              • Bottom : 5 fixed-height slots so no row ever pushes
                another down when text length varies (XGL will shorten
                strings that overflow). */}
          {hasHover && (
            <div className="pointer-events-none absolute inset-0 flex flex-col bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover:opacity-100">
              {/* Top identity strip */}
              <div className="shrink-0 px-4 pt-4">
                {/* XGL msg 7155 : eyebrow dropped on hover face ; still on the default card. */}
                <h3 className="font-heading text-lg font-extralight leading-tight text-white">
                  {v.name}
                </h3>
                {v.summary.trim() && (
                  <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-white/80">
                    {v.summary}
                  </p>
                )}
              </div>

              {/* Middle logo slot — fixed square container */}
              <div className="flex flex-1 items-center justify-center px-4 py-3">
                {hasLogo && (
                  <div className="flex aspect-square w-[46%] items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.logoSrc}
                      alt={`${v.name} symbol`}
                      className="h-full w-full object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                )}
              </div>

              {/* Bottom info block — fixed slots, one row per attribute */}
              <dl className="shrink-0 px-4 pb-4 font-mono text-[9px] leading-none text-white/90">
                {infoRows.map((r) => (
                  <div
                    key={r.label}
                    className="mt-1 flex h-[13px] items-baseline gap-1.5 overflow-hidden first:mt-0"
                  >
                    <dt className="w-[56px] shrink-0 uppercase tracking-[0.06em] text-white/50">
                      {r.label}
                    </dt>
                    <dd className="flex-1 truncate text-white/95">
                      {r.value || " "}
                    </dd>
                  </div>
                ))}
              </dl>
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

  // XGL msg 7213 (2026-09-09) : on ANY viewport (was mobile-only), on
  // swatch click, scroll the swatches row to sit near the top of the
  // viewport so swatches + drawer render in the same screen frame.
  // Offset ~80px accounts for the top nav bar. Target = swatches
  // container's top ; that pins the cohort strip while the drawer
  // opens below.
  const swatchesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!openSlug || typeof window === "undefined") return;
    const t = window.setTimeout(() => {
      const el = swatchesRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - 80;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }, 120);
    return () => window.clearTimeout(t);
  }, [openSlug]);

  return (
    <section id="cohort" className="w-full bg-[#f5f1ea] pb-5 pt-24 sm:pt-32 text-[#1a1a1a]">
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

      <div ref={swatchesRef} className="mx-auto mt-8 max-w-7xl overflow-hidden px-6">
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
                // XGL msg 7213 (2026-09-09) : hover-to-close removed —
                // it "annoyed". User must explicitly click another
                // swatch or the X to change drawer.
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
            ventureSlug={openVenture.slug}
            accent={openVenture.accent}
            detail={openDetail}
            // XGL msg 7147 — Venture-level diagram overrides the detail's
            // one, so ventures without a full VentureDetail record still
            // ship their concept image via the drawer.
            conceptDiagramSrcOverride={openVenture.conceptDiagramSrc}
            onClose={() => setOpenSlug(null)}
          />
        ) : null}
      </AnimatePresence>

      {/* XGL msg 7317-7324 (Lucy brief) : mute toggle only on pages with
          swatches — rendered inside Cohort so it doesn't clutter /our-team
          or /sources. Fixed-position, so it floats over the section. */}
      <VentureAudioToggle />

    </section>
  );
}
