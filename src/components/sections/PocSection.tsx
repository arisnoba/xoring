import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import SectionBackground from '@/components/shared/SectionBackground';
import SectionContainer from '@/components/shared/SectionContainer';
import { fadeUp, scaleUp } from '@/lib/motion';
import type { SiteMessages } from '@/lib/i18n';
import type { Locale } from '@/lib/locale';

const stepIcons = ['/assets/images/poc/icon-01.svg', '/assets/images/poc/icon-02.svg', '/assets/images/poc/icon-03.svg', '/assets/images/poc/icon-04.svg'];

export default function PocSection({ copy, locale }: { copy: SiteMessages['poc']; locale: Locale }) {
	const steps = copy.steps.map((label, index) => ({ label, icon: stepIcons[index] }));
	const activityImage = locale === 'cn'
		? { desktop: '/assets/images/poc/01-desk-cn.png', mobile: '/assets/images/poc/01-mo-cn.png' }
		: { desktop: '/assets/images/poc/01-desk.webp', mobile: '/assets/images/poc/01-mo.webp' };

	return (
		<section id="aios" data-header-theme="dark" className="relative isolate overflow-hidden bg-[#070707] text-white">
			<SectionBackground desktopSrc="/assets/images/poc/bg-desk.jpg" mobileSrc="/assets/images/poc/bg-mo.jpg" />
			<SectionContainer className="relative max-w-[1280px]! section-content-space section-container__poc">
				<div>
					<div className="mx-auto max-w-[940px] text-center">
						<RevealOnScroll variants={fadeUp}>
							<p className="text-[1rem] font-bold tracking-[0.08em] text-white/55">{copy.eyebrow}</p>
						</RevealOnScroll>
						<RevealOnScroll variants={fadeUp} delay={0.1}>
							<h2 className="poc-section__title section-title mt-4 text-balance text-white">{copy.headline}</h2>
						</RevealOnScroll>
						<RevealOnScroll variants={fadeUp} delay={0.15}>
							<p className="section-copy mx-auto mt-8 max-w-[820px] text-balance text-white/92">
								{copy.intro}
							</p>
						</RevealOnScroll>
					</div>

					<RevealOnScroll variants={scaleUp} delay={0.2} className="mt-14 flex flex-col md:flex-row items-center gap-8 xl:gap-11 justify-center">
						{/* Phone */}
						<div className="w-full max-w-[1200px] px-4 sm:px-0 mx-auto">
							<Image src={activityImage.desktop} alt={copy.activityImageAlt} width={1200} height={600} className="hidden h-auto w-full object-contain sm:block" unoptimized />
							<Image src={activityImage.mobile} alt={copy.activityImageAlt} width={410} height={820} className="h-auto w-full object-contain sm:hidden" unoptimized />
						</div>
					</RevealOnScroll>
				</div>

				<div>
					<RevealOnScroll variants={fadeUp}>
						<p className="section-copy mx-auto mt-16 max-w-[760px] text-balance text-center text-white/92">
							{copy.proof}
						</p>
					</RevealOnScroll>

					<RevealOnScroll variants={fadeUp} delay={0.15}>
						<>
							{/* Desktop: 1-row flex */}
							<div className="mt-14 hidden md:flex flex-row justify-center items-center gap-[24px]">
								{steps.map((step, index) => (
									<React.Fragment key={step.label}>
										<div className="flex max-w-[155px] shrink-0 flex-col items-center gap-[20px] text-center">
											<Image src={step.icon} alt={step.label} width={100} height={100} className="h-[100px] w-[100px] object-contain" />
											<p className="text-[14px] leading-normal text-white text-balance">{step.label}</p>
										</div>
										{index < steps.length - 1 && <ChevronRight className="h-[32px] w-[32px] text-white shrink-0" strokeWidth={2} />}
									</React.Fragment>
								))}
							</div>

							{/* Mobile: Z-pattern 2x2 grid */}
							<div className="mt-14 grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-x-3 gap-y-4 md:hidden">
								{/* Row 1: Step1 → Step2 */}
								<div className="flex flex-col items-center gap-[16px] text-center" style={{ gridRow: 1, gridColumn: 1 }}>
									<Image src={steps[0].icon} alt={steps[0].label} width={100} height={100} className="h-[80px] w-[80px] object-contain" />
									<p className="text-[13px] leading-normal text-white text-balance">{steps[0].label}</p>
								</div>
								<ChevronRight className="h-[24px] w-[24px] text-white/60" strokeWidth={2} style={{ gridRow: 1, gridColumn: 2 }} />
								<div className="flex flex-col items-center gap-[16px] text-center" style={{ gridRow: 1, gridColumn: 3 }}>
									<Image src={steps[1].icon} alt={steps[1].label} width={100} height={100} className="h-[80px] w-[80px] object-contain" />
									<p className="text-[13px] leading-normal text-white text-balance">{steps[1].label}</p>
								</div>

								{/* Row 2: ↓ arrow (right-aligned under Step2) */}
								<ChevronRight className="h-[24px] w-[24px] text-white/60 rotate-90" strokeWidth={2} style={{ gridRow: 2, gridColumn: 3 }} />

								{/* Row 3: Step4 ← Step3 */}
								<div className="flex flex-col items-center gap-[16px] text-center" style={{ gridRow: 3, gridColumn: 1 }}>
									<Image src={steps[3].icon} alt={steps[3].label} width={100} height={100} className="h-[80px] w-[80px] object-contain" />
									<p className="text-[13px] leading-normal text-white text-balance">{steps[3].label}</p>
								</div>
								<ChevronRight className="h-[24px] w-[24px] text-white/60 rotate-180" strokeWidth={2} style={{ gridRow: 3, gridColumn: 2 }} />
								<div className="flex flex-col items-center gap-[16px] text-center" style={{ gridRow: 3, gridColumn: 3 }}>
									<Image src={steps[2].icon} alt={steps[2].label} width={100} height={100} className="h-[80px] w-[80px] object-contain" />
									<p className="text-[13px] leading-normal text-white text-balance">{steps[2].label}</p>
								</div>
							</div>
						</>
					</RevealOnScroll>

					<RevealOnScroll variants={fadeUp} delay={0.25} className="mt-16 flex flex-col items-center md:flex-row md:items-stretch gap-4 md:gap-6 justify-center">
							{copy.cards.map(card => (
							<article key={card.title} className="w-full rounded-[24px] bg-[#333]/50 px-6 py-7 max-w-[310px]">
								<h3 className="section-copy font-bold tracking-tight">{card.title}</h3>
								<p className="mt-4 text-[14px] font-medium leading-[1.7] text-white/72">{card.body}</p>
							</article>
						))}
					</RevealOnScroll>
				</div>

				<div className="mt-20 text-center">
					<RevealOnScroll variants={fadeUp}>
						<p className="section-copy mx-auto max-w-[860px] text-balance text-white/94">{copy.outro}</p>
					</RevealOnScroll>

					<RevealOnScroll variants={scaleUp} delay={0.15} className="mx-auto mt-12 flex flex-col items-center w-[75vw] max-w-[512px]">
						<Image src="/assets/images/poc/phone.png" alt={copy.phoneAlt} width={500} height={1000} className="h-auto w-full object-contain" />
					</RevealOnScroll>
				</div>
			</SectionContainer>
		</section>
	);
}
