import RevealOnScroll from '@/components/shared/RevealOnScroll';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionBackground from '@/components/shared/SectionBackground';
import { fadeUp } from '@/lib/motion';
import type { SiteMessages } from '@/lib/i18n';

export default function Web3Section({ copy }: { copy: SiteMessages['web3'] }) {
	return (
		<section data-header-theme="dark" className="relative isolate overflow-hidden bg-[#041007] text-white">
			<SectionBackground desktopSrc="/assets/images/web3/bg-desk.jpg" mobileSrc="/assets/images/web3/bg-mo.jpg" opacity={0.1} />

			<SectionContainer className="relative flex items-center justify-center text-center">
				<div className="max-w-[860px]">
					<RevealOnScroll variants={fadeUp}>
						<h2 className="section-title text-balance text-white">
							{copy.headline.map((line, index) => <span key={`${line}-${index}`} className="block">{line}</span>)}
						</h2>
					</RevealOnScroll>

					<div className="section-copy mx-auto mt-10 max-w-[620px] space-y-10 text-white/94">
						{copy.paragraphs.map((paragraph, index) => (
							<RevealOnScroll key={index} variants={fadeUp} delay={0.12 * index}>
								<p className="text-balance">
									{paragraph.split('\n').map((line, i) => (
										<span key={i}>
											{line}
											{i < paragraph.split('\n').length - 1 && <br />}
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
