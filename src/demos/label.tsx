import { Label } from "~/components/ui/label";

export default function LabelDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Your email address</Label>
      <p className="text-sm text-neutral-500">Labels are used to describe form inputs.</p>
    </div>
  );
}
