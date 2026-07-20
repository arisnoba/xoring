import Image from 'next/image';
import SectionBadge from '@/components/shared/SectionBadge';
import SectionBackground from '@/components/shared/SectionBackground';
import SectionContainer from '@/components/shared/SectionContainer';
import ModeCardCarousel from '@/components/shared/ModeCardCarousel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { fadeIn, fadeUp } from '@/lib/motion';
import type { SiteMessages } from '@/lib/i18n';

const privateSlides = ['/assets/images/private/slide-01.jpg', '/assets/images/private/slide-02.jpg', '/assets/images/private/slide-03.jpg', '/assets/images/private/slide-04.jpg'];

export default function PrivateModeSection({ copy }: { copy: SiteMessages['privateMode'] }) {
	return (
		<section data-header-theme="dark" className="relative isolate bg-black text-white">
			<SectionBackground desktopSrc="/assets/images/private/bg-desk.jpg" mobileSrc="/assets/images/private/bg-mo.jpg" />

			<SectionContainer className="relative flex items-center justify-center">
				<div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
					<div className="lg:sticky lg:top-28">
						<RevealOnScroll variants={fadeUp}>
							<SectionBadge label={copy.badge} icon="x" variant="dark" />
						</RevealOnScroll>
						<RevealOnScroll variants={fadeIn} delay={0.1}>
							<div className="mt-8 mode-ring">
								<Image src="/assets/images/common/ring-x.png" alt={copy.ringAlt} width={500} height={500} className="h-auto w-full object-contain" unoptimized />
							</div>
						</RevealOnScroll>
					</div>

					<div className="pt-4">
						<RevealOnScroll variants={fadeUp} delay={0.15}>
							<div>
								<h2 className="section-title text-balance text-white">
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
							<p className="section-copy section-copy--tight mt-8 whitespace-pre-line text-white/92">{copy.subtext}</p>
						</RevealOnScroll>

						<RevealOnScroll variants={fadeUp} delay={0.3}>
							<div className="mt-20">
								<ModeCardCarousel cards={copy.cards} images={privateSlides} variant="dark" />
							</div>
						</RevealOnScroll>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
