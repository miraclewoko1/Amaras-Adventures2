import { LevelData } from "@/lib/gameProgress";
import { Lock, Star, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations, getTranslatedLevelTitle } from "@/lib/translations";

interface WorldMapProps {
  levels: LevelData[];
  currentLevel: number;
  worldType: "math" | "history";
  onSelectLevel: (levelId: number) => void;
}

export default function WorldMap({ levels, currentLevel, worldType, onSelectLevel }: WorldMapProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  const worldColors = {
    math: {
      bg: "from-purple-400 to-pink-400",
      active: "bg-purple-500",
      completed: "bg-green-500",
      locked: "bg-gray-300 dark:bg-gray-600",
    },
    history: {
      bg: "from-teal-400 to-blue-400",
      active: "bg-teal-500",
      completed: "bg-green-500",
      locked: "bg-gray-300 dark:bg-gray-600",
    },
  };

  const colors = worldColors[worldType];

  const getEraLabel = (era?: string) => {
    switch (era) {
      case "moors":
        return t.moorsTitle;
      case "innovators":
        return t.innovatorsTitle;
      case "pioneers":
        return t.pioneersTitle;
      default:
        return null;
    }
  };

  let currentEra = "";

  return (
    <div className="py-6 px-4 overflow-x-auto">
      <div className="flex items-center justify-start gap-2 min-w-max pb-4">
        {levels.map((level, index) => {
          const isLocked = level.id > currentLevel;
          const isActive = level.id === currentLevel;
          const isCompleted = level.completed;
          
          const showEraLabel = worldType === "history" && level.era && level.era !== currentEra;
          if (level.era) currentEra = level.era;

          return (
            <div key={level.id} className="flex items-center">
              {showEraLabel && (
                <div className="flex flex-col items-center mr-4">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                    {getEraLabel(level.era)}
                  </span>
                  <div className="w-px h-8 bg-border" />
                </div>
              )}
              
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => !isLocked && onSelectLevel(level.id)}
                  disabled={isLocked}
                  className={`
                    relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
                    transition-all duration-200 shadow-lg
                    ${isCompleted ? colors.completed : isActive ? colors.active : colors.locked}
                    ${!isLocked ? "cursor-pointer hover:scale-110 active:scale-95" : "cursor-not-allowed opacity-60"}
                    ${isActive && !isCompleted ? "ring-4 ring-yellow-400 ring-offset-2 animate-pulse" : ""}
                  `}
                  data-testid={`button-level-${worldType}-${level.id}`}
                >
                  {isLocked ? (
                    <Lock className="w-6 h-6 text-white" />
                  ) : isCompleted ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <span className="text-2xl font-bold text-white">{level.id}</span>
                  )}
                  
                  {isCompleted && level.stars > 0 && (
                    <div className="absolute -bottom-1 flex gap-0.5">
                      {[...Array(level.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  )}
                </button>
                
                <span className={`text-xs font-medium text-center max-w-[80px] leading-tight ${
                  isLocked ? "text-muted-foreground" : "text-foreground"
                }`}>
                  {getTranslatedLevelTitle(language, worldType, level.id).title}
                </span>
              </div>

              {index < levels.length - 1 && (
                <div className={`w-6 md:w-10 h-1 mx-1 rounded-full ${
                  levels[index + 1].id <= currentLevel ? colors.completed : "bg-gray-200 dark:bg-gray-700"
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
