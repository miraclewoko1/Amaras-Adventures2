import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
}

interface ConfettiEffectProps {
  show: boolean;
  onComplete?: () => void;
}

export default function ConfettiEffect({ show, onComplete }: ConfettiEffectProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (show) {
      const colors = [
        "bg-purple-500",
        "bg-yellow-400",
        "bg-teal-400",
        "bg-pink-500",
        "bg-blue-400",
        "bg-emerald-400",
      ];

      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1,
      }));

      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute w-3 h-3 rounded-sm ${piece.color}`}
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            animation: `confetti-fall ${piece.duration}s ease-out ${piece.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
