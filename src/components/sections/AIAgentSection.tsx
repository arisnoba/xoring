import PhoneMockup from "@/components/shared/PhoneMockup";
import SectionContainer from "@/components/shared/SectionContainer";
import { AI_AGENT } from "@/lib/constants";

const phoneThemes = [
  {
    bg: "from-[#faf7ff] via-[#f6f3fb] to-[#efeff2]",
    accent: "bg-[#8c29ff]",
    title: "AI Health Agent",
    body: "Analyzes heart rate, blood oxygen, and sleep to provide real-time fatigue prediction and personalized workout management.",
  },
  {
    bg: "from-[#fff8f0] via-[#fff4e8] to-[#f1efee]",
    accent: "bg-[linear-gradient(90deg,#4cff38,#ff8d3a,#ff3eb2)]",
    title: "AI Emotional Agent",
    body: "Detects stress levels through heart rate variability and activity, automatically recommending meditation or the perfect playlist.",
  },
  {
    bg: "from-[#111214] via-[#101114] to-[#1a1b1f]",
    accent: "bg-[#1d1d1f]",
    title: "AI Social Agent",
    body: "Reads your network status via the ring’s direction and finds nearby users who share your interests and lifestyle.",
  },
  {
    bg: "from-[#fafafa] via-[#f3f3f3] to-[#e8e8e8]",
    accent: "bg-[#d9d9dc]",
    title: "AI Behavior Agent",
    body: "Turns achievements into momentum, activating goals and rewards as your routine becomes more consistent.",
  },
];

function AgentPhone({
  theme,
  dark = false,
}: {
  theme: (typeof phoneThemes)[number];
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-7">
      <h3 className="text-center text-[1.05rem] font-semibold tracking-tight text-[#1e1e1f]">
        {theme.title}
      </h3>
      <PhoneMockup
        className="h-[410px] w-[205px] border-[7px] border-black bg-black shadow-[0_28px_80px_rgba(0,0,0,0.18)] md:h-[440px] md:w-[220px]"
        screenClassName={`bg-gradient-to-b ${theme.bg}`}
      >
        <div className="flex h-full flex-col px-4 pb-4 pt-6">
          <div className={`flex items-center justify-between text-[10px] font-semibold ${dark ? "text-white/60" : "text-black/60"}`}>
            <span>Today</span>
            <span>09:41</span>
          </div>
          <div className={`mt-5 h-2 rounded-full ${dark ? "bg-white/10" : "bg-black/6"}`} />
          <div className="mt-6 grid flex-1 grid-rows-[auto_1fr_auto]">
            <div className="space-y-3">
              <div className={`h-16 rounded-[18px] ${theme.accent} ${dark ? "opacity-95" : "opacity-90"}`} />
              <div className="grid grid-cols-3 gap-2">
                <div className={`h-10 rounded-xl ${dark ? "bg-white/10" : "bg-black/6"}`} />
                <div className={`h-10 rounded-xl ${dark ? "bg-white/10" : "bg-black/6"}`} />
                <div className={`h-10 rounded-xl ${dark ? "bg-white/10" : "bg-black/6"}`} />
              </div>
            </div>
            <div className="mt-6 flex items-end gap-2">
              <div className={`h-[28%] w-3 rounded-full ${dark ? "bg-white/14" : "bg-black/10"}`} />
              <div className={`h-[38%] w-3 rounded-full ${dark ? "bg-white/14" : "bg-black/12"}`} />
              <div className={`h-[24%] w-3 rounded-full ${dark ? "bg-white/12" : "bg-black/10"}`} />
              <div className={`h-[55%] w-3 rounded-full ${dark ? "bg-white/18" : "bg-black/16"}`} />
              <div className={`h-[72%] w-3 rounded-full ${dark ? "bg-white/24" : "bg-black/20"}`} />
              <div className={`h-[44%] w-3 rounded-full ${dark ? "bg-white/16" : "bg-black/14"}`} />
            </div>
            <div className="mt-6">
              <div className={`h-5 rounded-full ${theme.accent}`} />
            </div>
          </div>
        </div>
      </PhoneMockup>
      <div className="max-w-[240px] rounded-[24px] bg-white/86 px-5 py-5 text-center shadow-[0_18px_40px_rgba(17,24,39,0.08)]">
        <p className="text-[0.98rem] font-medium leading-[1.55] text-[#44454a]">
          {theme.body}
        </p>
      </div>
    </div>
  );
}

export default function AIAgentSection() {
  return (
    <section
      id="aios"
      className="relative isolate overflow-hidden bg-[#efefec] text-[#111]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(222,208,192,0.55),transparent_20%),radial-gradient(circle_at_78%_18%,rgba(199,205,210,0.45),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.74),rgba(247,246,243,0.82))]" />
      <SectionContainer className="relative py-24 md:py-28">
        <div className="mx-auto max-w-[920px] text-center">
          <p className="text-[1rem] font-bold tracking-[0.08em] text-[#8a8a8a]">
            AI AGENT
          </p>
          <h2 className="mt-4 text-balance text-[clamp(3.3rem,7vw,6.2rem)] font-black tracking-tight leading-[0.94] text-[#171717]">
            {AI_AGENT.headline.split("\n").map((line, index, arr) => (
              <span key={line}>
                {line}
                {index < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-8 max-w-[980px] text-balance text-[clamp(1.16rem,2vw,1.42rem)] font-semibold leading-[1.5] text-[#2d2d31]">
            {AI_AGENT.subtext}
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-7">
          {phoneThemes.map((theme, index) => (
            <AgentPhone
              key={theme.title}
              theme={theme}
              dark={index === 2}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
