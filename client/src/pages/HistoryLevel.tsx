import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import PrincessAmara from "@/components/PrincessAmara";
import HistoricalFigureGuide from "@/components/HistoricalFigureGuide";
import ConfettiEffect from "@/components/ConfettiEffect";
import SproutMascot from "@/components/SproutMascot";
import GuidedWalkthrough from "@/components/GuidedWalkthrough";
import ReflectiveFeedback from "@/components/ReflectiveFeedback";
import { DragDropPuzzle } from "@/components/game";
import { ArrowLeft, Star, RotateCcw, ArrowRight, HelpCircle, BookOpen } from "lucide-react";
import { loadProgress, completeLevel, trackLearningPattern, GameProgress } from "@/lib/gameProgress";
import { learnerObserver } from "@/lib/learnerObserver";
import hiddenFiguresImg from "@assets/generated_images/hidden_figures_nasa_trio.png";
import TariqLevelOneExperience from "@/components/history/TariqLevelOneExperience";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations, type Translations } from "@/lib/translations";
import { FlagIcon } from "@/components/FlagIcon";

interface DragMatchData {
  items: Array<{ id: string; label: string; icon: string }>;
  dropZones: Array<{ id: string; label: string; acceptsId: string; icon: string }>;
}

interface LevelContent {
  era: "moors" | "innovators" | "pioneers";
  items: string[];
  correctAnswer: number[] | string | string[];
  type: "tap-order" | "tap-select" | "matching" | "tap-order-no-number" | "drag-match";
  answerOptions?: string[];
  randomize?: boolean;
  teachContent?: string;
  dragMatchData?: DragMatchData;
  itemLabels?: string[];
}

const LEVEL_CONTENT: Record<number, LevelContent> = {
  1: {
    era: "moors",
    items: ["🗺️", "⛵", "📍", "🏝️"],
    correctAnswer: [0, 1, 2, 3],
    type: "tap-order",
    randomize: true,
    itemLabels: ["Plan", "Sail", "Navigate", "Arrive"],
  },
  2: {
    era: "moors",
    items: ["🏗️", "🏛️", "🌳", "⛲", "🌸"],
    correctAnswer: [0, 1, 2, 3, 4],
    type: "tap-order",
    randomize: true,
    itemLabels: ["Crane", "Palace", "Trees", "Fountain", "Flowers"],
  },
  3: {
    era: "moors",
    items: ["🌹", "🔨", "📚", "🔧", "🎨", "🪛"],
    correctAnswer: [0, 2, 4],
    type: "tap-select",
    randomize: true,
    itemLabels: ["Love", "Hammer", "Knowledge", "Wrench", "Art", "Screwdriver"],
  },
  4: {
    era: "innovators",
    items: ["📐", "🚀", "🛰️", "🌟", "🌙"],
    correctAnswer: [0, 1, 2, 3, 4],
    type: "tap-order",
    randomize: true,
    itemLabels: ["Calculate", "Rocket", "Satellite", "Star", "Moon"],
  },
  5: {
    era: "innovators",
    items: ["Waqaa!", "Quyana cakneq!", "Assirtuten-qaa?", "Ii-i!"],
    correctAnswer: ["hello", "thankyou", "howareyou", "yes"],
    type: "drag-match",
    randomize: true,
    dragMatchData: {
      items: [
        { id: "waqaa", label: "Waqaa!", icon: "👋" },
        { id: "quyana", label: "Quyana cakneq!", icon: "🙏" },
        { id: "assirtuten", label: "Assirtuten-qaa?", icon: "😊" },
        { id: "iii", label: "Ii-i!", icon: "👍" },
      ],
      dropZones: [
        { id: "hello", label: "Hello!", acceptsId: "waqaa", icon: "👋" },
        { id: "thankyou", label: "Thank you very much!", acceptsId: "quyana", icon: "🙏" },
        { id: "howareyou", label: "How are you?", acceptsId: "assirtuten", icon: "😊" },
        { id: "yes", label: "Yes!", acceptsId: "iii", icon: "👍" },
      ],
    },
  },
  6: {
    era: "innovators",
    items: ["🌾", "⚙️", "🔩", "💨", "🔄"],
    correctAnswer: [0, 1, 2, 3, 4],
    type: "tap-order",
    randomize: true,
    itemLabels: ["Crops", "Machine", "Assemble", "Power", "Repeat"],
  },
  7: {
    era: "innovators",
    items: ["🧹💨", "🚜🌱✂️", "🍞⚡🔥", "💦🌼🌱", "🪣🧽", "🧺📦"],
    correctAnswer: [0, 2, 4],
    type: "tap-select",
    randomize: true,
    itemLabels: ["Vacuum", "Lawn Mower", "Toaster", "Sprinkler", "Mop Bucket", "Storage Box"],
  },
  8: {
    era: "pioneers",
    items: ["ㄱ", "ㄴ", "ㅁ", "ㅂ", "ㅅ"],
    correctAnswer: ["g", "n", "m", "b", "s"],
    type: "drag-match",
    randomize: true,
    dragMatchData: {
      items: [
        { id: "gieuk", label: "ㄱ", icon: "ㄱ" },
        { id: "nieun", label: "ㄴ", icon: "ㄴ" },
        { id: "mieum", label: "ㅁ", icon: "ㅁ" },
        { id: "bieup", label: "ㅂ", icon: "ㅂ" },
        { id: "siot", label: "ㅅ", icon: "ㅅ" },
      ],
      dropZones: [
        { id: "g", label: "g", acceptsId: "gieuk", icon: "g" },
        { id: "n", label: "n", acceptsId: "nieun", icon: "n" },
        { id: "m", label: "m", acceptsId: "mieum", icon: "m" },
        { id: "b", label: "b", acceptsId: "bieup", icon: "b" },
        { id: "s", label: "s", acceptsId: "siot", icon: "s" },
      ],
    },
  },
  9: {
    era: "pioneers",
    items: ["📋", "✈️", "🌊", "🌍", "🏆"],
    correctAnswer: [0, 1, 2, 3, 4],
    type: "tap-order",
    randomize: true,
    itemLabels: ["Plan", "Takeoff", "Ocean", "Land", "Success"],
  },
  10: {
    era: "pioneers",
    items: ["5️⃣", "4️⃣", "3️⃣", "2️⃣", "1️⃣", "🚀"],
    correctAnswer: [0, 1, 2, 3, 4, 5],
    type: "tap-order-no-number",
    randomize: true,
  },
};

function getHistoryLevelText(levelId: number, t: Translations): { figure: string; title: string; greeting: string; activity: string } {
  const textMap: Record<number, { figure: string; title: string; greeting: string; activity: string }> = {
    1: { figure: t.tariqIbnZiyad, title: t.tariqTitle, greeting: t.histL1Greeting, activity: t.histL1Activity },
    2: { figure: t.abdAlRahmanName, title: t.abdAlRahmanTitle, greeting: t.histL2Greeting, activity: t.histL2Activity },
    3: { figure: t.averroesName, title: t.averroesTitle, greeting: t.histL3Greeting, activity: t.histL3Activity },
    4: { figure: t.maryGoldaName, title: t.maryGoldaTitle, greeting: t.histL4Greeting, activity: t.histL4Activity },
    5: { figure: t.paulJohnName, title: t.paulJohnTitle, greeting: t.histL5Greeting, activity: t.histL5Activity },
    6: { figure: t.williamName, title: t.williamTitle, greeting: t.histL6Greeting, activity: t.histL6Activity },
    7: { figure: t.maryKennerName, title: t.maryKennerTitle, greeting: t.histL7Greeting, activity: t.histL7Activity },
    8: { figure: t.kingSejongName, title: t.kingSejongTitle, greeting: t.histL8Greeting, activity: t.histL8Activity },
    9: { figure: t.ameliaName, title: t.ameliaTitle, greeting: t.histL9Greeting, activity: t.histL9Activity },
    10: { figure: t.hiddenFiguresName, title: t.hiddenFiguresTitle, greeting: t.histL10Greeting, activity: t.histL10Activity },
  };
  return textMap[levelId] || textMap[1];
}

function getTranslatedDragMatchData(levelId: number, t: Translations): DragMatchData | undefined {
  if (levelId === 5) {
    return {
      items: [
        { id: "waqaa", label: "Waqaa!", icon: "👋" },
        { id: "quyana", label: "Quyana cakneq!", icon: "🙏" },
        { id: "assirtuten", label: "Assirtuten-qaa?", icon: "😊" },
        { id: "iii", label: "Ii-i!", icon: "👍" },
      ],
      dropZones: [
        { id: "hello", label: t.hello, acceptsId: "waqaa", icon: "👋" },
        { id: "thankyou", label: t.thankYouVeryMuch, acceptsId: "quyana", icon: "🙏" },
        { id: "howareyou", label: t.howAreYou, acceptsId: "assirtuten", icon: "😊" },
        { id: "yes", label: t.yes || "Yes!", acceptsId: "iii", icon: "👍" },
      ],
    };
  }
  if (levelId === 8) {
    return {
      items: [
        { id: "gieuk", label: "ㄱ", icon: "ㄱ" },
        { id: "nieun", label: "ㄴ", icon: "ㄴ" },
        { id: "mieum", label: "ㅁ", icon: "ㅁ" },
        { id: "bieup", label: "ㅂ", icon: "ㅂ" },
        { id: "siot", label: "ㅅ", icon: "ㅅ" },
      ],
      dropZones: [
        { id: "g", label: "g", acceptsId: "gieuk", icon: "g" },
        { id: "n", label: "n", acceptsId: "nieun", icon: "n" },
        { id: "m", label: "m", acceptsId: "mieum", icon: "m" },
        { id: "b", label: "b", acceptsId: "bieup", icon: "b" },
        { id: "s", label: "s", acceptsId: "siot", icon: "s" },
      ],
    };
  }
  return undefined;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HistoryLevel() {
  const [, setLocation] = useLocation();
  const params = useParams<{ level: string }>();
  const levelId = parseInt(params.level || "1", 10);
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslations(language);

  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [phase, setPhase] = useState<"intro" | "activity" | "result">("intro");
  const [showConfetti, setShowConfetti] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [showReflectiveFeedback, setShowReflectiveFeedback] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [sproutMessage, setSproutMessage] = useState<string | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    setPhase("intro");
    setShowConfetti(false);
    setSelectedItems([]);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setStartTime(Date.now());
    setShuffleKey(prev => prev + 1);
    setHintsUsed(0);
    setSproutMessage(null);
    setShowReflectiveFeedback(false);
    
    learnerObserver.startSession(
      LEVEL_CONTENT[levelId]?.type || "tap-order",
      levelId,
      "history"
    );
  }, [levelId]);

  const handleHintRequest = useCallback(() => {
    setHintsUsed((prev) => prev + 1);
    learnerObserver.recordAction({ type: "hint_requested" });
    
    const hints: Record<string, string[]> = {
      "tap-order": ["Put them in order!", "What comes first?", "Think about the steps!"],
      "tap-select": ["Pick the right ones!", "Which ones match?", "Look carefully!"],
      "drag-match": ["Match them up!", "Connect the pairs!", "Which ones go together?"],
      "tap-order-no-number": ["Count down!", "What's the order?", "3, 2, 1..."],
    };
    
    const puzzleHints = hints[LEVEL_CONTENT[levelId]?.type || "tap-order"] || hints["tap-order"];
    const hint = puzzleHints[Math.min(hintsUsed, puzzleHints.length - 1)];
    setSproutMessage(hint);
    
    setTimeout(() => setSproutMessage(null), 4000);
  }, [hintsUsed, levelId]);

  const levelContent = LEVEL_CONTENT[levelId] || LEVEL_CONTENT[1];
  const levelData = progress?.historyLevels.find((l) => l.id === levelId);
  const levelText = getHistoryLevelText(levelId, t);
  const translatedDragMatchData = getTranslatedDragMatchData(levelId, t);

  const shuffledIndices = useMemo(() => {
    if (levelContent.randomize) {
      return shuffleArray(levelContent.items.map((_, i) => i));
    }
    return levelContent.items.map((_, i) => i);
  }, [levelId, shuffleKey, levelContent.randomize]);

  const shuffledDragMatchItems = useMemo(() => {
    const dragData = translatedDragMatchData || levelContent.dragMatchData;
    if (levelContent.type === "drag-match" && dragData && levelContent.randomize) {
      return shuffleArray([...dragData.items]);
    }
    return dragData?.items || [];
  }, [levelId, shuffleKey, levelContent.type, levelContent.randomize, translatedDragMatchData, levelContent.dragMatchData]);

  const handleStartActivity = () => {
    setPhase("activity");
    setStartTime(Date.now());
  };

  const handleItemTap = (displayIndex: number) => {
    if (phase === "result") return;
    
    const originalIndex = shuffledIndices[displayIndex];
    
    if (levelContent.type === "tap-order" || levelContent.type === "tap-order-no-number") {
      if (selectedItems.includes(originalIndex)) {
        const idx = selectedItems.indexOf(originalIndex);
        setSelectedItems(selectedItems.slice(0, idx));
      } else {
        setSelectedItems([...selectedItems, originalIndex]);
      }
    } else if (levelContent.type === "tap-select") {
      setSelectedItems((prev) => 
        prev.includes(originalIndex) 
          ? prev.filter((i) => i !== originalIndex)
          : [...prev, originalIndex]
      );
    }
  };

  const handleSelectAnswer = (answer: string) => {
    if (phase === "result") return;
    if (answer === "I learned them!") {
      setSelectedAnswer("learned");
    } else {
      setSelectedAnswer(answer);
    }
  };

  const handleDragMatchComplete = () => {
    setIsCorrect(true);
    setPhase("result");
    setShowConfetti(true);
    
    const timeTaken = (Date.now() - startTime) / 1000;
    const wasQuick = timeTaken < 20;
    const starsEarned = wasQuick ? 3 : timeTaken < 30 ? 2 : 1;
    
    if (progress) {
      let newProgress = completeLevel(progress, "history", levelId, starsEarned);
      newProgress = trackLearningPattern(newProgress, levelContent.type, wasQuick);
      setProgress(newProgress);
    }
  };

  const checkAnswer = () => {
    let correct = false;
    
    if (levelContent.type === "matching") {
      correct = selectedAnswer === levelContent.correctAnswer;
    } else if (levelContent.type === "tap-select") {
      const correctIndices = levelContent.correctAnswer as number[];
      correct = correctIndices.length === selectedItems.length &&
        correctIndices.every((i) => selectedItems.includes(i));
    } else if (levelContent.type === "tap-order" || levelContent.type === "tap-order-no-number") {
      const correctOrder = levelContent.correctAnswer as number[];
      correct = correctOrder.length === selectedItems.length &&
        correctOrder.every((val, idx) => selectedItems[idx] === val);
    }
    
    setIsCorrect(correct);
    setPhase("result");
    
    if (correct) {
      setShowConfetti(true);
      const timeTaken = (Date.now() - startTime) / 1000;
      const wasQuick = timeTaken < 20;
      const starsEarned = wasQuick ? 3 : timeTaken < 30 ? 2 : 1;
      
      if (progress) {
        let newProgress = completeLevel(progress, "history", levelId, starsEarned);
        newProgress = trackLearningPattern(newProgress, levelContent.type, wasQuick);
        setProgress(newProgress);
      }
    }
  };

  const handleRetry = () => {
    setSelectedItems([]);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setPhase("activity");
    setStartTime(Date.now());
    setShuffleKey(prev => prev + 1);
  };

  const handleNext = () => {
    if (levelId < 10) {
      setLocation(`/history/level/${levelId + 1}`);
    } else {
      setLocation("/history");
    }
  };

  const canCheck = () => {
    if (levelContent.type === "matching") {
      return selectedAnswer !== null;
    }
    if (levelContent.type === "tap-select") {
      return selectedItems.length > 0;
    }
    if (levelContent.type === "tap-order" || levelContent.type === "tap-order-no-number") {
      const correctOrder = levelContent.correctAnswer as number[];
      return selectedItems.length === correctOrder.length;
    }
    return false;
  };

  const renderTeachContent = () => {
    if (levelContent.teachContent) {
      return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-6 mb-6 text-center">
          <div className="text-3xl mb-4 flex justify-center gap-4">
            {levelContent.items.map((item, i) => (
              <div key={i} className="bg-white dark:bg-card rounded-xl p-3 shadow-sm">
                <span className="text-lg font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const getLevel7Label = (originalIndex: number): string => {
    const labels = [t.vacuum, t.lawnMower, t.toaster, t.sprinkler];
    return labels[originalIndex] || "";
  };

  const renderItems = () => {
    const isClickable = levelContent.type === "tap-order" || levelContent.type === "tap-select" || levelContent.type === "tap-order-no-number";
    
    if (levelContent.type === "matching" && levelContent.teachContent) {
      return renderTeachContent();
    }
    
    if (levelContent.type === "drag-match" && (translatedDragMatchData || levelContent.dragMatchData)) {
      const dragData = translatedDragMatchData || levelContent.dragMatchData!;
      return (
        <DragDropPuzzle
          items={shuffledDragMatchItems.map(item => ({
            ...item,
            color: "bg-gradient-to-br from-amber-400 to-orange-400"
          }))}
          dropZones={dragData.dropZones}
          onComplete={handleDragMatchComplete}
          instruction={levelText.activity}
        />
      );
    }
    
    return (
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {shuffledIndices.map((originalIndex, displayIndex) => {
          const item = levelContent.items[originalIndex];
          const isSelected = selectedItems.includes(originalIndex);
          const orderIndex = selectedItems.indexOf(originalIndex);
          const showNumber = levelContent.type === "tap-order" && isSelected;
          const showLabel = levelId === 7 || levelContent.itemLabels;
          const itemLabel = levelId === 7 ? getLevel7Label(originalIndex) : (levelContent.itemLabels?.[originalIndex] || "");
          
          return (
            <button
              key={displayIndex}
              onClick={() => isClickable && handleItemTap(displayIndex)}
              disabled={phase === "result"}
              className={`
                ${showLabel ? "w-32 h-36 flex-col gap-1 pt-2" : "w-28 h-28"} rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md transition-all relative
                ${isClickable && phase !== "result"
                  ? `cursor-pointer ${
                      isSelected 
                        ? "bg-green-400 ring-4 ring-green-500 scale-110" 
                        : "bg-gradient-to-br from-primary/10 to-primary/5 hover:bg-primary/20 hover:scale-105"
                    }` 
                  : "bg-gradient-to-br from-primary/10 to-primary/5 cursor-default"
                }
                ${phase === "result" && isSelected && isCorrect ? "bg-green-400" : ""}
                ${phase === "result" && isSelected && !isCorrect ? "bg-red-400" : ""}
              `}
              data-testid={`item-${displayIndex}`}
            >
              <span className="text-2xl">{item}</span>
              {showLabel && (
                <span className="text-xs font-medium text-foreground/80">{itemLabel}</span>
              )}
              {showNumber && (
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-primary-foreground rounded-full text-sm font-bold flex items-center justify-center">
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
    if (levelContent.type === "matching" && levelContent.answerOptions) {
      return (
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {levelContent.answerOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelectAnswer(opt)}
              disabled={phase === "result"}
              className={`
                px-6 py-4 rounded-2xl text-lg font-bold shadow-md transition-all
                ${(selectedAnswer === "learned" && opt === "I learned them!") || selectedAnswer === opt
                  ? phase === "result"
                    ? isCorrect
                      ? "bg-green-500 text-white ring-4 ring-green-400"
                      : "bg-red-400 text-white"
                    : "bg-primary text-primary-foreground ring-4 ring-primary/50"
                  : "bg-white dark:bg-card text-foreground hover-elevate"
                }
                ${phase === "result" && (opt === "I learned them!" || opt === levelContent.correctAnswer) ? "ring-4 ring-green-400" : ""}
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
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20">
      {showConfetti && <ConfettiEffect show={showConfetti} />}

      <header className="sticky top-0 z-50 bg-white/90 dark:bg-card/90 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setLocation("/history")}
            data-testid="button-back-history"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">
            {t.level} {levelId}: {levelText.title}
          </h1>
          <div className="flex items-center gap-2">
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
        {levelId === 1 ? (
          <TariqLevelOneExperience
            onComplete={(stars) => {
              // Reload progress from localStorage to get the assessment that was just saved
              const freshProgress = loadProgress();
              let newProgress = completeLevel(freshProgress, "history", levelId, stars);
              newProgress = trackLearningPattern(newProgress, levelContent.type, stars >= 2);
              setProgress(newProgress);
              setShowConfetti(true);
              setIsCorrect(true);
              setPhase("result");
            }}
          />
        ) : (
          <>
            {phase === "intro" && (
              <HistoricalFigureGuide
                name={levelText.figure}
                title={levelText.title}
                message={levelText.greeting}
                era={levelContent.era}
                onContinue={handleStartActivity}
              />
            )}

            {(phase === "activity" || phase === "result") && (
              <>
                <div className="mb-6">
                  <PrincessAmara
                    message={phase === "result" 
                      ? isCorrect 
                        ? levelId === 10 
                          ? `${t.learnedAbout} Katherine Johnson, Mary Jackson, and Dorothy Vaughan!`
                          : `${t.learnedAbout} ${levelText.figure}!` 
                        : t.oopsTryAgain
                      : levelId === 10 
                        ? `${t.help} Katherine Johnson, Mary Jackson, and Dorothy Vaughan!`
                        : `${t.help} ${levelText.figure}!`
                    }
                    size="small"
                    customAvatarUrl={levelId === 10 ? hiddenFiguresImg : undefined}
                    customAvatarAlt={levelId === 10 ? "Katherine Johnson, Mary Jackson, and Dorothy Vaughan" : undefined}
                  />
                </div>

                <div className="bg-white dark:bg-card rounded-3xl shadow-lg p-8 mb-8">
                  {levelContent.type !== "drag-match" && (
                    <h2 className="text-xl font-bold text-foreground text-center mb-6 whitespace-pre-line">
                      {levelText.activity}
                    </h2>
                  )}

                  {renderItems()}
                  {renderAnswerOptions()}

                  {phase === "activity" && levelContent.type !== "drag-match" && (
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

                {phase === "result" && (
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
                      <>
                        <div className="flex justify-center gap-2 mb-4">
                          {[1, 2, 3].map((star) => (
                            <Star
                              key={star}
                              className={`w-10 h-10 ${
                                (levelData?.stars || 1) >= star
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <Button
                          size="lg"
                          onClick={handleNext}
                          className="rounded-full"
                          data-testid="button-next-level"
                        >
                          {levelId < 10 ? t.nextLevel : t.finish}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
