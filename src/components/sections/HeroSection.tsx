'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroRingVideo from '@/components/shared/HeroRingVideo';
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
	"the world's first social smart ring.",
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

		const introLogo = introLeft.querySelector<HTMLElement>('.hero-logo');
		const introStoreButtons = introLeft.querySelector<HTMLElement>('.hero-store-buttons');
		const introRingArtwork = introRing.querySelector<HTMLElement>('.hero-section__artwork');
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

			if (!prefersReducedMotion && introLogo && introStoreButtons && introRingArtwork) {
				// ScrollTrigger owns the outer ring container. The intro animation only touches an inner wrapper
				// so scrolling back to the hero cannot leave the scrubbed node at an incorrect opacity.
				const introTl = gsap.timeline();

				introTl
					.from(introLogo, { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' })
					.from(introRingArtwork, { opacity: 0, y: 60, scale: 0.92, duration: 0.7, ease: 'power2.out' }, 0.15)
					.from(introStoreButtons, { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' }, 0.3);
			}

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

				.to(overlayText, { opacity: 1, y: 0 }, 0.18);
		}, section);

		return () => {
			ctx.revert();
			delete document.documentElement.dataset.heroHeaderTheme;
			window.dispatchEvent(new Event('xoring:hero-header-theme-change'));
		};
	}, []);

	return (
		<section id="hero" ref={sectionRef} data-header-theme="light" className="relative h-[220vh] bg-white">
			<div className="sticky top-0 h-[100dvh] overflow-hidden">
				<div className="absolute inset-0 bg-white ">
					<SectionContainer className="flex h-full min-h-0 items-center py-0">
						<div className="flex w-full flex-col-reverse items-center justify-center gap-8 md:gap-12 lg:flex-row lg:justify-between lg:gap-6">
							<div ref={introLeftRef} className="flex flex-col items-center justify-center gap-8 lg:items-start lg:gap-10 xl:min-w-[424px]">
								<div>
									<h1 className="sr-only">XO RING</h1>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src="/assets/images/logo-v.svg" alt="XO" width={427} height={310} className="hero-logo hero-section__logo h-auto" />
								</div>
								<div className="hero-store-buttons flex w-full items-center justify-center">
									<StoreButtons
										variant="light"
										googleFirst
										className="gap-2 sm:gap-4 flex-row"
										buttonClassName="min-w-[150px] justify-center border-white/70 px-6 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
									/>
								</div>
							</div>

							<div ref={introRingRef} className="relative flex w-full items-center justify-center lg:justify-end lg:-mr-12 xl:mr-0">
								<HeroRingVideo className="hero-section__artwork" />
							</div>
						</div>
					</SectionContainer>
				</div>

				<div ref={overlayRef} className="pointer-events-none absolute inset-0 overflow-hidden bg-black/90 opacity-0 backdrop-blur-[10px]">
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
