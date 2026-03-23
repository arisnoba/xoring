import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import SectionBackground from '@/components/shared/SectionBackground';
import SectionContainer from '@/components/shared/SectionContainer';

const bottomCards = [
	{
		title: 'From PoW to PoC',
		body: 'The era of computers wasting energy to mine is over. We are entering an era where your steps and sweat become real value.',
	},
	{
		title: 'Movement equals Value',
		body: 'Get rewarded fairly for the time and consistency of your workouts. Lost Bitcoin is reborn through your footsteps.',
	},
	{
		title: 'The Data AI Wants Most',
		body: 'As AI evolves, it doesn’t just need massive computing power. It needs real human data consistent with your actual movement and sweat.',
	},
];

const steps = [
	{ label: 'Wear XORing', icon: '/assets/images/poc/icon-01.svg' },
	{ label: 'Collect Activity Data', icon: '/assets/images/poc/icon-02.svg' },
	{ label: 'Proof of Contribution', icon: '/assets/images/poc/icon-03.svg' },
	{ label: 'Mine AIOS', icon: '/assets/images/poc/icon-04.svg' },
];

export default function PocSection() {
	return (
		<section data-header-theme="dark" className="relative isolate overflow-hidden bg-[#070707] text-white">
			<SectionBackground desktopSrc="/assets/images/poc/bg-desk.jpg" mobileSrc="/assets/images/poc/bg-mo.jpg" />
			<SectionContainer className="relative max-w-[1280px]! space-y-30 section-container__poc">
				<div>
					<div className="mx-auto max-w-[940px] text-center">
						<p className="text-[1rem] font-bold tracking-[0.08em] text-white/55">AIOS · PoC</p>
						<h2 className="poc-section__title section-title mt-4 text-balance text-white">The Value of Sweat</h2>
						<p className="section-copy mx-auto mt-8 max-w-[820px] text-balance text-white/92">
							The sweat from your walks and runs becomes real value. Get fairly rewarded for your time and consistency.
						</p>
					</div>

					<div className="mt-14 flex flex-col md:flex-row items-center gap-8 xl:gap-11 justify-center">
						{/* Phone */}
						<div className="w-full max-w-[1200px] px-4 sm:px-0 mx-auto">
							<Image src="/assets/images/poc/01-desk.webp" alt="Activity Data Interface" width={1200} height={600} className="hidden h-auto w-full object-contain sm:block" unoptimized />
							<Image src="/assets/images/poc/01-mo.webp" alt="Activity Data Interface" width={410} height={820} className="h-auto w-full object-contain sm:hidden" unoptimized />
						</div>
					</div>
				</div>

				<div>
					<p className="section-copy mx-auto mt-16 max-w-[760px] text-balance text-center text-white/92">
						If a computer can prove its value by solving complex puzzles, human movement can prove its value, too.
					</p>

					<div className="mt-14 grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-x-2 gap-y-6 lg:flex lg:flex-row lg:justify-center lg:gap-[24px]">
						{steps.map((step, index) => (
							<React.Fragment key={step.label}>
								<div className="flex w-[140px] md:w-[155px] shrink-0 flex-col items-center gap-[16px] md:gap-[20px] text-center">
									<Image src={step.icon} alt={step.label} width={100} height={100} className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] object-contain" />
									<p className="text-[13px] md:text-[14px] leading-normal text-white text-balance">{step.label}</p>
								</div>

								{index < steps.length - 1 && (
									<>
										{/* Desktop Arrow */}
										<ChevronRight className="hidden lg:block h-[32px] w-[32px] text-white shrink-0" strokeWidth={2} />

										{/* Mobile Arrow */}
										{index % 2 === 0 && <ChevronRight className="lg:hidden h-[24px] w-[24px] text-white shrink-0" strokeWidth={2} />}
									</>
								)}
							</React.Fragment>
						))}
					</div>

					<div className="mt-16 flex flex-col items-center md:flex-row md:items-stretch gap-4 md:gap-6 justify-center">
						{bottomCards.map(card => (
							<article key={card.title} className="w-full rounded-[24px] bg-[#333]/50 px-6 py-7 max-w-[310px]">
								<h3 className="section-copy font-bold tracking-tight">{card.title}</h3>
								<p className="mt-4 text-[14px] font-medium leading-[1.7] text-white/72">{card.body}</p>
							</article>
						))}
					</div>
				</div>

				<div className="mt-20 text-center">
					<p className="section-copy mx-auto max-w-[860px] text-balance text-white/94">Prove your value with just the XORing app. Wear the ring to capture richer data and boost your rewards.</p>

					<div className="mx-auto mt-12 flex w-fit flex-col items-center max-w-[512px]">
						<Image src="/assets/images/poc/phone.png" alt="XO App Interface" width={500} height={1000} className="h-auto w-full object-contain" />
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
