import { useState, useEffect } from "react";
import princessAmaraFamilyImg from "@assets/B34C84B7-B5B0-4A03-8C87-8AD01AEE3A80_1764967432293.webp";
import princessAmaraSoloImg from "@assets/generated_images/princess_amara_matching_reference.png";

interface PrincessAmaraProps {
  message?: string;
  showSpeechBubble?: boolean;
  size?: "small" | "medium" | "large" | "hero";
  animate?: boolean;
  showFamily?: boolean;
  customAvatarUrl?: string;
  customAvatarAlt?: string;
}

export default function PrincessAmara({
  message = "Hi there! I'm Princess Amara. Ready to learn together?",
  showSpeechBubble = true,
  size = "medium",
  animate = true,
  showFamily = false,
  customAvatarUrl,
  customAvatarAlt,
}: PrincessAmaraProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer1 = setTimeout(() => setIsVisible(true), 100);
      const timer2 = setTimeout(() => setBubbleVisible(true), 400);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setIsVisible(true);
      setBubbleVisible(true);
    }
  }, [animate]);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-40 h-40",
    hero: "w-full max-w-md h-auto",
  };

  if (showFamily || size === "hero") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div
          className={`relative transition-all duration-300 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <img
            src={princessAmaraFamilyImg}
            alt="Princess Amara with her family and friends - Hodu the dog, PpiPpi the rabbit, and Mochi the panda"
            className={`${sizeClasses[size]} object-contain drop-shadow-lg`}
            data-testid="img-princess-amara-family"
          />
        </div>

        {showSpeechBubble && message && (
          <div
            className={`relative max-w-sm transition-all duration-200 ease-out ${
              bubbleVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <div className="bg-white dark:bg-card rounded-3xl px-6 py-4 shadow-md border border-purple-100 dark:border-purple-800/50">
              <p
                className="text-lg md:text-xl text-foreground leading-relaxed text-center"
                data-testid="text-amara-message"
              >
                {message}
              </p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-white dark:bg-card border-t border-l border-purple-100 dark:border-purple-800/50 transform rotate-45" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-4">
      <div
        className={`relative transition-all duration-300 ease-out ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`}
      >
        <div
          className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 shadow-lg border-4 border-white dark:border-purple-800`}
        >
          <img
            src={customAvatarUrl || princessAmaraSoloImg}
            alt={customAvatarAlt || "Princess Amara"}
            className="w-full h-full object-cover"
            data-testid="img-princess-amara"
          />
        </div>
      </div>

      {showSpeechBubble && message && (
        <div
          className={`relative max-w-xs transition-all duration-200 ease-out ${
            bubbleVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="bg-white dark:bg-card rounded-3xl px-5 py-4 shadow-md border border-purple-100 dark:border-purple-800/50">
            <p
              className="text-lg text-foreground leading-relaxed"
              data-testid="text-amara-message"
            >
              {message}
            </p>
          </div>
          <div className="absolute -left-2 bottom-4 w-4 h-4 bg-white dark:bg-card border-l border-b border-purple-100 dark:border-purple-800/50 transform rotate-45" />
        </div>
      )}
    </div>
  );
}
