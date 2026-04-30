"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemMedia,
  ItemActions,
  ItemGroup,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type ItemSize = "sm" | "default" | "lg";
type ItemVariant = "default" | "outline" | "muted";
type ItemMode = "default" | "playful" | "smooth";

const sizes: ItemSize[] = ["default", "sm", "lg"];
const variants: ItemVariant[] = ["default", "outline", "muted"];
const modes: ItemMode[] = ["default", "playful", "smooth"];

function getItemUsageCode({
  size,
  variant,
  mode,
  disabled,
}: {
  size: ItemSize;
  variant: ItemVariant;
  mode: ItemMode;
  disabled: boolean;
}) {
  const itemProps = [
    variant !== "default" && `variant="${variant}"`,
    size !== "default" && `size="${size}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");
  const itemAttrs = itemProps ? ` ${itemProps}` : "";
  const groupModeAttr = mode !== "default" ? ` mode="${mode}"` : "";

  return `<ItemGroup className="w-[448px] max-w-full border rounded-lg"${groupModeAttr}>
  <Item${itemAttrs}>
    <ItemMedia variant="image">
      <Avatar>
        <AvatarImage src="/android-chrome-512x512.png" />
        <AvatarFallback>OC</AvatarFallback>
      </Avatar>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>John Doe</ItemTitle>
      <ItemDescription>Software Engineer at Acme Inc.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="ghost" size="icon" aria-label="More options">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </ItemActions>
  </Item>
  <Item${itemAttrs}>
    <ItemMedia variant="image">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Jane Smith</ItemTitle>
      <ItemDescription>Product Designer at Vercel</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="ghost" size="icon" aria-label="More options">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </ItemActions>
  </Item>
</ItemGroup>`;
}

export default function ItemDemo() {
  const [size, setSize] = useState<ItemSize>("default");
  const [variant, setVariant] = useState<ItemVariant>("default");
  const [mode, setMode] = useState<ItemMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getItemUsageCode({ size, variant, mode, disabled }));

  return (
    <>
      <ItemGroup
        className="w-[448px] max-w-full border rounded-lg"
        mode={mode === "default" ? undefined : mode}
      >
        <Item
          variant={variant}
          size={size}
          disabled={disabled}
        >
          <ItemMedia variant="image">
            <Avatar>
              <AvatarImage src="/android-chrome-512x512.png" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>John Doe</ItemTitle>
            <ItemDescription>Software Engineer at Acme Inc.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </ItemActions>
        </Item>
        <Item
          variant={variant}
          size={size}
          disabled={disabled}
        >
          <ItemMedia variant="image">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Jane Smith</ItemTitle>
            <ItemDescription>Product Designer at Vercel</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Size</span>
            <div className="flex gap-1.5">
              {sizes.map((s) => (
                <Button
                  key={s}
                  variant={size === s ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSize(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          </div>

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
            <span className="text-xs font-medium text-fd-muted-foreground">Variant</span>
            <div className="flex gap-1.5">
              {variants.map((v) => (
                <Button
                  key={v}
                  variant={variant === v ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setVariant(v)}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="item-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="item-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
