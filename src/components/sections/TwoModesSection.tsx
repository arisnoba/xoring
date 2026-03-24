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
					<p className="text-balance section-title font-black">
						<span className="block">One ring,</span>
						<span className="block">Two Modes.</span>
					</p>
				</div>

				<div className="relative mt-14 flex w-full items-center justify-center md:mt-16">
					<div className="relative h-[58vw] w-[58vw] max-h-[378px] max-w-[378px] rounded-full transition-colors duration-500" style={{ backgroundColor: mode === 'O' ? '#5BCD5B' : '#2F43C8' }} />
					<div className="absolute z-10 w-[50vw] max-w-[310px] -top-[21px]">
						<div className="flex w-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${mode === 'O' ? '0' : '-100%'})` }}>
							<div className={`w-full shrink-0 transition-opacity duration-250 ease-in ${mode === 'O' ? 'opacity-100' : 'opacity-0'}`}>
								<Image src="/assets/images/ring-0.png" alt="O Mode Ring" width={460} height={460} className="h-auto w-full" />
							</div>
							<div className={`w-full shrink-0 transition-opacity duration-250 ease-in ${mode === 'X' ? 'opacity-100' : 'opacity-0'}`}>
								<Image src="/assets/images/ring-x.png" alt="X Mode Ring" width={460} height={460} className="h-auto w-full" />
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12 grid w-full max-w-[320px] grid-cols-[1fr_auto_1fr] items-start gap-2 px-2 sm:max-w-[420px] sm:gap-4 md:mt-16 md:max-w-[580px] md:gap-5 md:px-0">
					<button
						onClick={() => setMode('O')}
						className="flex w-full flex-col items-center gap-3 text-center transition-opacity hover:opacity-80 disabled:opacity-100 md:gap-5 cursor-pointer"
						aria-pressed={mode === 'O'}>
						<span className="flex h-[64px] w-[64px] items-center justify-center sm:h-[80px] sm:w-[80px] md:h-[116px] md:w-[116px]">
							<Image
								src="/assets/images/icon-o.svg"
								alt=""
								aria-hidden="true"
								width={116}
								height={116}
								style={{ filter: mode === 'O' ? 'brightness(0) invert(1)' : 'none' }}
								className="h-auto w-full transition-all duration-500"
							/>
						</span>
						<span
							className={`block text-balance text-[0.75rem] font-medium leading-[1.15] transition-colors duration-500 sm:text-[0.9rem] md:text-[clamp(1.1rem,1.7vw,1.5rem)] ${mode === 'O' ? 'text-white' : 'text-white/65'}`}>
							<span className="block">Connect with</span>
							<span className="block">the world</span>
						</span>
					</button>

					<button
						className="flex h-[64px] w-[64px] cursor-pointer flex-col items-center gap-2 text-center text-white transition-opacity hover:opacity-80 md:gap-3 sm:h-[80px] sm:w-[80px] md:h-[116px] md:w-[116px]"
						onClick={() => setMode(mode === 'O' ? 'X' : 'O')}
						aria-label="Twist to switch mode">
						<span className="block h-5 w-px bg-white/80 sm:h-7 md:h-9" />
						<span className="block whitespace-nowrap text-[0.65rem] font-medium text-white/95 sm:text-[0.8rem] md:text-[1.05rem]">Twist to switch</span>
						<span className="block h-5 w-px bg-white/80 sm:h-7 md:h-9" />
					</button>

					<button
						onClick={() => setMode('X')}
						className="flex w-full flex-col items-center gap-3 text-center transition-opacity hover:opacity-80 disabled:opacity-100 md:gap-5 cursor-pointer"
						aria-pressed={mode === 'X'}>
						<span className="flex h-[64px] w-[64px] items-center justify-center sm:h-[80px] sm:w-[80px] md:h-[116px] md:w-[116px]">
							<Image
								src="/assets/images/icon-x.svg"
								alt=""
								aria-hidden="true"
								width={116}
								height={116}
								style={{ filter: mode === 'X' ? 'brightness(0) invert(1)' : 'none' }}
								className="h-auto w-full transition-all duration-500"
							/>
						</span>
						<span
							className={`block text-balance text-[0.75rem] font-medium leading-[1.15] transition-colors duration-500 sm:text-[0.9rem] md:text-[clamp(1.1rem,1.7vw,1.5rem)] ${mode === 'X' ? 'text-white' : 'text-white/65'}`}>
							<span className="block">Focus on</span>
							<span className="block">yourself</span>
						</span>
					</button>
				</div>
			</SectionContainer>
		</section>
	);
}
