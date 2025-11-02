import HabitCheckbox from "./HabitCheckbox";
import { Textarea } from "@/components/ui/textarea";
import type { HabitLabels } from "./SettingsDialog";

export interface DayProgress {
  workout1: boolean;
  workout2: boolean;
  diet: boolean;
  water: boolean;
  reading: boolean;
  sleep: boolean;
  photo: boolean;
  reflection: string;
}

type HabitKey = Exclude<keyof DayProgress, 'reflection'>;

interface DayCardProps {
  dayNumber: number;
  progress: DayProgress;
  onProgressChange: (progress: DayProgress) => void;
  habitLabels: HabitLabels;
}

export default function DayCard({ dayNumber, progress, onProgressChange, habitLabels }: DayCardProps) {
  const completedCount = [
    progress.workout1,
    progress.workout2,
    progress.diet,
    progress.water,
    progress.reading,
    progress.sleep,
    progress.photo,
  ].filter(Boolean).length;
  const isFullyComplete = completedCount === 7;

  const habits: Array<{ key: HabitKey; label: string }> = [
    { key: 'workout1', label: habitLabels.workout1 },
    { key: 'workout2', label: habitLabels.workout2 },
    { key: 'diet', label: habitLabels.diet },
    { key: 'water', label: habitLabels.water },
    { key: 'reading', label: habitLabels.reading },
    { key: 'sleep', label: habitLabels.sleep },
    { key: 'photo', label: habitLabels.photo },
  ];

  const handleCheckboxChange = (key: HabitKey, checked: boolean) => {
    onProgressChange({ ...progress, [key]: checked });
  };

  const handleReflectionChange = (reflection: string) => {
    onProgressChange({ ...progress, reflection });
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
      <div className="space-y-2 mb-3">
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
      <div className="pt-3 border-t border-border">
        <label htmlFor={`reflection-day-${dayNumber}`} className="text-sm font-medium text-foreground mb-2 block">
          Daily Reflection
        </label>
        <Textarea
          id={`reflection-day-${dayNumber}`}
          data-testid={`textarea-reflection-day${dayNumber}`}
          placeholder="How did today go? Any thoughts or notes..."
          value={progress.reflection}
          onChange={(e) => handleReflectionChange(e.target.value)}
          className="resize-none text-sm min-h-[80px]"
        />
      </div>
    </div>
  );
}
