/**
 * ThemeScript — blocking script that must be rendered in <head> before any content.
 *
 * Reads the user's stored theme preference from localStorage and applies the
 * `.dark` class to <html> before first paint, preventing a flash of the wrong theme.
 *
 * Defaults to dark mode if no preference is stored.
 *
 * The `.dark` class this writes is the theme's source of truth — nothing here
 * reads `prefers-color-scheme`. Code that needs the theme as a value rather than
 * as a `dark:` variant should call `useResolvedTheme`, which observes this class.
 *
 * Usage (in your root layout / document shell):
 *   <head>
 *     <ThemeScript />
 *     ...
 *   </head>
 */

const script = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
