import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import AthleteSystems from "@/components/AthleteSystems";
import Experience from "@/components/Experience";
import Places from "@/components/Places";
import AboutCMU from "@/components/AboutCMU";
import Highlights from "@/components/Highlights";
import HighSchoolSwim from "@/components/HighSchoolSwim";
import Footer from "@/components/Footer";
import ImagePreloader from "@/components/ImagePreloader";

export default function Home() {
  // Critical images to preload (above the fold)
  const criticalImages = [
    { src: "alaska/cs logo.png" },
    { src: "alaska/cmu swim logo.webp" },
    { src: "headshot.PNG" },
  ];

  return (
    <main className="min-h-screen">
      <ImagePreloader images={criticalImages} />
      <Navbar />
      <Hero />
      <AthleteSystems />
      <Experience />
      <Places />
      <Projects />
      <AboutCMU />
      <HighSchoolSwim />
      <Highlights />
      <Footer />
    </main>
  );
}

