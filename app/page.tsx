import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Places from "@/components/Places";
import Highlights from "@/components/Highlights";
import HighSchoolSwim from "@/components/HighSchoolSwim";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <HighSchoolSwim />
      <Places />
      <Highlights />
      <Footer />
    </main>
  );
}
