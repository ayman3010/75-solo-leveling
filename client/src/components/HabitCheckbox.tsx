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

  return (
    <div 
      className="flex items-center gap-2 cursor-pointer group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="checkbox"
      aria-checked={checked}
      data-testid={testId}
    >
      <div
        className={`
          w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors
          ${checked 
            ? 'bg-primary border-primary' 
            : 'border-border hover-elevate active-elevate-2'
          }
        `}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
      </div>
      <span className="text-sm text-foreground select-none">{label}</span>
    </div>
  );
}
