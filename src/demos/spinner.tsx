"use client";

import { Spinner } from "@/components/ui/spinner";
import { useUsageCode } from "@/docs/components/ComponentPreview";

export default function SpinnerDemo() {
  useUsageCode(`<Spinner />`);

  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  );
}
