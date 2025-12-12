import { useState } from "react";
import { motion } from "framer-motion";

interface InteractiveObjectProps {
  id: string;
  icon: string;
  label?: string;
  onClick: (id: string) => void;
  isActive?: boolean;
  isCorrect?: boolean | null;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
}

export default function InteractiveObject({
  id,
  icon,
  label,
  onClick,
  isActive = false,
  isCorrect = null,
  disabled = false,
  size = "md",
  variant = "default",
}: InteractiveObjectProps) {
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: "w-16 h-16 text-2xl",
    md: "w-24 h-24 text-4xl",
    lg: "w-32 h-32 text-5xl",
  };

  const getBackgroundClass = () => {
    if (isCorrect === true) return "bg-green-400 border-green-500";
    if (isCorrect === false) return "bg-red-400 border-red-500";
    if (isActive) return "bg-primary/20 border-primary ring-4 ring-primary/30";
    
    switch (variant) {
      case "outlined":
        return "bg-transparent border-2 border-muted-foreground/30";
      case "filled":
        return "bg-gradient-to-br from-purple-400 to-pink-400 border-white/30";
      default:
        return "bg-card border-border";
    }
  };

  return (
    <motion.button
      onClick={() => !disabled && onClick(id)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.08, y: -4 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      animate={{
        scale: isActive ? 1.05 : 1,
        rotate: isCorrect === true ? [0, -5, 5, -5, 0] : isCorrect === false ? [0, -10, 10, -10, 10, 0] : 0,
        x: isCorrect === false ? [0, -5, 5, -5, 5, 0] : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      className={`
        ${sizeClasses[size]}
        rounded-2xl border-2 shadow-lg
        flex flex-col items-center justify-center gap-1
        transition-colors cursor-pointer
        ${getBackgroundClass()}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${isPressed ? "shadow-inner" : "shadow-lg"}
      `}
      data-testid={`interactive-object-${id}`}
    >
      <span className="drop-shadow">{icon}</span>
      {label && (
        <span className="text-xs font-medium text-foreground/80">{label}</span>
      )}
      
      {isCorrect === true && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2"
        >
          <span className="text-2xl">✓</span>
        </motion.div>
      )}
    </motion.button>
  );
}
