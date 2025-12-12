interface QuestionDisplayProps {
  question: string;
  visualElements?: React.ReactNode;
}

export default function QuestionDisplay({
  question,
  visualElements,
}: QuestionDisplayProps) {
  return (
    <div className="text-center space-y-6">
      <h2
        className="text-3xl md:text-4xl font-bold text-foreground"
        data-testid="text-question"
      >
        {question}
      </h2>
      {visualElements && (
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {visualElements}
        </div>
      )}
    </div>
  );
}
