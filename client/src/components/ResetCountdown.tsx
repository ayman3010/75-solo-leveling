import { Clock, CheckCircle2 } from "lucide-react";

interface ResetCountdownProps {
  isComplete: boolean;
  timeRemainingSeconds: number;
}

export default function ResetCountdown({
  isComplete,
  timeRemainingSeconds,
}: ResetCountdownProps) {
  if (timeRemainingSeconds <= 0) return null;

  const hours = Math.floor(timeRemainingSeconds / (60 * 60));
  const minutes = Math.floor((timeRemainingSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(timeRemainingSeconds % 60);
  const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

  // Green styling when complete, red when incomplete
  const containerClass = isComplete
    ? "flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-3 rounded-lg"
    : "flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-lg animate-pulse";

  const iconClass = isComplete
    ? "w-4 h-4 sm:w-5 sm:h-5 text-green-400"
    : "w-4 h-4 sm:w-5 sm:h-5 text-red-400";

  const titleClass = isComplete
    ? "text-xs sm:text-sm text-green-300/80 font-medium"
    : "text-xs sm:text-sm text-red-300/80 font-medium";

  const timeClass = isComplete
    ? "text-lg sm:text-xl font-bold text-green-400 tracking-wider tabular-nums"
    : "text-lg sm:text-xl font-bold text-red-400 tracking-wider tabular-nums";

  const messageClass = isComplete
    ? "text-xs text-green-300/60 mt-0.5"
    : "text-xs text-red-300/60 mt-0.5";

  const title = isComplete ? "Level Complete!" : "System Reset in";
  const message = isComplete
    ? "All quests completed! You will advance at midnight!"
    : "Complete all quests to advance!";

  return (
    <div className={containerClass} data-testid="reset-countdown">
      {isComplete ? (
        <CheckCircle2 className={iconClass} />
      ) : (
        <Clock className={iconClass} />
      )}
      <div className="text-center">
        <div className={titleClass}>{title}</div>
        <div className={timeClass} data-testid="text-countdown-time">
          {formattedTime}
        </div>
        <div className={messageClass}>{message}</div>
      </div>
    </div>
  );
}
