import { cn } from "@/lib/utils";

interface RingArtworkProps {
  className?: string;
  tone?: "light" | "dark";
  blurred?: boolean;
  mark?: "none" | "x";
}

export default function RingArtwork({
  className,
  tone = "light",
  blurred = false,
  mark = "none",
}: RingArtworkProps) {
  const frontRingClasses =
    tone === "light"
      ? "border-[#0f0f10] from-[#3f3f42] via-[#121214] to-[#2b2b2e] shadow-[0_40px_120px_rgba(17,17,19,0.28)]"
      : "border-[#060606] from-[#171719] via-[#050506] to-[#232326] shadow-[0_48px_140px_rgba(0,0,0,0.5)]";
  const rearRingClasses =
    tone === "light"
      ? "border-[#262629] from-[#7b7c82] via-[#2b2b2d] to-[#4d4e51] opacity-85"
      : "border-[#101011] from-[#4d4e51] via-[#171719] to-[#2a2b2d] opacity-80";

  return (
    <div
      className={cn(
        "relative aspect-[0.96] w-full",
        blurred && "scale-[1.06] saturate-0 blur-[24px]",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute left-[18%] top-[8%] h-[56%] w-[36%] rounded-[48%] border-[18px] bg-gradient-to-br sm:border-[24px] lg:border-[30px]",
          rearRingClasses
        )}
        style={{ transform: "rotate(-38deg)" }}
      />
      <div
        className={cn(
          "absolute bottom-[2%] right-[4%] h-[78%] w-[54%] rounded-[50%] border-[20px] bg-gradient-to-br sm:border-[26px] lg:border-[34px]",
          frontRingClasses
        )}
        style={{ transform: "rotate(23deg)" }}
      >
        <div className="absolute inset-[10%] rounded-[50%] border border-white/6" />
        {mark === "x" && (
          <div className="absolute left-[4%] top-[12%] flex h-[18%] w-[18%] items-center justify-center text-white/75">
            <span className="absolute h-[18%] w-[86%] rotate-45 rounded-full bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.3)]" />
            <span className="absolute h-[18%] w-[86%] -rotate-45 rounded-full bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.3)]" />
          </div>
        )}
        <div className="absolute right-[7%] top-[18%] flex h-[16%] w-[16%] items-center justify-center rounded-full border border-white/35 bg-gradient-to-br from-[#efefef] via-[#a3a3a7] to-[#4f5054] shadow-[inset_0_1px_3px_rgba(255,255,255,0.7)]">
          <div className="h-[44%] w-[44%] rounded-full bg-gradient-to-br from-[#939499] via-[#626368] to-[#2d2e31]" />
        </div>
      </div>
    </div>
  );
}
