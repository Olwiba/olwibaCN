import { Section, type SectionProps } from '@react-email/components';

export type EmailSectionProps = SectionProps;

export function EmailSection(props: EmailSectionProps) {
  return <Section {...props} />;
}
