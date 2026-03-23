"use client";

import RingArtwork from "@/components/shared/RingArtwork";
import SectionBadge from "@/components/shared/SectionBadge";
import SectionContainer from "@/components/shared/SectionContainer";
import { SOCIAL_MODE } from "@/lib/constants";

const socialArtThemes = [
  "from-[#846b59] via-[#d3a879] to-[#5f3d29]",
  "from-[#3f5567] via-[#8cb5d1] to-[#1e232b]",
  "from-[#6f4a31] via-[#d5b29a] to-[#2e2320]",
  "from-[#9e835d] via-[#dcc8af] to-[#605041]",
];

function SocialCard({
  title,
  description,
  theme,
}: {
  title: string;
  description: string;
  theme: string;
}) {
  return (
    <article className="min-w-[300px] max-w-[320px] overflow-hidden rounded-[26px] border border-white/60 bg-white/88 shadow-[0_24px_60px_rgba(17,24,39,0.08)] backdrop-blur-xl">
      <div className={`relative aspect-[1.42] w-full bg-gradient-to-br ${theme}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(255,255,255,0.35),transparent_18%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.18)_100%)]" />
      </div>
      <div className="space-y-3 px-6 py-6">
        <h3 className="text-[1.15rem] font-bold tracking-tight text-[#171717]">
          {title}
        </h3>
        <p className="text-[0.98rem] font-medium leading-[1.65] text-[#4e4e53]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function SocialModeSection() {
  return (
    <section
      id="ring"
      className="relative isolate overflow-hidden bg-[#f2f2ef] text-[#111]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.74),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.72))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.18)_28%,rgba(255,255,255,0.08)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_88%,rgba(255,255,255,0.34),transparent_20%),radial-gradient(circle_at_72%_28%,rgba(120,145,154,0.2),transparent_22%),linear-gradient(135deg,rgba(140,150,168,0.16),transparent_40%)]" />
      <div className="absolute inset-y-0 right-0 w-[62%] bg-[linear-gradient(180deg,rgba(118,135,155,0.16),rgba(140,120,94,0.14)),radial-gradient(circle_at_66%_38%,rgba(255,255,255,0.24),transparent_12%),repeating-linear-gradient(90deg,rgba(0,0,0,0.02)_0,rgba(0,0,0,0.02)_5px,transparent_5px,transparent_12px)] opacity-75" />

      <SectionContainer className="relative min-h-[1400px] py-24 md:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-28">
            <SectionBadge label="SOCIAL MODE" icon="o" variant="light" />
            <div className="mt-8 max-w-[250px]">
              <RingArtwork className="w-full" />
            </div>
          </div>

          <div className="pt-4">
            <div className="max-w-[780px]">
              <h2 className="text-balance text-[clamp(3.2rem,7vw,6.2rem)] font-black tracking-tight leading-[0.94] text-[#151515]">
                {SOCIAL_MODE.headline.split("\n").map((line, index, arr) => (
                  <span key={line}>
                    {line}
                    {index < arr.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <p className="mt-8 max-w-[760px] text-[clamp(1.15rem,2vw,1.45rem)] font-semibold leading-[1.45] text-[#252525]">
                {SOCIAL_MODE.subtext}
              </p>
            </div>

            <div className="mt-20 overflow-x-auto pb-6">
              <div className="flex w-max gap-4 pr-8 xl:gap-5">
                {SOCIAL_MODE.cards.map((card, index) => (
                  <SocialCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    theme={socialArtThemes[index % socialArtThemes.length]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
