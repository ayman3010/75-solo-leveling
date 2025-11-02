import HabitCheckbox from "./HabitCheckbox";
import type { HabitLabels } from "./SettingsDialog";

export interface DayProgress {
  workout1: boolean;
  workout2: boolean;
  diet: boolean;
  water: boolean;
  reading: boolean;
  sleep: boolean;
  photo: boolean;
}

interface DayCardProps {
  dayNumber: number;
  progress: DayProgress;
  onProgressChange: (progress: DayProgress) => void;
  habitLabels: HabitLabels;
}

export default function DayCard({ dayNumber, progress, onProgressChange, habitLabels }: DayCardProps) {
  const completedCount = Object.values(progress).filter(Boolean).length;
  const isFullyComplete = completedCount === 7;

  const habits = [
    { key: 'workout1' as keyof DayProgress, label: habitLabels.workout1 },
    { key: 'workout2' as keyof DayProgress, label: habitLabels.workout2 },
    { key: 'diet' as keyof DayProgress, label: habitLabels.diet },
    { key: 'water' as keyof DayProgress, label: habitLabels.water },
    { key: 'reading' as keyof DayProgress, label: habitLabels.reading },
    { key: 'sleep' as keyof DayProgress, label: habitLabels.sleep },
    { key: 'photo' as keyof DayProgress, label: habitLabels.photo },
  ];

  const handleCheckboxChange = (key: keyof DayProgress, checked: boolean) => {
    onProgressChange({ ...progress, [key]: checked });
  };

  return (
    <div 
      className={`
        bg-card rounded-md p-3 border transition-colors
        ${isFullyComplete 
          ? 'border-[#27AE60] border-2 bg-[#F0FDF4] dark:bg-[#0A2818]' 
          : 'border-card-border hover-elevate'
        }
      `}
      data-testid={`card-day-${dayNumber}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-base text-foreground">Day {dayNumber}</h3>
        <span className="text-xs text-muted-foreground">{completedCount}/7</span>
      </div>
      <div className="space-y-2">
        {habits.map((habit) => (
          <HabitCheckbox
            key={habit.key}
            label={habit.label}
            checked={progress[habit.key]}
            onChange={(checked) => handleCheckboxChange(habit.key, checked)}
            testId={`checkbox-day${dayNumber}-${habit.key}`}
          />
        ))}
      </div>
    </div>
  );
}
