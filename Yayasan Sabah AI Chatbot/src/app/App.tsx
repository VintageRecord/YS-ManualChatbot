import { Routes, Route } from "react-router";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { InfoCards } from "./components/InfoCards";
import { Slideshow } from "./components/Slideshow";
import { ProgramsGrid } from "./components/ProgramsGrid";
import { CompanyShowcase } from "./components/CompanyShowcase";
import { NewsSection } from "./components/NewsSection";
import { FooterSection } from "./components/FooterSection";
import ChatbotPage from "./pages/ChatbotPage";
import AdminPage from "./pages/AdminPage";

function HomePage() {
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
