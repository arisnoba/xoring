import SectionContainer from "@/components/shared/SectionContainer";

const paragraphs = [
  "Not just another smart device.",
  "XORing is your new digital ID, proving you are a core member of a massive AI ecosystem.",
  "Record your moves and turn your everyday routines into extraordinary value. Start the experience right at your fingertips.",
];

export default function Web3Section() {
  return (
    <section className="relative isolate overflow-hidden bg-[#041007] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_72%,rgba(34,82,36,0.38),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.48),rgba(0,0,0,0.66))]" />
      <div className="absolute inset-y-0 right-0 w-[62%] bg-[radial-gradient(circle_at_48%_42%,rgba(255,255,255,0.08),transparent_14%),linear-gradient(180deg,rgba(39,31,26,0.15),rgba(7,8,8,0.4))]" />
      <div className="absolute left-[22%] top-[16%] h-[78%] w-[28%] rotate-[-34deg] rounded-[44px] border border-white/8 bg-[linear-gradient(180deg,rgba(52,56,72,0.75),rgba(6,8,12,0.92))] opacity-70 blur-[0.4px]" />
      <div className="absolute right-[10%] top-[25%] h-[54%] w-[28%] rounded-[42px] bg-[radial-gradient(circle_at_62%_35%,rgba(255,255,255,0.1),transparent_14%),linear-gradient(180deg,rgba(50,35,27,0.35),rgba(18,11,8,0.78))] opacity-75" />

      <SectionContainer className="relative flex min-h-screen items-center justify-center py-24 text-center">
        <div className="max-w-[860px]">
          <h2 className="text-balance text-[clamp(3.2rem,7vw,6.2rem)] font-black tracking-tight leading-[0.94]">
            <span className="block">A New Identity</span>
            <span className="block">for the Web3.0 Era</span>
          </h2>

          <div className="mx-auto mt-10 max-w-[620px] space-y-10 text-[clamp(1.15rem,2vw,1.42rem)] font-semibold leading-[1.55] text-white/94">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-balance">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
