import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SproutMascot from "./SproutMascot";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations, Translations } from "@/lib/translations";

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

function getDefaultWalkthroughs(t: Translations): Record<string, WalkthroughStep[]> {
  return {
    counting: [
      {
        title: t.countingTitle1,
        description: t.countingDesc1,
        mascotMessage: t.countingMascot1,
        mascotEmotion: "happy",
      },
      {
        title: t.countingTitle2,
        description: t.countingDesc2,
        mascotMessage: t.countingMascot2,
        mascotEmotion: "curious",
      },
      {
        title: t.countingTitle3,
        description: t.countingDesc3,
        mascotMessage: t.countingMascot3,
        mascotEmotion: "encouraging",
      },
      {
        title: t.countingTitle4,
        description: t.countingDesc4,
        mascotMessage: t.countingMascot4,
        mascotEmotion: "celebrating",
      },
    ],
    sorting: [
      {
        title: t.sortingTitle1,
        description: t.sortingDesc1,
        mascotMessage: t.sortingMascot1,
        mascotEmotion: "happy",
      },
      {
        title: t.sortingTitle2,
        description: t.sortingDesc2,
        mascotMessage: t.sortingMascot2,
        mascotEmotion: "curious",
      },
      {
        title: t.sortingTitle3,
        description: t.sortingDesc3,
        mascotMessage: t.sortingMascot3,
        mascotEmotion: "thinking",
      },
      {
        title: t.sortingTitle4,
        description: t.sortingDesc4,
        mascotMessage: t.sortingMascot4,
        mascotEmotion: "celebrating",
      },
    ],
    patterns: [
      {
        title: t.patternsTitle1,
        description: t.patternsDesc1,
        mascotMessage: t.patternsMascot1,
        mascotEmotion: "happy",
      },
      {
        title: t.patternsTitle2,
        description: t.patternsDesc2,
        mascotMessage: t.patternsMascot2,
        mascotEmotion: "curious",
      },
      {
        title: t.patternsTitle3,
        description: t.patternsDesc3,
        mascotMessage: t.patternsMascot3,
        mascotEmotion: "thinking",
      },
      {
        title: t.patternsTitle4,
        description: t.patternsDesc4,
        mascotMessage: t.patternsMascot4,
        mascotEmotion: "encouraging",
      },
    ],
    "tap-select": [
      {
        title: t.tapSelectTitle1,
        description: t.tapSelectDesc1,
        mascotMessage: t.tapSelectMascot1,
        mascotEmotion: "happy",
      },
      {
        title: t.tapSelectTitle2,
        description: t.tapSelectDesc2,
        mascotMessage: t.tapSelectMascot2,
        mascotEmotion: "curious",
      },
      {
        title: t.tapSelectTitle3,
        description: t.tapSelectDesc3,
        mascotMessage: t.tapSelectMascot3,
        mascotEmotion: "encouraging",
      },
      {
        title: t.tapSelectTitle4,
        description: t.tapSelectDesc4,
        mascotMessage: t.tapSelectMascot4,
        mascotEmotion: "celebrating",
      },
    ],
    addition: [
      {
        title: t.additionTitle1,
        description: t.additionDesc1,
        mascotMessage: t.additionMascot1,
        mascotEmotion: "happy",
      },
      {
        title: t.additionTitle2,
        description: t.additionDesc2,
        mascotMessage: t.additionMascot2,
        mascotEmotion: "curious",
      },
      {
        title: t.additionTitle3,
        description: t.additionDesc3,
        mascotMessage: t.additionMascot3,
        mascotEmotion: "thinking",
      },
      {
        title: t.additionTitle4,
        description: t.additionDesc4,
        mascotMessage: t.additionMascot4,
        mascotEmotion: "celebrating",
      },
    ],
    "size-select": [
      {
        title: t.sizeSelectTitle1,
        description: t.sizeSelectDesc1,
        mascotMessage: t.sizeSelectMascot1,
        mascotEmotion: "happy",
      },
      {
        title: t.sizeSelectTitle2,
        description: t.sizeSelectDesc2,
        mascotMessage: t.sizeSelectMascot2,
        mascotEmotion: "curious",
      },
      {
        title: t.sizeSelectTitle3,
        description: t.sizeSelectDesc3,
        mascotMessage: t.sizeSelectMascot3,
        mascotEmotion: "thinking",
      },
      {
        title: t.sizeSelectTitle4,
        description: t.sizeSelectDesc4,
        mascotMessage: t.sizeSelectMascot4,
        mascotEmotion: "celebrating",
      },
    ],
    fractions: [
      {
        title: t.fractionsTitle1,
        description: t.fractionsDesc1,
        mascotMessage: t.fractionsMascot1,
        mascotEmotion: "happy",
      },
      {
        title: t.fractionsTitle2,
        description: t.fractionsDesc2,
        mascotMessage: t.fractionsMascot2,
        mascotEmotion: "curious",
      },
      {
        title: t.fractionsTitle3,
        description: t.fractionsDesc3,
        mascotMessage: t.fractionsMascot3,
        mascotEmotion: "thinking",
      },
      {
        title: t.fractionsTitle4,
        description: t.fractionsDesc4,
        mascotMessage: t.fractionsMascot4,
        mascotEmotion: "celebrating",
      },
    ],
    matching: [
      {
        title: t.matchingTitle1,
        description: t.matchingDesc1,
        mascotMessage: t.matchingMascot1,
        mascotEmotion: "happy",
      },
      {
        title: t.matchingTitle2,
        description: t.matchingDesc2,
        mascotMessage: t.matchingMascot2,
        mascotEmotion: "curious",
      },
      {
        title: t.matchingTitle3,
        description: t.matchingDesc3,
        mascotMessage: t.matchingMascot3,
        mascotEmotion: "encouraging",
      },
      {
        title: t.matchingTitle4,
        description: t.matchingDesc4,
        mascotMessage: t.matchingMascot4,
        mascotEmotion: "celebrating",
      },
    ],
    history: [
      {
        title: t.historyWalkTitle1,
        description: t.historyWalkDesc1,
        mascotMessage: t.historyWalkMascot1,
        mascotEmotion: "happy",
      },
      {
        title: t.historyWalkTitle2,
        description: t.historyWalkDesc2,
        mascotMessage: t.historyWalkMascot2,
        mascotEmotion: "curious",
      },
      {
        title: t.historyWalkTitle3,
        description: t.historyWalkDesc3,
        mascotMessage: t.historyWalkMascot3,
        mascotEmotion: "encouraging",
      },
      {
        title: t.historyWalkTitle4,
        description: t.historyWalkDesc4,
        mascotMessage: t.historyWalkMascot4,
        mascotEmotion: "celebrating",
      },
    ],
  };
}

export default function GuidedWalkthrough({
  puzzleType,
  steps,
  onComplete,
  onSkip,
}: GuidedWalkthroughProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [currentStep, setCurrentStep] = useState(0);
  
  const defaultWalkthroughs = getDefaultWalkthroughs(t);
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
            {t.walkthroughSkip}
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
            {t.walkthroughBack}
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-full font-bold text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg transform hover:scale-105 transition-all"
          >
            {isLastStep ? t.walkthroughLetsGo : t.walkthroughNext}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
