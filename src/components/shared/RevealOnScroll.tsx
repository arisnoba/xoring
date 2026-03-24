'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeUp, defaultRevealAmount, defaultRevealDuration, revealEase } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface RevealOnScrollProps {
	children: ReactNode;
	className?: string;
	variants?: Variants;
	delay?: number;
	duration?: number;
	once?: boolean;
	amount?: number;
	as?: 'div' | 'section' | 'article' | 'span';
}

const motionTags = {
	div: motion.div,
	section: motion.section,
	article: motion.article,
	span: motion.span,
} as const;

export default function RevealOnScroll({
	children,
	className,
	variants = fadeUp,
	delay = 0,
	duration = defaultRevealDuration,
	once = true,
	amount = defaultRevealAmount,
	as = 'div',
}: RevealOnScrollProps) {
	const prefersReducedMotion = useReducedMotion();
	const Tag = motionTags[as];

	return (
		<Tag
			className={cn(className)}
			initial={prefersReducedMotion ? 'visible' : 'hidden'}
			whileInView={prefersReducedMotion ? undefined : 'visible'}
			viewport={prefersReducedMotion ? undefined : { once, amount }}
			variants={variants}
			transition={prefersReducedMotion ? undefined : { duration, delay, ease: revealEase }}
		>
			{children}
		</Tag>
	);
}
