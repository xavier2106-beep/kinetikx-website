import Nav from "@/components/Nav";
import TeamGrid from "@/components/sections/TeamGrid";

export const metadata = {
  title: "The Team — KinetiKx Venture Studios",
  description:
    "Thirty-three operators, designers, builders, and analysts. One studio. One bench.",
};

export default function OurTeamPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <TeamGrid />
      </main>
    </>
  );
}
