import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface HistoricalFigureCardProps {
  name: string;
  title: string;
  image: string;
  facts: string[];
  accentColor: "blue" | "amber" | "emerald" | "rose" | "purple";
}

export default function HistoricalFigureCard({
  name,
  title,
  image,
  facts,
  accentColor,
}: HistoricalFigureCardProps) {
  const [expanded, setExpanded] = useState(false);

  const borderColors = {
    blue: "border-blue-400 dark:border-blue-500",
    amber: "border-amber-400 dark:border-amber-500",
    emerald: "border-emerald-400 dark:border-emerald-500",
    rose: "border-rose-400 dark:border-rose-500",
    purple: "border-purple-400 dark:border-purple-500",
  };

  const bgColors = {
    blue: "bg-blue-50 dark:bg-blue-950/30",
    amber: "bg-amber-50 dark:bg-amber-950/30",
    emerald: "bg-emerald-50 dark:bg-emerald-950/30",
    rose: "bg-rose-50 dark:bg-rose-950/30",
    purple: "bg-purple-50 dark:bg-purple-950/30",
  };

  return (
    <Card
      className={`p-6 border-4 ${borderColors[accentColor]} overflow-visible`}
      data-testid={`card-figure-${name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div
          className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg ${bgColors[accentColor]}`}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            data-testid={`img-figure-${name.toLowerCase().replace(/\s+/g, "-")}`}
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
        </div>

        <div className={`w-full rounded-2xl p-4 ${bgColors[accentColor]}`}>
          <p className="text-base text-foreground leading-relaxed">{facts[0]}</p>
        </div>

        {facts.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="gap-2"
              data-testid={`button-expand-${name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {expanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Learn More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>

            {expanded && (
              <div className="w-full space-y-3 animate-in slide-in-from-top-2 duration-200">
                {facts.slice(1).map((fact, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-4 ${bgColors[accentColor]}`}
                  >
                    <p className="text-base text-foreground leading-relaxed">
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
