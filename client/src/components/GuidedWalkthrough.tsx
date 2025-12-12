import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SproutMascot from "./SproutMascot";

interface WalkthroughStep {
  title: string;
  description: string;
  mascotMessage: string;
  mascotEmotion: "happy" | "thinking" | "celebrating" | "encouraging" | "curious";
  highlightArea?: string;
}

interface GuidedWalkthroughProps {
  puzzleType: string;
  steps: WalkthroughStep[];
  onComplete: () => void;
  onSkip: () => void;
}

const defaultWalkthroughs: Record<string, WalkthroughStep[]> = {
  counting: [
    {
      title: "Let's Count Together!",
      description: "We're going to count how many items we see.",
      mascotMessage: "Hi friend! Let's count together! 🌟",
      mascotEmotion: "happy",
    },
    {
      title: "Look Carefully",
      description: "First, look at all the items on the screen.",
      mascotMessage: "Take your time to see everything!",
      mascotEmotion: "curious",
    },
    {
      title: "Point and Count",
      description: "Touch each item as you count. One... two... three!",
      mascotMessage: "Touch each one as you count!",
      mascotEmotion: "encouraging",
    },
    {
      title: "Find Your Answer",
      description: "Now tap the number that matches how many you counted.",
      mascotMessage: "You've got this! Pick the right number! 🎉",
      mascotEmotion: "celebrating",
    },
  ],
  sorting: [
    {
      title: "Sorting Fun!",
      description: "We're going to put things where they belong.",
      mascotMessage: "Let's organize things together! 🌈",
      mascotEmotion: "happy",
    },
    {
      title: "Look at the Groups",
      description: "See the different places where things can go?",
      mascotMessage: "Each group has a special place!",
      mascotEmotion: "curious",
    },
    {
      title: "Match and Move",
      description: "Drag each item to the group where it fits best.",
      mascotMessage: "Think about which ones are alike!",
      mascotEmotion: "thinking",
    },
    {
      title: "Great Job!",
      description: "Keep going until everything is sorted!",
      mascotMessage: "You're a sorting superstar! ⭐",
      mascotEmotion: "celebrating",
    },
  ],
  patterns: [
    {
      title: "Pattern Detective!",
      description: "Let's find what comes next in the pattern.",
      mascotMessage: "Patterns are like puzzles! 🧩",
      mascotEmotion: "happy",
    },
    {
      title: "Look for Clues",
      description: "See how things repeat? That's a pattern!",
      mascotMessage: "What do you notice repeating?",
      mascotEmotion: "curious",
    },
    {
      title: "Think Ahead",
      description: "What should come next to continue the pattern?",
      mascotMessage: "Hmm... what comes next? 🤔",
      mascotEmotion: "thinking",
    },
    {
      title: "Choose Wisely",
      description: "Pick the answer that keeps the pattern going!",
      mascotMessage: "Trust your pattern powers! ✨",
      mascotEmotion: "encouraging",
    },
  ],
  matching: [
    {
      title: "Matching Time!",
      description: "Let's find things that go together.",
      mascotMessage: "Finding pairs is so fun! 💫",
      mascotEmotion: "happy",
    },
    {
      title: "Look for Pairs",
      description: "Some things belong together, like shoes!",
      mascotMessage: "Which ones are best friends?",
      mascotEmotion: "curious",
    },
    {
      title: "Connect Them",
      description: "Draw a line or tap to connect matching items.",
      mascotMessage: "Connect the ones that match!",
      mascotEmotion: "encouraging",
    },
    {
      title: "Perfect Match!",
      description: "Keep matching until you find all the pairs!",
      mascotMessage: "You're a matching master! 🏆",
      mascotEmotion: "celebrating",
    },
  ],
  history: [
    {
      title: "Time Travel Adventure!",
      description: "Let's learn about amazing people from the past.",
      mascotMessage: "History is full of heroes! 🌍",
      mascotEmotion: "happy",
    },
    {
      title: "Meet Someone Special",
      description: "This person did something incredible!",
      mascotMessage: "Listen to their story...",
      mascotEmotion: "curious",
    },
    {
      title: "Help Them Out",
      description: "Can you help complete their task?",
      mascotMessage: "Let's help together!",
      mascotEmotion: "encouraging",
    },
    {
      title: "History Hero!",
      description: "You learned something amazing today!",
      mascotMessage: "You're a history hero! 📚✨",
      mascotEmotion: "celebrating",
    },
  ],
};

export default function GuidedWalkthrough({
  puzzleType,
  steps,
  onComplete,
  onSkip,
}: GuidedWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const walkthroughSteps = steps.length > 0 ? steps : defaultWalkthroughs[puzzleType] || defaultWalkthroughs.patterns;

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = walkthroughSteps[currentStep];
  const isLastStep = currentStep === walkthroughSteps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 max-w-md w-full shadow-2xl"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            {walkthroughSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? "bg-purple-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Skip
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-purple-800 text-center">
              {step.title}
            </h2>
            <p className="text-gray-700 text-center text-lg">
              {step.description}
            </p>

            <div className="flex justify-center py-4">
              <SproutMascot
                message={step.mascotMessage}
                emotion={step.mascotEmotion}
                size="large"
                position="center"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
              currentStep === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-purple-600 hover:bg-purple-50 shadow-md"
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-full font-bold text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg transform hover:scale-105 transition-all"
          >
            {isLastStep ? "Let's Go! 🚀" : "Next →"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
