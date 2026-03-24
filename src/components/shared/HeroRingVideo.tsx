'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HeroRingVideoProps {
	className?: string;
}

const INTRO_VIDEO_SRC = '/assets/video/hero-ring.mp4';
const LOOP_VIDEO_SRC = '/assets/video/hero-ring-loop.mp4';

export default function HeroRingVideo({ className }: HeroRingVideoProps) {
	const loopVideoRef = useRef<HTMLVideoElement>(null);
	const [isLoopActive, setIsLoopActive] = useState(false);
	const [isLoopReady, setIsLoopReady] = useState(false);

	useEffect(() => {
		loopVideoRef.current?.load();
	}, []);

	useEffect(() => {
		const loopVideo = loopVideoRef.current;
		if (!isLoopActive || !isLoopReady || !loopVideo) return;

		loopVideo.currentTime = 0;
		void loopVideo.play().catch(() => {});
	}, [isLoopActive, isLoopReady]);

	return (
		<div className={cn('relative aspect-[0.96] w-full flex items-center justify-center', className)} aria-hidden="true">
			<video
				src={INTRO_VIDEO_SRC}
				muted
				playsInline
				autoPlay
				preload="auto"
				onEnded={() => setIsLoopActive(true)}
				className={cn(
					'block object-contain w-full h-full border-0 outline-none transition-opacity duration-150',
					isLoopActive ? 'opacity-0' : 'opacity-100'
				)}
			/>
			<video
				ref={loopVideoRef}
				src={LOOP_VIDEO_SRC}
				muted
				playsInline
				loop
				preload="auto"
				onCanPlay={() => setIsLoopReady(true)}
				className={cn(
					'absolute inset-0 block object-contain w-full h-full border-0 outline-none transition-opacity duration-150',
					isLoopActive ? 'opacity-100' : 'opacity-0'
				)}
			/>
		</div>
	);
}
