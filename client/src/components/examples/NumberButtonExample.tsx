import { useState } from "react";
import NumberButton from "../NumberButton";

export default function NumberButtonExample() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="p-8 flex flex-wrap gap-4 justify-center">
      {[1, 2, 3, 4, 5].map((num) => (
        <NumberButton
          key={num}
          number={num}
          onClick={(n) => setSelected(n)}
          selected={selected === num}
        />
      ))}
      <NumberButton number={6} onClick={() => {}} correct={true} />
      <NumberButton number={7} onClick={() => {}} correct={false} />
    </div>
  );
}
