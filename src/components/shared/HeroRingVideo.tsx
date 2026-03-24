'use client';

import { cn } from '@/lib/utils';

interface HeroRingVideoProps {
	className?: string;
}

export default function HeroRingVideo({ className }: HeroRingVideoProps) {
	return (
		<div className={cn('relative aspect-[0.96] w-full flex items-center justify-center', className)} aria-hidden="true">
			<video
				src="/assets/video/hero-ring.mp4"
				muted
				playsInline
				autoPlay
				preload="auto"
				className="block object-contain w-full h-full border-0 outline-none"
			/>
		</div>
	);
}

