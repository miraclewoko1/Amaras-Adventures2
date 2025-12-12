import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, HelpCircle } from "lucide-react";
import type { ReflectionData } from "@/lib/gameProgress";
import { loadDiagnostics, getReflectionPrompts } from "@/lib/adaptiveDiagnostics";

interface TariqReflectionOverlayProps {
  onComplete: (reflectionData: ReflectionData) => void;
}

interface GroupReflection {
  color: string;
  emoji: string;
}

const FEELING_COLORS = [
  { id: "happy", color: "#FFD700", label: "Happy (Gold)" },
  { id: "brave", color: "#FF6347", label: "Brave (Red)" },
  { id: "scared", color: "#9370DB", label: "Scared (Purple)" },
  { id: "curious", color: "#32CD32", label: "Curious (Green)" },
  { id: "proud", color: "#4169E1", label: "Proud (Blue)" },
  { id: "worried", color: "#808080", label: "Worried (Gray)" },
];

const FEELING_EMOJIS = [
  { id: "smile", emoji: "😊", label: "Happy" },
  { id: "brave", emoji: "💪", label: "Strong" },
  { id: "think", emoji: "🤔", label: "Thinking" },
  { id: "wow", emoji: "😮", label: "Surprised" },
  { id: "peace", emoji: "✌️", label: "Peace" },
  { id: "heart", emoji: "❤️", label: "Love" },
];

const GROUPS = [
  { id: "berbers", name: "Berbers", description: "The brave explorers from North Africa" },
  { id: "visigoths", name: "Visigoths", description: "The people already living in Spain" },
  { id: "allies", name: "Allies", description: "Friends who helped on the journey" },
];

export default function TariqReflectionOverlay({ onComplete }: TariqReflectionOverlayProps) {
  const diagnostics = useMemo(() => loadDiagnostics("student_1", "tariq_711_module"), []);
  const scaffoldPrompts = useMemo(() => getReflectionPrompts(diagnostics), [diagnostics]);
  
  const [reflections, setReflections] = useState<Record<string, GroupReflection>>({
    berbers: { color: FEELING_COLORS[0].color, emoji: FEELING_EMOJIS[0].emoji },
    visigoths: { color: FEELING_COLORS[2].color, emoji: FEELING_EMOJIS[3].emoji },
    allies: { color: FEELING_COLORS[3].color, emoji: FEELING_EMOJIS[4].emoji },
  });
  const [explanation, setExplanation] = useState("");
  const [showPrompts, setShowPrompts] = useState(false);

  const updateReflection = (groupId: string, field: "color" | "emoji", value: string) => {
    setReflections((prev) => ({
      ...prev,
      [groupId]: { ...prev[groupId], [field]: value },
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-3xl p-6 shadow-lg"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          How Did They Feel?
        </h2>
        <p className="text-muted-foreground">
          Choose a color and emoji for how each group might have felt during Tariq's journey.
        </p>
      </div>

      <div className="space-y-6">
        {GROUPS.map((group) => (
          <div
            key={group.id}
            className="p-4 rounded-2xl border border-border"
            style={{ borderLeftColor: reflections[group.id]?.color, borderLeftWidth: 4 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{reflections[group.id]?.emoji}</span>
              <div>
                <h3 className="font-bold text-foreground">{group.name}</h3>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Pick a feeling color:</p>
                <div className="flex flex-wrap gap-2">
                  {FEELING_COLORS.map((fc) => (
                    <button
                      key={fc.id}
                      onClick={() => updateReflection(group.id, "color", fc.color)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        reflections[group.id]?.color === fc.color
                          ? "scale-125 border-foreground"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: fc.color }}
                      title={fc.label}
                      data-testid={`button-${group.id}-color-${fc.id}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Pick a feeling emoji:</p>
                <div className="flex flex-wrap gap-2">
                  {FEELING_EMOJIS.map((fe) => (
                    <button
                      key={fe.id}
                      onClick={() => updateReflection(group.id, "emoji", fe.emoji)}
                      className={`text-2xl p-1 rounded-lg transition-all ${
                        reflections[group.id]?.emoji === fe.emoji
                          ? "bg-primary/20 scale-110"
                          : "bg-muted"
                      }`}
                      title={fe.label}
                      data-testid={`button-${group.id}-emoji-${fe.id}`}
                    >
                      {fe.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-medium text-muted-foreground">
            Why did you pick these feelings? (optional)
          </p>
          {scaffoldPrompts.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowPrompts(!showPrompts)}
              data-testid="button-show-prompts"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              {showPrompts ? "Hide Ideas" : "Need Ideas?"}
            </Button>
          )}
        </div>
        
        {showPrompts && scaffoldPrompts.length > 0 && (
          <div className="mb-3 p-3 bg-muted rounded-xl">
            <p className="text-sm font-medium text-foreground mb-2">Think about these questions:</p>
            <ul className="space-y-1">
              {scaffoldPrompts.map((prompt) => (
                <li key={prompt.id} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{prompt.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Tell us what you think each group felt during the journey..."
          className="mb-4"
          data-testid="textarea-explanation"
        />
      </div>

      <div className="flex justify-center mt-6">
        <Button
          size="lg"
          onClick={() => {
            const emojisSelected = Object.values(reflections).map(r => r.emoji);
            const colorsSelected: ReflectionData["colors_selected"] = [];
            
            Object.values(reflections).forEach(r => {
              if (["#FFD700", "#FF6347", "#32CD32"].includes(r.color)) {
                if (!colorsSelected.includes("warm")) colorsSelected.push("warm");
              }
              if (["#9370DB", "#4169E1", "#808080"].includes(r.color)) {
                if (!colorsSelected.includes("cool")) colorsSelected.push("cool");
              }
              if (["#FFD700", "#FF6347", "#32CD32"].includes(r.color)) {
                if (!colorsSelected.includes("bright")) colorsSelected.push("bright");
              }
            });
            
            const reflectionData: ReflectionData = {
              emojis_selected: emojisSelected,
              colors_selected: colorsSelected,
              student_explanation: explanation,
            };
            
            onComplete(reflectionData);
          }}
          className="rounded-full px-8"
          data-testid="button-finish-reflection"
        >
          <Check className="w-5 h-5 mr-2" />
          Complete Level!
        </Button>
      </div>
    </motion.div>
  );
}
