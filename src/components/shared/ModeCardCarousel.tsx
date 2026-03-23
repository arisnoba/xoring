"use client";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

interface CardData {
	title: string;
	description: string;
}

interface ModeCardCarouselProps {
	cards: CardData[];
	images: string[];
	variant: "light" | "dark";
}

function ModeCard({ title, description, image, variant }: CardData & { image: string; variant: "light" | "dark" }) {
	if (variant === "light") {
		return (
			<article className="overflow-hidden rounded-[26px] border border-white/60 bg-white shadow-[0_24px_60px_rgba(17,24,39,0.08)]">
				<div className="relative aspect-[1.42] w-full overflow-hidden">
					<Image src={image} alt={title} fill className="object-cover" unoptimized />
				</div>
				<div className="space-y-3 px-6 py-6">
					<h3 className="text-[1.15rem] font-bold tracking-tight text-[#171717]">{title}</h3>
					<p className="text-[0.98rem] font-medium leading-[1.65] text-[#4e4e53]">{description}</p>
				</div>
			</article>
		);
	}

	return (
		<article className="overflow-hidden rounded-[26px] border border-white/10 bg-[rgba(29,29,31,0.72)] shadow-[0_26px_70px_rgba(0,0,0,0.24)] backdrop-blur-md">
			<div className="relative aspect-[1.42] w-full overflow-hidden">
				<Image src={image} alt={title} fill className="object-cover" unoptimized />
			</div>
			<div className="space-y-3 px-6 py-6">
				<h3 className="text-[1.15rem] font-bold tracking-tight text-white">{title}</h3>
				<p className="text-[0.98rem] font-medium leading-[1.65] text-white/80">{description}</p>
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
			el.style.width = "";
			const right = el.getBoundingClientRect().right;
			// scrollbar 너비 제외 + 오른쪽 여백 20px 확보
			const clientWidth = document.documentElement.clientWidth;
			const extension = Math.max(0, clientWidth - right - 20);
			el.style.width = extension > 0 ? `calc(100% + ${extension}px)` : "";
		};
		extend();
		window.addEventListener("resize", extend);
		return () => window.removeEventListener("resize", extend);
	}, []);

	return (
		<div ref={wrapperRef}>
			<Swiper
				grabCursor
				breakpointsBase="window"
				slidesPerView={1.2}
				spaceBetween={16}
				breakpoints={{
					640: { slidesPerView: 1.8, spaceBetween: 20 },
					1024: { slidesPerView: 2.3, spaceBetween: 20 },
					1280: { slidesPerView: 3, spaceBetween: 24 },
					1700: { slidesPerView: 3.3, spaceBetween: 24 },
				}}
			>
				{cards.map((card, index) => (
					<SwiperSlide key={card.title}>
						<ModeCard title={card.title} description={card.description} image={images[index % images.length]} variant={variant} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
