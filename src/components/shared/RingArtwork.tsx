import { cn } from "@/lib/utils";
import Image from "next/image";

interface RingArtworkProps {
  className?: string;
  tone?: "light" | "dark";
  blurred?: boolean;
  mark?: "none" | "x";
}

export default function RingArtwork({
  className,
  blurred = false,
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
      {/* 
        TODO: 추후 업데이트에서 비디오로 변경 시 아래 Image 컴포넌트를 video 태그로 교체하세요.
        예시:
        <video
          src="/assets/videos/ring-xo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-contain"
        />
      */}
      <Image
        src="/assets/images/ring-xo.png"
        alt="Ring Artwork"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain"
        priority
      />
    </div>
  );
}
