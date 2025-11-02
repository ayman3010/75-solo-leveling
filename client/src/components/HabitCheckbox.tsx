import { Check } from "lucide-react";

interface HabitCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  testId?: string;
}

export default function HabitCheckbox({ label, checked, onChange, testId }: HabitCheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group min-h-[44px]">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        data-testid={testId}
        className={`
          w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors
          ${checked 
            ? 'bg-primary border-primary' 
            : 'border-border hover-elevate active-elevate-2'
          }
        `}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
      </button>
      <span className="text-sm text-foreground select-none">{label}</span>
    </label>
  );
}
