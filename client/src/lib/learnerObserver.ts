export interface LearnerAction {
  type: "tap" | "drag" | "hint_requested" | "pause" | "retry" | "undo";
  timestamp: number;
  target?: string;
  position?: { x: number; y: number };
  correct?: boolean;
}

export interface SessionObservation {
  sessionId: string;
  startTime: number;
  endTime?: number;
  puzzleType: string;
  levelId: number;
  world: "math" | "history";
  actions: LearnerAction[];
  hintsUsed: number;
  attempts: number;
  pauseDuration: number;
  correctFirstTry: boolean;
  emotionalIndicators: {
    rapidTapping: boolean;
    longPauses: boolean;
    manyRetries: boolean;
    smoothProgress: boolean;
  };
}

export interface LearnerProfile {
  preferredApproach: "visual" | "sequential" | "trial-error" | "pattern-recognition" | "mixed";
  averageTimePerPuzzle: number;
  hintUsageRate: number;
  retryTendency: number;
  strengthAreas: string[];
  growthAreas: string[];
  lastUpdated: string;
}

const OBSERVER_STORAGE_KEY = "princess-amara-observer";

class LearnerObserver {
  private currentSession: SessionObservation | null = null;
  private sessionStartTime: number = 0;
  private lastActionTime: number = 0;
  private pauseStartTime: number = 0;
  private totalPauseDuration: number = 0;

  startSession(puzzleType: string, levelId: number, world: "math" | "history"): string {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.sessionStartTime = Date.now();
    this.lastActionTime = this.sessionStartTime;
    this.totalPauseDuration = 0;
    this.pauseStartTime = 0;

    this.currentSession = {
      sessionId,
      startTime: this.sessionStartTime,
      puzzleType,
      levelId,
      world,
      actions: [],
      hintsUsed: 0,
      attempts: 1,
      pauseDuration: 0,
      correctFirstTry: true,
      emotionalIndicators: {
        rapidTapping: false,
        longPauses: false,
        manyRetries: false,
        smoothProgress: true,
      },
    };

    return sessionId;
  }

  recordAction(action: Omit<LearnerAction, "timestamp">): void {
    if (!this.currentSession) return;

    const now = Date.now();
    const timeSinceLastAction = now - this.lastActionTime;

    if (timeSinceLastAction > 10000) {
      this.currentSession.emotionalIndicators.longPauses = true;
      this.totalPauseDuration += timeSinceLastAction;
    }

    const recentActions = this.currentSession.actions.slice(-5);
    if (recentActions.length === 5) {
      const recentTimes = recentActions.map((a) => a.timestamp);
      const avgInterval =
        (recentTimes[4] - recentTimes[0]) / 4;
      if (avgInterval < 500) {
        this.currentSession.emotionalIndicators.rapidTapping = true;
      }
    }

    this.currentSession.actions.push({
      ...action,
      timestamp: now,
    });

    if (action.type === "hint_requested") {
      this.currentSession.hintsUsed++;
    }

    if (action.type === "retry") {
      this.currentSession.attempts++;
      this.currentSession.correctFirstTry = false;
      if (this.currentSession.attempts > 3) {
        this.currentSession.emotionalIndicators.manyRetries = true;
        this.currentSession.emotionalIndicators.smoothProgress = false;
      }
    }

    if (action.correct === false && this.currentSession.actions.length <= 1) {
      this.currentSession.correctFirstTry = false;
    }

    this.lastActionTime = now;
  }

  endSession(success: boolean): SessionObservation | null {
    if (!this.currentSession) return null;

    this.currentSession.endTime = Date.now();
    this.currentSession.pauseDuration = this.totalPauseDuration;

    if (
      !this.currentSession.emotionalIndicators.rapidTapping &&
      !this.currentSession.emotionalIndicators.longPauses &&
      !this.currentSession.emotionalIndicators.manyRetries
    ) {
      this.currentSession.emotionalIndicators.smoothProgress = true;
    }

    const session = { ...this.currentSession };
    this.saveSession(session);
    this.updateLearnerProfile(session, success);

    this.currentSession = null;
    return session;
  }

  private saveSession(session: SessionObservation): void {
    try {
      const stored = localStorage.getItem(OBSERVER_STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : { sessions: [], profile: null };
      
      data.sessions = [session, ...data.sessions.slice(0, 99)];
      
      localStorage.setItem(OBSERVER_STORAGE_KEY, JSON.stringify(data));

      fetch("/api/learner-observation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.sessionId,
          observation: session,
        }),
      }).catch(console.error);
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  }

  private updateLearnerProfile(session: SessionObservation, success: boolean): void {
    try {
      const stored = localStorage.getItem(OBSERVER_STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : { sessions: [], profile: null };
      
      const sessions = data.sessions as SessionObservation[];
      const successfulSessions = sessions.filter((s) => s.endTime && s.correctFirstTry);
      
      const avgTime =
        sessions.reduce((sum, s) => sum + ((s.endTime || 0) - s.startTime), 0) /
        Math.max(sessions.length, 1);
      
      const totalHints = sessions.reduce((sum, s) => sum + s.hintsUsed, 0);
      const hintRate = totalHints / Math.max(sessions.length, 1);
      
      const totalRetries = sessions.reduce((sum, s) => sum + (s.attempts - 1), 0);
      const retryRate = totalRetries / Math.max(sessions.length, 1);

      const approachCounts = {
        visual: 0,
        sequential: 0,
        "trial-error": 0,
        "pattern-recognition": 0,
      };

      sessions.forEach((s) => {
        if (s.emotionalIndicators.smoothProgress && s.hintsUsed === 0) {
          approachCounts["pattern-recognition"]++;
        } else if (s.emotionalIndicators.manyRetries) {
          approachCounts["trial-error"]++;
        } else if (s.actions.length > 10 && !s.emotionalIndicators.rapidTapping) {
          approachCounts.sequential++;
        } else {
          approachCounts.visual++;
        }
      });

      const preferredApproach = (Object.entries(approachCounts).sort(
        ([, a], [, b]) => b - a
      )[0]?.[0] || "mixed") as LearnerProfile["preferredApproach"];

      const strengths: string[] = [];
      const growthAreas: string[] = [];

      if (successfulSessions.length / Math.max(sessions.length, 1) > 0.7) {
        strengths.push("problem-solving");
      }
      if (hintRate < 1) {
        strengths.push("independence");
      }
      if (retryRate < 1) {
        strengths.push("accuracy");
      }
      if (avgTime < 30000) {
        strengths.push("quick-thinking");
      }

      if (hintRate > 2) {
        growthAreas.push("try-before-hints");
      }
      if (retryRate > 3) {
        growthAreas.push("careful-reading");
      }

      const puzzleStrengths = new Map<string, number>();
      sessions.forEach((s) => {
        if (s.correctFirstTry) {
          puzzleStrengths.set(
            s.puzzleType,
            (puzzleStrengths.get(s.puzzleType) || 0) + 1
          );
        }
      });

      puzzleStrengths.forEach((count, type) => {
        if (count >= 3) {
          strengths.push(type);
        }
      });

      const profile: LearnerProfile = {
        preferredApproach,
        averageTimePerPuzzle: avgTime,
        hintUsageRate: hintRate,
        retryTendency: retryRate,
        strengthAreas: Array.from(new Set(strengths)),
        growthAreas: Array.from(new Set(growthAreas)),
        lastUpdated: new Date().toISOString(),
      };

      data.profile = profile;
      localStorage.setItem(OBSERVER_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  }

  getProfile(): LearnerProfile | null {
    try {
      const stored = localStorage.getItem(OBSERVER_STORAGE_KEY);
      if (!stored) return null;
      const data = JSON.parse(stored);
      return data.profile || null;
    } catch {
      return null;
    }
  }

  getRecentSessions(count: number = 10): SessionObservation[] {
    try {
      const stored = localStorage.getItem(OBSERVER_STORAGE_KEY);
      if (!stored) return [];
      const data = JSON.parse(stored);
      return (data.sessions || []).slice(0, count);
    } catch {
      return [];
    }
  }

  getSessionById(sessionId: string): SessionObservation | null {
    try {
      const stored = localStorage.getItem(OBSERVER_STORAGE_KEY);
      if (!stored) return null;
      const data = JSON.parse(stored);
      return (data.sessions || []).find(
        (s: SessionObservation) => s.sessionId === sessionId
      ) || null;
    } catch {
      return null;
    }
  }

  getCurrentSession(): SessionObservation | null {
    return this.currentSession;
  }

  getTimeElapsed(): number {
    if (!this.currentSession) return 0;
    return (Date.now() - this.sessionStartTime) / 1000;
  }

  getStepsRecorded(): string[] {
    if (!this.currentSession) return [];
    return this.currentSession.actions.map((a) => {
      if (a.type === "tap" && a.target) {
        return `Tapped ${a.target}`;
      }
      if (a.type === "drag" && a.target) {
        return `Moved ${a.target}`;
      }
      if (a.type === "hint_requested") {
        return "Asked for hint";
      }
      if (a.type === "retry") {
        return "Tried again";
      }
      return a.type;
    });
  }
}

export const learnerObserver = new LearnerObserver();
