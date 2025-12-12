import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SproutMascot from "./SproutMascot";

interface ReflectiveFeedbackProps {
  puzzleType: string;
  timeSpent: number;
  hintsUsed: number;
  stepsRecorded: string[];
  outcome: "success" | "partial" | "retry";
  onClose: () => void;
  onRetry?: () => void;
  onNextLevel?: () => void;
}

interface FeedbackData {
  strategyUsed: string;
  whatWorkedWell: string;
  alternativeApproach: string;
  encouragingNote: string;
}

export default function ReflectiveFeedback({
  puzzleType,
  timeSpent,
  hintsUsed,
  stepsRecorded,
  outcome,
  onClose,
  onRetry,
  onNextLevel,
}: ReflectiveFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await fetch("/api/reflective-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            puzzleType,
            stepsRecorded,
            timeSpent,
            hintsUsed,
            outcome,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setFeedback(data);
        } else {
          setFeedback(getDefaultFeedback(outcome));
        }
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
        setFeedback(getDefaultFeedback(outcome));
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();
  }, [puzzleType, stepsRecorded, timeSpent, hintsUsed, outcome]);

  function getDefaultFeedback(outcome: string): FeedbackData {
    if (outcome === "success") {
      return {
        strategyUsed: "You found your own special way to solve it!",
        whatWorkedWell: "Your patience and thinking helped you succeed!",
        alternativeApproach: "Next time, you could also try starting from a different spot!",
        encouragingNote: "Sprout is so proud of you! You're a wonderful problem solver! 🌱✨",
      };
    } else if (outcome === "partial") {
      return {
        strategyUsed: "You tried really hard and got close!",
        whatWorkedWell: "You never gave up - that's amazing!",
        alternativeApproach: "Taking a small break can help your brain think of new ideas!",
        encouragingNote: "Every try teaches you something new! Keep going! 🌟",
      };
    }
    return {
      strategyUsed: "You're learning how this puzzle works!",
      whatWorkedWell: "Trying is the first step to learning!",
      alternativeApproach: "Try looking at the puzzle from a different angle!",
      encouragingNote: "Sprout believes in you! Let's try again together! 🌱",
    };
  }

  const sections = feedback
    ? [
        { title: "How You Solved It", content: feedback.strategyUsed, icon: "🧠" },
        { title: "What Worked Well", content: feedback.whatWorkedWell, icon: "⭐" },
        { title: "Another Way", content: feedback.alternativeApproach, icon: "💡" },
      ]
    : [];

  const mascotEmotion = outcome === "success" ? "celebrating" : outcome === "partial" ? "encouraging" : "curious";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-900/80 to-blue-900/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl overflow-hidden"
      >
        <div className="text-center mb-4">
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            {outcome === "success"
              ? "Amazing Job! 🎉"
              : outcome === "partial"
              ? "Great Effort! 💪"
              : "Keep Trying! 🌟"}
          </motion.h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full"
            />
            <p className="mt-4 text-gray-600">Sprout is thinking...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-2 mb-4">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                    currentSection === index
                      ? "bg-purple-500 text-white scale-110"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {sections[index].icon}
                </button>
              ))}
            </div>

            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 mb-4"
            >
              <h3 className="font-bold text-purple-800 text-lg mb-2">
                {sections[currentSection]?.title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {sections[currentSection]?.content}
              </p>
            </motion.div>

            <div className="flex justify-center mb-4">
              <SproutMascot
                message={feedback?.encouragingNote}
                emotion={mascotEmotion}
                size="medium"
                position="center"
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(timeSpent)}s
                  </p>
                  <p className="text-xs text-gray-500">Time</p>
                </div>
                <div className="border-l border-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{hintsUsed}</p>
                  <p className="text-xs text-gray-500">Hints</p>
                </div>
                <div className="border-l border-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {stepsRecorded.length}
                  </p>
                  <p className="text-xs text-gray-500">Steps</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {outcome !== "success" && onRetry && (
                <button
                  onClick={onRetry}
                  className="flex-1 py-3 rounded-full font-bold text-purple-600 bg-purple-100 hover:bg-purple-200 transition-colors"
                >
                  Try Again 🔄
                </button>
              )}
              {outcome === "success" && onNextLevel && (
                <button
                  onClick={onNextLevel}
                  className="flex-1 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-colors"
                >
                  Next Level →
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
