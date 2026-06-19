"use client";
import { useEffect, useState, FormEvent } from "react";

const EXPECTED_HASH =
  "ca2dbf3ca0f6504bddc9e7cc1f2b15d36ae6a8e75fb9b1a755e7b67da0f0fa28";
const LS_KEY = "kx-math-unlocked";

async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Math() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem(LS_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {}
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const h = await sha256(input);
    if (h === EXPECTED_HASH) {
      try {
        localStorage.setItem(LS_KEY, "1");
      } catch {}
      setUnlocked(true);
      setError("");
    } else {
      setError("Invalid PIN.");
    }
  }

  return (
    <section id="math" className="w-full bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--kx-crimson)]">
          The numbers
        </p>
        <h2 className="font-heading text-3xl font-light leading-tight sm:text-5xl">
          The math.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
          The revenue ramp and the Founding LP terms are restricted to qualified
          investors. Enter your access PIN below to reveal the numbers and the close
          timeline.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl px-6">
        {!unlocked ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-sm bg-[#fafafa] p-8 text-center text-[#1a1a1a]"
          >
            <span className="block text-xl font-semibold tracking-wide text-[var(--kx-crimson)]">
              Protected Area
            </span>
            <p className="mb-5 mt-1 text-sm text-[#333]">
              This content is password-protected.
            </p>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your access PIN"
              autoComplete="off"
              required
              className="w-full max-w-[280px] rounded-sm border border-zinc-200 bg-white px-3 py-2 text-base text-[#1a1a1a] focus:border-[var(--kx-crimson)] focus:outline-none focus:ring-2 focus:ring-[var(--kx-crimson)]/15"
            />
            <button
              type="submit"
              className="ml-2 rounded-sm bg-[var(--kx-crimson)] px-6 py-2 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-[var(--kx-crimson-dark)]"
            >
              Unlock
            </button>
            {error && (
              <p className="mt-3 text-sm text-[var(--kx-crimson)]">{error}</p>
            )}
          </form>
        ) : (
          <div className="rounded-sm bg-black p-8 text-white">
            <p className="font-heading text-2xl leading-snug">
              <strong>$15M today. $65M at SEED. $240M at Series A.</strong>
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/80">
              Founding LPs invest at $15M pre-money and ride the cohort through 30
              months. 4.1× to SEED. 12.6× to Series A. Forecast is bottom-up from each
              venture&rsquo;s own model, not top-down from a target multiple.
            </p>
            <p className="mt-5 text-sm italic text-white/65">
              Journey•One is closing. The Founding LP class accepts a small number of
              qualified investors by introduction.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-block rounded-sm bg-[var(--kx-crimson)] px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-[var(--kx-crimson-dark)]"
            >
              Request Materials
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
