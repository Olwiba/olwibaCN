import { Input } from "@/components/ui/input";

export default function InputDemo() {
  return (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled" />
    </div>
  );
}
