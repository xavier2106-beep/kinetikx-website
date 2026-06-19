export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full border-t border-white/10 bg-black py-24 sm:py-32"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--kx-crimson)]">
          Talk to the studio
        </p>
        <h2 className="font-heading text-3xl font-light leading-tight sm:text-5xl">
          Founder + Studio = Dragon.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
          Founders, LPs, corporates &mdash; the right introduction starts here.
        </p>
        <a
          href="mailto:hello@kinetikx.com"
          className="mt-10 inline-block rounded-sm border border-[var(--kx-crimson)] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[var(--kx-crimson)] transition hover:bg-[var(--kx-crimson)] hover:text-white"
        >
          hello@kinetikx.com
        </a>
        <p className="mt-10 text-xs italic text-white/40">
          KinetiKx Venture Studios &middot; Dubai &middot; Transform &middot; Execute &middot; Evolve
        </p>
      </div>
    </section>
  );
}
