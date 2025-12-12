import { Button } from "@/components/ui/button";
import { Settings, Moon, Sun } from "lucide-react";
import ProgressStars from "./ProgressStars";
import princessAmaraSoloImg from "@assets/generated_images/princess_amara_matching_reference.png";

interface HeaderProps {
  stars: number;
  totalStars: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({
  stars,
  totalStars,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shadow-sm bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
            <img
              src={princessAmaraSoloImg}
              alt="Princess Amara"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">
            Amara's Learning
          </span>
        </div>

        <div className="flex-1 flex justify-center">
          <ProgressStars current={stars} total={totalStars} size="small" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            data-testid="button-toggle-theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" data-testid="button-settings">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
