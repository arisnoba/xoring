'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RippleButton } from '@/components/ui/ripple-button';

const navLinks = [
	{ label: 'RING', href: '#ring' },
	{ label: 'APP', href: '#app' },
	{ label: 'AIOS', href: '#aios' },
];

type HeaderTheme = 'light' | 'dark';

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeTheme, setActiveTheme] = useState<HeaderTheme>('light');

	useEffect(() => {
		const resolveSectionTheme = (): HeaderTheme => {
			const stack = document.elementsFromPoint(window.innerWidth / 2, 1);
			const themedContainer = stack.find((element): element is HTMLElement => {
				if (!(element instanceof HTMLElement)) return false;
				return Boolean(element.closest('section[data-header-theme], footer[data-header-theme]'));
			});
			const themedSection = themedContainer?.closest<HTMLElement>('section[data-header-theme], footer[data-header-theme]');
			const sectionTheme = themedSection?.dataset.headerTheme === 'dark' ? 'dark' : 'light';

			if (themedSection?.id === 'hero') {
				return document.documentElement.dataset.heroHeaderTheme === 'dark' ? 'dark' : 'light';
			}

			return sectionTheme;
		};

		const syncHeaderState = () => {
			setScrolled(window.scrollY > 20);
			setActiveTheme(resolveSectionTheme());
		};

		syncHeaderState();

		window.addEventListener('scroll', syncHeaderState, { passive: true });
		window.addEventListener('resize', syncHeaderState);
		window.addEventListener('xoring:hero-header-theme-change', syncHeaderState as EventListener);

		return () => {
			window.removeEventListener('scroll', syncHeaderState);
			window.removeEventListener('resize', syncHeaderState);
			window.removeEventListener('xoring:hero-header-theme-change', syncHeaderState as EventListener);
		};
	}, []);

	const scrollTo = (href: string) => {
		setMenuOpen(false);
		const el = document.querySelector(href);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
	};

	const isDarkTheme = activeTheme === 'dark';
	const themeTransitionClassName = 'transition-[background-color,color,box-shadow,filter] duration-900 ease-in-out';
	const headerSurfaceClassName = scrolled ? (isDarkTheme ? 'bg-black/10 backdrop-blur-sm ' : 'bg-white/10 backdrop-blur-sm ') : 'bg-transparent shadow-none';
	const logoClassName = isDarkTheme ? 'invert' : 'invert-0';
	const navClassName = isDarkTheme ? 'text-white hover:text-white/72' : 'text-[#242424] hover:text-[#444]';
	const desktopButtonClassName = isDarkTheme ? 'bg-white/92 text-[#111] hover:bg-white/82' : 'bg-[#2f2f31]/92 text-white hover:bg-[#232325]';
	const mobileToggleClassName = isDarkTheme ? 'text-white' : 'text-[#1d1d1f]';

	return (
		<header className={cn('fixed top-0 left-0 right-0 z-50 h-16 lg:h-20', themeTransitionClassName, headerSurfaceClassName)}>
			<div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 h-full flex items-center justify-between">
				{/* Logo */}
				<a
					href="#"
					className="flex items-center gap-2"
					onClick={e => {
						e.preventDefault();
						window.scrollTo({ top: 0, behavior: 'smooth' });
					}}>
					<Image src="/assets/images/logo.svg" alt="XO RING" width={120} height={32} className={cn(themeTransitionClassName, logoClassName)} unoptimized />
				</a>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map(link => (
						<button key={link.label} onClick={() => scrollTo(link.href)} className={cn('text-sm font-bold tracking-[0.15em] cursor-pointer', themeTransitionClassName, navClassName)}>
							{link.label}
						</button>
					))}

					<RippleButton
						className={cn('px-6 py-2.5 border-none rounded-full text-sm font-bold tracking-[0.05em] cursor-pointer', themeTransitionClassName, desktopButtonClassName)}
						rippleColor={isDarkTheme ? '#111111' : '#ffffff'}>
						Buy Now
					</RippleButton>
				</nav>

				{/* Mobile hamburger */}
				<button className={cn('md:hidden p-2 rounded-lg', themeTransitionClassName, mobileToggleClassName)} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-[#e5e5e5] py-6 px-4">
					<nav className="flex flex-col gap-4">
						{navLinks.map(link => (
							<button key={link.label} onClick={() => scrollTo(link.href)} className="text-sm font-bold tracking-[0.15em] text-[#1d1d1f] hover:text-[#3d3df5] py-2">
								{link.label}
							</button>
						))}
						<RippleButton className="mt-2 w-full px-6 py-3 border-none rounded-full bg-[#1d1d1f] text-white text-sm font-bold">Buy Now</RippleButton>
					</nav>
				</div>
			)}
		</header>
	);
}
