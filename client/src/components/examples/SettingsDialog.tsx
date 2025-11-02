import { useState } from "react";
import SettingsDialog, { DEFAULT_HABITS, HabitLabels } from "../SettingsDialog";

export default function SettingsDialogExample() {
  const [habits, setHabits] = useState<HabitLabels>(DEFAULT_HABITS);

  const handleSave = (newHabits: HabitLabels) => {
    setHabits(newHabits);
    console.log("Saved habits:", newHabits);
  };

  return (
    <div className="p-4">
      <SettingsDialog habits={habits} onSave={handleSave} />
      <div className="mt-4 p-4 bg-card rounded-md">
        <h3 className="font-semibold mb-2">Current Habits:</h3>
        <ul className="text-sm space-y-1">
          {Object.entries(habits).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
