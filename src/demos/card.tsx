"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoControls, useUsageCode } from "@/components/docs/ComponentPreview";

type Mode = "default" | "playful" | "smooth";

const modes: Mode[] = ["default", "playful", "smooth"];

export default function CardDemo() {
  const [mode, setMode] = useState<Mode>("default");

  const usageProps = mode !== "default" ? ` mode="${mode}"` : "";
  useUsageCode(`<Card${usageProps}>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n  </CardHeader>\n  <CardContent>Content</CardContent>\n</Card>`);

  return (
    <>
      <Card
        className="w-[350px]"
        mode={mode === "default" ? undefined : mode}
      >
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is the card content area where you can add any content.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>

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
        </div>
      </DemoControls>
    </>
  );
}
