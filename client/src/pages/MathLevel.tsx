import { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import PrincessAmara from "@/components/PrincessAmara";
import ConfettiEffect from "@/components/ConfettiEffect";
import SproutMascot from "@/components/SproutMascot";
import GuidedWalkthrough from "@/components/GuidedWalkthrough";
import ReflectiveFeedback from "@/components/ReflectiveFeedback";
import { ArrowLeft, Star, RotateCcw, ArrowRight, HelpCircle, BookOpen } from "lucide-react";
import { loadProgress, completeLevel, trackLearningPattern, GameProgress } from "@/lib/gameProgress";
import { learnerObserver } from "@/lib/learnerObserver";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";
import { FlagIcon } from "@/components/FlagIcon";

import type { Translations } from "@/lib/translations";

interface LevelContentData {
  items: string[];
  correctAnswer: number | string | number[];
  type: string;
  answerOptions?: (string | number)[];
}

const LEVEL_CONTENT: Record<number, LevelContentData> = {
  1: {
    items: ["🍎", "🍎", "🍎", "🍎", "🍎"],
    correctAnswer: 5,
    type: "counting",
    answerOptions: [3, 4, 5, 6],
  },
  2: {
    items: ["🔵", "🔺", "⭐", "🔵", "🔺"],
    correctAnswer: [0, 3],
    type: "tap-select",
  },
  3: {
    items: ["🌟", "🌙", "🌟", "🌙", "?"],
    correctAnswer: "🌟",
    type: "patterns",
    answerOptions: ["🌟", "🌙", "☀️"],
  },
  4: {
    items: ["1", "2", "3", "?", "5"],
    correctAnswer: "4",
    type: "sequences",
    answerOptions: ["3", "4", "6"],
  },
  5: {
    items: ["🐶", "🐱", "🐶", "🐰", "🐶", "🐱"],
    correctAnswer: 3,
    type: "counting",
    answerOptions: [2, 3, 4, 5],
  },
  6: {
    items: ["large", "small", "medium"],
    correctAnswer: 2,
    type: "size-select",
  },
  7: {
    items: ["🍕"],
    correctAnswer: 2,
    type: "counting",
    answerOptions: [1, 2, 3, 4],
  },
  8: {
    items: ["⭐⭐⭐", "⭐⭐", "⭐⭐⭐⭐"],
    correctAnswer: [2, 0, 1],
    type: "tap-order",
  },
  9: {
    items: ["🐘", "🐁", "🐕"],
    correctAnswer: [0, 2, 1],
    type: "tap-order",
  },
  10: {
    items: ["1/2", "1/4", "1/4", "1/2"],
    correctAnswer: 1,
    type: "fractions",
  },
};

function getLevelInstruction(levelId: number, t: Translations): string {
  const instructionMap: Record<number, string> = {
    1: t.mathL1Instruction,
    2: t.mathL2Instruction,
    3: t.mathL3Instruction,
    4: t.mathL4Instruction,
    5: t.mathL5Instruction,
    6: t.mathL6Instruction,
    7: t.mathL7Instruction,
    8: t.mathL8Instruction,
    9: t.mathL9Instruction,
    10: t.mathL10Instruction,
  };
  return instructionMap[levelId] || t.mathL1Instruction;
}

export default function MathLevel() {
  const [, setLocation] = useLocation();
  const params = useParams<{ level: string }>();
  const levelId = parseInt(params.level || "1", 10);
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslations(language);
  
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [showReflectiveFeedback, setShowReflectiveFeedback] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [sproutMessage, setSproutMessage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowConfetti(false);
    setSelectedItems([]);
    setStartTime(Date.now());
    setHintsUsed(0);
    setSproutMessage(null);
    setShowReflectiveFeedback(false);
    
    const newSessionId = learnerObserver.startSession(
      LEVEL_CONTENT[levelId]?.type || "counting",
      levelId,
      "math"
    );
    setSessionId(newSessionId);
  }, [levelId]);

  const levelContent = LEVEL_CONTENT[levelId] || LEVEL_CONTENT[1];
  const levelData = progress?.mathLevels.find((l) => l.id === levelId);
  const instruction = getLevelInstruction(levelId, t);

  const handleSelectAnswer = (answer: number | string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    learnerObserver.recordAction({
      type: "tap",
      target: String(answer),
      correct: answer === levelContent.correctAnswer,
    });
  };

  const handleHintRequest = useCallback(() => {
    setHintsUsed((prev) => prev + 1);
    learnerObserver.recordAction({ type: "hint_requested" });
    
    const hints: Record<string, string[]> = {
      counting: ["Count each one slowly!", "Touch them as you count!", "Start from the left!"],
      patterns: ["Look for what repeats!", "What comes after?", "See the pattern?"],
      sequences: ["What number is missing?", "Count up or down!", "Follow the order!"],
      "tap-select": ["Find all the same ones!", "Tap the matching items!", "Look carefully!"],
      "tap-order": ["Which is biggest?", "Put them in order!", "Start with the biggest!"],
      "size-select": ["Look at the sizes!", "Find the right one!", "Compare them!"],
      fractions: ["Make it equal to 1!", "Add the pieces!", "Two halves make a whole!"],
    };
    
    const puzzleHints = hints[levelContent.type] || hints.counting;
    const hint = puzzleHints[Math.min(hintsUsed, puzzleHints.length - 1)];
    setSproutMessage(hint);
    
    setTimeout(() => setSproutMessage(null), 4000);
  }, [hintsUsed, levelContent.type]);

  const handleItemTap = (index: number) => {
    if (showResult) return;
    
    learnerObserver.recordAction({
      type: "tap",
      target: levelContent.items[index] || `item-${index}`,
    });
    
    if (levelContent.type === "tap-single" || levelContent.type === "size-select") {
      setSelectedItems([index]);
    } else if (levelContent.type === "tap-order") {
      if (selectedItems.includes(index)) {
        const idx = selectedItems.indexOf(index);
        setSelectedItems(selectedItems.slice(0, idx));
        learnerObserver.recordAction({ type: "undo" });
      } else {
        setSelectedItems([...selectedItems, index]);
      }
    } else {
      setSelectedItems((prev) => 
        prev.includes(index) 
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
  };

  const checkAnswer = () => {
    let correct = false;
    
    if (levelContent.type === "counting" || levelContent.type === "patterns" || levelContent.type === "sequences") {
      correct = selectedAnswer === levelContent.correctAnswer;
    } else if (levelContent.type === "tap-select") {
      const correctIndices = levelContent.correctAnswer as number[];
      correct = correctIndices.length === selectedItems.length &&
        correctIndices.every((i) => selectedItems.includes(i));
    } else if (levelContent.type === "tap-single" || levelContent.type === "size-select") {
      correct = selectedItems[0] === levelContent.correctAnswer;
    } else if (levelContent.type === "tap-order") {
      const correctOrder = levelContent.correctAnswer as number[];
      correct = correctOrder.length === selectedItems.length &&
        correctOrder.every((val, idx) => selectedItems[idx] === val);
    }
    else if (levelContent.type === "fractions") {
      let sum = 0;
      selectedItems.forEach((i) => {
        const fraction = levelContent.items[i];
        const parts = fraction.split("/");
        if (parts.length === 2) {
          sum += parseFloat(parts[0]) / parseFloat(parts[1]);
        } else {
          sum += parseFloat(fraction);
        }
      });
      correct = selectedItems.length > 0 && Math.abs(sum - 1) < 0.001;
    }

    setIsCorrect(correct);
    setShowResult(true);
    
    learnerObserver.endSession(correct);
    
    if (correct) {
      setShowConfetti(true);
      const timeTaken = (Date.now() - startTime) / 1000;
      const wasQuick = timeTaken < 20;
      const starsEarned = wasQuick ? 3 : timeTaken < 30 ? 2 : 1;
      
      if (progress) {
        let newProgress = completeLevel(progress, "math", levelId, starsEarned);
        newProgress = trackLearningPattern(newProgress, levelContent.type, wasQuick);
        setProgress(newProgress);
      }
      
      setTimeout(() => setShowReflectiveFeedback(true), 1500);
    }
  };

  const handleNext = () => {
    if (levelId < 10) {
      setLocation(`/math/level/${levelId + 1}`);
    } else {
      setLocation("/math");
    }
  };

  const handleRetry = () => {
    learnerObserver.recordAction({ type: "retry" });
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setSelectedItems([]);
    setStartTime(Date.now());
    
    const newSessionId = learnerObserver.startSession(levelContent.type, levelId, "math");
    setSessionId(newSessionId);
  };

  const canCheck = () => {
    if (levelContent.type === "counting" || levelContent.type === "patterns" || levelContent.type === "sequences") {
      return selectedAnswer !== null;
    }
    if (levelContent.type === "tap-select" || levelContent.type === "tap-order" || levelContent.type === "fractions") {
      return selectedItems.length > 0;
    }
    if (levelContent.type === "tap-single" || levelContent.type === "size-select") {
      return selectedItems.length === 1;
    }
    return false;
  };

  const isItemClickable = () => {
    return levelContent.type === "tap-select" || levelContent.type === "tap-single" || levelContent.type === "tap-order" || levelContent.type === "size-select" || levelContent.type === "fractions";
  };

  const renderItems = () => {
    const clickable = isItemClickable();
    if (levelContent.type === "fractions") {
      return (
        <div className="flex space-x-4 mt-4">
          {levelContent.items.map((label, i) => {
            const isSelected = selectedItems.includes(i);
            return (
              <button
                key={i}
                onClick={() => handleItemTap(i)}
                disabled={showResult}
                className={`px-4 py-2 rounded ${isSelected ? "bg-green-400" : "bg-gray-200"}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      );
    }

    // Special rendering for size-select (cups)
    if (levelContent.type === "size-select") {
      const sizeMap: Record<string, { scale: string; label: string }> = {
        small: { scale: "text-4xl", label: "Small" },
        medium: { scale: "text-6xl", label: "Medium" },
        large: { scale: "text-8xl", label: "Large" },
      };
      
      return (
        <div className="flex justify-center items-end gap-8 mb-8">
          {levelContent.items.map((item, i) => {
            const isSelected = selectedItems.includes(i);
            const size = sizeMap[item] || sizeMap.medium;
            
            return (
              <button
                key={i}
                onClick={() => handleItemTap(i)}
                disabled={showResult}
                className={`
                  transition-all duration-200 p-4 rounded-2xl relative flex flex-col items-center
                  ${!showResult
                    ? `cursor-pointer ${
                        isSelected 
                          ? "bg-green-400 ring-4 ring-green-500 scale-110" 
                          : "hover:bg-primary/10 hover:scale-105"
                      }` 
                    : ""
                  }
                  ${showResult && isSelected && isCorrect ? "bg-green-400" : ""}
                  ${showResult && isSelected && !isCorrect ? "bg-red-400" : ""}
                `}
                data-testid={`item-${i}`}
              >
                <span className={size.scale}>🥤</span>
              </button>
            );
          })}
        </div>
      );
    }
    
    return (
      <div className="flex justify-center gap-4 text-5xl mb-8 flex-wrap">
        {levelContent.items.map((item, i) => {
          const isSelected = selectedItems.includes(i);
          const orderIndex = selectedItems.indexOf(i);
          const showNumber = (levelContent.type === "tap-order" || levelContent.type === "tap-select") && isSelected;
          
          return (
            <button
              key={i}
              onClick={() => clickable && handleItemTap(i)}
              disabled={showResult}
              className={`
                transition-all duration-200 p-4 rounded-2xl relative
                ${clickable && !showResult
                  ? `cursor-pointer ${
                      isSelected 
                        ? "bg-green-400 ring-4 ring-green-500 scale-110" 
                        : "hover:bg-primary/10 hover:scale-105"
                    }` 
                  : "cursor-default animate-bounce"
                }
                ${showResult && isSelected && isCorrect ? "bg-green-400" : ""}
                ${showResult && isSelected && !isCorrect ? "bg-red-400" : ""}
              `}
              style={{ animationDelay: clickable ? "0ms" : `${i * 100}ms` }}
              data-testid={`item-${i}`}
            >
              {item}
              {showNumber && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-bold flex items-center justify-center">
                  {orderIndex + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const renderAnswerOptions = () => {
    if (levelContent.answerOptions) {
      return (
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {levelContent.answerOptions.map((opt) => (
            <button
              key={String(opt)}
              onClick={() => handleSelectAnswer(opt)}
              disabled={showResult}
              className={`
                w-20 h-20 rounded-2xl text-3xl font-bold shadow-md transition-all
                ${selectedAnswer === opt
                  ? showResult
                    ? isCorrect
                      ? "bg-green-500 text-white ring-4 ring-green-400"
                      : "bg-red-400 text-white"
                    : "bg-primary text-primary-foreground ring-4 ring-primary/50"
                  : "bg-white dark:bg-card text-foreground hover-elevate"
                }
                ${showResult && opt === levelContent.correctAnswer ? "ring-4 ring-green-400" : ""}
              `}
              data-testid={`button-answer-${opt}`}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      {showConfetti && <ConfettiEffect show={showConfetti} />}
      
      {showWalkthrough && (
        <GuidedWalkthrough
          puzzleType={levelContent.type}
          steps={[]}
          onComplete={() => setShowWalkthrough(false)}
          onSkip={() => setShowWalkthrough(false)}
        />
      )}
      
      {showReflectiveFeedback && (
        <ReflectiveFeedback
          puzzleType={levelContent.type}
          timeSpent={learnerObserver.getTimeElapsed()}
          hintsUsed={hintsUsed}
          stepsRecorded={learnerObserver.getStepsRecorded()}
          outcome={isCorrect ? "success" : "partial"}
          onClose={() => setShowReflectiveFeedback(false)}
          onRetry={handleRetry}
          onNextLevel={handleNext}
        />
      )}
      
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-card/90 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setLocation("/math")}
            data-testid="button-back-math"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">
            {t.level} {levelId}: {levelData?.title}
          </h1>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowWalkthrough(true)}
              className="text-purple-500 hover:text-purple-600"
              title="Show tutorial"
            >
              <BookOpen className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleHintRequest}
              className="text-blue-500 hover:text-blue-600"
              title="Get a hint"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={toggleLanguage}
              className="rounded-full font-semibold gap-2 bg-[#D8BFD8] dark:bg-[#942222] border-[#C8A0C8] dark:border-[#6B1818]"
              data-testid="button-language-toggle"
            >
              <FlagIcon country={language === 'en' ? 'us' : 'kr'} />
              {language === 'en' ? 'EN' : '한국어'}
            </Button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    (levelData?.stars || 0) >= star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <PrincessAmara
            message={showResult 
              ? isCorrect 
                ? t.amazingCorrect 
                : t.oopsTryAgain
              : instruction
            }
            size="medium"
          />
        </div>

        <div className="bg-white dark:bg-card rounded-3xl shadow-lg p-8 mb-8">
          {renderItems()}

          <h2 className="text-xl font-bold text-foreground text-center mb-6">
            {instruction}
          </h2>

          {renderAnswerOptions()}

          {!showResult && (
            <div className="flex justify-center">
              <button
                onClick={checkAnswer}
                disabled={!canCheck()}
                className={`px-8 py-4 rounded-2xl text-xl font-bold shadow-md transition-all ${
                  canCheck() 
                    ? "bg-primary text-primary-foreground hover-elevate" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
                data-testid="button-check-answer"
              >
                {t.checkMyAnswer}
              </button>
            </div>
          )}
        </div>

        {showResult && (
          <div className="flex justify-center gap-4">
            {!isCorrect && (
              <Button
                size="lg"
                variant="outline"
                onClick={handleRetry}
                className="rounded-full"
                data-testid="button-retry"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {t.tryAgain}
              </Button>
            )}
            {isCorrect && (
              <Button
                size="lg"
                onClick={handleNext}
                className="rounded-full"
                data-testid="button-next-level"
              >
                {levelId < 10 ? t.nextLevel : t.finish}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        )}
        
        {sproutMessage && (
          <div className="fixed bottom-4 right-4 z-40">
            <SproutMascot
              message={sproutMessage}
              emotion="encouraging"
              size="medium"
              position="left"
            />
          </div>
        )}
      </main>
    </div>
  );
}
