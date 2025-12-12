import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sproutImage from "@assets/sprout_avatar.png";

interface SproutMascotProps {
  message?: string;
  emotion?: "happy" | "thinking" | "celebrating" | "encouraging" | "curious";
  size?: "small" | "medium" | "large";
  onMessageComplete?: () => void;
  showBubble?: boolean;
  position?: "left" | "right" | "center";
}

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
  const [isWobbling, setIsWobbling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    const wobbleInterval = setInterval(() => {
      setIsWobbling(true);
      setTimeout(() => setIsWobbling(false), 600);
    }, 4000 + Math.random() * 3000);

    return () => {
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
        animate={isWobbling ? { rotate: [0, -5, 5, -3, 3, 0] } : { scale: [1, 1.03, 1] }}
        transition={isWobbling ? { duration: 0.6 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex-shrink-0 cursor-pointer"
        style={{ width: sizeData.container, height: sizeData.container }}
        onClick={() => setIsWobbling(true)}
        whileHover={{ scale: 1.08, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.img
          src={sproutImage}
          alt="Sprout Guide"
          className="w-full h-full object-contain"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {emotion === "celebrating" && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute top-0 left-1 w-3 h-3 rounded-full bg-yellow-400"
              animate={{ y: [0, -40], opacity: [1, 0], scale: [1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }} />
            <motion.div className="absolute top-2 right-1 w-3 h-3 rounded-full bg-pink-400"
              animate={{ y: [0, -45], opacity: [1, 0], scale: [1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.3 }} />
            <motion.div className="absolute top-1 left-1/2 w-3 h-3 rounded-full bg-blue-400"
              animate={{ y: [0, -35], opacity: [1, 0], scale: [1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />
            <motion.div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-green-400"
              animate={{ y: [0, -30], opacity: [1, 0], scale: [1, 0.3] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }} />
            <motion.div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-purple-400"
              animate={{ y: [0, -35], opacity: [1, 0], scale: [1, 0.3] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: 0.5 }} />
          </div>
        )}
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
