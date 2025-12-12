import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, Heart, Gem } from "lucide-react";

interface RewardBurstProps {
  show: boolean;
  type?: "stars" | "sparkles" | "hearts" | "gems";
  count?: number;
  onComplete?: () => void;
}

export default function RewardBurst({
  show,
  type = "stars",
  count = 12,
  onComplete,
}: RewardBurstProps) {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; distance: number; delay: number }>>([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (i * 360) / count + Math.random() * 30,
        distance: 80 + Math.random() * 60,
        delay: Math.random() * 0.2,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        onComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [show, count, onComplete]);

  const getIcon = () => {
    switch (type) {
      case "sparkles":
        return <Sparkles className="w-6 h-6 text-yellow-400" />;
      case "hearts":
        return <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />;
      case "gems":
        return <Gem className="w-6 h-6 text-purple-400" />;
      default:
        return <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                scale: 0,
                opacity: 1,
                x: 0,
                y: 0,
              }}
              animate={{
                scale: [0, 1.5, 1, 0.5],
                opacity: [1, 1, 1, 0],
                x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                rotate: [0, 360],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 1,
                delay: particle.delay,
                ease: "easeOut",
              }}
              className="absolute"
            >
              {getIcon()}
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute"
          >
            <div className="w-24 h-24 rounded-full bg-yellow-400/20 flex items-center justify-center">
              <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
