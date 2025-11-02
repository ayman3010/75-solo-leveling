import { useState } from "react";
import DayCard, { DayProgress } from "../DayCard";
import { DEFAULT_HABITS } from "../SettingsDialog";

export default function DayCardExample() {
  const [progress, setProgress] = useState<DayProgress>({
    workout1: true,
    workout2: true,
    diet: false,
    water: true,
    reading: false,
    sleep: false,
    photo: false,
  });

  return (
    <div className="max-w-sm">
      <DayCard 
        dayNumber={1} 
        progress={progress} 
        onProgressChange={setProgress}
        habitLabels={DEFAULT_HABITS}
      />
    </div>
  );
}
