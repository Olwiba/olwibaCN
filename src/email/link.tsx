import { Link, type LinkProps } from '@react-email/components';
import { emailTheme } from './theme';

export type EmailLinkProps = LinkProps & {
  brandColor?: string;
};

export function EmailLink({
  brandColor = emailTheme.link,
  style,
  ...props
}: EmailLinkProps) {
  return (
    <Link
      style={{
        color: brandColor,
        wordBreak: 'break-all',
        ...style,
      }}
      {...props}
    />
  );
}
