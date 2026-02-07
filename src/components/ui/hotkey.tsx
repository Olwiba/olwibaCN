"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const MODIFIER_ORDER = ["shift", "ctrl", "alt", "mod"] as const;
type ModifierName = (typeof MODIFIER_ORDER)[number];

const MAC_SYMBOLS: Record<ModifierName, string> = {
  shift: "⇧",
  ctrl: "⌃",
  alt: "⌥",
  mod: "⌘",
};

function parseShortcut(shortcut: string): { modifiers: ModifierName[]; key: string } {
  const parts = shortcut
    .split("+")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);
  const key = parts.filter((p) => !MODIFIER_ORDER.includes(p as ModifierName)).pop() ?? "";
  const modifiers = parts.filter((p) =>
    MODIFIER_ORDER.includes(p as ModifierName)
  ) as ModifierName[];
  return {
    modifiers: MODIFIER_ORDER.filter((m) => modifiers.includes(m)),
    key: key.toUpperCase() || key,
  };
}

function formatShortcut(shortcut: string, isMac: boolean): string {
  const { modifiers, key } = parseShortcut(shortcut);
  if (isMac) {
    const modStr = modifiers.map((m) => MAC_SYMBOLS[m]).join("");
    return `${modStr}${key}`;
  }
  const modLabels: Record<ModifierName, string> = {
    shift: "Shift",
    ctrl: "Ctrl",
    alt: "Alt",
    mod: "Ctrl",
  };
  const modStr = modifiers.map((m) => modLabels[m]).join("+");
  return key ? `${modStr}+${key}` : `${modStr}+`;
}

export function useIsMac(): boolean {
  const [isMac, setIsMac] = React.useState(false);
  React.useEffect(() => {
    setIsMac(
      typeof navigator !== "undefined" &&
        navigator.platform.toUpperCase().includes("MAC")
    );
  }, []);
  return isMac;
}

export interface HotkeyProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Shortcut string, e.g. "mod+T", "shift+mod+Z", "mod" (modifier only) */
  shortcut: string;
  /** When true, render inside a <kbd> for standalone use (e.g. toolbar). When false, raw span for use inside MenubarShortcut etc. */
  asKbd?: boolean;
}

const Hotkey = React.forwardRef<HTMLSpanElement, HotkeyProps>(
  ({ shortcut, asKbd = false, className, ...props }, ref) => {
    const isMac = useIsMac();
    const content = formatShortcut(shortcut, isMac);

    if (asKbd) {
      return (
        <kbd
          ref={ref as React.Ref<HTMLElement>}
          data-slot="hotkey"
          className={cn(
            "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium",
            "[&_svg:not([class*='size-'])]:size-3",
            className
          )}
          {...props}
        >
          {content}
        </kbd>
      );
    }
    return (
      <span ref={ref} className={className} {...props}>
        {content}
      </span>
    );
  }
);
Hotkey.displayName = "Hotkey";

export { Hotkey };
