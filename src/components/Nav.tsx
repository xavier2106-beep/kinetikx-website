const LINKS = [
  { href: "#thesis", label: "Thesis" },
  { href: "#model", label: "Model" },
  { href: "#studio", label: "Studio" },
  { href: "#cohort", label: "Cohort" },
  { href: "#why-now", label: "Why Now" },
  { href: "#operators", label: "Operators" },
  { href: "#math", label: "Math" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-heading text-lg font-light tracking-wide text-white">
          <span className="text-[var(--kx-crimson)]">Kineti</span>Kx
        </a>
        <nav className="hidden gap-6 text-xs uppercase tracking-[0.2em] text-white/70 sm:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
