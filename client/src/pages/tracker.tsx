import { useState, useEffect } from "react";
import DayCard, { DayProgress } from "@/components/DayCard";
import ProgressBar from "@/components/ProgressBar";
import ResetDialog from "@/components/ResetDialog";
import SettingsDialog, { HabitLabels, DEFAULT_HABITS } from "@/components/SettingsDialog";
import LoginScreen from "@/components/LoginScreen";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LogOut, User } from "lucide-react";

type AllProgress = Record<number, DayProgress>;

const CURRENT_USER_KEY = "75sololeveling-current-user";

// Helper functions to get user-scoped keys
const getUserKey = (username: string, key: string) => `75sololeveling-${username}-${key}`;

const getStorageKey = (username: string) => getUserKey(username, "progress");
const getLastCheckKey = (username: string) => getUserKey(username, "last-check");
const getActualDayKey = (username: string) => getUserKey(username, "actual-day");
const getSelectedDayKey = (username: string) => getUserKey(username, "selected-day");
const getHabitsKey = (username: string) => getUserKey(username, "custom-habits");

// Legacy keys for migration (non-user-scoped)
const OLD_STORAGE_KEY = "75sololeveling-progress";
const OLD_LAST_CHECK_KEY = "75sololeveling-last-check";
const OLD_ACTUAL_DAY_KEY = "75sololeveling-actual-day";
const OLD_SELECTED_DAY_KEY = "75sololeveling-selected-day";
const OLD_HABITS_KEY = "75sololeveling-custom-habits";
const OLD_OLD_STORAGE_KEY = "75hard-progress";
const OLD_OLD_LAST_CHECK_KEY = "75hard-last-check";
const OLD_OLD_ACTUAL_DAY_KEY = "75hard-actual-day";
const OLD_OLD_SELECTED_DAY_KEY = "75hard-selected-day";
const OLD_OLD_HABITS_KEY = "75hard-custom-habits";

const emptyProgress: DayProgress = {
  workout1: false,
  workout2: false,
  diet: false,
  water: false,
  reading: false,
  sleep: false,
  photo: false,
  reflection: "",
};

function getHabitBooleans(day: DayProgress): boolean[] {
  return [
    day.workout1,
    day.workout2,
    day.diet,
    day.water,
    day.reading,
    day.sleep,
    day.photo,
  ];
}

function initializeProgress(username: string): AllProgress {
  const STORAGE_KEY = getStorageKey(username);
  
  // Try user-scoped key first, then fall back to old keys for migration
  let stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Try old non-user-scoped keys for migration
    stored = localStorage.getItem(OLD_STORAGE_KEY);
    if (!stored) {
      stored = localStorage.getItem(OLD_OLD_STORAGE_KEY);
    }
    if (stored) {
      // Migrate old data to new user-scoped key
      localStorage.setItem(STORAGE_KEY, stored);
    }
  }
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const migrated: AllProgress = {};
      for (let i = 1; i <= 75; i++) {
        migrated[i] = {
          ...emptyProgress,
          ...parsed[i],
          reflection: parsed[i]?.reflection ?? "",
        };
      }
      return migrated;
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

function getActualDay(username: string): number {
  const ACTUAL_DAY_KEY = getActualDayKey(username);
  
  // Try user-scoped key first, then fall back to old keys for migration
  let stored = localStorage.getItem(ACTUAL_DAY_KEY);
  if (!stored) {
    stored = localStorage.getItem(OLD_ACTUAL_DAY_KEY);
    if (!stored) {
      stored = localStorage.getItem(OLD_OLD_ACTUAL_DAY_KEY);
    }
    if (stored) {
      localStorage.setItem(ACTUAL_DAY_KEY, stored);
    }
  }
  return stored ? parseInt(stored, 10) : 1;
}

function getSelectedDay(username: string): number {
  const SELECTED_DAY_KEY = getSelectedDayKey(username);
  
  // Try user-scoped key first, then fall back to old keys for migration
  let stored = localStorage.getItem(SELECTED_DAY_KEY);
  if (!stored) {
    stored = localStorage.getItem(OLD_SELECTED_DAY_KEY);
    if (!stored) {
      stored = localStorage.getItem(OLD_OLD_SELECTED_DAY_KEY);
    }
    if (stored) {
      localStorage.setItem(SELECTED_DAY_KEY, stored);
    }
  }
  return stored ? parseInt(stored, 10) : 1;
}

function getCustomHabits(username: string): HabitLabels {
  const HABITS_KEY = getHabitsKey(username);
  
  // Try user-scoped key first, then fall back to old keys for migration
  let stored = localStorage.getItem(HABITS_KEY);
  if (!stored) {
    stored = localStorage.getItem(OLD_HABITS_KEY);
    if (!stored) {
      stored = localStorage.getItem(OLD_OLD_HABITS_KEY);
    }
    if (stored) {
      localStorage.setItem(HABITS_KEY, stored);
    }
  }
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse custom habits", e);
    }
  }
  return DEFAULT_HABITS;
}

function getCurrentUser(): string | null {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export default function Tracker() {
  const [currentUser, setCurrentUser] = useState<string | null>(getCurrentUser);
  const [allProgress, setAllProgress] = useState<AllProgress>({});
  const [actualDay, setActualDay] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [habitLabels, setHabitLabels] = useState<HabitLabels>(DEFAULT_HABITS);

  // Initialize data when user logs in
  useEffect(() => {
    if (currentUser) {
      setAllProgress(initializeProgress(currentUser));
      setActualDay(getActualDay(currentUser));
      setSelectedDay(getSelectedDay(currentUser));
      setHabitLabels(getCustomHabits(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(getStorageKey(currentUser), JSON.stringify(allProgress));
    }
  }, [allProgress, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(getActualDayKey(currentUser), actualDay.toString());
    }
  }, [actualDay, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(getSelectedDayKey(currentUser), selectedDay.toString());
    }
  }, [selectedDay, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(getHabitsKey(currentUser), JSON.stringify(habitLabels));
    }
  }, [habitLabels, currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const checkMidnight = () => {
      const now = new Date();
      const LAST_CHECK_KEY = getLastCheckKey(currentUser);
      
      // Migrate old last check key if needed
      let lastCheck = localStorage.getItem(LAST_CHECK_KEY);
      if (!lastCheck) {
        lastCheck = localStorage.getItem(OLD_LAST_CHECK_KEY);
        if (!lastCheck) {
          lastCheck = localStorage.getItem(OLD_OLD_LAST_CHECK_KEY);
        }
        if (lastCheck) {
          localStorage.setItem(LAST_CHECK_KEY, lastCheck);
        }
      }
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
        const currentActualDay = actualDay;
        const currentDayProgress = allProgress[currentActualDay];
        
        const isComplete = currentDayProgress && getHabitBooleans(currentDayProgress).every(Boolean);
        
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
  }, [allProgress, actualDay, currentUser]);

  const handleDayProgressChange = (dayNumber: number, progress: DayProgress) => {
    setAllProgress((prev) => ({
      ...prev,
      [dayNumber]: progress,
    }));
  };

  const handleReset = () => {
    if (!currentUser) return;
    
    const resetProgress: AllProgress = {};
    for (let i = 1; i <= 75; i++) {
      resetProgress[i] = { ...emptyProgress };
    }
    setAllProgress(resetProgress);
    setActualDay(1);
    setSelectedDay(1);
    localStorage.removeItem(getLastCheckKey(currentUser));
  };

  const handleLogin = (username: string) => {
    localStorage.setItem(CURRENT_USER_KEY, username);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
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
    return sum + getHabitBooleans(day).filter(Boolean).length;
  }, 0);

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1 tracking-wide" style={{ textShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}>
                75 SOLO LEVELING
              </h1>
              <p className="text-sm text-muted-foreground">
                Complete all daily quests or the system resets at midnight.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md border border-primary/20" data-testid="user-display">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{currentUser}</span>
              </div>
              <SettingsDialog habits={habitLabels} onSave={handleSaveHabits} />
              <ResetDialog onReset={handleReset} />
              <Button
                variant="outline"
                size="default"
                onClick={handleLogout}
                data-testid="button-logout"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
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
            Level {selectedDay} / 75
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
