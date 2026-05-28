import { Container, type ContainerProps } from '@react-email/components';

export type EmailContainerProps = ContainerProps;

export function EmailContainer(props: EmailContainerProps) {
  return <Container {...props} />;
}
