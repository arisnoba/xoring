import Image from 'next/image';
import SectionBadge from '@/components/shared/SectionBadge';
import SectionBackground from '@/components/shared/SectionBackground';
import SectionContainer from '@/components/shared/SectionContainer';
import ModeCardCarousel from '@/components/shared/ModeCardCarousel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { fadeIn, fadeUp } from '@/lib/motion';
import type { SiteMessages } from '@/lib/i18n';

const socialSlides = ['/assets/images/social/slide-01.jpg', '/assets/images/social/slide-02.jpg', '/assets/images/social/slide-03.jpg', '/assets/images/social/slide-04.jpg'];

export default function SocialModeSection({ copy }: { copy: SiteMessages['socialMode'] }) {
	return (
		<section id="ring" data-header-theme="light" className="relative isolate bg-white text-[#111]">
			<SectionBackground desktopSrc="/assets/images/social/bg-desk.jpg" />
			<SectionContainer className="relative min-h-[1400px]">
				<div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
					<div className="lg:sticky lg:top-28">
						<RevealOnScroll variants={fadeUp}>
							<SectionBadge label={copy.badge} icon="o" variant="light" />
						</RevealOnScroll>
						<RevealOnScroll variants={fadeIn} delay={0.1}>
							<div className="mt-8 mode-ring">
								<Image src="/assets/images/common/ring-0.png" alt={copy.ringAlt} width={300} height={343} className="h-auto w-full object-contain" unoptimized />
							</div>
						</RevealOnScroll>
					</div>

					<div className="pt-4">
						<RevealOnScroll variants={fadeUp} delay={0.15}>
							<div>
								<h2 className="section-title section-title--tight text-balance text-[#151515]">
									{copy.headline.map((line, index) => (
										<span key={`${line}-${index}`}>
											{line}
											{index < copy.headline.length - 1 && <br />}
										</span>
									))}
								</h2>
							</div>
						</RevealOnScroll>

						<RevealOnScroll variants={fadeUp} delay={0.2}>
							<p className="section-copy section-copy--tight mt-8 whitespace-pre-line text-[#252525]">{copy.subtext}</p>
						</RevealOnScroll>

						<RevealOnScroll variants={fadeUp} delay={0.3}>
							<div className="mt-20">
								<ModeCardCarousel cards={copy.cards} images={socialSlides} variant="light" />
							</div>
						</RevealOnScroll>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
