'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './button';

/**
 * Light/dark toggle as a single icon button, for headers and nav bars.
 *
 * The icon is chosen by CSS, from the `dark` class the theme script sets on
 * <html> before first paint, so it is right on the first frame and the server
 * and client render the same markup. It used to come from state seeded with
 * 'dark' and corrected after mount: hydration-safe, but every light-mode load
 * showed the wrong icon for a frame and then played the switch animation as
 * the correction landed.
 *
 * Moved here from @olwiba/ui so the docs header can use the same control the
 * products do; @olwiba/ui re-exports it under the same name.
 */
export function ThemeSwitchMinimal() {
  // Counts the visitor's switches, so the icon animates on a switch and never
  // on load.
  const [switches, setSwitches] = React.useState(0);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    root.classList.toggle('dark', next === 'dark');
    root.style.colorScheme = next;
    setSwitches((count) => count + 1);
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="size-8" aria-label="Toggle theme">
      <span
        key={switches}
        className={`inline-flex size-4 items-center justify-center${
          switches > 0
            ? ' animate-in fade-in zoom-in-75 spin-in-90 duration-200 motion-reduce:animate-none'
            : ''
        }`}
      >
        <Sun className="hidden size-4 dark:block" />
        <Moon className="size-4 dark:hidden" />
      </span>
    </Button>
  );
}
