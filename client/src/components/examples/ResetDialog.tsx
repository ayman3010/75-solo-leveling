import ResetDialog from "../ResetDialog";

export default function ResetDialogExample() {
  const handleReset = () => {
    console.log("Challenge reset triggered");
  };

  return (
    <ResetDialog onReset={handleReset} />
  );
}
