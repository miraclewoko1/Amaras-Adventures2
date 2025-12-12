import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SproutMascot from "./SproutMascot";
import { learnerObserver, type SessionObservation, type LearnerProfile } from "../lib/learnerObserver";

interface PathwayReplayProps {
  onClose: () => void;
  onSelectSession?: (sessionId: string) => void;
}

const learningStyleDescriptions: Record<string, { title: string; description: string; icon: string }> = {
  visual: {
    title: "Visual Explorer",
    description: "You learn best by looking at pictures and patterns!",
    icon: "👁️",
  },
  sequential: {
    title: "Step-by-Step Thinker",
    description: "You like to solve things one piece at a time!",
    icon: "📝",
  },
  "trial-error": {
    title: "Brave Experimenter",
    description: "You learn by trying different things - that's awesome!",
    icon: "🧪",
  },
  "pattern-recognition": {
    title: "Pattern Detective",
    description: "You're great at spotting patterns and using them!",
    icon: "🔍",
  },
  mixed: {
    title: "Flexible Learner",
    description: "You use many different ways to solve puzzles!",
    icon: "🌈",
  },
};

export default function PathwayReplay({ onClose, onSelectSession }: PathwayReplayProps) {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [sessions, setSessions] = useState<SessionObservation[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionObservation | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "history">("profile");

  useEffect(() => {
    setProfile(learnerObserver.getProfile());
    setSessions(learnerObserver.getRecentSessions(20));
  }, []);

  const styleInfo = profile
    ? learningStyleDescriptions[profile.preferredApproach] || learningStyleDescriptions.mixed
    : null;

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-indigo-900/90 to-purple-900/90 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">My Learning Journey</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeTab === "profile"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              My Style 🌟
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeTab === "history"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              Past Adventures 📚
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeTab === "profile" ? (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {profile ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 text-center">
                      <span className="text-6xl mb-4 block">{styleInfo?.icon}</span>
                      <h3 className="text-2xl font-bold text-purple-800 mb-2">
                        {styleInfo?.title}
                      </h3>
                      <p className="text-gray-600">{styleInfo?.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-bold text-green-700 mb-2">Your Superpowers ⭐</h4>
                        <ul className="space-y-1">
                          {profile.strengthAreas.map((strength, i) => (
                            <li key={i} className="text-green-600 text-sm flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-400 rounded-full" />
                              {strength.replace(/-/g, " ")}
                            </li>
                          ))}
                          {profile.strengthAreas.length === 0 && (
                            <li className="text-green-600 text-sm">Keep playing to discover!</li>
                          )}
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-bold text-blue-700 mb-2">Growing Areas 🌱</h4>
                        <ul className="space-y-1">
                          {profile.growthAreas.map((area, i) => (
                            <li key={i} className="text-blue-600 text-sm flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-400 rounded-full" />
                              {area.replace(/-/g, " ")}
                            </li>
                          ))}
                          {profile.growthAreas.length === 0 && (
                            <li className="text-blue-600 text-sm">You're doing great!</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-bold text-gray-700 mb-3">Quick Stats 📊</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            {formatTime(profile.averageTimePerPuzzle)}
                          </p>
                          <p className="text-xs text-gray-500">Avg. Time</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {profile.hintUsageRate.toFixed(1)}
                          </p>
                          <p className="text-xs text-gray-500">Hints/Puzzle</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            {sessions.length}
                          </p>
                          <p className="text-xs text-gray-500">Puzzles Done</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <SproutMascot
                        message="I love watching you learn! Every puzzle teaches you something new! 🌱"
                        emotion="happy"
                        size="medium"
                        position="center"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">🌱</span>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                      Start Your Journey!
                    </h3>
                    <p className="text-gray-500">
                      Complete some puzzles and I'll learn about your special way of thinking!
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {sessions.length > 0 ? (
                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <motion.div
                        key={session.sessionId}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                          setSelectedSession(session);
                          onSelectSession?.(session.sessionId);
                        }}
                        className={`p-4 rounded-xl cursor-pointer transition-colors ${
                          selectedSession?.sessionId === session.sessionId
                            ? "bg-purple-100 border-2 border-purple-400"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-gray-800">
                              {session.puzzleType.charAt(0).toUpperCase() + session.puzzleType.slice(1)} Puzzle
                            </h4>
                            <p className="text-sm text-gray-500">
                              {session.world === "math" ? "🔢" : "📚"} Level {session.levelId}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">
                              {formatDate(session.startTime)}
                            </p>
                            <div className="flex gap-2 mt-1">
                              {session.correctFirstTry && (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                  First Try! ⭐
                                </span>
                              )}
                              {session.emotionalIndicators.smoothProgress && (
                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                  Smooth 🌊
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {selectedSession?.sessionId === session.sessionId && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="mt-4 pt-4 border-t border-purple-200"
                          >
                            <div className="grid grid-cols-4 gap-3 text-center mb-3">
                              <div>
                                <p className="text-lg font-bold text-purple-600">
                                  {formatTime((session.endTime || 0) - session.startTime)}
                                </p>
                                <p className="text-xs text-gray-500">Time</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-blue-600">
                                  {session.hintsUsed}
                                </p>
                                <p className="text-xs text-gray-500">Hints</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-green-600">
                                  {session.attempts}
                                </p>
                                <p className="text-xs text-gray-500">Tries</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-orange-600">
                                  {session.actions.length}
                                </p>
                                <p className="text-xs text-gray-500">Steps</p>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-3">
                              <p className="text-xs text-gray-500 mb-2">What you did:</p>
                              <div className="flex flex-wrap gap-1">
                                {session.actions.slice(0, 8).map((action, i) => (
                                  <span
                                    key={i}
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      action.correct === false
                                        ? "bg-red-100 text-red-600"
                                        : action.correct === true
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {action.type}
                                    {action.target ? `: ${action.target}` : ""}
                                  </span>
                                ))}
                                {session.actions.length > 8 && (
                                  <span className="text-xs text-gray-400">
                                    +{session.actions.length - 8} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">📚</span>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                      No Adventures Yet!
                    </h3>
                    <p className="text-gray-500">
                      Start solving puzzles to see your learning journey here!
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
