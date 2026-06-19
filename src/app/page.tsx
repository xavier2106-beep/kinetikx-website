import Nav from "@/components/Nav";
import SectionNav from "@/components/SectionNav";
import Hero from "@/components/sections/Hero";
import Thesis from "@/components/sections/Thesis";
import Model from "@/components/sections/Model";
import Studio from "@/components/sections/Studio";
import Cohort from "@/components/sections/Cohort";
import WhyNow from "@/components/sections/WhyNow";
import Operators from "@/components/sections/Operators";
import Math from "@/components/sections/Math";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <SectionNav />
      <main className="flex-1">
        <Hero />
        <Thesis />
        <Model />
        <Studio />
        <Cohort />
        <WhyNow />
        <Operators />
        <Math />
        <Contact />
      </main>
    </>
  );
}
