import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TariqRhythmGame from "./TariqRhythmGame";
import TariqArtStudio from "./TariqArtStudio";
import TariqReflectionOverlay from "./TariqReflectionOverlay";
import PrincessAmara from "@/components/PrincessAmara";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trophy, Music, Palette, Brain, Heart, Compass, Anchor, Zap, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";
import { 
  loadProgress, 
  saveAssessment, 
  saveBonusPoints,
  calculateGrowthLevel,
  type PerformanceData, 
  type ArtworkData, 
  type ReflectionData,
  type ActivityAssessment,
  type RubricScores
} from "@/lib/gameProgress";
import { completeActivitySession, getNewBadges, type Badge as EarnedBadge } from "@/lib/adaptiveDiagnostics";

type Phase = "intro" | "rhythm" | "art" | "reflection" | "complete";

interface TariqLevelOneExperienceProps {
  onComplete: (stars: number) => void;
}

export default function TariqLevelOneExperience({ onComplete }: TariqLevelOneExperienceProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [rhythmBonusPoints, setRhythmBonusPoints] = useState(0);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [artworkData, setArtworkData] = useState<ArtworkData | null>(null);
  const [bestStreak, setBestStreak] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);
  const { language } = useLanguage();
  const t = getTranslations(language);

  const handleRhythmComplete = (bonusPoints: number, performance: PerformanceData, streak: number) => {
    setRhythmBonusPoints(bonusPoints);
    setPerformanceData(performance);
    setBestStreak(streak);
    
    // Save bonus points to progress (not stars)
    const progress = loadProgress();
    saveBonusPoints(progress, "tariq_rhythm_game", bonusPoints);
    
    setPhase("art");
  };

  const handleArtComplete = (artwork: ArtworkData) => {
    setArtworkData(artwork);
    setPhase("reflection");
  };

  const handleReflectionComplete = (reflection: ReflectionData) => {
    if (performanceData && artworkData) {
      const rubricScores: RubricScores = {
        rhythm_performance: performanceData.rhythm_accuracy >= 75 ? 4 : 
                           performanceData.rhythm_accuracy >= 50 ? 3 :
                           performanceData.rhythm_accuracy >= 25 ? 2 : 1,
        artistic_expression: artworkData.elements_used.length >= 4 ? 4 :
                            artworkData.elements_used.length >= 3 ? 3 :
                            artworkData.elements_used.length >= 2 ? 2 : 1,
        emotional_reflection: reflection.student_explanation.length > 50 ? 4 :
                             reflection.student_explanation.length > 20 ? 3 :
                             reflection.emojis_selected.length >= 3 ? 2 : 1,
      };

      const growthLevel = calculateGrowthLevel(rubricScores);

      const assessment: ActivityAssessment = {
        student_id: "student_1",
        activity_id: "tariq_711_module",
        timestamp: new Date().toISOString(),
        performance: performanceData,
        artwork: artworkData,
        reflection: reflection,
        teacher_notes: "",
        growth_level: growthLevel,
        rubric_scores: rubricScores,
      };

      const progress = loadProgress();
      saveAssessment(progress, assessment);

      const { newBadges } = completeActivitySession(
        "student_1",
        "tariq_711_module",
        performanceData,
        artworkData,
        reflection,
        bestStreak,
        growthLevel
      );
      setEarnedBadges(newBadges);
      
      // Tariq's level awards up to 3 stars based on overall performance
      const avgScore = (rubricScores.rhythm_performance + rubricScores.artistic_expression + rubricScores.emotional_reflection) / 3;
      const totalStars = avgScore >= 3.5 ? 3 : avgScore >= 2.0 ? 2 : 1;
      
      setPhase("complete");
      onComplete(totalStars);
    } else {
      // Fallback if data is missing
      setPhase("complete");
      onComplete(3);
    }
  };

  return (
    <div className="min-h-[500px]">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-6"
          >
            <PrincessAmara
              message={t.tariqJourneyIntro}
              size="large"
            />
            <div className="bg-card rounded-3xl p-6 shadow-lg max-w-md text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t.tariqJourneyTitle}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t.tariqJourneyDesc}
              </p>
              <div className="flex justify-center gap-4 mb-6">
                <span className="text-4xl">⛵️</span>
                <span className="text-4xl">🏔️</span>
                <span className="text-4xl">🌊</span>
              </div>
              <Button
                size="lg"
                onClick={() => setPhase("rhythm")}
                className="rounded-full"
                data-testid="button-start-level"
              >
                {t.startAdventure}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {phase === "rhythm" && (
          <motion.div
            key="rhythm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <TariqRhythmGame onComplete={handleRhythmComplete} />
          </motion.div>
        )}

        {phase === "art" && (
          <motion.div
            key="art"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PrincessAmara
              message={t.tariqArtPrompt}
              size="small"
            />
            <div className="mt-4">
              <TariqArtStudio onComplete={handleArtComplete} />
            </div>
          </motion.div>
        )}

        {phase === "reflection" && (
          <motion.div
            key="reflection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PrincessAmara
              message={t.tariqReflectionPrompt}
              size="small"
            />
            <div className="mt-4">
              <TariqReflectionOverlay onComplete={handleReflectionComplete} />
            </div>
          </motion.div>
        )}

        {phase === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] gap-6"
          >
            <PrincessAmara
              message="You did it! You learned all about Tariq ibn Ziyad and his amazing journey!"
              size="large"
            />
            {earnedBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card rounded-3xl p-6 shadow-lg text-center"
              >
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  New Badges Earned!
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {earnedBadges.map((badge) => (
                    <Badge
                      key={badge.id}
                      variant="secondary"
                      className="px-4 py-2 text-sm"
                      data-testid={`badge-${badge.id}`}
                    >
                      {badge.icon === "music" && <Music className="w-4 h-4 mr-2" />}
                      {badge.icon === "trophy" && <Trophy className="w-4 h-4 mr-2" />}
                      {badge.icon === "zap" && <Zap className="w-4 h-4 mr-2" />}
                      {badge.icon === "palette" && <Palette className="w-4 h-4 mr-2" />}
                      {badge.icon === "sparkles" && <Sparkles className="w-4 h-4 mr-2" />}
                      {badge.icon === "brain" && <Brain className="w-4 h-4 mr-2" />}
                      {badge.icon === "heart" && <Heart className="w-4 h-4 mr-2" />}
                      {badge.icon === "compass" && <Compass className="w-4 h-4 mr-2" />}
                      {badge.icon === "anchor" && <Anchor className="w-4 h-4 mr-2" />}
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
