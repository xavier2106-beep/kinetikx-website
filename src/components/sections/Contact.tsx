"use client";
import { useState, FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      org: data.get("org"),
      message: data.get("message"),
    };
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) {
        setStatus("error");
        setErrMsg(j.error || "Send failed. Please try again.");
        return;
      }
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  }

  return (
    <section
      id="contact"
      className="w-full border-t border-white/10 bg-black py-24 sm:py-32"
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--kx-crimson)]">
            Talk to the studio
          </p>
          <h2 className="font-heading text-3xl font-light leading-tight sm:text-5xl">
            Founder + Studio = Dragon.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Founders, LPs, corporates &mdash; the right introduction starts here.
          </p>
        </div>

        {status === "sent" ? (
          <div className="mt-12 rounded-sm border border-[var(--kx-crimson)]/30 bg-white/5 p-8 text-center">
            <p className="font-heading text-xl text-[var(--kx-crimson)]">Thank you.</p>
            <p className="mt-3 text-sm text-white/75">
              Your message reached the studio. Someone on the operator bench will respond
              within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Name" required />
              <Field name="email" label="Email" type="email" required />
            </div>
            <Field name="org" label="Organisation (optional)" />
            <Field name="message" label="Message" textarea required />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex justify-center rounded-sm bg-[var(--kx-crimson)] px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-[var(--kx-crimson-dark)] disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>
            {status === "error" && (
              <p className="text-sm text-[var(--kx-crimson)]">{errMsg}</p>
            )}
            <p className="text-center text-xs text-white/40">
              Or write directly: <a href="mailto:hello@kinetikx.com" className="underline hover:text-[var(--kx-crimson)]">hello@kinetikx.com</a>
            </p>
          </form>
        )}

        <p className="mt-12 text-center text-xs italic text-white/40">
          KinetiKx Venture Studios &middot; Dubai &middot; Transform &middot; Execute &middot; Evolve
        </p>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[var(--kx-crimson)] focus:outline-none focus:ring-2 focus:ring-[var(--kx-crimson)]/20";
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-white/55">
        {label} {required && <span className="text-[var(--kx-crimson)]">*</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
