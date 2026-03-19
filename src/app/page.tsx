import SocialModeSection from "@/components/SocialModeSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Spacer header to force scrolling for testing */}
      <header className="h-[50vh] flex items-center justify-center bg-[#f5f5f7]">
        <h1 className="text-4xl font-bold text-gray-400">Scroll Down for Social Mode</h1>
      </header>
      
      <SocialModeSection />

      {/* Spacer footer to force scrolling for testing */}
      <footer className="h-[100vh] flex items-center justify-center bg-zinc-900">
        <h2 className="text-4xl font-bold text-zinc-700">Footer Area</h2>
      </footer>
    </main>
  );
}
