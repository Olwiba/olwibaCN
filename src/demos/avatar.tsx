import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="/favicon/favicon-512.png" alt="@olwiba" />
        <AvatarFallback>OB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>OB</AvatarFallback>
      </Avatar>
    </div>
  );
}
