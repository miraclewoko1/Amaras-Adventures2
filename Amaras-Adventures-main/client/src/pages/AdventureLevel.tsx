import { useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import PrincessAmara from "@/components/PrincessAmara";
import { DragDropPuzzle, CollectibleStar, InteractiveObject, RewardBurst } from "@/components/game";
import { ArrowLeft, Star, ArrowRight, HelpCircle, Gamepad2 } from "lucide-react";
import { loadProgress, completeAdventureLevel, GameProgress } from "@/lib/gameProgress";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations, type Translations } from "@/lib/translations";
import { FlagIcon } from "@/components/FlagIcon";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface AdventurePuzzle {
  type: "drag-drop" | "select-order" | "collect" | "match";
  data: unknown;
}

const ADVENTURE_LEVELS: Record<number, AdventurePuzzle> = {
  1: {
    type: "drag-drop",
    data: {
      items: [
        { id: "circle", icon: "⚪", color: "bg-gradient-to-br from-blue-400 to-cyan-400" },
        { id: "square", icon: "🟧", color: "bg-gradient-to-br from-orange-400 to-red-400" },
        { id: "triangle", icon: "🔺", color: "bg-gradient-to-br from-green-400 to-emerald-400" },
      ],
      dropZones: [
        { id: "zone1", acceptsId: "circle", icon: "○" },
        { id: "zone2", acceptsId: "square", icon: "□" },
        { id: "zone3", acceptsId: "triangle", icon: "△" },
      ],
    },
  },
  2: {
    type: "collect",
    data: {
      stars: [
        { id: "star1", x: 20, y: 30 },
        { id: "star2", x: 50, y: 20 },
        { id: "star3", x: 80, y: 40 },
        { id: "star4", x: 35, y: 60 },
        { id: "star5", x: 65, y: 70 },
      ],
    },
  },
  3: {
    type: "select-order",
    data: {
      items: [
        { id: "3", icon: "3", correct: 2 },
        { id: "1", icon: "1", correct: 0 },
        { id: "5", icon: "5", correct: 4 },
        { id: "2", icon: "2", correct: 1 },
        { id: "4", icon: "4", correct: 3 },
      ],
    },
  },
  4: {
    type: "match",
    data: {
      pairs: [
        { animal: { id: "dog", icon: "🐕" }, soundId: "woof" },
        { animal: { id: "cat", icon: "🐱" }, soundId: "meow" },
        { animal: { id: "cow", icon: "🐄" }, soundId: "moo" },
      ],
    },
  },
  5: {
    type: "drag-drop",
    data: {
      items: [
        { id: "apple", icon: "🍎", color: "bg-gradient-to-br from-red-400 to-red-500" },
        { id: "banana", icon: "🍌", color: "bg-gradient-to-br from-yellow-400 to-yellow-500" },
        { id: "grapes", icon: "🍇", color: "bg-gradient-to-br from-purple-400 to-purple-500" },
      ],
      dropZones: [
        { id: "red", acceptsId: "apple", icon: "🧺" },
        { id: "yellow", acceptsId: "banana", icon: "🧺" },
        { id: "purple", acceptsId: "grapes", icon: "🧺" },
      ],
    },
  },
};

function getAdventureLevelText(levelId: number, t: Translations): { title: string; instruction: string } {
  const textMap: Record<number, { title: string; instruction: string }> = {
    1: { title: t.advL1Title, instruction: t.advL1Instruction },
    2: { title: t.advL2Title, instruction: t.advL2Instruction },
    3: { title: t.advL3Title, instruction: t.advL3Instruction },
    4: { title: t.advL4Title, instruction: t.advL4Instruction },
    5: { title: t.advL5Title, instruction: t.advL5Instruction },
  };
  return textMap[levelId] || textMap[1];
}

function getTranslatedAdventureData(levelId: number, t: Translations, baseData: unknown): unknown {
  if (levelId === 1) {
    const data = baseData as {
      items: Array<{ id: string; icon: string; color: string }>;
      dropZones: Array<{ id: string; acceptsId: string; icon: string }>;
    };
    return {
      items: data.items.map(item => ({
        ...item,
        label: item.id === "circle" ? t.circle : item.id === "square" ? t.square : t.triangle,
      })),
      dropZones: data.dropZones.map(zone => ({
        ...zone,
        label: zone.acceptsId === "circle" ? t.round : zone.acceptsId === "square" ? t.square : t.pointy,
      })),
    };
  }
  if (levelId === 4) {
    const data = baseData as {
      pairs: Array<{ animal: { id: string; icon: string }; soundId: string }>;
    };
    return {
      pairs: data.pairs.map(pair => ({
        animal: pair.animal,
        sound: {
          id: pair.soundId,
          label: pair.soundId === "woof" ? t.woof : pair.soundId === "meow" ? t.meow : t.moo,
        },
      })),
    };
  }
  if (levelId === 5) {
    const data = baseData as {
      items: Array<{ id: string; icon: string; color: string }>;
      dropZones: Array<{ id: string; acceptsId: string; icon: string }>;
    };
    return {
      items: data.items.map(item => ({
        ...item,
        label: item.id === "apple" ? t.apple : item.id === "banana" ? t.banana : t.grapes,
      })),
      dropZones: data.dropZones.map(zone => ({
        ...zone,
        label: zone.acceptsId === "apple" ? t.red : zone.acceptsId === "banana" ? t.yellow : t.purple,
      })),
    };
  }
  return baseData;
}

export default function AdventureLevel() {
  const [, setLocation] = useLocation();
  const params = useParams<{ level: string }>();
  const levelId = parseInt(params.level || "1", 10);
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslations(language);

  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [collectedStars, setCollectedStars] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [wrongSelection, setWrongSelection] = useState<string | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    setCollectedStars([]);
    setSelectedOrder([]);
    setShowReward(false);
    setIsComplete(false);
    setMatchedPairs([]);
    setSelectedAnimal(null);
    setStartTime(Date.now());
    setWrongSelection(null);
    setShuffleKey(prev => prev + 1);
  }, [levelId]);

  const puzzle = ADVENTURE_LEVELS[levelId];
  if (!puzzle) {
    return <div className="min-h-screen flex items-center justify-center">{t.levelNotFound}</div>;
  }

  const levelText = getAdventureLevelText(levelId, t);
  const translatedData = getTranslatedAdventureData(levelId, t, puzzle.data);

  // Randomize items for non-collect puzzles
  const randomizedPuzzleData = useMemo(() => {
    if (puzzle.type === "collect") return translatedData;
    
    if (puzzle.type === "drag-drop") {
      const data = translatedData as {
        items: Array<{ id: string; label: string; icon: string; color: string }>;
        dropZones: Array<{ id: string; label: string; acceptsId: string; icon: string }>;
      };
      return {
        items: shuffleArray(data.items),
        dropZones: shuffleArray(data.dropZones),
      };
    }
    
    if (puzzle.type === "select-order") {
      const data = translatedData as { items: Array<{ id: string; icon: string; correct: number }> };
      return { items: shuffleArray(data.items) };
    }
    
    if (puzzle.type === "match") {
      const data = translatedData as {
        pairs: Array<{ animal: { id: string; icon: string }; sound: { id: string; label: string } }>;
      };
      return { 
        pairs: shuffleArray(data.pairs),
        shuffledSounds: shuffleArray(data.pairs.map(p => p.sound))
      };
    }
    
    return translatedData;
  }, [levelId, shuffleKey, puzzle.type, language]);

  const handleComplete = () => {
    setShowReward(true);
    setIsComplete(true);

    const timeTaken = (Date.now() - startTime) / 1000;
    // Award up to 8 stars per adventure level (5 levels x 8 = 40 max stars)
    const starsEarned = timeTaken < 10 ? 8 : timeTaken < 15 ? 7 : timeTaken < 20 ? 6 : timeTaken < 25 ? 5 : timeTaken < 30 ? 4 : timeTaken < 40 ? 3 : timeTaken < 50 ? 2 : 1;

    if (progress) {
      const newProgress = completeAdventureLevel(progress, levelId, starsEarned);
      setProgress(newProgress);
    }
  };

  const handleCollectStar = (id: string) => {
    const newCollected = [...collectedStars, id];
    setCollectedStars(newCollected);

    const starData = puzzle.data as { stars: Array<{ id: string }> };
    if (newCollected.length === starData.stars.length) {
      setTimeout(handleComplete, 500);
    }
  };

  const handleSelectOrder = (id: string) => {
    if (selectedOrder.includes(id)) return;

    const items = (puzzle.data as { items: Array<{ id: string; correct: number }> }).items;
    const item = items.find((i) => i.id === id);
    
    if (item && item.correct === selectedOrder.length) {
      const newOrder = [...selectedOrder, id];
      setSelectedOrder(newOrder);
      setWrongSelection(null);

      if (newOrder.length === items.length) {
        setTimeout(handleComplete, 500);
      }
    } else {
      setWrongSelection(id);
      setTimeout(() => setWrongSelection(null), 600);
    }
  };

  const handleMatchClick = (type: "animal" | "sound", id: string) => {
    if (matchedPairs.includes(id)) return;

    if (type === "animal") {
      setSelectedAnimal(id);
    } else if (selectedAnimal) {
      const pairs = (translatedData as { pairs: Array<{ animal: { id: string }; sound: { id: string } }> }).pairs;
      const pair = pairs.find((p) => p.animal.id === selectedAnimal);
      
      if (pair && pair.sound.id === id) {
        const newMatched = [...matchedPairs, selectedAnimal, id];
        setMatchedPairs(newMatched);
        setSelectedAnimal(null);

        if (newMatched.length === pairs.length * 2) {
          setTimeout(handleComplete, 500);
        }
      } else {
        setSelectedAnimal(null);
      }
    }
  };

  const handleNext = () => {
    const nextLevel = levelId + 1;
    if (ADVENTURE_LEVELS[nextLevel]) {
      setLocation(`/adventure/level/${nextLevel}`);
    } else {
      setLocation("/");
    }
  };

  const renderPuzzle = () => {
    switch (puzzle.type) {
      case "drag-drop": {
        const data = randomizedPuzzleData as {
          items: Array<{ id: string; label: string; icon: string; color: string }>;
          dropZones: Array<{ id: string; label: string; acceptsId: string; icon: string }>;
        };
        return (
          <DragDropPuzzle
            items={data.items}
            dropZones={data.dropZones}
            onComplete={handleComplete}
            instruction={levelText.instruction}
          />
        );
      }

      case "collect": {
        const data = puzzle.data as { stars: Array<{ id: string; x: number; y: number }> };
        return (
          <div className="relative h-64 bg-gradient-to-b from-sky-200 to-green-200 dark:from-sky-800 dark:to-green-800 rounded-3xl overflow-hidden">
            {data.stars.map((star, index) => (
              <motion.div
                key={star.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="absolute"
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
              >
                <CollectibleStar
                  id={star.id}
                  onCollect={handleCollectStar}
                  collected={collectedStars.includes(star.id)}
                  size="lg"
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
            
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/80 dark:bg-black/50 rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-foreground">
                {collectedStars.length} / {data.stars.length}
              </span>
            </div>
          </div>
        );
      }

      case "select-order": {
        const data = randomizedPuzzleData as { items: Array<{ id: string; icon: string; correct: number }> };
        return (
          <div className="flex justify-center gap-4 flex-wrap">
            {data.items.map((item) => {
              const isSelected = selectedOrder.includes(item.id);
              const isWrong = wrongSelection === item.id;
              
              return (
                <InteractiveObject
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  onClick={handleSelectOrder}
                  isActive={isSelected}
                  isCorrect={isSelected ? true : isWrong ? false : null}
                  disabled={isComplete}
                  size="lg"
                  variant="filled"
                />
              );
            })}
          </div>
        );
      }

      case "match": {
        const data = randomizedPuzzleData as {
          pairs: Array<{ animal: { id: string; icon: string }; sound: { id: string; label: string } }>;
          shuffledSounds: Array<{ id: string; label: string }>;
        };
        return (
          <div className="flex justify-around gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-center font-bold text-muted-foreground">{t.animals}</h4>
              {data.pairs.map((pair) => (
                <InteractiveObject
                  key={pair.animal.id}
                  id={pair.animal.id}
                  icon={pair.animal.icon}
                  onClick={() => handleMatchClick("animal", pair.animal.id)}
                  isActive={selectedAnimal === pair.animal.id}
                  isCorrect={matchedPairs.includes(pair.animal.id) ? true : null}
                  disabled={matchedPairs.includes(pair.animal.id) || isComplete}
                  size="md"
                />
              ))}
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-center font-bold text-muted-foreground">{t.sounds}</h4>
              {data.shuffledSounds.map((sound) => (
                <InteractiveObject
                  key={sound.id}
                  id={sound.id}
                  icon={sound.label}
                  onClick={() => handleMatchClick("sound", sound.id)}
                  isActive={false}
                  isCorrect={matchedPairs.includes(sound.id) ? true : null}
                  disabled={matchedPairs.includes(sound.id) || isComplete}
                  size="md"
                  variant="outlined"
                />
              ))}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      <RewardBurst show={showReward} type="stars" onComplete={() => setShowReward(false)} />

      <header className="sticky top-0 z-50 bg-white/90 dark:bg-card/90 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">
            {t.adventure} {levelId}: {levelText.title}
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
            <Button size="icon" variant="ghost" data-testid="button-help">
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <PrincessAmara
            message={isComplete ? t.wonderfulJob : levelText.instruction}
            size="medium"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-card rounded-3xl shadow-lg p-6 mb-8"
        >
          {renderPuzzle()}
        </motion.div>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <Button
                size="lg"
                onClick={handleNext}
                className="rounded-full"
                data-testid="button-next-adventure"
              >
                {ADVENTURE_LEVELS[levelId + 1] ? t.nextAdventure : t.finish}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              {levelId === 5 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setLocation("/bonus-quest")}
                  className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-none"
                  data-testid="button-bonus-quest"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  {t.playBonusQuest}
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
