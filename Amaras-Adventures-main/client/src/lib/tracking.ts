import { loadProgress } from "./gameProgress";
import { getTranslations, type Language } from "./translations";

export function parentReport(language: Language = 'en'): string {
  const progress = loadProgress();
  const t = getTranslations(language);
  
  if (!progress) {
    return t.startAdventureInsight;
  }
  
  const mathCompleted = progress.mathLevels.filter(l => l.completed).length;
  const historyCompleted = progress.historyLevels.filter(l => l.completed).length;
  const adventureCompleted = (progress.adventureLevels || []).filter(l => l.completed).length;
  const totalCompleted = mathCompleted + historyCompleted + adventureCompleted;
  
  if (totalCompleted === 0) {
    return t.startAdventureInsight;
  }
  
  if (totalCompleted === 25 && progress.totalStars >= 100) {
    return t.allCompleteInsight;
  }
  
  if (mathCompleted > historyCompleted + 2) {
    return t.mathProgressInsight.replace('{count}', String(mathCompleted));
  }
  
  if (historyCompleted > mathCompleted + 2) {
    return t.historyProgressInsight.replace('{count}', String(historyCompleted));
  }
  
  if (totalCompleted >= 15) {
    return t.amazingProgressInsight
      .replace('{count}', String(totalCompleted))
      .replace('{stars}', String(progress.totalStars));
  }
  
  if (totalCompleted >= 10) {
    return t.excellentProgressInsight.replace('{count}', String(totalCompleted));
  }
  
  if (totalCompleted >= 5) {
    return t.goodStartInsight.replace('{count}', String(totalCompleted));
  }
  
  return t.adventuresCompletedInsight.replace('{count}', String(totalCompleted));
}
