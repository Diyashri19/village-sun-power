import { cn } from "@/lib/utils";

interface SolarCardProps {
  title: string;
  content: string;
  variant?: "green" | "yellow" | "white";
  className?: string;
}

const variantStyles = {
  green: "border-l-4 border-l-primary bg-card",
  yellow: "border-l-4 border-l-secondary bg-card",
  white: "border-l-4 border-l-foreground/30 bg-card",
};

export function SolarCard({ title, content, variant = "green", className }: SolarCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-5 shadow-lg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]",
        variantStyles[variant],
        className
      )}
    >
      <h2 className="text-lg font-bold mb-3 text-secondary">{title}</h2>
      <p className="text-foreground/90 whitespace-pre-line text-sm leading-relaxed min-h-[60px]">
        {content}
      </p>
    </div>
  );
}
