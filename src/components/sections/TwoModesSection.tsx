import RingArtwork from "@/components/shared/RingArtwork";
import SectionContainer from "@/components/shared/SectionContainer";

export default function TwoModesSection() {
  return (
    <section
      id="modes"
      className="relative overflow-hidden bg-[#171717] text-white"
    >
      <SectionContainer className="flex min-h-screen flex-col items-center justify-center py-28 md:py-32">
        <div className="max-w-[860px] text-center">
          <p className="text-balance text-[clamp(3.1rem,7vw,6.5rem)] font-black tracking-tight leading-[0.94]">
            <span className="block">One ring,</span>
            <span className="block">Two Modes.</span>
          </p>
        </div>

        <div className="relative mt-14 flex w-full max-w-[760px] items-center justify-center md:mt-16">
          <div className="absolute h-[58vw] w-[58vw] max-h-[378px] max-w-[378px] rounded-full bg-[#3147dd]" />
          <RingArtwork
            tone="dark"
            mark="x"
            className="relative z-10 w-[72vw] max-w-[460px]"
          />
        </div>

        <div className="mt-14 grid w-full max-w-[520px] grid-cols-[1fr_auto_1fr] items-start gap-5 md:mt-16 md:max-w-[580px]">
          <div className="flex flex-col items-center gap-5 pt-3 text-center">
            <div className="flex h-[116px] w-[116px] items-center justify-center rounded-full bg-[#242424]">
              <div className="h-[48px] w-[48px] rounded-full border-[14px] border-[#131313]" />
            </div>
            <p className="text-balance text-[clamp(1.2rem,1.7vw,1.5rem)] font-medium leading-[1.15] text-white/18">
              <span className="block">Connect with</span>
              <span className="block">the world</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 pt-1 text-center text-white">
            <div className="h-9 w-px bg-white/80" />
            <p className="whitespace-nowrap text-[1.05rem] font-medium text-white/95">
              Twist to switch
            </p>
            <div className="h-9 w-px bg-white/80" />
          </div>

          <div className="flex flex-col items-center gap-5 pt-3 text-center">
            <div className="relative flex h-[116px] w-[116px] items-center justify-center">
              <span className="absolute h-5 w-[92px] rotate-45 rounded-full bg-white" />
              <span className="absolute h-5 w-[92px] -rotate-45 rounded-full bg-white" />
            </div>
            <p className="text-balance text-[clamp(1.2rem,1.7vw,1.5rem)] font-medium leading-[1.15] text-white">
              <span className="block">Focus on</span>
              <span className="block">yourself</span>
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
