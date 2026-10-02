import { emailDarkTheme as dark } from './theme';

/**
 * Class hooks for the colour roles, which the stylesheet below targets.
 *
 * Text primitives add theirs on their own. Surfaces are left to the layout,
 * because only it knows which container is the page, which is the card and
 * which border is a divider.
 */
export const emailClass = {
  page: 'ol-email-page',
  card: 'ol-email-card',
  inset: 'ol-email-inset',
  border: 'ol-email-border',
  text: 'ol-email-text',
  muted: 'ol-email-muted',
  caption: 'ol-email-caption',
  /** Hidden in dark mode: an image that only works on a light background. */
  lightOnly: 'ol-email-light-only',
  /** Shown only in dark mode. Inline it as hidden so clients without the stylesheet never see it. */
  darkOnly: 'ol-email-dark-only',
  /** Horizontal padding that narrows on a phone. */
  gutter: 'ol-email-gutter',
  /** A spacer cell whose width tracks the gutter. */
  gutterCell: 'ol-email-gutter-cell',
} as const;

export function withEmailClass(base: string, extra?: string): string {
  return extra ? base + ' ' + extra : base;
}

const c = emailClass;

const background = (cls: string, color: string) =>
  '.' + cls + '{background-color:' + color + '!important}';
const foreground = (cls: string, color: string) => '.' + cls + '{color:' + color + '!important}';

const darkRules = [
  background(c.page, dark.pageBackground),
  background(c.card, dark.cardBackground),
  background(c.inset, dark.mutedBackground),
  '.' + c.border + '{border-color:' + dark.cardBorder + '!important}',
  foreground(c.text, dark.text),
  foreground(c.muted, dark.mutedText),
  foreground(c.caption, dark.captionText),
  '.' + c.lightOnly + '{display:none!important}',
  '.' + c.darkOnly + '{display:inline-block!important;max-height:none!important;overflow:visible!important}',
];

/*
 * Outlook on the web and in its apps ignores the media query. It recolours the
 * message itself and marks what it touched with `data-ogsc` (text) and
 * `data-ogsb` (backgrounds); the same rules scoped under those attributes put
 * this palette back in place of its guess.
 */
const outlookRules = [
  '[data-ogsb] ' + background(c.page, dark.pageBackground),
  '[data-ogsb] ' + background(c.card, dark.cardBackground),
  '[data-ogsb] ' + background(c.inset, dark.mutedBackground),
  '[data-ogsc] ' + foreground(c.text, dark.text),
  '[data-ogsc] ' + foreground(c.muted, dark.mutedText),
  '[data-ogsc] ' + foreground(c.caption, dark.captionText),
];

const mobileRules = [
  '.' + c.gutter + '{padding-left:24px!important;padding-right:24px!important}',
  '.' + c.gutterCell + '{width:24px!important}',
];

const mobile = '@media only screen and (max-width:600px){' + mobileRules.join('') + '}';

/** The stylesheet for a message that follows the reader's colour scheme. */
export const emailStylesheet = [
  ':root{color-scheme:light dark;supported-color-schemes:light dark}',
  '@media (prefers-color-scheme: dark){' + darkRules.join('') + '}',
  ...outlookRules,
  mobile,
].join('\n');

/** The stylesheet for a message pinned to light: the mobile rules only. */
export const emailLightStylesheet = [
  ':root{color-scheme:light;supported-color-schemes:light}',
  mobile,
].join('\n');
