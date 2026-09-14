import * as React from 'react';

/**
 * The theme actually in effect, as `'light' | 'dark'`.
 *
 * The source of truth for this design system's theme is the `dark` class on
 * `<html>` — written before first paint by `ThemeScript` and toggled at runtime
 * by the theme switches. `prefers-color-scheme` is deliberately *not* consulted
 * anywhere in that chain, so anything that reads the media query instead is
 * reading the operating system and will disagree with the app the moment a user
 * touches the toggle.
 *
 * Which only matters for content CSS cannot restyle. A `dark:` variant is the
 * right answer for markup; this hook is for the cases where the theme has to be
 * a *value* — a raster image or third-party embed that has to be requested in a
 * light or dark flavour, a canvas fill, an iframe query parameter.
 *
 * Observes the class rather than subscribing to a store, so it stays correct no
 * matter who moved it: a switch component, another tab replaying localStorage,
 * or devtools.
 *
 * SSR returns `'dark'`, matching ThemeScript's own default for a visitor with
 * no stored preference. A first client render still reports the real class, so
 * a light-theme visitor does not get a dark-flavoured asset requested and then
 * swapped.
 */
export function useResolvedTheme(): 'light' | 'dark' {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(read);

  React.useEffect(() => {
    // The class can change between the initial state and this effect running:
    // React renders with the value it captured, and the switch may have fired
    // in between. Re-read rather than assuming the mount-time value still holds.
    setTheme(read());

    const observer = new MutationObserver(() => setTheme(read()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}

function read(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
