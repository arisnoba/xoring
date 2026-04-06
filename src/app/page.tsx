import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PolicyGuidelines from '@/components/layout/PolicyGuidelines';
import AIAgentSection from '@/components/sections/AIAgentSection';
import ApplicationSection from '@/components/sections/ApplicationSection';
import BeyondScreenSection from '@/components/sections/BeyondScreenSection';
import HeroSection from '@/components/sections/HeroSection';
import PocSection from '@/components/sections/PocSection';
import PrivateModeSection from '@/components/sections/PrivateModeSection';
import PioneerSection from '@/components/sections/PioneerSection';
import TwoModesSection from '@/components/sections/TwoModesSection';
import SocialModeSection from '@/components/sections/SocialModeSection';
import Web3Section from '@/components/sections/Web3Section';

export default function Home() {
	return (
		<main id="main-content" className="min-h-screen min-h-[100dvh] bg-white">
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
			<PolicyGuidelines />
			<Footer />
		</main>
	);
}
