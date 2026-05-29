"use client";

import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function ChartDemo() {
  const [disabled, setDisabled] = useState(false);

  useUsageCode(`<ChartContainer${disabled ? " disabled" : ""} config={chartConfig} className="min-h-[200px] w-full">\n  <BarChart data={chartData}>\n    <XAxis dataKey="month" />\n    <ChartTooltip content={<ChartTooltipContent />} />\n    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />\n  </BarChart>\n</ChartContainer>`);

  return (
    <>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full" disabled={disabled}>
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} width={30} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="chart-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="chart-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
