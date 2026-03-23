import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import SectionBackground from '@/components/shared/SectionBackground';
import SectionContainer from '@/components/shared/SectionContainer';

const topCards = [
	{
		title: 'XORing',
		body: 'Workout and behavioral data collected via XORing and the app are logged and submitted to the AIOS network for PoC.',
		image: '/assets/images/poc/XORing.png',
		imageAlt: 'XORing smart ring',
	},
	{
		title: 'AIOS Network',
		body: 'The network generates activity blocks at fixed intervals and fairly distributes rewards based on data verification.',
		image: '/assets/images/poc/AIOS%20Network.png',
		imageAlt: 'AIOS Network',
	},
];

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
		<section className="relative isolate overflow-hidden bg-[#070707] text-white">
			<SectionBackground desktopSrc="/assets/images/poc/bg-desk.jpg" mobileSrc="/assets/images/poc/bg-mo.jpg" />
			<SectionContainer className="relative max-w-[1280px]!">
				<div className="mx-auto max-w-[940px] text-center">
					<p className="text-[1rem] font-bold tracking-[0.08em] text-white/55">AIOS · PoC</p>
					<h2 className="poc-section__title section-title mt-4 text-balance text-white">The Value of Sweat</h2>
					<p className="section-copy mx-auto mt-8 max-w-[820px] text-balance text-white/92">
						The sweat from your walks and runs becomes real value. Get fairly rewarded for your time and consistency.
					</p>
				</div>

				<div className="mt-14 flex flex-col md:flex-row items-center gap-11 justify-center">
					{/* Card 1: XORing */}
					<div className="relative rounded-[20px] bg-[rgba(52,52,52,0.5)] p-[10px] max-w-[300px] aspect-2/3">
						<div className="aspect-[1.37] overflow-hidden rounded-[12px]">
							<Image src={topCards[0].image} alt={topCards[0].imageAlt} width={274} height={200} className="h-full w-full object-cover" unoptimized />
						</div>
						<div className="py-6">
							<h3 className="mt-4 text-2xl font-semibold">{topCards[0].title}</h3>
							<p className="mt-2 text-sm font-normal leading-normal text-white/72">{topCards[0].body}</p>
						</div>
					</div>

					{/* Phone */}
					<div className="w-full max-w-[482px]">
						<Image src="/assets/images/poc/phone-01-pc.png" alt="Activity Data Interface" width={410} height={820} className="hidden h-auto w-full object-contain xl:block" unoptimized />
						<Image src="/assets/images/poc/phone-01-mo.png" alt="Activity Data Interface" width={410} height={820} className="h-auto w-full object-contain xl:hidden" unoptimized />
					</div>

					{/* Card 2: AIOS Network */}
					<div className="rounded-[20px] bg-[rgba(52,52,52,0.5)] p-[10px] max-w-[300px] aspect-2/3">
						<div className="aspect-[1.37] overflow-hidden rounded-[12px]">
							<Image src={topCards[1].image} alt={topCards[1].imageAlt} width={274} height={200} className="h-full w-full object-cover" unoptimized />
						</div>
						<div className="py-6">
							<h3 className="mt-4 text-2xl font-semibold">{topCards[1].title}</h3>
							<p className="mt-2 text-sm font-normal leading-normal text-white/72">{topCards[1].body}</p>
						</div>
					</div>
				</div>

				<p className="section-copy mx-auto mt-16 max-w-[760px] text-balance text-center text-white/92">
					If a computer can prove its value by solving complex puzzles, human movement can prove its value, too.
				</p>

				<div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-[24px]">
					{steps.map((step, index) => (
						<React.Fragment key={step.label}>
							<div className="flex w-[155px] shrink-0 flex-col items-center gap-[20px] text-center">
								<Image src={step.icon} alt={step.label} width={100} height={100} className="h-[100px] w-[100px] object-contain" />
								<p className="text-[14px] leading-normal text-white">{step.label}</p>
							</div>
							{index < steps.length - 1 && (
								<ChevronRight className="hidden md:block h-[32px] w-[32px] text-white shrink-0" strokeWidth={2} />
							)}
						</React.Fragment>
					))}
				</div>

				<div className="mt-16 flex flex-col md:flex-row gap-3 md:gap-6 justify-center">
					{bottomCards.map(card => (
						<article key={card.title} className="rounded-[24px] bg-[#333]/50 px-6 py-7 max-w-[310px]">
							<h3 className="section-copy font-bold tracking-tight">{card.title}</h3>
							<p className="mt-4 text-[14px] font-medium leading-[1.7] text-white/72">{card.body}</p>
						</article>
					))}
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
