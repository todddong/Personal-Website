import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import AthleteSystems from "@/components/AthleteSystems";
import SkillsMetrics from "@/components/SkillsMetrics";
import Experience from "@/components/Experience";
import AboutCMU from "@/components/AboutCMU";
import Highlights from "@/components/Highlights";
import HighSchoolSwim from "@/components/HighSchoolSwim";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AthleteSystems />
      <Experience />
      <Projects />
      <SkillsMetrics />
      <AboutCMU />
      <HighSchoolSwim />
      <Highlights />
      <Footer />
    </main>
  );
}

