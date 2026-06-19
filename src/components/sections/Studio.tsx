import { Heart, Eye, Send } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

const LANES = [
  {
    title: "CORPORATE INNOVATION",
    body: "We build new revenue lines inside incumbents. Discrete team, separate P&L, our tech stack and operator bench, your distribution. Companies allocating 20% of growth capital to new-venture building outpace peers by two percentage points of revenue growth a year.",
    Icon: Heart,
  },
  {
    title: "STUDIOS",
    body: "We co-found from day zero. Five ventures in Journey•One, every one with a partner sitting in an operating chair. Capital, conviction, GCC corporate relationships, and an operator bench that has built and exited before.",
    Icon: Eye,
  },
  {
    title: "VENTURE GATEWAY",
    body: "We are the GCC entry point for tested ventures. Assessment, regulatory path, corporate buyer warm-introduced. Not an accelerator. Not a consultancy. A studio with skin in the game and a balance sheet behind every introduction.",
    Icon: Send,
  },
];

export default function Studio() {
  return (
    <section
      id="studio"
      className="relative w-full overflow-hidden border-y border-white/10 py-24 sm:py-32"
      style={{
        background:
          "radial-gradient(ellipse at top, #a4161a 0%, #5d0d10 38%, #1a0506 75%, #0a0a0a 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 75% 70%, rgba(0,0,0,0.4) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10">
        <Reveal>
          <SectionHeader
            eyebrow={<span className="text-black">The studio</span>}
            title="Three lanes. One studio."
            lead={
              <>
                Build, partner, place, or compound. Same operators, same chair, same standard.
                <br />
                The lanes share a tech stack, an operator bench, and a way of working.
              </>
            }
          />
        </Reveal>

        <div className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-x-12 gap-y-12 px-6">
          {LANES.map((lane, i) => (
            <Reveal key={lane.title} delay={i * 0.12}>
              <div className="group w-full max-w-xs text-center sm:w-64">
                <div
                  aria-hidden
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-black/30 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-black/50"
                >
                  <lane.Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 font-heading text-base font-medium uppercase tracking-[0.15em] text-white">
                  {lane.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/90">{lane.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
