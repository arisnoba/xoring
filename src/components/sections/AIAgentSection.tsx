import Image from 'next/image';
import SectionBackground from '@/components/shared/SectionBackground';
import SectionContainer from '@/components/shared/SectionContainer';
import { AI_AGENT } from '@/lib/constants';

const agents = [
	{
		title: 'AI Health Agent',
		image: '/assets/images/agent-health.png',
		description: 'Analyzes heart rate, blood oxygen, and sleep to provide real-time fatigue prediction and personalized workout management.',
	},
	{
		title: 'AI Emotional Agent',
		image: '/assets/images/agent-emotion.png',
		description: 'Detects stress levels through heart rate variability and activity, automatically recommending meditation or the perfect playlist.',
	},
	{
		title: 'AI Social Agent',
		image: '/assets/images/agent-social.png',
		description: 'Reads your network status via the ring’s direction (O/X) and finds nearby users who share your interests and lifestyle.',
	},
	{
		title: 'AI Behavior Agent',
		image: '/assets/images/agent-behavior.png',
		description: '“Burn 400kcal more for a bonus.” Sets activity goals and rewards you with PoC tokens when you achieve them.',
	},
];

export default function AIAgentSection() {
	return (
		<section id="aios" data-header-theme="light" className="relative isolate overflow-hidden bg-[#efefec] text-[#111]">
			<SectionBackground desktopSrc="/assets/images/aiagent/bg-desk.jpg" mobileSrc="/assets/images/aiagent/bg-mo.jpg" opacity={0.3} />

			<SectionContainer className="relative">
				<div className="mx-auto max-w-[920px] text-center">
					<p className="text-[1rem] font-bold tracking-[0.08em] text-[#8a8a8a]">AI AGENT</p>
					<h2 className="section-title section-title--tight mt-4 text-balance text-[#171717]">
						{AI_AGENT.headline.split('\n').map((line, index, arr) => (
							<span key={line}>
								{line}
								{index < arr.length - 1 && <br />}
							</span>
						))}
					</h2>
					<p className="section-copy mx-auto mt-8 max-w-[980px] text-balance text-[#2d2d31]">{AI_AGENT.subtext}</p>
				</div>

				<div className="mt-16 grid grid-cols-2 justify-center gap-x-8 gap-y-16 min-[769px]:flex min-[769px]:grid-cols-none min-[769px]:flex-row min-[769px]:gap-10">
					{agents.map(agent => (
						<div key={agent.title} className="flex flex-col items-center gap-6">
							<h3 className="text-center section-copy font-semibold tracking-tight text-[#1e1e1f]">{agent.title}</h3>
							<div className="relative w-full max-w-[220px]">
								<Image src={agent.image} alt={agent.title} width={440} height={880} className="h-auto w-full object-contain" />
							</div>
							<div className="max-w-[250px] rounded-[10px] md:rounded-[20px] bg-white/86 px-5 py-5 text-center shadow-[0_18px_40px_rgba(17,24,39,0.08)]">
								<p className="text-[0.98rem] font-medium leading-[1.55] text-[#44454a]">{agent.description}</p>
							</div>
						</div>
					))}
				</div>
			</SectionContainer>
		</section>
	);
}
