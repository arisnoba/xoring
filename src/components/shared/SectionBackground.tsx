import { cn } from '@/lib/utils';

interface SectionBackgroundProps {
	desktopSrc: string;
	mobileSrc?: string;
	opacity?: number;
	className?: string;
}

const baseClassName = 'absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat section-bg';

export default function SectionBackground({ desktopSrc, mobileSrc, opacity = 0.15, className }: SectionBackgroundProps) {
	if (!mobileSrc) {
		return <div aria-hidden="true" className={cn(baseClassName, className)} style={{ backgroundImage: `url('${desktopSrc}')`, opacity }} />;
	}

	return (
		<>
			<div aria-hidden="true" className={cn(baseClassName, 'md:hidden', className)} style={{ backgroundImage: `url('${mobileSrc}')`, opacity }} />
			<div aria-hidden="true" className={cn(baseClassName, 'hidden md:block', className)} style={{ backgroundImage: `url('${desktopSrc}')`, opacity }} />
		</>
	);
}
