import { AnimatedBackground } from "./components/AnimatedBackground";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { InfoCards } from "./components/InfoCards";
import { Slideshow } from "./components/Slideshow";
import { ProgramsGrid } from "./components/ProgramsGrid";
import { CompanyShowcase } from "./components/CompanyShowcase";
import { NewsSection } from "./components/NewsSection";
import { FooterSection } from "./components/FooterSection";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent">
      <AnimatedBackground />
      <Header />

      <main>
        <HeroBanner />
        <Slideshow />
        <InfoCards />
        <ProgramsGrid />
        <CompanyShowcase />
        <NewsSection />
      </main>

      <FooterSection />
    </div>
  );
}