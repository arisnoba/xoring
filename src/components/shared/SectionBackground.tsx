'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SectionBackgroundProps {
	desktopSrc: string;
	mobileSrc?: string;
	opacity?: number;
	className?: string;
}

const baseClassName = 'absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat section-bg';

export default function SectionBackground({ desktopSrc, mobileSrc, opacity = 0.15, className }: SectionBackgroundProps) {
	const rootRef = useRef<HTMLDivElement>(null);
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		const node = rootRef.current;
		if (!node || shouldLoad) return;

		const observer = new IntersectionObserver(
			entries => {
				if (!entries[0]?.isIntersecting) return;
				setShouldLoad(true);
				observer.disconnect();
			},
			{ rootMargin: '400px 0px' }
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, [shouldLoad]);

	const makeStyle = (src: string) => ({
		backgroundImage: shouldLoad ? `url('${src}')` : undefined,
		opacity,
	});

	if (!mobileSrc) {
		return <div ref={rootRef} aria-hidden="true" className={cn(baseClassName, className)} style={makeStyle(desktopSrc)} />;
	}

	return (
		<div ref={rootRef} className="absolute inset-0">
			<div aria-hidden="true" className={cn(baseClassName, 'md:hidden', className)} style={makeStyle(mobileSrc)} />
			<div aria-hidden="true" className={cn(baseClassName, 'hidden md:block', className)} style={makeStyle(desktopSrc)} />
		</div>
	);
}
