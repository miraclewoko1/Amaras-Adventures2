import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 1 | 2 | 3;
  color: "purple" | "teal" | "yellow" | "pink";
  onPlay: () => void;
  completed?: boolean;
}

export default function GameCard({
  title,
  description,
  icon,
  difficulty,
  color,
  onPlay,
  completed = false,
}: GameCardProps) {
  const colorClasses = {
    purple: "from-purple-400 to-purple-500 dark:from-purple-600 dark:to-purple-700",
    teal: "from-teal-400 to-teal-500 dark:from-teal-600 dark:to-teal-700",
    yellow: "from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-600",
    pink: "from-pink-400 to-rose-500 dark:from-pink-600 dark:to-rose-700",
  };

  return (
    <Card
      className="overflow-visible p-6 flex flex-col items-center text-center gap-4 hover-elevate transition-transform duration-200 hover:scale-[1.02]"
      data-testid={`card-game-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="absolute -top-2 right-4 flex gap-0.5">
        {[1, 2, 3].map((level) => (
          <Star
            key={level}
            className={`w-5 h-5 ${
              level <= difficulty
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>

      <div
        className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-md`}
      >
        <div className="text-white w-14 h-14">{icon}</div>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Button
        onClick={onPlay}
        className="w-full rounded-full text-lg py-6"
        data-testid={`button-play-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {completed ? "Play Again" : "Play"}
      </Button>
    </Card>
  );
}
