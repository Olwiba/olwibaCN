import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="disabled">Disabled</Label>
        <Input disabled type="text" id="disabled" placeholder="Disabled" />
      </div>
    </div>
  );
}
