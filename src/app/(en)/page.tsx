import LandingPage from '@/components/layout/LandingPage';
import { getMessages } from '@/lib/i18n';

export default function Home() {
	return <LandingPage locale="en" messages={getMessages('en')} />;
}
