import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <Image
        src="/hero/dragon-crimson.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60 mix-blend-multiply" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
          <span className="h-px w-12 bg-[var(--kx-crimson)]" />
          <span>We don&rsquo;t chase unicorns</span>
          <span className="h-px w-12 bg-[var(--kx-crimson)]" />
        </div>

        <h1 className="font-heading text-5xl font-light leading-tight sm:text-7xl">
          We breed <span className="text-[var(--kx-crimson)]">Dragons</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          KinetiKx Venture Studios is a Dubai-based venture studio building the next
          generation of GCC tech leaders, with operators who&rsquo;ve built and exited
          before, and a 36-month thesis to create $240M of value across five carefully
          chosen ventures.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#cohort"
            className="rounded-sm bg-[var(--kx-crimson)] px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-[var(--kx-crimson-dark)]"
          >
            Inside Journey&middot;One
          </a>
          <a
            href="#math"
            className="rounded-sm border border-white/40 px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10"
          >
            The Numbers
          </a>
        </div>

        <p className="mt-12 text-xs italic text-white/50">
          Transform &middot; Execute &middot; Evolve &mdash; Founder + Studio = Dragon.
        </p>
      </div>
    </section>
  );
}
