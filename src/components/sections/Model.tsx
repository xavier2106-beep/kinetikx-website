import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

const COLS = [
  {
    title: "STUDIO",
    body: "Operator bench. Capital. Legal stack. GCC corporate rolodex. Twenty to a hundred hours a week, every week, for three years. The chair next to the founder isn’t ceremonial — it’s an operating role.",
  },
  {
    title: "CO-FOUNDERS",
    body: "The founder brings vision, obsession, and the right to say no. They run the company. We don’t parachute consultants — we sit at the table with skin on the cap table.",
  },
  {
    title: "TECH STACK",
    body: "The agentic stack handles what used to take a build team a quarter. Code, content, customer ops, regulatory drafting, financial modelling. Shared across the cohort, fine-tuned per venture. The compounding asset every founder inherits on day one.",
  },
];

export default function Model() {
  return (
    <section id="model" className="w-full bg-black py-24 sm:py-32">
      <Reveal>
        <SectionHeader
          eyebrow="The model"
          title="We are co-founders, not investors."
          lead="A KinetiKx Journey doesn&rsquo;t start with a check. It starts with a chair next to the founder, a thirty-six-month plan, and a tech stack that already exists because the last venture in the cohort already used it."
        />
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-12 px-6 sm:grid-cols-3 sm:gap-10">
        {COLS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.12}>
            <h3 className="mb-4 font-heading text-base font-medium uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
              {c.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/80">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
