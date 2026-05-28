import { Heading, type HeadingProps } from '@react-email/components';
import { emailTheme } from './theme';

export type EmailHeadingProps = HeadingProps;

export function EmailHeading({ style, ...props }: EmailHeadingProps) {
  return (
    <Heading
      style={{
        margin: '0 0 12px',
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: '32px',
        color: emailTheme.text,
        ...style,
      }}
      {...props}
    />
  );
}
