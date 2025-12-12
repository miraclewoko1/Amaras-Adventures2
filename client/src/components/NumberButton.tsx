import { Button } from "@/components/ui/button";

interface NumberButtonProps {
  number: number;
  onClick: (num: number) => void;
  selected?: boolean;
  correct?: boolean | null;
  disabled?: boolean;
}

export default function NumberButton({
  number,
  onClick,
  selected = false,
  correct = null,
  disabled = false,
}: NumberButtonProps) {
  const getStateClasses = () => {
    if (correct === true) {
      return "bg-emerald-500 dark:bg-emerald-600 text-white border-emerald-600 dark:border-emerald-700 scale-105";
    }
    if (correct === false) {
      return "bg-rose-500 dark:bg-rose-600 text-white border-rose-600 dark:border-rose-700 animate-shake";
    }
    if (selected) {
      return "bg-primary text-primary-foreground border-primary scale-105";
    }
    return "bg-card hover:bg-muted border-border";
  };

  return (
    <Button
      variant="outline"
      onClick={() => onClick(number)}
      disabled={disabled}
      className={`w-20 h-20 text-3xl font-bold rounded-2xl border-4 transition-all duration-200 ${getStateClasses()}`}
      data-testid={`button-number-${number}`}
    >
      {number}
    </Button>
  );
}
