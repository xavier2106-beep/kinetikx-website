import Reveal from "@/components/ui/Reveal";

type Venture = {
  name: string;
  eyebrow: string;
  summary: string;
  market: string;
  stage: string;
  accent: string; // CSS color for the image-area gradient
};

const VENTURES: Venture[] = [
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

function VentureCard({ v, i }: { v: Venture; i: number }) {
  return (
    <Reveal delay={i * 0.08}>
      <article className="group relative overflow-hidden bg-[#1a1a1a] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1">
        <div
          className="relative aspect-[3/4] overflow-hidden"
          style={{ background: v.accent }}
        >
          {/* Default front face: large name */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 group-hover:opacity-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
              {v.eyebrow}
            </p>
            <h3 className="mt-2 font-heading text-3xl font-extralight text-white sm:text-4xl">
              {v.name}
            </h3>
          </div>

          {/* Hover face: full excerpt + market + stage */}
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
        </div>
      </article>
    </Reveal>
  );
}

export default function Cohort() {
  return (
    <section id="cohort" className="w-full bg-[#f5f1ea] py-24 sm:py-32 text-[#1a1a1a]">
      <Reveal>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--kx-crimson)]">
            <span className="font-medium text-[#1a1a1a]">Five</span> ventures.
          </p>
          <h2 className="font-heading text-3xl font-light leading-tight sm:text-5xl">
            One thesis. One cohort. One journey.
          </h2>
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

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-5 px-6 sm:grid-cols-3 lg:grid-cols-5">
        {VENTURES.map((v, i) => (
          <VentureCard key={v.name} v={v} i={i} />
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mx-auto mt-16 max-w-3xl px-6 text-center">
          <h4 className="font-heading text-3xl font-light uppercase tracking-[0.25em] text-[#1a1a1a] sm:text-4xl">
            JOURNEY&middot;ONE
          </h4>
        </div>
      </Reveal>
    </section>
  );
}
