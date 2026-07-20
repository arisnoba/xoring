import RevealOnScroll from '@/components/shared/RevealOnScroll';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionBackground from '@/components/shared/SectionBackground';
import { fadeUp } from '@/lib/motion';
import type { SiteMessages } from '@/lib/i18n';

export default function BeyondScreenSection({ copy }: { copy: SiteMessages['beyondScreen'] }) {
	return (
		<section id="beyond-screen" data-header-theme="dark" className="relative isolate min-h-screen min-h-[100dvh] overflow-hidden bg-[#0b0908] text-white">
			<SectionBackground desktopSrc="/assets/images/beyondscreen/bg-desk.jpg" mobileSrc="/assets/images/beyondscreen/bg-mo.jpg" opacity={0.3} />
			<SectionContainer className="relative flex items-center">
				<div className="max-w-[840px]">
					<RevealOnScroll variants={fadeUp}>
						<h2 className="section-title text-balance text-white">{copy.headline}</h2>
					</RevealOnScroll>

					<div className="section-copy section-copy--wide mt-14 space-y-4 lg:space-y-8 text-white/95">
						{copy.paragraphs.map((paragraph, index) => (
							<RevealOnScroll key={index} variants={fadeUp} delay={0.1 * index}>
								<p className="text-balance">
									{paragraph.map((line, lineIndex) => (
										<span key={`${line}-${lineIndex}`} className="block">
											{line}
										</span>
									))}
								</p>
							</RevealOnScroll>
						))}
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
