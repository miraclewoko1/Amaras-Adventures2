/**
 * Adaptive Diagnostics Module for Educational Activities
 * 
 * This module provides Duolingo-style adaptive learning features:
 * - Diagnostic tracking for rhythm, art, and reflection activities
 * - Adaptive difficulty pathways based on performance
 * - Personalized feedback generation
 * - Portfolio entry management
 * 
 * Reusable for future modules (math, science, history)
 */

import type { PerformanceData, ArtworkData, ReflectionData, GrowthLevel } from "./gameProgress";

// ============================================================================
// DATA SCHEMA - Student performance tracking
// ============================================================================

export interface StudentDiagnostics {
  student_id: string;
  activity_id: string;
  rhythm: RhythmDiagnostics;
  art: ArtDiagnostics;
  reflection: ReflectionDiagnostics;
  adaptive_settings: AdaptiveSettings;
  badges_earned: Badge[];
  portfolio_entries: PortfolioEntry[];
  growth_level: GrowthLevel;
  last_updated: string;
}

export interface RhythmDiagnostics {
  accuracy_history: number[];
  current_accuracy: number;
  total_sessions: number;
  best_streak: number;
  difficulty_level: DifficultyLevel;
}

export interface ArtDiagnostics {
  elements_used_history: string[][];
  current_elements: string[];
  creativity_score: number;
  tools_unlocked: ArtToolType[];
  difficulty_level: DifficultyLevel;
}

export interface ReflectionDiagnostics {
  depth_history: number[];
  current_depth: number;
  prompts_shown: string[];
  difficulty_level: DifficultyLevel;
}

export interface AdaptiveSettings {
  rhythm_tempo: TempoSetting;
  rhythm_prompt_count: PromptDensity;
  art_mode: ArtMode;
  reflection_scaffolding: ScaffoldingLevel;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned_at: string;
  category: "rhythm" | "art" | "reflection" | "overall";
}

export interface PortfolioEntry {
  id: string;
  activity_id: string;
  timestamp: string;
  performance: PerformanceData;
  artwork: ArtworkData;
  reflection: ReflectionData;
  growth_level: GrowthLevel;
  badges_earned: string[];
}

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type DifficultyLevel = 1 | 2 | 3;
export type TempoSetting = "slow" | "normal" | "fast";
export type PromptDensity = "reduced" | "normal" | "syncopated";
export type ArtMode = "guided" | "standard" | "advanced";
export type ScaffoldingLevel = "high" | "medium" | "low";

// ============================================================================
// STORAGE KEY
// ============================================================================

const DIAGNOSTICS_KEY = "princess-amara-diagnostics";

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export function getDefaultDiagnostics(studentId: string, activityId: string): StudentDiagnostics {
  return {
    student_id: studentId,
    activity_id: activityId,
    rhythm: {
      accuracy_history: [],
      current_accuracy: 0,
      total_sessions: 0,
      best_streak: 0,
      difficulty_level: 2,
    },
    art: {
      elements_used_history: [],
      current_elements: [],
      creativity_score: 0,
      tools_unlocked: ["brush", "eraser", "sticker"],
      difficulty_level: 2,
    },
    reflection: {
      depth_history: [],
      current_depth: 0,
      prompts_shown: [],
      difficulty_level: 2,
    },
    adaptive_settings: {
      rhythm_tempo: "normal",
      rhythm_prompt_count: "normal",
      art_mode: "standard",
      reflection_scaffolding: "medium",
    },
    badges_earned: [],
    portfolio_entries: [],
    growth_level: "emerging",
    last_updated: new Date().toISOString(),
  };
}

// ============================================================================
// LOAD / SAVE DIAGNOSTICS
// ============================================================================

export function loadDiagnostics(studentId: string, activityId: string): StudentDiagnostics {
  try {
    const stored = localStorage.getItem(DIAGNOSTICS_KEY);
    if (stored) {
      const allDiagnostics: Record<string, StudentDiagnostics> = JSON.parse(stored);
      const key = `${studentId}_${activityId}`;
      if (allDiagnostics[key]) {
        const diagnostics = allDiagnostics[key];
        // Migration: rename speed_demon badge to speed_racer
        if (diagnostics.badges_earned) {
          let needsSave = false;
          diagnostics.badges_earned = diagnostics.badges_earned.map(badge => {
            if (badge.id === 'speed_demon') {
              needsSave = true;
              return { ...badge, id: 'speed_racer', name: 'Speed Racer' };
            }
            return badge;
          });
          if (needsSave) {
            allDiagnostics[key] = diagnostics;
            localStorage.setItem(DIAGNOSTICS_KEY, JSON.stringify(allDiagnostics));
          }
        }
        return diagnostics;
      }
    }
  } catch (e) {
    console.error("Failed to load diagnostics:", e);
  }
  return getDefaultDiagnostics(studentId, activityId);
}

export function saveDiagnostics(diagnostics: StudentDiagnostics): void {
  try {
    const stored = localStorage.getItem(DIAGNOSTICS_KEY);
    const allDiagnostics: Record<string, StudentDiagnostics> = stored ? JSON.parse(stored) : {};
    const key = `${diagnostics.student_id}_${diagnostics.activity_id}`;
    allDiagnostics[key] = { ...diagnostics, last_updated: new Date().toISOString() };
    localStorage.setItem(DIAGNOSTICS_KEY, JSON.stringify(allDiagnostics));
  } catch (e) {
    console.error("Failed to save diagnostics:", e);
  }
}

// ============================================================================
// DIAGNOSTIC FUNCTIONS - Rhythm
// ============================================================================

/**
 * Update rhythm diagnostics and adapt difficulty
 * - If accuracy < 50% → slow tempo, reduce prompts
 * - If accuracy > 80% → increase tempo, add syncopated notes
 */
export function updateRhythmDiagnostics(
  diagnostics: StudentDiagnostics,
  performance: PerformanceData,
  streak: number
): StudentDiagnostics {
  const { rhythm_accuracy } = performance;
  
  const newRhythm: RhythmDiagnostics = {
    accuracy_history: [...diagnostics.rhythm.accuracy_history, rhythm_accuracy].slice(-10),
    current_accuracy: rhythm_accuracy,
    total_sessions: diagnostics.rhythm.total_sessions + 1,
    best_streak: Math.max(diagnostics.rhythm.best_streak, streak),
    difficulty_level: calculateRhythmDifficulty(rhythm_accuracy, diagnostics.rhythm.difficulty_level),
  };

  const newSettings = { ...diagnostics.adaptive_settings };
  
  if (rhythm_accuracy < 50) {
    newSettings.rhythm_tempo = "slow";
    newSettings.rhythm_prompt_count = "reduced";
  } else if (rhythm_accuracy >= 80) {
    newSettings.rhythm_tempo = "fast";
    newSettings.rhythm_prompt_count = "syncopated";
  } else {
    newSettings.rhythm_tempo = "normal";
    newSettings.rhythm_prompt_count = "normal";
  }

  return {
    ...diagnostics,
    rhythm: newRhythm,
    adaptive_settings: newSettings,
  };
}

function calculateRhythmDifficulty(accuracy: number, currentLevel: DifficultyLevel): DifficultyLevel {
  if (accuracy < 40 && currentLevel > 1) return (currentLevel - 1) as DifficultyLevel;
  if (accuracy >= 85 && currentLevel < 3) return (currentLevel + 1) as DifficultyLevel;
  return currentLevel;
}

/**
 * Get rhythm game settings based on diagnostics
 */
export function getRhythmSettings(diagnostics: StudentDiagnostics) {
  const { rhythm_tempo, rhythm_prompt_count } = diagnostics.adaptive_settings;
  
  let tempoMultiplier = 1;
  if (rhythm_tempo === "slow") tempoMultiplier = 0.7;
  else if (rhythm_tempo === "fast") tempoMultiplier = 1.3;
  
  let promptFrequency = 1;
  if (rhythm_prompt_count === "reduced") promptFrequency = 0.5;
  else if (rhythm_prompt_count === "syncopated") promptFrequency = 1.5;
  
  return { tempoMultiplier, promptFrequency, difficulty: diagnostics.rhythm.difficulty_level };
}

// ============================================================================
// DIAGNOSTIC FUNCTIONS - Art
// ============================================================================

export type ArtToolType = "brush" | "eraser" | "sticker" | "mosaic" | "guided_waves" | "guided_ships" | "layered_mosaic" | "animated_brush";

/**
 * Update art diagnostics and adapt available tools
 * - If minimal elements → unlock guided templates (waves, ships)
 * - If detailed artwork → unlock advanced tools (layered mosaics, animated brushes)
 */
export function updateArtDiagnostics(
  diagnostics: StudentDiagnostics,
  artwork: ArtworkData
): StudentDiagnostics {
  const elementsCount = artwork.elements_used.length;
  
  const newArt: ArtDiagnostics = {
    elements_used_history: [...diagnostics.art.elements_used_history, artwork.elements_used].slice(-10),
    current_elements: artwork.elements_used,
    creativity_score: calculateCreativityScore(artwork),
    tools_unlocked: determineUnlockedTools(elementsCount, diagnostics.art.tools_unlocked),
    difficulty_level: calculateArtDifficulty(elementsCount, diagnostics.art.difficulty_level),
  };

  const newSettings = { ...diagnostics.adaptive_settings };
  
  if (elementsCount <= 1) {
    newSettings.art_mode = "guided";
  } else if (elementsCount >= 4) {
    newSettings.art_mode = "advanced";
  } else {
    newSettings.art_mode = "standard";
  }

  return {
    ...diagnostics,
    art: newArt,
    adaptive_settings: newSettings,
  };
}

function calculateCreativityScore(artwork: ArtworkData): number {
  const baseScore = artwork.elements_used.length * 20;
  const varietyBonus = new Set(artwork.elements_used).size * 10;
  return Math.min(100, baseScore + varietyBonus);
}

function determineUnlockedTools(elementsCount: number, currentTools: ArtToolType[]): ArtToolType[] {
  const tools = new Set(currentTools);
  
  if (elementsCount <= 1) {
    tools.add("guided_waves");
    tools.add("guided_ships");
  }
  
  if (elementsCount >= 4) {
    tools.add("layered_mosaic");
    tools.add("animated_brush");
  }
  
  return Array.from(tools);
}

function calculateArtDifficulty(elementsCount: number, currentLevel: DifficultyLevel): DifficultyLevel {
  if (elementsCount <= 1 && currentLevel > 1) return (currentLevel - 1) as DifficultyLevel;
  if (elementsCount >= 4 && currentLevel < 3) return (currentLevel + 1) as DifficultyLevel;
  return currentLevel;
}

/**
 * Get art studio settings based on diagnostics
 */
export function getArtSettings(diagnostics: StudentDiagnostics) {
  return {
    mode: diagnostics.adaptive_settings.art_mode,
    unlockedTools: diagnostics.art.tools_unlocked,
    difficulty: diagnostics.art.difficulty_level,
    showGuidedTemplates: diagnostics.adaptive_settings.art_mode === "guided",
    showAdvancedTools: diagnostics.adaptive_settings.art_mode === "advanced",
  };
}

// ============================================================================
// DIAGNOSTIC FUNCTIONS - Reflection
// ============================================================================

export interface ReflectionPrompt {
  id: string;
  text: string;
  level: ScaffoldingLevel;
  category: "basic" | "empathy" | "comparative";
}

const SCAFFOLD_PROMPTS: ReflectionPrompt[] = [
  { id: "basic_1", text: "How did the Berbers feel when they saw the mountain?", level: "high", category: "basic" },
  { id: "basic_2", text: "Were the Visigoths happy or worried?", level: "high", category: "basic" },
  { id: "empathy_1", text: "How might the Visigoths have felt when they saw the ships?", level: "medium", category: "empathy" },
  { id: "empathy_2", text: "What do you think Tariq felt leading his people?", level: "medium", category: "empathy" },
  { id: "comparative_1", text: "How might Córdoba feel different from Toledo after this journey?", level: "low", category: "comparative" },
  { id: "comparative_2", text: "Compare how explorers and locals might have different feelings.", level: "low", category: "comparative" },
];

/**
 * Update reflection diagnostics and adapt prompts
 * - If shallow → add extra scaffolding prompts
 * - If nuanced → unlock deeper comparative prompts
 */
export function updateReflectionDiagnostics(
  diagnostics: StudentDiagnostics,
  reflection: ReflectionData
): StudentDiagnostics {
  const depth = calculateReflectionDepth(reflection);
  
  const newReflection: ReflectionDiagnostics = {
    depth_history: [...diagnostics.reflection.depth_history, depth].slice(-10),
    current_depth: depth,
    prompts_shown: diagnostics.reflection.prompts_shown,
    difficulty_level: calculateReflectionDifficulty(depth, diagnostics.reflection.difficulty_level),
  };

  const newSettings = { ...diagnostics.adaptive_settings };
  
  if (depth < 30) {
    newSettings.reflection_scaffolding = "high";
  } else if (depth >= 70) {
    newSettings.reflection_scaffolding = "low";
  } else {
    newSettings.reflection_scaffolding = "medium";
  }

  return {
    ...diagnostics,
    reflection: newReflection,
    adaptive_settings: newSettings,
  };
}

function calculateReflectionDepth(reflection: ReflectionData): number {
  let depth = 0;
  
  const emojiCount = reflection.emojis_selected.length;
  depth += Math.min(30, emojiCount * 10);
  
  const colorVariety = reflection.colors_selected.length;
  depth += Math.min(20, colorVariety * 10);
  
  const explanationLength = reflection.student_explanation.length;
  if (explanationLength > 100) depth += 50;
  else if (explanationLength > 50) depth += 35;
  else if (explanationLength > 20) depth += 20;
  else if (explanationLength > 0) depth += 10;
  
  return Math.min(100, depth);
}

function calculateReflectionDifficulty(depth: number, currentLevel: DifficultyLevel): DifficultyLevel {
  if (depth < 30 && currentLevel > 1) return (currentLevel - 1) as DifficultyLevel;
  if (depth >= 70 && currentLevel < 3) return (currentLevel + 1) as DifficultyLevel;
  return currentLevel;
}

/**
 * Get reflection prompts based on diagnostics
 */
export function getReflectionPrompts(diagnostics: StudentDiagnostics): ReflectionPrompt[] {
  const { reflection_scaffolding } = diagnostics.adaptive_settings;
  
  if (reflection_scaffolding === "high") {
    return SCAFFOLD_PROMPTS.filter(p => p.level === "high" || p.level === "medium");
  } else if (reflection_scaffolding === "low") {
    return SCAFFOLD_PROMPTS.filter(p => p.level === "low");
  }
  return SCAFFOLD_PROMPTS.filter(p => p.level === "medium");
}

// ============================================================================
// BADGE SYSTEM
// ============================================================================

interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: Badge["category"];
  condition: (diagnostics: StudentDiagnostics) => boolean;
}

const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "rhythm_rookie",
    name: "Rhythm Rookie",
    description: "Completed your first rhythm activity!",
    icon: "music",
    category: "rhythm",
    condition: (d) => d.rhythm.total_sessions >= 1,
  },
  {
    id: "rhythm_master",
    name: "Rhythm Master",
    description: "Achieved 80%+ accuracy in rhythm!",
    icon: "trophy",
    category: "rhythm",
    condition: (d) => d.rhythm.current_accuracy >= 80,
  },
  {
    id: "speed_racer",
    name: "Speed Racer",
    description: "Played at fast tempo!",
    icon: "zap",
    category: "rhythm",
    condition: (d) => d.adaptive_settings.rhythm_tempo === "fast",
  },
  {
    id: "art_explorer",
    name: "Art Explorer",
    description: "Used 3+ different art elements!",
    icon: "palette",
    category: "art",
    condition: (d) => d.art.current_elements.length >= 3,
  },
  {
    id: "creative_genius",
    name: "Creative Genius",
    description: "Unlocked advanced art tools!",
    icon: "sparkles",
    category: "art",
    condition: (d) => d.art.tools_unlocked.includes("animated_brush"),
  },
  {
    id: "deep_thinker",
    name: "Deep Thinker",
    description: "Wrote a thoughtful reflection!",
    icon: "brain",
    category: "reflection",
    condition: (d) => d.reflection.current_depth >= 70,
  },
  {
    id: "empathy_star",
    name: "Empathy Star",
    description: "Explored multiple perspectives!",
    icon: "heart",
    category: "reflection",
    condition: (d) => d.adaptive_settings.reflection_scaffolding === "low",
  },
  {
    id: "voyager",
    name: "Voyager",
    description: "Reached proficient growth level!",
    icon: "compass",
    category: "overall",
    condition: (d) => d.growth_level === "proficient" || d.growth_level === "advanced",
  },
  {
    id: "captain",
    name: "Captain",
    description: "Achieved advanced growth level!",
    icon: "anchor",
    category: "overall",
    condition: (d) => d.growth_level === "advanced",
  },
];

/**
 * Check and award badges based on diagnostics
 */
export function checkAndAwardBadges(diagnostics: StudentDiagnostics): StudentDiagnostics {
  const earnedBadgeIds = new Set(diagnostics.badges_earned.map(b => b.id));
  const newBadges: Badge[] = [];
  
  for (const def of BADGE_DEFINITIONS) {
    if (!earnedBadgeIds.has(def.id) && def.condition(diagnostics)) {
      newBadges.push({
        id: def.id,
        name: def.name,
        description: def.description,
        icon: def.icon,
        category: def.category,
        earned_at: new Date().toISOString(),
      });
    }
  }
  
  if (newBadges.length > 0) {
    return {
      ...diagnostics,
      badges_earned: [...diagnostics.badges_earned, ...newBadges],
    };
  }
  
  return diagnostics;
}

/**
 * Get newly earned badges for display
 */
export function getNewBadges(before: Badge[], after: Badge[]): Badge[] {
  const beforeIds = new Set(before.map(b => b.id));
  return after.filter(b => !beforeIds.has(b.id));
}

// ============================================================================
// PERSONALIZED FEEDBACK
// ============================================================================

export interface PersonalizedFeedback {
  message: string;
  voiceLine: string;
  encouragement: string;
  nextSteps: string[];
}

/**
 * Generate personalized feedback based on performance
 */
export function generateFeedback(diagnostics: StudentDiagnostics): PersonalizedFeedback {
  const { rhythm, art, reflection } = diagnostics;
  
  let message = "";
  let voiceLine = "";
  let encouragement = "";
  const nextSteps: string[] = [];
  
  if (rhythm.current_accuracy >= 80) {
    message = "Wow, you have amazing rhythm!";
    voiceLine = "You're a natural musician!";
  } else if (rhythm.current_accuracy >= 50) {
    message = "Great job keeping the beat!";
    voiceLine = "Keep practicing, you're getting better!";
  } else {
    message = "Nice try! Rhythm takes practice.";
    voiceLine = "Let's try a slower tempo next time!";
    nextSteps.push("Try tapping along to your favorite songs at home");
  }
  
  if (art.current_elements.length >= 4) {
    encouragement += "Your artwork is so creative and detailed! ";
  } else if (art.current_elements.length >= 2) {
    encouragement += "You used some nice art tools! ";
  } else {
    encouragement += "Try adding more elements to your artwork next time! ";
    nextSteps.push("Explore the stickers and mosaic tools");
  }
  
  if (reflection.current_depth >= 70) {
    encouragement += "You really thought deeply about how everyone felt!";
  } else if (reflection.current_depth >= 40) {
    encouragement += "Good thinking about different perspectives!";
  } else {
    nextSteps.push("Think about how different people might feel in a story");
  }
  
  return { message, voiceLine, encouragement, nextSteps };
}

// ============================================================================
// PORTFOLIO MANAGEMENT
// ============================================================================

/**
 * Add a portfolio entry for completed activity
 */
export function addPortfolioEntry(
  diagnostics: StudentDiagnostics,
  performance: PerformanceData,
  artwork: ArtworkData,
  reflection: ReflectionData,
  growthLevel: GrowthLevel,
  badgesEarned: string[]
): StudentDiagnostics {
  const entry: PortfolioEntry = {
    id: `entry_${Date.now()}`,
    activity_id: diagnostics.activity_id,
    timestamp: new Date().toISOString(),
    performance,
    artwork,
    reflection,
    growth_level: growthLevel,
    badges_earned: badgesEarned,
  };
  
  return {
    ...diagnostics,
    portfolio_entries: [...diagnostics.portfolio_entries, entry].slice(-20),
    growth_level: growthLevel,
  };
}

/**
 * Get portfolio summary for display
 */
export function getPortfolioSummary(diagnostics: StudentDiagnostics) {
  const entries = diagnostics.portfolio_entries;
  
  if (entries.length === 0) {
    return {
      totalEntries: 0,
      bestRhythmAccuracy: 0,
      totalArtworks: 0,
      averageReflectionDepth: 0,
      badgeCount: diagnostics.badges_earned.length,
      growthLevel: diagnostics.growth_level,
    };
  }
  
  const bestRhythm = Math.max(...entries.map(e => e.performance.rhythm_accuracy));
  const avgDepth = diagnostics.reflection.depth_history.length > 0
    ? diagnostics.reflection.depth_history.reduce((a, b) => a + b, 0) / diagnostics.reflection.depth_history.length
    : 0;
  
  return {
    totalEntries: entries.length,
    bestRhythmAccuracy: bestRhythm,
    totalArtworks: entries.length,
    averageReflectionDepth: Math.round(avgDepth),
    badgeCount: diagnostics.badges_earned.length,
    growthLevel: diagnostics.growth_level,
  };
}

// ============================================================================
// COMPLETE SESSION UPDATE
// ============================================================================

/**
 * Complete a full activity session - updates all diagnostics
 */
export function completeActivitySession(
  studentId: string,
  activityId: string,
  performance: PerformanceData,
  artwork: ArtworkData,
  reflection: ReflectionData,
  streak: number,
  growthLevel: GrowthLevel
): { diagnostics: StudentDiagnostics; newBadges: Badge[]; feedback: PersonalizedFeedback } {
  let diagnostics = loadDiagnostics(studentId, activityId);
  const beforeBadges = [...diagnostics.badges_earned];
  
  diagnostics = updateRhythmDiagnostics(diagnostics, performance, streak);
  diagnostics = updateArtDiagnostics(diagnostics, artwork);
  diagnostics = updateReflectionDiagnostics(diagnostics, reflection);
  diagnostics = checkAndAwardBadges(diagnostics);
  
  const newBadges = getNewBadges(beforeBadges, diagnostics.badges_earned);
  const feedback = generateFeedback(diagnostics);
  
  diagnostics = addPortfolioEntry(
    diagnostics,
    performance,
    artwork,
    reflection,
    growthLevel,
    newBadges.map(b => b.id)
  );
  
  saveDiagnostics(diagnostics);
  
  return { diagnostics, newBadges, feedback };
}
