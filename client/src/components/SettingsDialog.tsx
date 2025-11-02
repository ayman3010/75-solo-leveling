import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

export interface HabitLabels {
  workout1: string;
  workout2: string;
  diet: string;
  water: string;
  reading: string;
  sleep: string;
  photo: string;
}

export const DEFAULT_HABITS: HabitLabels = {
  workout1: 'Workout 1',
  workout2: 'Workout 2',
  diet: 'Diet',
  water: 'Water (1 gallon)',
  reading: 'Reading (10 pages)',
  sleep: 'Sleep (7+ hours)',
  photo: 'Progress Photo',
};

interface SettingsDialogProps {
  habits: HabitLabels;
  onSave: (habits: HabitLabels) => void;
}

export default function SettingsDialog({ habits, onSave }: SettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [editedHabits, setEditedHabits] = useState<HabitLabels>(habits);

  useEffect(() => {
    if (open) {
      setEditedHabits(habits);
    }
  }, [open, habits]);

  const handleSave = () => {
    onSave(editedHabits);
    setOpen(false);
  };

  const handleReset = () => {
    setEditedHabits(DEFAULT_HABITS);
  };

  const handleChange = (key: keyof HabitLabels, value: string) => {
    setEditedHabits((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="default"
          data-testid="button-settings"
          className="gap-2"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Daily Goals</DialogTitle>
          <DialogDescription>
            Edit the names of your 7 daily habits. These will apply to all 75 days.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="workout1">Habit 1</Label>
            <Input
              id="workout1"
              data-testid="input-habit-workout1"
              value={editedHabits.workout1}
              onChange={(e) => handleChange('workout1', e.target.value)}
              placeholder="e.g., Morning Workout"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workout2">Habit 2</Label>
            <Input
              id="workout2"
              data-testid="input-habit-workout2"
              value={editedHabits.workout2}
              onChange={(e) => handleChange('workout2', e.target.value)}
              placeholder="e.g., Evening Workout"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diet">Habit 3</Label>
            <Input
              id="diet"
              data-testid="input-habit-diet"
              value={editedHabits.diet}
              onChange={(e) => handleChange('diet', e.target.value)}
              placeholder="e.g., Follow Diet Plan"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="water">Habit 4</Label>
            <Input
              id="water"
              data-testid="input-habit-water"
              value={editedHabits.water}
              onChange={(e) => handleChange('water', e.target.value)}
              placeholder="e.g., Drink Water"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reading">Habit 5</Label>
            <Input
              id="reading"
              data-testid="input-habit-reading"
              value={editedHabits.reading}
              onChange={(e) => handleChange('reading', e.target.value)}
              placeholder="e.g., Read"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sleep">Habit 6</Label>
            <Input
              id="sleep"
              data-testid="input-habit-sleep"
              value={editedHabits.sleep}
              onChange={(e) => handleChange('sleep', e.target.value)}
              placeholder="e.g., Get Enough Sleep"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Habit 7</Label>
            <Input
              id="photo"
              data-testid="input-habit-photo"
              value={editedHabits.photo}
              onChange={(e) => handleChange('photo', e.target.value)}
              placeholder="e.g., Take Progress Photo"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleReset}
            data-testid="button-reset-habits"
            className="flex-1"
          >
            Reset to Defaults
          </Button>
          <Button 
            onClick={handleSave}
            data-testid="button-save-habits"
            className="flex-1"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
