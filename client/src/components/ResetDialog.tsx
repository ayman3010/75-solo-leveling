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
          System Reset
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md border-destructive/50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl tracking-wide">SYSTEM RESET WARNING</AlertDialogTitle>
          <AlertDialogDescription>
            This will erase all progress and restart the 75 SoloLeveling system from Level 1. 
            This action cannot be undone. All quest logs and completed levels will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="button-cancel-reset">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onReset}
            data-testid="button-confirm-reset"
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Confirm Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
