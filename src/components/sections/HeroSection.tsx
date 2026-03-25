'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FlickeringGrid } from '@/components/ui/flickering-grid-hero';
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



// 마스크 이미지 경로
const LOGO_MASK_URL = '/assets/images/common/symbol-xo.svg';

// 마스크 스타일
const maskStyle = {
	WebkitMaskImage: `url('${LOGO_MASK_URL}')`,
	WebkitMaskSize: 'min(80vw, 800px)',
	WebkitMaskPosition: 'center',
	WebkitMaskRepeat: 'no-repeat',
	maskImage: `url('${LOGO_MASK_URL}')`,
	maskSize: 'min(80vw, 1920px)',
	maskPosition: 'center',
	maskRepeat: 'no-repeat',
} as const;

// 그리드 애니메이션 설정
const GRID_CONFIG = {
	background: {
		color: '#6D28D9',
		maxOpacity: 0.15,
		flickerChance: 0.12,
		squareSize: 4,
		gridGap: 4,
	},
	logo: {
		color: '#7C3AED',
		maxOpacity: 0.65,
		flickerChance: 0.18,
		squareSize: 3,
		gridGap: 6,
	},
} as const;

export default function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const overlayTextRef = useRef<HTMLDivElement>(null);
	const introLeftRef = useRef<HTMLDivElement>(null);
	const introRingRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const slider = sliderRef.current;
		const overlayText = overlayTextRef.current;
		const introLeft = introLeftRef.current;
		const introRing = introRingRef.current;
		if (!section || !slider || !overlayText || !introLeft || !introRing) return;

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
			gsap.set(slider, { y: '100%' });
			gsap.set(overlayText, { opacity: 0, y: 20 });

			if (!prefersReducedMotion && introLogo && introStoreButtons && introRingArtwork) {
				gsap
					.timeline()
					.from(introLogo, { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' })
					.from(introRingArtwork, { opacity: 0, y: 60, scale: 0.92, duration: 0.7, ease: 'power2.out' }, 0.15)
					.from(introStoreButtons, { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' }, 0.3);
			}

			if (prefersReducedMotion) {
				ScrollTrigger.create({
					trigger: section,
					start: 'center center',
					onEnter: () => {
						gsap.set(slider, { y: '0%' });
						gsap.set(overlayText, { opacity: 1, y: 0 });
						syncHeroHeaderTheme('dark');
					},
					onLeaveBack: () => {
						gsap.set(slider, { y: '100%' });
						gsap.set(overlayText, { opacity: 0, y: 20 });
						syncHeroHeaderTheme('light');
					},
					onLeave: () => syncHeroHeaderTheme('dark'),
				});
				return;
			}

			const animTl = gsap.timeline();
			animTl.to(slider, { y: '0%', ease: 'none', duration: 1 }, 0).to(overlayText, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.5 }, 0.5);

			ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: () => `+=${window.innerHeight}`,
				scrub: true,
				animation: animTl,
				onUpdate: self => {
					syncHeroHeaderTheme(self.progress > 0.5 ? 'dark' : 'light');
				},
				onLeave: () => syncHeroHeaderTheme('dark'),
				onLeaveBack: () => syncHeroHeaderTheme('light'),
			});
		}, section);

		return () => {
			ctx.revert();
			delete document.documentElement.dataset.heroHeaderTheme;
			window.dispatchEvent(new Event('xoring:hero-header-theme-change'));
		};
	}, []);

	return (
		<section id="hero" ref={sectionRef} data-header-theme="light" className="relative h-[200vh] bg-white">
			<div className="sticky top-0 h-dvh overflow-hidden bg-white">
				{/* 패널 1: Overlay — 가장 위 (z-30), 스크롤로 위로 올라옴 */}
				<div ref={sliderRef} style={{ transform: 'translateY(100%)' }} className="absolute inset-0 z-30 overflow-hidden bg-black/50 backdrop-blur-3xl will-change-transform">
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

				{/* 패널 0.5: Flickering Grid — 중간 (z-20, mix-blend-multiply) */}
				<div className="absolute inset-0 z-20 flex w-full h-full justify-center items-center pointer-events-none mix-blend-multiply">
					<FlickeringGrid className={`absolute inset-0 z-0 mask-[radial-gradient(1000px_circle_at_center,white,transparent)] motion-safe:animate-pulse`} {...GRID_CONFIG.background} />
					<div
						className="absolute inset-0 z-0 translate-y-[2vh] motion-safe:animate-fade-in"
						style={{
							...maskStyle,
							animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
						}}>
						<FlickeringGrid {...GRID_CONFIG.logo} />
					</div>
				</div>

				{/* 패널 0: Intro — 가장 아래 (z-10) */}
				<div className="absolute inset-0 z-10 pointer-events-none">
					<SectionContainer className="flex h-full min-h-0 items-center py-0">
						<div className="flex w-full flex-col-reverse items-center justify-center md:gap-12 lg:flex-row lg:justify-between lg:gap-6">
							<div ref={introLeftRef} className="flex flex-col items-center justify-center gap-8 lg:items-start lg:gap-10 xl:min-w-[424px] pointer-events-auto">
								<div>
									<h1 className="sr-only">XO RING</h1>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src="/assets/images/common/logo-v.svg" alt="XO" width={427} height={310} className="hero-logo hero-section__logo h-auto" />
								</div>
								<div className="hero-store-buttons flex w-full items-center justify-center">
									<StoreButtons
										variant="light"
										googleFirst
										className="gap-2 sm:gap-4 flex-row"
										buttonClassName="min-w-[150px] justify-center border-white/70 px-6 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)] border border-black/10"
									/>
								</div>
							</div>

							<div ref={introRingRef} className="relative flex w-full items-center justify-center lg:justify-end lg:-mr-12 xl:mr-0 pointer-events-auto">
								<HeroRingVideo className="hero-section__artwork" />
							</div>
						</div>
					</SectionContainer>
				</div>
			</div>
		</section>
	);
}
