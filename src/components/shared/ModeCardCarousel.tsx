'use client';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CardData {
	title: string;
	description: string;
}

interface ModeCardCarouselProps {
	cards: CardData[];
	images: string[];
	variant: 'light' | 'dark';
}

function ModeCard({ title, description, image, variant }: CardData & { image: string; variant: 'light' | 'dark' }) {
	const isLight = variant === 'light';

	return (
		<article className={cn('flex h-full w-full flex-col overflow-hidden rounded-[20px] border p-3', isLight ? 'border-white/60 bg-white' : 'border-white/5 bg-[#333]/50')}>
			<div className="relative aspect-[1.42] w-full overflow-hidden rounded-lg">
				<Image src={image} alt={title} fill className="object-cover" unoptimized />
			</div>
			<div className="flex-1 space-y-3 px-2 py-8">
				<h3 className={cn('text-[1.15rem] font-bold tracking-tight', isLight ? 'text-[#171717]' : 'text-white')}>{title}</h3>
				<p className={cn('text-[0.98rem] font-medium leading-[1.65]', isLight ? 'text-[#4e4e53]' : 'text-white/80')}>{description}</p>
			</div>
		</article>
	);
}

export default function ModeCardCarousel({ cards, images, variant }: ModeCardCarouselProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const extend = () => {
			const el = wrapperRef.current;
			if (!el) return;
			el.style.width = '';
			const right = el.getBoundingClientRect().right;
			// scrollbar 너비 제외 + 오른쪽 여백 20px 확보
			const clientWidth = document.documentElement.clientWidth;
			const extension = Math.max(0, clientWidth - right - 20);
			el.style.width = extension > 0 ? `calc(100% + ${extension}px)` : '';
		};
		extend();
		window.addEventListener('resize', extend);
		return () => window.removeEventListener('resize', extend);
	}, []);

	return (
		<div ref={wrapperRef}>
			<Swiper
				className="[&_.swiper-wrapper]:items-stretch"
				grabCursor
				breakpointsBase="window"
				slidesPerView={1.2}
				spaceBetween={16}
				breakpoints={{
					640: { slidesPerView: 1.8, spaceBetween: 20 },
					1024: { slidesPerView: 2.3, spaceBetween: 20 },
					1280: { slidesPerView: 3, spaceBetween: 24 },
					1700: { slidesPerView: 3.3, spaceBetween: 24 },
				}}>
				{cards.map((card, index) => (
					<SwiperSlide key={card.title} className="flex !h-auto">
						<ModeCard title={card.title} description={card.description} image={images[index % images.length]} variant={variant} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
