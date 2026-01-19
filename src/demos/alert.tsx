import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export default function AlertDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
