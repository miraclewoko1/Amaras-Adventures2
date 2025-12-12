import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PrincessAmara from "@/components/PrincessAmara";
import { Calculator, BookOpen, Star, ArrowRight, Moon, Sun, Compass, RotateCcw, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { loadProgress, resetWorldProgress, getAssessment, getTotalBonusPoints, getBonusPointsForActivity, GameProgress, type ActivityAssessment } from "@/lib/gameProgress";
import { parentReport } from "@/lib/tracking";
import { loadDiagnostics, getPortfolioSummary } from "@/lib/adaptiveDiagnostics";
import eduniplayLogo from "@assets/IMG_2686_1765005413381.png";
import { FlagIcon } from "@/components/FlagIcon";
import { getTranslations, formatWelcomeMessage, getTranslatedBadgeName } from "@/lib/translations";
import { useLanguage } from "@/context/LanguageContext";

interface HomeProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Home({ darkMode, onToggleDarkMode }: HomeProps) {
  const [location, setLocation] = useLocation();
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [tariqAssessment, setTariqAssessment] = useState<ActivityAssessment | null>(null);
  const [diagnostics, setDiagnostics] = useState(() => loadDiagnostics("student_1", "tariq_711_module"));
  const [portfolioSummary, setPortfolioSummary] = useState(() => getPortfolioSummary(diagnostics));
  const { language, toggleLanguage } = useLanguage();

  const reloadProgress = useCallback(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    const assessment = getAssessment(loaded, "tariq_711_module");
    setTariqAssessment(assessment || null);
    
    const updatedDiagnostics = loadDiagnostics("student_1", "tariq_711_module");
    setDiagnostics(updatedDiagnostics);
    setPortfolioSummary(getPortfolioSummary(updatedDiagnostics));
  }, []);

  useEffect(() => {
    reloadProgress();
  }, [reloadProgress]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        reloadProgress();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [reloadProgress]);

  useEffect(() => {
    if (location === "/") {
      reloadProgress();
    }
  }, [location, reloadProgress]);

  const totalLevels = 25;
  const completedLevels = progress
    ? [...progress.mathLevels, ...progress.historyLevels, ...(progress.adventureLevels || [])].filter((l) => l.completed).length
    : 0;

  const t = getTranslations(language);
  const welcomeMessage = formatWelcomeMessage(language, completedLevels);

  const insight = parentReport(language);

  const handleResetAdventure = () => {
    if (progress) {
      const newProgress = resetWorldProgress(progress, "adventure");
      setProgress(newProgress);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-start justify-between px-4 py-3 gap-4">
        <img 
          src={eduniplayLogo} 
          alt="EduniPlay Logo" 
          className="w-36 h-36 md:w-48 md:h-48 object-contain"
          data-testid="img-eduniplay-logo"
        />
        
        <div className="flex items-start gap-2 pt-2">
          {/* Language Toggle */}
          <Button
            size="sm"
            variant="outline"
            onClick={toggleLanguage}
            className="rounded-full font-semibold gap-2 bg-[#D8BFD8] dark:bg-[#942222] border-[#C8A0C8] dark:border-[#6B1818]"
            data-testid="button-toggle-language"
          >
            <FlagIcon country={language === 'en' ? 'us' : 'kr'} />
            {language === 'en' ? 'EN' : '한국어'}
          </Button>

          {/* Progress Folder - Assessment Portfolio (Always visible) */}
          <div className="bg-card rounded-2xl p-3 shadow-md border border-border w-64 md:w-72">
            <button
              onClick={() => setShowAssessment(!showAssessment)}
              className="w-full flex items-center justify-between gap-2 text-left"
              data-testid="button-toggle-assessment"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-500" />
                <h4 className="text-xs font-semibold text-foreground">{t.progressFolder}</h4>
              </div>
              <div className="flex items-center gap-1">
                {tariqAssessment ? (
                  <Badge variant="secondary" className="text-xs">
                    {tariqAssessment.growth_level === "emerging" && t.explorer}
                    {tariqAssessment.growth_level === "developing" && t.navigator}
                    {tariqAssessment.growth_level === "proficient" && t.voyager}
                    {tariqAssessment.growth_level === "advanced" && t.captain}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">{t.notStarted}</Badge>
                )}
                {showAssessment ? (
                  <ChevronUp className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
            </button>

            {showAssessment && (
              <div className="mt-2 space-y-2">
                {tariqAssessment ? (
                  <>
                    {/* Rubric Scores */}
                    <div className="grid grid-cols-3 gap-1">
                      <div className="bg-muted/50 rounded-lg p-1.5 text-center">
                        <div className="text-sm font-bold text-teal-500">
                          {tariqAssessment.rubric_scores?.rhythm_performance || 0}/4
                        </div>
                        <div className="text-[10px] text-muted-foreground">{t.rhythm}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-1.5 text-center">
                        <div className="text-sm font-bold text-blue-500">
                          {tariqAssessment.rubric_scores?.artistic_expression || 0}/4
                        </div>
                        <div className="text-[10px] text-muted-foreground">{t.art}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-1.5 text-center">
                        <div className="text-sm font-bold text-purple-500">
                          {tariqAssessment.rubric_scores?.emotional_reflection || 0}/4
                        </div>
                        <div className="text-[10px] text-muted-foreground">{t.reflection}</div>
                      </div>
                    </div>

                    {/* Artwork Preview */}
                    {tariqAssessment.artwork?.file_url && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-medium text-foreground">{t.myArtwork}</span>
                        <img
                          src={tariqAssessment.artwork.file_url}
                          alt="Student artwork"
                          className="max-w-full h-16 object-contain rounded border border-border"
                          data-testid="img-artwork-preview"
                        />
                      </div>
                    )}

                    {/* Reflection Emojis */}
                    {tariqAssessment.reflection?.emojis_selected && 
                     tariqAssessment.reflection.emojis_selected.length > 0 && (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[10px] font-medium text-foreground">{t.howIFelt}</span>
                        <div className="flex gap-1">
                          {tariqAssessment.reflection.emojis_selected.map((emoji: string, i: number) => (
                            <span key={i} className="text-base" data-testid={`emoji-${i}`}>{emoji}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Student Explanation */}
                    {tariqAssessment.reflection?.student_explanation && (
                      <div className="bg-muted/30 rounded p-1.5">
                        <p className="text-[10px] text-foreground italic line-clamp-2">
                          "{tariqAssessment.reflection.student_explanation}"
                        </p>
                      </div>
                    )}

                    <div className="text-[10px] text-muted-foreground text-center">
                      {new Date(tariqAssessment.timestamp).toLocaleDateString()}
                    </div>
                    
                    {/* Portfolio Summary */}
                    {portfolioSummary.totalEntries > 0 && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">{t.sessions}</span>
                          <span className="text-xs font-bold text-foreground">{portfolioSummary.totalEntries}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">{t.bestRhythm}</span>
                          <span className="text-xs font-bold text-teal-500">{portfolioSummary.bestRhythmAccuracy}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">{t.badges}</span>
                          <span className="text-xs font-bold text-yellow-500">{portfolioSummary.badgeCount}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Bonus Points Display */}
                    {progress && getTotalBonusPoints(progress) > 0 && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-medium text-foreground">{t.bonusPoints}</span>
                          <span className="text-xs font-bold text-orange-500" data-testid="text-total-bonus-points">
                            {getTotalBonusPoints(progress)} pts
                          </span>
                        </div>
                        {getBonusPointsForActivity(progress, "tariq_rhythm_game") > 0 && (
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-muted-foreground">{t.rhythmGame}</span>
                            <span className="text-[10px] text-orange-400" data-testid="text-rhythm-bonus-points">
                              {getBonusPointsForActivity(progress, "tariq_rhythm_game")} pts
                            </span>
                          </div>
                        )}
                        {getBonusPointsForActivity(progress, "bonus_quest_game") > 0 && (
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-muted-foreground">{t.bonusQuestGame}</span>
                            <span className="text-[10px] text-orange-400" data-testid="text-bonus-quest-points">
                              {getBonusPointsForActivity(progress, "bonus_quest_game")} pts
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Badges Display */}
                    {diagnostics.badges_earned.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <span className="text-[10px] font-medium text-foreground">{t.earnedBadges}</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {diagnostics.badges_earned.slice(0, 4).map((badge) => (
                            <Badge key={badge.id} variant="secondary" className="text-[9px] px-1.5 py-0.5" data-testid={`badge-${badge.id}`}>
                              {getTranslatedBadgeName(language, badge.id)}
                            </Badge>
                          ))}
                          {diagnostics.badges_earned.length > 4 && (
                            <Badge variant="outline" className="text-[9px] px-1.5 py-0.5">
                              +{diagnostics.badges_earned.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-3">
                    <p className="text-xs text-muted-foreground">{t.noProgressYet}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {t.completeHistory}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleDarkMode}
            className="rounded-full"
            data-testid="button-toggle-dark-mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto px-4 py-4 md:py-8 w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-6">
          {t.pageTitle}
        </h1>
        <div className="flex flex-col items-center gap-6 mb-10">
          <PrincessAmara message={welcomeMessage} size="hero" showFamily={true} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <button
            onClick={() => setLocation("/math")}
            className="group relative overflow-visible rounded-3xl p-8 bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-xl hover-elevate active-elevate-2 transition-all"
            data-testid="button-math-adventure"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <Calculator className="w-10 h-10" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{t.mathAdventure}</h2>
              <p className="text-lg opacity-90">
                {t.countSortSolve}
              </p>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <Star className="w-4 h-4 fill-current" />
                <span>{t.level} {progress?.currentMathLevel || 1} / 10</span>
              </div>
            </div>
            <ArrowRight className="absolute bottom-6 right-6 w-8 h-8 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setLocation("/history")}
            className="group relative overflow-visible rounded-3xl p-8 bg-gradient-to-br from-teal-400 to-blue-400 text-white shadow-xl hover-elevate active-elevate-2 transition-all"
            data-testid="button-history-adventure"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <BookOpen className="w-10 h-10" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{t.historyAdventure}</h2>
              <p className="text-lg opacity-90">
                {t.meetHeroes}
              </p>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <Star className="w-4 h-4 fill-current" />
                <span>{t.level} {progress?.currentHistoryLevel || 1} / 10</span>
              </div>
            </div>
            <ArrowRight className="absolute bottom-6 right-6 w-8 h-8 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-3 mb-10">
          <button
            onClick={() => setLocation("/adventure/level/1")}
            className="group relative overflow-visible rounded-2xl px-8 py-5 bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg hover-elevate active-elevate-2 transition-all"
            data-testid="button-adventure-mode"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold">{t.adventureMode}</h3>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{t.level} {progress?.currentAdventureLevel || 1} / 5</span>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 opacity-60 group-hover:translate-x-1 transition-transform ml-2" />
            </div>
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetAdventure}
            data-testid="button-reset-adventure"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t.restart}
          </Button>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold text-foreground">{t.worldProgress}</h3>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-foreground">
                {progress?.totalStars || 0} {t.stars}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground w-20">{t.math}</span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${(progress?.mathLevels.filter((l) => l.completed).length || 0) * 10}%`,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-foreground w-12 text-right">
                {progress?.mathLevels.filter((l) => l.completed).length || 0}/10
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground w-20">{t.history}</span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-blue-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${(progress?.historyLevels.filter((l) => l.completed).length || 0) * 10}%`,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-foreground w-12 text-right">
                {progress?.historyLevels.filter((l) => l.completed).length || 0}/10
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground w-20">{t.adventure}</span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${(progress?.adventureLevels?.filter((l) => l.completed).length || 0) * 20}%`,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-foreground w-12 text-right">
                {progress?.adventureLevels?.filter((l) => l.completed).length || 0}/5
              </span>
            </div>
          </div>

          {/* Parent Insights Section */}
          <div className="mt-6 text-center">
            <h4 className="text-md font-semibold text-foreground mb-2">{t.parentInsights}</h4>
            <p className="text-sm text-muted-foreground italic">
              {insight}
            </p>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground">
              {t.levelProgress.replace('{current}', String(completedLevels)).replace('{total}', String(totalLevels))}
            </span>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center border-t border-border">
        <span className="text-sm text-muted-foreground" data-testid="text-copyright">
          {t.copyright}
        </span>
      </footer>
    </div>
  );
}
