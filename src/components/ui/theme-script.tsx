/**
 * ThemeScript — blocking script that must be rendered in <head> before any content.
 *
 * Reads the user's stored theme preference from localStorage and applies the
 * `.dark` class to <html> before first paint, preventing a flash of the wrong theme.
 *
 * Defaults to dark mode if no preference is stored.
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
