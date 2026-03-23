import Image from 'next/image';
import SectionContainer from '@/components/shared/SectionContainer';
import StoreButtons from '@/components/shared/StoreButtons';

export default function ApplicationSection() {
	return (
		<section id="app" data-header-theme="light" className="relative isolate overflow-hidden bg-[#f5f5f4] text-[#111]">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_40%,rgba(255,255,255,0.62),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(245,245,244,0.95))]" />
			<SectionContainer className="relative flex items-center justify-center">
				<div className="w-full grid items-center justify-items-center gap-16 lg:grid-cols-2 lg:gap-20">
					<div className="relative flex items-center justify-center">
						<div className="relative w-full max-w-[720px]">
							<Image
								src="/assets/images/application/phones.webp"
								alt="Mobile App Interface"
								width={1080}
								height={1200}
								className="h-auto w-full object-contain drop-shadow-[0_32px_90px_rgba(17,24,39,0.18)]"
							/>
						</div>
					</div>

					<div className="max-w-[760px] text-center">
						<p className="text-[1rem] font-bold tracking-[0.08em] text-[#9a9a9d]">APPLICATION</p>
						<h2 className="section-title section-title--tight mt-4 text-balance text-[#171717]">
							<span className="block">Every experience</span>
							<span className="block">in your hand</span>
						</h2>
						<p className="section-copy mt-8 text-balance text-[#2b2b31]">
							All your XORing data is seamlessly synced to the app.
							<br className="hidden md:block" />
							You can even use the app without the ring.
						</p>

						<StoreButtons
							variant="light"
							googleFirst
							className="mt-10 lg:mt-20 justify-center gap-2 md:gap-3 min-w-[200px] inline-flex"
							buttonClassName="px-6 py-3 shadow-[0_18px_40px_rgba(17,24,39,0.08)] justify-center"
						/>
						<p className="mt-10 text-sm font-medium text-[#a0a0a5]">* Some features may be limited when using the app without XORing.</p>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
