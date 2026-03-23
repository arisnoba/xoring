import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className,
}: SectionContainerProps) {
  return (
    <div className={cn("max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16", className)}>
      {children}
    </div>
  );
}
