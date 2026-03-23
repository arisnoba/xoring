"use client";

import RingArtwork from "@/components/shared/RingArtwork";
import SectionBadge from "@/components/shared/SectionBadge";
import SectionContainer from "@/components/shared/SectionContainer";
import { PRIVATE_MODE } from "@/lib/constants";

const privateArtThemes = [
  "from-[#7a5b34] via-[#f0b96d] to-[#25180f]",
  "from-[#56362a] via-[#b57a52] to-[#281612]",
  "from-[#f4e5cf] via-[#f7f0df] to-[#c8a677]",
  "from-[#613829] via-[#b37b58] to-[#221411]",
];

function PrivateCard({
  title,
  description,
  theme,
}: {
  title: string;
  description: string;
  theme: string;
}) {
  return (
    <article className="min-w-[300px] max-w-[320px] overflow-hidden rounded-[26px] border border-white/10 bg-[rgba(29,29,31,0.72)] shadow-[0_26px_70px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <div className={`relative aspect-[1.42] w-full bg-gradient-to-br ${theme}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_14%,rgba(255,255,255,0.2),transparent_18%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.22)_100%)]" />
      </div>
      <div className="space-y-3 px-6 py-6">
        <h3 className="text-[1.15rem] font-bold tracking-tight text-white">
          {title}
        </h3>
        <p className="text-[0.98rem] font-medium leading-[1.65] text-white/80">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function PrivateModeSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071416] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_12%,rgba(15,67,73,0.4),transparent_22%),linear-gradient(180deg,rgba(3,18,19,0.88),rgba(4,10,11,0.92))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_74%,rgba(107,65,33,0.26),transparent_18%),radial-gradient(circle_at_72%_28%,rgba(35,102,111,0.2),transparent_18%),repeating-linear-gradient(90deg,rgba(255,255,255,0.015)_0,rgba(255,255,255,0.015)_7px,transparent_7px,transparent_18px)] opacity-90" />

      <SectionContainer className="relative min-h-[1450px] py-24 md:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-28">
            <SectionBadge label="PRIVATE MODE" icon="x" variant="dark" />
            <div className="mt-8 max-w-[250px]">
              <RingArtwork tone="dark" mark="x" className="w-full" />
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
              <p className="section-copy section-copy--tight mt-8 max-w-[700px] text-white/92">
                {PRIVATE_MODE.subtext}
              </p>
            </div>

            <div className="mt-20 overflow-x-auto pb-6">
              <div className="flex w-max gap-4 pr-8 xl:gap-5">
                {PRIVATE_MODE.cards.map((card, index) => (
                  <PrivateCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    theme={privateArtThemes[index % privateArtThemes.length]}
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
