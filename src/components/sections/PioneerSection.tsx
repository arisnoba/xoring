import RevealOnScroll from '@/components/shared/RevealOnScroll';
import RingArtwork from '@/components/shared/RingArtwork';
import FrontierEditionModalFlow from '@/components/sections/FrontierEditionModalFlow';
import SectionContainer from '@/components/shared/SectionContainer';
import { fadeIn, fadeUp, scaleUp } from '@/lib/motion';

export default function PioneerSection() {
	return (
		<section data-header-theme="light" className="relative isolate overflow-hidden bg-[#f6f6f4] text-[#111]">
			<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.52),rgba(255,255,255,0.2))]" />
			<SectionContainer className="relative grid items-center gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
				<div className="flex flex-col items-center justify-center gap-10">
					<RevealOnScroll variants={scaleUp} className="w-full max-w-[560px]">
						<RingArtwork className="w-[50vw] max-w-[500px] lg:w-full m-auto" />
					</RevealOnScroll>
					<RevealOnScroll variants={fadeIn} delay={0.15}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src="/assets/images/common/logo.svg" alt="XO RING" width={320} height={71} className="h-auto w-[min(52vw,320px)]" />
					</RevealOnScroll>
				</div>

				<div className="mx-auto max-w-[760px] text-center">
					<RevealOnScroll variants={fadeUp} delay={0.1}>
						<h2 className="section-title text-balance text-[#35363a]">Frontier Edition</h2>
					</RevealOnScroll>

					<RevealOnScroll variants={fadeUp} delay={0.2}>
						<div className="section-copy mt-10 space-y-8 text-[#202020] text-balance">
							<p>We are inviting the first 000 pioneers to experience XO Ring before anyone else.</p>
							<p>A wearable that turns your actions into real value.</p>
							<p>
								Not for everyone. <br />
								No mass production.
							</p>
						</div>
					</RevealOnScroll>

					<div className="mt-12 space-y-4">
						<RevealOnScroll variants={fadeUp} delay={0.25}>
							<div className="space-y-4">
								<p className="text-sm font-normal text-[#9b9b9b] sm:text-base">Limited — 000 Spots</p>
								<p className="flex flex-wrap items-end justify-center gap-x-3 gap-y-1 bg-gradient-to-r from-[#999999] to-[#333333] bg-clip-text text-transparent">
									<span className="text-[clamp(3.2rem,6.2vw,4.75rem)] font-black leading-none tracking-tight">99.9</span>
									<span className="pb-2 text-[clamp(1.6rem,2.5vw,2.25rem)] font-black leading-none">USDT</span>
									<span className="pb-1 text-[clamp(3rem,5.8vw,4.5rem)] font-thin leading-none text-[#666666]">/</span>
									<span className="text-[clamp(3.2rem,6.2vw,4.75rem)] font-black leading-none tracking-tight">9,999</span>
									<span className="pb-2 text-[clamp(1.6rem,2.5vw,2.25rem)] font-black leading-none">AIOS</span>
								</p>
							</div>
						</RevealOnScroll>
						<RevealOnScroll variants={fadeUp} delay={0.3}>
							<FrontierEditionModalFlow />
						</RevealOnScroll>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
