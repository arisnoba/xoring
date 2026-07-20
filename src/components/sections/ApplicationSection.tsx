import Image from 'next/image';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import SectionContainer from '@/components/shared/SectionContainer';
import StoreButtons from '@/components/shared/StoreButtons';
import { fadeIn, fadeUp, scaleUp } from '@/lib/motion';
import type { SiteMessages } from '@/lib/i18n';

export default function ApplicationSection({ copy, commonCopy }: { copy: SiteMessages['application']; commonCopy: SiteMessages['common'] }) {
	return (
		<section id="app" data-header-theme="light" className="relative isolate overflow-hidden bg-[#f5f5f4] text-[#111]">
			<div className="absolute inset-0" />
			<SectionContainer className="relative flex items-center justify-center">
				<div className="w-full grid items-center justify-items-center gap-16 lg:grid-cols-2 lg:gap-20">
					<RevealOnScroll variants={scaleUp} className="relative flex items-center justify-center">
						<div className="relative w-full max-w-[75vw] lg:max-w-[720px]">
							<Image
								src="/assets/images/application/phones.webp"
									alt={copy.imageAlt}
								width={1080}
								height={1200}
								className="h-auto w-full object-contain drop-shadow-[0_32px_90px_rgba(17,24,39,0.18)]"
							/>
						</div>
					</RevealOnScroll>

					<div className="max-w-[760px] text-center">
						<RevealOnScroll variants={fadeUp} delay={0.1}>
							<p className="text-[1rem] font-bold tracking-[0.08em] text-[#9a9a9d]">{copy.eyebrow}</p>
						</RevealOnScroll>
						<RevealOnScroll variants={fadeUp} delay={0.15}>
							<h2 className="section-title section-title--tight mt-4 text-balance text-[#171717]">
								{copy.headline.map((line, index) => <span key={`${line}-${index}`} className="block">{line}</span>)}
							</h2>
						</RevealOnScroll>
						<RevealOnScroll variants={fadeUp} delay={0.2}>
							<p className="section-copy mt-8 text-balance text-[#2b2b31]">
								{copy.description[0]}
								<br className="hidden md:block" />
								{copy.description[1]}
							</p>
						</RevealOnScroll>

						<RevealOnScroll variants={fadeUp} delay={0.3}>
								<StoreButtons
									copy={commonCopy}
								variant="light"
								googleFirst
								className="mt-10 lg:mt-20 justify-center gap-2 md:gap-3 min-w-[200px] inline-flex"
								buttonClassName="px-6 py-3 shadow-[0_18px_40px_rgba(17,24,39,0.08)] justify-center"
							/>
						</RevealOnScroll>
						<RevealOnScroll variants={fadeIn} delay={0.35}>
							<p className="mt-10 text-sm font-medium text-[#a0a0a5]">{copy.note}</p>
						</RevealOnScroll>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
