import QuestionDisplay from "../QuestionDisplay";
import { Apple } from "lucide-react";

export default function QuestionDisplayExample() {
  return (
    <div className="p-8 space-y-12">
      <QuestionDisplay
        question="How many apples are there?"
        visualElements={
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center"
              >
                <Apple className="w-10 h-10 text-red-500" />
              </div>
            ))}
          </>
        }
      />
      <QuestionDisplay question="What is 2 + 3?" />
    </div>
  );
}
