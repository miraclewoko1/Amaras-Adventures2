import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SproutMascotProps {
  message?: string;
  emotion?: "happy" | "thinking" | "celebrating" | "encouraging" | "curious";
  size?: "small" | "medium" | "large";
  onMessageComplete?: () => void;
  showBubble?: boolean;
  position?: "left" | "right" | "center";
}

const emotions = {
  happy: { eyeScaleY: 1, mouthCurve: 10 },
  thinking: { eyeScaleY: 0.6, mouthCurve: 2 },
  celebrating: { eyeScaleY: 0.3, mouthCurve: 14 },
  encouraging: { eyeScaleY: 1, mouthCurve: 8 },
  curious: { eyeScaleY: 1.1, mouthCurve: 4 },
};

const SPROUT_GREEN = "#7AC943";

const sizes = {
  small: { container: 60, fontSize: 12 },
  medium: { container: 100, fontSize: 16 },
  large: { container: 140, fontSize: 20 },
};

export default function SproutMascot({
  message,
  emotion = "happy",
  size = "medium",
  onMessageComplete,
  showBubble = true,
  position = "right",
}: SproutMascotProps) {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWobbling, setIsWobbling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const emotionData = emotions[emotion];
  const sizeData = sizes[size];

  useEffect(() => {
    if (!message) {
      setDisplayedMessage("");
      return;
    }

    setIsTyping(true);
    setDisplayedMessage("");
    let index = 0;

    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedMessage(message.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        onMessageComplete?.();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [message, onMessageComplete]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    const wobbleInterval = setInterval(() => {
      setIsWobbling(true);
      setTimeout(() => setIsWobbling(false), 600);
    }, 4000 + Math.random() * 3000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(wobbleInterval);
    };
  }, []);

  const positionStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`flex items-end gap-3 ${positionStyles[position]}`}>
      {position === "right" && showBubble && message && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-white rounded-2xl px-4 py-3 shadow-lg max-w-xs"
            style={{ fontSize: sizeData.fontSize }}
          >
            <p className="text-gray-800 leading-relaxed">{displayedMessage}</p>
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
            )}
            <div
              className="absolute -right-2 bottom-3 w-4 h-4 bg-white transform rotate-45"
              style={{ boxShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      <motion.div
        ref={containerRef}
        animate={isWobbling ? { rotate: [0, -3, 3, -2, 2, 0] } : { scale: [1, 1.02, 1] }}
        transition={isWobbling ? { duration: 0.6 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex-shrink-0 cursor-pointer"
        style={{ width: sizeData.container, height: sizeData.container }}
        onClick={() => setIsWobbling(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
        >
          <motion.g
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50px 45px" }}
          >
            <ellipse 
              cx="32" 
              cy="22" 
              rx="14" 
              ry="26" 
              fill={SPROUT_GREEN} 
              transform="rotate(-30 32 22)"
            />
            <ellipse 
              cx="68" 
              cy="22" 
              rx="14" 
              ry="26" 
              fill={SPROUT_GREEN} 
              transform="rotate(30 68 22)"
            />
          </motion.g>
          
          <ellipse
            cx="50"
            cy="72"
            rx="42"
            ry="44"
            fill={SPROUT_GREEN}
          />
          
          <motion.g
            animate={isBlinking ? { scaleY: 0.1 } : { scaleY: emotionData.eyeScaleY }}
            transition={{ duration: 0.1 }}
            style={{ transformOrigin: "50px 65px" }}
          >
            <ellipse 
              cx="35" 
              cy="65" 
              rx="8" 
              ry="11" 
              fill="#1a1a1a" 
            />
            <ellipse 
              cx="65" 
              cy="65" 
              rx="8" 
              ry="11" 
              fill="#1a1a1a" 
            />
          </motion.g>
          
          <motion.path
            d={`M 32 88 Q 50 ${88 + emotionData.mouthCurve} 68 88`}
            stroke="#1a1a1a"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            animate={emotion === "celebrating" ? { d: [`M 32 85 Q 50 ${85 + emotionData.mouthCurve + 4} 68 85`, `M 32 88 Q 50 ${88 + emotionData.mouthCurve} 68 88`] } : {}}
            transition={{ duration: 0.3, repeat: emotion === "celebrating" ? Infinity : 0, repeatType: "reverse" }}
          />
          
          {emotion === "celebrating" && (
            <>
              <motion.circle cx="15" cy="45" r="5" fill="#fbbf24"
                animate={{ y: [0, -35], opacity: [1, 0], scale: [1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }} />
              <motion.circle cx="85" cy="50" r="5" fill="#f472b6"
                animate={{ y: [0, -40], opacity: [1, 0], scale: [1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.3 }} />
              <motion.circle cx="50" cy="20" r="5" fill="#60a5fa"
                animate={{ y: [0, -30], opacity: [1, 0], scale: [1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />
              <motion.circle cx="25" cy="30" r="4" fill="#4ade80"
                animate={{ y: [0, -25], opacity: [1, 0], scale: [1, 0.5] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }} />
              <motion.circle cx="75" cy="35" r="4" fill="#a78bfa"
                animate={{ y: [0, -30], opacity: [1, 0], scale: [1, 0.5] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: 0.5 }} />
            </>
          )}
        </svg>
      </motion.div>

      {position === "left" && showBubble && message && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-white rounded-2xl px-4 py-3 shadow-lg max-w-xs"
            style={{ fontSize: sizeData.fontSize }}
          >
            <div
              className="absolute -left-2 bottom-3 w-4 h-4 bg-white transform rotate-45"
              style={{ boxShadow: "-2px 2px 4px rgba(0,0,0,0.1)" }}
            />
            <p className="text-gray-800 leading-relaxed">{displayedMessage}</p>
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
