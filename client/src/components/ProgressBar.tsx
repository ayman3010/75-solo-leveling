interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="w-full" data-testid="progress-container">
      <div className="relative h-12 bg-[#3498DB]/10 rounded-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-foreground z-10" data-testid="text-progress">
            {completed}/{total} tasks completed ({percentage}%)
          </span>
        </div>
      </div>
    </div>
  );
}
