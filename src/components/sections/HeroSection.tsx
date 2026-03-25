'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
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

// 앵커 근처 판정 허용 범위
const HERO_SCROLL_TOLERANCE = 80;
// 모바일 스와이프 트리거 최소 거리
const HERO_TOUCH_THRESHOLD = 30;
// 휠 실수 트리거 방지 최소 delta
const HERO_WHEEL_MIN_DELTA = 5;

type HeroStage = 'intro' | 'overlay';

// Base64 encoded SVG
const LOGO_BASE64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQiIGhlaWdodD0iODQiIHZpZXdCb3g9IjAgMCA4NCA4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMgMzJDMTMgMjAuOTU0MyAyMS45NTQzIDEyIDMzIDEyQzQ0LjA0NTcgMTIgNTMgMjAuOTU0MyA1MyAzMkM1MyA0My4wNDU3IDQ0LjUgNDcuNSAzMyA1Mkg1M0M1MyA2My4wNDU3IDQ0LjA0NTcgNzIgMzMgNzJDMjEuOTU0MyA3MiAxMyA2My4wNDU3IDEzIDUyQzEzIDQwLjk1NDMgMjIuNSAzNCAzMyAzMkgxM1oiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTUzIDcyQzY0LjczMjQgNjcuMDk3NyA3MyA1NS41MTE3IDczIDQyQzczIDI4LjQ4ODMgNjQuNzMyNCAxNi45MDIzIDUzIDEyVjcyWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=";

// 마스크 스타일
const maskStyle = {
	WebkitMaskImage: `url('${LOGO_BASE64}')`,
	WebkitMaskSize: '100vw',
	WebkitMaskPosition: 'center',
	WebkitMaskRepeat: 'no-repeat',
	maskImage: `url('${LOGO_BASE64}')`,
	maskSize: '100vw',
	maskPosition: 'center',
	maskRepeat: 'no-repeat',
} as const;

// 그리드 애니메이션 설정
const GRID_CONFIG = {
	background: {
		color: "#6D28D9",
		maxOpacity: 0.15,
		flickerChance: 0.12,
		squareSize: 4,
		gridGap: 4,
	},
	logo: {
		color: "#7C3AED",
		maxOpacity: 0.65,
		flickerChance: 0.18,
		squareSize: 3,
		gridGap: 6,
	},
} as const;

export default function HeroSection() {
	const lenis = useLenis();
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

		const getIntroAnchor = () => section.offsetTop;
		const getOverlayAnchor = () => section.offsetTop + window.innerHeight;
		const isNearAnchor = (anchor: number) => Math.abs(window.scrollY - anchor) <= HERO_SCROLL_TOLERANCE;

		const currentStage = { value: 'intro' as HeroStage };
		const isHeroActive = { value: window.scrollY < section.offsetTop + section.offsetHeight };
		const touchStartY = { value: null as number | null };

		// Lenis easing — expo out 느낌
		const lenisEasing = (t: number) => 1 - Math.pow(1 - t, 4);

		let cleanupInteractions = () => {};

		const ctx = gsap.context(() => {
			gsap.set(slider, { y: '100%' });
			gsap.set(overlayText, { opacity: 0, y: 20 });

			if (!prefersReducedMotion && introLogo && introStoreButtons && introRingArtwork) {
				gsap.timeline()
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

			// scrub: true — Lenis가 스크롤을 당길 때 애니메이션이 자연스럽게 따라옴
			// snap 없음 — lenis.scrollTo가 정확한 앵커까지 이동 담당
			const animTl = gsap.timeline();
			animTl
				.to(slider, { y: '0%', ease: 'none', duration: 1 }, 0)
				.to(overlayText, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.5 }, 0.5);

			ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: () => `+=${window.innerHeight}`,
				scrub: true,
				animation: animTl,
				onUpdate: (self) => {
					syncHeroHeaderTheme(self.progress > 0.5 ? 'dark' : 'light');
				},
				onLeave: () => { isHeroActive.value = false; syncHeroHeaderTheme('dark'); },
				onLeaveBack: () => { isHeroActive.value = false; syncHeroHeaderTheme('light'); },
				onEnter: () => { isHeroActive.value = true; },
				onEnterBack: () => { isHeroActive.value = true; },
			});

			// lenis.scrollTo로 앵커까지 부드럽게 이동 — 이동 중 scrub이 자연스럽게 따라옴
			const navigateTo = (stage: HeroStage) => {
				if (currentStage.value === stage) return;
				currentStage.value = stage;
				lenis?.scrollTo(stage === 'overlay' ? getOverlayAnchor() : getIntroAnchor(), {
					duration: 0.9,
					easing: lenisEasing,
				});
			};

			// PC: 휠 이벤트로 방향 감지 → lenis가 앵커까지 당김
			const onWheel = (event: WheelEvent) => {
				if (prefersReducedMotion || !isHeroActive.value) return;
				if (event.deltaY > HERO_WHEEL_MIN_DELTA && currentStage.value === 'intro' && isNearAnchor(getIntroAnchor())) {
					event.preventDefault();
					navigateTo('overlay');
				} else if (event.deltaY < -HERO_WHEEL_MIN_DELTA && currentStage.value === 'overlay' && isNearAnchor(getOverlayAnchor())) {
					event.preventDefault();
					navigateTo('intro');
				}
			};

			// 모바일: touchend에서 방향 판정 → lenis가 앵커까지 당김
			// touchmove에는 개입 안 함 — Lenis가 자연스럽게 처리
			const onTouchStart = (event: TouchEvent) => {
				if (prefersReducedMotion) return;
				touchStartY.value = event.touches[0]?.clientY ?? null;
			};

			const onTouchEnd = (event: TouchEvent) => {
				if (prefersReducedMotion || touchStartY.value === null || !isHeroActive.value) return;
				const endY = event.changedTouches[0]?.clientY ?? touchStartY.value;
				const deltaY = touchStartY.value - endY;
				touchStartY.value = null;

				if (deltaY > HERO_TOUCH_THRESHOLD && currentStage.value === 'intro' && isNearAnchor(getIntroAnchor())) {
					navigateTo('overlay');
				} else if (deltaY < -HERO_TOUCH_THRESHOLD && currentStage.value === 'overlay' && isNearAnchor(getOverlayAnchor())) {
					navigateTo('intro');
				}
			};

			window.addEventListener('wheel', onWheel, { passive: false });
			window.addEventListener('touchstart', onTouchStart, { passive: true });
			window.addEventListener('touchend', onTouchEnd, { passive: true });

			cleanupInteractions = () => {
				window.removeEventListener('wheel', onWheel);
				window.removeEventListener('touchstart', onTouchStart);
				window.removeEventListener('touchend', onTouchEnd);
			};
		}, section);

		return () => {
			cleanupInteractions();
			ctx.revert();
			delete document.documentElement.dataset.heroHeaderTheme;
			window.dispatchEvent(new Event('xoring:hero-header-theme-change'));
		};
	}, [lenis]);

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
					<FlickeringGrid
						className={`absolute inset-0 z-0 mask-[radial-gradient(1000px_circle_at_center,white,transparent)] motion-safe:animate-pulse`}
						{...GRID_CONFIG.background}
					/>
					<div 
						className="absolute inset-0 z-0 translate-y-[2vh] motion-safe:animate-fade-in" 
						style={{
							...maskStyle,
							animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
						}}
					>
						<FlickeringGrid {...GRID_CONFIG.logo} />
					</div>
				</div>

				{/* 패널 0: Intro — 가장 아래 (z-10) */}
				<div className="absolute inset-0 z-10 pointer-events-none">
					<SectionContainer className="flex h-full min-h-0 items-center py-0">
						<div className="flex w-full flex-col-reverse items-center justify-center gap-8 md:gap-12 lg:flex-row lg:justify-between lg:gap-6">
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
