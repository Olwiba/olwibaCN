import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Press</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <span className="text-sm text-muted-foreground">to open command menu</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Press</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>C</Kbd>
        </KbdGroup>
        <span className="text-sm text-muted-foreground">to copy</span>
      </div>
      <div className="flex gap-2">
        <Kbd>Enter</Kbd>
        <Kbd>Tab</Kbd>
        <Kbd>Esc</Kbd>
      </div>
    </div>
  );
}
