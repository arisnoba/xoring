import Image from "next/image";
import SectionBadge from "@/components/shared/SectionBadge";
import SectionContainer from "@/components/shared/SectionContainer";
import ModeCardCarousel from "@/components/shared/ModeCardCarousel";
import { PRIVATE_MODE } from "@/lib/constants";

const privateSlides = [
	"/assets/images/private/slide-01.jpg",
	"/assets/images/private/slide-02.jpg",
	"/assets/images/private/slide-03.jpg",
	"/assets/images/private/slide-04.jpg",
];

export default function PrivateModeSection() {
	return (
		<section className="relative isolate bg-[#071416] text-white">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_12%,rgba(15,67,73,0.4),transparent_22%),linear-gradient(180deg,rgba(3,18,19,0.88),rgba(4,10,11,0.92))]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_74%,rgba(107,65,33,0.26),transparent_18%),radial-gradient(circle_at_72%_28%,rgba(35,102,111,0.2),transparent_18%),repeating-linear-gradient(90deg,rgba(255,255,255,0.015)_0,rgba(255,255,255,0.015)_7px,transparent_7px,transparent_18px)] opacity-90" />

			<SectionContainer className="relative min-h-[1450px]">
				<div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
					<div className="lg:sticky lg:top-28">
						<SectionBadge label="PRIVATE MODE" icon="x" variant="dark" />
						<div className="mt-8 max-w-[250px]">
							<Image src="/assets/images/ring-x.png" alt="XORing Private Mode" width={500} height={500} className="h-auto w-full object-contain" unoptimized />
						</div>
					</div>

					<div className="pt-4">
						<div className="max-w-[760px]">
							<h2 className="section-title text-balance text-white">
								{PRIVATE_MODE.headline.split("\n").map((line, index, arr) => (
									<span key={line}>
										{line}
										{index < arr.length - 1 && <br />}
									</span>
								))}
							</h2>
							<p className="section-copy section-copy--tight mt-8 max-w-[700px] text-white/92">{PRIVATE_MODE.subtext}</p>
						</div>

						<div className="mt-20">
							<ModeCardCarousel cards={PRIVATE_MODE.cards} images={privateSlides} variant="dark" />
						</div>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
