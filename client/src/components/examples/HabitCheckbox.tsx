import { useState } from "react";
import HabitCheckbox from "../HabitCheckbox";

export default function HabitCheckboxExample() {
  const [checked, setChecked] = useState(false);
  
  return (
    <HabitCheckbox 
      label="Workout 1" 
      checked={checked} 
      onChange={setChecked}
    />
  );
}
