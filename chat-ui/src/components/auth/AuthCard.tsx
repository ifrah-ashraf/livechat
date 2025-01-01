import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <Card className={cn(
      "w-full max-w-md backdrop-blur-sm bg-gradient-to-b from-white/95 to-white/90",
      "border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.08)]",
      "animate-in slide-in-from-bottom-4 duration-700",
      className
    )}>
      {children}
    </Card>
  );
}