import Image from 'next/image';
import SectionBadge from '@/components/shared/SectionBadge';
import SectionBackground from '@/components/shared/SectionBackground';
import SectionContainer from '@/components/shared/SectionContainer';
import ModeCardCarousel from '@/components/shared/ModeCardCarousel';
import { SOCIAL_MODE } from '@/lib/constants';

const socialSlides = ['/assets/images/social/slide-01.jpg', '/assets/images/social/slide-02.jpg', '/assets/images/social/slide-03.jpg', '/assets/images/social/slide-04.jpg'];

export default function SocialModeSection() {
	return (
		<section id="ring" data-header-theme="light" className="relative isolate bg-white text-[#111]">
			<SectionBackground desktopSrc="/assets/images/social/bg-desk.jpg" />
			<SectionContainer className="relative min-h-[1400px]">
				<div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
					<div className="lg:sticky lg:top-28">
						<SectionBadge label="SOCIAL MODE" icon="o" variant="light" />
						<div className="mt-8 mode-ring">
							<Image src="/assets/images/ring-0.png" alt="XORing Social Mode" width={300} height={343} className="h-auto w-full object-contain" unoptimized />
						</div>
					</div>

					<div className="pt-4">
						<div className="">
							<h2 className="section-title section-title--tight text-balance text-[#151515]">
								{SOCIAL_MODE.headline.split('\n').map((line, index, arr) => (
									<span key={line}>
										{line}
										{index < arr.length - 1 && <br />}
									</span>
								))}
							</h2>
							<p className="section-copy section-copy--tight mt-8 whitespace-pre-line text-[#252525]">{SOCIAL_MODE.subtext}</p>
						</div>

						<div className="mt-20">
							<ModeCardCarousel cards={SOCIAL_MODE.cards} images={socialSlides} variant="light" />
						</div>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
