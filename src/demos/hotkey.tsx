import { Hotkey } from "@/components/ui/hotkey";
import { KbdGroup } from "@/components/ui/kbd";

export default function HotkeyDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Inline (e.g. in menus):</span>
        <KbdGroup>
          <Hotkey shortcut="mod+T" />
        </KbdGroup>
        <KbdGroup>
          <Hotkey shortcut="shift+mod+Z" />
        </KbdGroup>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Standalone (asKbd):</span>
        <Hotkey shortcut="mod+K" asKbd />
        <Hotkey shortcut="mod+P" asKbd />
      </div>
    </div>
  );
}
