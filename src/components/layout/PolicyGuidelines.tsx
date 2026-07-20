import type { SiteMessages } from '@/lib/i18n';

export default function PolicyGuidelines({ copy }: { copy: SiteMessages['policy'] }) {
	return (
		<section data-header-theme="dark" className="bg-black text-white/65 footer-section">
			<div className="mx-auto max-w-[1680px]">
				<h3 className="footer-section__title section-title section-title--footer">{copy.title}</h3>

				<div className="mt-6 space-y-2 text-sm font-medium leading-[1.8]">
					{copy.lines.map((line, index) => (
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
