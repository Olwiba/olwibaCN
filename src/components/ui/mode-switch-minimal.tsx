'use client';

import * as React from 'react';
import { Layers, LayoutGrid, Sparkles } from 'lucide-react';
import { Button } from './button';

export interface ModeSwitchOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export const defaultModeSwitchOptions: ModeSwitchOption[] = [
  { value: 'default', label: 'Default mode', icon: <LayoutGrid className="size-4" /> },
  { value: 'playful', label: 'Playful mode', icon: <Sparkles className="size-4" /> },
  { value: 'smooth', label: 'Smooth mode', icon: <Layers className="size-4" /> },
];

export interface ModeSwitchMinimalProps {
  mode: string;
  onModeChange: (mode: string) => void;
  /** The modes to cycle through, in order. @default default, playful, smooth */
  modes?: ModeSwitchOption[];
}

/**
 * Cycles the UI mode from one icon button.
 *
 * Controlled, because each place that uses it keeps the mode somewhere else:
 * @olwiba/ui in its provider, the docs sites in their own store. Each wraps
 * this with its state, so the control looks and behaves the same everywhere.
 */
export function ModeSwitchMinimal({
  mode,
  onModeChange,
  modes = defaultModeSwitchOptions,
}: ModeSwitchMinimalProps) {
  const index = Math.max(
    0,
    modes.findIndex((option) => option.value === mode),
  );
  const current = modes[index];
  // Set by the first click. The mode often arrives after mount, read from
  // storage, and animating that correction made every load look like a switch.
  const [switched, setSwitched] = React.useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setSwitched(true);
        onModeChange(modes[(index + 1) % modes.length].value);
      }}
      className="size-8"
      aria-label={current?.label}
    >
      <span
        key={current?.value}
        className={`inline-flex size-4 items-center justify-center${
          switched ? ' animate-in fade-in zoom-in-75 duration-200 motion-reduce:animate-none' : ''
        }`}
      >
        {current?.icon}
      </span>
    </Button>
  );
}
