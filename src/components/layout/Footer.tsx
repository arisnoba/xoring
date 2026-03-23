import Image from 'next/image';

const policyLines = [
	'To maintain a healthy ecosystem, discussing price fluctuations, sharing trading screenshots, predicting returns, and inducing investments are strictly prohibited within the community.',
	'This platform is an independent sports tech and behavioral data service provider. We do not issue, sell, or broker digital assets, nor do we provide investment advice.',
];

export default function Footer() {
	return (
		<footer className="bg-black text-white">
			<div className="mx-auto grid max-w-[1680px] gap-14 px-[20px] py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
				<div className="max-w-[980px]">
					<h3 className="footer-section__title section-title section-title--footer text-white/55">Policy &amp; Community Guidelines</h3>

					<div className="mt-12 space-y-10 text-[1.02rem] font-medium leading-[1.8] text-white/42">
						{policyLines.map((line, index) => (
							<div key={index} className="flex gap-2">
								<span className="shrink-0 opacity-50">—</span>
								<p>{line}</p>
							</div>
						))}
					</div>
				</div>

				<div className="flex min-w-[260px] flex-col items-start gap-6 lg:items-end">
					<Image src="/assets/images/logo.svg" alt="XO RING" width={236} height={64} className="h-auto w-[180px] opacity-20" unoptimized />
				</div>
			</div>
		</footer>
	);
}
