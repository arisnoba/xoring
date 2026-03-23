import { cn } from '@/lib/utils';

interface StoreButtonsProps {
	className?: string;
	variant?: 'dark' | 'light';
	googleFirst?: boolean;
	buttonClassName?: string;
}

export default function StoreButtons({ className, variant = 'dark', googleFirst = false, buttonClassName }: StoreButtonsProps) {
	const bg = variant === 'dark' ? 'bg-[#1d1d1f] text-white' : 'bg-white text-[#1d1d1f]';
	const border = variant === 'dark' ? 'border-transparent' : 'border border-[#d1d1d6]';
	const stores = [
		{
			key: 'apple',
			eyebrow: 'Download on the',
			label: 'App Store',
			icon: (
				<svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
					<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
				</svg>
			),
		},
		{
			key: 'google',
			eyebrow: 'Get it on',
			label: 'Google Play',
			icon: (
				<svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
					<path d="M3.18 23.76c.33.18.7.22 1.06.1l12.74-7.36-2.76-2.76-11.04 9.94v.08zm-1.46-1.42c-.09-.2-.13-.43-.13-.68V2.34c0-.25.04-.48.13-.68L13.5 12 1.72 22.34zM20.43 10.17l-2.62-1.52-3.08 3.07 3.08 3.08 2.65-1.53c.76-.44.76-1.66-.03-2.1zM4.24.14C3.88.02 3.51.06 3.18.24l11.04 9.93 2.76-2.76L4.24.14z" />
				</svg>
			),
		},
	];
	const orderedStores = googleFirst ? [stores[1], stores[0]] : stores;

	return (
		<div className={cn('flex flex-col sm:flex-row gap-3', className)}>
			{orderedStores.map(store => (
				<button key={store.key} className={cn('flex items-center gap-3 px-5 py-3 rounded-full transition-opacity hover:opacity-80 cursor-pointer', bg, border, buttonClassName)}>
					{store.icon}
					<div className="text-left">
						<div className="text-[10px] opacity-70 leading-none">{store.eyebrow}</div>
						<div className="text-sm font-semibold leading-tight">{store.label}</div>
					</div>
				</button>
			))}
		</div>
	);
}
