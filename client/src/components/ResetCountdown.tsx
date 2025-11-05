import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface ResetCountdownProps {
  show: boolean;
}

export default function ResetCountdown({ show }: ResetCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    if (!show) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  return (
    <div 
      className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-lg animate-pulse"
      data-testid="reset-countdown"
    >
      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
      <div className="text-center">
        <div className="text-xs sm:text-sm text-red-300/80 font-medium">
          System Reset in
        </div>
        <div className="text-lg sm:text-xl font-bold text-red-400 tracking-wider tabular-nums" data-testid="text-countdown-time">
          {timeRemaining}
        </div>
        <div className="text-xs text-red-300/60 mt-0.5">
          Complete all quests to advance!
        </div>
      </div>
    </div>
  );
}
