import { Star } from "lucide-react";

interface ProgressStarsProps {
  current: number;
  total: number;
  size?: "small" | "medium" | "large";
}

export default function ProgressStars({
  current,
  total,
  size = "medium",
}: ProgressStarsProps) {
  const sizeClasses = {
    small: "w-5 h-5",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex items-center gap-1" data-testid="progress-stars">
      {Array.from({ length: total }).map((_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size]} transition-all duration-300 ${
            index < current
              ? "fill-yellow-400 text-yellow-400 scale-110"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
      <span className="ml-2 text-lg font-semibold text-foreground">
        {current}/{total}
      </span>
    </div>
  );
}
