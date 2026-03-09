import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateIn({
  children,
  className,
  delay = 0,
}: AnimateInProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 transition-none",
        inView && "animate-fade-in-up",
        className,
      )}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
