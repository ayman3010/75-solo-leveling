import type { KeyboardEvent } from "react";
import { Check } from "lucide-react";

interface HabitCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  testId?: string;
}

export default function HabitCheckbox({ label, checked, onChange, testId }: HabitCheckboxProps) {
  const handleToggle = () => {
    onChange(!checked);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label 
      className="flex items-center gap-2 cursor-pointer group min-h-[44px] focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded"
      data-testid={testId}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleInputChange}
        className="sr-only"
        tabIndex={0}
      />
      <div
        className={`
          w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors pointer-events-none
          ${checked 
            ? 'bg-primary border-primary' 
            : 'border-border group-hover:hover-elevate group-active:active-elevate-2'
          }
        `}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
      </div>
      <span className="text-sm sm:text-sm text-foreground select-none leading-tight">{label}</span>
    </label>
  );
}
