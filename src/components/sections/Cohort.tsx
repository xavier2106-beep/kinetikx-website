"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type Venture = {
  name: string;
  eyebrow: string;
  summary: string;
  market: string;
  stage: string;
  accent: string;
};

// XGL msg 6461-6462 · Two cohorts. Journey ONE is the current set (5
// stage-0 ventures). Journey TWO is queued up behind a red arrow —
// same design + colour scheme reused so the whole strip reads as one
// unified family. Taglines / market / stage will land later.
const JOURNEY_ONE: Venture[] = [
  {
    name: "FIN•WEL",
    eyebrow: "THE UPLIFTER",
    summary:
      "Embedded financial wellness for GCC employees, delivered through the employer. The retention engine inside the org chart.",
    market: "$2B Embedded Finance + $1.9T GCC Lending",
    stage: "Stage 0 / MVP",
    accent: "linear-gradient(135deg, #1a3a5c 0%, #0a0a0a 100%)",
  },
  {
    name: "N•Y•S•M",
    eyebrow: "THE REVEALER",
    summary:
      "Video résumés that read as authentic and ship as professional. Script, record, reveal.",
    market: "$4B+ HR Tech / Hiring",
    stage: "Stage 0 / MVP",
    accent: "linear-gradient(135deg, #4a1a3a 0%, #0a0a0a 100%)",
  },
  {
    name: "TCHIP•IN",
    eyebrow: "THE GIFTER",
    summary:
      "Crowd gifting for the GCC. The whole circle chips in for the moments that matter.",
    market: "$30B+ Gifting / Social Commerce",
    stage: "Stage 0 / MVP",
    accent: "linear-gradient(135deg, #5c4a1a 0%, #0a0a0a 100%)",
  },
  {
    name: "STAR•DUST",
    eyebrow: "THE PASSIONATE",
    summary:
      "Fractional ownership of celebrity-owned real-world assets. Fan capital, professionally structured.",
    market: "$1T+ Fan Economy + Alternative Assets",
    stage: "Stage 0 / MVP",
    accent: "linear-gradient(135deg, #4a2a1a 0%, #0a0a0a 100%)",
  },
  {
    name: "PETS•NATION",
    eyebrow: "THE CARETAKER",
    summary:
      "Pet care for the GCC, end-to-end. One app for every need your animal has.",
    market: "$2B+ GCC Pet Economy",
    stage: "Stage 0 / MVP",
    accent: "linear-gradient(135deg, #2a3a1a 0%, #0a0a0a 100%)",
  },
];

const JOURNEY_TWO: Venture[] = [
  {
    name: "LIQUID SPACE",
    eyebrow: "A DRINK OUT OF THIS WORLD",
    summary: "",
    market: "",
    stage: "Stage 0",
    accent: "linear-gradient(135deg, #1a3a5c 0%, #0a0a0a 100%)",
  },
  {
    name: "DEUCE",
    eyebrow: "YOUR ADVANTAGE",
    summary: "",
    market: "",
    stage: "Stage 0",
    accent: "linear-gradient(135deg, #4a1a3a 0%, #0a0a0a 100%)",
  },
  {
    name: "HERAKLYS",
    eyebrow: "THE BACKBONE OF SPORTS VENUES",
    summary: "",
    market: "",
    stage: "Stage 0",
    accent: "linear-gradient(135deg, #5c4a1a 0%, #0a0a0a 100%)",
  },
  {
    name: "AOSX",
    eyebrow: "EXECUTIVE TEAM IN A BOX",
    summary: "",
    market: "",
    stage: "Stage 0",
    accent: "linear-gradient(135deg, #4a2a1a 0%, #0a0a0a 100%)",
  },
  {
    name: "FALCON",
    eyebrow: "NEXTGEN OF FAN OWNERSHIP",
    summary: "",
    market: "",
    stage: "Stage 0",
    accent: "linear-gradient(135deg, #2a3a1a 0%, #0a0a0a 100%)",
  },
];

function VentureCard({ v, i }: { v: Venture; i: number }) {
  const hasBack = v.summary.trim().length > 0 || v.market.trim().length > 0;
  return (
    <Reveal delay={i * 0.08}>
      <article className="group relative overflow-hidden bg-[#1a1a1a] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1">
        <div
          className="relative aspect-[3/4] overflow-hidden"
          style={{ background: v.accent }}
        >
          {/* Default front face: large name */}
          <div
            className={`absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 ${hasBack ? "group-hover:opacity-0" : ""}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
              {v.eyebrow || " "}
            </p>
            <h3 className="mt-2 font-heading text-3xl font-extralight text-white sm:text-4xl">
              {v.name}
            </h3>
          </div>

          {/* Hover face: only if there's content behind */}
          {hasBack && (
            <div className="absolute inset-0 flex flex-col justify-between bg-black/85 p-5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
                  {v.eyebrow}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-extralight text-white">
                  {v.name}
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-white/85">
                  {v.summary}
                </p>
              </div>
              <div className="font-mono text-[10px] tracking-wide text-white/55">
                <p>{v.market}</p>
                <p className="mt-1">{v.stage}</p>
              </div>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Cohort() {
  // 1 = JOURNEY·ONE (default), 2 = JOURNEY·TWO
  const [cohort, setCohort] = useState<1 | 2>(1);
  const list = cohort === 1 ? JOURNEY_ONE : JOURNEY_TWO;
  const direction = cohort === 1 ? -1 : 1;

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
            other four. Shared tech stack. Complementary segments. Cross-fertilising
            distribution.{" "}
            <strong className="text-[#1a1a1a]">
              The cohort is the asset. The dragons are what come out of it.
            </strong>{" "}
            Underwrite one and you&rsquo;re underwriting all five — by design.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 max-w-7xl overflow-hidden px-6">
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
              <VentureCard key={`${cohort}-${v.name}`} v={v} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Reveal delay={0.2}>
        <div className="mx-auto mt-16 flex max-w-3xl items-center justify-center gap-4 px-6">
          {cohort === 2 && (
            <button
              type="button"
              onClick={() => setCohort(1)}
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
              onClick={() => setCohort(2)}
              aria-label="Voir Journey Two"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--kx-crimson)]/40 text-[var(--kx-crimson)] transition hover:border-[var(--kx-crimson)] hover:bg-[var(--kx-crimson)]/10"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
