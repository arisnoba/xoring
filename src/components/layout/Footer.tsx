import Link from 'next/link';
import type { SiteMessages } from '@/lib/i18n';
import { getLocalizedPath, type Locale } from '@/lib/locale';

export default function Footer({ locale, copy }: { locale: Locale; copy: SiteMessages['footer'] }) {
	return (
		<footer data-header-theme="dark" className="bg-black text-white/65 border-t border-white/10">
			<div className="footer-section">
				<div className="mx-auto flex max-w-[1680px] flex-col gap-10">
					<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src="/assets/images/common/logo.svg" alt="XO RING" width={236} height={52} className="h-auto w-[180px] opacity-20 invert" />

						<div className="flex items-center gap-6 text-sm font-medium text-white/50">
							<Link href={getLocalizedPath(locale, '/terms')} className="hover:text-white transition-colors duration-300">
								{copy.terms}
							</Link>
							<Link href={getLocalizedPath(locale, '/privacy')} className="hover:text-white transition-colors duration-300">
								{copy.privacy}
							</Link>
						</div>
					</div>

					<address className="space-y-2 text-sm font-medium not-italic leading-[1.8] text-white/55">
						<p className="text-white/85">{copy.company}</p>
						<p>{copy.ceo}</p>
						<p>{copy.businessNumber}</p>
						<p>{copy.ecommerceNumber}</p>
						<p>{copy.address}</p>
						<p>
							{copy.contact} |{' '}
							<a href="mailto:info@thedeepcon.com" className="hover:text-white transition-colors duration-300">
								info@thedeepcon.com
							</a>
						</p>
					</address>

					<p className="text-xs font-medium tracking-[0.08em] text-white/35">{copy.copyright}</p>
				</div>
			</div>
		</footer>
	);
}
