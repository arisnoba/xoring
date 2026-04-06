const policyLines = [
	'To maintain a healthy ecosystem, discussing price fluctuations, sharing trading screenshots, predicting returns, and inducing investments are strictly prohibited within the community.',
	'This platform is an independent sports tech and behavioral data service provider. We do not issue, sell, or broker digital assets, nor do we provide investment advice.',
];

export default function PolicyGuidelines() {
	return (
		<section data-header-theme="dark" className="bg-black text-white/65 footer-section">
			<div className="mx-auto max-w-[1680px]">
				<h3 className="footer-section__title section-title section-title--footer">Policy &amp; Community Guidelines</h3>

				<div className="mt-6 space-y-2 text-sm font-medium leading-[1.8]">
					{policyLines.map((line, index) => (
						<div key={index} className="flex gap-2">
							<span className="shrink-0 opacity-50">—</span>
							<p>{line}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
