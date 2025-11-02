import { useState, useEffect } from "react";
import DayCard, { DayProgress } from "@/components/DayCard";
import ProgressBar from "@/components/ProgressBar";
import ResetDialog from "@/components/ResetDialog";

type AllProgress = Record<number, DayProgress>;

const STORAGE_KEY = "75hard-progress";

const emptyProgress: DayProgress = {
  workout1: false,
  workout2: false,
  diet: false,
  water: false,
  reading: false,
  sleep: false,
  photo: false,
};

function initializeProgress(): AllProgress {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored progress", e);
    }
  }
  
  const initial: AllProgress = {};
  for (let i = 1; i <= 75; i++) {
    initial[i] = { ...emptyProgress };
  }
  return initial;
}

export default function Tracker() {
  const [allProgress, setAllProgress] = useState<AllProgress>(initializeProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  }, [allProgress]);

  const handleDayProgressChange = (dayNumber: number, progress: DayProgress) => {
    setAllProgress((prev) => ({
      ...prev,
      [dayNumber]: progress,
    }));
  };

  const handleReset = () => {
    const resetProgress: AllProgress = {};
    for (let i = 1; i <= 75; i++) {
      resetProgress[i] = { ...emptyProgress };
    }
    setAllProgress(resetProgress);
  };

  const totalTasks = 75 * 7;
  const completedTasks = Object.values(allProgress).reduce((sum, day) => {
    return sum + Object.values(day).filter(Boolean).length;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">75 Hard Challenge</h1>
              <p className="text-sm text-muted-foreground">
                Track your progress. Check off each task as you complete it daily.
              </p>
            </div>
            <ResetDialog onReset={handleReset} />
          </div>
          <ProgressBar completed={completedTasks} total={totalTasks} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {Array.from({ length: 75 }, (_, i) => i + 1).map((dayNumber) => (
            <DayCard
              key={dayNumber}
              dayNumber={dayNumber}
              progress={allProgress[dayNumber]}
              onProgressChange={(progress) => handleDayProgressChange(dayNumber, progress)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
