import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

import tariqImg from "@assets/generated_images/tariq_ibn_ziyad_cartoon.png";
import abdAlRahmanImg from "@assets/generated_images/abd_al-rahman_i_cartoon.png";
import averroesImg from "@assets/generated_images/averroes_philosopher_cartoon.png";
import paulJohnImg from "@assets/generated_images/paul_joseph_john_yupik_elder.png";
import maryRossImg from "@assets/generated_images/mary_golda_ross_engineer_cartoon.png";
import williamKamkwambaImg from "@assets/generated_images/william_kamkwamba_windmill_boy.png";
import maryKennerImg from "@assets/generated_images/mary_kenner_full_body_inventor.png";
import kingSejongImg from "@assets/generated_images/king_sejong_korean_king.png";
import ameliaEarhartImg from "@assets/generated_images/amelia_earhart_pilot_cartoon.png";
import hiddenFiguresImg from "@assets/generated_images/hidden_figures_nasa_trio.png";

interface HistoricalFigureGuideProps {
  name: string;
  title: string;
  message: string;
  era: "moors" | "innovators" | "pioneers";
  onContinue?: () => void;
}

const figureImages: Record<string, string> = {
  // English names
  "Tariq ibn Ziyad": tariqImg,
  "Abd al-Rahman I": abdAlRahmanImg,
  "Averroes": averroesImg,
  "Paul Joseph John": paulJohnImg,
  "Mary Golda Ross": maryRossImg,
  "William Kamkwamba": williamKamkwambaImg,
  "Mary Beatrice Davidson Kenner": maryKennerImg,
  "King Sejong": kingSejongImg,
  "Amelia Earhart": ameliaEarhartImg,
  "Obvious Figures": hiddenFiguresImg,
  // Korean names
  "타리크 이븐 지야드": tariqImg,
  "압드 알 라흐만 1세": abdAlRahmanImg,
  "아베로에스": averroesImg,
  "폴 조셉 존": paulJohnImg,
  "메리 골다 로스": maryRossImg,
  "윌리엄 캄콤바": williamKamkwambaImg,
  "메리 비어트리스 데이비슨 케너": maryKennerImg,
  "세종대왕": kingSejongImg,
  "아멜리아 에어하트": ameliaEarhartImg,
  "어브비어스 피겨스": hiddenFiguresImg,
};

const eraColors = {
  moors: "from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-300 dark:border-amber-700",
  innovators: "from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 border-green-300 dark:border-green-700",
  pioneers: "from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-300 dark:border-blue-700",
};

export default function HistoricalFigureGuide({
  name,
  title,
  message,
  era,
  onContinue,
}: HistoricalFigureGuideProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setShowMessage(true), 500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const figureImage = figureImages[name];

  return (
    <div
      className={`
        rounded-3xl p-6 border-2 bg-gradient-to-br ${eraColors[era]}
        transition-all duration-300 ease-out
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
      `}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white dark:bg-card shadow-lg flex items-center justify-center border-4 border-white dark:border-gray-700 overflow-hidden">
          {figureImage ? (
            <img
              src={figureImage}
              alt={name}
              className="w-full h-full object-cover"
              data-testid={`img-figure-${name.toLowerCase().replace(/\s+/g, "-")}`}
            />
          ) : (
            <div className="text-center p-2">
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {name.charAt(0)}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{title}</p>
          
          <div
            className={`
              bg-white dark:bg-card rounded-2xl p-4 shadow-md
              transition-all duration-300 delay-200
              ${showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <p className="text-lg text-foreground leading-relaxed" data-testid="text-figure-message">
              {message}
            </p>
          </div>
        </div>
      </div>

      {onContinue && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-transform"
            data-testid="button-continue-activity"
          >
            {t.letsGo}
          </button>
        </div>
      )}
    </div>
  );
}
