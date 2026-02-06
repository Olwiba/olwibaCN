import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldDemo() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="Enter your email" />
        <FieldDescription>We'll never share your email.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Username</FieldLabel>
        <Input placeholder="Enter your username" />
      </Field>
    </FieldGroup>
  );
}
