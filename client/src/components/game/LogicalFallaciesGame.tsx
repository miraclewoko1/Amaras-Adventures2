import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, Star, HelpCircle, RotateCcw } from "lucide-react";

interface FallacyCard {
  id: string;
  name: string;
  kidName: string;
  icon: string;
  definition: string;
  example: string;
  color: string;
}

interface Scenario {
  id: string;
  fallacyId: string;
  characters: [string, string];
  dialogue: [string, string];
  explanation: string;
}

interface FairChoiceQuestion {
  id: string;
  situation: string;
  fallacyAnswer: string;
  fairAnswer: string;
  fallacyId: string;
  explanation: string;
}

const FALLACY_CARDS: FallacyCard[] = [
  {
    id: "hasty_generalization",
    name: "Hasty Generalization",
    kidName: "Jumping to Conclusions",
    icon: "🦘",
    definition: "When you decide something is always true after seeing it just once or twice!",
    example: "I tried broccoli once and didn't like it. All vegetables must be yucky!",
    color: "from-orange-400 to-red-400"
  },
  {
    id: "bandwagon",
    name: "Bandwagon",
    kidName: "Everyone Says So!",
    icon: "🎪",
    definition: "When you think something is right just because lots of people do it or say it!",
    example: "Everyone at school says blue is the best color, so it must be true!",
    color: "from-blue-400 to-purple-400"
  },
  {
    id: "strawman",
    name: "Strawman",
    kidName: "That's Not What I Said!",
    icon: "🧸",
    definition: "When someone changes what you said to make it easier to argue against!",
    example: "I said I want a cookie. They said I want to eat candy all day!",
    color: "from-yellow-400 to-orange-400"
  },
  {
    id: "ad_hominem",
    name: "Ad Hominem",
    kidName: "Being Mean Instead!",
    icon: "😤",
    definition: "When someone says mean things about a person instead of talking about their idea!",
    example: "Your idea is wrong because you're just a little kid!",
    color: "from-red-400 to-pink-400"
  },
  {
    id: "false_cause",
    name: "False Cause",
    kidName: "It Happened Before!",
    icon: "🔮",
    definition: "When you think one thing caused another just because it happened first!",
    example: "I wore my lucky socks and we won the game. My socks made us win!",
    color: "from-purple-400 to-indigo-400"
  }
];

const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    fallacyId: "hasty_generalization",
    characters: ["🐰", "🐻"],
    dialogue: [
      "I met one grumpy cat yesterday.",
      "All cats must be grumpy then!"
    ],
    explanation: "Bear jumped to a conclusion! Meeting one grumpy cat doesn't mean ALL cats are grumpy!"
  },
  {
    id: "s2",
    fallacyId: "bandwagon",
    characters: ["🐸", "🦊"],
    dialogue: [
      "Why do you think pizza is the best food?",
      "Because everyone in my class says so!"
    ],
    explanation: "Fox is following the crowd! Just because everyone says something doesn't make it true for everyone!"
  },
  {
    id: "s3",
    fallacyId: "strawman",
    characters: ["🐱", "🐶"],
    dialogue: [
      "I think we should play inside today.",
      "So you never want to go outside ever again?!"
    ],
    explanation: "Dog changed what Cat said! Cat just wanted to play inside TODAY, not forever!"
  },
  {
    id: "s4",
    fallacyId: "ad_hominem",
    characters: ["🦁", "🐯"],
    dialogue: [
      "I think we should share the toys equally.",
      "That's a silly idea because you're the youngest!"
    ],
    explanation: "Tiger was being mean instead of talking about the idea! Being young doesn't make an idea wrong!"
  },
  {
    id: "s5",
    fallacyId: "false_cause",
    characters: ["🐨", "🐼"],
    dialogue: [
      "Why did you eat three cookies for breakfast?",
      "Last time I did that, I got an A on my test!"
    ],
    explanation: "Panda thinks cookies caused the good grade! But studying hard is what really helps on tests!"
  }
];

interface FixMistakeQuestion {
  id: string;
  situation: string;
  wrongThinking: string;
  fixes: string[];
  correctFixIndex: number;
  fallacyId: string;
  explanation: string;
}

const FIX_MISTAKES: FixMistakeQuestion[] = [
  {
    id: "fm1",
    situation: "Sam tried one new food and didn't like it.",
    wrongThinking: "I hate ALL new foods forever!",
    fixes: [
      "I'll never try anything new again!",
      "Maybe I'll like a different new food. I can try again!",
      "New foods are always yucky!"
    ],
    correctFixIndex: 1,
    fallacyId: "hasty_generalization",
    explanation: "Great fix! One food doesn't tell us about ALL foods!"
  },
  {
    id: "fm2",
    situation: "Everyone in class picked red as their favorite color.",
    wrongThinking: "Red must be the BEST color since everyone picked it!",
    fixes: [
      "I should pick red too because everyone else did!",
      "Red is definitely better than all other colors!",
      "I can still like my own favorite color, even if it's different!"
    ],
    correctFixIndex: 2,
    fallacyId: "bandwagon",
    explanation: "Perfect! You can have your own favorite, even if others pick something different!"
  },
  {
    id: "fm3",
    situation: "Your friend said they want to play alone for 10 minutes.",
    wrongThinking: "They don't want to be my friend anymore!",
    fixes: [
      "They hate me now!",
      "I'll never talk to them again!",
      "They just need a little break. We can play soon!"
    ],
    correctFixIndex: 2,
    fallacyId: "strawman",
    explanation: "You got it! Wanting alone time doesn't mean they don't like you!"
  }
];

const FAIR_CHOICES: FairChoiceQuestion[] = [
  {
    id: "fc1",
    situation: "Your friend tried one math problem and got it wrong.",
    fallacyAnswer: "Math is too hard! I'll never be good at it!",
    fairAnswer: "That was just one problem. Let me try more and practice!",
    fallacyId: "hasty_generalization",
    explanation: "One mistake doesn't mean you can't learn! Practice makes progress!"
  },
  {
    id: "fc2",
    situation: "Everyone at the playground says the swings are better than slides.",
    fallacyAnswer: "Everyone says swings are better, so I should only use swings!",
    fairAnswer: "I can try both and decide what I like best!",
    fallacyId: "bandwagon",
    explanation: "You can have your own favorite! What others like doesn't have to be what you like!"
  },
  {
    id: "fc3",
    situation: "Your sister says she wants to read quietly for a bit.",
    fallacyAnswer: "She never wants to play with me anymore!",
    fairAnswer: "She wants quiet time now. We can play later!",
    fallacyId: "strawman",
    explanation: "Wanting quiet time now doesn't mean never wanting to play!"
  },
  {
    id: "fc4",
    situation: "A younger kid shares an idea for a game.",
    fallacyAnswer: "That's a baby idea because you're little!",
    fairAnswer: "That sounds fun! Let's try it!",
    fallacyId: "ad_hominem",
    explanation: "Good ideas can come from anyone, no matter their age!"
  },
  {
    id: "fc5",
    situation: "It rained on your birthday last year.",
    fallacyAnswer: "It always rains on my birthday! It will rain this year too!",
    fairAnswer: "Last year was rainy, but this year might be sunny!",
    fallacyId: "false_cause",
    explanation: "Weather changes every year! One rainy day doesn't predict the future!"
  }
];

interface LogicalFallaciesGameProps {
  onComplete: (score: number, correct: string[], incorrect: string[]) => void;
  onProgress?: (score: number, total: number) => void;
}

type GamePhase = "intro" | "learn" | "spot" | "fix" | "choose" | "results";

export default function LogicalFallaciesGame({ onComplete, onProgress }: LogicalFallaciesGameProps) {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentChoiceIndex, setCurrentChoiceIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctFallacies, setCorrectFallacies] = useState<string[]>([]);
  const [incorrectFallacies, setIncorrectFallacies] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentFixIndex, setCurrentFixIndex] = useState(0);
  const [shuffledScenarios] = useState(() => [...SCENARIOS].sort(() => Math.random() - 0.5).slice(0, 3));
  const [shuffledFixes] = useState(() => [...FIX_MISTAKES].sort(() => Math.random() - 0.5).slice(0, 3));
  const [shuffledChoices] = useState(() => [...FAIR_CHOICES].sort(() => Math.random() - 0.5).slice(0, 3));

  const handleStartLearning = () => {
    setPhase("learn");
    setCurrentCardIndex(0);
  };

  const handleNextCard = () => {
    if (currentCardIndex < FALLACY_CARDS.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setPhase("spot");
      setCurrentScenarioIndex(0);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleSpotAnswer = useCallback((fallacyId: string) => {
    const scenario = shuffledScenarios[currentScenarioIndex];
    const correct = fallacyId === scenario.fallacyId;
    
    setSelectedAnswer(fallacyId);
    setIsCorrect(correct);
    setFeedbackMessage(scenario.explanation);
    setShowFeedback(true);
    
    if (correct) {
      setScore(s => s + 10);
      setCorrectFallacies(prev => [...prev, scenario.fallacyId]);
    } else {
      setIncorrectFallacies(prev => [...prev, scenario.fallacyId]);
    }
    
    onProgress?.(score + (correct ? 10 : 0), 90);
  }, [currentScenarioIndex, shuffledScenarios, score, onProgress]);

  const handleNextScenario = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentScenarioIndex < shuffledScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setPhase("fix");
      setCurrentFixIndex(0);
    }
  };

  const handleFixAnswer = useCallback((fixIndex: number) => {
    const fixQuestion = shuffledFixes[currentFixIndex];
    const correct = fixIndex === fixQuestion.correctFixIndex;
    
    setSelectedAnswer(String(fixIndex));
    setIsCorrect(correct);
    setFeedbackMessage(fixQuestion.explanation);
    setShowFeedback(true);
    
    if (correct) {
      setScore(s => s + 10);
      setCorrectFallacies(prev => [...prev, fixQuestion.fallacyId]);
    } else {
      setIncorrectFallacies(prev => [...prev, fixQuestion.fallacyId]);
    }
    
    onProgress?.(score + (correct ? 10 : 0), 90);
  }, [currentFixIndex, shuffledFixes, score, onProgress]);

  const handleNextFix = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentFixIndex < shuffledFixes.length - 1) {
      setCurrentFixIndex(currentFixIndex + 1);
    } else {
      setPhase("choose");
      setCurrentChoiceIndex(0);
    }
  };

  const handleChooseAnswer = useCallback((isFair: boolean) => {
    const choice = shuffledChoices[currentChoiceIndex];
    const correct = isFair;
    
    setSelectedAnswer(isFair ? "fair" : "fallacy");
    setIsCorrect(correct);
    setFeedbackMessage(choice.explanation);
    setShowFeedback(true);
    
    if (correct) {
      setScore(s => s + 10);
      setCorrectFallacies(prev => [...prev, choice.fallacyId]);
    } else {
      setIncorrectFallacies(prev => [...prev, choice.fallacyId]);
    }
    
    onProgress?.(score + (correct ? 10 : 0), 90);
  }, [currentChoiceIndex, shuffledChoices, score, onProgress]);

  const handleNextChoice = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentChoiceIndex < shuffledChoices.length - 1) {
      setCurrentChoiceIndex(currentChoiceIndex + 1);
    } else {
      setPhase("results");
      onComplete(score, correctFallacies, incorrectFallacies);
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrentCardIndex(0);
    setCurrentScenarioIndex(0);
    setCurrentFixIndex(0);
    setCurrentChoiceIndex(0);
    setScore(0);
    setCorrectFallacies([]);
    setIncorrectFallacies([]);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  const renderIntro = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <div className="text-6xl mb-4">🧠✨</div>
      <h2 className="text-2xl font-bold text-foreground">Think Like a Detective!</h2>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        Sometimes our brains make little mistakes when thinking. Let's learn to spot them and think more clearly!
      </p>
      <Button 
        onClick={handleStartLearning}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 rounded-2xl"
      >
        Let's Learn! 🎓
      </Button>
    </motion.div>
  );

  const renderLearnPhase = () => {
    const card = FALLACY_CARDS[currentCardIndex];
    return (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Card {currentCardIndex + 1} of {FALLACY_CARDS.length}
          </span>
          <div className="flex gap-1">
            {FALLACY_CARDS.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full ${i === currentCardIndex ? 'bg-primary' : 'bg-muted'}`}
              />
            ))}
          </div>
        </div>

        <div className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white shadow-lg`}>
          <div className="text-center mb-4">
            <span className="text-5xl">{card.icon}</span>
          </div>
          <h3 className="text-2xl font-bold text-center mb-2">{card.kidName}</h3>
          <p className="text-sm opacity-80 text-center mb-4">({card.name})</p>
          
          <div className="bg-white/20 rounded-2xl p-4 mb-4">
            <p className="text-lg font-medium">{card.definition}</p>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-sm opacity-90">
              <span className="font-bold">Example: </span>
              "{card.example}"
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
            className="flex-1"
          >
            ← Back
          </Button>
          <Button
            onClick={handleNextCard}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
          >
            {currentCardIndex === FALLACY_CARDS.length - 1 ? "Start Game! 🎮" : "Next →"}
          </Button>
        </div>
      </motion.div>
    );
  };

  const renderSpotPhase = () => {
    const scenario = shuffledScenarios[currentScenarioIndex];
    return (
      <motion.div
        key={scenario.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-foreground">🔍 Spot the Mistake!</h3>
          <p className="text-sm text-muted-foreground">
            Round {currentScenarioIndex + 1} of {shuffledScenarios.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-3xl p-6 border border-border">
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <span className="text-5xl">{scenario.characters[0]}</span>
            </div>
            <div className="text-center">
              <span className="text-5xl">{scenario.characters[1]}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white dark:bg-card rounded-2xl p-4 shadow-sm">
              <span className="text-2xl mr-2">{scenario.characters[0]}</span>
              <span className="text-foreground">"{scenario.dialogue[0]}"</span>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl p-4 shadow-sm">
              <span className="text-2xl mr-2">{scenario.characters[1]}</span>
              <span className="text-foreground">"{scenario.dialogue[1]}"</span>
            </div>
          </div>
        </div>

        <p className="text-center font-medium text-foreground">
          Which thinking mistake is this?
        </p>

        <AnimatePresence>
          {showFeedback ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl p-4 ${isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                {isCorrect ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <X className="w-6 h-6 text-red-600" />
                )}
                <span className={`font-bold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {isCorrect ? "Great job!" : "Not quite!"}
                </span>
              </div>
              <p className="text-sm text-foreground">{feedbackMessage}</p>
              <Button onClick={handleNextScenario} className="mt-4 w-full">
                Continue →
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {FALLACY_CARDS.map((card) => (
                <Button
                  key={card.id}
                  variant="outline"
                  onClick={() => handleSpotAnswer(card.id)}
                  disabled={showFeedback}
                  className="h-auto py-3 flex flex-col items-center gap-1 hover:bg-primary/10"
                >
                  <span className="text-2xl">{card.icon}</span>
                  <span className="text-xs font-medium text-center">{card.kidName}</span>
                </Button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderFixPhase = () => {
    const fixQuestion = shuffledFixes[currentFixIndex];
    
    return (
      <motion.div
        key={fixQuestion.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-foreground">🔧 Fix the Mistake!</h3>
          <p className="text-sm text-muted-foreground">
            Round {currentFixIndex + 1} of {shuffledFixes.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-3xl p-6 border border-border">
          <div className="text-center mb-3">
            <span className="text-3xl">😕</span>
          </div>
          <p className="text-sm text-center text-muted-foreground mb-2">
            {fixQuestion.situation}
          </p>
          <div className="bg-red-100 dark:bg-red-900/30 rounded-xl p-3 border-2 border-red-300 dark:border-red-700">
            <p className="text-center font-medium text-red-700 dark:text-red-400">
              ❌ {fixQuestion.wrongThinking}
            </p>
          </div>
        </div>

        <p className="text-center font-medium text-foreground">
          Which answer fixes this thinking mistake?
        </p>

        <AnimatePresence>
          {showFeedback ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl p-4 ${isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                {isCorrect ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <X className="w-6 h-6 text-red-600" />
                )}
                <span className={`font-bold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {isCorrect ? "Great fix!" : "Try a different fix!"}
                </span>
              </div>
              <p className="text-sm text-foreground">{feedbackMessage}</p>
              <Button onClick={handleNextFix} className="mt-4 w-full">
                Continue →
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {fixQuestion.fixes.map((fix, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleFixAnswer(index)}
                  disabled={showFeedback}
                  className="w-full h-auto py-3 px-4 text-left whitespace-normal hover:bg-green-50 dark:hover:bg-green-950/30"
                >
                  <span className="text-sm">{fix}</span>
                </Button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderChoosePhase = () => {
    const choice = shuffledChoices[currentChoiceIndex];
    const shuffledAnswers = Math.random() > 0.5 
      ? [{ text: choice.fairAnswer, isFair: true }, { text: choice.fallacyAnswer, isFair: false }]
      : [{ text: choice.fallacyAnswer, isFair: false }, { text: choice.fairAnswer, isFair: true }];

    return (
      <motion.div
        key={choice.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-foreground">⚖️ Choose the Fair Answer!</h3>
          <p className="text-sm text-muted-foreground">
            Round {currentChoiceIndex + 1} of {shuffledChoices.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-3xl p-6 border border-border">
          <div className="text-center mb-4">
            <span className="text-4xl">🤔</span>
          </div>
          <p className="text-lg font-medium text-center text-foreground">
            {choice.situation}
          </p>
        </div>

        <p className="text-center font-medium text-foreground">
          Which answer is fair thinking?
        </p>

        <AnimatePresence>
          {showFeedback ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl p-4 ${isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                {isCorrect ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <X className="w-6 h-6 text-red-600" />
                )}
                <span className={`font-bold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {isCorrect ? "You're thinking clearly!" : "That's a thinking trap!"}
                </span>
              </div>
              <p className="text-sm text-foreground">{feedbackMessage}</p>
              <Button onClick={handleNextChoice} className="mt-4 w-full">
                {currentChoiceIndex === shuffledChoices.length - 1 ? "See Results! 🏆" : "Continue →"}
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {shuffledAnswers.map((answer, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleChooseAnswer(answer.isFair)}
                  disabled={showFeedback}
                  className="w-full h-auto py-4 text-left justify-start hover:bg-primary/10"
                >
                  <span className="text-sm">{answer.text}</span>
                </Button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="text-6xl mb-4">
        {score >= 50 ? "🏆" : score >= 30 ? "⭐" : "🌟"}
      </div>
      <h2 className="text-2xl font-bold text-foreground">
        {score >= 50 ? "Amazing Thinker!" : score >= 30 ? "Great Job!" : "Good Try!"}
      </h2>
      
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl p-6">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          <span className="text-4xl font-bold text-foreground">{score}</span>
          <span className="text-lg text-muted-foreground">points</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-3">
            <Check className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <span className="font-medium text-green-700 dark:text-green-400">
              {correctFallacies.length} Correct
            </span>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 rounded-xl p-3">
            <HelpCircle className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <span className="font-medium text-orange-700 dark:text-orange-400">
              {incorrectFallacies.length} To Practice
            </span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground">
        You're learning to think like a detective! Keep practicing to spot thinking mistakes!
      </p>

      <Button
        onClick={handleRestart}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Play Again!
      </Button>
    </motion.div>
  );

  return (
    <div className="min-h-[400px] flex flex-col justify-center p-4">
      <AnimatePresence mode="wait">
        {phase === "intro" && renderIntro()}
        {phase === "learn" && renderLearnPhase()}
        {phase === "spot" && renderSpotPhase()}
        {phase === "fix" && renderFixPhase()}
        {phase === "choose" && renderChoosePhase()}
        {phase === "results" && renderResults()}
      </AnimatePresence>
      
      {phase !== "intro" && phase !== "results" && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-foreground">{score}</span>
          <span className="text-sm text-muted-foreground">points</span>
        </div>
      )}
    </div>
  );
}
