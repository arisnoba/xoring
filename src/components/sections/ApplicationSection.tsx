import PhoneMockup from "@/components/shared/PhoneMockup";
import SectionContainer from "@/components/shared/SectionContainer";
import StoreButtons from "@/components/shared/StoreButtons";

function AppPhone({
  className,
  muted = false,
}: {
  className?: string;
  muted?: boolean;
}) {
  return (
    <PhoneMockup
      className={className}
      screenClassName="bg-[linear-gradient(180deg,#f4f4f4,#d9d9dc)]"
    >
      <div className={`relative h-full overflow-hidden ${muted ? "opacity-42" : ""}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_44%_18%,rgba(255,255,255,0.45),transparent_18%),linear-gradient(180deg,rgba(20,24,36,0.88),rgba(22,22,25,0.12)_45%,rgba(255,255,255,0.05))]" />
        {!muted && (
          <div className="absolute inset-x-0 bottom-0 top-[52%] bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.34))]" />
        )}
        {!muted && (
          <>
            <div className="absolute bottom-[20%] left-1/2 h-[88px] w-[88px] -translate-x-1/2 rounded-full bg-white/88" />
            <div className="absolute bottom-[11%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[#111]">
              <div className="text-[58px] font-black leading-none tracking-tight">XO</div>
              <div className="text-[18px] font-bold tracking-[0.38em]">RING</div>
            </div>
            <div className="absolute bottom-[5.5%] left-4 right-4 grid grid-cols-2 gap-2">
              <div className="h-9 rounded-full bg-black/88" />
              <div className="h-9 rounded-full bg-black/88" />
            </div>
          </>
        )}
      </div>
    </PhoneMockup>
  );
}

export default function ApplicationSection() {
  return (
    <section
      id="app"
      className="relative isolate overflow-hidden bg-[#f5f5f4] text-[#111]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_40%,rgba(255,255,255,0.62),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(245,245,244,0.95))]" />
      <SectionContainer className="relative py-24 md:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div className="relative flex min-h-[560px] items-center justify-center">
            <AppPhone className="absolute left-[2%] top-[16%] h-[430px] w-[214px] border-[6px] border-[#d0d0d0] bg-[#d0d0d0] opacity-35 shadow-none md:left-[4%]" muted />
            <AppPhone className="absolute right-[4%] top-[16%] h-[430px] w-[214px] border-[6px] border-[#d0d0d0] bg-[#d0d0d0] opacity-35 shadow-none md:right-[8%]" muted />
            <AppPhone className="relative z-10 h-[520px] w-[260px] border-[7px] border-black bg-black shadow-[0_32px_90px_rgba(17,24,39,0.18)]" />
          </div>

          <div className="max-w-[760px] text-center lg:text-left">
            <p className="text-[1rem] font-bold tracking-[0.08em] text-[#9a9a9d]">
              APPLICATION
            </p>
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
              className="mt-10 justify-center gap-4 lg:justify-start"
              buttonClassName="px-6 py-3 shadow-[0_18px_40px_rgba(17,24,39,0.08)]"
            />

            <p className="mt-10 text-sm font-medium text-[#a0a0a5]">
              * Some features may be limited when using the app without XORing.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
