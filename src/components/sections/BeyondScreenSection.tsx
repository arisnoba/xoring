import SectionContainer from "@/components/shared/SectionContainer";
import { BEYOND_SCREEN } from "@/lib/constants";

const paragraphs = [
  ["In an era where we stare at screens all day,", "is your social media profile really you?"],
  [
    "XORing was created",
    "to help you reclaim your true self,",
    "often lost among countless digital identities.",
  ],
  ["Step off the screen.", "Make every walk, every run,", "and every breath truly count."],
];

export default function BeyondScreenSection() {
  return (
    <section
      id="beyond-screen"
      className="relative isolate min-h-screen overflow-hidden bg-[#0b0908] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_56%_42%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.52)_34%,rgba(0,0,0,0.2)_58%,rgba(0,0,0,0.74)_100%)]" />
      <div className="absolute inset-y-0 right-[-6%] w-[62%] bg-[radial-gradient(circle_at_28%_44%,rgba(120,78,48,0.45),transparent_15%),radial-gradient(circle_at_48%_52%,rgba(255,255,255,0.08),transparent_21%),radial-gradient(circle_at_72%_30%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,rgba(66,46,31,0.18),rgba(18,13,10,0.7))]" />
      <div className="absolute bottom-[-6%] right-[5%] h-[58vw] w-[58vw] max-h-[880px] max-w-[880px] rounded-[38%] bg-[radial-gradient(circle_at_38%_38%,rgba(255,255,255,0.14),transparent_18%),linear-gradient(145deg,rgba(141,101,72,0.4),rgba(28,20,16,0.78)_58%)] blur-[3px]" />
      <div className="absolute right-[10%] top-[16%] hidden h-[58%] w-[25%] rotate-[18deg] rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(39,40,43,0.95),rgba(12,12,13,0.98))] shadow-[0_28px_80px_rgba(0,0,0,0.55)] lg:block">
        <div className="absolute inset-[10px] rounded-[32px] border border-white/6 bg-[linear-gradient(180deg,rgba(78,79,84,0.55),rgba(196,197,200,0.08))]" />
        <div className="absolute inset-x-[12%] top-[3.8%] h-[1.1%] rounded-full bg-black/75" />
      </div>

      <SectionContainer className="relative flex min-h-screen items-center py-24 md:py-28">
        <div className="max-w-[840px]">
          <h2 className="text-balance text-[clamp(3.2rem,7vw,6.25rem)] font-black tracking-tight leading-[0.95]">
            {BEYOND_SCREEN.headline}
          </h2>

          <div className="mt-14 space-y-10 text-[clamp(1.2rem,2vw,1.52rem)] font-semibold leading-[1.45] text-white/95">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-balance">
                {paragraph.map((line) => (
                  <span key={line} className="block">
                    {line}
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
