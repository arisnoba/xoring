'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
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

// 패널 슬라이드 애니메이션 시간.
const HERO_STAGE_DURATION = 0.8;
// 모바일에서 이 거리 이상 스와이프해야 다음 단계 전환으로 해석한다.
const HERO_TOUCH_THRESHOLD = 28;
// 현재 스크롤 위치가 각 단계 앵커 근처인지 판정하는 허용 범위.
const HERO_SCROLL_TOLERANCE = 48;
// wheel 실수 트리거 방지 최소 delta.
const HERO_WHEEL_MIN_DELTA = 5;

type HeroStage = 'intro' | 'overlay';

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

		const currentStage = { value: 'intro' as HeroStage };
		// 페이지 로드 시 hero 섹션이 이미 뷰포트에 있으면 즉시 활성화 (Lenis/ScrollTrigger 초기화 딜레이 방지)
		const isHeroActive = { value: window.scrollY < section.offsetTop + section.offsetHeight };
		const touchStartY = { value: null as number | null };

		const getIntroAnchor = () => section.offsetTop;
		const getOverlayAnchor = () => section.offsetTop + window.innerHeight;
		const isNearAnchor = (anchor: number) => Math.abs(window.scrollY - anchor) <= HERO_SCROLL_TOLERANCE;
		let cleanupInteractions = () => {};

		const ctx = gsap.context(() => {
			// 초기 상태: overlay는 아래에 대기 (y: 100%), 텍스트 숨김
			gsap.set(slider, { y: '100%' });
			gsap.set(overlayText, { opacity: 0, y: 40 });

			// 페이지 진입 시 intro 요소 등장 애니메이션
			if (!prefersReducedMotion && introLogo && introStoreButtons && introRingArtwork) {
				const introTl = gsap.timeline();
				introTl
					.from(introLogo, { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' })
					.from(introRingArtwork, { opacity: 0, y: 60, scale: 0.92, duration: 0.7, ease: 'power2.out' }, 0.15)
					.from(introStoreButtons, { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' }, 0.3);
			}

			// 애니메이션 없이 즉시 상태 동기화 (scroll jump 등)
			// gsap.isTweening 중이면 진행 중인 슬라이드 애니메이션을 끊지 않도록 skip
			const syncStageWithoutMotion = (nextStage: HeroStage) => {
				currentStage.value = nextStage;
				if (!gsap.isTweening(slider)) {
					gsap.set(slider, { y: nextStage === 'overlay' ? '0%' : '100%' });
					gsap.set(overlayText, nextStage === 'overlay' ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 });
				}
				syncHeroHeaderTheme(nextStage === 'overlay' ? 'dark' : 'light');
			};

			// gsap.isTweening으로 중복 방지, 아래에서 슬라이드 업
			const transitionToStage = (nextStage: HeroStage) => {
				if (currentStage.value === nextStage) return;
				if (gsap.isTweening(slider)) return;

				currentStage.value = nextStage;
				const isOverlay = nextStage === 'overlay';

				syncHeroHeaderTheme(isOverlay ? 'dark' : 'light');

				// overlay 패널: 아래에서 올라오거나 아래로 내려감
				// lenis.scrollTo를 동시에 실행하면 두 힘이 충돌해 snap처럼 느껴짐.
				// 대신 애니메이션 완료 후 스크롤 위치를 instant하게 보정한다.
				gsap.to(slider, {
					y: isOverlay ? '0%' : '100%',
					duration: HERO_STAGE_DURATION,
					ease: 'expo.inOut',
					onComplete: () => {
						lenis?.scrollTo(isOverlay ? getOverlayAnchor() : getIntroAnchor(), {
							duration: 0,
							force: true,
						});
					},
				});

				// overlay 텍스트 fade in (슬라이드 진행 중 등장)
				if (isOverlay) {
					gsap.to(overlayText, {
						opacity: 1,
						y: 0,
						duration: HERO_STAGE_DURATION * 0.6,
						delay: HERO_STAGE_DURATION * 0.3,
						ease: 'power3.out',
					});
				} else {
					gsap.to(overlayText, { opacity: 0, y: 40, duration: 0.25, ease: 'power2.in' });
				}
			};

			const shouldMoveToOverlay = () => isHeroActive.value && currentStage.value === 'intro' && isNearAnchor(getIntroAnchor());
			// intro 복귀는 isHeroActive 불필요 — onLeave 이후에도 overlay anchor 근처에서 위로 스크롤하면 전환해야 함
			const shouldMoveToIntro = () => currentStage.value === 'overlay' && isNearAnchor(getOverlayAnchor());

			const onWheel = (event: WheelEvent) => {
				if (prefersReducedMotion) return;
				// 전환 중 스크롤 차단 (CodePen 패턴)
				if (gsap.isTweening(slider)) {
					event.preventDefault();
					return;
				}
				if (event.deltaY > HERO_WHEEL_MIN_DELTA && shouldMoveToOverlay()) {
					event.preventDefault();
					transitionToStage('overlay');
				}
				if (event.deltaY < -HERO_WHEEL_MIN_DELTA && shouldMoveToIntro()) {
					event.preventDefault();
					transitionToStage('intro');
				}
			};

			const onTouchStart = (event: TouchEvent) => {
				if (prefersReducedMotion) return;
				touchStartY.value = event.touches[0]?.clientY ?? null;
			};

			const onTouchMove = (event: TouchEvent) => {
				if (prefersReducedMotion || touchStartY.value === null) return;
				if (gsap.isTweening(slider)) {
					event.preventDefault();
					return;
				}
				const currentY = event.touches[0]?.clientY;
				if (typeof currentY !== 'number') return;
				const deltaY = touchStartY.value - currentY;
				if (Math.abs(deltaY) < HERO_TOUCH_THRESHOLD) return;
				if (deltaY > 0 && shouldMoveToOverlay()) {
					event.preventDefault();
					touchStartY.value = null;
					transitionToStage('overlay');
				}
				if (deltaY < 0 && shouldMoveToIntro()) {
					event.preventDefault();
					touchStartY.value = null;
					transitionToStage('intro');
				}
			};

			const onTouchEnd = () => { touchStartY.value = null; };

			const activeTrigger = ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: 'bottom bottom',
				onEnter: () => { isHeroActive.value = true; },
				onEnterBack: () => { isHeroActive.value = true; },
				onLeave: () => { isHeroActive.value = false; syncStageWithoutMotion('overlay'); },
				onLeaveBack: () => { isHeroActive.value = false; syncStageWithoutMotion('intro'); },
			});

			window.addEventListener('wheel', onWheel, { passive: false });
			window.addEventListener('touchstart', onTouchStart, { passive: true });
			window.addEventListener('touchmove', onTouchMove, { passive: false });
			window.addEventListener('touchend', onTouchEnd);

			cleanupInteractions = () => {
				activeTrigger.kill();
				window.removeEventListener('wheel', onWheel);
				window.removeEventListener('touchstart', onTouchStart);
				window.removeEventListener('touchmove', onTouchMove);
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
			<div className="sticky top-0 h-dvh overflow-hidden">
				{/* 패널 0: Intro — 정적 배경 */}
				<div className="absolute inset-0 bg-white">
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
										buttonClassName="min-w-[150px] justify-center border-white/70 px-6 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)] border border-black/10"
									/>
								</div>
							</div>

							<div ref={introRingRef} className="relative flex w-full items-center justify-center lg:justify-end lg:-mr-12 xl:mr-0">
								<HeroRingVideo className="hero-section__artwork" />
							</div>
						</div>
					</SectionContainer>
				</div>

				{/* 패널 1: Overlay — 아래에서 슬라이드 업으로 intro를 덮음 */}
				<div ref={sliderRef} className="absolute inset-0 overflow-hidden bg-black/90 backdrop-blur-[10px] will-change-transform">
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
