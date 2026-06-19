import SectionHeader from "@/components/ui/SectionHeader";

export default function Operators() {
  return (
    <section id="operators" className="w-full bg-[#0e0e0e] py-24 sm:py-32">
      <SectionHeader
        eyebrow="The operators"
        title="The team didn&rsquo;t come from a banking floor."
        lead="It came from running the businesses we now co-found. Combined, the four partners have built, scaled, and exited the kind of companies that show up in our cohort. The bench behind them is bigger than the bench in front of them."
      />

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 px-6 sm:grid-cols-2 sm:gap-10">
        <div>
          <h3 className="mb-3 font-heading text-base font-medium uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
            Partners (4)
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            Founder-operators who have built, raised, scaled, and exited in the GCC and
            beyond. Each partner sits in an operating chair on at least one Journey•One
            venture — the chair is part of the role, not a board observer slot.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-heading text-base font-medium uppercase tracking-[0.15em] text-[var(--kx-crimson)]">
            Operator Bench
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            A standing bench of GTM, product, finance, legal, and ops operators who plug
            into the cohort as each venture hits the stage that needs them. Shared across
            the cohort. Tracked per venture. Compensated against outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
