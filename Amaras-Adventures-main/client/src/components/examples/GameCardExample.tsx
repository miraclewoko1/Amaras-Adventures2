import GameCard from "../GameCard";
import { Calculator, Shapes, Hash } from "lucide-react";

export default function GameCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <GameCard
        title="Counting Fun"
        description="Count colorful objects"
        icon={<Hash className="w-full h-full" />}
        difficulty={1}
        color="purple"
        onPlay={() => console.log("Play Counting Fun")}
      />
      <GameCard
        title="Add It Up"
        description="Simple addition games"
        icon={<Calculator className="w-full h-full" />}
        difficulty={2}
        color="teal"
        onPlay={() => console.log("Play Add It Up")}
        completed
      />
      <GameCard
        title="Pattern Match"
        description="Find the next shape"
        icon={<Shapes className="w-full h-full" />}
        difficulty={3}
        color="yellow"
        onPlay={() => console.log("Play Pattern Match")}
      />
    </div>
  );
}
