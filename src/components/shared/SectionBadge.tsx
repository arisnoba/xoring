import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SectionBadgeProps {
	label: string;
	icon?: 'o' | 'x' | 'none';
	variant?: 'light' | 'dark';
	className?: string;
}

export default function SectionBadge({ label, icon = 'none', variant = 'dark', className }: SectionBadgeProps) {
	const textColor = variant === 'dark' ? 'text-[#8a8a8a]' : 'text-[#555]';
	const borderColor = variant === 'dark' ? 'border-[#8a8a8a]' : 'border-[#555]';

	return (
		<div className={cn('flex items-center gap-2 lg:gap-4 font-bold uppercase section-badge', textColor, className)}>
			{icon === 'o' && (
				<span className={cn('flex items-center justify-center section-badge__label', borderColor)}>
					<Image src="/assets/images/icon-o.svg" alt="O" width={48} height={48} unoptimized />
				</span>
			)}
			{icon === 'x' && (
				<span className={cn('flex items-center justify-center section-badge__label', borderColor)}>
					<Image src="/assets/images/icon-x.svg" alt="X" width={48} height={48} unoptimized className="invert" />
				</span>
			)}
			{icon === 'none' && (
				<span className={cn('flex items-center justify-center w-7 h-7 rounded-full border-2 section-badge__label', borderColor)}>
					<span className="w-2 h-2 rounded-full bg-current" />
				</span>
			)}
			{label}
		</div>
	);
}
