"use client";

import { useState } from "react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type FieldMode = "default" | "playful" | "smooth";

const modes: FieldMode[] = ["default", "playful", "smooth"];
const DEFAULT_ERROR = "Please enter a valid email address.";

function getUsageCode({
  mode,
  disabled,
  error,
  errorMessage,
}: {
  mode: FieldMode;
  disabled: boolean;
  error: boolean;
  errorMessage: string;
}) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const errorAttr = error ? ` errorMessage="${errorMessage}"` : "";
  const disabledAttr = disabled ? ` data-disabled="true"` : "";
  const inputInvalid = error ? " aria-invalid" : "";
  const inputDisabled = disabled ? " disabled" : "";

  return `<FieldGroup>
  <Field${modeAttr}${errorAttr}${disabledAttr}>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="Enter your email"${inputInvalid}${inputDisabled} />
    <FieldDescription>We'll never share your email.</FieldDescription>
  </Field>
</FieldGroup>`;
}

export default function FieldDemo() {
  const [mode, setMode] = useState<FieldMode>("default");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR);

  useUsageCode(getUsageCode({ mode, disabled, error, errorMessage }));

  return (
    <>
      <FieldGroup className="w-full max-w-sm">
        <Field
          mode={mode === "default" ? undefined : mode}
          errorMessage={error ? errorMessage : undefined}
          data-disabled={disabled ? "true" : undefined}
        >
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            aria-invalid={error || undefined}
            disabled={disabled}
          />
          <FieldDescription>We'll never share your email.</FieldDescription>
        </Field>
      </FieldGroup>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Mode</span>
            <div className="flex gap-1.5">
              {modes.map((m) => (
                <Button
                  key={m}
                  variant={mode === m ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setMode(m)}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Error</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch id="field-error" checked={error} onCheckedChange={setError} />
                <Label htmlFor="field-error" className="text-xs">Show error</Label>
              </div>
              <Input
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                placeholder="Error message…"
                className="w-56"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="field-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="field-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
