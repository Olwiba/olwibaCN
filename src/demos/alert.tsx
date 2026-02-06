import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, TriangleAlert, Lightbulb, CircleX } from "lucide-react";

export default function AlertDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          Your account has been updated with the latest changes.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your trial expires in 3 days. Upgrade to keep access.
        </AlertDescription>
      </Alert>
      <Alert variant="tip">
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          Use keyboard shortcuts to navigate faster.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleX className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
