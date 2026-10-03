'use client';

import * as React from 'react';
import { Palette } from 'lucide-react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface BrandColorOption {
  name: string;
  label: string;
  /** Any CSS colour; only paints the swatch. */
  swatch: string;
  /** The stylesheet applied when this colour is picked. Used uncontrolled only. */
  css?: string;
  /** A near-black swatch, which gets a ring in dark mode so it does not vanish. */
  neutral?: boolean;
}

export const brandColorPresets: BrandColorOption[] = [
  {
    name: 'zinc',
    label: 'Zinc',
    swatch: '#27272a',
    neutral: true,
    css: `
      :root { --primary: oklch(0.205 0 0); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.708 0 0); }
      .dark  { --primary: oklch(0.922 0 0); --primary-foreground: oklch(0.205 0 0); --ring: oklch(0.556 0 0); }
    `,
  },
  {
    name: 'blue',
    label: 'Blue',
    swatch: '#3b82f6',
    css: `
      :root { --primary: oklch(0.546 0.245 262.881); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.546 0.245 262.881); }
      .dark  { --primary: oklch(0.623 0.214 259.815); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.623 0.214 259.815); }
    `,
  },
  {
    name: 'emerald',
    label: 'Emerald',
    swatch: '#10b981',
    css: `
      :root { --primary: oklch(0.596 0.145 163.225); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.596 0.145 163.225); }
      .dark  { --primary: oklch(0.765 0.177 163.223); --primary-foreground: oklch(0.145 0 0); --ring: oklch(0.765 0.177 163.223); }
    `,
  },
  {
    name: 'purple',
    label: 'Purple',
    swatch: '#a855f7',
    css: `
      :root { --primary: oklch(0.558 0.288 302.321); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.558 0.288 302.321); }
      .dark  { --primary: oklch(0.714 0.203 305.504); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.714 0.203 305.504); }
    `,
  },
  {
    name: 'rose',
    label: 'Rose',
    swatch: '#f43f5e',
    css: `
      :root { --primary: oklch(0.645 0.246 16.439); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.645 0.246 16.439); }
      .dark  { --primary: oklch(0.717 0.194 17.428); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.717 0.194 17.428); }
    `,
  },
  {
    name: 'orange',
    label: 'Orange',
    swatch: '#f97316',
    css: `
      :root { --primary: oklch(0.705 0.213 47.604); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.705 0.213 47.604); }
      .dark  { --primary: oklch(0.792 0.184 70.08); --primary-foreground: oklch(0.145 0 0); --ring: oklch(0.792 0.184 70.08); }
    `,
  },
  {
    name: 'lime',
    label: 'Lime',
    swatch: '#84cc16',
    css: `
      :root { --primary: oklch(0.648 0.2 131.684); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.648 0.2 131.684); }
      .dark  { --primary: oklch(0.841 0.238 132.9); --primary-foreground: oklch(0.145 0 0); --ring: oklch(0.841 0.238 132.9); }
    `,
  },
  {
    name: 'slate',
    label: 'Slate',
    swatch: '#64748b',
    css: `
      :root { --primary: oklch(0.446 0.043 257.281); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.446 0.043 257.281); }
      .dark  { --primary: oklch(0.704 0.04 256.788); --primary-foreground: oklch(0.129 0.042 264.695); --ring: oklch(0.704 0.04 256.788); }
    `,
  },
];

const STORAGE_KEY = 'brand-color';
const STYLE_ID = 'brand-color-override';
const DEFAULT_COLOR = 'emerald';

function applyColor(color: BrandColorOption) {
  if (!color.css) return;
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = color.css;
  localStorage.setItem(STORAGE_KEY, color.name);
}

function getSavedColorName(): string {
  if (typeof localStorage === 'undefined') return DEFAULT_COLOR;
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_COLOR;
}

export interface BrandColorSwitchMinimalProps {
  /** @default brandColorPresets */
  colors?: BrandColorOption[];
  /**
   * The selected colour's name, to control the switch. Controlled, it stores
   * and applies nothing: the owner does, as the docs sites' theme provider
   * does. Uncontrolled, it keeps its pick in localStorage and applies the
   * option's `css` itself.
   */
  value?: string;
  onValueChange?: (name: string) => void;
}

/**
 * Brand colour picker as a single icon button: a palette with a dot of the
 * current colour, opening a grid of swatches.
 *
 * Moved here from @olwiba/ui so the docs header can use the same control the
 * products do; @olwiba/ui re-exports it under the same name.
 */
export function BrandColorSwitchMinimal({
  colors = brandColorPresets,
  value,
  onValueChange,
}: BrandColorSwitchMinimalProps) {
  const controlled = value !== undefined;
  // Constant seed, corrected on mount — the same reason ThemeSwitchMinimal
  // does it. A state initialiser runs during the render React hydrates
  // against, so reading localStorage there renders a swatch the server could
  // not have known about.
  const [uncontrolled, setUncontrolled] = React.useState<string>(DEFAULT_COLOR);
  const [open, setOpen] = React.useState(false);
  const active = controlled ? value : uncontrolled;

  React.useEffect(() => {
    if (controlled) return;
    const saved = getSavedColorName();
    setUncontrolled(saved);
    const color = colors.find((c) => c.name === saved);
    if (color) applyColor(color);
    // Restores the saved pick once, on mount; later picks go through select.
  }, []);

  function select(color: BrandColorOption) {
    if (controlled) {
      onValueChange?.(color.name);
    } else {
      applyColor(color);
      setUncontrolled(color.name);
      onValueChange?.(color.name);
    }
    setOpen(false);
  }

  const activeColor = colors.find((c) => c.name === active);
  const activeSwatch = activeColor?.swatch ?? '#27272a';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8" aria-label="Change brand color">
          <span className="relative inline-flex size-4 items-center justify-center">
            <Palette className="size-4" />
            <span
              className={`absolute -bottom-0.5 -right-0.5 size-1.5 rounded-full ring-1 ring-background${
                activeColor?.neutral ? ' dark:ring-white/25' : ''
              }`}
              style={{ background: activeSwatch }}
            />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="end">
        <p className="mb-2.5 text-xs font-medium text-muted-foreground">Brand color</p>
        <div className="grid grid-cols-4 gap-1.5">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => select(color)}
              title={color.label}
              className="group flex flex-col items-center gap-1"
            >
              <span
                // A near-black swatch gets a border in dark mode so it doesn't
                // vanish into the popover background (transparent in light).
                className={`flex size-7 items-center justify-center rounded-full ring-offset-background transition-all group-hover:scale-110${
                  color.neutral ? ' border border-transparent dark:border-white/25' : ''
                }`}
                style={{
                  background: color.swatch,
                  boxShadow:
                    active === color.name
                      ? `0 0 0 2px var(--background), 0 0 0 4px ${color.swatch}`
                      : undefined,
                }}
              >
                {active === color.name && (
                  <svg className="size-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-[10px] text-muted-foreground">{color.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
