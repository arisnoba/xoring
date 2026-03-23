import { ArrowRight, Coins, Dumbbell, FileText, Smartphone } from "lucide-react";
import PhoneMockup from "@/components/shared/PhoneMockup";
import SectionContainer from "@/components/shared/SectionContainer";

const topCards = [
  {
    title: "XORing",
    body: "Workout and behavioral data collected via XORing and the app are logged and submitted to the AIOS network for PoC.",
    theme: "from-[#4b3028] via-[#191618] to-[#090909]",
  },
  {
    title: "AIOS Network",
    body: "The network generates activity blocks at fixed intervals and fairly distributes rewards based on data verification.",
    theme: "from-[#391f4a] via-[#2b273c] to-[#141318]",
  },
];

const bottomCards = [
  {
    title: "From PoW to PoC",
    body: "The era of computers wasting energy to mine is over. We are entering an era where your steps and sweat become real value.",
  },
  {
    title: "Movement equals Value",
    body: "Get rewarded fairly for the time and consistency of your workouts. Lost Bitcoin is reborn through your footsteps.",
  },
  {
    title: "The Data AI Wants Most",
    body: "As AI evolves, it doesn’t just need massive computing power. It needs real human data consistent with your actual movement and sweat.",
  },
];

const steps = [
  { icon: Dumbbell, label: "Wear XORing" },
  { icon: Smartphone, label: "Collect Activity Data" },
  { icon: FileText, label: "Proof of Contribution" },
  { icon: Coins, label: "Mine AIOS" },
];

export default function PocSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#070707] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(180deg,rgba(20,22,25,0.72),rgba(0,0,0,0.94))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_24%_18%,rgba(98,72,56,0.16),transparent_16%)]" />

      <SectionContainer className="relative py-24 md:py-28">
        <div className="mx-auto max-w-[940px] text-center">
          <p className="text-[1rem] font-bold tracking-[0.08em] text-white/55">
            AIOS · PoC
          </p>
          <h2 className="poc-section__title section-title mt-4 text-balance text-white">
            The Value of Sweat
          </h2>
          <p className="section-copy mx-auto mt-8 max-w-[820px] text-balance text-white/92">
            The sweat from your walks and runs becomes real value. Get fairly
            rewarded for your time and consistency.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
            <div className={`aspect-[1.35] rounded-[18px] bg-gradient-to-br ${topCards[0].theme}`} />
            <h3 className="mt-5 text-[1.8rem] font-bold">{topCards[0].title}</h3>
            <p className="mt-3 text-[1rem] font-medium leading-[1.65] text-white/72">
              {topCards[0].body}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <PhoneMockup className="h-[360px] w-[180px] border-[7px] border-black bg-black md:h-[410px] md:w-[205px]">
              <div className="flex h-full flex-col bg-[linear-gradient(180deg,#fafafa,#d8d8da)] px-3 pb-3 pt-6 text-[#111]">
                <div className="flex items-center justify-between text-[10px] font-semibold text-black/65">
                  <span>Activity</span>
                  <span>09:41</span>
                </div>
                <div className="mt-5 rounded-[18px] bg-black/6 p-4">
                  <div className="h-3 w-24 rounded-full bg-black/10" />
                  <div className="mt-4 flex items-end gap-2">
                    <div className="h-12 w-3 rounded-full bg-black/15" />
                    <div className="h-16 w-3 rounded-full bg-black/18" />
                    <div className="h-10 w-3 rounded-full bg-black/12" />
                    <div className="h-20 w-3 rounded-full bg-black/22" />
                    <div className="h-14 w-3 rounded-full bg-black/16" />
                  </div>
                </div>
                <div className="mt-4 flex-1 space-y-2">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl bg-black/7 px-3 py-2 text-[10px] font-semibold"
                    >
                      <span>ENCLOSED</span>
                      <span>+{(index + 1) * 0.1042}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-black/55">
                  <span className="h-2.5 w-2.5 rounded-full bg-black/65" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                </div>
              </div>
            </PhoneMockup>

            <div className="hidden items-center gap-4 text-center text-sm font-medium text-white/60 xl:flex">
              <span>Generate Data</span>
              <ArrowRight size={18} />
              <span>Contribution Reward</span>
              <ArrowRight size={18} />
              <span>Submit Activity Data</span>
              <ArrowRight size={18} />
              <span>Token Reward</span>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
            <div className={`aspect-[1.35] rounded-[18px] bg-gradient-to-br ${topCards[1].theme}`} />
            <h3 className="mt-5 text-[1.8rem] font-bold">{topCards[1].title}</h3>
            <p className="mt-3 text-[1rem] font-medium leading-[1.65] text-white/72">
              {topCards[1].body}
            </p>
          </div>
        </div>

        <p className="section-copy mx-auto mt-16 max-w-[760px] text-balance text-center text-white/92">
          If a computer can prove its value by solving complex puzzles, human
          movement can prove its value, too.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="flex flex-col items-center gap-5 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/8 text-white/92">
                  <Icon size={34} strokeWidth={1.8} />
                </div>
                <div className="space-y-1">
                  <p className="text-[0.82rem] font-bold uppercase tracking-[0.12em] text-white/35">
                    0{index + 1}
                  </p>
                  <p className="text-sm font-medium text-white/78">
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {bottomCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[24px] border border-white/10 bg-white/7 px-6 py-7"
            >
              <h3 className="text-[1.9rem] font-bold tracking-tight">
                {card.title}
              </h3>
              <p className="mt-4 text-[1rem] font-medium leading-[1.7] text-white/72">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="section-copy mx-auto max-w-[860px] text-balance text-white/94">
            Prove your value with just the XORing app. Wear the ring to capture
            richer data and boost your rewards.
          </p>

          <div className="mx-auto mt-12 flex w-fit flex-col items-center">
            <div className="rounded-full bg-white px-8 py-4 text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-[#171717] shadow-[0_18px_50px_rgba(255,255,255,0.08)]">
              XO Wearing Boost + 50%
            </div>
            <div className="-mt-3">
              <PhoneMockup className="h-[420px] w-[210px] border-[7px] border-black bg-black md:h-[500px] md:w-[250px]">
                <div className="flex h-full flex-col bg-[linear-gradient(180deg,#f5f5f6,#dbdcde)] px-4 pb-4 pt-7">
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-[18px] bg-black/85 px-3 py-4 text-left text-white"
                      >
                        <div className="text-[10px] font-medium text-white/45">
                          Block {index + 1}
                        </div>
                        <div className="mt-2 text-lg font-bold">
                          {(index + 1) * 750}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PhoneMockup>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
