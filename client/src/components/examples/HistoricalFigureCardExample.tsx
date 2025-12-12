import HistoricalFigureCard from "../HistoricalFigureCard";
import kingSejongImg from "@assets/generated_images/king_sejong_historical_figure.png";

export default function HistoricalFigureCardExample() {
  return (
    <div className="p-8 max-w-sm mx-auto">
      <HistoricalFigureCard
        name="King Sejong"
        title="The Great King of Korea"
        image={kingSejongImg}
        facts={[
          "King Sejong invented the Korean alphabet called Hangul so everyone could read and write!",
          "He loved science and invented many tools to help farmers know when to plant crops.",
          "He created the first rain gauge to measure rainfall over 600 years ago!",
        ]}
        accentColor="blue"
      />
    </div>
  );
}
