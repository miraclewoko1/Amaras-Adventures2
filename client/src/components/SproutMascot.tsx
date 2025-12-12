import { useState, useEffect } from "react";
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
  happy: { eyes: "^_^", color: "#4ade80" },
  thinking: { eyes: "o.o", color: "#fbbf24" },
  celebrating: { eyes: "★_★", color: "#f472b6" },
  encouraging: { eyes: "◕‿◕", color: "#60a5fa" },
  curious: { eyes: "?.?", color: "#a78bfa" },
};

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
  const [bounce, setBounce] = useState(false);

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
    const bounceInterval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 500);
    }, 3000);

    return () => clearInterval(bounceInterval);
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
        animate={bounce ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="relative flex-shrink-0"
        style={{ width: sizeData.container, height: sizeData.container }}
      >
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
        >
          <ellipse cx="50" cy="110" rx="25" ry="8" fill="#8B4513" opacity="0.3" />
          
          <ellipse
            cx="50"
            cy="75"
            rx="35"
            ry="40"
            fill={emotionData.color}
            className="transition-colors duration-300"
          />
          <ellipse
            cx="50"
            cy="75"
            rx="28"
            ry="32"
            fill={emotionData.color}
            opacity="0.6"
          />
          
          <motion.g
            animate={emotion === "celebrating" ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.5, repeat: emotion === "celebrating" ? Infinity : 0 }}
            style={{ originX: "50%", originY: "50%" }}
          >
            <ellipse cx="35" cy="70" rx="8" ry="10" fill="white" />
            <circle cx="35" cy="70" r="4" fill="#333" />
            <ellipse cx="65" cy="70" rx="8" ry="10" fill="white" />
            <circle cx="65" cy="70" r="4" fill="#333" />
          </motion.g>
          
          {emotion === "happy" && (
            <path
              d="M 35 85 Q 50 95 65 85"
              stroke="#333"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          )}
          {emotion === "thinking" && (
            <circle cx="50" cy="88" r="5" fill="#333" />
          )}
          {emotion === "celebrating" && (
            <path
              d="M 30 82 Q 50 100 70 82"
              stroke="#333"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          )}
          {emotion === "encouraging" && (
            <path
              d="M 38 85 Q 50 92 62 85"
              stroke="#333"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          )}
          {emotion === "curious" && (
            <ellipse cx="50" cy="88" rx="6" ry="4" fill="#333" />
          )}
          
          <ellipse cx="28" cy="72" rx="6" ry="4" fill="#ff9999" opacity="0.5" />
          <ellipse cx="72" cy="72" rx="6" ry="4" fill="#ff9999" opacity="0.5" />
          
          <motion.g
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "50%", originY: "100%" }}
          >
            <path
              d="M 50 35 Q 45 20 50 5"
              stroke="#228B22"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="42" cy="15" rx="8" ry="5" fill="#228B22" transform="rotate(-30 42 15)" />
            <ellipse cx="58" cy="18" rx="8" ry="5" fill="#228B22" transform="rotate(30 58 18)" />
            <ellipse cx="50" cy="8" rx="6" ry="4" fill="#32CD32" />
          </motion.g>
          
          <motion.path
            d="M 18 65 Q 8 75 18 85"
            stroke={emotionData.color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            animate={emotion === "celebrating" ? { d: ["M 18 65 Q 8 75 18 85", "M 12 60 Q 2 70 8 80"] } : {}}
            transition={{ duration: 0.5, repeat: emotion === "celebrating" ? Infinity : 0, repeatType: "reverse" }}
          />
          <motion.path
            d="M 82 65 Q 92 75 82 85"
            stroke={emotionData.color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            animate={emotion === "celebrating" ? { d: ["M 82 65 Q 92 75 82 85", "M 88 60 Q 98 70 92 80"] } : {}}
            transition={{ duration: 0.5, repeat: emotion === "celebrating" ? Infinity : 0, repeatType: "reverse" }}
          />
          
          {emotion === "celebrating" && (
            <>
              <motion.circle
                cx="20"
                cy="40"
                r="3"
                fill="#fbbf24"
                animate={{ y: [0, -20], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.circle
                cx="80"
                cy="45"
                r="3"
                fill="#f472b6"
                animate={{ y: [0, -25], opacity: [1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.circle
                cx="50"
                cy="35"
                r="3"
                fill="#60a5fa"
                animate={{ y: [0, -30], opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }}
              />
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
