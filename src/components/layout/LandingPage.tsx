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
import type { SiteMessages } from '@/lib/i18n';
import type { Locale } from '@/lib/locale';

export default function LandingPage({ locale, messages }: { locale: Locale; messages: SiteMessages }) {
	return (
		<main id="main-content" className="min-h-screen min-h-[100dvh] bg-white">
			<Header locale={locale} copy={messages.header} />
			<HeroSection copy={messages.hero} commonCopy={messages.common} />
			<BeyondScreenSection copy={messages.beyondScreen} />
			<TwoModesSection copy={messages.twoModes} />
			<SocialModeSection copy={messages.socialMode} />
			<PrivateModeSection copy={messages.privateMode} />
			<AIAgentSection copy={messages.aiAgent} />
			<ApplicationSection copy={messages.application} commonCopy={messages.common} />
			<PocSection copy={messages.poc} locale={locale} />
			<Web3Section copy={messages.web3} />
			<PioneerSection copy={messages.pioneer} frontierCopy={messages.frontier} locale={locale} />
			<PolicyGuidelines copy={messages.policy} />
			<Footer locale={locale} copy={messages.footer} />
		</main>
	);
}
