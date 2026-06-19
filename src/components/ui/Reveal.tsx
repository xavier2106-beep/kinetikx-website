import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Pure CSS entrance animation — no JS, no IntersectionObserver, no SSR/hydration
// mismatch. Content is always rendered visible; the animation runs once on mount
// via CSS keyframes (see globals.css `kx-reveal-in`).
// Critical for mobile — earlier Framer Motion whileInView left sections at
// opacity 0 on iOS Safari when the observer didn't fire.
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  return (
    <div
      className={`kx-reveal ${className}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
