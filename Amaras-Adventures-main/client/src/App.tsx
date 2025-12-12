import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/LanguageContext";
import Home from "@/pages/Home";
import MathWorld from "@/pages/MathWorld";
import HistoryWorld from "@/pages/HistoryWorld";
import MathLevel from "@/pages/MathLevel";
import HistoryLevel from "@/pages/HistoryLevel";
import AdventureLevel from "@/pages/AdventureLevel";
import BonusQuest from "@/pages/BonusQuest";
import NotFound from "@/pages/not-found";

function Router({ darkMode, onToggleDarkMode }: { darkMode: boolean; onToggleDarkMode: () => void }) {
  return (
    <Switch>
      <Route path="/" component={() => <Home darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />} />
      <Route path="/math" component={MathWorld} />
      <Route path="/history" component={HistoryWorld} />
      <Route path="/math/level/:level" component={MathLevel} />
      <Route path="/history/level/:level" component={HistoryLevel} />
      <Route path="/adventure/level/:level" component={AdventureLevel} />
      <Route path="/bonus-quest" component={BonusQuest} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background">
      <Router darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AppContent />
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
