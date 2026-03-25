import Image from 'next/image';
import SectionBadge from '@/components/shared/SectionBadge';
import SectionBackground from '@/components/shared/SectionBackground';
import SectionContainer from '@/components/shared/SectionContainer';
import ModeCardCarousel from '@/components/shared/ModeCardCarousel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { PRIVATE_MODE } from '@/lib/constants';
import { fadeIn, fadeUp } from '@/lib/motion';

const privateSlides = ['/assets/images/private/slide-01.jpg', '/assets/images/private/slide-02.jpg', '/assets/images/private/slide-03.jpg', '/assets/images/private/slide-04.jpg'];

export default function PrivateModeSection() {
	return (
		<section data-header-theme="dark" className="relative isolate bg-black text-white">
			<SectionBackground desktopSrc="/assets/images/private/bg-desk.jpg" mobileSrc="/assets/images/private/bg-mo.jpg" />

			<SectionContainer className="relative flex items-center justify-center">
				<div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
					<div className="lg:sticky lg:top-28">
						<RevealOnScroll variants={fadeUp}>
							<SectionBadge label="PRIVATE MODE" icon="x" variant="dark" />
						</RevealOnScroll>
						<RevealOnScroll variants={fadeIn} delay={0.1}>
							<div className="mt-8 mode-ring">
								<Image src="/assets/images/common/ring-x.png" alt="XORing Private Mode" width={500} height={500} className="h-auto w-full object-contain" unoptimized />
							</div>
						</RevealOnScroll>
					</div>

					<div className="pt-4">
						<RevealOnScroll variants={fadeUp} delay={0.15}>
							<div>
								<h2 className="section-title text-balance text-white">
									{PRIVATE_MODE.headline.split('\n').map((line, index, arr) => (
										<span key={line}>
											{line}
											{index < arr.length - 1 && <br />}
										</span>
									))}
								</h2>
							</div>
						</RevealOnScroll>

						<RevealOnScroll variants={fadeUp} delay={0.2}>
							<p className="section-copy section-copy--tight mt-8 whitespace-pre-line text-white/92">{PRIVATE_MODE.subtext}</p>
						</RevealOnScroll>

						<RevealOnScroll variants={fadeUp} delay={0.3}>
							<div className="mt-20">
								<ModeCardCarousel cards={PRIVATE_MODE.cards} images={privateSlides} variant="dark" />
							</div>
						</RevealOnScroll>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
