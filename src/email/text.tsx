import { Text, type TextProps } from '@react-email/components';
import { emailClass, withEmailClass } from './classes';
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
    color: emailTheme.captionText,
    fontSize: '13px',
    lineHeight: '20px',
  },
} as const;

const variantClasses = {
  default: emailClass.text,
  muted: emailClass.muted,
  caption: emailClass.caption,
} as const;

export function EmailText({
  variant = 'default',
  className,
  style,
  ...props
}: EmailTextProps) {
  return (
    <Text
      className={withEmailClass(variantClasses[variant], className)}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    />
  );
}
