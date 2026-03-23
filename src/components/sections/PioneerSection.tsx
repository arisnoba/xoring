import Image from 'next/image';
import RingArtwork from '@/components/shared/RingArtwork';
import SectionContainer from '@/components/shared/SectionContainer';

export default function PioneerSection() {
	return (
		<section className="relative isolate overflow-hidden bg-[#f6f6f4] text-[#111]">
			<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.52),rgba(255,255,255,0.2))]" />
			<SectionContainer className="relative grid items-center gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
				<div className="flex flex-col items-center justify-center gap-10">
					<div className="w-full max-w-[560px]">
						<RingArtwork tone="dark" mark="x" className="w-full" />
					</div>
					<Image src="/assets/images/logo.svg" alt="XO RING" width={320} height={220} className="h-auto w-[min(52vw,320px)]" unoptimized />
				</div>

				<div className="mx-auto max-w-[760px] text-center">
					<h2 className="pioneer-section__title section-title section-title--compact text-balance text-[#35363a]">The 500 Pioneers</h2>

					<div className="section-copy mt-10 space-y-10 text-[#3a3b3f]">
						<p>
							We don&apos;t do mass production.
							<br />
							Not just to be scarce.
						</p>
						<p>
							Instead of wasting electricity,
							<br />
							we are looking for 500 &apos;pioneers&apos;
							<br />
							who will prove their real presence through action.
						</p>
					</div>

					<div className="mt-12">
						<p className="text-[1.1rem] font-medium text-[#a0a0a5]">Global Limited 500 Pieces</p>
						<p className="text-[clamp(4rem,7vw,6.4rem)] font-black tracking-tight text-[#6a6b70]">$499</p>
						<button className="inline-flex min-w-[204px] items-center justify-center rounded-full bg-[#171717] px-8 py-3 text-lg font-semibold text-white shadow-[0_18px_50px_rgba(17,24,39,0.14)] transition-all duration-200 hover:bg-[#2c2c2e] hover:shadow-[0_22px_55px_rgba(17,24,39,0.2)] active:scale-[0.97] active:-translate-y-px">
							Coming Soon
						</button>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
