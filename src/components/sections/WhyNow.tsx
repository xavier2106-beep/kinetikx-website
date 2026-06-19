import SectionHeader from "@/components/ui/SectionHeader";

export default function WhyNow() {
  return (
    <section id="why-now" className="w-full border-y border-white/10 bg-black py-24 sm:py-32">
      <SectionHeader
        eyebrow="THE WINDOW"
        title="Why now."
        lead="Two shifts have stacked in the same window. Capital is rotating into operator-led studios because the math has stopped being theoretical. GCC regulators have built the legal runway for venture-building because the region is no longer importing growth — it&rsquo;s building it. Both moved together. We&rsquo;re inside it."
      />

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 sm:gap-8">
        <div className="border-l-2 border-[var(--kx-crimson)] pl-6">
          <h3 className="mb-4 font-heading text-xl font-medium tracking-wide text-[var(--kx-crimson)]">
            CAPITAL
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            Half of global CEOs now name new-venture building a top-three priority.
            Companies that allocate 20% of growth capital to it outpace their peers by two
            percentage points of revenue a year.<sup className="fn"><a href="/sources#1">¹</a></sup> The studio asset class is no longer being
            debated — industry benchmarks now show 60% average IRR and 5.8× TVPI for
            studio-built ventures, against a VC fund benchmark of roughly a third of that.<sup className="fn"><a href="/sources#2">²</a></sup> The LPs who needed proof now have it. The ones who didn&rsquo;t are already
            allocated.
          </p>
        </div>
        <div className="border-l-2 border-[var(--kx-crimson)] pl-6">
          <h3 className="mb-4 font-heading text-xl font-medium tracking-wide text-[var(--kx-crimson)]">
            REGULATORS
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            ADGM and DIFC have built operator-grade entity regimes — SPVs, holding
            companies, and the English common law contracting flexibility that SAFE-round
            mechanics rely on — the legal scaffolding studios need to run cleanly.
            Vision 2030 and We the UAE 2031 turned sovereign capital into a private-venture
            deployment engine. Saudisation and Emiratisation built structural demand for
            new venture creation that absorbs young national workforces. The runway is
            poured. The aircraft is parked at the gate.
          </p>
        </div>
      </div>
    </section>
  );
}
