import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PrincessAmara from "@/components/PrincessAmara";
import ConfettiEffect from "@/components/ConfettiEffect";
import { ArrowLeft, Heart, Lightbulb, Circle, Square, Triangle, Star, Hexagon } from "lucide-react";

interface PatternGameProps {
  onStarEarned: () => void;
}

type ShapeType = "circle" | "square" | "triangle" | "star" | "hexagon";

interface PatternQuestion {
  pattern: ShapeType[];
  answer: ShapeType;
  options: ShapeType[];
}

const shapes: Record<ShapeType, { icon: React.ReactNode; color: string }> = {
  circle: { icon: <Circle className="w-full h-full" />, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30" },
  square: { icon: <Square className="w-full h-full" />, color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30" },
  triangle: { icon: <Triangle className="w-full h-full" />, color: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" },
  star: { icon: <Star className="w-full h-full" />, color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30" },
  hexagon: { icon: <Hexagon className="w-full h-full" />, color: "text-rose-500 bg-rose-100 dark:bg-rose-900/30" },
};

// todo: remove mock functionality - pattern generation
const generatePattern = (difficulty: number): PatternQuestion => {
  const shapeTypes: ShapeType[] = ["circle", "square", "triangle", "star", "hexagon"];
  const patternLength = difficulty === 1 ? 2 : difficulty === 2 ? 2 : 3;
  
  const basePattern: ShapeType[] = [];
  for (let i = 0; i < patternLength; i++) {
    basePattern.push(shapeTypes[Math.floor(Math.random() * (difficulty + 2))]);
  }
  
  const fullPattern = [...basePattern, ...basePattern];
  const answer = basePattern[0];
  
  const options: ShapeType[] = [answer];
  while (options.length < 4) {
    const randomShape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    if (!options.includes(randomShape)) {
      options.push(randomShape);
    }
  }
  
  return {
    pattern: fullPattern,
    answer,
    options: options.sort(() => Math.random() - 0.5),
  };
};

export default function PatternGame({ onStarEarned }: PatternGameProps) {
  const [, setLocation] = useLocation();
  const [questionNum, setQuestionNum] = useState(1);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [question, setQuestion] = useState<PatternQuestion>(() => generatePattern(1));
  const [selectedAnswer, setSelectedAnswer] = useState<ShapeType | null>(null);
  const [answerResult, setAnswerResult] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [amaraMessage, setAmaraMessage] = useState("Find what comes next in the pattern!");
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const totalQuestions = 5;

  const encouragements = [
    "Pattern perfect!",
    "You see the pattern!",
    "Excellent observation!",
    "Sharp eyes!",
    "Pattern master!",
  ];

  const tryAgainMessages = [
    "Look at the shapes again!",
    "What repeats? Try once more!",
    "You can find it!",
  ];

  useEffect(() => {
    if (answerResult !== null) {
      const timer = setTimeout(() => {
        if (answerResult) {
          if (questionNum >= totalQuestions) {
            setGameOver(true);
            setShowConfetti(true);
            onStarEarned();
            setAmaraMessage("Wonderful! You mastered patterns! Here's a star!");
          } else {
            setQuestionNum((q) => q + 1);
            setQuestion(generatePattern(difficulty));
            setAmaraMessage("Great! Find the next pattern!");
          }
        }
        setSelectedAnswer(null);
        setAnswerResult(null);
        setShowHint(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [answerResult, questionNum, difficulty, onStarEarned]);

  const handleAnswer = (shape: ShapeType) => {
    if (answerResult !== null) return;

    setSelectedAnswer(shape);
    const isCorrect = shape === question.answer;
    setAnswerResult(isCorrect);

    if (isCorrect) {
      setScore((s) => s + 1);
      setAmaraMessage(encouragements[Math.floor(Math.random() * encouragements.length)]);
      
      if (score > 0 && score % 2 === 0 && difficulty < 3) {
        setDifficulty((d) => d + 1);
      }
    } else {
      setLives((l) => l - 1);
      setAmaraMessage(tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)]);
      
      if (lives <= 1) {
        setGameOver(true);
        setAmaraMessage("Nice try! Patterns take practice!");
      }
    }
  };

  const handleRestart = () => {
    setQuestionNum(1);
    setLives(3);
    setScore(0);
    setDifficulty(1);
    setQuestion(generatePattern(1));
    setSelectedAnswer(null);
    setAnswerResult(null);
    setGameOver(false);
    setShowConfetti(false);
    setAmaraMessage("Let's find patterns!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ConfettiEffect show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>

          <div className="flex-1 max-w-xs">
            <div className="text-center text-sm text-muted-foreground mb-1">
              Question {questionNum} of {totalQuestions}
            </div>
            <Progress value={(questionNum / totalQuestions) * 100} className="h-3" />
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 3].map((i) => (
              <Heart
                key={i}
                className={`w-6 h-6 ${
                  i <= lives
                    ? "fill-rose-500 text-rose-500"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {gameOver ? (
            <div className="text-center space-y-8">
              <PrincessAmara message={amaraMessage} size="large" animate={false} />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  {lives > 0 ? "Pattern Pro!" : "Good Effort!"}
                </h2>
                <p className="text-xl text-muted-foreground">
                  You found {score} out of {totalQuestions} patterns!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleRestart}
                  className="text-lg px-8 py-6 rounded-full"
                  data-testid="button-play-again"
                >
                  Play Again
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setLocation("/")}
                  className="text-lg px-8 py-6 rounded-full"
                  data-testid="button-go-home"
                >
                  Go Home
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-center">
                <PrincessAmara message={amaraMessage} size="medium" animate={false} />
              </div>

              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What comes next?
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-3 bg-muted/30 p-6 rounded-3xl">
                  {question.pattern.map((shape, i) => (
                    <div
                      key={i}
                      className={`w-14 h-14 md:w-16 md:h-16 p-3 rounded-2xl ${shapes[shape].color}`}
                    >
                      {shapes[shape].icon}
                    </div>
                  ))}
                  <div className="w-14 h-14 md:w-16 md:h-16 p-3 rounded-2xl border-4 border-dashed border-muted-foreground flex items-center justify-center">
                    <span className="text-3xl text-muted-foreground">?</span>
                  </div>
                </div>
              </div>

              {showHint && (
                <div className="text-center text-lg text-muted-foreground animate-in fade-in duration-300">
                  Look at the first shapes - they repeat! What comes after the last one?
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-4">
                {question.options.map((shape) => {
                  const isSelected = selectedAnswer === shape;
                  const isCorrect = isSelected && answerResult === true;
                  const isWrong = isSelected && answerResult === false;

                  return (
                    <button
                      key={shape}
                      onClick={() => handleAnswer(shape)}
                      disabled={answerResult !== null}
                      className={`w-20 h-20 p-4 rounded-2xl border-4 transition-all duration-200 ${
                        isCorrect
                          ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 scale-105"
                          : isWrong
                          ? "border-rose-500 bg-rose-100 dark:bg-rose-900/30 animate-shake"
                          : isSelected
                          ? "border-primary scale-105"
                          : "border-border bg-card hover:border-primary/50"
                      } ${shapes[shape].color.split(" ")[0]}`}
                      data-testid={`button-shape-${shape}`}
                    >
                      {shapes[shape].icon}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowHint(true)}
                  className="gap-2"
                  disabled={showHint}
                  data-testid="button-hint"
                >
                  <Lightbulb className="w-5 h-5" />
                  Need a hint?
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
