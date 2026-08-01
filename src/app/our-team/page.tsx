import Image from "next/image";
import TeamGrid from "@/components/sections/TeamGrid";

export const metadata = {
  title: "The Team — KinetiKx Venture Studios",
  description:
    "Thirty-three operators, designers, builders, and analysts. One studio. One bench.",
};

// Logo-only header (XGL, 2026-08-01) : dropped the anchor-link nav on
// /our-team since those anchors only resolve on the home page. Logo links
// back to home.
export default function OurTeamPage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-3">
          <a href="/" className="flex items-center" aria-label="KinetiKx Venture Studios — Home">
            <Image
              src="/brand/kkx-logo-white.png"
              alt="KinetiKx"
              width={721}
              height={164}
              priority
              className="h-4 w-auto sm:h-10"
            />
          </a>
        </div>
      </header>
      <main className="flex-1">
        <TeamGrid />
      </main>
    </>
  );
}
