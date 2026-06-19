import Nav from "@/components/Nav";

export const metadata = {
  title: "Sources",
  description:
    "Citations and data sources for the KinetiKx Venture Studios thesis.",
  robots: { index: true, follow: true },
};

export default function SourcesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-black">
        <section className="w-full py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--kx-crimson)]">
              References
            </p>
            <h1 className="font-heading text-3xl font-light leading-tight sm:text-5xl">
              Sources.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              Footnoted citations from the KinetiKx Venture Studios thesis.
            </p>

            <ol className="mt-12 space-y-10 text-sm leading-relaxed text-white/80">
              <li id="1" className="scroll-mt-24">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--kx-crimson)]">
                  Source 1
                </p>
                <p>
                  McKinsey &amp; Company / Leap.{" "}
                  <em>&ldquo;How CEOs are turning corporate venture building into outsize growth.&rdquo;</em>{" "}
                  October 2024, p.&nbsp;6.
                </p>
              </li>

              <li id="2" className="scroll-mt-24">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--kx-crimson)]">
                  Source 2
                </p>
                <p>
                  Global Startup Studio Network (GSSN).{" "}
                  <em>Venture Studio Forum</em> white paper, p.&nbsp;10 (IRR / TVPI benchmark table).
                  Corroborated by GSSN economics summary (internal ref XGL_1765803977440.pdf, p.&nbsp;2).
                </p>
              </li>
            </ol>

            <p className="mt-16 text-xs italic text-white/40">
              Studio benchmarks reflect industry data. Past performance is not predictive.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
