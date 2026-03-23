import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  variant?: "light" | "dark";
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  variant = "light",
  className,
}: FeatureCardProps) {
  const bg = variant === "light"
    ? "bg-[#f5f5f7]/90 border-white/50"
    : "bg-[#2c2c2e]/80 border-white/10";
  const titleColor = variant === "light" ? "text-[#111]" : "text-white";
  const descColor = variant === "light" ? "text-[#555]" : "text-[#8a8a8a]";
  const imageBg = variant === "light"
    ? "bg-gradient-to-br from-[#d1d1d6] to-[#e5e5ea]"
    : "bg-gradient-to-br from-[#2c2c2e] to-[#3a3a3c]";

  return (
    <div
      data-placeholder="feature-card-image"
      className={cn(
        "flex flex-col rounded-[24px] overflow-hidden border backdrop-blur-sm",
        "shadow-sm hover:shadow-xl transition-all duration-300 h-full group",
        bg,
        className
      )}
    >
      {/* Image area */}
      <div className={cn("relative aspect-[4/3] w-full overflow-hidden", imageBg)}>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-16 h-16 rounded-full border-4 border-current" />
        </div>
        <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
      </div>

      {/* Text */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className={cn("text-xl font-bold mb-3", titleColor)}>{title}</h3>
        <p className={cn("text-sm md:text-base leading-relaxed font-medium", descColor)}>
          {description}
        </p>
      </div>
    </div>
  );
}
