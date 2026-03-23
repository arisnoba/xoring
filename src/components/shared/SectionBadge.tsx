import Image from "next/image";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  label: string;
  icon?: "o" | "x" | "none";
  variant?: "light" | "dark";
  className?: string;
}

export default function SectionBadge({
  label,
  icon = "none",
  variant = "dark",
  className,
}: SectionBadgeProps) {
  const textColor = variant === "dark" ? "text-[#8a8a8a]" : "text-[#555]";
  const borderColor = variant === "dark" ? "border-[#8a8a8a]" : "border-[#555]";

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs md:text-sm font-bold tracking-[0.2em] uppercase",
        textColor,
        className
      )}
    >
      {icon === "o" && (
        <span
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full border-2",
            borderColor
          )}
        >
          <Image
            src="/assets/images/symbol-o.svg"
            alt="O"
            width={12}
            height={12}
            unoptimized
          />
        </span>
      )}
      {icon === "x" && (
        <span
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full border-2",
            borderColor
          )}
        >
          <Image
            src="/assets/images/symbol-x.svg"
            alt="X"
            width={12}
            height={12}
            unoptimized
          />
        </span>
      )}
      {icon === "none" && (
        <span
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full border-2",
            borderColor
          )}
        >
          <span className="w-2 h-2 rounded-full bg-current" />
        </span>
      )}
      {label}
    </div>
  );
}
