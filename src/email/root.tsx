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
import { emailClass, emailLightStylesheet, emailStylesheet, withEmailClass } from './classes';

export type EmailRootProps = HtmlProps;
export type EmailHeadProps = HeadProps & {
  /**
   * `light dark` (the default) renders light everywhere and dark in clients
   * that report a dark preference. `light` pins it, for a brand whose assets
   * only work on white.
   */
  colorScheme?: 'light dark' | 'light';
};
export type EmailBodyProps = BodyProps;
export type EmailPreviewProps = PreviewProps;

export function EmailRoot(props: EmailRootProps) {
  return <Html {...props} />;
}

export function EmailHead({ colorScheme = 'light dark', children, ...props }: EmailHeadProps) {
  return (
    <Head {...props}>
      <meta name="color-scheme" content={colorScheme} />
      <meta name="supported-color-schemes" content={colorScheme} />
      <style
        dangerouslySetInnerHTML={{
          __html: colorScheme === 'light' ? emailLightStylesheet : emailStylesheet,
        }}
      />
      {children}
    </Head>
  );
}

export function EmailBody({ className, ...props }: EmailBodyProps) {
  return <Body className={withEmailClass(emailClass.page, className)} {...props} />;
}

export function EmailPreview(props: EmailPreviewProps) {
  return <Preview {...props} />;
}
