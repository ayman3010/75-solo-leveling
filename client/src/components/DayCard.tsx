import { useState } from "react";
import HabitCheckbox from "./HabitCheckbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
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
  const [isEditingReflection, setIsEditingReflection] = useState(false);
  const [reflectionDraft, setReflectionDraft] = useState(progress.reflection);

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

  const handleEditReflection = () => {
    setReflectionDraft(progress.reflection);
    setIsEditingReflection(true);
  };

  const handleSaveReflection = () => {
    onProgressChange({ ...progress, reflection: reflectionDraft });
    setIsEditingReflection(false);
  };

  return (
    <div 
      className={`
        bg-card rounded-lg p-4 border-2 transition-all duration-300
        ${isFullyComplete 
          ? 'border-primary bg-primary/5' 
          : 'border-card-border hover-elevate'
        }
      `}
      style={isFullyComplete ? {
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)'
      } : undefined}
      data-testid={`card-day-${dayNumber}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-foreground tracking-wide">LEVEL {dayNumber}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded ${isFullyComplete ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
          {completedCount}/7 QUESTS
        </span>
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
      <div className="pt-4 mt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={`reflection-day-${dayNumber}`} className="text-sm font-semibold text-foreground tracking-wide">
            QUEST LOG
          </label>
          {!isEditingReflection ? (
            <Button
              size="sm"
              variant="outline"
              onClick={handleEditReflection}
              data-testid={`button-edit-reflection-day${dayNumber}`}
              className="h-7 gap-1.5"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSaveReflection}
              data-testid={`button-save-reflection-day${dayNumber}`}
              className="h-7 gap-1.5"
            >
              <Save className="w-3 h-3" />
              Save
            </Button>
          )}
        </div>
        {isEditingReflection ? (
          <Textarea
            id={`reflection-day-${dayNumber}`}
            data-testid={`textarea-reflection-day${dayNumber}`}
            placeholder="How did today go? Any thoughts or notes..."
            value={reflectionDraft}
            onChange={(e) => setReflectionDraft(e.target.value)}
            className="resize-none text-sm min-h-[80px]"
          />
        ) : (
          <div 
            className="min-h-[80px] p-3 rounded-md bg-muted/30 text-sm text-muted-foreground whitespace-pre-wrap border border-border/50"
            data-testid={`text-reflection-display-day${dayNumber}`}
          >
            {progress.reflection || "No quest log entry. Click Edit to record your progress."}
          </div>
        )}
      </div>
    </div>
  );
}
