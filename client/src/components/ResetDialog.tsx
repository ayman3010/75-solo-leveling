import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ResetDialogProps {
  onReset: () => void;
}

export default function ResetDialog({ onReset }: ResetDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="default"
          data-testid="button-reset"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Challenge
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Reset Your Challenge?</AlertDialogTitle>
          <AlertDialogDescription>
            This will clear all your progress and start the 75 Hard Challenge from Day 1. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="button-cancel-reset">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onReset}
            data-testid="button-confirm-reset"
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Reset Progress
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
