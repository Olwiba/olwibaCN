import {
  Body,
  Head,
  Html,
  Preview,
  type BodyProps,
  type HeadProps,
  type HtmlProps,
  type PreviewProps,
} from '@react-email/components';

export type EmailRootProps = HtmlProps;
export type EmailHeadProps = HeadProps;
export type EmailBodyProps = BodyProps;
export type EmailPreviewProps = PreviewProps;

export function EmailRoot(props: EmailRootProps) {
  return <Html {...props} />;
}

export function EmailHead(props: EmailHeadProps) {
  return <Head {...props} />;
}

export function EmailBody(props: EmailBodyProps) {
  return <Body {...props} />;
}

export function EmailPreview(props: EmailPreviewProps) {
  return <Preview {...props} />;
}
