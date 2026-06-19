import SectionHeader from "@/components/ui/SectionHeader";

const VENTURES = [
  {
    name: "FIN•WEL",
    eyebrow: "THE UPLIFTER",
    summary:
      "Embedded financial wellness for GCC employees, delivered through the employer. The retention engine inside the org chart.",
    market: "$2B Embedded Finance + $1.9T GCC Lending",
    stage: "Stage 0 / MVP",
  },
  {
    name: "N•Y•S•M",
    eyebrow: "THE REVEALER",
    summary:
      "Video résumés that read as authentic and ship as professional. Script, record, reveal.",
    market: "$4B+ HR Tech / Hiring",
    stage: "Stage 0 / MVP",
  },
  {
    name: "TCHIP•IN",
    eyebrow: "THE GIFTER",
    summary:
      "Crowd gifting for the GCC. The whole circle chips in for the moments that matter.",
    market: "$30B+ Gifting / Social Commerce",
    stage: "Stage 0 / MVP",
  },
  {
    name: "STAR•DUST",
    eyebrow: "THE PASSIONATE",
    summary:
      "Fractional ownership of celebrity-owned real-world assets. Fan capital, professionally structured.",
    market: "$1T+ Fan Economy + Alternative Assets",
    stage: "Stage 0 / MVP",
  },
  {
    name: "PETS•NATION",
    eyebrow: "THE CARETAKER",
    summary:
      "Pet care for the GCC, end-to-end. One app for every need your animal has.",
    market: "$2B+ GCC Pet Economy",
    stage: "Stage 0 / MVP",
  },
];

export default function Cohort() {
  return (
    <section id="cohort" className="w-full bg-[#f5f1ea] py-24 sm:py-32 text-[#1a1a1a]">
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

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-5 px-6 sm:grid-cols-3 lg:grid-cols-5">
        {VENTURES.map((v) => (
          <article
            key={v.name}
            className="group relative flex flex-col overflow-hidden bg-[#1a1a1a] text-white"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-zinc-700 to-black p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
                {v.eyebrow}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-extralight text-white sm:text-3xl">
                {v.name}
              </h3>
              <div className="mt-3 text-xs leading-relaxed text-white/75">
                <p>{v.summary}</p>
              </div>
              <div className="mt-5 font-mono text-[10px] tracking-wide text-white/50">
                <p>{v.market}</p>
                <p className="mt-1">{v.stage}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-3xl px-6 text-center">
        <h4 className="font-heading text-xl font-light italic text-[#1a1a1a]/90">
          Journey•One
        </h4>
        <p className="mt-3 text-sm italic text-[#1a1a1a]/60">
          Five was the maximum number we could co-found seriously across thirty-six months
          without compromising the standard.
        </p>
      </div>
    </section>
  );
}
