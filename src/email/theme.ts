export const emailTheme = {
  pageBackground: '#f4f4f5',
  cardBackground: '#ffffff',
  cardBorder: '#e4e4e7',
  mutedBackground: '#fafafa',
  text: '#18181b',
  mutedText: '#71717a',
  link: '#10b981',
  buttonText: '#ffffff',
  defaultBrandColor: '#10b981',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
} as const;

export type EmailTheme = typeof emailTheme;
