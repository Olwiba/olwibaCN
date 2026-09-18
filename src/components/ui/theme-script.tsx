/**
 * ThemeScript — blocking script that must be rendered in <head> before any content.
 *
 * Reads the user's stored theme preference from localStorage and applies the
 * `.dark` class to <html> before first paint, preventing a flash of the wrong theme.
 *
 * The `.dark` class this writes is the theme's source of truth. Code that needs
 * the theme as a value rather than as a `dark:` variant should call
 * `useResolvedTheme`, which observes this class.
 *
 * `defaultTheme` decides what a visitor with no stored preference gets:
 *
 *   dark    the historic behaviour, and still the default here so no existing
 *           consumer changes without asking for it
 *   light   start light regardless of the device
 *   system  follow `prefers-color-scheme`
 *
 * Worth stating plainly, because the comment this replaces claimed otherwise:
 * nothing here consulted `prefers-color-scheme`, so every first-time visitor
 * got a dark app whatever their device was set to. User testing read that as
 * "the product is too dark" when it was really "the product ignored me".
 *
 * Usage (in your root layout / document shell):
 *   <head>
 *     <ThemeScript defaultTheme="light" />
 *     ...
 *   </head>
 */

export type ThemeScriptDefault = 'light' | 'dark' | 'system';

/**
 * Only 'dark' and 'light' are honoured from storage — anything else is treated
 * as absent. The value is written by this package's own switchers, but it is
 * localStorage: another script, an old build, or a person with devtools can
 * put anything in there, and the fallback must not depend on it being sane.
 */
function buildScript(defaultTheme: ThemeScriptDefault): string {
  const fallback =
    defaultTheme === 'system'
      ? "window.matchMedia('(prefers-color-scheme: dark)').matches"
      : defaultTheme === 'dark'
        ? 'true'
        : 'false';

  return `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||t==='light'?t==='dark':${fallback};document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;
}

export interface ThemeScriptProps {
  /** What a visitor with no stored preference gets. @default "dark" */
  defaultTheme?: ThemeScriptDefault;
}

export function ThemeScript({ defaultTheme = 'dark' }: ThemeScriptProps = {}) {
  return <script dangerouslySetInnerHTML={{ __html: buildScript(defaultTheme) }} />;
}
