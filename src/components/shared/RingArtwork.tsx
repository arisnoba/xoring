import { cn } from "@/lib/utils";
import Image from "next/image";

interface RingArtworkProps {
  className?: string;
  tone?: "light" | "dark";
  blurred?: boolean;
  mark?: "none" | "x";
}

const RING_SRC: Record<NonNullable<RingArtworkProps["mark"]>, string> = {
  none: "/assets/images/ring-xo.png",
  x: "/assets/images/ring-x.png",
};

export default function RingArtwork({
  className,
  blurred = false,
  mark = "none",
}: RingArtworkProps) {
  return (
    <div
      className={cn(
        "relative aspect-[0.96] w-full flex items-center justify-center",
        blurred && "scale-[1.06] saturate-0 blur-[24px]",
        className
      )}
      aria-hidden="true"
    >
      {/* TODO: 추후 업데이트에서 비디오로 변경 시 Image를 video 태그로 교체 */}
      <Image
        src={RING_SRC[mark]}
        alt="Ring Artwork"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain"
        priority
      />
    </div>
  );
}
