'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

function LenisGsapBridge() {
	const lenis = useLenis();

	useEffect(() => {
		if (!lenis) return;

		const update = (time: number) => {
			lenis.raf(time * 1000);
		};

		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add(update);
		gsap.ticker.lagSmoothing(0);

		return () => {
			lenis.off('scroll', ScrollTrigger.update);
			gsap.ticker.remove(update);
		};
	}, [lenis]);

	return null;
}

type SmoothScrollProviderProps = {
	children: React.ReactNode;
};

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
	return (
		<ReactLenis root options={{ autoRaf: false }}>
			<LenisGsapBridge />
			{children}
		</ReactLenis>
	);
}
