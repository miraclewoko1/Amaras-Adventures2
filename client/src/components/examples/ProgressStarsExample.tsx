import ProgressStars from "../ProgressStars";

export default function ProgressStarsExample() {
  return (
    <div className="p-8 space-y-6">
      <ProgressStars current={3} total={5} size="large" />
      <ProgressStars current={2} total={5} size="medium" />
      <ProgressStars current={5} total={5} size="small" />
    </div>
  );
}
