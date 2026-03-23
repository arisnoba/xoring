'use client';

import { useState } from 'react';
import Image from 'next/image';
import SectionContainer from '@/components/shared/SectionContainer';

export default function TwoModesSection() {
	const [mode, setMode] = useState<'O' | 'X'>('O');

	return (
		<section id="modes" data-header-theme="dark" className="relative overflow-hidden bg-[#171717] text-white">
			<SectionContainer className="flex flex-col items-center justify-center">
				<div className="max-w-[860px] text-center">
					<p className="text-balance text-[clamp(3.1rem,7vw,6.5rem)] font-black tracking-tight leading-[0.94]">
						<span className="block">One ring,</span>
						<span className="block">Two Modes.</span>
					</p>
				</div>

				<div className="relative mt-14 flex w-full items-center justify-center md:mt-16">
					<div
						className="absolute h-[58vw] w-[58vw] max-h-[378px] max-w-[378px] top-[21px] rounded-full transition-colors duration-500"
						style={{ backgroundColor: mode === 'O' ? '#5BCD5B' : '#2F43C8' }}
					/>
					<div className="relative z-10 w-[50vw] max-w-[310px]">
						<div className="flex w-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${mode === 'O' ? '0' : '-100%'})` }}>
							<div className={`w-full shrink-0 transition-opacity duration-250 ease-out ${mode === 'O' ? 'opacity-100' : 'opacity-0'}`}>
								<Image src="/assets/images/ring-0.png" alt="O Mode Ring" width={460} height={460} className="h-auto w-full" />
							</div>
							<div className={`w-full shrink-0 transition-opacity duration-250 ease-out ${mode === 'X' ? 'opacity-100' : 'opacity-0'}`}>
								<Image src="/assets/images/ring-x.png" alt="X Mode Ring" width={460} height={460} className="h-auto w-full" />
							</div>
						</div>
					</div>
				</div>

				<div className="mt-14 grid w-full max-w-[320px] grid-cols-[1fr_auto_1fr] items-start gap-5 md:mt-16 md:max-w-[580px]">
					<button
						onClick={() => setMode('O')}
						className="flex flex-col items-center gap-5 pt-3 text-center transition-opacity hover:opacity-80 disabled:opacity-100 w-full"
						aria-label="Switch to O mode">
						<div className="flex h-[116px] w-[116px] items-center justify-center">
							<Image
								src="/assets/images/icon-o.svg"
								alt="Connect with the world"
								width={116}
								height={116}
								style={{ filter: mode === 'O' ? 'brightness(0) invert(1)' : 'none' }}
								className="transition-all duration-500"
							/>
						</div>
						<p className={`text-balance text-[clamp(1.2rem,1.7vw,1.5rem)] font-medium leading-[1.15] transition-colors duration-500 ${mode === 'O' ? 'text-white' : 'text-white/18'}`}>
							<span className="block">Connect with</span>
							<span className="block">the world</span>
						</p>
					</button>

					<button
						className="flex cursor-pointer flex-col items-center gap-3 pt-1 text-center text-white transition-opacity hover:opacity-80"
						onClick={() => setMode(mode === 'O' ? 'X' : 'O')}
						aria-label="Twist to switch mode">
						<div className="h-9 w-px bg-white/80" />
						<p className="whitespace-nowrap text-[1.05rem] font-medium text-white/95">Twist to switch</p>
						<div className="h-9 w-px bg-white/80" />
					</button>

					<button
						onClick={() => setMode('X')}
						className="flex flex-col items-center gap-5 pt-3 text-center transition-opacity hover:opacity-80 disabled:opacity-100 w-full"
						aria-label="Switch to X mode">
						<div className="flex h-[116px] w-[116px] items-center justify-center">
							<Image
								src="/assets/images/icon-x.svg"
								alt="Focus on yourself"
								width={116}
								height={116}
								style={{ filter: mode === 'X' ? 'brightness(0) invert(1)' : 'none' }}
								className="transition-all duration-500"
							/>
						</div>
						<p className={`text-balance text-[clamp(1.2rem,1.7vw,1.5rem)] font-medium leading-[1.15] transition-colors duration-500 ${mode === 'X' ? 'text-white' : 'text-white/18'}`}>
							<span className="block">Focus on</span>
							<span className="block">yourself</span>
						</p>
					</button>
				</div>
			</SectionContainer>
		</section>
	);
}
