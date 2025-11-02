import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Swords } from "lucide-react";

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError("Please enter a username");
      return;
    }
    
    if (trimmedUsername.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setError("Username must be 20 characters or less");
      return;
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      setError("Username can only contain letters, numbers, underscores, and hyphens");
      return;
    }
    
    onLogin(trimmedUsername);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-3 sm:mb-4" style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' }}>
            <Swords className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-wide" style={{ textShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}>
            75 SOLO LEVELING
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground px-2">
            Enter your hunter name to begin your journey
          </p>
        </div>

        <div className="bg-card rounded-lg p-5 sm:p-8 border-2 border-card-border" style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)' }}>
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs sm:text-sm font-semibold tracking-wide">
                HUNTER NAME
              </Label>
              <Input
                id="username"
                type="text"
                data-testid="input-username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Enter your hunter name"
                autoFocus
                className="h-12 text-base"
              />
              {error && (
                <p className="text-xs sm:text-sm text-destructive" data-testid="text-error">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              data-testid="button-login"
              className="w-full h-12 text-sm sm:text-base font-bold tracking-wide"
            >
              START LEVELING
            </Button>
          </form>

          <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Your progress syncs across all your devices. Each hunter name has separate progress tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
