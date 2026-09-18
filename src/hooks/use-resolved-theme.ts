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
 * SSR and the first client render both report `'dark'`, so the two agree and
 * hydration is safe whatever the app's ThemeScript default is. The real class
 * is picked up immediately afterwards, in an effect.
 */
export function useResolvedTheme(): 'light' | 'dark' {
  // Seeded with a constant, not by reading the class.
  //
  // The initialiser runs during the first client render, which is the render
  // React matches against the server's HTML. Reading the real class there means
  // returning something the server could not have known, and any markup derived
  // from it — an image URL, an iframe src — mismatches and React throws #418.
  //
  // That was invisible while ThemeScript always produced `dark`: server and
  // client agreed by luck. The moment an app defaults to `system`, a visitor on
  // a light device hydrates against dark-flavoured HTML. Genesis's sign-up
  // journey caught this within a minute of the default changing.
  //
  // The cost is one render at the wrong value before the effect corrects it,
  // which for the assets this hook exists to pick is a swap nobody sees. The
  // alternative — correct on first paint, broken hydration — is not a trade
  // worth making.
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

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
