interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="w-full" data-testid="progress-container">
      <div className="relative h-14 bg-muted/30 rounded-lg overflow-hidden border border-border">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            boxShadow: percentage > 0 ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground z-10 tracking-wide" data-testid="text-progress" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {completed}/{total} QUESTS • {percentage}% XP
          </span>
        </div>
      </div>
    </div>
  );
}
