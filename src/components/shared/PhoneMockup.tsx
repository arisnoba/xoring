import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
  screenClassName?: string;
}

export default function PhoneMockup({
  children,
  className,
  screenClassName,
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative w-[200px] h-[400px] md:w-[240px] md:h-[480px] rounded-[40px] border-[8px] border-[#1d1d1f] bg-[#1d1d1f] shadow-2xl overflow-hidden",
        className
      )}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1d1d1f] rounded-b-2xl z-10" />

      {/* Screen */}
      <div
        className={cn(
          "w-full h-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2c2c2e] to-[#1a1a1a]",
          screenClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
