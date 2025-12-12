import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

interface CollectibleStarProps {
  id: string;
  onCollect: (id: string) => void;
  collected?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "gold" | "silver" | "bronze";
  delay?: number;
}

export default function CollectibleStar({
  id,
  onCollect,
  collected = false,
  size = "md",
  color = "gold",
  delay = 0,
}: CollectibleStarProps) {
  const [isCollecting, setIsCollecting] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    gold: "text-yellow-400 fill-yellow-400",
    silver: "text-gray-300 fill-gray-300",
    bronze: "text-orange-600 fill-orange-600",
  };

  useEffect(() => {
    if (collected && !isCollecting && !isHidden) {
      setIsHidden(true);
    }
  }, [collected, isCollecting, isHidden]);

  const handleCollect = () => {
    if (collected || isCollecting) return;

    setIsCollecting(true);
    setShowParticles(true);

    setTimeout(() => {
      onCollect(id);
    }, 400);

    setTimeout(() => {
      setIsHidden(true);
    }, 600);
  };

  if (isHidden) return null;

  return (
    <div className="relative inline-flex items-center justify-center">
      <AnimatePresence>
        {showParticles && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5],
                  opacity: [1, 0],
                  x: Math.cos((i * Math.PI) / 4) * 40,
                  y: Math.sin((i * Math.PI) / 4) * 40,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleCollect}
        initial={{ scale: 0, rotate: -180 }}
        animate={
          isCollecting
            ? { scale: [1, 1.5, 0], rotate: 360, y: -50, opacity: [1, 1, 0] }
            : {
                scale: 1,
                rotate: 0,
                opacity: 1,
                y: [0, -5, 0],
              }
        }
        transition={
          isCollecting
            ? { duration: 0.5 }
            : {
                delay,
                y: {
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                },
              }
        }
        whileHover={isCollecting ? {} : { scale: 1.2 }}
        whileTap={isCollecting ? {} : { scale: 0.9 }}
        disabled={isCollecting}
        className="cursor-pointer focus:outline-none disabled:cursor-default"
        data-testid={`collectible-star-${id}`}
      >
        <Star className={`${sizeClasses[size]} ${colorClasses[color]} drop-shadow-lg`} />
      </motion.button>
    </div>
  );
}
