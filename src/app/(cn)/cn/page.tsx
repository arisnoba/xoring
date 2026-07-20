import LandingPage from '@/components/layout/LandingPage';
import { getMessages } from '@/lib/i18n';

export default function ChineseHome() {
	return <LandingPage locale="cn" messages={getMessages('cn')} />;
}
