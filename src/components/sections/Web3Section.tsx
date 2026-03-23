import SectionContainer from '@/components/shared/SectionContainer';

const paragraphs = [
	'Not just another smart device.',
	'XORing is your new digital ID, proving you are a core member of a massive AI ecosystem.',
	'Record your moves and turn your everyday routines into extraordinary value.\n Start the experience right at your fingertips.',
];

export default function Web3Section() {
	return (
		<section className="relative isolate overflow-hidden bg-[#041007] text-white">
			<div className="absolute h-full w-full bg-[url('/assets/images/bg-01.jpg')] bg-cover bg-center bg-no-repeat opacity-30 section-bg"></div>

			<SectionContainer className="relative flex items-center justify-center text-center">
				<div className="max-w-[860px]">
					<h2 className="section-title section-title--tight text-balance text-white">
						<span className="block">A New Identity</span>
						<span className="block">for the Web3.0 Era</span>
					</h2>

					<div className="section-copy mx-auto mt-10 max-w-[620px] space-y-10 text-white/94">
						{paragraphs.map((paragraph, index) => (
							<p key={index} className="text-balance">
								{paragraph.split('\n').map((line, i) => (
									<span key={i}>
										{line}
										{i < paragraph.split('\n').length - 1 && <br />}
									</span>
								))}
							</p>
						))}
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
