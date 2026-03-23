'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RingArtwork from '@/components/shared/RingArtwork';
import SectionContainer from '@/components/shared/SectionContainer';
import StoreButtons from '@/components/shared/StoreButtons';
import { MANIFESTO } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const overlayCopy = [
	'Not just another smart ring',
	'that tracks your health.',
	'The more you breathe and move,',
	'the deeper you connect.',
	'',
	'Meet XORing,',
	'the world’s first social smart ring.',
];

const HERO_DARK_THEME_THRESHOLD = 0.18;

export default function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const overlayTextRef = useRef<HTMLDivElement>(null);
	const introLeftRef = useRef<HTMLDivElement>(null);
	const introRingRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const overlay = overlayRef.current;
		const overlayText = overlayTextRef.current;
		const introLeft = introLeftRef.current;
		const introRing = introRingRef.current;

		if (!section || !overlay || !overlayText || !introLeft || !introRing) return;

		let heroHeaderTheme: 'light' | 'dark' = 'light';
		const syncHeroHeaderTheme = (nextTheme: 'light' | 'dark') => {
			if (heroHeaderTheme === nextTheme) return;
			heroHeaderTheme = nextTheme;
			document.documentElement.dataset.heroHeaderTheme = nextTheme;
			window.dispatchEvent(new Event('xoring:hero-header-theme-change'));
		};

		document.documentElement.dataset.heroHeaderTheme = 'light';
		window.dispatchEvent(new Event('xoring:hero-header-theme-change'));

		const ctx = gsap.context(() => {
			gsap.set(overlay, { opacity: 0 });
			gsap.set(overlayText, { opacity: 0, y: 56 });

			const timeline = gsap.timeline({
				defaults: { ease: 'none' },
				scrollTrigger: {
					trigger: section,
					start: 'top top',
					end: 'bottom bottom',
					scrub: true,
					onUpdate: self => {
						syncHeroHeaderTheme(self.progress >= HERO_DARK_THEME_THRESHOLD ? 'dark' : 'light');
					},
				},
			});

			timeline
				.to(overlay, { opacity: 1 }, 0)
				.to(introLeft, { opacity: 0 }, 0)
				.to(
					introRing,
					{
						opacity: 0.42,
						scale: 0.96,
						x: -24,
						y: 10,
						rotate: -6,
						filter: 'blur(18px)',
					},
					0
				)
				.to(overlayText, { opacity: 1, y: 0 }, 0.18);
		}, section);

		return () => {
			ctx.revert();
			delete document.documentElement.dataset.heroHeaderTheme;
			window.dispatchEvent(new Event('xoring:hero-header-theme-change'));
		};
	}, []);

	return (
		<section id="hero" ref={sectionRef} data-header-theme="light" className="relative h-[220vh] bg-[#f5f5f7]">
			<div className="sticky top-0 h-[100dvh] overflow-hidden">
				<div className="absolute inset-0 bg-[#f5f5f7]">
					<SectionContainer className="flex h-full min-h-0 items-center py-0">
						<div className="flex w-full flex-col-reverse items-center justify-center gap-8 md:gap-12 lg:flex-row lg:justify-between lg:gap-6">
							<div ref={introLeftRef} className="flex flex-col items-center justify-center gap-8 lg:items-start lg:gap-10">
								<div>
									<h1 className="sr-only">XO RING</h1>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src="/assets/images/logo-v.svg" alt="XO" width={427} height={310} className="h-auto w-[min(56vw,280px)] md:w-[min(48vw,340px)] lg:w-[min(68vw,427px)]" />
								</div>
								<div className="flex w-full items-center justify-center lg:justify-start">
									<StoreButtons
										variant="light"
										googleFirst
										className="gap-4 flex-col sm:flex-row"
										buttonClassName="min-w-[150px] justify-center border-white/70 px-6 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
									/>
								</div>
							</div>

							<div ref={introRingRef} className="relative flex w-full items-center justify-center lg:justify-end lg:-mr-12 xl:mr-0">
								<RingArtwork className="w-[72vw] max-w-[400px] md:w-[56vw] md:max-w-[480px] lg:w-[45vw] lg:max-w-[760px]" />
							</div>
						</div>
					</SectionContainer>
				</div>

				<div ref={overlayRef} className="absolute inset-0 overflow-hidden bg-black/90 backdrop-blur-[2px] pointer-events-none">
					<SectionContainer className="relative flex h-full min-h-0 items-center justify-center py-0">
						<div ref={overlayTextRef} className="flex max-w-[860px] flex-col items-center text-center text-white">
							<h2 className="section-title section-title--hero text-balance text-white">
								{MANIFESTO.headline.split('\n').map((line, index) => (
									<span key={line}>
										{line}
										{index < MANIFESTO.headline.split('\n').length - 1 && <br />}
									</span>
								))}
							</h2>

							<p className="hero-section__copy section-copy mt-10 text-balance text-white/92">
								{overlayCopy.map((line, index) => (
									<span key={`${line}-${index}`}>
										{line || <span className="block h-5" aria-hidden="true" />}
										{line && <br />}
									</span>
								))}
							</p>
						</div>
					</SectionContainer>
				</div>
			</div>
		</section>
	);
}
