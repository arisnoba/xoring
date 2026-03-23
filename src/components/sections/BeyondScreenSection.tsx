import SectionContainer from '@/components/shared/SectionContainer';
import SectionBackground from '@/components/shared/SectionBackground';
import { BEYOND_SCREEN } from '@/lib/constants';

const paragraphs = [
	['In an era where we stare at screens all day,', 'is your social media profile really you?'],
	['XORing was created', 'to help you reclaim your true self,', 'often lost among countless digital identities.'],
	['Step off the screen.', 'Make every walk, every run,', 'and every breath truly count.'],
];

export default function BeyondScreenSection() {
	return (
		<section id="beyond-screen" data-header-theme="dark" className="relative isolate min-h-screen overflow-hidden bg-[#0b0908] text-white">
			<SectionBackground desktopSrc="/assets/images/beyondscreen/bg-desk.jpg" mobileSrc="/assets/images/beyondscreen/bg-mo.jpg" opacity={0.3} />
			<SectionContainer className="relative flex items-center">
				<div className="max-w-[840px]">
					<h2 className="section-title text-balance text-white">{BEYOND_SCREEN.headline}</h2>

					<div className="section-copy section-copy--wide mt-14 space-y-4 lg:space-y-8 text-white/95">
						{paragraphs.map((paragraph, index) => (
							<p key={index} className="text-balance">
								{paragraph.map(line => (
									<span key={line} className="block">
										{line}
									</span>
								))}
							</p>
						))}
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
