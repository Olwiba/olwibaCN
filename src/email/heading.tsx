import { Heading, type HeadingProps } from '@react-email/components';
import { emailClass, withEmailClass } from './classes';
import { emailTheme } from './theme';

export type EmailHeadingProps = HeadingProps;

export function EmailHeading({ className, style, ...props }: EmailHeadingProps) {
  return (
    <Heading
      className={withEmailClass(emailClass.text, className)}
      style={{
        margin: '0 0 16px',
        fontSize: '28px',
        fontWeight: 700,
        lineHeight: '34px',
        letterSpacing: '-0.4px',
        color: emailTheme.text,
        ...style,
      }}
      {...props}
    />
  );
}
