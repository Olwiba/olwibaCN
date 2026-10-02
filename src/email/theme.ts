/**
 * Email colours, in two palettes.
 *
 * `emailTheme` is light and is what every primitive inlines, so a client that
 * ignores stylesheets (Gmail, Outlook on Windows) renders light. `emailDarkTheme`
 * is laid over it by the stylesheet `EmailHead` emits, in clients that report a
 * dark preference: Apple Mail, iOS Mail, Outlook on the web and macOS, Hey,
 * Thunderbird. Nothing forces either; the reader's client decides.
 */
export const emailTheme = {
  pageBackground: '#f4f4f5',
  cardBackground: '#ffffff',
  cardBorder: '#e4e4e7',
  mutedBackground: '#fafafa',
  text: '#18181b',
  mutedText: '#52525b',
  captionText: '#71717a',
  link: '#10b981',
  buttonText: '#ffffff',
  defaultBrandColor: '#10b981',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
} as const;

export type EmailTheme = typeof emailTheme;

/** The dark counterpart of each colour role that changes. Brand colours do not. */
export const emailDarkTheme = {
  pageBackground: '#1c1c1f',
  cardBackground: '#111113',
  cardBorder: '#2a2a2e',
  mutedBackground: '#18181b',
  text: '#fafafa',
  mutedText: '#c4c4c8',
  captionText: '#85858c',
} as const;

export type EmailDarkTheme = typeof emailDarkTheme;
