import { Img, type ImgProps } from '@react-email/components';

export type EmailImageProps = ImgProps & {
  /** Required: when a client blocks images, this is what the reader sees. */
  alt: string;
};

/**
 * An image for email. Always give it an absolute https URL to a PNG, JPEG or
 * GIF: SVG and data URIs are not rendered by Gmail or Outlook, and a relative
 * path has no origin to resolve against inside an inbox.
 *
 * Border and outline are cleared because some clients draw a frame around an
 * image, and linked images pick up a link underline without the reset.
 */
export function EmailImage({ style, ...props }: EmailImageProps) {
  return (
    <Img
      style={{ border: 0, outline: 'none', textDecoration: 'none', ...style }}
      {...props}
    />
  );
}
