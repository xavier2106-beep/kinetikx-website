import SectionHeader from "@/components/ui/SectionHeader";

const LANES = [
  {
    title: "CORPORATE INNOVATION",
    body: "We build new revenue lines inside incumbents. Discrete team, separate P&L, our tech stack and operator bench, your distribution. Companies allocating 20% of growth capital to new-venture building outpace peers by two percentage points of revenue growth a year.",
  },
  {
    title: "STUDIOS",
    body: "We co-found from day zero. Five ventures in Journey•One, every one with a partner sitting in an operating chair. Capital, conviction, GCC corporate relationships, and an operator bench that has built and exited before.",
  },
  {
    title: "VENTURE GATEWAY",
    body: "We are the GCC entry point for tested ventures. Assessment, regulatory path, corporate buyer warm-introduced. Not an accelerator. Not a consultancy. A studio with skin in the game and a balance sheet behind every introduction.",
  },
];

function CircleIcon({ symbol }: { symbol: string }) {
  return (
    <div
      aria-hidden
      className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--kx-crimson)]/70 text-2xl text-[var(--kx-crimson)]"
    >
      {symbol}
    </div>
  );
}

const SYMBOLS = ["●", "◆", "▲"];

export default function Studio() {
  return (
    <section id="studio" className="w-full border-y border-white/10 bg-[#0e0e0e] py-24 sm:py-32">
      <SectionHeader
        eyebrow="The studio"
        title="Three lanes. One studio."
        lead={
          <>
            Build, partner, place, or compound. Same operators, same chair, same standard.
            <br />
            The lanes share a tech stack, an operator bench, and a way of working.
          </>
        }
      />

      <div className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-x-12 gap-y-12 px-6">
        {LANES.map((lane, i) => (
          <div key={lane.title} className="w-full max-w-xs text-center sm:w-64">
            <CircleIcon symbol={SYMBOLS[i]} />
            <h3 className="mb-3 font-heading text-base font-medium uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
              {lane.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/80">{lane.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
