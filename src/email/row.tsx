import { Column, Row, type ColumnProps, type RowProps } from '@react-email/components';

export type EmailRowProps = RowProps;
export type EmailColumnProps = ColumnProps;

/** A table row, for the side-by-side layout email cannot do with flex or grid. */
export function EmailRow(props: EmailRowProps) {
  return <Row {...props} />;
}

export function EmailColumn(props: EmailColumnProps) {
  return <Column {...props} />;
}
