import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import PrincessAmara from "@/components/PrincessAmara";
import LogicalFallaciesGame from "@/components/game/LogicalFallaciesGame";
import { ArrowLeft, Brain, Trophy } from "lucide-react";
import { loadProgress, saveBonusPoints, getBonusPointsForActivity, GameProgress } from "@/lib/gameProgress";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";
import { FlagIcon } from "@/components/FlagIcon";

export default function BonusQuest() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const bestScore = progress ? getBonusPointsForActivity(progress, "logical_fallacies_game") : 0;

  const handleGameComplete = (score: number, correct: string[], incorrect: string[]) => {
    setLastScore(score);
    setShowResults(true);

    if (progress && score > 0) {
      const newProgress = saveBonusPoints(progress, "logical_fallacies_game", score);
      setProgress(newProgress);
    }
  };

  const handleProgress = (score: number, total: number) => {
    setLastScore(score);
  };

  const getMessage = () => {
    if (showResults) {
      if (lastScore >= 50) return t.bonusResultHigh;
      if (lastScore >= 30) return t.bonusResultMid;
      return t.bonusResultLow;
    }
    return t.bonusWelcome;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-card/90 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setLocation("/adventure/level/5")}
            data-testid="button-back-adventure"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{t.thinkLikeDetective}</h1>
          </div>
          <div className="flex items-center gap-2">
            {bestScore > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400" data-testid="text-best-score">
                  {bestScore}
                </span>
              </div>
            )}
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
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <PrincessAmara message={getMessage()} size="medium" />
        </div>

        <div className="bg-white dark:bg-card rounded-3xl shadow-lg p-6 border border-border">
          <LogicalFallaciesGame
            onComplete={handleGameComplete}
            onProgress={handleProgress}
            language={language}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t.learnSpotMistakes}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setLocation("/")}
            data-testid="button-back-home"
          >
            {t.backToWorld || "Back to Home"}
          </Button>
        </div>
      </main>
    </div>
  );
}
