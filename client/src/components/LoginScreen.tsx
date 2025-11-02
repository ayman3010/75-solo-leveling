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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4" style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' }}>
            <Swords className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 tracking-wide" style={{ textShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}>
            75 SOLO LEVELING
          </h1>
          <p className="text-muted-foreground">
            Enter your hunter name to begin your journey
          </p>
        </div>

        <div className="bg-card rounded-lg p-8 border-2 border-card-border" style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold tracking-wide">
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
                <p className="text-sm text-destructive" data-testid="text-error">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              data-testid="button-login"
              className="w-full h-12 text-base font-bold tracking-wide"
            >
              START LEVELING
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Your progress is saved locally on this device. Each hunter name has separate progress tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
