import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAgentSection from "@/components/sections/AIAgentSection";
import ApplicationSection from "@/components/sections/ApplicationSection";
import BeyondScreenSection from "@/components/sections/BeyondScreenSection";
import HeroSection from "@/components/sections/HeroSection";
import PocSection from "@/components/sections/PocSection";
import PrivateModeSection from "@/components/sections/PrivateModeSection";
import PioneerSection from "@/components/sections/PioneerSection";
import TwoModesSection from "@/components/sections/TwoModesSection";
import SocialModeSection from "@/components/sections/SocialModeSection";
import Web3Section from "@/components/sections/Web3Section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <Header />
      <HeroSection />
      <BeyondScreenSection />
      <TwoModesSection />
      <SocialModeSection />
      <PrivateModeSection />
      <AIAgentSection />
      <ApplicationSection />
      <PocSection />
      <Web3Section />
      <PioneerSection />
      <Footer />
    </main>
  );
}
