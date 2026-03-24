'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';
import { PLACEHOLDER_LINKS } from '@/lib/site';

const navLinks = [
	{ label: 'RING', href: '#ring' },
	{ label: 'APP', href: '#app' },
	{ label: 'AIOS', href: '#aios' },
];

type HeaderTheme = 'light' | 'dark';

export default function Header() {
	const lenis = useLenis();
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

		if (lenis) {
			lenis.scrollTo(href);
			return;
		}

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
		<header className={cn('fixed top-0 left-0 right-0 z-50 h-[var(--header-height-mobile)] pl-[var(--safe-area-left)] pt-[var(--safe-area-top)] pr-[var(--safe-area-right)] lg:h-[var(--header-height-desktop)]', themeTransitionClassName, headerSurfaceClassName)}>
			<div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 h-full flex items-center justify-between">
				{/* Logo */}
				<a
					href="#"
					className="flex items-center gap-2"
					onClick={e => {
						e.preventDefault();

						if (lenis) {
							lenis.scrollTo(0);
							return;
						}

						window.scrollTo({ top: 0, behavior: 'smooth' });
					}}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/assets/images/logo.svg" alt="XO RING" width={120} height={27} className={cn(themeTransitionClassName, logoClassName)} />
				</a>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8" aria-label="Primary">
					{navLinks.map(link => (
						<button key={link.label} onClick={() => scrollTo(link.href)} className={cn('text-sm font-bold tracking-[0.15em] cursor-pointer', themeTransitionClassName, navClassName)}>
							{link.label}
						</button>
					))}

					<a
						href={PLACEHOLDER_LINKS.buyNow}
						target="_blank"
						rel="noreferrer"
						className={cn('px-6 py-2.5 border-none rounded-full text-sm font-bold tracking-[0.05em] cursor-pointer', themeTransitionClassName, desktopButtonClassName)}
					>
						Buy Now
					</a>
				</nav>

				{/* Mobile hamburger */}
				<button
					className={cn('md:hidden p-2 rounded-lg', themeTransitionClassName, mobileToggleClassName)}
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
					aria-expanded={menuOpen}
					aria-controls="mobile-menu"
				>
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-[#e5e5e5] py-6 px-4">
					<nav className="flex flex-col gap-4" aria-label="Mobile">
						{navLinks.map(link => (
							<button key={link.label} onClick={() => scrollTo(link.href)} className="text-sm font-bold tracking-[0.15em] text-[#1d1d1f] hover:text-[#3d3df5] py-2">
								{link.label}
							</button>
						))}
						<a
							href={PLACEHOLDER_LINKS.buyNow}
							target="_blank"
							rel="noreferrer"
							className="mt-2 w-full px-6 py-3 border-none rounded-full bg-[#1d1d1f] text-white text-sm font-bold text-center"
						>
							Buy Now
						</a>
					</nav>
				</div>
			)}
		</header>
	);
}
