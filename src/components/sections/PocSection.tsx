import Image from 'next/image';
import { ArrowDown, ArrowRight, Coins, Dumbbell, FileText, Smartphone } from 'lucide-react';
import PhoneMockup from '@/components/shared/PhoneMockup';
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
	{ icon: Dumbbell, label: 'Wear XORing' },
	{ icon: Smartphone, label: 'Collect Activity Data' },
	{ icon: FileText, label: 'Proof of Contribution' },
	{ icon: Coins, label: 'Mine AIOS' },
];

export default function PocSection() {
	return (
		<section className="relative isolate overflow-hidden bg-[#070707] text-white">
			<div className="absolute h-full w-full bg-[url('/assets/images/bg-05.jpg')] bg-cover bg-center bg-no-repeat opacity-15 section-bg"></div>
			<SectionContainer className="relative max-w-[1280px]!">
				<div className="mx-auto max-w-[940px] text-center">
					<p className="text-[1rem] font-bold tracking-[0.08em] text-white/55">AIOS · PoC</p>
					<h2 className="poc-section__title section-title mt-4 text-balance text-white">The Value of Sweat</h2>
					<p className="section-copy mx-auto mt-8 max-w-[820px] text-balance text-white/92">
						The sweat from your walks and runs becomes real value. Get fairly rewarded for your time and consistency.
					</p>
				</div>

				<div className="mt-14 flex items-center gap-6 justify-center">
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

				<div className="mt-14 grid gap-6 md:grid-cols-4">
					{steps.map((step, index) => {
						const Icon = step.icon;
						return (
							<div key={step.label} className="flex flex-col items-center gap-5 text-center">
								<div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/8 text-white/92">
									<Icon size={34} strokeWidth={1.8} />
								</div>
								<div className="space-y-1">
									<p className="text-sm font-medium text-white/78">{step.label}</p>
								</div>
							</div>
						);
					})}
				</div>

				<div className="mt-16 grid gap-5 lg:grid-cols-3">
					{bottomCards.map(card => (
						<article key={card.title} className="rounded-[24px] border border-white/10 bg-white/7 px-6 py-7">
							<h3 className="text-[24px] font-bold tracking-tight">{card.title}</h3>
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
