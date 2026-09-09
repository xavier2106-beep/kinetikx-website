"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Banknote, CreditCard, Repeat, ShoppingBag, Store, Wallet, Users } from "lucide-react";

// XGL msg 7206 (2026-09-07 nuit) · Tchipin concept diagram, built hand
// with framer-motion after Rive rejeté (msg 7200-7204). Objectif :
// object-by-object build sur ~3s, aspect 4:3, tient dans max-w-2xl
// container du ConceptTab. Style aligné duotone rouge/blanc sur noir
// (msg 7154). Replay via un key state incrementé au click.

const RED = "var(--kx-crimson)";

type StepProps = {
  delay: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function FadeIn({ delay, children, className, style }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.32, 0.72, 0, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Pop({ delay, children, className, style }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.4, 1.6, 0.4, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Animated SVG line with strokeDashoffset trick — draws itself from start
// to end. Path is any valid SVG path d, stroke matches accent.
function DrawLine({
  d,
  delay,
  duration = 0.6,
  strokeWidth = 1.5,
  color = "white",
  arrowhead = true,
}: {
  d: string;
  delay: number;
  duration?: number;
  strokeWidth?: number;
  color?: string;
  arrowhead?: boolean;
}) {
  return (
    <>
      {arrowhead && (
        <defs>
          <marker
            id={`ah-${delay}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
          </marker>
        </defs>
      )}
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        markerEnd={arrowhead ? `url(#ah-${delay})` : undefined}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ pathLength: { duration, delay, ease: "easeInOut" }, opacity: { duration: 0.2, delay } }}
      />
    </>
  );
}

const OUTCOMES = [
  { icon: Repeat, label: "Exchange for 3rd Party Giftcard", vendor: "3rd Party Vendors" },
  { icon: ShoppingBag, label: "Use to Buy Online", vendor: "Online Merchants" },
  { icon: Store, label: "Use to Buy in Retail", vendor: "Physical Stores" },
  { icon: Wallet, label: "Convert to Cash in Bank", vendor: "Banks or Wallets" },
];

export default function TchipinDiagram() {
  // key increments on click → forces AnimatePresence to remount + replay
  const [runKey, setRunKey] = useState(0);
  // auto-play only after mount to avoid SSR flash + hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-full w-full">
      <div
        onClick={() => setRunKey((k) => k + 1)}
        className="relative h-full w-full cursor-pointer overflow-hidden bg-[#0a0a0a]"
        title="Click to replay"
      >
        {mounted && (
          <AnimatePresence mode="wait">
            <motion.div
              key={runKey}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* SVG layer for arrows — sits behind the boxes */}
              <svg
                viewBox="0 0 800 600"
                className="pointer-events-none absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                {/* Tchipers → Giftpot */}
                <DrawLine d="M 400 180 L 400 260" delay={0.6} color={RED} />
                {/* Giftpot → Transfer offshoot */}
                <DrawLine d="M 560 320 L 680 320" delay={1.4} color={RED} />
                {/* Giftpot → Redeem */}
                <DrawLine d="M 400 400 L 400 460" delay={1.9} color={RED} />
                {/* Redeem horizontal spread to 4 outcomes */}
                <DrawLine d="M 120 480 L 680 480" delay={2.15} color={RED} strokeWidth={1} arrowhead={false} />
                {/* 4 short down-drops to each outcome pill */}
                {[130, 310, 490, 670].map((x, i) => (
                  <DrawLine key={x} d={`M ${x} 480 L ${x} 510`} delay={2.3 + i * 0.05} color={RED} strokeWidth={1} arrowhead={false} />
                ))}
              </svg>

              {/* Title micro */}
              <FadeIn
                delay={0}
                className="absolute left-4 top-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white/40"
              >
                TCHIP·IN — Crowd Gifting Flow
              </FadeIn>

              {/* Top row : 3 TCHIPERS with a giver icon each */}
              <div className="absolute inset-x-0 top-[8%] flex justify-center gap-3">
                {[
                  { Icon: Heart, label: "Family" },
                  { Icon: Banknote, label: "Friends" },
                  { Icon: CreditCard, label: "Circle" },
                ].map(({ Icon, label }, i) => (
                  <FadeIn
                    key={label}
                    delay={0.15 + i * 0.12}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5"
                    >
                      <Icon size={18} className="text-white" strokeWidth={1.6} />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/70">
                      {label}
                    </span>
                  </FadeIn>
                ))}
              </div>

              <FadeIn
                delay={0.5}
                className="absolute inset-x-0 top-[30%] text-center"
              >
                <span
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: RED }}
                >
                  Tchipers
                </span>
              </FadeIn>

              {/* Center : GIFTPOT hub */}
              <div className="absolute inset-x-0 top-[44%] flex flex-col items-center gap-2">
                <Pop delay={0.9}>
                  <div
                    className="flex flex-col items-center gap-1 rounded-2xl px-6 py-4 shadow-lg"
                    style={{ background: RED, color: "#fff" }}
                  >
                    <Gift size={26} strokeWidth={1.5} />
                    <div className="font-heading text-sm font-semibold uppercase tracking-[0.15em]">
                      TCHIPIN
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider">
                      GIFTPOT
                    </div>
                  </div>
                </Pop>
                <FadeIn
                  delay={1.2}
                  className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-white/60"
                >
                  Tchipees create · circle contributes · pot fills
                </FadeIn>
              </div>

              {/* Right offshoot : Transfer to another giftpot */}
              <Pop
                delay={1.5}
                className="absolute right-3 top-[48%]"
              >
                <div className="max-w-[110px] rounded-lg border border-white/25 bg-white/5 px-2.5 py-1.5 text-center font-mono text-[9px] uppercase leading-tight tracking-wider text-white/85">
                  Transfer to another Giftpot
                </div>
              </Pop>

              {/* REDEEM banner */}
              <FadeIn
                delay={2.0}
                className="absolute inset-x-0 top-[74%] text-center"
              >
                <span
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: RED }}
                >
                  Redeem your gift or fund
                </span>
              </FadeIn>

              {/* Bottom row : 4 outcomes */}
              <div className="absolute inset-x-3 bottom-3 grid grid-cols-4 gap-2">
                {OUTCOMES.map(({ icon: Icon, label, vendor }, i) => (
                  <FadeIn
                    key={label}
                    delay={2.35 + i * 0.1}
                    className="flex flex-col items-center gap-1 rounded-lg border border-white/15 bg-white/5 p-2 text-center"
                  >
                    <Icon size={16} className="text-white" strokeWidth={1.6} />
                    <div className="font-mono text-[8px] uppercase leading-tight tracking-wider text-white">
                      {label}
                    </div>
                    <div className="font-mono text-[7.5px] uppercase leading-tight tracking-wider text-white/40">
                      {vendor}
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Interaction hint */}
              <div className="pointer-events-none absolute bottom-[-6px] right-3 font-mono text-[8px] uppercase tracking-[0.15em] text-white/25">
                Click to replay
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
