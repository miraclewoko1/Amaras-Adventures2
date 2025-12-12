import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import WorldMap from "@/components/WorldMap";
import PrincessAmara from "@/components/PrincessAmara";
import { ArrowLeft, Calculator, RotateCcw } from "lucide-react";
import { loadProgress, resetWorldProgress, GameProgress } from "@/lib/gameProgress";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations, formatMathMessage } from "@/lib/translations";
import { FlagIcon } from "@/components/FlagIcon";

export default function MathWorld() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const handleSelectLevel = (levelId: number) => {
    setLocation(`/math/level/${levelId}`);
  };

  const handleReset = () => {
    if (progress) {
      const newProgress = resetWorldProgress(progress, "math");
      setProgress(newProgress);
    }
  };

  if (!progress) return null;

  const completedCount = progress.mathLevels.filter((l) => l.completed).length;
  const message = formatMathMessage(language, completedCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-card/90 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{t.mathAdventure}</h1>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={toggleLanguage}
            className="rounded-full font-semibold gap-2 bg-[#D8BFD8] dark:bg-[#942222] border-[#C8A0C8] dark:border-[#6B1818]"
            data-testid="button-language-toggle"
          >
            <FlagIcon country={language === 'en' ? 'us' : 'kr'} />
            {language === 'en' ? 'EN' : '한국어'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            data-testid="button-reset-math"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t.restart}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <PrincessAmara message={message} size="medium" />
        </div>

        <div className="bg-white dark:bg-card rounded-3xl shadow-lg p-6 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            {t.chooseLevel}
          </h2>
          <WorldMap
            levels={progress.mathLevels}
            currentLevel={progress.currentMathLevel}
            worldType="math"
            onSelectLevel={handleSelectLevel}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          {progress.mathLevels.map((level) => {
            const levelTitles: Record<number, { title: string; desc: string }> = {
              1: { title: t.mathL1LevelTitle, desc: t.mathL1LevelDesc },
              2: { title: t.mathL2LevelTitle, desc: t.mathL2LevelDesc },
              3: { title: t.mathL3LevelTitle, desc: t.mathL3LevelDesc },
              4: { title: t.mathL4LevelTitle, desc: t.mathL4LevelDesc },
              5: { title: t.mathL5LevelTitle, desc: t.mathL5LevelDesc },
              6: { title: t.mathL6LevelTitle, desc: t.mathL6LevelDesc },
              7: { title: t.mathL7LevelTitle, desc: t.mathL7LevelDesc },
              8: { title: t.mathL8LevelTitle, desc: t.mathL8LevelDesc },
              9: { title: t.mathL9LevelTitle, desc: t.mathL9LevelDesc },
              10: { title: t.mathL10LevelTitle, desc: t.mathL10LevelDesc },
            };
            const levelIcons: Record<number, string> = {
              1: "1", 2: "2", 3: "3", 4: "4", 5: "5",
              6: "6", 7: "7", 8: "8", 9: "9", 10: "10",
            };
            const translated = levelTitles[level.id] || { title: level.title, desc: level.description };
            
            return (
              <button
                key={level.id}
                onClick={() => level.id <= progress.currentMathLevel && handleSelectLevel(level.id)}
                disabled={level.id > progress.currentMathLevel}
                className={`
                  p-4 rounded-2xl text-center transition-all
                  ${level.id <= progress.currentMathLevel
                    ? "bg-white dark:bg-card shadow-md hover:shadow-lg hover-elevate cursor-pointer"
                    : "bg-muted/50 opacity-50 cursor-not-allowed"
                  }
                  ${level.completed ? "ring-2 ring-green-400" : ""}
                `}
                data-testid={`card-math-level-${level.id}`}
              >
                <div className="text-2xl font-bold mb-2 w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto text-white">
                  {levelIcons[level.id]}
                </div>
                <h3 className="font-bold text-sm text-foreground">{translated.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{translated.desc}</p>
              </button>
            );
          })}
        </div>

      </main>
    </div>
  );
}
