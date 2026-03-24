import type { Variants } from 'motion/react';

export const revealEase = [0.25, 0.1, 0.25, 1] as const;
export const defaultRevealDuration = 0.7;
export const defaultRevealAmount = 0.15;

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 32 },
	visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export const scaleUp: Variants = {
	hidden: { opacity: 0, y: 24, scale: 0.96 },
	visible: { opacity: 1, y: 0, scale: 1 },
};
