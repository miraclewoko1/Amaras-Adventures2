import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PrincessAmara from "@/components/PrincessAmara";
import NumberButton from "@/components/NumberButton";
import ConfettiEffect from "@/components/ConfettiEffect";
import { ArrowLeft, Heart, Lightbulb, Plus } from "lucide-react";

interface AdditionGameProps {
  onStarEarned: () => void;
}

interface Question {
  num1: number;
  num2: number;
  answer: number;
}

// todo: remove mock functionality - question generation
const generateQuestion = (difficulty: number): Question => {
  const max = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
  const num1 = Math.floor(Math.random() * max) + 1;
  const num2 = Math.floor(Math.random() * (max - num1 + 1)) + 1;
  return { num1, num2, answer: num1 + num2 };
};

export default function AdditionGame({ onStarEarned }: AdditionGameProps) {
  const [, setLocation] = useLocation();
  const [questionNum, setQuestionNum] = useState(1);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [question, setQuestion] = useState<Question>(() => generateQuestion(1));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [amaraMessage, setAmaraMessage] = useState("Add the numbers together!");
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const totalQuestions = 5;

  const encouragements = [
    "Perfect addition!",
    "You're a math whiz!",
    "That's exactly right!",
    "Brilliant work!",
    "Super solver!",
  ];

  const tryAgainMessages = [
    "Let's try that one again!",
    "Almost! Give it another go!",
    "Keep trying, you've got this!",
  ];

  useEffect(() => {
    if (answerResult !== null) {
      const timer = setTimeout(() => {
        if (answerResult) {
          if (questionNum >= totalQuestions) {
            setGameOver(true);
            setShowConfetti(true);
            onStarEarned();
            setAmaraMessage("Amazing! You completed addition! Here's your star!");
          } else {
            setQuestionNum((q) => q + 1);
            setQuestion(generateQuestion(difficulty));
            setAmaraMessage("Awesome! Next problem!");
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
    const isCorrect = num === question.answer;
    setAnswerResult(isCorrect);

    if (isCorrect) {
      setScore((s) => s + 1);
      setAmaraMessage(encouragements[Math.floor(Math.random() * encouragements.length)]);
      
      if (score > 0 && score % 3 === 0 && difficulty < 3) {
        setDifficulty((d) => d + 1);
      }
    } else {
      setLives((l) => l - 1);
      setAmaraMessage(tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)]);
      
      if (lives <= 1) {
        setGameOver(true);
        setAmaraMessage("Great effort! Practice makes perfect!");
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
    setAmaraMessage("Let's add some numbers!");
  };

  const generateAnswerOptions = () => {
    const options = new Set<number>();
    options.add(question.answer);
    while (options.size < 6) {
      const offset = Math.floor(Math.random() * 5) - 2;
      const option = question.answer + offset;
      if (option > 0 && option <= 20) {
        options.add(option);
      }
    }
    return Array.from(options).sort((a, b) => a - b);
  };

  const answerOptions = generateAnswerOptions();

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
                  {lives > 0 ? "Fantastic!" : "Good Try!"}
                </h2>
                <p className="text-xl text-muted-foreground">
                  You solved {score} out of {totalQuestions} problems!
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
                <div className="inline-flex items-center gap-4 text-5xl md:text-7xl font-bold text-foreground bg-muted/30 px-8 py-6 rounded-3xl">
                  <span className="text-purple-500">{question.num1}</span>
                  <Plus className="w-10 h-10 md:w-14 md:h-14 text-muted-foreground" />
                  <span className="text-teal-500">{question.num2}</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-3xl md:text-5xl text-muted-foreground">?</span>
                </div>
              </div>

              {showHint && (
                <div className="text-center text-lg text-muted-foreground animate-in fade-in duration-300">
                  Try counting up from {question.num1}: {question.num1}
                  {Array.from({ length: question.num2 })
                    .map((_, i) => `, ${question.num1 + i + 1}`)
                    .join("")}
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
