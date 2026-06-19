"use client";
import { useEffect, useState } from "react";

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "home",      label: "Home" },
  { id: "thesis",    label: "Thesis" },
  { id: "model",     label: "Model" },
  { id: "studio",    label: "Studio" },
  { id: "cohort",    label: "Cohort" },
  { id: "why-now",   label: "Why Now" },
  { id: "operators", label: "Operators" },
  { id: "math",      label: "Math" },
  { id: "contact",   label: "Contact" },
];

export default function SectionNav() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the visible section with highest ratio
        let best: { id: string; ratio: number } | null = null;
        for (const e of entries) {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.ratio)) {
            best = { id: e.target.id, ratio: e.intersectionRatio };
          }
        }
        if (best) setActive(best.id);
      },
      { threshold: [0.3, 0.6] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            className="group relative flex items-center justify-center"
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full border transition-all duration-200 ${
                isActive
                  ? "scale-125 border-[var(--kx-crimson)] bg-[var(--kx-crimson)]"
                  : "border-white/40 bg-transparent group-hover:border-white group-hover:bg-white/30"
              }`}
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-sm bg-black/80 px-2 py-1 text-xs uppercase tracking-[0.15em] text-white opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100">
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
