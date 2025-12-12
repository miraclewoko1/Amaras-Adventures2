import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PrincessAmara from "@/components/PrincessAmara";
import NumberButton from "@/components/NumberButton";
import QuestionDisplay from "@/components/QuestionDisplay";
import ConfettiEffect from "@/components/ConfettiEffect";
import { ArrowLeft, Heart, Lightbulb, Apple, Star, Circle, Square, Triangle } from "lucide-react";

interface CountingGameProps {
  onStarEarned: () => void;
}

interface Question {
  count: number;
  icon: React.ReactNode;
  color: string;
}

// todo: remove mock functionality - question generation
const generateQuestion = (difficulty: number): Question => {
  const icons = [
    { Icon: Apple, color: "text-red-500 bg-red-100 dark:bg-red-900/30" },
    { Icon: Star, color: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" },
    { Icon: Circle, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30" },
    { Icon: Square, color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30" },
    { Icon: Triangle, color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30" },
  ];

  const maxCount = difficulty === 1 ? 5 : difficulty === 2 ? 7 : 10;
  const count = Math.floor(Math.random() * maxCount) + 1;
  const iconData = icons[Math.floor(Math.random() * icons.length)];

  return {
    count,
    icon: <iconData.Icon className="w-10 h-10" />,
    color: iconData.color,
  };
};

export default function CountingGame({ onStarEarned }: CountingGameProps) {
  const [, setLocation] = useLocation();
  const [questionNum, setQuestionNum] = useState(1);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [question, setQuestion] = useState<Question>(() => generateQuestion(1));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [amaraMessage, setAmaraMessage] = useState("Count the objects carefully!");
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const totalQuestions = 5;

  const encouragements = [
    "Amazing job!",
    "You're so smart!",
    "Fantastic counting!",
    "Way to go!",
    "You're a star!",
  ];

  const tryAgainMessages = [
    "Oops! Let's try again!",
    "You can do it! Try once more!",
    "Almost! Count again carefully!",
  ];

  useEffect(() => {
    if (answerResult !== null) {
      const timer = setTimeout(() => {
        if (answerResult) {
          if (questionNum >= totalQuestions) {
            setGameOver(true);
            setShowConfetti(true);
            onStarEarned();
            setAmaraMessage("Wow! You completed the game! You earned a star!");
          } else {
            setQuestionNum((q) => q + 1);
            setQuestion(generateQuestion(difficulty));
            setAmaraMessage("Great! Here's the next one!");
          }
        }
        setSelectedAnswer(null);
        setAnswerResult(null);
        setShowHint(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [answerResult, questionNum, difficulty, onStarEarned]);

  const handleAnswer = (num: number) => {
    if (answerResult !== null) return;

    setSelectedAnswer(num);
    const isCorrect = num === question.count;
    setAnswerResult(isCorrect);

    if (isCorrect) {
      setScore((s) => s + 1);
      setAmaraMessage(encouragements[Math.floor(Math.random() * encouragements.length)]);
      
      // Adaptive difficulty
      if (score > 0 && score % 3 === 0 && difficulty < 3) {
        setDifficulty((d) => d + 1);
      }
    } else {
      setLives((l) => l - 1);
      setAmaraMessage(tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)]);
      
      if (lives <= 1) {
        setGameOver(true);
        setAmaraMessage("Great try! Let's practice more next time!");
      }
    }
  };

  const handleRestart = () => {
    setQuestionNum(1);
    setLives(3);
    setScore(0);
    setDifficulty(1);
    setQuestion(generateQuestion(1));
    setSelectedAnswer(null);
    setAnswerResult(null);
    setGameOver(false);
    setShowConfetti(false);
    setAmaraMessage("Let's count together!");
  };

  const maxAnswer = difficulty === 1 ? 5 : difficulty === 2 ? 7 : 10;
  const answerOptions = Array.from({ length: maxAnswer }, (_, i) => i + 1);

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
                  {lives > 0 ? "Congratulations!" : "Good Effort!"}
                </h2>
                <p className="text-xl text-muted-foreground">
                  You got {score} out of {totalQuestions} correct!
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

              <QuestionDisplay
                question="How many do you see?"
                visualElements={
                  <div className="flex flex-wrap justify-center gap-4 p-6 rounded-3xl bg-muted/30">
                    {Array.from({ length: question.count }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${question.color}`}
                      >
                        {question.icon}
                      </div>
                    ))}
                  </div>
                }
              />

              {showHint && (
                <div className="text-center text-lg text-muted-foreground animate-in fade-in duration-300">
                  Try counting each one: 1, 2, 3...
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-4">
                {answerOptions.map((num) => (
                  <NumberButton
                    key={num}
                    number={num}
                    onClick={handleAnswer}
                    selected={selectedAnswer === num}
                    correct={selectedAnswer === num ? answerResult : null}
                    disabled={answerResult !== null}
                  />
                ))}
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
