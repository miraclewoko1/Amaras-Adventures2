export interface LevelData {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  stars: number;
  type: "math" | "history";
  era?: string;
  historicalFigure?: string;
}

export interface LearningPattern {
  puzzleType: string;
  attempts: number;
  completedQuickly: number;
  repeatedCount: number;
  lastPlayed: string;
}

export interface AdventureLevelData {
  id: number;
  completed: boolean;
  stars: number;
}

export type GrowthLevel = "emerging" | "developing" | "proficient" | "advanced";

export interface PerformanceData {
  rhythm_accuracy: number;
  total_taps: number;
  correct_taps: number;
  feedback: string;
}

export interface ArtworkData {
  file_url: string;
  elements_used: ("waves" | "rocks" | "ships" | "stickers" | "mosaic_tiles")[];
  creativity_notes: string;
}

export interface ReflectionData {
  emojis_selected: string[];
  colors_selected: ("warm" | "cool" | "bright")[];
  student_explanation: string;
}

export interface RubricScores {
  rhythm_performance: 1 | 2 | 3 | 4;
  artistic_expression: 1 | 2 | 3 | 4;
  emotional_reflection: 1 | 2 | 3 | 4;
}

export interface ActivityAssessment {
  student_id: string;
  activity_id: string;
  timestamp: string;
  performance: PerformanceData;
  artwork: ArtworkData;
  reflection: ReflectionData;
  teacher_notes: string;
  growth_level: GrowthLevel;
  rubric_scores?: RubricScores;
}

export interface BonusPoints {
  activityId: string;
  points: number;
  earnedAt: string;
}

export interface GameProgress {
  mathLevels: LevelData[];
  historyLevels: LevelData[];
  adventureLevels: AdventureLevelData[];
  currentMathLevel: number;
  currentHistoryLevel: number;
  currentAdventureLevel: number;
  totalStars: number;
  bonusPoints: BonusPoints[];
  learningPatterns: LearningPattern[];
  assessments?: ActivityAssessment[];
}

const MATH_LEVELS: Omit<LevelData, "completed" | "stars">[] = [
  { id: 1, title: "Counting Fruit", description: "Count the yummy fruits!", type: "math" },
  { id: 2, title: "Sorting Shapes", description: "Put shapes where they belong!", type: "math" },
  { id: 3, title: "Matching Patterns", description: "Find the pattern!", type: "math" },
  { id: 4, title: "Complete the Sequence", description: "What comes next?", type: "math" },
  { id: 5, title: "Counting Animals", description: "Count the cute animals!", type: "math" },
  { id: 6, title: "Pour the Water", description: "Fill the right cup!", type: "math" },
  { id: 7, title: "Cut in Half", description: "Learn about fractions!", type: "math" },
  { id: 8, title: "Match Numbers", description: "Numbers and groups!", type: "math" },
  { id: 9, title: "Sort by Size", description: "Big, medium, small!", type: "math" },
  { id: 10, title: "Math Challenge", description: "Use all your skills!", type: "math" },
];

const HISTORY_LEVELS: Omit<LevelData, "completed" | "stars">[] = [
  { id: 1, title: "Meet Tariq", description: "Help Tariq with his ships!", type: "history", era: "moors", historicalFigure: "Tariq ibn Ziyad" },
  { id: 2, title: "Build with Abd al-Rahman", description: "Build a beautiful courtyard!", type: "history", era: "moors", historicalFigure: "Abd al-Rahman I" },
  { id: 3, title: "Think with Averroes", description: "Ideas or tools?", type: "history", era: "moors", historicalFigure: "Averroes" },
  { id: 4, title: "Space Engineer", description: "Engineers love patterns!", type: "history", era: "innovators", historicalFigure: "Mary Golda Ross" },
  { id: 5, title: "Yup'ik Words", description: "Learn with Paul!", type: "history", era: "innovators", historicalFigure: "Paul Joseph John" },
  { id: 6, title: "Build a Windmill", description: "His own spin on a bright idea!", type: "history", era: "innovators", historicalFigure: "William Kamkwamba" },
  { id: 7, title: "Sort Inventions", description: "Home or outdoors?", type: "history", era: "innovators", historicalFigure: "Mary Beatrice Davidson Kenner" },
  { id: 8, title: "Learn Hangul", description: "Match sounds and shapes!", type: "history", era: "pioneers", historicalFigure: "King Sejong" },
  { id: 9, title: "Fly with Amelia", description: "Trace the flight path!", type: "history", era: "pioneers", historicalFigure: "Amelia Earhart" },
  { id: 10, title: "Launch the Rocket", description: "Count to liftoff!", type: "history", era: "pioneers", historicalFigure: "Obvious Figures" },
];

const STORAGE_KEY = "princess-amara-progress";

const ADVENTURE_LEVEL_COUNT = 5;

export function getDefaultProgress(): GameProgress {
  return {
    mathLevels: MATH_LEVELS.map((level) => ({ ...level, completed: false, stars: 0 })),
    historyLevels: HISTORY_LEVELS.map((level) => ({ ...level, completed: false, stars: 0 })),
    adventureLevels: Array.from({ length: ADVENTURE_LEVEL_COUNT }, (_, i) => ({
      id: i + 1,
      completed: false,
      stars: 0,
    })),
    currentMathLevel: 1,
    currentHistoryLevel: 1,
    currentAdventureLevel: 1,
    totalStars: 0,
    bonusPoints: [],
    learningPatterns: [],
  };
}

export function loadProgress(): GameProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration: add adventure levels if not present
      if (!parsed.adventureLevels) {
        parsed.adventureLevels = Array.from({ length: ADVENTURE_LEVEL_COUNT }, (_, i) => ({
          id: i + 1,
          completed: false,
          stars: 0,
        }));
        parsed.currentAdventureLevel = 1;
      }
      // Migration: expand adventure levels if less than ADVENTURE_LEVEL_COUNT (e.g., 3 -> 5)
      if (parsed.adventureLevels.length < ADVENTURE_LEVEL_COUNT) {
        const existingCount = parsed.adventureLevels.length;
        for (let i = existingCount; i < ADVENTURE_LEVEL_COUNT; i++) {
          parsed.adventureLevels.push({
            id: i + 1,
            completed: false,
            stars: 0,
          });
        }
      }
      // Migration: add bonusPoints if not present
      if (!parsed.bonusPoints) {
        parsed.bonusPoints = [];
      }
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load progress:", e);
  }
  return getDefaultProgress();
}

export function saveProgress(progress: GameProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress:", e);
  }
}

export function completeLevel(
  progress: GameProgress,
  world: "math" | "history",
  levelId: number,
  starsEarned: number
): GameProgress {
  const levels = world === "math" ? [...progress.mathLevels] : [...progress.historyLevels];
  const levelIndex = levels.findIndex((l) => l.id === levelId);
  
  if (levelIndex !== -1) {
    levels[levelIndex] = {
      ...levels[levelIndex],
      completed: true,
      stars: Math.max(levels[levelIndex].stars, starsEarned),
    };
  }

  const newCurrentLevel = Math.min(levelId + 1, 10);
  const adventureStars = (progress.adventureLevels || []).reduce((sum, l) => sum + l.stars, 0);
  const totalStars = [...(world === "math" ? levels : progress.mathLevels), 
                       ...(world === "history" ? levels : progress.historyLevels)]
    .reduce((sum, l) => sum + l.stars, 0) + adventureStars;

  const newProgress: GameProgress = {
    ...progress,
    mathLevels: world === "math" ? levels : progress.mathLevels,
    historyLevels: world === "history" ? levels : progress.historyLevels,
    currentMathLevel: world === "math" ? newCurrentLevel : progress.currentMathLevel,
    currentHistoryLevel: world === "history" ? newCurrentLevel : progress.currentHistoryLevel,
    totalStars,
  };

  saveProgress(newProgress);
  return newProgress;
}

export function completeAdventureLevel(
  progress: GameProgress,
  levelId: number,
  starsEarned: number
): GameProgress {
  const levels = [...(progress.adventureLevels || [])];
  const levelIndex = levels.findIndex((l) => l.id === levelId);
  
  if (levelIndex !== -1) {
    levels[levelIndex] = {
      ...levels[levelIndex],
      completed: true,
      stars: Math.max(levels[levelIndex].stars, starsEarned),
    };
  }

  const newCurrentLevel = Math.min(levelId + 1, ADVENTURE_LEVEL_COUNT);
  const adventureStars = levels.reduce((sum, l) => sum + l.stars, 0);
  const mathHistoryStars = [...progress.mathLevels, ...progress.historyLevels]
    .reduce((sum, l) => sum + l.stars, 0);

  const newProgress: GameProgress = {
    ...progress,
    adventureLevels: levels,
    currentAdventureLevel: newCurrentLevel,
    totalStars: mathHistoryStars + adventureStars,
  };

  saveProgress(newProgress);
  return newProgress;
}

export function trackLearningPattern(
  progress: GameProgress,
  puzzleType: string,
  wasQuick: boolean
): GameProgress {
  const patterns = [...progress.learningPatterns];
  const existingIndex = patterns.findIndex((p) => p.puzzleType === puzzleType);
  
  if (existingIndex !== -1) {
    patterns[existingIndex] = {
      ...patterns[existingIndex],
      attempts: patterns[existingIndex].attempts + 1,
      completedQuickly: patterns[existingIndex].completedQuickly + (wasQuick ? 1 : 0),
      lastPlayed: new Date().toISOString(),
    };
  } else {
    patterns.push({
      puzzleType,
      attempts: 1,
      completedQuickly: wasQuick ? 1 : 0,
      repeatedCount: 0,
      lastPlayed: new Date().toISOString(),
    });
  }

  const newProgress = { ...progress, learningPatterns: patterns };
  saveProgress(newProgress);
  return newProgress;
}

export function resetWorldProgress(
  progress: GameProgress,
  world: "math" | "history" | "adventure"
): GameProgress {
  const defaultProgress = getDefaultProgress();
  
  let newTotalStars = progress.totalStars;
  if (world === "math") {
    newTotalStars = progress.historyLevels.reduce((sum, l) => sum + l.stars, 0) +
      (progress.adventureLevels || []).reduce((sum, l) => sum + l.stars, 0);
  } else if (world === "history") {
    newTotalStars = progress.mathLevels.reduce((sum, l) => sum + l.stars, 0) +
      (progress.adventureLevels || []).reduce((sum, l) => sum + l.stars, 0);
  } else if (world === "adventure") {
    newTotalStars = progress.mathLevels.reduce((sum, l) => sum + l.stars, 0) +
      progress.historyLevels.reduce((sum, l) => sum + l.stars, 0);
  }
  
  const newProgress: GameProgress = {
    ...progress,
    mathLevels: world === "math" ? defaultProgress.mathLevels : progress.mathLevels,
    historyLevels: world === "history" ? defaultProgress.historyLevels : progress.historyLevels,
    adventureLevels: world === "adventure" ? defaultProgress.adventureLevels : progress.adventureLevels,
    currentMathLevel: world === "math" ? 1 : progress.currentMathLevel,
    currentHistoryLevel: world === "history" ? 1 : progress.currentHistoryLevel,
    currentAdventureLevel: world === "adventure" ? 1 : progress.currentAdventureLevel,
    totalStars: newTotalStars,
  };

  saveProgress(newProgress);
  return newProgress;
}

export function saveAssessment(
  progress: GameProgress,
  assessment: ActivityAssessment
): GameProgress {
  const assessments = [...(progress.assessments || [])];
  const existingIndex = assessments.findIndex(
    (a) => a.activity_id === assessment.activity_id && a.student_id === assessment.student_id
  );

  if (existingIndex !== -1) {
    assessments[existingIndex] = assessment;
  } else {
    assessments.push(assessment);
  }

  const newProgress = { ...progress, assessments };
  saveProgress(newProgress);
  return newProgress;
}

export function getAssessment(
  progress: GameProgress,
  activityId: string
): ActivityAssessment | undefined {
  return progress.assessments?.find((a) => a.activity_id === activityId);
}

export function calculateGrowthLevel(rubricScores: RubricScores): GrowthLevel {
  const avg = (rubricScores.rhythm_performance + rubricScores.artistic_expression + rubricScores.emotional_reflection) / 3;
  if (avg >= 3.5) return "advanced";
  if (avg >= 2.5) return "proficient";
  if (avg >= 1.5) return "developing";
  return "emerging";
}

export function getParentInsights(progress: GameProgress): string[] {
  const insights: string[] = [];
  const patterns = progress.learningPatterns;

  if (patterns.length === 0) {
    return ["Your child is just getting started! Keep encouraging them."];
  }

  const sorted = [...patterns].sort((a, b) => b.attempts - a.attempts);
  const favorite = sorted[0];
  
  if (favorite) {
    const quickRate = favorite.completedQuickly / favorite.attempts;
    if (quickRate > 0.7) {
      insights.push(`Your child excels at ${favorite.puzzleType} puzzles!`);
    } else if (favorite.attempts > 5) {
      insights.push(`Your child enjoys ${favorite.puzzleType} activities.`);
    }
  }

  const hasPatternSkill = patterns.find((p) => p.puzzleType === "patterns" && p.completedQuickly > 2);
  if (hasPatternSkill) {
    insights.push("Your child learns quickly with pattern games.");
  }

  const hasEngineeringSkill = patterns.find((p) => 
    (p.puzzleType === "building" || p.puzzleType === "sorting") && p.completedQuickly > 2
  );
  if (hasEngineeringSkill) {
    insights.push("Your child enjoys engineering-style puzzles.");
  }

  return insights.length > 0 ? insights : ["Keep playing to discover your child's learning patterns!"];
}

export function saveBonusPoints(
  progress: GameProgress,
  activityId: string,
  points: number
): GameProgress {
  const bonusPoints = [...(progress.bonusPoints || [])];
  const existingIndex = bonusPoints.findIndex((bp) => bp.activityId === activityId);

  if (existingIndex !== -1) {
    bonusPoints[existingIndex] = {
      ...bonusPoints[existingIndex],
      points: Math.max(bonusPoints[existingIndex].points, points),
      earnedAt: new Date().toISOString(),
    };
  } else {
    bonusPoints.push({
      activityId,
      points,
      earnedAt: new Date().toISOString(),
    });
  }

  const newProgress = { ...progress, bonusPoints };
  saveProgress(newProgress);
  return newProgress;
}

export function getTotalBonusPoints(progress: GameProgress): number {
  return (progress.bonusPoints || []).reduce((sum, bp) => sum + bp.points, 0);
}

export function getBonusPointsForActivity(progress: GameProgress, activityId: string): number {
  const bp = (progress.bonusPoints || []).find((b) => b.activityId === activityId);
  return bp?.points || 0;
}
