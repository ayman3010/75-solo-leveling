import { useState, useEffect } from "react";
import DayCard, { DayProgress } from "@/components/DayCard";
import ProgressBar from "@/components/ProgressBar";
import ResetDialog from "@/components/ResetDialog";
import SettingsDialog, { HabitLabels, DEFAULT_HABITS } from "@/components/SettingsDialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type AllProgress = Record<number, DayProgress>;

const STORAGE_KEY = "75hard-progress";
const LAST_CHECK_KEY = "75hard-last-check";
const ACTUAL_DAY_KEY = "75hard-actual-day";
const SELECTED_DAY_KEY = "75hard-selected-day";
const HABITS_KEY = "75hard-custom-habits";

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

function getActualDay(): number {
  const stored = localStorage.getItem(ACTUAL_DAY_KEY);
  return stored ? parseInt(stored, 10) : 1;
}

function getSelectedDay(): number {
  const stored = localStorage.getItem(SELECTED_DAY_KEY);
  return stored ? parseInt(stored, 10) : 1;
}

function getCustomHabits(): HabitLabels {
  const stored = localStorage.getItem(HABITS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse custom habits", e);
    }
  }
  return DEFAULT_HABITS;
}

export default function Tracker() {
  const [allProgress, setAllProgress] = useState<AllProgress>(initializeProgress);
  const [actualDay, setActualDay] = useState<number>(getActualDay);
  const [selectedDay, setSelectedDay] = useState<number>(getSelectedDay);
  const [habitLabels, setHabitLabels] = useState<HabitLabels>(getCustomHabits);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  }, [allProgress]);

  useEffect(() => {
    localStorage.setItem(ACTUAL_DAY_KEY, actualDay.toString());
  }, [actualDay]);

  useEffect(() => {
    localStorage.setItem(SELECTED_DAY_KEY, selectedDay.toString());
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habitLabels));
  }, [habitLabels]);

  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      const lastCheck = localStorage.getItem(LAST_CHECK_KEY);
      const lastCheckDate = lastCheck ? new Date(lastCheck) : null;

      const getCurrentDateString = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      };

      const getDaysDifference = (date1: Date, date2: Date) => {
        const d1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const d2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        const diffTime = d1 - d2;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
      };

      const nowDateString = getCurrentDateString(now);
      const lastCheckDateString = lastCheckDate ? getCurrentDateString(lastCheckDate) : null;

      if (!lastCheckDateString || nowDateString !== lastCheckDateString) {
        const currentActualDay = parseInt(localStorage.getItem(ACTUAL_DAY_KEY) || "1", 10);
        const currentDayProgress = allProgress[currentActualDay];
        
        const isComplete = currentDayProgress && Object.values(currentDayProgress).every(Boolean);
        
        const daysPassed = lastCheckDate ? getDaysDifference(now, lastCheckDate) : 0;
        
        if (daysPassed > 1 && lastCheckDateString) {
          handleReset();
        } else if (!isComplete && lastCheckDateString) {
          handleReset();
        } else if (isComplete && currentActualDay < 75) {
          setActualDay(currentActualDay + 1);
          setSelectedDay(currentActualDay + 1);
        }
        
        localStorage.setItem(LAST_CHECK_KEY, now.toISOString());
      }
    };

    checkMidnight();
    const interval = setInterval(checkMidnight, 60000);

    return () => clearInterval(interval);
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
    setActualDay(1);
    setSelectedDay(1);
    localStorage.removeItem(LAST_CHECK_KEY);
  };

  const handlePrevDay = () => {
    if (selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    }
  };

  const handleNextDay = () => {
    if (selectedDay < 75) {
      setSelectedDay(selectedDay + 1);
    }
  };

  const handleSaveHabits = (newHabits: HabitLabels) => {
    setHabitLabels(newHabits);
  };

  const totalTasks = 75 * 7;
  const completedTasks = Object.values(allProgress).reduce((sum, day) => {
    return sum + Object.values(day).filter(Boolean).length;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">75 Hard Challenge</h1>
              <p className="text-sm text-muted-foreground">
                Complete all 7 tasks daily or restart from Day 1 at midnight.
              </p>
            </div>
            <div className="flex gap-2">
              <SettingsDialog habits={habitLabels} onSave={handleSaveHabits} />
              <ResetDialog onReset={handleReset} />
            </div>
          </div>
          <ProgressBar completed={completedTasks} total={totalTasks} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="default"
            onClick={handlePrevDay}
            disabled={selectedDay === 1}
            data-testid="button-prev-day"
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Day
          </Button>
          <span className="text-lg font-semibold text-foreground" data-testid="text-current-day">
            Day {selectedDay} of 75
          </span>
          <Button
            variant="outline"
            size="default"
            onClick={handleNextDay}
            disabled={selectedDay === 75}
            data-testid="button-next-day"
            className="gap-2"
          >
            Next Day
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="max-w-md mx-auto">
          <DayCard
            dayNumber={selectedDay}
            progress={allProgress[selectedDay]}
            onProgressChange={(progress) => handleDayProgressChange(selectedDay, progress)}
            habitLabels={habitLabels}
          />
        </div>
      </div>
    </div>
  );
}
