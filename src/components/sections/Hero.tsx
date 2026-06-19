"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-15%"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="kx-hero-bg absolute inset-0">
          <Image
            src="/hero/dragon-crimson.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60 mix-blend-multiply" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60"
        >
          <span className="h-px w-12 bg-[var(--kx-crimson)]" />
          <span>We don&rsquo;t chase unicorns</span>
          <span className="h-px w-12 bg-[var(--kx-crimson)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-heading text-5xl font-light leading-tight sm:text-7xl"
        >
          We breed <span className="text-[var(--kx-crimson)]">Dragons</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          KinetiKx Venture Studios is a Dubai-based venture studio building the next
          generation of GCC tech leaders, with operators who&rsquo;ve built and exited
          before, and a 36-month thesis to create $240M of value across five carefully
          chosen ventures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
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
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-12 text-sm uppercase tracking-[0.18em] text-white sm:text-base"
        >
          Transform &middot; Execute &middot; Evolve &nbsp;&mdash;&nbsp; Founder + Studio = Dragon.
        </motion.p>
      </motion.div>

      <style>{`
        .kx-hero-bg {
          animation: kx-hero-drift 24s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes kx-hero-drift {
          0%   { transform: scale(1.08) translate(0%, 0%); }
          50%  { transform: scale(1.14) translate(-2%, -1.5%); }
          100% { transform: scale(1.10) translate(1.5%, 1%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kx-hero-bg { animation: none; transform: scale(1.06); }
        }
      `}</style>
    </section>
  );
}
