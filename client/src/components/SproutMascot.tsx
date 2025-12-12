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
  happy: { eyeScale: 1, mouthCurve: 8 },
  thinking: { eyeScale: 0.8, mouthCurve: 0 },
  celebrating: { eyeScale: 1.2, mouthCurve: 12 },
  encouraging: { eyeScale: 1, mouthCurve: 6 },
  curious: { eyeScale: 0.9, mouthCurve: 3 },
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
          <motion.g
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "50%", originY: "100%" }}
          >
            <ellipse 
              cx="35" 
              cy="18" 
              rx="12" 
              ry="22" 
              fill={SPROUT_GREEN} 
              transform="rotate(-25 35 18)"
            />
            <ellipse 
              cx="65" 
              cy="18" 
              rx="12" 
              ry="22" 
              fill={SPROUT_GREEN} 
              transform="rotate(25 65 18)"
            />
          </motion.g>
          
          <ellipse
            cx="50"
            cy="75"
            rx="40"
            ry="42"
            fill={SPROUT_GREEN}
          />
          
          <motion.g
            animate={emotion === "celebrating" ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3, repeat: emotion === "celebrating" ? Infinity : 0 }}
          >
            <ellipse 
              cx="35" 
              cy="68" 
              rx={7 * emotionData.eyeScale} 
              ry={10 * emotionData.eyeScale} 
              fill="#1a1a1a" 
            />
            <ellipse 
              cx="65" 
              cy="68" 
              rx={7 * emotionData.eyeScale} 
              ry={10 * emotionData.eyeScale} 
              fill="#1a1a1a" 
            />
          </motion.g>
          
          <path
            d={`M 35 88 Q 50 ${88 + emotionData.mouthCurve} 65 88`}
            stroke="#1a1a1a"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          
          {emotion === "celebrating" && (
            <>
              <motion.circle
                cx="20"
                cy="50"
                r="4"
                fill="#fbbf24"
                animate={{ y: [0, -30], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.circle
                cx="80"
                cy="55"
                r="4"
                fill="#f472b6"
                animate={{ y: [0, -35], opacity: [1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.circle
                cx="50"
                cy="25"
                r="4"
                fill="#60a5fa"
                animate={{ y: [0, -25], opacity: [1, 0] }}
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
