import SectionHeader from "@/components/ui/SectionHeader";

const STATS = [
  { value: "88%", label: "Studio-built ventures still operating after their first cycle." },
  { value: "60%", label: "Reach Series A. Roughly double the traditional rate." },
  { value: "84%", label: "Raise a SEED round. Traditional rate: 42%." },
];

export default function Thesis() {
  return (
    <section
      id="thesis"
      className="relative w-full overflow-hidden border-y border-white/10 py-24 sm:py-32"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.55)), url(/bg/bg-pale-dunes-bottom.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SectionHeader
        eyebrow={<><span className="text-white">The studio model</span> works.</>}
        title="The studio model works. We&rsquo;re using it to build dragons."
        lead="Three numbers settle the question of whether studios produce different outcomes than traditional founder paths."
      />

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 px-6 sm:grid-cols-3 sm:gap-6">
        {STATS.map((s) => (
          <div key={s.value} className="text-center">
            <div className="font-heading text-6xl font-extralight text-[var(--kx-crimson)] sm:text-7xl">
              {s.value}
            </div>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
