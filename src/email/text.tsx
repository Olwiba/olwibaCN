import { Text, type TextProps } from '@react-email/components';
import { emailTheme } from './theme';

export type EmailTextProps = TextProps & {
  variant?: 'default' | 'muted' | 'caption';
};

const variantStyles = {
  default: {
    color: emailTheme.text,
    fontSize: '15px',
    lineHeight: '24px',
  },
  muted: {
    color: emailTheme.mutedText,
    fontSize: '15px',
    lineHeight: '24px',
  },
  caption: {
    color: emailTheme.mutedText,
    fontSize: '13px',
    lineHeight: '20px',
  },
} as const;

export function EmailText({
  variant = 'default',
  style,
  ...props
}: EmailTextProps) {
  return <Text style={{ ...variantStyles[variant], ...style }} {...props} />;
}
