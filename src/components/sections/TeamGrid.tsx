import Image from "next/image";
import { AGENTS, GRID, ZODIAC_SYMBOL } from "@/data/team";

function AgentCard({ agentKey, index }: { agentKey: string; index: number }) {
  if (agentKey === "EMPTY") {
    return <div aria-hidden className="invisible" />;
  }
  const a = AGENTS[agentKey];
  if (!a) return null;
  const lower = a.key.toLowerCase();
  const zodiac = ZODIAC_SYMBOL[a.zodiac] ?? "";
  // Stagger animation delays per index so cards don't flip in sync.
  const baseDelay = -(index * 0.7) % 12;

  return (
    <div
      className="group flex flex-col items-center text-center"
      title={`${a.nationality} · ${a.zodiac}`}
    >
      <div
        className="relative h-32 w-32 overflow-hidden rounded-full bg-[#1a1a1a] sm:h-36 sm:w-36"
        style={{ boxShadow: "0 0 0 2px rgba(164,22,26,0.4), 0 8px 24px rgba(0,0,0,0.5)" }}
      >
        {(["original", "pixar", "manga"] as const).map((slot, i) => (
          <Image
            key={slot}
            src={`/team/${lower}-${slot}.png`}
            alt=""
            fill
            sizes="160px"
            className="kx-avatar-img object-cover"
            style={{
              animationDelay: `${baseDelay - i * 4}s`,
            }}
          />
        ))}
      </div>
      <div className="mt-3 font-heading text-base font-medium leading-tight text-white">
        {a.fullName}{" "}
        <span
          className="ml-1 inline-flex items-center gap-1 align-middle text-[0.85em]"
          title={`${a.nationality} · ${a.zodiac}`}
          aria-label={`${a.nationality}, ${a.zodiac}`}
        >
          <span aria-hidden>{a.flag}</span>
          {zodiac && (
            <span
              aria-hidden
              className="kx-zodiac text-white/40"
              style={{ fontVariantEmoji: "text" }}
            >
              {zodiac}
            </span>
          )}
        </span>
      </div>
      <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--kx-crimson)]">
        {a.position}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {a.nationality} &middot; {a.zodiac}
      </div>
      <p className="mt-2 max-w-[15ch] text-xs italic leading-snug text-white/65 sm:max-w-[18ch]">
        &ldquo;{a.tagline}&rdquo;
      </p>
    </div>
  );
}

export default function TeamGrid() {
  return (
    <section id="team" className="w-full bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--kx-crimson)]">
          The bench
        </p>
        <h1 className="font-heading text-3xl font-light leading-tight sm:text-5xl">
          The Team.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
          Thirty-three operators, designers, builders, and analysts. One studio.
          One bench. The KinetiKx Venture Studios crew.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-y-12 gap-x-6 px-6 sm:grid-cols-3 lg:grid-cols-5">
        {GRID.flat().map((agentKey, i) => (
          <AgentCard key={`${agentKey}-${i}`} agentKey={agentKey} index={i} />
        ))}
      </div>

      <style>{`
        .kx-avatar-img {
          position: absolute;
          inset: 0;
          opacity: 0;
          animation: kx-cycle 12s infinite;
        }
        @keyframes kx-cycle {
          0%, 25%      { opacity: 1; }
          33.33%, 91.66% { opacity: 0; }
          100%         { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
