import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HistoricalFigureCard from "@/components/HistoricalFigureCard";
import PrincessAmara from "@/components/PrincessAmara";
import { ArrowLeft } from "lucide-react";

import kingSejongImg from "@assets/generated_images/king_sejong_historical_figure.png";
import nativeAmericanScientistImg from "@assets/generated_images/native_american_scientist_figure.png";
import moorishInnovatorImg from "@assets/generated_images/moorish_innovator_historical_figure.png";
import africanInventorImg from "@assets/generated_images/african_inventor_historical_figure.png";
import maeJemisonImg from "@assets/generated_images/mae_jemison_astronaut_figure.png";

// todo: remove mock functionality - historical figures data
const historicalFigures = [
  {
    id: 1,
    name: "King Sejong",
    title: "The Great King of Korea",
    image: kingSejongImg,
    category: "leaders",
    accentColor: "blue" as const,
    facts: [
      "King Sejong invented the Korean alphabet called Hangul so everyone could read and write!",
      "He loved science and invented many tools to help farmers know when to plant crops.",
      "He created the first rain gauge to measure rainfall over 600 years ago!",
    ],
  },
  {
    id: 2,
    name: "Wilma Mankiller",
    title: "Native American Leader & Activist",
    image: nativeAmericanScientistImg,
    category: "scientists",
    accentColor: "emerald" as const,
    facts: [
      "She was the first woman to be Principal Chief of the Cherokee Nation!",
      "She helped build new homes and health clinics for her community.",
      "She showed everyone that women can be powerful leaders too!",
    ],
  },
  {
    id: 3,
    name: "Abbas ibn Firnas",
    title: "Moorish Inventor & Scientist",
    image: moorishInnovatorImg,
    category: "inventors",
    accentColor: "amber" as const,
    facts: [
      "He tried to fly with wings he made himself over 1,000 years ago!",
      "He invented a special clock that showed the time using water.",
      "He created colorful glass and even made a planetarium to show the stars!",
    ],
  },
  {
    id: 4,
    name: "Imhotep",
    title: "Ancient Egyptian Architect & Doctor",
    image: africanInventorImg,
    category: "inventors",
    accentColor: "rose" as const,
    facts: [
      "He designed the first pyramid in Egypt - the Step Pyramid!",
      "He was one of the first doctors and helped heal many people.",
      "People thought he was so smart, they honored him for thousands of years!",
    ],
  },
  {
    id: 5,
    name: "Mae C. Jemison",
    title: "First African American Woman in Space",
    image: maeJemisonImg,
    category: "scientists",
    accentColor: "purple" as const,
    facts: [
      "She flew into space on the Space Shuttle Endeavour in 1992!",
      "Before becoming an astronaut, she was a doctor and helped people in Africa.",
      "She loves both science and art - she's also a trained dancer!",
    ],
  },
];

export default function Heroes() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("all");

  const filteredFigures =
    activeTab === "all"
      ? historicalFigures
      : historicalFigures.filter((f) => f.category === activeTab);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Amazing Heroes</h1>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <PrincessAmara
              message="Let me introduce you to some amazing people from history!"
              size="medium"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 mb-8">
              <TabsTrigger value="all" data-testid="tab-all">
                All
              </TabsTrigger>
              <TabsTrigger value="scientists" data-testid="tab-scientists">
                Scientists
              </TabsTrigger>
              <TabsTrigger value="inventors" data-testid="tab-inventors">
                Inventors
              </TabsTrigger>
              <TabsTrigger value="leaders" data-testid="tab-leaders">
                Leaders
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFigures.map((figure) => (
                  <HistoricalFigureCard
                    key={figure.id}
                    name={figure.name}
                    title={figure.title}
                    image={figure.image}
                    facts={figure.facts}
                    accentColor={figure.accentColor}
                  />
                ))}
              </div>

              {filteredFigures.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">
                    No heroes found in this category yet!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
