import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import WorldMap from "@/components/WorldMap";
import PrincessAmara from "@/components/PrincessAmara";
import { ArrowLeft, BookOpen, RotateCcw } from "lucide-react";
import { loadProgress, resetWorldProgress, GameProgress } from "@/lib/gameProgress";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations, formatHistoryMessage } from "@/lib/translations";
import { FlagIcon } from "@/components/FlagIcon";

export default function HistoryWorld() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslations(language);

  const ERA_INFO_TRANSLATED = {
    moors: {
      title: t.moorsTitle,
      description: t.moorsDescription,
      icon: "🕌",
      color: "from-amber-400 to-orange-400",
    },
    innovators: {
      title: t.innovatorsTitle,
      description: t.innovatorsDescription,
      icon: "💡",
      color: "from-green-400 to-teal-400",
    },
    pioneers: {
      title: t.pioneersTitle,
      description: t.pioneersDescription,
      icon: "🚀",
      color: "from-blue-400 to-purple-400",
    },
  };

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const handleSelectLevel = (levelId: number) => {
    setLocation(`/history/level/${levelId}`);
  };

  const handleReset = () => {
    if (progress) {
      const newProgress = resetWorldProgress(progress, "history");
      setProgress(newProgress);
    }
  };

  if (!progress) return null;

  const completedCount = progress.historyLevels.filter((l) => l.completed).length;
  const message = formatHistoryMessage(language, completedCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20">
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{t.historyAdventure}</h1>
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
            data-testid="button-reset-history"
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

        <div className="bg-white dark:bg-card rounded-3xl shadow-lg p-6 border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            {t.chooseLevel}
          </h2>
          <WorldMap
            levels={progress.historyLevels}
            currentLevel={progress.currentHistoryLevel}
            worldType="history"
            onSelectLevel={handleSelectLevel}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(ERA_INFO_TRANSLATED).map(([key, era]) => {
            const eraLevels = progress.historyLevels.filter((l) => l.era === key);
            const completedInEra = eraLevels.filter((l) => l.completed).length;
            const isUnlocked = eraLevels.some((l) => l.id <= progress.currentHistoryLevel);

            return (
              <div
                key={key}
                className={`
                  rounded-2xl p-6 transition-all
                  ${isUnlocked
                    ? "bg-white dark:bg-card shadow-md"
                    : "bg-muted/50 opacity-60"
                  }
                `}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${era.color} flex items-center justify-center mb-4 mx-auto`}
                >
                  <span className="text-3xl">{era.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground text-center mb-2">
                  {era.title}
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {era.description}
                </p>
                <div className="flex justify-center gap-2">
                  {eraLevels.map((level) => (
                    <div
                      key={level.id}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                        ${level.completed
                          ? "bg-green-500 text-white"
                          : level.id <= progress.currentHistoryLevel
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                        }
                      `}
                    >
                      {level.id}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  {completedInEra} / {eraLevels.length} {t.completed}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
