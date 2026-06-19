import { ReactNode } from "react";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeader({ eyebrow, title, lead, align = "center", className = "" }: Props) {
  return (
    <div
      className={`mx-auto max-w-3xl px-6 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--kx-crimson)]">{eyebrow}</p>
      )}
      <h2 className="font-heading text-3xl font-light leading-tight sm:text-5xl">{title}</h2>
      {lead && <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">{lead}</p>}
    </div>
  );
}
