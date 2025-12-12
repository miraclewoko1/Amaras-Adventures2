import { useState } from "react";
import ConfettiEffect from "../ConfettiEffect";
import { Button } from "@/components/ui/button";

export default function ConfettiEffectExample() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div className="p-8 text-center">
      <Button onClick={() => setShowConfetti(true)} size="lg">
        Celebrate!
      </Button>
      <ConfettiEffect show={showConfetti} onComplete={() => setShowConfetti(false)} />
    </div>
  );
}
