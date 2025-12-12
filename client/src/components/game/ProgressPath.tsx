import { motion } from "framer-motion";
import { Star, Lock, CheckCircle } from "lucide-react";

interface LevelNode {
  id: number;
  title: string;
  completed: boolean;
  stars: number;
  unlocked: boolean;
}

interface ProgressPathProps {
  levels: LevelNode[];
  currentLevel: number;
  onSelectLevel: (level: number) => void;
}

export default function ProgressPath({ levels, currentLevel, onSelectLevel }: ProgressPathProps) {
  return (
    <div className="relative py-8">
      <div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 bg-gradient-to-b from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-full" />
      
      <div className="relative flex flex-col gap-8">
        {levels.map((level, index) => {
          const isEven = index % 2 === 0;
          const isCurrent = level.id === currentLevel;
          
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 ${isEven ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`flex-1 ${isEven ? "text-right" : "text-left"}`}>
                <h4 className="font-bold text-foreground">{level.title}</h4>
                <div className="flex gap-0.5 mt-1" style={{ justifyContent: isEven ? "flex-end" : "flex-start" }}>
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        level.stars >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <motion.button
                onClick={() => level.unlocked && onSelectLevel(level.id)}
                disabled={!level.unlocked}
                whileHover={level.unlocked ? { scale: 1.1 } : {}}
                whileTap={level.unlocked ? { scale: 0.95 } : {}}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                className={`
                  relative w-16 h-16 rounded-full flex items-center justify-center z-10
                  border-4 shadow-lg transition-colors
                  ${level.completed
                    ? "bg-green-400 border-green-500 text-white"
                    : level.unlocked
                    ? isCurrent
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-card border-border text-foreground"
                    : "bg-muted border-muted-foreground/30 text-muted-foreground"
                  }
                  ${level.unlocked ? "cursor-pointer" : "cursor-not-allowed"}
                `}
                data-testid={`level-node-${level.id}`}
              >
                {level.completed ? (
                  <CheckCircle className="w-8 h-8" />
                ) : level.unlocked ? (
                  <span className="text-2xl font-bold">{level.id}</span>
                ) : (
                  <Lock className="w-6 h-6" />
                )}
                
                {isCurrent && level.unlocked && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full border-4 border-primary"
                  />
                )}
              </motion.button>
              
              <div className="flex-1" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
