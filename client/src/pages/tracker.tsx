import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import DayCard, { DayProgress } from "@/components/DayCard";
import ProgressBar from "@/components/ProgressBar";
import ResetDialog from "@/components/ResetDialog";
import SettingsDialog, { HabitLabels, DEFAULT_HABITS } from "@/components/SettingsDialog";
import LoginScreen from "@/components/LoginScreen";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LogOut, User } from "lucide-react";

type AllProgress = Record<number, DayProgress>;

const CURRENT_USER_KEY = "75sololeveling-current-user";

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

function getCurrentUser(): string | null {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export default function Tracker() {
  const [currentUser, setCurrentUser] = useState<string | null>(getCurrentUser);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Fetch user settings
  const { data: settings, isLoading: settingsLoading } = useQuery<{
    username: string;
    actualDay: number;
    selectedDay: number;
    lastCheck: string | null;
    customHabits: HabitLabels | null;
  }>({
    queryKey: ["/api/user", currentUser, "settings"],
    enabled: !!currentUser,
  });

  // Fetch all progress
  const { data: allProgressArray = [], isLoading: progressLoading } = useQuery<Array<{
    id: string;
    username: string;
    dayNumber: number;
    workout1: boolean;
    workout2: boolean;
    diet: boolean;
    water: boolean;
    reading: boolean;
    sleep: boolean;
    photo: boolean;
    reflection: string;
  }>>({
    queryKey: ["/api/user", currentUser, "progress"],
    enabled: !!currentUser,
  });

  // Convert progress array to AllProgress object
  const allProgress: AllProgress = {};
  for (let i = 1; i <= 75; i++) {
    const dayData = allProgressArray.find(p => p.dayNumber === i);
    allProgress[i] = dayData ? {
      workout1: dayData.workout1,
      workout2: dayData.workout2,
      diet: dayData.diet,
      water: dayData.water,
      reading: dayData.reading,
      sleep: dayData.sleep,
      photo: dayData.photo,
      reflection: dayData.reflection,
    } : { ...emptyProgress };
  }

  const actualDay = settings?.actualDay ?? 1;
  const habitLabels = settings?.customHabits ?? DEFAULT_HABITS;

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (data: Partial<{
      actualDay: number;
      selectedDay: number;
      lastCheck: string;
      customHabits: HabitLabels;
    }>) => {
      return apiRequest("POST", `/api/user/${currentUser}/settings`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user", currentUser, "settings"] });
    },
  });

  // Update day progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ day, progress }: { day: number; progress: Partial<DayProgress> }) => {
      return apiRequest("POST", `/api/user/${currentUser}/progress/${day}`, progress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user", currentUser, "progress"] });
    },
  });

  // Reset mutation
  const resetMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", `/api/user/${currentUser}/reset`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user", currentUser] });
      setSelectedDay(1);
    },
  });

  // Sync selectedDay with settings
  useEffect(() => {
    if (settings && selectedDay !== settings.selectedDay) {
      updateSettingsMutation.mutate({ selectedDay });
    }
  }, [selectedDay]);

  // Initialize selectedDay from settings
  useEffect(() => {
    if (settings) {
      setSelectedDay(settings.selectedDay);
    }
  }, [settings?.selectedDay]);

  // Midnight check logic
  useEffect(() => {
    if (!currentUser || !settings) return;

    const checkMidnight = () => {
      const now = new Date();
      const currentDateString = now.toISOString().split("T")[0];
      const lastCheckDateString = settings.lastCheck;

      if (!lastCheckDateString || currentDateString !== lastCheckDateString) {
        const lastCheckDate = lastCheckDateString ? new Date(lastCheckDateString) : null;
        const currentDate = new Date(currentDateString);

        if (lastCheckDate) {
          const daysDifference = Math.floor(
            (currentDate.getTime() - lastCheckDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (daysDifference > 1) {
            resetMutation.mutate();
            updateSettingsMutation.mutate({ lastCheck: currentDateString });
            return;
          }

          if (daysDifference === 1) {
            const currentDayProgress = allProgress[actualDay];
            const habitBools = getHabitBooleans(currentDayProgress);
            const allComplete = habitBools.every((bool) => bool === true);

            if (!allComplete) {
              resetMutation.mutate();
            } else if (actualDay < 75) {
              updateSettingsMutation.mutate({
                actualDay: actualDay + 1,
                selectedDay: actualDay + 1,
                lastCheck: currentDateString,
              });
            }
          }
        }

        updateSettingsMutation.mutate({ lastCheck: currentDateString });
      }
    };

    checkMidnight();
    const interval = setInterval(checkMidnight, 60000);
    return () => clearInterval(interval);
  }, [currentUser, settings, actualDay, allProgress]);

  const handleLogin = async (username: string) => {
    try {
      await apiRequest("POST", "/api/auth/login", { username });
      
      localStorage.setItem(CURRENT_USER_KEY, username);
      setCurrentUser(username);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
    setSelectedDay(1);
    queryClient.clear();
  };

  const handleDayProgressChange = (day: number, progress: DayProgress) => {
    updateProgressMutation.mutate({ day, progress });
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

  const handleReset = () => {
    resetMutation.mutate();
  };

  const handleHabitsChange = (newHabits: HabitLabels) => {
    updateSettingsMutation.mutate({ customHabits: newHabits });
  };

  // Calculate total progress
  const totalChecked = Object.values(allProgress).reduce((sum, day) => {
    return sum + getHabitBooleans(day).filter((b) => b).length;
  }, 0);

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (settingsLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0F1A] via-[#1A1A2E] to-[#0F0F1A] flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    );
  }

  const isDayComplete = getHabitBooleans(allProgress[selectedDay]).every((b) => b);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F1A] via-[#1A1A2E] to-[#0F0F1A] text-white">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-wider bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              75 SOLO LEVELING
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-md">
              <User className="w-4 h-4 text-purple-400" data-testid="icon-user" />
              <span className="text-sm text-purple-300" data-testid="text-username">{currentUser}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-purple-500/30 hover:bg-purple-500/20 text-purple-300"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>

        <ProgressBar completed={totalChecked} total={525} />

        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevDay}
            disabled={selectedDay === 1}
            className="border-purple-500/30 hover:bg-purple-500/20 disabled:opacity-30"
            data-testid="button-prev-day"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="text-center">
            <div className="text-sm text-purple-300/70 mb-1">Current Progress</div>
            <div className="text-2xl font-bold tracking-wider" data-testid="text-current-day">
              Level {selectedDay} / 75
            </div>
            {selectedDay === actualDay && (
              <div className="text-xs text-blue-400 mt-1">▲ Your Current Level</div>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextDay}
            disabled={selectedDay === 75}
            className="border-purple-500/30 hover:bg-purple-500/20 disabled:opacity-30"
            data-testid="button-next-day"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="max-w-md mx-auto">
          {allProgress[selectedDay] && (
            <DayCard
              dayNumber={selectedDay}
              progress={allProgress[selectedDay]}
              onProgressChange={(progress) => handleDayProgressChange(selectedDay, progress)}
              habitLabels={habitLabels}
            />
          )}
        </div>

        <div className="flex justify-center gap-4">
          <SettingsDialog
            habits={habitLabels}
            onSave={handleHabitsChange}
          />
          <ResetDialog onReset={handleReset} />
        </div>
      </div>
    </div>
  );
}
