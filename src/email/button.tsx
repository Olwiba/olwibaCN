import { Button, type ButtonProps } from '@react-email/components';
import { emailTheme } from './theme';

export interface EmailButtonProps extends Omit<ButtonProps, 'children'> {
  label: string;
  brandColor?: string;
}

export function EmailButton({
  label,
  brandColor = emailTheme.defaultBrandColor,
  style,
  ...props
}: EmailButtonProps) {
  return (
    <Button
      style={{
        backgroundColor: brandColor,
        borderRadius: '8px',
        color: emailTheme.buttonText,
        display: 'inline-block',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '1',
        padding: '12px 20px',
        textDecoration: 'none',
        textAlign: 'center',
        ...style,
      }}
      {...props}
    >
      {label}
    </Button>
  );
}
