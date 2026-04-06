import Link from 'next/link';

const policyLines = [
	'To maintain a healthy ecosystem, discussing price fluctuations, sharing trading screenshots, predicting returns, and inducing investments are strictly prohibited within the community.',
	'This platform is an independent sports tech and behavioral data service provider. We do not issue, sell, or broker digital assets, nor do we provide investment advice.',
];

export default function Footer() {
	return (
		<footer data-header-theme="dark" className="bg-black text-white/65">
			<div className="footer-section border-b border-white/10">
				<div className="mx-auto grid max-w-[1680px] gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
					<div className="max-w-[980px]">
						<h3 className="footer-section__title section-title section-title--footer">Policy &amp; Community Guidelines</h3>

						<div className="mt-12 space-y-8 text-sm font-medium leading-[1.8]">
							{policyLines.map((line, index) => (
								<div key={index} className="flex gap-2">
									<span className="shrink-0 opacity-50">—</span>
									<p>{line}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="footer-section">
				<div className="mx-auto flex max-w-[1680px] flex-col gap-10">
					<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src="/assets/images/common/logo.svg" alt="XO RING" width={236} height={52} className="h-auto w-[180px] opacity-20 invert" />

						<div className="flex items-center gap-6 text-sm font-medium text-white/50">
							<Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
							<Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
						</div>
					</div>

					<address className="space-y-2 text-sm font-medium not-italic leading-[1.8] text-white/55">
						<p className="text-white/85">DEEPCON Inc.</p>
						<p>CEO | Kim Dong Seok</p>
						<p>Business Registration Number | 830-88-03497</p>
						<p>Address | 1F, 15 Gangnam-daero 89-gil, Seocho-gu, Seoul, Republic of Korea</p>
						<p>
							Contact |{' '}
							<a href="mailto:info@thedeepcon.com" className="hover:text-white transition-colors duration-300">
								info@thedeepcon.com
							</a>
						</p>
					</address>

					<p className="text-xs font-medium tracking-[0.08em] text-white/35">
						© DEEPCON Inc. All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
