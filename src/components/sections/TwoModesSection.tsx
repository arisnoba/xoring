'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionContainer from '@/components/shared/SectionContainer';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { fadeUp } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function TwoModesSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const oIndicatorRef = useRef<HTMLDivElement>(null);
	const xIndicatorRef = useRef<HTMLDivElement>(null);
	const modeRef = useRef<'O' | 'X'>('O');

	useEffect(() => {
		const section = sectionRef.current;
		const video = videoRef.current;
		const oIndicator = oIndicatorRef.current;
		const xIndicator = xIndicatorRef.current;

		if (!section || !video || !oIndicator || !xIndicator) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		video.pause();
		video.currentTime = 0;

		const updateModeVisuals = (mode: 'O' | 'X') => {
			const isO = mode === 'O';
			const oText = oIndicator.querySelector<HTMLElement>('.mode-text');
			const xText = xIndicator.querySelector<HTMLElement>('.mode-text');
			const oIcon = oIndicator.querySelector<HTMLElement>('.mode-icon');
			const xIcon = xIndicator.querySelector<HTMLElement>('.mode-icon');
			gsap.to(oText, { opacity: isO ? 1 : 0.45, duration: 0.3, ease: 'power2.out' });
			gsap.to(xText, { opacity: isO ? 0.45 : 1, duration: 0.3, ease: 'power2.out' });
			gsap.to(oIcon, { filter: isO ? 'brightness(0) invert(1)' : 'none', duration: 0.3, ease: 'power2.out' });
			gsap.to(xIcon, { filter: isO ? 'none' : 'brightness(0) invert(1)', duration: 0.3, ease: 'power2.out' });
		};

		let ctx: ReturnType<typeof gsap.context> | null = null;
		let removeReadyListener: (() => void) | null = null;

		const initScrollScrub = () => {
			ctx = gsap.context(() => {
				const scrubEndTime = Math.max(video.duration - 0.001, 0);
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: section,
						start: 'top top',
						end: 'bottom bottom',
						scrub: 0.5,
						onUpdate: self => {
							const newMode = self.progress < 0.5 ? 'O' : 'X';
							if (newMode !== modeRef.current) {
								modeRef.current = newMode;
								updateModeVisuals(newMode);
							}
						},
					},
				});
				tl.to(video, { currentTime: scrubEndTime, ease: 'none' });
			}, section);
		};

		const handleVideoReady = () => {
			if (ctx) return;
			initScrollScrub();
		};

		if (video.readyState >= 3) {
			handleVideoReady();
		} else {
			video.addEventListener('canplay', handleVideoReady);
			removeReadyListener = () => {
				video.removeEventListener('canplay', handleVideoReady);
			};
		}

		return () => {
			removeReadyListener?.();
			ctx?.revert();
		};
	}, []);

	return (
		<section id="modes" ref={sectionRef} data-header-theme="dark" className="two-modes-section relative bg-[#141414] text-white h-[300vh]">
			<div className="sticky top-0 h-[100dvh] overflow-hidden">
				<SectionContainer className="flex flex-col items-center justify-center">
					<RevealOnScroll variants={fadeUp}>
						<div className="max-w-[860px] text-center">
							<p className="text-balance section-title font-black">
								<span className="block">One ring,</span>
								<span className="block">Two Modes.</span>
							</p>
						</div>
					</RevealOnScroll>

					<div className="relative mt-14 flex w-full items-center justify-center md:mt-16">
						<div className="relative z-10 w-[50vw] max-w-[310px] -top-[21px]">
							<video
								ref={videoRef}
								src="/assets/video/change-ring_optim.mp4"
								poster="/assets/video/change-ring_optim.jpg"
								muted
								playsInline
								preload="auto"
								aria-hidden="true"
								className="block w-full h-auto"
							/>
						</div>
					</div>

					<div className="mt-12 grid w-full max-w-[320px] grid-cols-[1fr_auto_1fr] items-start gap-2 px-2 sm:max-w-[420px] sm:gap-4 md:mt-16 md:max-w-[580px] md:gap-5 md:px-0">
						<div ref={oIndicatorRef} className="flex w-full flex-col items-center gap-3 text-center md:gap-5">
							<span className="flex h-[64px] w-[64px] items-center justify-center sm:h-[80px] sm:w-[80px] md:h-[116px] md:w-[116px]">
								<Image src="/assets/images/icon-o.svg" alt="" aria-hidden="true" width={116} height={116} className="mode-icon h-auto w-full" style={{ filter: 'brightness(0) invert(1)' }} />
							</span>
							<span className="mode-text block text-balance text-[0.75rem] font-medium leading-[1.15] sm:text-[0.9rem] md:text-[clamp(1.1rem,1.7vw,1.5rem)] text-white">
								<span className="block">Connect with</span>
								<span className="block">the world</span>
							</span>
						</div>

						<div className="flex h-[64px] w-[64px] flex-col items-center gap-2 text-center text-white md:gap-3 sm:h-[80px] sm:w-[80px] md:h-[116px] md:w-[116px]" aria-hidden="true">
							<span className="block h-5 w-px bg-white/80 sm:h-7 md:h-9" />
							<span className="block whitespace-nowrap text-[0.65rem] font-medium text-white/95 sm:text-[0.8rem] md:text-[1.05rem]">Twist to switch</span>
							<span className="block h-5 w-px bg-white/80 sm:h-7 md:h-9" />
						</div>

						<div ref={xIndicatorRef} className="flex w-full flex-col items-center gap-3 text-center md:gap-5">
							<span className="flex h-[64px] w-[64px] items-center justify-center sm:h-[80px] sm:w-[80px] md:h-[116px] md:w-[116px]">
								<Image src="/assets/images/icon-x.svg" alt="" aria-hidden="true" width={116} height={116} className="mode-icon h-auto w-full" style={{ filter: 'none' }} />
							</span>
							<span className="mode-text block text-balance text-[0.75rem] font-medium leading-[1.15] sm:text-[0.9rem] md:text-[clamp(1.1rem,1.7vw,1.5rem)]" style={{ opacity: 0.45 }}>
								<span className="block">Focus on</span>
								<span className="block">yourself</span>
							</span>
						</div>
					</div>
				</SectionContainer>
			</div>
		</section>
	);
}
